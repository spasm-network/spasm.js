import { sha256 } from "js-sha256-v0";
import { ConvertToSpasmConfig, SanitizationConfig, } from "./../types/interfaces.js";
import { toBeHex } from "./../utils/nostrUtils.js";
import { isObjectWithValues, extractVersion, toBeTimestamp, extractSealedEvent, getNostrSpasmVersion, createLinkObjectFromUrl, hasValue, getFormatFromId, getFormatFromAddress, getFormatFromSignature, markSpasmEventAddressAsVerified, verifyEthereumSignature, sanitizeEvent, mergeConfigs, extractSignerFromEthereumSignature, extractIdByFormat, mergeSanitizationConfigs, mergeSpasmEventsV2, isArrayWithValues, isStringOrNumber, assignFormats, isArrayOfStrings, removeDuplicateNostrTags } from "./../utils/utils.js";
import { identifyPostOrEvent, isDmpEvent, isDmpEventSignedClosed, isDmpEventSignedOpened, isNostrEvent, isNostrEventSignedOpened, isNostrSpasmEvent, isNostrSpasmEventSignedOpened } from "./../identify/identifyEvent.js";
import { getSpasmId } from "./getSpasmId.js";
import { convertToSpasmEventEnvelopeWithTree } from "./../convert/convertToSpasmEventEnvelopeWithTree.js";
import { verifyEvent as verifyNostrEvent } from 'nostr-tools-v2';
// const latestSpasmVersion = "2.0.0"
export const convertManyToSpasm = (unknownEvents, customConfig) => {
    try {
        if (!unknownEvents)
            return null;
        if (!Array.isArray(unknownEvents))
            return null;
        if (!hasValue(unknownEvents))
            return null;
        const convertedEvents = [];
        unknownEvents.forEach(event => {
            const convertedEvent = convertToSpasm(event, customConfig);
            if (convertedEvent) {
                convertedEvents.push(convertedEvent);
            }
        });
        if (!hasValue(convertedEvents))
            return null;
        return convertedEvents;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
// Spasm V2
export const convertToSpasm = (unknownEvent, customConfig) => {
    try {
        const defaultConfig = new ConvertToSpasmConfig();
        const config = mergeConfigs(defaultConfig, customConfig || {});
        // First sanitization
        if (config?.xss?.enableSanitization) {
            if (ifEventContainsMaliciousCode(unknownEvent, config.xss.sanitizationConfig)) {
                return null;
            }
        }
        if (config?.to?.spasm?.version === "2.0.0") {
            const standardizedEventV2 = standardizeEventV2(unknownEvent, config.to.spasm.version);
            if (standardizedEventV2) {
                // Assign formats for IDs, signatures, addresses
                // if they don't yet exist.
                // Assigning formats should be done before assigning
                // Spasm ID, because otherwise ID changes.
                assignFormats(standardizedEventV2);
                const spasmEventV2 = assignSpasmId(standardizedEventV2, config.to.spasm.id.versions);
                if (!spasmEventV2)
                    return null;
                // An extra sanitization because some strings were parsed
                if (config?.xss?.enableSanitization) {
                    if (ifEventContainsMaliciousCode(spasmEventV2, config.xss.sanitizationConfig)) {
                        return null;
                    }
                }
                return spasmEventV2;
            }
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export const ifEventContainsMaliciousCode = (unknownEvent, customConfig) => {
    try {
        const defaultConfig = new SanitizationConfig();
        const config = mergeSanitizationConfigs(defaultConfig, customConfig || {});
        // Sanitize event
        const sanitizedEvent = JSON.parse(JSON.stringify(unknownEvent));
        sanitizeEvent(sanitizedEvent, config);
        // Allow some special characters on the backend (database),
        // because all strings should be sanitized on the frontend
        // before displaying to users.
        const jsonStringOriginal = JSON.stringify(unknownEvent)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            // Below is a special character, not a simple empty space
            .replace(/&nbsp;/g, ' ');
        const jsonStringSanitized = JSON.stringify(sanitizedEvent)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            // Below is a special character, not a simple empty space
            .replace(/&nbsp;/g, ' ');
        if (jsonStringOriginal !== jsonStringSanitized) {
            // An event contains potentially malicious code
            return true;
        }
        // Event is safe to use
        return false;
    }
    catch (error) {
        console.error(error);
        // If we're not sure whether an event contains malicious
        // code, it's better to return true for security reasons.
        return true;
    }
};
export const assignSpasmId = (spasmEventV2, spasmIdVersions = ["01"]) => {
    if (!isObjectWithValues(spasmEventV2))
        return null;
    spasmIdVersions.forEach(spasmIdVersion => {
        const spasmId = getSpasmId(spasmEventV2, spasmIdVersion);
        const alreadyId = extractIdByFormat(spasmEventV2, { name: "spasmid", version: "01" });
        if (spasmId && typeof (spasmId) === "string" &&
            spasmId !== alreadyId) {
            // Create ids if it's null or undefined
            spasmEventV2.ids ??= [];
            // Prepend the new Spasm ID to an array of other IDs
            spasmEventV2.ids.unshift({
                value: spasmId,
                format: {
                    name: "spasmid",
                    version: spasmIdVersion
                }
            });
        }
    });
    return spasmEventV2;
};
export const standardizeEventV2 = (unknownEvent, version = "2.0.0", info = null) => {
    if (!isObjectWithValues(unknownEvent))
        return null;
    // SpasmEventV2, SpasmBodyV2, SpasmEnvelopeV2,
    // SpasmEnvelopeWithTreeV2, SpasmEventDatabaseV2
    if ('type' in unknownEvent &&
        typeof (unknownEvent.type) === "string") {
        if (unknownEvent.type === "SpasmEventV2" ||
            unknownEvent.type === "SpasmEventBodyV2" ||
            unknownEvent.type === "SpasmEventBodySignedClosedV2" ||
            unknownEvent.type === "SpasmEventEnvelopeV2" ||
            unknownEvent.type === "SpasmEventEnvelopeWithTreeV2" ||
            unknownEvent.type === "SpasmEventDatabaseV2") {
            return standardizeSpasmEventAnyV2(unknownEvent, version);
        }
    }
    // Non-Spasm events
    return standardizeNonSpasmEventV2(unknownEvent, version, info);
};
export const standardizeSpasmEventAnyV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    if (!("type" in event) ||
        !event.type) {
        return null;
    }
    let standardizedEvent = {
        type: "SpasmEventV2"
    };
    if ('type' in event &&
        typeof (event.type) === "string") {
        if (event.type === "SpasmEventV2") {
            standardizedEvent =
                standardizeSpasmEventV2(event, version);
            return standardizedEvent;
        }
        else if (event.type === "SpasmEventBodyV2") {
            standardizedEvent =
                standardizeSpasmEventBodyV2(event, version);
            return standardizedEvent;
        }
        else if (event.type === "SpasmEventBodySignedClosedV2") {
            // TODO
            standardizedEvent =
                standardizeSpasmEventBodySignedClosedV2(event, version);
            return standardizedEvent;
        }
        else if (event.type === "SpasmEventEnvelopeV2") {
            standardizedEvent =
                standardizeSpasmEventEnvelopeV2(event, version);
            return standardizedEvent;
        }
        else if (event.type === "SpasmEventEnvelopeWithTreeV2") {
            standardizedEvent =
                standardizeSpasmEventEnvelopeWithTreeV2(event, version);
            return standardizedEvent;
        }
        else if (event.type === "SpasmEventDatabaseV2") {
            standardizedEvent =
                standardizeSpasmEventDatabaseV2(event, version);
            return standardizedEvent;
        }
    }
    return null;
};
export const standardizeNonSpasmEventV2 = (unknownEvent, version = "2.0.0", info = null) => {
    if (!isObjectWithValues(unknownEvent))
        return null;
    // If unknown event is not any of V2,
    // then proceed with SpasmEventV0 (Post)
    // and UnknownEventV1 like DpmEvent, NostrSpasmEvent, etc.
    unknownEvent = unknownEvent;
    // Info about post/event might be provided.
    // If not, then we should identify an event.
    if (!info) {
        info = identifyPostOrEvent(unknownEvent);
    }
    if (!info || !info.webType)
        return null;
    let standardizedEvent = {
        type: "SpasmEventV2"
    };
    // DmpEvent
    // DMP event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEvent" &&
        info.eventIsSealed === false) {
        if (version === "2.0.0") {
            standardizedEvent = standardizeDmpEventV2(unknownEvent);
        }
    }
    // DmpEventSignedClosed
    // DMP event with signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === false) {
        if (version === "2.0.0") {
            standardizedEvent = standardizeDmpEventSignedClosedV2(unknownEvent);
        }
    }
    // DmpEventSignedOpened
    // DMP event with signature after the signed string
    // is parsed and saved as a signed object
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeDmpEventSignedOpenedV2(unknownEvent);
    }
    // NostrEvent
    // Nostr event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEventV2(unknownEvent);
    }
    // NostrSpasmEvent
    // Nostr event without signature, with extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEventV2(unknownEvent);
    }
    // NostrEventSignedOpened
    // Nostr event with signature, without extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEventSignedOpenedV2(unknownEvent);
    }
    // NostrSpasmEventSignedOpened
    // Nostr event with signature and extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEventSignedOpenedV2(unknownEvent);
    }
    // SpasmEventV0 with sealed DMP event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmDmpEventSignedClosedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with sealed Nostr event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmNostrEventSignedOpenedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with sealed Nostr Spasm event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmNostrSpasmEventSignedOpenedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with RSS item without signature
    // (received e.g. via RSS module)
    if (!info.eventInfo &&
        info.webType === "web2" &&
        info.eventIsSealed === false &&
        info.eventIsSealedUnderKeyName === false) {
        standardizedEvent = standardizeSpasmWithRssItemV0_V2(unknownEvent);
        if (standardizedEvent) {
            standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(unknownEvent, standardizedEvent);
        }
    }
    if (info.eventInfo &&
        info.eventIsSealed === true &&
        standardizedEvent) {
        standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(unknownEvent, standardizedEvent);
    }
    return standardizedEvent;
};
export const standardizeSpasmEventV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    // The simplest wait to standardize SpasmEventV2
    // with signature verification and sanitization
    // is to convert it to EnvelopeWithTree and then
    // back to SpasmEventV2
    // Convert to SpasmEventEnvelopeWithTreeV2
    const spasmEventEnvelopeWithTreeV2 = convertToSpasmEventEnvelopeWithTree(event, version);
    if (!spasmEventEnvelopeWithTreeV2)
        return null;
    const spasmEvent = standardizeSpasmEventEnvelopeWithTreeV2(spasmEventEnvelopeWithTreeV2);
    return spasmEvent;
};
export const standardizeSpasmEventBodyV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    if (!("type" in event) || !event.type)
        return null;
    if (event.type !== "SpasmEventBodyV2")
        return null;
    const spasmEventV2 = {
        type: "SpasmEventV2",
        siblings: [
            {
                type: "SiblingSpasmV2",
                protocol: {
                    name: "spasm",
                    // name: event.protocol?.name
                    //   ? event.protocol?.name as "spasm"
                    //   : "spasm",
                    // version: "2.0.0"
                    version: event.protocol?.version
                        ? event.protocol?.version
                        : "2.0.0"
                },
                signedString: JSON.stringify(event)
                // Unsigned SpasmEventBodyV2 doesn't have IDs
            }
        ]
    };
    if ("parent" in event && event.parent &&
        isObjectWithValues(event.parent)) {
        if ("ids" in event.parent && event.parent.ids &&
            isArrayWithValues(event.parent.ids)) {
            spasmEventV2.parent = { ids: event.parent.ids };
            if ("marker" in event.parent && event.parent.marker &&
                isStringOrNumber(event.parent.marker)) {
                spasmEventV2.parent.marker = event.parent.marker;
            }
        }
    }
    // Strings and numbers
    if (event.action && typeof (event.action) === "string") {
        spasmEventV2.action = event.action;
    }
    if (event.title && typeof (event.title) === "string") {
        spasmEventV2.title = event.title;
    }
    if (event.content && typeof (event.content) === "string") {
        spasmEventV2.content = event.content;
    }
    if (event.timestamp && typeof (event.timestamp) === "number") {
        spasmEventV2.timestamp = event.timestamp;
    }
    if (event.license && typeof (event.license) === "string") {
        spasmEventV2.license = event.license;
    }
    if (event.language && typeof (event.language) === "string") {
        spasmEventV2.language = event.language;
    }
    // Arrays
    if ("authors" in event && event.authors &&
        isArrayWithValues(event.authors)) {
        spasmEventV2.authors = event.authors;
    }
    if ("categories" in event && event.categories &&
        isArrayWithValues(event.categories)) {
        spasmEventV2.categories = event.categories;
    }
    if ("tips" in event && event.tips &&
        isArrayWithValues(event.tips)) {
        spasmEventV2.tips = event.tips;
    }
    if ("hosts" in event && event.hosts &&
        isArrayWithValues(event.hosts)) {
        spasmEventV2.hosts = event.hosts;
    }
    if ("links" in event && event.links &&
        isArrayWithValues(event.links)) {
        spasmEventV2.links = event.links;
    }
    if ("keywords" in event && event.keywords &&
        isArrayWithValues(event.keywords)) {
        spasmEventV2.keywords = event.keywords;
    }
    if ("tags" in event && event.tags &&
        isArrayWithValues(event.tags)) {
        spasmEventV2.tags = event.tags;
    }
    if ("medias" in event && event.medias &&
        isArrayWithValues(event.medias)) {
        spasmEventV2.medias = event.medias;
    }
    if ("references" in event && event.references &&
        isArrayWithValues(event.references)) {
        spasmEventV2.references = event.references;
    }
    if ("mentions" in event && event.mentions &&
        isArrayWithValues(event.mentions)) {
        spasmEventV2.mentions = event.mentions;
    }
    if ("proofs" in event && event.proofs &&
        isArrayWithValues(event.proofs)) {
        spasmEventV2.proofs = event.proofs;
    }
    // Objects
    if ("parent" in event && event.parent &&
        isObjectWithValues(event.parent)) {
        spasmEventV2.parent = event.parent;
    }
    if ("extra" in event && event.extra &&
        isObjectWithValues(event.extra)) {
        spasmEventV2.extra = event.extra;
    }
    if (spasmEventV2 && isObjectWithValues(spasmEventV2)) {
        return spasmEventV2;
    }
    else {
        return null;
    }
};
export const standardizeSpasmEventBodySignedClosedV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    if (!("type" in event) || !event.type ||
        event.type !== "SpasmEventBodySignedClosedV2") {
        return null;
    }
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const isEthereumSignatureValid = verifyEthereumSignature(event.signedString, event.signature, event.signer);
    if (!isEthereumSignatureValid)
        return null;
    const spasmEventBodyV2 = JSON.parse(event.signedString);
    if (!spasmEventBodyV2)
        return null;
    const spasmEventBodyV2ConvertedToSpasmV2 = standardizeSpasmEventBodyV2(spasmEventBodyV2);
    if (!spasmEventBodyV2ConvertedToSpasmV2)
        return null;
    const eventSignedConvertedToSpasmV2 = {
        ...spasmEventBodyV2ConvertedToSpasmV2,
        signatures: [
            {
                value: event.signature,
                pubkey: event.signer,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromSignature(event.signature)
                    ? {
                        format: getFormatFromSignature(event.signature),
                    }
                    : {})
            }
        ]
    };
    const spasmEventV2 = eventSignedConvertedToSpasmV2;
    // Add 'verified' flag to the address that was verified
    markSpasmEventAddressAsVerified(spasmEventV2, event.signer);
    if (spasmEventV2) {
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingSpasmSignedV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingSpasmSignedV2";
        spasmEventV2.siblings[0].signatures = [
            {
                value: event.signature,
                pubkey: event.signer,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromSignature(event.signature)
                    ? {
                        format: getFormatFromSignature(event.signature),
                    }
                    : {})
            }
        ];
    }
    return spasmEventV2;
};
export const standardizeSpasmEventDatabaseV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    // The simplest wait to standardize SpasmEventDatabaseV2
    // with signature verification and sanitization
    // is to change type to SpasmEventV2, convert it to
    // EnvelopeWithTree and then to SpasmEventV2.
    // Note: make sure to change type to SpasmEventV2
    // to avoid infinite recursion.
    const spasmEventNotYetConverted = {
        ...event,
        type: "SpasmEventV2"
    };
    // Convert to SpasmEventEnvelopeWithTreeV2
    const spasmEventEnvelopeWithTreeV2 = convertToSpasmEventEnvelopeWithTree(spasmEventNotYetConverted, version);
    if (!spasmEventEnvelopeWithTreeV2)
        return null;
    const spasmEvent = standardizeSpasmEventEnvelopeWithTreeV2(spasmEventEnvelopeWithTreeV2);
    return spasmEvent;
};
export const standardizeSpasmEventEnvelopeWithTreeV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    const spasmEventV2 = standardizeSpasmEventEnvelopeV2(event, version);
    if (!spasmEventV2)
        return null;
    if ("children" in event &&
        event.children &&
        Array.isArray(event.children)) {
        event.children.forEach(child => {
            if (child && isObjectWithValues(child)) {
                if ('event' in child && child.event &&
                    isObjectWithValues(child.event)) {
                    const childEventConvertedToSpasmEventV2 = convertToSpasm(child.event);
                    if (childEventConvertedToSpasmEventV2) {
                        const spasmEventChildV2 = {
                            ...child,
                            event: childEventConvertedToSpasmEventV2
                        };
                        // Create children if it's null or undefined
                        spasmEventV2.children ??= [];
                        spasmEventV2.children?.push(spasmEventChildV2);
                        // convertToSpasm() returned null
                    }
                    else {
                        const { event, ...childWithoutEvent } = child;
                        const spasmEventChildV2 = {
                            ...childWithoutEvent
                        };
                        // Create children if it's null or undefined
                        spasmEventV2.children ??= [];
                        spasmEventV2.children?.push(spasmEventChildV2);
                    }
                    // child has no event key
                }
                else {
                    const { event, ...childWithoutEvent } = child;
                    const spasmEventChildV2 = {
                        ...childWithoutEvent
                    };
                    // Create children if it's null or undefined
                    spasmEventV2.children ??= [];
                    spasmEventV2.children?.push(spasmEventChildV2);
                }
                // spasmEventV2.children?.push(child)
            }
        });
    }
    if ("parent" in event &&
        event.parent &&
        "event" in event.parent &&
        event.parent.event &&
        isObjectWithValues(event.parent.event)) {
        if ("parent" in spasmEventV2 &&
            spasmEventV2.parent) {
            const parentEvent = convertToSpasm(event.parent.event);
            if (parentEvent) {
                spasmEventV2.parent.event = parentEvent;
            }
        }
        else if (!spasmEventV2.parent) {
            const parentEvent = convertToSpasm(event.parent.event);
            if (parentEvent) {
                spasmEventV2.parent = {
                    ...event.parent,
                    event: parentEvent
                };
            }
        }
    }
    if ("root" in event &&
        event.root &&
        "event" in event.root &&
        event.root.event &&
        isObjectWithValues(event.root.event)) {
        if ("root" in spasmEventV2 &&
            spasmEventV2.root) {
            const rootEvent = convertToSpasm(event.root.event);
            if (rootEvent) {
                spasmEventV2.root.event = rootEvent;
            }
        }
        else if (!spasmEventV2.root) {
            const rootEvent = convertToSpasm(event.root.event);
            if (rootEvent) {
                spasmEventV2.root = {
                    ...event.root,
                    event: rootEvent
                };
            }
        }
    }
    return spasmEventV2;
};
export const standardizeSpasmEventEnvelopeV2 = (event, version = "2.0.0") => {
    if (!isObjectWithValues(event))
        return null;
    if (!("type" in event) ||
        (event.type !== "SpasmEventEnvelopeV2" &&
            event.type !== "SpasmEventEnvelopeWithTreeV2")) {
        return null;
    }
    // Get siblings
    if (!("siblings" in event) ||
        !event.siblings ||
        !Array.isArray(event.siblings)) {
        return null;
    }
    const { siblings } = event;
    const spasmEventsV2 = [];
    // Convert siblings to SpasmEventV2
    siblings.forEach(sibling => {
        const spasmEventV2 = standardizeSpasmEventSiblingV2(sibling, version);
        if (spasmEventV2) {
            spasmEventsV2.push(spasmEventV2);
        }
    });
    // Merge all SpasmEventV2
    const spasmEventV2 = mergeSpasmEventsV2(spasmEventsV2);
    if (!spasmEventV2)
        return null;
    if ('db' in event && event.db) {
        spasmEventV2.db = event.db;
    }
    if ('stats' in event && event.stats) {
        spasmEventV2.stats = event.stats;
    }
    if ('source' in event && event.source) {
        spasmEventV2.source = event.source;
    }
    if ('sharedBy' in event && event.sharedBy) {
        spasmEventV2.sharedBy = event.sharedBy;
    }
    return spasmEventV2;
};
export const standardizeSpasmEventSiblingV2 = (sibling, version = "2.0.0") => {
    if (!isObjectWithValues(sibling))
        return null;
    if (!("type" in sibling) ||
        typeof (sibling.type) !== "string") {
        return null;
    }
    if (sibling.type === "SiblingWeb2V2" &&
        sibling.originalObject) {
        return standardizeNonSpasmEventV2(sibling.originalObject, version);
    }
    if (sibling.type === "SiblingSpasmV2") {
        if ("signedString" in sibling &&
            sibling.signedString &&
            typeof (sibling.signedString) === "string") {
            const spasmEventBodyV2 = JSON.parse(sibling.signedString);
            // TODO add sequence, previousEvent
            return standardizeSpasmEventAnyV2(spasmEventBodyV2);
        }
    }
    if (sibling.type === "SiblingSpasmSignedV2") {
        if ("signedString" in sibling &&
            sibling.signedString &&
            typeof (sibling.signedString) === "string" &&
            "signatures" in sibling &&
            Array.isArray(sibling.signatures) &&
            sibling.signatures[0] &&
            sibling.signatures[0].value &&
            typeof (sibling.signatures[0].value) === "string") {
            // TODO each sibling might have multiple signatures,
            // eg. Spasm protocol signed with Ethereum and Nostr keys.
            // const verifyAllSignaturesOfSibling = (sibling) => {}
            const { signedString } = sibling;
            const signature = sibling.signatures[0].value;
            const signer = extractSignerFromEthereumSignature(signedString, signature);
            if (!signer || typeof (signer) !== "string")
                return null;
            const spasmEventBodySignedV2 = {
                type: "SpasmEventBodySignedClosedV2",
                signedString, signature, signer
            };
            // TODO add sequence, previousEvent
            return standardizeSpasmEventAnyV2(spasmEventBodySignedV2);
        }
    }
    if (sibling.type === "SiblingDmpV2") {
        if ("signedString" in sibling &&
            sibling.signedString &&
            typeof (sibling.signedString) === "string") {
            const dmpEvent = JSON.parse(sibling.signedString);
            return standardizeEventV2(dmpEvent);
        }
    }
    if (sibling.type === "SiblingDmpSignedV2") {
        if ("signedString" in sibling &&
            sibling.signedString &&
            typeof (sibling.signedString) === "string" &&
            "signatures" in sibling &&
            Array.isArray(sibling.signatures) &&
            sibling.signatures[0] &&
            sibling.signatures[0].value &&
            typeof (sibling.signatures[0].value) === "string") {
            const { signedString } = sibling;
            const signature = sibling.signatures[0].value;
            const signer = extractSignerFromEthereumSignature(signedString, signature);
            if (!signer || typeof (signer) !== "string")
                return null;
            const dmpEventSigned = {
                signedString, signature, signer
            };
            return standardizeNonSpasmEventV2(dmpEventSigned);
        }
    }
    if (sibling.type === "SiblingNostrV2" &&
        sibling.originalObject) {
        return standardizeNonSpasmEventV2(sibling.originalObject);
    }
    if (sibling.type === "SiblingNostrSpasmV2" &&
        sibling.originalObject) {
        return standardizeNonSpasmEventV2(sibling.originalObject);
    }
    if (sibling.type === "SiblingNostrSignedV2" &&
        sibling.originalObject) {
        return standardizeNonSpasmEventV2(sibling.originalObject);
    }
    if (sibling.type === "SiblingNostrSpasmSignedV2" &&
        sibling.originalObject) {
        return standardizeNonSpasmEventV2(sibling.originalObject);
    }
    return null;
};
export const standardizeDmpEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEvent(event))
        return null;
    const protocolVersion = extractVersion(event.version);
    const spasmEventV2 = {
        type: "SpasmEventV2",
        // action: event.action,
        // title: event.title,
        // content: event.text,
        // timestamp: toBeTimestamp(event.time),
        // license: event.license,
        siblings: [
            {
                type: "SiblingDmpV2",
                protocol: {
                    name: "dmp",
                    version: protocolVersion
                },
                signedString: JSON.stringify(event),
            }
        ]
    };
    if (event.action) {
        spasmEventV2.action = event.action;
    }
    if (event.title) {
        spasmEventV2.title = event.title;
    }
    if (event.text) {
        spasmEventV2.content = event.text;
    }
    if (event.license) {
        spasmEventV2.license = event.license;
    }
    if (event.time) {
        spasmEventV2.timestamp = toBeTimestamp(event.time);
    }
    if (event.target) {
        spasmEventV2.parent = {
            ids: [
                {
                    value: event.target,
                    // Create a new format field only if a
                    // format can be determined from a string.
                    ...(getFormatFromId(event.target)
                        ? { format: getFormatFromId(event.target) }
                        : {})
                }
            ]
        };
    }
    return spasmEventV2;
};
// standardizeDmpEventSignedClosedV2
export const standardizeDmpEventSignedClosedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEventSignedClosed(event))
        return null;
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const isEthereumSignatureValid = verifyEthereumSignature(event.signedString, event.signature, event.signer);
    if (!isEthereumSignatureValid)
        return null;
    const dmpEvent = JSON.parse(event.signedString);
    const dmpEventConvertedToSpasmV2 = standardizeDmpEventV2(dmpEvent);
    if (!dmpEventConvertedToSpasmV2)
        return null;
    const dmpEventSignedClosedConvertedToSpasmV2 = {
        ...dmpEventConvertedToSpasmV2,
        authors: [
            {
                addresses: [
                    {
                        value: event.signer,
                        // Create a new format field only if a
                        // format can be determined from a string.
                        ...(getFormatFromAddress(event.signer)
                            ? { format: getFormatFromAddress(event.signer) }
                            : {})
                        // TODO add a function to verify signatures 
                        // verified: true
                    }
                ]
            }
        ],
        ids: [
            {
                value: event.signature,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromId(event.signature)
                    ? {
                        format: getFormatFromId(event.signature),
                    }
                    : {})
            },
        ],
        signatures: [
            {
                value: event.signature,
                pubkey: event.signer,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromSignature(event.signature)
                    ? {
                        format: getFormatFromSignature(event.signature),
                    }
                    : {})
            }
        ]
    };
    const spasmEventV2 = dmpEventSignedClosedConvertedToSpasmV2;
    // Add 'verified' flag to the address that was verified
    markSpasmEventAddressAsVerified(spasmEventV2, event.signer);
    if (spasmEventV2) {
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingDmpSignedV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingDmpSignedV2";
        spasmEventV2.siblings[0].signatures = [
            {
                value: event.signature,
                pubkey: event.signer,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromSignature(event.signature)
                    ? {
                        format: getFormatFromSignature(event.signature),
                    }
                    : {})
            }
        ];
        spasmEventV2.siblings[0].ids = [
            {
                value: event.signature,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromId(event.signature)
                    ? {
                        format: getFormatFromId(event.signature),
                    }
                    : {})
            }
        ];
    }
    return spasmEventV2;
};
// standardizeDmpEventSignedOpenedV2
export const standardizeDmpEventSignedOpenedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEventSignedOpened(event))
        return null;
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const dmpEventSignedClosed = {
        signedString: event.signedString,
        signature: event.signature,
        signer: event.signer
    };
    const DmpEventSignedOpenedConvertedToSpasmV2 = standardizeDmpEventSignedClosedV2(dmpEventSignedClosed);
    if (!DmpEventSignedOpenedConvertedToSpasmV2)
        return null;
    return DmpEventSignedOpenedConvertedToSpasmV2;
};
export const getTagMappedDetails = (tag, tags) => {
    if (!tag)
        return null;
    if (!isArrayOfStrings(tag))
        return null;
    if (!tags)
        return null;
    if (!isArrayWithValues(tags))
        return null;
    if (!tag[0] || typeof (tag[0]) !== "string")
        return null;
    if (!tag[1] || typeof (tag[0]) !== "string")
        return null;
    const tagName = tag[0];
    const tagValue = tag[1];
    let mappedDetails = [];
    tags.forEach(tag => {
        if (tag[0] === "tags_mapping" &&
            tag[2] === tagName &&
            tag[3] === tagValue) {
            mappedDetails.push(tag);
        }
    });
    if (isArrayWithValues(mappedDetails)) {
        return mappedDetails;
    }
    return null;
};
export const isMappedTag = (tag, tags) => {
    return !!(getTagMappedDetails(tag, tags));
};
export const getOriginalFromValueAndMethod = (value, method, original) => {
    if (!value)
        return null;
    if (!method)
        return null;
    // full
    if (method === "full") {
        return value;
    }
    // hex_to_spasmid01_1
    if (method === "hex_to_spasmid01_1") {
        if (value && typeof (value) === "string") {
            return "spasmid01" + value;
        }
    }
    // slice064
    if (method === "slice064") {
        if (original && typeof (original) === "string" &&
            // verify
            original.slice(0, 64) === value) {
            return original;
        }
    }
    // slice064
    if (method === "slice266") {
        if (original && typeof (original) === "string" &&
            // verify
            original.slice(2, 66) === value) {
            return original;
        }
    }
    // hex_to_eth_pub_1
    if (method === "hex_to_eth_pub_1") {
        if (value && typeof (value) === "string") {
            return "0x" + value.slice(0, 40);
        }
    }
    // slice.13
    if (method === "slice.13") {
        if (value && typeof (value) === "string") {
            return value.slice(13);
        }
    }
    // slice.19
    if (method === "slice.19") {
        if (value && typeof (value) === "string") {
            return value.slice(19);
        }
    }
    // sha256
    if (method === "sha256") {
        if (original && typeof (original) === "string" &&
            // verify
            sha256(original) === value) {
            return original;
        }
    }
    return null;
};
export const getOriginalValueFromTagMappedDetails = (tag) => {
    if (!tag || !isArrayOfStrings(tag) ||
        tag[0] !== "tags_mapping" ||
        !tag[1] || typeof (tag[1]) !== "string") {
        return null;
    }
    let value;
    let method;
    let original;
    // spasm_id_1
    if (tag[1] === "spasm_id_1") {
        value = tag[3];
        method = tag[8];
        original = tag[9];
    }
    // spasm_add_1
    if (tag[1] === "spasm_add_1") {
        value = tag[3];
        method = tag[8];
        original = tag[9];
    }
    // spasm_aadd_1
    if (tag[1] === "spasm_aadd_1") {
        value = tag[3];
        method = tag[8];
        original = tag[9];
    }
    if (value && method) {
        return getOriginalFromValueAndMethod(value, method, original);
    }
    else {
        return null;
    }
};
export const standardizeNostrEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEvent(event))
        return null;
    const spasmEventV2 = {
        type: "SpasmEventV2",
        // action
        content: event.content,
        timestamp: event.created_at,
        authors: [
            {
                addresses: [
                    {
                        value: toBeHex(event.pubkey),
                        format: {
                            name: "nostr-hex"
                        }
                    }
                ]
            }
        ],
        siblings: [
            {
                type: "SiblingNostrV2",
                originalObject: event,
                protocol: {
                    name: "nostr",
                    // hasExtraSpasmFields: false
                }
            }
        ]
    };
    if (event.id && typeof (event.id) === "string") {
        spasmEventV2.ids = [
            {
                value: toBeHex(event.id),
                format: {
                    name: "nostr-hex"
                }
            }
        ],
            // Create siblings if it's null or undefined
            spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrV2",
            protocol: {
                name: "nostr",
            }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].ids = [
            {
                value: toBeHex(event.id),
                format: {
                    name: "nostr-hex"
                }
            }
        ];
    }
    // Mapped
    let rootEventsMapped = [];
    let parentEventsMapped = [];
    let referencedEventsMapped = [];
    let mentionedAuthorsMapped = [];
    let extraAuthorsMapped = [];
    // Unmapped
    let rootEvents = [];
    let parentEvents = [];
    let referencedEvents = [];
    let mentionedAuthors = [];
    let extraAuthors = [];
    let keywords = [];
    // Remove duplicate tags
    let uniqueTags = [];
    if (event.tags && Array.isArray(event.tags)) {
        uniqueTags = removeDuplicateNostrTags(event.tags);
    }
    if (uniqueTags && Array.isArray(uniqueTags) &&
        isArrayWithValues(uniqueTags)) {
        event.tags.forEach(function (tag) {
            // References
            // ["e", <event-id>, <relay-url>, <marker>, <pubkey>]
            // Mapped 'e' tags
            if (Array.isArray(tag) && tag[0] === "e" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                isMappedTag(tag, event.tags)) {
                // We have to make sure that each tags_mapping tag with
                // associated tag is used, because there might
                // be multiple tags_mappings tags for one tag.
                // For example, duplicate parent IDs will have two
                // different tags_mappings associated with the same ID,
                // but they will have different mapped values since
                // duplicate parent IDs on the original Spasm event will
                // be located at the different array indexes, e.g.,
                // parentId[0] and parentId[1].
                // Another example is having two different mentioned
                // authors with multiple pubkeys which share the same
                // pubkey, e.g.:
                // mentioned-author-1: eth-pubkey-1 && nostr-pubkey1
                // mentioned-author-2: eth-pubkey-1 && nostr-pubkey2
                // This might happend if an author changed his Nostr
                // signing key during a conversation tree, but kept
                // the same Ethereum key, e.g., if his Nostr key got
                // compromised. In that case, there will be two
                // different tags_mapping tags associated with
                // eth-pubkey-1 since it's located in two different
                // objects.
                const arrayOfTagDetails = getTagMappedDetails(tag, event.tags);
                if (arrayOfTagDetails &&
                    isArrayWithValues(arrayOfTagDetails)) {
                    arrayOfTagDetails.forEach((tagDetails) => {
                        if (tagDetails && isArrayOfStrings(tagDetails) &&
                            tagDetails[1] === "spasm_id_1" &&
                            tagDetails[2] === tag[0] && tagDetails[3] === tag[1] &&
                            tagDetails[4] === "se2") {
                            const originalValue = getOriginalValueFromTagMappedDetails(tagDetails);
                            const path = tagDetails[5];
                            const eventIndex = Number(tagDetails[6]);
                            const idIndex = Number(tagDetails[7]);
                            if (originalValue &&
                                typeof (originalValue) === "string" &&
                                path && typeof (path) === "string" &&
                                typeof (eventIndex) === "number" && eventIndex >= 0 &&
                                typeof (idIndex) === "number" && idIndex >= 0) {
                                // <event-id>
                                const eventId = {
                                    value: originalValue,
                                    // Create a new format field only if a
                                    // format can be determined from a string.
                                    ...(getFormatFromId(originalValue)
                                        ? { format: getFormatFromId(originalValue) }
                                        : {})
                                };
                                const formatName = tagDetails[10];
                                if (formatName && typeof (formatName) === "string") {
                                    eventId.format ??= {
                                        name: formatName
                                    };
                                    eventId.format.name =
                                        formatName;
                                }
                                const formatVersion = tagDetails[11];
                                if (formatVersion &&
                                    typeof (formatVersion) === "string" &&
                                    eventId.format) {
                                    eventId.format.version = formatVersion;
                                }
                                const marker = tagDetails[12];
                                if (marker && typeof (marker) === "string") {
                                    eventId.marker = marker;
                                }
                                const pubkey = tag[4];
                                if (pubkey && typeof (pubkey) === "string") {
                                    if (tagDetails[1] === "spasm_id_1" &&
                                        tagDetails[14] &&
                                        typeof (tagDetails[14]) === "string") {
                                        const pubkeyMethod = tagDetails[14];
                                        // Original might be undefined or empty string
                                        const pubkeyOriginal = tagDetails[15];
                                        const pubkeyValue = getOriginalFromValueAndMethod(pubkey, pubkeyMethod, pubkeyOriginal);
                                        if (pubkeyValue && typeof (pubkeyValue) === "string") {
                                            eventId.pubkey = pubkeyValue;
                                        }
                                    }
                                }
                                const hosts = [];
                                if (tagDetails[13] &&
                                    typeof (tagDetails[13] === "string")) {
                                    const hostsStrings = tagDetails[13].split(',');
                                    if (isArrayOfStrings(hostsStrings)) {
                                        hostsStrings.forEach(host => {
                                            hosts.push({ value: host });
                                        });
                                    }
                                }
                                if (isArrayWithValues(hosts)) {
                                    eventId.hosts = hosts;
                                }
                                if (path === "parent.ids") {
                                    // Create object it's null or undefined
                                    parentEventsMapped[eventIndex] ??= { ids: [] };
                                    // Create ids if it's null or undefined
                                    parentEventsMapped[eventIndex].ids ??= [];
                                    parentEventsMapped[eventIndex].ids[idIndex] =
                                        eventId;
                                }
                                else if (path === "root.ids") {
                                    // Create object it's null or undefined
                                    rootEventsMapped[eventIndex] ??= { ids: [] };
                                    // Create ids if it's null or undefined
                                    rootEventsMapped[eventIndex].ids ??= [];
                                    rootEventsMapped[eventIndex].ids[idIndex] =
                                        eventId;
                                }
                                else if (path === "references.ids") {
                                    // Create object it's null or undefined
                                    referencedEventsMapped[eventIndex] ??= { ids: [] };
                                    // Create ids if it's null or undefined
                                    referencedEventsMapped[eventIndex].ids ??= [];
                                    referencedEventsMapped[eventIndex].ids[idIndex] =
                                        eventId;
                                }
                            }
                        }
                    });
                }
            }
            // Unmapped 'e' tags
            if (Array.isArray(tag) && tag[0] === "e" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                !isMappedTag(tag, event.tags)) {
                // <event-id>
                const referencedEvent = {
                    ids: [
                        {
                            value: toBeHex(tag[1]),
                            // Create a new format field only if a
                            // format can be determined from a string.
                            ...(getFormatFromId(tag[1])
                                ? { format: getFormatFromId(tag[1]) }
                                : {})
                        }
                    ]
                };
                // <pubkey>
                if (tag[4] && typeof (tag[4]) === 'string') {
                    referencedEvent.ids[0].pubkey = tag[4];
                }
                // <relay-url>
                if (tag[2] && typeof (tag[2]) === "string") {
                    referencedEvent.ids[0].hosts = [
                        { value: tag[2] }
                    ];
                }
                // <marker>
                if (tag[3] && typeof (tag[3]) === 'string') {
                    // referencedEvent.marker = tag[3]
                    if (tag[3] === 'root') {
                        spasmEventV2.action = 'reply';
                        rootEvents.push(referencedEvent);
                    }
                    else if (tag[3] === 'reply') {
                        spasmEventV2.action = 'reply';
                        parentEvents.push(referencedEvent);
                    }
                    else if (tag[3] === 'mention') {
                        referencedEvents.push(referencedEvent);
                    }
                }
                else {
                    referencedEvents.push(referencedEvent);
                }
            }
            // Mentions
            // ["p", <event-id>, <relay-url>, <marker>]
            // Mapped
            if (Array.isArray(tag) && tag[0] === "p" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                isMappedTag(tag, event.tags)) {
                const arrayOfTagDetails = getTagMappedDetails(tag, event.tags);
                if (arrayOfTagDetails &&
                    isArrayWithValues(arrayOfTagDetails)) {
                    arrayOfTagDetails.forEach((tagDetails) => {
                        if (tagDetails && isArrayOfStrings(tagDetails) &&
                            tagDetails[1] === "spasm_add_1" &&
                            tagDetails[2] === tag[0] && tagDetails[3] === tag[1] &&
                            tagDetails[4] === "se2") {
                            const originalValue = getOriginalValueFromTagMappedDetails(tagDetails);
                            const path = tagDetails[5];
                            const authorIndex = Number(tagDetails[6]);
                            const addressIndex = Number(tagDetails[7]);
                            if (originalValue &&
                                typeof (originalValue) === "string" &&
                                path && typeof (path) === "string" &&
                                typeof (authorIndex) === "number" &&
                                authorIndex >= 0 &&
                                typeof (addressIndex) === "number" &&
                                addressIndex >= 0) {
                                // <pubkey>
                                const address = {
                                    value: originalValue,
                                    // Create a new format field only if a
                                    // format can be determined from a string.
                                    ...(getFormatFromAddress(originalValue)
                                        ? { format: getFormatFromAddress(originalValue) }
                                        : {})
                                };
                                const formatName = tagDetails[10];
                                if (formatName && typeof (formatName) === "string") {
                                    address.format ??= {
                                        name: formatName
                                    };
                                    address.format.name =
                                        formatName;
                                }
                                const formatVersion = tagDetails[11];
                                if (formatVersion &&
                                    typeof (formatVersion) === "string" &&
                                    address.format) {
                                    address.format.version = formatVersion;
                                }
                                const marker = tagDetails[12];
                                if (marker && typeof (marker) === "string") {
                                    address.marker = marker;
                                }
                                const hosts = [];
                                if (tagDetails[13] &&
                                    typeof (tagDetails[13] === "string")) {
                                    const hostsStrings = tagDetails[13].split(',');
                                    if (isArrayOfStrings(hostsStrings)) {
                                        hostsStrings.forEach(host => {
                                            hosts.push({ value: host });
                                        });
                                    }
                                }
                                if (isArrayWithValues(hosts)) {
                                    address.hosts = hosts;
                                }
                                if (path === "mentions.addresses") {
                                    // Create object it's null or undefined
                                    mentionedAuthorsMapped[authorIndex] ??= {
                                        addresses: []
                                    };
                                    // Create addresses if it's null or undefined
                                    mentionedAuthorsMapped[authorIndex]
                                        .addresses ??= [];
                                    if (mentionedAuthorsMapped &&
                                        mentionedAuthorsMapped[authorIndex] &&
                                        mentionedAuthorsMapped[authorIndex].addresses &&
                                        Array.isArray(mentionedAuthorsMapped[authorIndex].addresses)) {
                                        mentionedAuthorsMapped[authorIndex]
                                            .addresses[addressIndex] = address;
                                    }
                                }
                            }
                        }
                    });
                }
            }
            // Unmapped
            if (Array.isArray(tag) && tag[0] === "p" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                !isMappedTag(tag, event.tags)) {
                // <pubkey>
                const mentionedAuthor = {
                    addresses: [
                        {
                            value: toBeHex(tag[1]),
                            // Create a new format field only if a
                            // format can be determined from a string.
                            ...(getFormatFromAddress(tag[1])
                                ? { format: getFormatFromAddress(tag[1]) }
                                : {})
                        }
                    ]
                };
                // <relay-url>
                if (tag[2] && typeof (tag[2]) === "string") {
                    // Create addresses if it's null or undefined
                    mentionedAuthor.addresses ??= [];
                    mentionedAuthor.addresses[0].hosts = [
                        { value: tag[2] }
                    ];
                }
                // <marker>
                if (tag[3] && typeof (tag[3]) === 'string') {
                    mentionedAuthor.marker = tag[3];
                }
                mentionedAuthors.push(mentionedAuthor);
            }
            // Extra authors
            // ["O", <author_address>]
            // Mapped
            if (Array.isArray(tag) && tag[0] === "O" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                isMappedTag(tag, event.tags)) {
                const arrayOfTagDetails = getTagMappedDetails(tag, event.tags);
                if (arrayOfTagDetails &&
                    isArrayWithValues(arrayOfTagDetails)) {
                    arrayOfTagDetails.forEach((tagDetails) => {
                        if (tagDetails && isArrayOfStrings(tagDetails) &&
                            tagDetails[1] === "spasm_aadd_1" &&
                            tagDetails[2] === tag[0] && tagDetails[3] === tag[1] &&
                            tagDetails[4] === "se2") {
                            const originalValue = getOriginalValueFromTagMappedDetails(tagDetails);
                            const path = tagDetails[5];
                            const authorIndex = Number(tagDetails[6]);
                            const addressIndex = Number(tagDetails[7]);
                            if (originalValue &&
                                typeof (originalValue) === "string" &&
                                path && typeof (path) === "string" &&
                                typeof (authorIndex) === "number" &&
                                authorIndex >= 0 &&
                                typeof (addressIndex) === "number" &&
                                addressIndex >= 0) {
                                const address = {
                                    value: originalValue,
                                    // Create a new format field only if a
                                    // format can be determined from a string.
                                    ...(getFormatFromAddress(originalValue)
                                        ? { format: getFormatFromAddress(originalValue) }
                                        : {})
                                };
                                const formatName = tagDetails[10];
                                if (formatName && typeof (formatName) === "string") {
                                    address.format ??= {
                                        name: formatName
                                    };
                                    address.format.name =
                                        formatName;
                                }
                                const formatVersion = tagDetails[11];
                                if (formatVersion &&
                                    typeof (formatVersion) === "string" &&
                                    address.format) {
                                    address.format.version = formatVersion;
                                }
                                const marker = tagDetails[12];
                                if (marker && typeof (marker) === "string") {
                                    address.marker = marker;
                                }
                                const hosts = [];
                                if (tagDetails[13] &&
                                    typeof (tagDetails[13] === "string")) {
                                    const hostsStrings = tagDetails[13].split(',');
                                    if (isArrayOfStrings(hostsStrings)) {
                                        hostsStrings.forEach(host => {
                                            hosts.push({ value: host });
                                        });
                                    }
                                }
                                if (isArrayWithValues(hosts)) {
                                    address.hosts = hosts;
                                }
                                if (path === "authors.addresses") {
                                    // Create object it's null or undefined
                                    spasmEventV2.authors ??= [];
                                    spasmEventV2.authors[authorIndex] ??= {
                                        addresses: []
                                    };
                                    // Create addresses if it's null or undefined
                                    spasmEventV2.authors[authorIndex]
                                        .addresses ??= [];
                                    if (spasmEventV2.authors &&
                                        spasmEventV2.authors[authorIndex] &&
                                        spasmEventV2.authors[authorIndex].addresses &&
                                        Array.isArray(spasmEventV2.authors[authorIndex].addresses)) {
                                        spasmEventV2.authors[authorIndex]
                                            .addresses[addressIndex] = address;
                                    }
                                }
                                //   // Create object it's null or undefined
                                //   extraAuthorsMapped[authorIndex] ??= {
                                //     addresses: []
                                //   }
                                //   // Create addresses if it's null or undefined
                                //   extraAuthorsMapped[authorIndex]
                                //     .addresses ??= []
                                //   if (
                                //     extraAuthorsMapped &&
                                //     extraAuthorsMapped[authorIndex] &&
                                //     extraAuthorsMapped[authorIndex].addresses &&
                                //     Array.isArray(extraAuthorsMapped[authorIndex].addresses)
                                //   ) {
                                //     extraAuthorsMapped[authorIndex]
                                //       .addresses![addressIndex] = address
                                //   }
                                // }
                            }
                        }
                    });
                }
            }
            // Nostr hashtags converted to keywords
            if (Array.isArray(tag) && tag[0] === "t" &&
                tag[1] && typeof (tag[1]) === 'string') {
                keywords.push(tag[1]);
            }
            // Nostr referenced URLs
            if (Array.isArray(tag) && tag[0] === "r" &&
                tag[1] && typeof (tag[1]) === 'string' &&
                !isMappedTag(tag, event.tags)) {
                // <event-id>
                const referencedEvent = {
                    ids: [
                        {
                            value: tag[1],
                            // Create a new format field only if a
                            // format can be determined from a string.
                            ...(getFormatFromId(tag[1])
                                ? { format: getFormatFromId(tag[1]) }
                                : {})
                        }
                    ]
                };
                if (referencedEvent) {
                    referencedEvents.push(referencedEvent);
                }
            }
        });
    }
    // Add mapped events
    rootEvents = rootEventsMapped.concat(rootEvents);
    parentEvents = parentEventsMapped.concat(parentEvents);
    referencedEvents =
        referencedEventsMapped.concat(referencedEvents);
    mentionedAuthors =
        mentionedAuthorsMapped.concat(mentionedAuthors);
    extraAuthors = extraAuthorsMapped.concat(extraAuthors);
    // Filter out null, undefined
    rootEvents = rootEvents.filter(val => val);
    parentEvents = parentEvents.filter(val => val);
    referencedEvents = referencedEvents.filter(val => val);
    mentionedAuthors = mentionedAuthors.filter(val => val);
    extraAuthors = extraAuthors.filter(val => val);
    spasmEventV2.authors =
        spasmEventV2.authors?.concat(extraAuthors);
    if (keywords &&
        keywords[0] &&
        hasValue(keywords)) {
        // spasmEventV2.keywords ??= [];
        spasmEventV2.keywords = keywords;
    }
    if (mentionedAuthors &&
        mentionedAuthors[0] &&
        hasValue(mentionedAuthors)) {
        // spasmEventV2.mentions ??= [];
        spasmEventV2.mentions = mentionedAuthors;
    }
    // Event has at least one 'e' tag with marker 'reply'
    if (parentEvents && parentEvents[0] && hasValue(parentEvents)) {
        spasmEventV2.parent = parentEvents[0];
        const restOfReplyEvents = parentEvents.slice(1);
        referencedEvents =
            referencedEvents.concat(restOfReplyEvents);
        if (rootEvents && rootEvents[0] && hasValue(rootEvents)) {
            spasmEventV2.root = rootEvents[0];
            const restOfRootEvents = rootEvents.slice(1);
            referencedEvents =
                referencedEvents.concat(restOfRootEvents);
        }
        // Event has no 'e' tag with marker 'reply', but
        // it has at least one 'e' tag with marker 'root'.
        // Root ID is assigned as a parent ID.
    }
    else if (rootEvents && rootEvents[0] && hasValue(rootEvents)) {
        spasmEventV2.parent = rootEvents[0];
        const restOfRootEvents = rootEvents.slice(1);
        referencedEvents =
            referencedEvents.concat(restOfRootEvents);
        // Event has no 'e' tag with marker 'reply'
        // and no 'e' tag with marker 'root'.
        // The first referenced ID is assigned as a parent ID.
    }
    else if (referencedEvents && referencedEvents[0]) {
        // The first reference is always assigned as a parent
        // while all other references are assigned as references.
        spasmEventV2.parent = referencedEvents[0];
        const restOfReferencedEvents = referencedEvents.slice(1);
        referencedEvents = restOfReferencedEvents;
    }
    if (referencedEvents &&
        hasValue(referencedEvents) &&
        referencedEvents[0]) {
        // TODO write tests for multiple references
        spasmEventV2.references = referencedEvents;
    }
    if (!spasmEventV2.action && event.kind === 1) {
        // Kind 1 event without referenced events is usually "post"
        if (!event.tags || !hasValue(spasmEventV2.parent)) {
            spasmEventV2.action = "post";
            // It's usually a reply if any other event is referenced
        }
        else if (hasValue(spasmEventV2.parent)) {
            spasmEventV2.action = "reply";
        }
    }
    return spasmEventV2;
};
// standardizeNostrSpasmEventV2
export const standardizeNostrSpasmEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEvent(event))
        return null;
    const spasmEventV2 = standardizeNostrEventV2(event);
    if (!spasmEventV2)
        return null;
    let extraFieldsSpasmVersion = getNostrSpasmVersion(event);
    let spasmTarget = "";
    let spasmTimestamp = null;
    let spasmAction = null;
    let spasmTitle = null;
    let license = null;
    if (event.tags &&
        Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            if (Array.isArray(tag) && tag[0] === "spasm_target") {
                spasmTarget = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_action") {
                spasmAction = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_timestamp") {
                if (Number(tag[1])) {
                    spasmTimestamp = Number(tag[1]);
                }
            }
            if (Array.isArray(tag) && (tag[0] === "spasm_title" ||
                tag[0] === "title")) {
                spasmTitle = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "license") {
                license = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_tips" &&
                tag[1] && typeof (tag[1]) === "string") {
                const tip = { address: tag[1] };
                if (tag[2] && typeof (tag[2]) === "string") {
                    tip.text = tag[2];
                }
                if (tag[3] && typeof (tag[3]) === "string") {
                    const timestamp = Number(tag[3]);
                    if (typeof (timestamp) === "number") {
                        tip.expiration = { timestamp: timestamp };
                    }
                }
                if (tag[4] && typeof (tag[4] === "string")) {
                    tip.currency ??= {};
                    tip.currency.name = tag[4];
                }
                if (tag[5] && typeof (tag[5] === "string")) {
                    tip.currency ??= {};
                    tip.currency.ticker = tag[5];
                }
                if (tag[6] && typeof (tag[6] === "string")) {
                    tip.network ??= {};
                    tip.network.name = tag[6];
                }
                else if (tag[6] && typeof (tag[6] === "number")) {
                    const str = String(tag[6]);
                    if (str && typeof (str) === "string") {
                        tip.network ??= {};
                        tip.network.name = tag[6];
                    }
                }
                if (tag[7] && typeof (tag[7] === "string")) {
                    tip.network ??= {};
                    tip.network.id = tag[7];
                }
                else if (tag[7] && typeof (tag[7] === "number")) {
                    const str = String(tag[7]);
                    if (str && typeof (str) === "string") {
                        tip.network ??= {};
                        tip.network.id = tag[7];
                    }
                }
                spasmEventV2.tips ??= [];
                spasmEventV2.tips?.push(tip);
            }
            if (Array.isArray(tag) && tag[0] === "spasm_category") {
                if (tag[1] && typeof (tag[1]) === "string") {
                    const category = {
                        name: tag[1]
                    };
                    if (tag[2] && typeof (tag[2]) === "string") {
                        category.sub = {
                            name: tag[2]
                        };
                        if (tag[3] && typeof (tag[3]) === "string") {
                            category.sub.sub = {
                                name: tag[3]
                            };
                            if (tag[4] && typeof (tag[4]) === "string") {
                                category.sub.sub.sub = {
                                    name: tag[4]
                                };
                            }
                        }
                    }
                    // TODO make a better loop for categories
                    spasmEventV2.categories ??= [];
                    spasmEventV2.categories?.push(category);
                }
            }
        });
    }
    if (license) {
        spasmEventV2.license = license;
    }
    if (spasmAction) {
        spasmEventV2.action = spasmAction;
    }
    if (spasmTimestamp) {
        spasmEventV2.timestamp = spasmTimestamp;
    }
    if (spasmTitle) {
        spasmEventV2.title = spasmTitle;
    }
    if (spasmTarget && typeof (spasmTarget) === "string") {
        // Create parent if it's null or undefined
        spasmEventV2.parent ??= { ids: [] };
        const parentId = {
            value: spasmTarget,
            format: getFormatFromId(spasmTarget)
        };
        spasmEventV2.parent.ids.push(parentId);
    }
    if (spasmTarget || spasmAction ||
        spasmTitle || extraFieldsSpasmVersion) {
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingNostrSpasmV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmV2";
        spasmEventV2.siblings[0].protocol.hasExtraSpasmFields = true;
        if (extraFieldsSpasmVersion) {
            spasmEventV2.siblings[0]
                .protocol.extraSpasmFieldsVersion = extraFieldsSpasmVersion;
        }
    }
    return spasmEventV2;
};
// standardizeNostrEventSignedOpenedV2
export const standardizeNostrEventSignedOpenedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEventSignedOpened(event))
        return null;
    const spasmEventV2 = standardizeNostrEventV2(event);
    if (!spasmEventV2)
        return null;
    /**
     * nostr-tools v2 creates a `[Symbol("verified")]: true` on
     * the Nostr object during verification process, which messes
     * up tests, so the deep copy of the object is verified using
     * JSON stringify/parse to make sure that the original Nostr
     * event stays untouched.
     */
    const eventCopy = JSON.parse(JSON.stringify(event));
    const isNostrSignatureValid = verifyNostrEvent(eventCopy);
    if (!isNostrSignatureValid)
        return null;
    if (event.sig && typeof (event.sig) &&
        event.pubkey && typeof (event.pubkey) === "string") {
        // Create signatures if it's null or undefined
        spasmEventV2.signatures ??= [];
        spasmEventV2.signatures.push({
            value: event.sig,
            pubkey: event.pubkey,
            format: { name: "nostr-sig" }
        });
        // Create parent if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingNostrSignedV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSignedV2";
        spasmEventV2.siblings[0].signatures ??= [];
        spasmEventV2.siblings[0].signatures.push({
            value: event.sig,
            pubkey: event.pubkey,
            format: { name: "nostr-sig" }
        });
        // Add 'verified' flag to the address that was verified
        markSpasmEventAddressAsVerified(spasmEventV2, event.pubkey);
    }
    return spasmEventV2;
};
// standardizeNostrSpasmEventSignedOpenedV2
export const standardizeNostrSpasmEventSignedOpenedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEventSignedOpened(event))
        return null;
    const spasmEventV2 = standardizeNostrSpasmEventV2(event);
    if (!spasmEventV2)
        return null;
    /**
     * nostr-tools v2 creates a `[Symbol("verified")]: true` on
     * the Nostr object during verification process, which messes
     * up tests, so the deep copy of the object is verified using
     * JSON stringify/parse to make sure that the original Nostr
     * event stays untouched.
     */
    const eventCopy = JSON.parse(JSON.stringify(event));
    const isNostrSignatureValid = verifyNostrEvent(eventCopy);
    if (!isNostrSignatureValid)
        return null;
    if (event.sig && typeof (event.sig) &&
        event.pubkey && typeof (event.pubkey) === "string") {
        // Create signatures if it's null or undefined
        spasmEventV2.signatures ??= [];
        spasmEventV2.signatures.push({
            value: event.sig,
            pubkey: event.pubkey,
            format: { name: "nostr-sig" }
        });
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrSpasmSignedV2",
            protocol: { name: "nostr" }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2";
        spasmEventV2.siblings[0].signatures ??= [];
        spasmEventV2.siblings[0].signatures.push({
            value: event.sig,
            pubkey: event.pubkey,
            format: { name: "nostr-sig" }
        });
        // Add 'verified' flag to the address that was verified
        markSpasmEventAddressAsVerified(spasmEventV2, event.pubkey);
    }
    // NostrSpasm versions prior to 2.0.0 assigned sig as event id
    if (event.sig && typeof (event.sig) === "string" &&
        getNostrSpasmVersion(event) === "1.0.0") {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: event.sig,
            format: {
                name: "nostr-sig"
            }
        });
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrSpasmSignedV2",
            protocol: { name: "nostr" }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2";
        spasmEventV2.siblings[0].ids ??= [];
        spasmEventV2.siblings[0].ids.push({
            value: event.sig,
            format: {
                name: "nostr-sig"
            }
        });
    }
    return spasmEventV2;
};
// standardizeSpasmDmpEventSignedClosedV0_V2
export const standardizeSpasmDmpEventSignedClosedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    const dmpEvent = {
        signedString: spasmEventV0.signed_message,
        signature: "",
        signer: ""
    };
    if (spasmEventV0.signature &&
        typeof (spasmEventV0.signature) === "string") {
        dmpEvent.signature = spasmEventV0.signature;
    }
    if (spasmEventV0.signer &&
        typeof (spasmEventV0.signer) === "string") {
        dmpEvent.signer = spasmEventV0.signer;
    }
    const spasmEventV2 = standardizeDmpEventSignedClosedV2(dmpEvent);
    return spasmEventV2;
};
// standardizeSpasmNostrEventSignedOpenedV0_V2
export const standardizeSpasmNostrEventSignedOpenedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(spasmEventV0);
    return standardizeNostrEventSignedOpenedV2(event);
};
// standardizeSpasmNostrSpasmEventSignedOpenedV0_V2
export const standardizeSpasmNostrSpasmEventSignedOpenedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(spasmEventV0);
    return standardizeNostrSpasmEventSignedOpenedV2(event);
};
// standardizeSpasmWithRssItemV0_V2
export const standardizeSpasmWithRssItemV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    const spasmEventV2 = {
        type: "SpasmEventV2",
        action: "post",
    };
    if (spasmEventV0.title) {
        spasmEventV2.title = spasmEventV0.title;
    }
    if (spasmEventV0.pubdate) {
        spasmEventV2.timestamp = toBeTimestamp(spasmEventV0.pubdate);
    }
    if (spasmEventV0.description) {
        spasmEventV2.content = spasmEventV0.description;
    }
    if (spasmEventV0.tags) {
        if (Array.isArray(spasmEventV0.tags)) {
            // Create ids if it's null or undefined
            spasmEventV2.keywords ??= [];
            spasmEventV2.keywords =
                spasmEventV2.keywords?.concat(spasmEventV0.tags);
        }
    }
    if (spasmEventV0.tickers) {
        if (typeof (spasmEventV0.tickers) === "string") {
            // Create ids if it's null or undefined
            spasmEventV2.keywords ??= [];
            spasmEventV2.keywords.push(spasmEventV0.tickers);
        }
        else if (Array.isArray(spasmEventV0.tickers)) {
            spasmEventV2.keywords =
                spasmEventV2.keywords?.concat(spasmEventV0.tickers);
        }
    }
    let siblingIds = [];
    if (spasmEventV0.url &&
        typeof (spasmEventV0.url) === "string") {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: spasmEventV0.url,
            format: {
                name: "url"
            }
        });
        siblingIds.push({
            value: spasmEventV0.url,
            format: {
                name: "url"
            }
        });
        // Create links if it's null or undefined
        spasmEventV2.links ??= [];
        const linkObject = createLinkObjectFromUrl(spasmEventV0.url);
        if (linkObject) {
            linkObject.originalProtocolKey = "url";
            spasmEventV2.links.push(linkObject);
        }
    }
    if (spasmEventV0.guid) {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: spasmEventV0.guid,
            format: {
                name: "guid"
            }
        });
        siblingIds.push({
            value: spasmEventV0.guid,
            format: {
                name: "guid"
            }
        });
        if (typeof (spasmEventV0.guid) === "string") {
            // Create links if it's null or undefined
            spasmEventV2.links ??= [];
            const linkObject = createLinkObjectFromUrl(spasmEventV0.guid);
            if (linkObject) {
                linkObject.originalProtocolKey = "guid";
                spasmEventV2.links.push(linkObject);
            }
        }
    }
    if (spasmEventV0.author) {
        // Create ids if it's null or undefined
        spasmEventV2.authors ??= [];
        spasmEventV2.authors.push({
            usernames: [
                {
                    value: spasmEventV0.author
                }
            ]
        });
    }
    // siblings
    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??= {
        type: "SiblingWeb2V2",
        protocol: { name: "web2" }
    };
    spasmEventV2.siblings[0] =
        spasmEventV2.siblings[0];
    spasmEventV2.siblings[0].type = "SiblingWeb2V2";
    spasmEventV2.siblings[0].protocol = { name: "web2" };
    // Add IDs (e.g., URL and guid) to siblings
    // spasmEventV2.siblings[0].ids ??= [];
    spasmEventV2.siblings[0].ids = siblingIds;
    // Destruct spasmEventV0 to exclude children
    // to avoid infinite recursion loop.
    const { children, ...originalObjectWithoutChildren } = spasmEventV0;
    spasmEventV2.siblings[0].originalObject =
        originalObjectWithoutChildren;
    return spasmEventV2;
};
// addFieldsFromEnvelopeSpasmEventV0_V2
export const addFieldsFromEnvelopeSpasmEventV0_V2 = (spasmEventV0, spasmEventV2) => {
    if (!spasmEventV0)
        return spasmEventV2;
    if (!spasmEventV2)
        return spasmEventV2;
    if (!isObjectWithValues(spasmEventV0))
        return spasmEventV2;
    if (!isObjectWithValues(spasmEventV2))
        return spasmEventV2;
    // db.key
    if (spasmEventV0.id) {
        if (typeof (spasmEventV0.id) === "number") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.key = spasmEventV0.id;
        }
        else if (typeof (spasmEventV0.id) === "string" &&
            Number(spasmEventV0.id)) {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.key = Number(spasmEventV0.id);
        }
    }
    // db.addedTimestamp
    if (spasmEventV0.added_time) {
        if (typeof (spasmEventV0.added_time) === "number") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.addedTimestamp =
                toBeTimestamp(spasmEventV0.added_time);
        }
        else if (typeof (spasmEventV0.added_time) === "string") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.addedTimestamp =
                toBeTimestamp(spasmEventV0.added_time);
        }
    }
    if (spasmEventV0.source && !spasmEventV2.source) {
        spasmEventV2.source = {
            name: spasmEventV0.source
        };
    }
    if (spasmEventV0.category && !spasmEventV2.categories) {
        // Create categories if it's null or undefined
        spasmEventV2.categories ??= [];
        spasmEventV2.categories.push({
            name: spasmEventV0.category
        });
    }
    // Reactions (e.g., upvote, downvote, etc.)
    const addReactions = (reaction) => {
        if (
        // 0 is a valid number
        // spasmEventV0[reaction] !== undefined &&
        typeof (spasmEventV0[reaction]) === "number") {
            // Create reactions if it's null or undefined
            spasmEventV2.stats ??= [];
            spasmEventV2.stats[0] ??= { action: "react" };
            spasmEventV2.stats[0].contents ??= [];
            spasmEventV2.stats[0].contents.push({
                value: reaction,
                total: spasmEventV0[reaction]
            });
        }
    };
    const reactions = [
        "upvote", "downvote",
        "bullish", "bearish",
        "important", "scam",
        "laugh",
        "toxic", "clown", "moon",
        "rocket"
    ];
    reactions.forEach(reaction => {
        addReactions(reaction);
    });
    // "comments_count",
    if (
    // 0 is a valid number
    // spasmEventV0["comments_count"] !== undefined &&
    typeof (spasmEventV0["comments_count"]) === "number") {
        // Create reactions if it's null or undefined
        spasmEventV2.stats ??= [];
        spasmEventV2.stats.push({
            action: "reply",
            total: spasmEventV0["comments_count"]
        });
    }
    // Comments
    if (spasmEventV0.children &&
        Array.isArray(spasmEventV0.children) &&
        spasmEventV0.children.length > 0) {
        const childrenAsSpasmAndNullV2 = spasmEventV0.children.map(child => convertToSpasm(child));
        childrenAsSpasmAndNullV2.forEach((event) => {
            if (event !== null) {
                // Create children if it's null or undefined
                spasmEventV2.children ??= [];
                spasmEventV2.children.push({
                    ids: event.ids,
                    event: event
                });
            }
        });
    }
    return spasmEventV2;
};
export const convertToSpasmStatus = () => {
    console.log("spasm.js convertToSpasm status: success");
};
//# sourceMappingURL=convertToSpasm.js.map