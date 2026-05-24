"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortLinksForSpasmEventV2 = exports.sortHostsForSpasmid01 = exports.sortHostsForSpasmEventV2 = exports.sortArrayOfObjectsByKeyValue = exports.sortAuthorsForSpasmid01 = exports.sortAuthorsForSpasmEventV2 = exports.sortArrayOfObjects = exports.sortArrayOfStringsAndNumbers = exports.keepTheseKeysInObjectsInArray = exports.keepTheseKeysInObject = exports.getHashOfString = exports.getAllFormatNamesFromEvent = exports.getAllFormatNamesFromSpasmEventV2 = exports.extractAllIdFormatNamesFromSpasmEventV2 = exports.extractIdFormatNameFromSpasmEventIdV2 = exports.getFormatFromSignature = exports.getFormatFromAddress = exports.getFormatFromId = exports.getFormatFromValue = exports.createLinkObjectFromUrl = exports.isUrl = exports.isValidUrl = exports.getNostrSpasmVersion = exports.toBeShortDate = exports.toBeDateShort = exports.toBeLongDate = exports.toBeDateLong = exports.toBeFullDate = exports.toBeDateFull = exports.toBeDate = exports.toBeNostrTimestamp = exports.toBeStandardTimestamp = exports.toBeStandardizedTimestamp = exports.toBeFullTimestamp = exports.toBeLongTimestamp = exports.toBeShortTimestamp = exports.toBeTimestamp = exports.extractSealedEvent = exports.extractVersion = exports.isArrayOfNumbersOrStrings = exports.isArrayOfStringsOrNumbers = exports.isArrayOfNumbers = exports.isArrayOfStrings = exports.isArrayWithValues = exports.isObjectWithValues = exports.ifNumberOrString = exports.ifStringOrNumber = exports.isNumberOrString = exports.isStringOrNumber = exports.hasValue = void 0;
exports.getAllEventIds = exports.getAllIdsFromArrayOfIdObjects = exports.hasValidSignature = exports.hasVerifiedSigner = exports.getVerifiedNostrSigners = exports.getVerifiedEthereumSigners = exports.getVerifiedSpasmSigners = exports.getVerifiedSigners = exports.getAllNostrSigners = exports.getAllEthereumSigners = exports.getAllSpasmSigners = exports.getAllSigners = exports.hasSiblingWeb2 = exports.hasSiblingNostr = exports.hasSiblingDmp = exports.hasSiblingSpasm = exports.hasSiblingOfProtocol = exports.extractNostrEvents = exports.extractSignedNostrEvents = exports.extractSignedNostrEvent = exports.extractNostrEvent = exports.hasSignatureNostr = exports.hasSignatureEthereum = exports.hasSignatureOfFormat = exports.mergeConvertToSpasmSimpleConfigs = exports.mergeGenerateRssFeedConfigs = exports.mergeConvertToRssConfigs = exports.mergeSanitizationConfigs = exports.mergeConfigs = exports.mergeObjects = exports.clearObject = exports.clearArray = exports.toLowerCaseAllNestedStrings = exports.toLowerCaseIfString = exports.toLowerCaseIfValueIsString = exports.sanitizeAnything = exports.sanitizeArray = exports.sanitizeEvent = exports.sanitizeEventWithDompurify = exports.sanitizeStringWithDompurify = exports.sanitizeEventWith = exports.executeFunctionForAllNestedValuesOfType = exports.utilsStatus = exports.verifyEthereumSignature = exports.markSpasmEventAddressAsVerified = exports.sortTagsForSpasmid01 = exports.sortParentForSpasmid01 = exports.sortReferencesForSpasmid01 = exports.sortMediasForSpasmid01 = exports.sortLinksForSpasmid01 = void 0;
exports.checkIfArrayHasThisSpasmEventV2 = exports.mergeDifferentSpasmEventsV2 = exports.mergeSpasmEventsV2 = exports.extractSignerFromEthereumSignature = exports.toBeUniqueSpasmEventsV2 = exports.toBeSpasmEventsV2 = exports.toBeSpasmEventV2 = exports.getEventsByIds = exports.getEventById = exports.checkIfEventHasThisId = exports.keepUniqueArraysInArrayOrArraysOfStrings = exports.removeDuplicateArraysFromArrayOrArraysOfStrings = exports.uniqueNostrTagsOnly = exports.uniqueTagsOnly = exports.deduplicateNostrTags = exports.deduplicateTags = exports.removeDuplicateNostrTags = exports.removeDuplicateTags = exports.removeDuplicatesFromArrayOfStrings = exports.removeDuplicatesFromArray = exports.extractRootSpasmId01 = exports.extractRootIdByFormat = exports.getRootIdByFormat = exports.extractParentSpasmId01 = exports.extractParentIdByFormat = exports.getParentIdByFormat = exports.extractSpasmId01 = exports.extractIdByFormat = exports.findMostLikelyGuid = exports.findMostLikelyUrl = exports.getIdByFormat = exports.areAllPubkeysListedIn = exports.areAllSignersListedIn = exports.isAnyPubkeyListedIn = exports.isAnySignerListedIn = exports.getTotalOfActionReact = exports.getTotalOfReactAction = exports.getTotalOfReact = exports.getTotalOfActionReply = exports.getTotalOfReplyAction = exports.getTotalOfReply = exports.getTotalOfAction = exports.getTotalOfMostPopularReaction = exports.getTotalOfReaction = exports.getStatByAction = exports.getPubkeysListedIn = exports.getSignersListedIn = exports.getAllSignatures = exports.getAllRootIds = exports.getAllParentIds = void 0;
exports.filterAllMediaUrlsFromArrayOfUrls = exports.getAllMediaUrlsFromArrayOfUrls = exports.isFileNameOfMimeType = exports.ifFileNameOfMimeType = exports.parseStringForUrls = exports.extractAllUrlsFromString = exports.getAllUrlsFromString = exports.getMimeType = exports.DEFAULT_MIME_TYPE = exports.MIME_TYPE_MAP = exports.toBeString = exports.removeNbsp = exports.normalizeText = exports.isNostrHex = exports.isHex = exports.assignFormats = exports.attachEventAsParent = exports.attachEventAsRoot = exports.attachEventAsChild = exports.ifArraysHaveCommonId = exports.addRepliesToEvent = exports.addCommentsToEvent = exports.addChildrenToTree = exports.addRootToEvent = exports.addRootToTree = exports.addParentToEvent = exports.addParentToTree = exports.addEventsToTree = exports.mergeChildrenV2 = exports.mergeStatsV2 = exports.cleanSpasmEventV2 = exports.fakeAsFunction = exports.fakeAsObject = exports.fakeAsAny = exports.fakeAsNull = exports.fakeAsArray = exports.fakeAsNumber = exports.fakeAsString = exports.copyOf = exports.deepCopyOfObject = exports.ifEventsHaveSameSpasmId01 = exports.sortSpasmEventsV2 = exports.sortSpasmEventsV2ByDbAddedTimestamp = exports.prependToArrayIfEventIsUnique = exports.unshiftToArrayIfEventIsUnique = exports.appendToArrayIfEventIsUnique = exports.pushToArrayIfEventIsUnique = exports.insertIntoArrayIfEventIsUnique = exports.mergeEventIntoArray = exports.checkIfArrayHasThisEvent = void 0;
exports.getOneCategory = exports.extractCategory = exports.extractOneCategory = exports.getCategories = exports.getAllCategories = exports.extractCategories = exports.extractAllCategories = exports.extractOneSpasmTagByName = exports.extractSpasmTagByName = exports.extractTagByName = exports.getOneSpasmTagByName = exports.getOneTagByName = exports.getTagByName = exports.getSpasmTagByName = exports.extractAllSpasmTagsByName = exports.extractSpasmTagsByName = exports.extractTagsByName = exports.getAllSpasmTagsByName = exports.getAllTagsByName = exports.getTagsByName = exports.getSpasmTagsByName = exports.randomNumber = exports.sliceId = exports.sliceAddress = exports.toBeShortAddress = exports.autoGeneratedName = exports.unescapeCdata = exports.unescapeRssCdata = exports.unescapeXmlCdata = exports.restoreFromCdata = exports.restoreFromRssCdata = exports.restoreFromXmlCdata = exports.prepareForCdata = exports.prepareForRssCdata = exports.prepareForXmlCdata = exports.escapeCdata = exports.escapeRssCdata = exports.escapeXmlCdata = exports.escapeXml = exports.parseFirstAudioOrVideoUrlFromString = exports.extractFirstAudioOrVideoUrlFromString = exports.getFirstAudioOrVideoUrlFromString = exports.parseFirstMediaUrlFromString = exports.extractFirstMediaUrlFromString = exports.getFirstMediaUrlFromString = exports.parseStringForMediaUrls = exports.extractAllMediaUrlsFromString = exports.getAllMediaUrlsFromString = exports.getAllUrlsOfMediaTypeFromArrayOfUrls = exports.getAllMediaUrlsOfMimeTypeFromArrayOfUrls = void 0;
exports.flattenMixedArray = exports.flattenArrayOfStringsAndNumbers = exports.joinStringOrNumber = exports.joinStringOrNum = exports.flattenArrayOfStringsAndNumbersIntoString = exports.getConfigFromTag = exports.getSchemaFromTag = exports.extractConfigFromTag = exports.extractSchemaFromTag = exports.getConfigFromSpasmTag = exports.getSchemaFromSpasmTag = exports.extractConfigFromSpasmTag = exports.extractSchemaFromSpasmTag = exports.getAllConfigsFromSpasmTags = exports.getConfigsFromSpasmTags = exports.getAllSchemasFromSpasmTags = exports.getSchemasFromSpasmTags = exports.extractAllConfigsFromSpasmTags = exports.extractConfigsFromSpasmTags = exports.extractAllSchemasFromSpasmTags = exports.extractSchemasFromSpasmTags = exports.extractConfigFromSpasmEvent = exports.getConfigFromSpasmEvent = exports.getSchemaFromSpasmEvent = exports.extractConfig = exports.extractSchema = exports.getConfig = exports.getSchema = exports.extractSchemaFromSpasmEvent = exports.getConfigTagsFromSpasmEvent = exports.getSchemaTagsFromSpasmEvent = exports.extractConfigTagsFromSpasmEvent = exports.extractSchemaTagsFromSpasmEvent = exports.constructTagFromConfig = exports.constructSpasmTagFromConfig = exports.createTagFromConfig = exports.createSpasmTagFromConfig = exports.constructTagFromSchema = exports.constructSpasmTagFromSchema = exports.createTagFromSchema = exports.createSpasmTagFromSchema = exports.addExtraConfigToSpasmEventBody = exports.addCustomConfigToSpasmEventBody = exports.addConfigToSpasmEventBody = exports.addConfig = exports.addExtraSchemaToSpasmEventBody = exports.addCustomSchemaToSpasmEventBody = exports.addSchema = exports.addSchemaToSpasmEventBody = exports.getCategory = void 0;
exports.flattenArray = void 0;
/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
const js_sha256_v0_1 = require("js-sha256-v0");
const ethers_v6_1 = require("ethers-v6");
const index_js_1 = require("./../utils/index.js");
const isomorphic_dompurify_v2_1 = __importDefault(require("isomorphic-dompurify-v2"));
const interfaces_js_1 = require("./../types/interfaces.js");
const convertToSpasm_js_1 = require("./../convert/convertToSpasm.js");
// Filter out undefined, null, 0, '', false, NaN, {}, []
// Keep {a: null}, {b: undefined}
// Examples:
// hasValue() // false
// hasValue(undefined)) // false
// hasValue(null) // false
// hasValue(0) // false
// hasValue('') // false
// hasValue(false) // false
// hasValue(NaN) // false
// hasValue([]) // false
// hasValue({}) // false
// hasValue({a:null}) // true
// hasValue({b:undefined}) // true
// hasValue({c:1}) // true
// hasValue(new Date()) // true
// hasValue([0]) // false
// hasValue([null]) // false
// hasValue([undefined]) // false
// hasValue([[undefined], [0], [null, NaN], '']) // false
// hasValue([[undefined], [0], [null, 1], '']) // true
// hasValue([[undefined], 1, [null, NaN], '']) // true
// hasValue([[null], 0, [true, NaN]]) // true
// hasValue([[null], 0, ['hello', NaN]]) // true
const hasValue = (el) => {
    // Filter out undefined, null, 0, '', false, NaN
    if (!el)
        return false;
    // Filter out an empty object
    if (el // <- null and undefined check
        && Object.keys(el).length === 0
        && Object.getPrototypeOf(el) === Object.prototype) {
        return false;
    }
    // Filter out an empty array
    if (Array.isArray(el) && !el?.length) {
        return false;
    }
    // Recursively check for at least one value inside an array
    if (Array.isArray(el) && el?.length) {
        let hasAtLeastOneValue = false;
        // For of is used instead of forEach to break from
        // the loop once at least one element has value.
        for (const e of el) {
            if ((0, exports.hasValue)(e)) {
                hasAtLeastOneValue = true;
                break;
            }
        }
        if (hasAtLeastOneValue) {
            return true;
        }
        else {
            // console.error("ERROR. There are no values in the array", el)
            return false;
        }
    }
    return true;
};
exports.hasValue = hasValue;
const isStringOrNumber = (val) => {
    if (!val && val !== 0)
        return false;
    if (typeof (val) === "string")
        return true;
    if (typeof (val) === "number")
        return true;
    return false;
};
exports.isStringOrNumber = isStringOrNumber;
exports.isNumberOrString = exports.isStringOrNumber;
exports.ifStringOrNumber = exports.isStringOrNumber;
exports.ifNumberOrString = exports.isStringOrNumber;
const isObjectWithValues = (val) => {
    if (!val)
        return false;
    if (Array.isArray(val))
        return false;
    if (typeof (val) !== "object")
        return false;
    if (Object.keys(val).length === 0)
        return false;
    return true;
};
exports.isObjectWithValues = isObjectWithValues;
const isArrayWithValues = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (!(0, exports.hasValue)(array))
        return false;
    return true;
};
exports.isArrayWithValues = isArrayWithValues;
const isArrayOfStrings = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "string")) {
        return true;
    }
    return false;
};
exports.isArrayOfStrings = isArrayOfStrings;
const isArrayOfNumbers = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "number")) {
        return true;
    }
    return false;
};
exports.isArrayOfNumbers = isArrayOfNumbers;
const isArrayOfStringsOrNumbers = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "string" ||
            typeof (element) === "number")) {
        return true;
    }
    return false;
};
exports.isArrayOfStringsOrNumbers = isArrayOfStringsOrNumbers;
exports.isArrayOfNumbersOrStrings = exports.isArrayOfStringsOrNumbers;
const extractVersion = (versionString) => {
    if (!versionString ||
        typeof (versionString) !== "string")
        return "";
    if (versionString.startsWith("dmp_v")) {
        return versionString.substring(5);
    }
    return "";
};
exports.extractVersion = extractVersion;
const extractSealedEvent = (unknownPostOrEvent) => {
    if (!(0, exports.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let signedObject = false;
    if (unknownPostOrEvent &&
        typeof (unknownPostOrEvent) === "object" &&
        'signed_message' in unknownPostOrEvent &&
        unknownPostOrEvent['signed_message'] &&
        typeof (unknownPostOrEvent['signed_message'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signed_message']);
    }
    else if (unknownPostOrEvent &&
        typeof (unknownPostOrEvent) === "object" &&
        'signedString' in unknownPostOrEvent &&
        unknownPostOrEvent['signedString'] &&
        typeof (unknownPostOrEvent['signedString'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signedString']);
    }
    return signedObject;
};
exports.extractSealedEvent = extractSealedEvent;
/**
 * Converts value to a consistent timestamp across all platforms.
 * Input time value can be string, number, or Date object.
 * returns Consistent timestamp in milliseconds or undefined.
 */
const toBeTimestamp = (originalTime) => {
    if (!originalTime)
        return undefined;
    let time = Number(originalTime)
        ? Number(originalTime)
        : originalTime;
    // First, normalize the input to a Date object
    let date;
    // Handle numeric inputs (timestamps or years)
    if (typeof time === 'number' &&
        !isNaN(time) &&
        Number.isSafeInteger(time)) {
        date = new Date(time);
        if (!isValidDate(date)) {
            return undefined;
        }
    }
    // Handle string inputs
    else if (typeof time === 'string') {
        try {
            // Try parsing with timezone specification
            date = new Date(`${time} GMT`);
            // Fallback to standard parsing if needed
            if (!isValidDate(date)) {
                date = new Date(time);
                if (!isValidDate(date)) {
                    return undefined;
                }
            }
        }
        catch (err) {
            return undefined;
        }
    }
    // Handle Date objects
    else if (time instanceof Date) {
        date = time;
        if (!isValidDate(date)) {
            return undefined;
        }
    }
    // Invalid input type
    else {
        return undefined;
    }
    // Always use UTC for consistency
    return isValidDate(date) ? date.getTime() : undefined;
};
exports.toBeTimestamp = toBeTimestamp;
const isValidDate = (date) => {
    return (date instanceof Date &&
        !isNaN(date.getTime()) &&
        Number.isFinite(date.getTime()));
};
/*
export const toBeTimestamp = (time: any): number | undefined => {
 let date = new Date(time);
 let timestamp = date.getTime();

  // Check if the timestamp is NaN, indicating an invalid date
  if (Number.isNaN(timestamp)) {
    if (Number(time)) {
      date = new Date(Number(time))
      timestamp = date.getTime()
      if (Number(timestamp)) {
        return timestamp
      }
    }
    return undefined;
  }

  // Optional
  // Standardize the timestamp to 10 characters (seconds)
  // by rounding down the timestamp to the nearest second.
  // if (timestamp.toString().length > 10) {
  //   timestamp = Math.floor(timestamp / 1000) * 1000;
  // }

 return timestamp;
}
*/
// Nostr relays only accept 10 digits long timestamps
const toBeShortTimestamp = (value) => {
    if (!value || !exports.isStringOrNumber)
        return undefined;
    let timestamp = (0, exports.toBeTimestamp)(value);
    if (!timestamp)
        return undefined;
    if (String(timestamp) && String(timestamp).length === 13) {
        const str = String(timestamp);
        if (str && str.slice(0, 10)) {
            const shortStr = str.slice(0, 10);
            if (Number(shortStr)) {
                return Number(shortStr);
            }
        }
    }
    else if (String(timestamp) && String(timestamp).length === 10) {
        return timestamp;
    }
    return undefined;
};
exports.toBeShortTimestamp = toBeShortTimestamp;
const toBeLongTimestamp = (value) => {
    if (!value || !exports.isStringOrNumber)
        return null;
    let timestamp = (0, exports.toBeTimestamp)(value);
    if (!timestamp)
        return null;
    // Some timestamps are 10 digits long, so we
    // need to standardize them to 13 digits
    if (String(timestamp) && String(timestamp).length === 10) {
        timestamp = timestamp * 1000;
    }
    if (timestamp && typeof (timestamp) === "number" &&
        String(timestamp) && String(timestamp).length >= 13) {
        return timestamp;
    }
    else {
        return null;
    }
};
exports.toBeLongTimestamp = toBeLongTimestamp;
exports.toBeFullTimestamp = exports.toBeLongTimestamp;
exports.toBeStandardizedTimestamp = exports.toBeShortTimestamp;
exports.toBeStandardTimestamp = exports.toBeShortTimestamp;
exports.toBeNostrTimestamp = exports.toBeShortTimestamp;
const toBeDate = (value, format = "full") => {
    if (!value || !exports.isStringOrNumber)
        return null;
    let fullTimestamp = (0, exports.toBeFullTimestamp)(value);
    if (fullTimestamp && (0, exports.isStringOrNumber)(fullTimestamp)) {
        const date = new Date(fullTimestamp).toUTCString();
        if (date && typeof (date) === "string") {
            if (format === "full") {
                return date;
            }
            else if (format === "long") {
                return date.slice(5, 25);
            }
            else if (format === "medium") {
                return date.slice(5, 22);
            }
            else if (format === "short") {
                return date.slice(5, 16);
            }
        }
    }
    return null;
};
exports.toBeDate = toBeDate;
const toBeDateFull = (val) => {
    return (0, exports.toBeDate)(val, "full");
};
exports.toBeDateFull = toBeDateFull;
exports.toBeFullDate = exports.toBeDateFull;
const toBeDateLong = (val) => {
    return (0, exports.toBeDate)(val, "long");
};
exports.toBeDateLong = toBeDateLong;
exports.toBeLongDate = exports.toBeDateLong;
const toBeDateShort = (val) => {
    return (0, exports.toBeDate)(val, "short");
};
exports.toBeDateShort = toBeDateShort;
exports.toBeShortDate = exports.toBeDateShort;
const getNostrSpasmVersion = (event) => {
    let nostrSpasmVersion = null;
    if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            if (Array.isArray(tag) && tag[0] === "nostr_spasm_version") {
                nostrSpasmVersion = tag[1];
            }
            else if (Array.isArray(tag) && tag[0] === "spasm_version") {
                nostrSpasmVersion = tag[1];
            }
        });
    }
    return nostrSpasmVersion;
};
exports.getNostrSpasmVersion = getNostrSpasmVersion;
// Example usage
// getSchemeFromUrl('https://example.com/news') // return 'https'
// getSchemeFromUrl('http://example.com') // return 'http'
// getSchemeFromUrl('ftp://example.com') // return 'ftp'
// getSchemeFromUrl('mailto://...') // return 'mailto'
// getSchemeFromUrl('ipfs://123abc') // return 'ipfs'
// export const getSchemeFromUrl = (url: any) => {
//   if (!url || typeof(url) !== "string") return ""
//   try {
//     const urlObject = new URL(url);
//     return urlObject.protocol.slice(0, -1); // Remove the trailing colon
//   } catch (error) {
//     console.log('Invalid URL:', url);
//     return "";
//   }
// }
const isValidUrl = (value) => {
    if (!value)
        return false;
    try {
        // new URL() constructor is less vulnerable to ReDoS attacks
        // because it's a built-it JS function that doesn't use regex
        new URL(value);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isValidUrl = isValidUrl;
exports.isUrl = exports.isValidUrl;
const createLinkObjectFromUrl = (url, key) => {
    if (!url || typeof (url) !== "string")
        return null;
    try {
        const urlObject = new URL(url);
        const linkObject = {
            value: url,
            // protocol: urlObject.protocol.slice(0, -1),
            // host: urlObject.host,
            // path: urlObject.pathname,
            // search: urlObject.search,
        };
        if (urlObject.protocol) {
            linkObject.protocol = urlObject.protocol.slice(0, -1);
        }
        if (urlObject.origin) {
            linkObject.origin = urlObject.origin;
        }
        if (urlObject.host) {
            linkObject.host = urlObject.host;
        }
        if (urlObject.pathname &&
            typeof (urlObject.pathname) === "string" // &&
        // urlObject.pathname.length > 1
        ) {
            linkObject.pathname = urlObject.pathname;
        }
        if (urlObject.search &&
            typeof (urlObject.search) === "string" // &&
        // urlObject.search.length > 1
        ) {
            linkObject.search = urlObject.search;
        }
        if (urlObject.port) {
            linkObject.port = urlObject.port;
        }
        if (urlObject.hash) {
            linkObject.hash = urlObject.hash;
        }
        if (key &&
            (typeof (key) === "string" || typeof (key) === "number")) {
            linkObject.originalProtocolKey = key;
        }
        return linkObject;
    }
    catch (error) {
        // console.log('Invalid URL:', url);
        return null;
    }
};
exports.createLinkObjectFromUrl = createLinkObjectFromUrl;
const getFormatFromValue = (value) => {
    let format = undefined;
    if (!value)
        return null;
    if (typeof (value) !== "string" && typeof (value) !== "number") {
        return null;
    }
    if (typeof (value) === "number") {
        return format = { name: "number" };
    }
    if (value && typeof (value) === "string") {
        // Spasm ID
        if (value.length === 64 + 9 && value.startsWith("spasmid")) {
            const version = value.slice(7, 9);
            format = { name: "spasmid", version: version };
            return format;
        }
        // Dmp ID (ethereum signature)
        if (value.length === 132 && value.startsWith("0x") &&
            typeof (value) === "string" && (0, exports.isHex)(value.slice(2))) {
            format = { name: "ethereum-sig" };
            return format;
        }
        // Dmp ID (nostr signature)
        if (value.length === 128 && (0, exports.isHex)(value)) {
            format = { name: "nostr-sig" };
            return format;
        }
        // Nostr ID
        if (value.length === 63 && value.startsWith("note")) {
            format = { name: "nostr-note" };
            return format;
        }
        if (value.length === 68 && value.startsWith("nevent")) {
            format = { name: "nostr-nevent" };
            return format;
        }
        // Spasm signer
        // if (address.length === 64 + 9 && address.startsWith("spasmer")) {
        //   const version = address.slice(7,9)
        //   format = { name: "spasmer", version: version }
        //   return format
        // }
        // Ethereum signer
        if (value.length === 42 && value.startsWith("0x")) {
            format = { name: "ethereum-pubkey" };
            return format;
        }
        // Nostr signer
        if (value.length === 63 && value.startsWith("npub")) {
            format = { name: "nostr-npub" };
            return format;
        }
        // url
        if ((0, exports.isValidUrl)(value)) {
            format = { name: "url" };
            return format;
        }
        if (value.length === 64 &&
            !value.startsWith("note") &&
            !value.startsWith("nevent") &&
            !value.startsWith("npub")) {
            format = { name: "nostr-hex" };
            return format;
        }
    }
    if (typeof (value) === "string") {
        return format = { name: "string" };
    }
    if (!format)
        return null;
    return format;
};
exports.getFormatFromValue = getFormatFromValue;
const getFormatFromId = (id) => {
    return (0, exports.getFormatFromValue)(id);
};
exports.getFormatFromId = getFormatFromId;
const getFormatFromAddress = (address) => {
    return (0, exports.getFormatFromValue)(address);
};
exports.getFormatFromAddress = getFormatFromAddress;
const getFormatFromSignature = (address) => {
    return (0, exports.getFormatFromValue)(address);
};
exports.getFormatFromSignature = getFormatFromSignature;
const extractIdFormatNameFromSpasmEventIdV2 = (id) => {
    if (!id)
        return null;
    if (typeof (id) !== "object")
        return null;
    if (id &&
        'format' in id && id.format &&
        'name' in id.format && id.format.name &&
        typeof (id.format.name) === "string") {
        return id.format.name;
    }
    return null;
};
exports.extractIdFormatNameFromSpasmEventIdV2 = extractIdFormatNameFromSpasmEventIdV2;
const extractAllIdFormatNamesFromSpasmEventV2 = (originalEvent) => {
    const spasmEventV2 = (0, exports.toBeSpasmEventV2)(originalEvent);
    if (!spasmEventV2 || !(0, exports.isObjectWithValues)(spasmEventV2)) {
        return null;
    }
    if ('ids' in spasmEventV2 && spasmEventV2.ids &&
        (0, exports.isArrayWithValues)(spasmEventV2.ids)) {
        const formatNames = [];
        spasmEventV2.ids?.forEach(id => {
            const formatName = (0, exports.extractIdFormatNameFromSpasmEventIdV2)(id);
            if (formatName && typeof (formatName) === "string") {
                formatNames.push(formatName);
            }
        });
        return formatNames;
    }
    return null;
};
exports.extractAllIdFormatNamesFromSpasmEventV2 = extractAllIdFormatNamesFromSpasmEventV2;
exports.getAllFormatNamesFromSpasmEventV2 = exports.extractAllIdFormatNamesFromSpasmEventV2;
exports.getAllFormatNamesFromEvent = exports.getAllFormatNamesFromSpasmEventV2;
const getHashOfString = (string, algorithm = "sha256") => {
    if (typeof (string) !== "string")
        return "";
    if (algorithm === "sha256") {
        return (0, js_sha256_v0_1.sha256)(string);
    }
    return "";
};
exports.getHashOfString = getHashOfString;
// Keep only specified keys in an object.
const keepTheseKeysInObject = (obj, keys) => {
    if (!obj)
        return null;
    if (typeof (obj) !== "object")
        return null;
    if (Array.isArray(obj))
        return null;
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};
exports.keepTheseKeysInObject = keepTheseKeysInObject;
// Keep only specified keys in each object of an array.
const keepTheseKeysInObjectsInArray = (array, keys) => {
    if (!Array.isArray(array))
        return null;
    return array.map(obj => (0, exports.keepTheseKeysInObject)(obj, keys));
};
exports.keepTheseKeysInObjectsInArray = keepTheseKeysInObjectsInArray;
// This function only sorts string and number values.
const sortArrayOfStringsAndNumbers = (array) => {
    if (!array ||
        !Array.isArray(array) ||
        !array[0]) {
        return [];
    }
    // Separate values into valid and invalid categories.
    const { validValues, invalidValues } = array.reduce((acc, value) => {
        if (typeof value === 'string' ||
            typeof value === 'number') {
            acc.validValues.push(value);
        }
        else {
            acc.invalidValues.push(value);
        }
        return acc;
    }, { validValues: [], invalidValues: [] });
    // Sort the valid values
    const sortedValidValues = validValues.sort((a, b) => String(a).localeCompare(String(b)));
    // Combine sorted valid values with invalid values
    const result = [...sortedValidValues, ...invalidValues];
    return result;
};
exports.sortArrayOfStringsAndNumbers = sortArrayOfStringsAndNumbers;
const sortArrayOfObjects = (objects, sortBy = ["id"]) => {
    if (!objects ||
        !Array.isArray(objects) ||
        !objects[0]) {
        return [];
    }
    // Ensure sortBy is always treated as an array
    const sortedBy = Array.isArray(sortBy) ? sortBy : [sortBy];
    // Separate objects into valid and invalid categories based
    // on the existence of the specified property(ies)
    const { validObjects, invalidValues } = objects.reduce((acc, item) => {
        let isValid = false;
        // Only one prop should exist in item in order
        // to make it a valid item.
        sortedBy.forEach((key) => {
            if (typeof (item) === 'object' && item &&
                key in item && item[key] &&
                (typeof (item[key]) === "string" ||
                    typeof (item[key]) === "number")) {
                isValid = true;
            }
        });
        if (isValid) {
            acc.validObjects.push(item);
        }
        else {
            acc.invalidValues.push(item);
        }
        return acc;
    }, { validObjects: [], invalidValues: [] });
    // Sort the valid objects by the specified property(ies)
    const sortedValidObjects = validObjects.sort((a, b) => {
        for (const key of sortedBy) {
            const aValue = typeof a[key] === 'string' ? a[key] : String(a[key]);
            const bValue = typeof b[key] === 'string' ? b[key] : String(b[key]);
            const compareResult = aValue.localeCompare(bValue);
            if (compareResult !== 0) {
                return compareResult;
            }
        }
        return 0; // Equal
    });
    const sortedInvalidValues = (0, exports.sortArrayOfStringsAndNumbers)(invalidValues);
    // Combine sorted valid objects with invalid objects
    const result = [...sortedValidObjects, ...sortedInvalidValues];
    return result;
};
exports.sortArrayOfObjects = sortArrayOfObjects;
const sortAuthorsForSpasmEventV2 = (authors) => {
    if (!authors ||
        !Array.isArray(authors) ||
        !authors[0]) {
        return [];
    }
    // Clean and sort addresses
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'addresses' in author && author.addresses &&
            Array.isArray(author.addresses) &&
            author.addresses[0]) {
            // Clean addresses to keep only  'value' and 'format' keys
            // and remove 'verified' and 'hosts' keys.
            author.addresses = (0, exports.keepTheseKeysInObjectsInArray)(author.addresses, ["value", "format"]);
            // Sort addresses
            author.addresses = (0, exports.sortArrayOfObjects)(author.addresses, "value");
        }
    });
    // Clean and sort usernames
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'usernames' in author && author.usernames &&
            Array.isArray(author.usernames) &&
            author.usernames[0]) {
            // There is no need to clean usernames because all fields
            // should be calculated for the Spasm ID 01.
            // Sort usernames
            author.usernames = (0, exports.sortArrayOfObjects)(author.usernames, "value");
        }
    });
    let authorsWithAddress = [];
    // Authors without address are used temporary until we split
    // them further depending on whether they have usernames.
    let authorsWithoutAddress = [];
    let authorsWithoutAddressWithUsername = [];
    let authorsWithoutAddressWithoutUsername = [];
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'addresses' in author && author.addresses &&
            Array.isArray(author.addresses) && author.addresses[0] &&
            author.addresses[0].value &&
            (typeof (author.addresses[0].value) === "string" ||
                typeof (author.addresses[0].value) === "number")) {
            authorsWithAddress.push(author);
        }
        else {
            authorsWithoutAddress.push(author);
        }
    });
    authorsWithoutAddress.forEach(author => {
        if (author && typeof (author) === "object" &&
            'usernames' in author && author.usernames &&
            Array.isArray(author.usernames) && author.usernames[0] &&
            author.usernames[0].value &&
            (typeof (author.usernames[0].value) === "string" ||
                typeof (author.usernames[0].value) === "number")) {
            authorsWithoutAddressWithUsername.push(author);
        }
        else {
            authorsWithoutAddressWithoutUsername.push(author);
        }
    });
    // Sort all 3 arrays
    const sortedAuthorsWithAddress = (0, exports.sortArrayOfObjectsByKeyValue)(authorsWithAddress, "addresses");
    const sortedAuthorsWithoutAddressWithUsername = (0, exports.sortArrayOfObjectsByKeyValue)(authorsWithoutAddressWithUsername, "usernames");
    const sortedAuthorsWithoutAddressWithoutUsername = (0, exports.sortArrayOfObjects)(authorsWithoutAddressWithoutUsername, ["id"]);
    const result = [
        ...sortedAuthorsWithAddress,
        ...sortedAuthorsWithoutAddressWithUsername,
        ...sortedAuthorsWithoutAddressWithoutUsername
    ];
    return result;
};
exports.sortAuthorsForSpasmEventV2 = sortAuthorsForSpasmEventV2;
exports.sortAuthorsForSpasmid01 = exports.sortAuthorsForSpasmEventV2;
const sortArrayOfObjectsByKeyValue = (objects, key) => {
    const sortedObjects = objects.sort((a, b) => {
        let aValue = "";
        let bValue = "";
        if (a[key] && a[key][0] &&
            a[key][0].value) {
            if (typeof (a[key][0].value) === 'string') {
                aValue = a[key][0].value;
            }
            else if (typeof (a[key][0].value) === 'number') {
                aValue = String(a[key][0].value);
            }
        }
        if (b[key] && b[key][0] &&
            b[key][0].value) {
            if (typeof (b[key][0].value) === 'string') {
                bValue = b[key][0].value;
            }
            else if (typeof (b[key][0].value) === 'number') {
                bValue = String(b[key][0].value);
            }
        }
        const compareResult = aValue.localeCompare(bValue);
        if (compareResult !== 0) {
            return compareResult;
        }
        return 0; // Equal
    });
    return sortedObjects;
};
exports.sortArrayOfObjectsByKeyValue = sortArrayOfObjectsByKeyValue;
const sortHostsForSpasmEventV2 = (hosts) => {
    if (!hosts ||
        !Array.isArray(hosts) ||
        !hosts[0]) {
        return hosts;
    }
    const sortedHosts = (0, exports.sortArrayOfObjects)(hosts, "value");
    return sortedHosts;
};
exports.sortHostsForSpasmEventV2 = sortHostsForSpasmEventV2;
exports.sortHostsForSpasmid01 = exports.sortHostsForSpasmEventV2;
exports.sortLinksForSpasmEventV2 = exports.sortHostsForSpasmEventV2;
exports.sortLinksForSpasmid01 = exports.sortLinksForSpasmEventV2;
const sortMediasForSpasmid01 = (medias) => {
    if (!medias || !Array.isArray(medias))
        return [];
    // Clean and sort IDs
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'ids' in media && media.ids &&
            Array.isArray(media.ids) &&
            media.ids[0]) {
            // Clean ids to keep only  'value' key
            media.ids = (0, exports.keepTheseKeysInObjectsInArray)(media.ids, ["value"]);
            // Sort ids
            media.ids = (0, exports.sortArrayOfObjects)(media.ids, "value");
        }
    });
    // Clean and sort hashes
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'hashes' in media && media.hashes &&
            Array.isArray(media.hashes) &&
            media.hashes[0]) {
            // Clean hashes to keep only  'value' key
            media.hashes = (0, exports.keepTheseKeysInObjectsInArray)(media.hashes, ["value"]);
            // Sort hashes
            media.hashes = (0, exports.sortArrayOfObjects)(media.hashes, "value");
        }
    });
    // Clean and sort links
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'links' in media && media.links &&
            Array.isArray(media.links) &&
            media.links[0]) {
            // Clean links to keep only  'value' key
            media.links = (0, exports.keepTheseKeysInObjectsInArray)(media.links, ["value"]);
            // Sort links
            media.links = (0, exports.sortArrayOfObjects)(media.links, "value");
        }
    });
    // mediasWithIds might also have hashes and links
    let mediasWithIds = [];
    let mediasWithoutIds = [];
    // mediasWithHashes might also have links, but no ids
    let mediasWithHashes = [];
    let mediasWithoutIdsHashes = [];
    // mediasWithLinks only has links, but no ids and hashes
    let mediasWithLinks = [];
    let mediasWithoutIdsHashesLinks = [];
    // Sort medias by ids
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'ids' in media && media.ids &&
            Array.isArray(media.ids) && media.ids[0] &&
            media.ids[0].value &&
            (typeof (media.ids[0].value) === "string" ||
                typeof (media.ids[0].value) === "number")) {
            mediasWithIds.push(media);
        }
        else {
            mediasWithoutIds.push(media);
        }
    });
    // Sort medias by hashes
    mediasWithoutIds.forEach(media => {
        if (media && typeof (media) === "object" &&
            'hashes' in media && media.hashes &&
            Array.isArray(media.hashes) && media.hashes[0] &&
            media.hashes[0].value &&
            (typeof (media.hashes[0].value) === "string" ||
                typeof (media.hashes[0].value) === "number")) {
            mediasWithHashes.push(media);
        }
        else {
            mediasWithoutIdsHashes.push(media);
        }
    });
    // Sort medias by links
    mediasWithoutIdsHashes.forEach(media => {
        if (media && typeof (media) === "object" &&
            'links' in media && media.links &&
            Array.isArray(media.links) && media.links[0] &&
            media.links[0].value &&
            (typeof (media.links[0].value) === "string" ||
                typeof (media.links[0].value) === "number")) {
            mediasWithLinks.push(media);
        }
        else {
            mediasWithoutIdsHashesLinks.push(media);
        }
    });
    const mediasOther = mediasWithoutIdsHashesLinks;
    // Sort all 3 arrays
    const sortedMediasWithIds = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithIds, "ids");
    const sortedMediasWithHashes = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithHashes, "hashes");
    const sortedMediasWithLinks = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithLinks, "links");
    const sortedMediasOther = (0, exports.sortArrayOfObjects)(mediasOther, ["id"]);
    const result = [
        ...sortedMediasWithIds,
        ...sortedMediasWithHashes,
        ...sortedMediasWithLinks,
        ...sortedMediasOther
    ];
    return result;
};
exports.sortMediasForSpasmid01 = sortMediasForSpasmid01;
// Deprecated sortMediasForSpasmEventV2 because we only keep
// a 'value' key to calculate Spasm ID 01.
// export const sortMediasForSpasmid01 = sortMediasforSpasmEventV2
const sortReferencesForSpasmid01 = (references) => {
    if (!references || !Array.isArray(references))
        return [];
    // Clean and sort IDs
    references.forEach(reference => {
        if (reference && typeof (reference) === "object" &&
            'ids' in reference && reference.ids &&
            Array.isArray(reference.ids) &&
            reference.ids[0]) {
            // Clean ids to keep only  'value' key
            reference.ids = (0, exports.keepTheseKeysInObjectsInArray)(reference.ids, ["value"]);
            // Sort ids
            reference.ids = (0, exports.sortArrayOfObjects)(reference.ids, "value");
        }
    });
    // Sort references based on IDs
    const sortedReferences = (0, exports.sortArrayOfObjectsByKeyValue)(references, "ids");
    return sortedReferences;
};
exports.sortReferencesForSpasmid01 = sortReferencesForSpasmid01;
const sortParentForSpasmid01 = (parent) => {
    if (!parent || typeof (parent) !== "object")
        return parent;
    // Clean and sort IDs
    if (parent && typeof (parent) === "object" &&
        'ids' in parent && parent.ids &&
        Array.isArray(parent.ids) &&
        parent.ids[0]) {
        // Clean ids to keep only 'value' key
        parent.ids = (0, exports.keepTheseKeysInObjectsInArray)(parent.ids, ["value"]);
        // Sort ids
        parent.ids = (0, exports.sortArrayOfObjects)(parent.ids, "value");
    }
    return parent;
};
exports.sortParentForSpasmid01 = sortParentForSpasmid01;
const sortTagsForSpasmid01 = (tags) => {
    if (!tags || !Array.isArray(tags))
        return [[]];
    /**
     * Tags are an array of arrays (e.g., Nostr tags).
     * Each tag is an array with any number of elements.
     * Some tags will have the same one-letter first element,
     * so sorting by the first element is not a good approach.
     * Instead, the current sorting logic for spasmid01 is
     * to find the length of the longest tag array (e.g., 10),
     * and start sorting tags by the 10th element, then
     * by the 9th element, and continue until sorting is
     * done by the first element.
     *
     * Each tag is an array of values. However, values inside
     * each tag should not be sorted as it can affect the
     * intention of the event. For example, the order of an
     * element in a Nostr tag array has a meaning.
     */
    const sortTagsByElementNumber = (elementNumber = 0) => {
        tags = tags.sort((a, b) => {
            const key = elementNumber;
            let aValue = "";
            let bValue = "";
            if (a[key]) {
                if (typeof (a[key]) === 'string') {
                    aValue = a[key];
                }
                else if (typeof (a[key]) === 'number') {
                    aValue = String(a[key]);
                }
            }
            if (b[key]) {
                if (typeof (b[key]) === 'string') {
                    bValue = b[key];
                }
                else if (typeof (b[key]) === 'number') {
                    bValue = String(b[key]);
                }
            }
            const compareResult = aValue.localeCompare(bValue);
            if (compareResult !== 0) {
                return compareResult;
            }
            return 0; // Equal
        });
    };
    let longestTagArrayLength = 1;
    // Find the longest array (tag) to be used for sorting.
    tags.forEach(tag => {
        if (tag && Array.isArray(tag) &&
            tag.length > longestTagArrayLength) {
            longestTagArrayLength = tag.length;
        }
    });
    for (let i = longestTagArrayLength; i >= 0; i--) {
        sortTagsByElementNumber(i);
    }
    return tags;
};
exports.sortTagsForSpasmid01 = sortTagsForSpasmid01;
const markSpasmEventAddressAsVerified = (spasmEvent, verifiedAddress, version = "2.0.0") => {
    if (!verifiedAddress)
        return;
    if (version === "2.0.0") {
        if (spasmEvent.authors) {
            spasmEvent.authors.forEach(author => {
                if (author.addresses) {
                    author.addresses.forEach(address => {
                        if (address.value === verifiedAddress) {
                            address.verified = true;
                        }
                        else if (typeof (address.value) === "string" &&
                            typeof (verifiedAddress) === "string" &&
                            address.value.toLowerCase() === verifiedAddress.toLowerCase()) {
                            address.verified = true;
                        }
                    });
                }
            });
        }
    }
};
exports.markSpasmEventAddressAsVerified = markSpasmEventAddressAsVerified;
const verifyEthereumSignature = (messageString, signature, signerAddress) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers_v6_1.ethers.verifyMessage(messageString, signature);
            return recoveredAddress.toLowerCase() ===
                signerAddress.toLowerCase();
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
exports.verifyEthereumSignature = verifyEthereumSignature;
const utilsStatus = () => {
    console.log("spasm.js utils status: success");
};
exports.utilsStatus = utilsStatus;
const executeFunctionForAllNestedValuesOfType = (originalItem, customConfig) => {
    const defaultConfig = new interfaces_js_1.SanitizationConfig();
    const config = (0, exports.mergeSanitizationConfigs)(defaultConfig, customConfig || {});
    const { customFunction, valueType, maxDepth } = config;
    // Keep in mind that an array is of type "object" in typescript
    if (typeof (originalItem) !== "object" &&
        !Array.isArray(originalItem)) {
        throw new Error("ERROR: There are no nested values because an item is not an object, nor an array.");
    }
    const seenItems = new Set();
    // Maximum recursion depth to prevent stack overflow
    const maxRecursionDepth = maxDepth ?? 10;
    const executeRecursive = (currentItem, depth = 0) => {
        if (depth > maxRecursionDepth) {
            throw new Error("Maximum recursion depth exceeded");
        }
        if (seenItems.has(currentItem))
            return;
        seenItems.add(currentItem);
        if (!currentItem)
            return;
        // 1. Array
        if (Array.isArray(currentItem)) {
            currentItem.forEach((value, index) => {
                // 1.1. Exact data type match
                if (typeof (value) === valueType) {
                    currentItem[index] = customFunction(value);
                }
                // 1.2. Array
                if (Array.isArray(value)) {
                    executeRecursive(value, depth + 1);
                }
                // 1.3. Object
                if ((0, exports.isObjectWithValues)(value)) {
                    executeRecursive(value, depth + 1);
                }
                // 1.4. Other types
                // Do nothing
                return;
            });
        }
        // 2. Object
        if ((0, exports.isObjectWithValues)(currentItem)) {
            Object.keys(currentItem).forEach(key => {
                // 1.1. Exact data type match
                if (typeof currentItem[key] === valueType) {
                    currentItem[key] = customFunction(currentItem[key]);
                }
                // 1.2. Array
                if (Array.isArray(currentItem[key])) {
                    executeRecursive(currentItem[key], depth + 1);
                }
                // 1.3. Object
                if ((0, exports.isObjectWithValues)(currentItem[key])) {
                    executeRecursive(currentItem[key], depth + 1);
                }
                // 1.4. Other types
                // Do nothing
                return;
            });
        }
        // 3. Other data types
        // Do nothing
        return;
    };
    executeRecursive(originalItem);
    return;
};
exports.executeFunctionForAllNestedValuesOfType = executeFunctionForAllNestedValuesOfType;
const sanitizeEventWith = (originalItem, config) => {
    try {
        (0, exports.executeFunctionForAllNestedValuesOfType)(originalItem, config);
    }
    catch (error) {
        console.error("Sanitization failed", error);
        if (Array.isArray(originalItem)) {
            (0, exports.clearArray)(originalItem);
        }
        else if ((0, exports.isObjectWithValues)(originalItem)) {
            (0, exports.clearObject)(originalItem);
        }
    }
};
exports.sanitizeEventWith = sanitizeEventWith;
const sanitizeStringWithDompurify = (val) => {
    if (typeof (val) === "string") {
        return isomorphic_dompurify_v2_1.default.sanitize(val);
    }
    return val;
};
exports.sanitizeStringWithDompurify = sanitizeStringWithDompurify;
const sanitizeEventWithDompurify = (originalItem, config) => {
    (0, exports.sanitizeEventWith)(originalItem, config);
};
exports.sanitizeEventWithDompurify = sanitizeEventWithDompurify;
exports.sanitizeEvent = exports.sanitizeEventWithDompurify;
exports.sanitizeArray = exports.sanitizeEventWithDompurify;
exports.sanitizeAnything = exports.sanitizeEventWithDompurify;
const toLowerCaseIfValueIsString = (val) => {
    if (val && typeof (val) === "string") {
        const str = val.toLowerCase();
        if (str && typeof (str) === "string") {
            return str;
        }
    }
    return val;
};
exports.toLowerCaseIfValueIsString = toLowerCaseIfValueIsString;
exports.toLowerCaseIfString = exports.toLowerCaseIfValueIsString;
const toLowerCaseAllNestedStrings = (originalItem) => {
    try {
        (0, exports.executeFunctionForAllNestedValuesOfType)(originalItem, { customFunction: exports.toLowerCaseIfString });
    }
    catch (error) {
        console.error("toLowerCase failed", error);
        // Clearing is only used for sanitization,
        // to make sure that unsanitized values can pass
        // through in case of an error.
        // However, if lowercase fails, it's better
        // to keep the original values.
        // if (Array.isArray(originalItem)) {
        //   clearArray(originalItem)
        // } else if ( isObjectWithValues(originalItem)) {
        //   clearObject(originalItem)
        // }
    }
};
exports.toLowerCaseAllNestedStrings = toLowerCaseAllNestedStrings;
const clearArray = (arr) => {
    arr.length = 0; // This clears the array
};
exports.clearArray = clearArray;
const clearObject = (obj) => {
    Object.keys(obj).forEach(key => {
        delete obj[key];
    });
};
exports.clearObject = clearObject;
const mergeObjects = (defaultObject, customObject, handleArrays = "overwriteArrays", depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!(0, exports.isObjectWithValues)(defaultObject) &&
        !(0, exports.isObjectWithValues)(customObject))
        return {};
    if ((0, exports.isObjectWithValues)(defaultObject) &&
        !(0, exports.isObjectWithValues)(customObject))
        return defaultObject;
    if (!(0, exports.isObjectWithValues)(defaultObject) &&
        (0, exports.isObjectWithValues)(customObject))
        return customObject;
    const mergedObject = { ...defaultObject };
    for (const key in customObject) {
        const value = customObject[key];
        const defaultValue = defaultObject[key];
        if (typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null) {
            // If the value is an object, recursively merge it
            mergedObject[key] = (0, exports.mergeObjects)(defaultValue, value, handleArrays, depth + 1);
        }
        else if (Array.isArray(value) &&
            (0, exports.hasValue)(value) &&
            handleArrays === "mergeArrays") {
            mergedObject[key] =
                mergeArrays(defaultValue, value);
        }
        else if (value !== undefined) {
            mergedObject[key] = value;
        }
    }
    return mergedObject;
};
exports.mergeObjects = mergeObjects;
const mergeConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeConfigs = mergeConfigs;
const mergeSanitizationConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeSanitizationConfigs = mergeSanitizationConfigs;
const mergeConvertToRssConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeConvertToRssConfigs = mergeConvertToRssConfigs;
const mergeGenerateRssFeedConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeGenerateRssFeedConfigs = mergeGenerateRssFeedConfigs;
const mergeConvertToSpasmSimpleConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeConvertToSpasmSimpleConfigs = mergeConvertToSpasmSimpleConfigs;
const hasSignatureOfFormat = (spasmEvent, signatureFormat) => {
    if (!spasmEvent)
        return false;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return false;
    if (!spasmEvent.signatures)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isSignatureFormatDetected = false;
    spasmEvent.signatures.forEach(signature => {
        if ((0, exports.isObjectWithValues)(signature) &&
            signature.format &&
            (0, exports.isObjectWithValues)(signature.format) &&
            signature.format.name &&
            typeof (signature.format.name) === "string") {
            if (signature.format.name.startsWith(signatureFormat)) {
                isSignatureFormatDetected = true;
            }
        }
    });
    return isSignatureFormatDetected;
};
exports.hasSignatureOfFormat = hasSignatureOfFormat;
const hasSignatureEthereum = (spasmEvent) => {
    return (0, exports.hasSignatureOfFormat)(spasmEvent, "ethereum");
};
exports.hasSignatureEthereum = hasSignatureEthereum;
const hasSignatureNostr = (spasmEvent) => {
    return (0, exports.hasSignatureOfFormat)(spasmEvent, "nostr");
};
exports.hasSignatureNostr = hasSignatureNostr;
const extractNostrEvent = (spasmEvent, onlySigned = false) => {
    const nostrEvents = (0, exports.extractNostrEvents)(spasmEvent, onlySigned);
    if (nostrEvents && Array.isArray(nostrEvents) && nostrEvents[0]) {
        return nostrEvents[0];
    }
    else {
        return null;
    }
};
exports.extractNostrEvent = extractNostrEvent;
const extractSignedNostrEvent = (spasmEvent) => {
    return (0, exports.extractNostrEvent)(spasmEvent, true);
};
exports.extractSignedNostrEvent = extractSignedNostrEvent;
const extractSignedNostrEvents = (spasmEvent) => {
    return (0, exports.extractNostrEvents)(spasmEvent, true);
};
exports.extractSignedNostrEvents = extractSignedNostrEvents;
const extractNostrEvents = (unknownEvent, onlySigned = false) => {
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent)
        return null;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return null;
    if (!spasmEvent.siblings)
        return null;
    if (!Array.isArray(spasmEvent.siblings))
        return null;
    const nostrEvents = [];
    spasmEvent.siblings.forEach(sibling => {
        if ((0, exports.isObjectWithValues)(sibling) &&
            sibling.protocol &&
            (0, exports.isObjectWithValues)(sibling.protocol) &&
            sibling.protocol.name &&
            typeof (sibling.protocol.name) === "string" &&
            sibling.protocol.name === "nostr" ||
            sibling.type) {
            if (onlySigned) {
                if (sibling.type === "SiblingNostrSignedV2" ||
                    sibling.type === "SiblingNostrSpasmSignedV2") {
                    if ("originalObject" in sibling && sibling.originalObject) {
                        nostrEvents.push(sibling.originalObject);
                    }
                }
            }
            else if (!onlySigned) {
                if (sibling.type === "SiblingNostrV2" ||
                    sibling.type === "SiblingNostrSpasmV2" ||
                    sibling.type === "SiblingNostrSignedV2" ||
                    sibling.type === "SiblingNostrSpasmSignedV2") {
                    if ("originalObject" in sibling && sibling.originalObject) {
                        nostrEvents.push(sibling.originalObject);
                    }
                }
            }
        }
    });
    if ((0, exports.isArrayWithValues)(nostrEvents)) {
        return nostrEvents;
    }
    return null;
};
exports.extractNostrEvents = extractNostrEvents;
const hasSiblingOfProtocol = (spasmEvent, eventProtocol) => {
    if (!spasmEvent)
        return false;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return false;
    if (!spasmEvent.siblings)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isEventProtocolDetected = false;
    spasmEvent.siblings.forEach(sibling => {
        if ((0, exports.isObjectWithValues)(sibling) &&
            sibling.protocol &&
            (0, exports.isObjectWithValues)(sibling.protocol) &&
            sibling.protocol.name &&
            typeof (sibling.protocol.name) === "string") {
            if (sibling.protocol.name === eventProtocol) {
                isEventProtocolDetected = true;
            }
        }
    });
    return isEventProtocolDetected;
};
exports.hasSiblingOfProtocol = hasSiblingOfProtocol;
const hasSiblingSpasm = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "spasm");
};
exports.hasSiblingSpasm = hasSiblingSpasm;
const hasSiblingDmp = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "dmp");
};
exports.hasSiblingDmp = hasSiblingDmp;
const hasSiblingNostr = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "nostr");
};
exports.hasSiblingNostr = hasSiblingNostr;
const hasSiblingWeb2 = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "web2");
};
exports.hasSiblingWeb2 = hasSiblingWeb2;
const getAllSigners = (unknownEvent, onlyVerifiedFlag = false, toLowerCase = true, formatName, returnNostrSignersAs) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEventV2 = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEventV2 ||
        !Array.isArray(spasmEventV2.authors))
        return [];
    const nostrTo = returnNostrSignersAs || "hex";
    const signers = [];
    spasmEventV2.authors.forEach(author => {
        if (author &&
            author.addresses &&
            Array.isArray(author.addresses) &&
            author.addresses[0]) {
            author.addresses.forEach(address => {
                if (address &&
                    typeof (address) === "object" &&
                    !Array.isArray(address) &&
                    address.value &&
                    (typeof (address.value) === "string" ||
                        typeof (address.value) === "number")) {
                    // Format name is not specified
                    if (!formatName || formatName === "any") {
                        let val = null;
                        if (onlyVerifiedFlag && address.verified) {
                            val = address.value;
                        }
                        else if (!onlyVerifiedFlag) {
                            val = address.value;
                        }
                        if (nostrTo === "npub" && address.format &&
                            address.format.name === "nostr-hex" &&
                            typeof (val) === "string") {
                            val = (0, index_js_1.toBeNpub)(val);
                        }
                        else if (nostrTo === "hex" && address.format &&
                            address.format.name === "nostr-npub" &&
                            typeof (val) === "string") {
                            val = (0, index_js_1.toBeHex)(val);
                        }
                        if (val) {
                            signers.push(val);
                        }
                        // Format name is specified
                    }
                    else {
                        if ((formatName === "nostr" ||
                            formatName === "nostr-hex" ||
                            formatName === "nostr-npub") && address.format && (address.format.name === "nostr-hex" ||
                            address.format.name === "nostr-npub")) {
                            let val = null;
                            if (onlyVerifiedFlag && address.verified) {
                                val = address.value;
                            }
                            else if (!onlyVerifiedFlag) {
                                val = address.value;
                            }
                            if (nostrTo === "npub" && address.format &&
                                address.format.name === "nostr-hex" &&
                                typeof (val) === "string") {
                                val = (0, index_js_1.toBeNpub)(val);
                            }
                            else if (nostrTo === "hex" && address.format &&
                                address.format.name === "nostr-npub" &&
                                typeof (val) === "string") {
                                val = (0, index_js_1.toBeHex)(val);
                            }
                            if (val) {
                                signers.push(val);
                            }
                        }
                        else if ((formatName === "ethereum" ||
                            formatName === "ethereum-pubkey") && address.format && (address.format.name === "ethereum-pubkey")) {
                            if (onlyVerifiedFlag && address.verified) {
                                signers.push(address.value);
                            }
                            else if (!onlyVerifiedFlag) {
                                signers.push(address.value);
                            }
                        }
                        else if ((formatName === "spasm" ||
                            formatName === "spasmer") && address.format && (address.format.name === "spasmer")) {
                            if (onlyVerifiedFlag && address.verified) {
                                signers.push(address.value);
                            }
                            else if (!onlyVerifiedFlag) {
                                signers.push(address.value);
                            }
                        }
                    }
                }
            });
        }
    });
    if (toLowerCase) {
        signers.forEach((signer, index) => {
            if (typeof (signer) === "string") {
                signers[index] = signer.toLowerCase();
            }
        });
    }
    return signers;
};
exports.getAllSigners = getAllSigners;
const getAllSpasmSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, false, true, "spasm");
};
exports.getAllSpasmSigners = getAllSpasmSigners;
const getAllEthereumSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, false, true, "ethereum");
};
exports.getAllEthereumSigners = getAllEthereumSigners;
const getAllNostrSigners = (unknownEvent, returnNostrSignersAs) => {
    return (0, exports.getAllSigners)(unknownEvent, false, true, "nostr", returnNostrSignersAs);
};
exports.getAllNostrSigners = getAllNostrSigners;
// TODO doesn't work with events where author
// addresses are not lowercase
const getVerifiedSigners = (unknownEvent, returnNostrSignersAs) => {
    return (0, exports.getAllSigners)(unknownEvent, true, true, "any", returnNostrSignersAs);
};
exports.getVerifiedSigners = getVerifiedSigners;
const getVerifiedSpasmSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, true, true, "spasm");
};
exports.getVerifiedSpasmSigners = getVerifiedSpasmSigners;
const getVerifiedEthereumSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, true, true, "ethereum");
};
exports.getVerifiedEthereumSigners = getVerifiedEthereumSigners;
const getVerifiedNostrSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, true, true, "nostr");
};
exports.getVerifiedNostrSigners = getVerifiedNostrSigners;
const hasVerifiedSigner = (unknownEvent) => {
    const allSigners = (0, exports.getVerifiedSigners)(unknownEvent);
    if (allSigners && (0, exports.isArrayWithValues)(allSigners)) {
        return true;
    }
    else {
        return false;
    }
};
exports.hasVerifiedSigner = hasVerifiedSigner;
exports.hasValidSignature = exports.hasVerifiedSigner;
const getAllIdsFromArrayOfIdObjects = (arrayOfIdObjects, toLowerCase = true) => {
    if (!arrayOfIdObjects || !Array.isArray(arrayOfIdObjects)) {
        return [];
    }
    const allIds = [];
    arrayOfIdObjects.forEach(idObject => {
        if (idObject &&
            'value' in idObject &&
            idObject.value &&
            (typeof (idObject.value) === "string" ||
                typeof (idObject.value) === "number")) {
            allIds.push(idObject.value);
        }
    });
    if (toLowerCase) {
        allIds.forEach((id, index) => {
            if (typeof (id) === "string") {
                allIds[index] = id.toLowerCase();
            }
        });
    }
    return allIds;
};
exports.getAllIdsFromArrayOfIdObjects = getAllIdsFromArrayOfIdObjects;
const getAllEventIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('ids' in spasmEvent &&
        Array.isArray(spasmEvent.ids) &&
        (0, exports.hasValue)(spasmEvent.ids)) {
        const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.ids, toLowerCase);
        return arrayOfIds;
    }
    return [];
};
exports.getAllEventIds = getAllEventIds;
const getAllParentIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('parent' in spasmEvent &&
        spasmEvent.parent &&
        (0, exports.isObjectWithValues)(spasmEvent.parent)) {
        if ('ids' in spasmEvent.parent &&
            Array.isArray(spasmEvent.parent.ids) &&
            (0, exports.hasValue)(spasmEvent.parent.ids)) {
            const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.parent.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
exports.getAllParentIds = getAllParentIds;
// TODO write tests
const getAllRootIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('root' in spasmEvent &&
        spasmEvent.root &&
        (0, exports.isObjectWithValues)(spasmEvent.root)) {
        if ('ids' in spasmEvent.root &&
            Array.isArray(spasmEvent.root.ids) &&
            (0, exports.hasValue)(spasmEvent.root.ids)) {
            const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.root.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
exports.getAllRootIds = getAllRootIds;
const getAllSignatures = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    let spasmEventV2 = null;
    // SpasmEventV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEventV2 = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (!spasmEventV2 ||
        !Array.isArray(spasmEventV2.signatures))
        return [];
    const allSignatures = [];
    spasmEventV2.signatures.forEach(signature => {
        if (signature &&
            signature.value &&
            (typeof (signature.value) === "string" ||
                typeof (signature.value) === "number")) {
            allSignatures.push(signature.value);
        }
    });
    if (toLowerCase) {
        allSignatures.forEach((signature, index) => {
            if (typeof (signature) === "string") {
                allSignatures[index] = signature.toLowerCase();
            }
        });
    }
    return allSignatures;
};
exports.getAllSignatures = getAllSignatures;
const getSignersListedIn = (unknownEvent, originaList) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    if (!originaList ||
        !Array.isArray(originaList) ||
        !(0, exports.hasValue)(originaList))
        return [];
    // Standardize list
    // Convert npubs to hex
    const list = [];
    originaList.forEach(signer => {
        if (
        // Address is npub
        signer && typeof (signer) === "string" &&
            signer.startsWith("npub") &&
            signer.length === 63) {
            const signerHex = (0, index_js_1.toBeHex)(signer);
            if (signerHex) {
                list.push(signerHex);
            }
            // Address is not npub
        }
        else if ((0, exports.isStringOrNumber)(signer)) {
            list.push(signer);
        }
    });
    if (!(0, exports.isArrayOfStringsOrNumbers)(list))
        return [];
    let spasmEvent = null;
    // SpasmEventV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEvent = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    const allSigners = (0, exports.getVerifiedSigners)(spasmEvent);
    if (!allSigners ||
        !(0, exports.hasValue)(allSigners))
        return [];
    const filteredSigners = [];
    allSigners.forEach(signer => {
        if (signer && list.includes(signer)) {
            filteredSigners.push(signer);
        }
    });
    return filteredSigners;
};
exports.getSignersListedIn = getSignersListedIn;
exports.getPubkeysListedIn = exports.getSignersListedIn;
const getStatByAction = (unknownEvent, action = "react") => {
    if (!action || !exports.isStringOrNumber) {
        return null;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return null;
    }
    if (!("stats" in spasmEvent) || !spasmEvent.stats) {
        return null;
    }
    let spasmEventStat = null;
    spasmEvent.stats?.forEach(stat => {
        if ((0, exports.isObjectWithValues)(stat) &&
            "action" in stat && stat.action &&
            stat.action === action) {
            spasmEventStat = stat;
        }
    });
    return spasmEventStat;
};
exports.getStatByAction = getStatByAction;
const getTotalOfReaction = (unknownEvent, reaction = "upvote") => {
    if (!reaction || !exports.isStringOrNumber) {
        return 0;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const reactionStat = (0, exports.getStatByAction)(spasmEvent, "react");
    if (!reactionStat) {
        return 0;
    }
    if (!("contents" in reactionStat) || !reactionStat.contents ||
        !(0, exports.isArrayWithValues)(reactionStat.contents)) {
        return 0;
    }
    let total = 0;
    reactionStat.contents.forEach(content => {
        if ("value" in content && content.value &&
            content.value === reaction &&
            "total" in content && content.total) {
            if (typeof (content.total) === "number") {
                total = content.total;
            }
            else if (typeof (content.total) === "string") {
                total = Number(content.total);
            }
        }
    });
    return total;
};
exports.getTotalOfReaction = getTotalOfReaction;
const getTotalOfMostPopularReaction = (unknownEvent) => {
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const reactionStat = (0, exports.getStatByAction)(spasmEvent, "react");
    if (!reactionStat) {
        return 0;
    }
    if (!("contents" in reactionStat) || !reactionStat.contents ||
        !(0, exports.isArrayWithValues)(reactionStat.contents)) {
        return 0;
    }
    let total = 0;
    reactionStat.contents.forEach(content => {
        if ("total" in content && content.total) {
            let newTotal = 0;
            if (typeof (content.total) === "number") {
                newTotal = content.total;
            }
            else if (typeof (content.total) === "string") {
                newTotal = Number(content.total);
            }
            if (newTotal > total) {
                total = newTotal;
            }
        }
    });
    return total;
};
exports.getTotalOfMostPopularReaction = getTotalOfMostPopularReaction;
const getTotalOfAction = (unknownEvent, action = "reply") => {
    if (!action || !exports.isStringOrNumber) {
        return 0;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const actionStat = (0, exports.getStatByAction)(spasmEvent, action);
    if (!actionStat) {
        return 0;
    }
    if ("total" in actionStat && actionStat.total) {
        if (typeof (actionStat.total) === "number") {
            return actionStat.total;
        }
        else if (typeof (actionStat.total) === "string") {
            return Number(actionStat.total);
        }
    }
    return 0;
};
exports.getTotalOfAction = getTotalOfAction;
const getTotalOfReply = (unknownEvent) => {
    return (0, exports.getTotalOfAction)(unknownEvent, "reply");
};
exports.getTotalOfReply = getTotalOfReply;
exports.getTotalOfReplyAction = exports.getTotalOfReply;
exports.getTotalOfActionReply = exports.getTotalOfReply;
const getTotalOfReact = (unknownEvent) => {
    return (0, exports.getTotalOfAction)(unknownEvent, "react");
};
exports.getTotalOfReact = getTotalOfReact;
exports.getTotalOfReactAction = exports.getTotalOfReact;
exports.getTotalOfActionReact = exports.getTotalOfReact;
const isAnySignerListedIn = (unknownEvent, list) => {
    const signersListedIn = (0, exports.getSignersListedIn)(unknownEvent, list);
    if (signersListedIn &&
        Array.isArray(signersListedIn) &&
        (0, exports.hasValue)(signersListedIn)) {
        return true;
    }
    return false;
};
exports.isAnySignerListedIn = isAnySignerListedIn;
exports.isAnyPubkeyListedIn = exports.isAnySignerListedIn;
const areAllSignersListedIn = (unknownEvent, list) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return false;
    if (!list ||
        !Array.isArray(list) ||
        !(0, exports.hasValue)(list))
        return false;
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return false;
    const allSigners = (0, exports.getVerifiedSigners)(spasmEvent);
    if (!allSigners ||
        !(0, exports.hasValue)(allSigners))
        return false;
    return allSigners.every(signer => {
        if (signer) {
            return list.includes(signer);
        }
        else {
            return false;
        }
    });
};
exports.areAllSignersListedIn = areAllSignersListedIn;
exports.areAllPubkeysListedIn = exports.areAllSignersListedIn;
// TODO use getAllSigners() instead
// export const getAuthorsAddressesByFormat = (
//   unknownEvent: UnknownEventV2,
//   customAddressFormat?: SpasmEventAddressFormatV2,
//   from?: "authors" | "mentions",
//   onlyVerifiedFlag?: boolean
// ): (string | number)[] | null => {
//   const defaultAddressFormat: SpasmEventAddressFormatV2 =
//     { name: "spasmer" }
//   const addressFormat =
//     customAddressFormat || defaultAddressFormat
//
//   const addressFormatName = addressFormat?.name
//     ? addressFormat?.name : "spasmer"
//   const addressFormatVersion = addressFormat?.version
//     ? addressFormat?.version : ""
//
//   const spasmEvent = toBeSpasmEventV2(unknownEvent)
//
//   if (
//     !spasmEvent ||
//     !isObjectWithValues(spasmEvent) ||
//     !hasValue(spasmEvent)
//   ) return null
//
//   let authors: SpasmEventAuthorV2[] | null = null
//
//   // Authors
//   if (!from || from === "authors") {
//     if (
//       "authors" in spasmEvent && spasmEvent.authors &&
//       isArrayWithValues(spasmEvent.authors)
//     ) { authors = spasmEvent.authors }
//
//   // Mentions
//   } else if (from === "mentions") {
//     if (
//       "mentions" in spasmEvent && spasmEvent.mentions &&
//       isArrayWithValues(spasmEvent.mentions)
//     ) { authors = spasmEvent.mentions }
//   }
//
//   if (!authors || !isArrayWithValues(authors)) { return null }
//
//   let addressesValue: (string | number)[] = []
//
//   authors.forEach(author => {
//     if (
//       !author || typeof(author) !== "object" ||
//       Array.isArray(author) || !isObjectWithValues(author)
//     ) { return }
//
//     // Addresses
//     if (
//       "addresses" in author && author.addresses &&
//       isArrayWithValues(author.addresses)
//     ) {
//       author.addresses.forEach(address => {
//         if (
//           !address || typeof(address) !== "object" ||
//           Array.isArray(address) || !isObjectWithValues(address)
//         ) { return }
//
//         if (!('value' in address) || !address.value ||
//           (
//             typeof(address.value) !== "string" &&
//             typeof(address.value) !== "number"
//           )
//         ) { return }
//
//         if (!('format' in address) || !address.format) { return }
//
//         const { format } = address
//
//         if (
//           format && typeof(format) === "object" &&
//           !Array.isArray(format) &&
//           isObjectWithValues(format)
//         ) {
//           // Match format name
//           if (
//             format.name && typeof(format.name) === "string" &&
//             addressFormatName &&
//             format.name === addressFormatName
//           ) {
//             // No version was specified, so returning address
//             // which only matched the specified format name.
//             if (!addressFormatVersion) {
//               if (onlyVerifiedFlag && address.verified) {
//                 addressesValue.push(address.value)
//               } else if (!onlyVerifiedFlag) {
//                 addressesValue.push(address.value)
//               }
//             }
//
//             // Match format version (if specified)
//             if (
//               format.version &&
//               typeof(format.version) === "string" &&
//               addressFormatVersion &&
//               format.version === addressFormatVersion
//             ) {
//               if (onlyVerifiedFlag && address.verified) {
//                 addressesValue.push(address.value)
//               } else if (!onlyVerifiedFlag) {
//                 addressesValue.push(address.value)
//               }
//             }
//           }
//         }
//       })
//     }
//
//     return
//   })
//
//   if (addressesValue && isArrayWithValues(addressesValue)) {
//     return addressesValue
//   } else { return null }
// }
//
// export const getSignersByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractAuthorsAddressesByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractSignersByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractEthereumSigners = (
//   unknownEvent: UnknownEventV2,
//   onlyVerifiedFlag: boolean = false
// ): (string | number)[] | null => {
//   return getAuthorsAddressesByFormat(
//     unknownEvent, { name: "ethereum-pubkey" }, "authors",
//     onlyVerifiedFlag
//   )
// }
//
// export const extractVerifiedEthereumSigners = (
//   unknownEvent: UnknownEventV2
// ): (string | number)[] | null => {
//   return extractEthereumSigners(unknownEvent, true)
// }
//
// export const extractNostrSigners = (
//   unknownEvent: UnknownEventV2,
//   onlyVerifiedFlag: boolean = false
// ): (string | number)[] | null => {
//   const authorsAddressesHex = getAuthorsAddressesByFormat(
//     unknownEvent, { name: "nostr-hex" }, "authors",
//     onlyVerifiedFlag
//   )
//   if (authorsAddressesHex) { return authorsAddressesHex }
//
//   const authorsAddressesNpub = getAuthorsAddressesByFormat(
//     unknownEvent, { name: "nostr-npub" }, "authors",
//     onlyVerifiedFlag
//   )
//   if (authorsAddressesNpub) { return authorsAddressesNpub }
//
//   return null
// }
//
// export const extractVerifiedNostrSigners = (
//   unknownEvent: UnknownEventV2
// ): (string | number)[] | null => {
//   return extractNostrSigners(unknownEvent, true)
// }
const getIdByFormat = (unknownEvent, customIdFormat, from = "event") => {
    const defaultIdFormat = {
        name: "spasmid",
        version: "01"
    };
    const idFormat = customIdFormat || defaultIdFormat;
    const idFormatName = idFormat?.name
        ? idFormat?.name : "spasmid";
    const idFormatVersion = idFormat?.version
        ? idFormat?.version : "";
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return null;
    if (!('ids' in spasmEvent) ||
        !spasmEvent.ids ||
        !Array.isArray(spasmEvent.ids)) {
        return null;
    }
    let ids = null;
    if (!from || from === "event") {
        if ("ids" in spasmEvent && spasmEvent.ids &&
            (0, exports.isArrayWithValues)(spasmEvent.ids)) {
            ids = spasmEvent.ids;
        }
    }
    else if (from === "parent") {
        if ("parent" in spasmEvent && spasmEvent.parent &&
            "ids" in spasmEvent.parent && spasmEvent.parent.ids &&
            (0, exports.isArrayWithValues)(spasmEvent.parent.ids)) {
            ids = spasmEvent.parent.ids;
        }
    }
    else if (from === "root") {
        if ("root" in spasmEvent && spasmEvent.root &&
            "ids" in spasmEvent.root && spasmEvent.root.ids &&
            (0, exports.isArrayWithValues)(spasmEvent.root.ids)) {
            ids = spasmEvent.root.ids;
        }
    }
    if (!ids || !(0, exports.isArrayWithValues)(ids)) {
        return null;
    }
    let idValues = [];
    ids.forEach(id => {
        if (!id || typeof (id) !== "object" || Array.isArray(id) ||
            !(0, exports.isObjectWithValues)(id)) {
            return;
        }
        if (!('value' in id) || !id.value ||
            (typeof (id.value) !== "string" &&
                typeof (id.value) !== "number")) {
            return;
        }
        if (!('format' in id) || !id.format) {
            return;
        }
        const { format } = id;
        if (format && typeof (format) === "object" &&
            !Array.isArray(format) &&
            (0, exports.isObjectWithValues)(format)) {
            // Match format name
            if (format.name && typeof (format.name) === "string" &&
                idFormatName && format.name === idFormatName) {
                // No version was specified, so returning an ID value
                // which only matched the specified ID format name.
                if (!idFormatVersion) {
                    // idValues = id.value
                    idValues.push(id.value);
                }
                // Match format version (if specified)
                if (format.version &&
                    typeof (format.version) === "string" &&
                    idFormatVersion && format.version === idFormatVersion) {
                    // idValues = id.value
                    idValues.push(id.value);
                }
            }
        }
        return;
    });
    if (idValues.length > 1 && idFormatName === "url") {
        return (0, exports.findMostLikelyUrl)(idValues);
    }
    if (idValues[0]) {
        return idValues[0];
    }
    else {
        return null;
    }
};
exports.getIdByFormat = getIdByFormat;
const findMostLikelyUrl = (arr) => {
    if (!arr) {
        return null;
    }
    if (!Array.isArray(arr)) {
        return null;
    }
    const arrayOfStrings = [];
    arr.forEach(val => {
        if (val && String(val)) {
            arrayOfStrings.push(String(val));
        }
    });
    const allValidUrls = arrayOfStrings.filter(exports.isValidUrl);
    const validUrls = (0, exports.removeDuplicatesFromArrayOfStrings)(allValidUrls);
    if (validUrls.length > 1) {
        // assume the longest URL is more likely to be a URL
        return validUrls.reduce((a, b) => a.length > b.length ? a : b);
    }
    else if (validUrls.length === 1) {
        return validUrls[0];
    }
    else {
        return null;
    }
};
exports.findMostLikelyUrl = findMostLikelyUrl;
const findMostLikelyGuid = (arr) => {
    if (!arr) {
        return null;
    }
    if (!Array.isArray(arr)) {
        return null;
    }
    const arrayOfStrings = [];
    arr.forEach(val => {
        if (val && String(val)) {
            arrayOfStrings.push(String(val));
        }
    });
    const allValidUrls = arrayOfStrings.filter(exports.isValidUrl);
    const validUrls = (0, exports.removeDuplicatesFromArrayOfStrings)(allValidUrls);
    if (validUrls.length > 1) {
        // assume the shortest URL is more likely to be a GUID
        return validUrls.reduce((a, b) => a.length < b.length ? a : b);
    }
    else if (validUrls.length === 1) {
        return validUrls[0];
    }
    else {
        return null;
    }
};
exports.findMostLikelyGuid = findMostLikelyGuid;
exports.extractIdByFormat = exports.getIdByFormat;
const extractSpasmId01 = (unknownEvent) => {
    return (0, exports.extractIdByFormat)(unknownEvent, { name: "spasmid", version: "01" });
};
exports.extractSpasmId01 = extractSpasmId01;
const getParentIdByFormat = (unknownEvent, customIdFormat) => {
    return (0, exports.getIdByFormat)(unknownEvent, customIdFormat, "parent");
};
exports.getParentIdByFormat = getParentIdByFormat;
exports.extractParentIdByFormat = exports.getParentIdByFormat;
const extractParentSpasmId01 = (unknownEvent) => {
    return (0, exports.extractParentIdByFormat)(unknownEvent, { name: "spasmid", version: "01" });
};
exports.extractParentSpasmId01 = extractParentSpasmId01;
const getRootIdByFormat = (unknownEvent, customIdFormat) => {
    return (0, exports.getIdByFormat)(unknownEvent, customIdFormat, "root");
};
exports.getRootIdByFormat = getRootIdByFormat;
exports.extractRootIdByFormat = exports.getRootIdByFormat;
const extractRootSpasmId01 = (unknownEvent) => {
    return (0, exports.extractRootIdByFormat)(unknownEvent, { name: "spasmid", version: "01" });
};
exports.extractRootSpasmId01 = extractRootSpasmId01;
// The Set data structure only stores unique values.
// When the array is converted into a Set, any duplicate values
// are automatically removed. Then, the spread operator (...)
// is used to convert the Set back into an array 1.
const removeDuplicatesFromArray = (array) => {
    if (!Array.isArray(array)) {
        return [];
    }
    return [...new Set(array)];
};
exports.removeDuplicatesFromArray = removeDuplicatesFromArray;
const removeDuplicatesFromArrayOfStrings = (array) => {
    if (!Array.isArray(array)) {
        return [];
    }
    return [...new Set(array)];
};
exports.removeDuplicatesFromArrayOfStrings = removeDuplicatesFromArrayOfStrings;
/**
 * Removes duplicate tag arrays from a Nostr tags array
 * Each Nostr tag is an array of strings
 */
const removeDuplicateTags = (tags) => {
    // Convert each tag array to a string for comparison
    const uniqueTags = new Map();
    for (const tag of tags) {
        const tagKey = JSON.stringify(tag);
        if (!uniqueTags.has(tagKey)) {
            uniqueTags.set(tagKey, tag);
        }
    }
    return Array.from(uniqueTags.values());
};
exports.removeDuplicateTags = removeDuplicateTags;
exports.removeDuplicateNostrTags = exports.removeDuplicateTags;
exports.deduplicateTags = exports.removeDuplicateTags;
exports.deduplicateNostrTags = exports.removeDuplicateTags;
exports.uniqueTagsOnly = exports.removeDuplicateTags;
exports.uniqueNostrTagsOnly = exports.removeDuplicateTags;
exports.removeDuplicateArraysFromArrayOrArraysOfStrings = exports.removeDuplicateTags;
exports.keepUniqueArraysInArrayOrArraysOfStrings = exports.removeDuplicateTags;
const checkIfEventHasThisId = (unknownEvent, id, shortIdLength) => {
    if (!id || !(0, exports.isStringOrNumber)(id)) {
        return false;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return false;
    }
    const eventIds = (0, exports.getAllEventIds)(spasmEvent);
    if (!eventIds || !(0, exports.isArrayWithValues)(eventIds)) {
        return false;
    }
    // Short ID (not URL)
    if (shortIdLength && typeof (shortIdLength) === "number" &&
        shortIdLength > 15 && String(id) &&
        String(id).length === shortIdLength &&
        !(0, exports.isValidUrl)(id)) {
        let ifMatch = false;
        eventIds.forEach(eventId => {
            if (String(eventId) && String(id) &&
                String(eventId).startsWith(String(id))) {
                ifMatch = true;
            }
        });
        return ifMatch;
        // Full ID
    }
    else {
        if (eventIds.includes(id)) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.checkIfEventHasThisId = checkIfEventHasThisId;
const getEventById = (unknownEvents, id, shortIdLength) => {
    if (!id || !(0, exports.isStringOrNumber)(id)) {
        return null;
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const foundEvents = [];
    spasmEvents.forEach(event => {
        if ((0, exports.checkIfEventHasThisId)(event, id, shortIdLength)) {
            foundEvents.push(event);
        }
    });
    if (foundEvents && Array.isArray(foundEvents) &&
        foundEvents.length === 1 &&
        (0, exports.isObjectWithValues)(foundEvents[0])) {
        return foundEvents[0];
    }
    else if (foundEvents && Array.isArray(foundEvents) &&
        foundEvents.length > 1 &&
        (0, exports.isArrayWithValues)(foundEvents)) {
        const mergedEvent = (0, exports.mergeSpasmEventsV2)(foundEvents);
        if (mergedEvent) {
            return mergedEvent;
        }
    }
    return null;
};
exports.getEventById = getEventById;
const getEventsByIds = (unknownEvents, ids, shortIdLength) => {
    if (!ids || !(0, exports.isArrayWithValues)(ids)) {
        return null;
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const foundEvents = [];
    ids.forEach(id => {
        spasmEvents.forEach(event => {
            if ((0, exports.checkIfEventHasThisId)(event, id, shortIdLength)) {
                foundEvents.push(event);
            }
        });
    });
    const mergedEvents = (0, exports.mergeDifferentSpasmEventsV2)(foundEvents);
    if (mergedEvents && (0, exports.isArrayWithValues)(mergedEvents)) {
        return mergedEvents;
    }
    else {
        return null;
    }
};
exports.getEventsByIds = getEventsByIds;
const toBeSpasmEventV2 = (unknownEvent) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return null;
    let spasmEvent = null;
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEvent = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (spasmEvent &&
        (0, exports.isObjectWithValues)(spasmEvent) &&
        (0, exports.hasValue)(spasmEvent) &&
        'type' in spasmEvent &&
        spasmEvent.type === "SpasmEventV2") {
        return spasmEvent;
    }
    return null;
};
exports.toBeSpasmEventV2 = toBeSpasmEventV2;
const toBeSpasmEventsV2 = (unknownEvents, keepOnlyUnique = false) => {
    if (!unknownEvents || !Array.isArray(unknownEvents))
        return null;
    let spasmEvents = [];
    unknownEvents.forEach(event => {
        const spasmEvent = (0, exports.toBeSpasmEventV2)(event);
        if (spasmEvent && (0, exports.isObjectWithValues)(spasmEvent)) {
            if (keepOnlyUnique) {
                (0, exports.pushToArrayIfEventIsUnique)(spasmEvents, spasmEvent);
            }
            else {
                spasmEvents.push(spasmEvent);
            }
        }
    });
    if (!spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    return spasmEvents;
};
exports.toBeSpasmEventsV2 = toBeSpasmEventsV2;
const toBeUniqueSpasmEventsV2 = (unknownEvents) => {
    return (0, exports.toBeSpasmEventsV2)(unknownEvents, true);
};
exports.toBeUniqueSpasmEventsV2 = toBeUniqueSpasmEventsV2;
const extractSignerFromEthereumSignature = (signedString, signature) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers_v6_1.ethers.verifyMessage(signedString, signature);
            if (recoveredAddress && typeof (recoveredAddress) === "string") {
                return recoveredAddress.toLowerCase();
            }
            else {
                return null;
            }
        }
    }
    catch (error) {
        return null;
    }
    return null;
};
exports.extractSignerFromEthereumSignature = extractSignerFromEthereumSignature;
// function deepMerge(original: any, newObject: any): any {
//   const result: any = {};
//
//   // Copy all existing keys from original
//   Object.keys(original).forEach(key => {
//     result[key] = original[key];
//   });
//
//   // Iterate through newObject keys
//   Object.keys(newObject).forEach(key => {
//     if (typeof newObject[key] === 'object' && newObject[key] !== null) {
//       // If it's an array, merge its contents
//       if (Array.isArray(newObject[key])) {
//         result[key] = deepMergeArray(result[key], newObject[key]);
//       }
//       // If it's an object, merge its properties
//       else {
//         result[key] = deepMerge(result[key], newObject[key]);
//       }
//     }
//     // For other types, simply overwrite the value
//     else {
//       result[key] = newObject[key];
//     }
//   });
//
//   return result;
// }
function mergeArrays(original, newArray) {
    const result = [];
    const seen = new Set();
    // Function to safely add elements to avoid duplicates
    function safeAdd(element) {
        if (!seen.has(element)) {
            seen.add(element);
            result.push(element);
        }
    }
    // Add all unique elements from both arrays
    original.forEach(safeAdd);
    newArray.forEach(safeAdd);
    return result;
}
const mergeSpasmEventsV2 = (spasmEvents, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!spasmEvents || !Array.isArray(spasmEvents))
        return null;
    if (!spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(spasmEvents[0]);
    if (!mainSpasmEvent)
        return null;
    const mainSpasmEventIds = (0, exports.getAllEventIds)(mainSpasmEvent);
    const mainSpasmEventSignatures = (0, exports.getAllSignatures)(mainSpasmEvent);
    const mainSpasmEventSiblingTypes = new Set();
    mainSpasmEvent.siblings?.forEach(mainSibling => {
        if ('type' in mainSibling && mainSibling.type) {
            mainSpasmEventSiblingTypes.add(mainSibling.type);
        }
    });
    const mainSpasmEventSharedByIds = new Set();
    mainSpasmEvent.sharedBy?.ids?.forEach(id => {
        if ('value' in id && id.value) {
            mainSpasmEventSharedByIds.add(id.value);
        }
    });
    spasmEvents.forEach((spasmEventAny, index) => {
        const spasmEvent = (0, exports.toBeSpasmEventV2)(spasmEventAny);
        // spasm event with index 0 is used for main spasm event
        if (index > 0 &&
            spasmEvent &&
            (0, exports.ifEventsHaveSameSpasmId01)(mainSpasmEvent, spasmEvent)) {
            // Siblings
            if ("siblings" in spasmEvent &&
                spasmEvent.siblings &&
                Array.isArray(spasmEvent.siblings)) {
                spasmEvent.siblings.forEach(sibling => {
                    // If the main event doesn't have this sibling, add it
                    if (!mainSpasmEventSiblingTypes.has(sibling.type)) {
                        mainSpasmEvent.siblings?.push(sibling);
                        mainSpasmEventSiblingTypes.add(sibling.type);
                        // Add an ID to main event
                        if ('ids' in sibling && sibling.ids &&
                            Array.isArray(sibling.ids)) {
                            sibling.ids.forEach(id => {
                                if (!mainSpasmEventIds.includes(id.value)) {
                                    // Create IDs key if it doesn't exist
                                    mainSpasmEvent.ids ??= [];
                                    mainSpasmEvent.ids.push(id);
                                }
                            });
                        }
                        // Add a signature to main event
                        if ('signatures' in sibling && sibling.signatures &&
                            Array.isArray(sibling.signatures)) {
                            sibling.signatures.forEach(signature => {
                                if (!mainSpasmEventSignatures.includes(signature.value)) {
                                    // Create signatures key if it doesn't exist
                                    mainSpasmEvent.signatures ??= [];
                                    mainSpasmEvent.signatures.push(signature);
                                    if (signature.pubkey) {
                                        (0, exports.markSpasmEventAddressAsVerified)(mainSpasmEvent, signature.pubkey);
                                    }
                                    // TODO mark address as verified (done)
                                    // - What if multiple authors?
                                }
                            });
                        }
                        // If the main event already has a sibling with the
                        // same type, then add missing signatures which exist
                        // on a new sibling, but don't on the main sibling.
                    }
                    else {
                        // Find sibling with the same type in main event.
                        mainSpasmEvent.siblings?.forEach(mainSibling => {
                            if (mainSibling.type === sibling.type) {
                                // Iterate through all signatures in sibling and
                                // add missing signatures to the main sibling.
                                if ('signatures' in sibling &&
                                    sibling.signatures &&
                                    Array.isArray(sibling.signatures)) {
                                    sibling.signatures.forEach(signature => {
                                        if (!mainSpasmEventSignatures.includes(signature.value) &&
                                            "signatures" in mainSpasmEvent &&
                                            mainSpasmEvent.signatures &&
                                            Array.isArray(mainSpasmEvent.signatures)) {
                                            mainSpasmEvent.signatures.push(signature);
                                            if (signature.pubkey) {
                                                (0, exports.markSpasmEventAddressAsVerified)(mainSpasmEvent, signature.pubkey);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
            // Add source only if source doesn't exist
            if ("source" in spasmEvent &&
                spasmEvent.source &&
                (0, exports.hasValue)(spasmEvent.source)) {
                if (!("source" in mainSpasmEvent) ||
                    !mainSpasmEvent.source ||
                    !(0, exports.hasValue)(mainSpasmEvent)) {
                    mainSpasmEvent.source = spasmEvent.source;
                }
            }
            // Add sharedBy
            if ("sharedBy" in spasmEvent &&
                spasmEvent.sharedBy &&
                (0, exports.hasValue)(spasmEvent.sharedBy)) {
                spasmEvent?.sharedBy?.ids?.forEach(id => {
                    if ("value" in id && id.value &&
                        !mainSpasmEventSharedByIds.has(id.value)) {
                        // Create sharedBy key if it doesn't exist
                        mainSpasmEvent.sharedBy ??= {};
                        mainSpasmEvent.sharedBy.ids ??= [];
                        mainSpasmEvent.sharedBy.ids?.push(id);
                        mainSpasmEventSharedByIds.add(id.value);
                    }
                });
            }
            // Parent event
            if ("parent" in spasmEvent && spasmEvent.parent &&
                "event" in spasmEvent.parent &&
                spasmEvent.parent?.event &&
                typeof (spasmEvent.parent?.event) === "object" &&
                (0, exports.hasValue)(spasmEvent.parent?.event) &&
                mainSpasmEvent.parent &&
                typeof (mainSpasmEvent.parent) === "object") {
                if (!("event" in mainSpasmEvent.parent) ||
                    !mainSpasmEvent.parent.event) {
                    mainSpasmEvent.parent.event = spasmEvent.parent.event;
                }
                else if (mainSpasmEvent.parent.event &&
                    typeof (mainSpasmEvent.parent.event) === "object") {
                    const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                        mainSpasmEvent.parent.event,
                        spasmEvent.parent.event,
                        depth + 1
                    ]);
                    if (mergedEvent) {
                        mainSpasmEvent.parent.event = mergedEvent;
                    }
                }
            }
            // Root event
            if ("root" in spasmEvent && spasmEvent.root &&
                "event" in spasmEvent.root &&
                spasmEvent.root?.event &&
                typeof (spasmEvent.root?.event) === "object" &&
                (0, exports.hasValue)(spasmEvent.root?.event) &&
                mainSpasmEvent.root &&
                typeof (mainSpasmEvent.root) === "object") {
                if (!("event" in mainSpasmEvent.root) ||
                    !mainSpasmEvent.root.event) {
                    mainSpasmEvent.root.event = spasmEvent.root.event;
                }
                else if (mainSpasmEvent.root.event &&
                    typeof (mainSpasmEvent.root.event) === "object") {
                    const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                        mainSpasmEvent.root.event,
                        spasmEvent.root.event,
                        depth + 1
                    ]);
                    if (mergedEvent) {
                        mainSpasmEvent.root.event = mergedEvent;
                    }
                }
            }
            // Stats
            if ("stats" in spasmEvent &&
                spasmEvent.stats &&
                Array.isArray(spasmEvent.stats) &&
                (0, exports.hasValue)(spasmEvent.stats)) {
                if (!("stats" in mainSpasmEvent) ||
                    !mainSpasmEvent.stats ||
                    !Array.isArray(mainSpasmEvent.stats) ||
                    !(0, exports.hasValue)(mainSpasmEvent.stats)) {
                    mainSpasmEvent.stats = spasmEvent.stats;
                }
                else if ("stats" in mainSpasmEvent &&
                    mainSpasmEvent.stats &&
                    Array.isArray(mainSpasmEvent.stats) &&
                    (0, exports.hasValue)(mainSpasmEvent.stats)) {
                    (0, exports.mergeStatsV2)([mainSpasmEvent.stats, spasmEvent.stats]);
                }
            }
            // Db
            if ("db" in spasmEvent &&
                spasmEvent.db &&
                (0, exports.hasValue)(spasmEvent.db)) {
                if (!("db" in mainSpasmEvent) ||
                    !mainSpasmEvent.db ||
                    !(0, exports.hasValue)(mainSpasmEvent.db)) {
                    mainSpasmEvent.db = spasmEvent.db;
                }
                else if ("db" in mainSpasmEvent &&
                    mainSpasmEvent.db &&
                    (0, exports.hasValue)(mainSpasmEvent.db)) {
                    // key
                    if ((!("key" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.key ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.key)) && (("key" in spasmEvent.db) &&
                        spasmEvent.db.key &&
                        (0, exports.hasValue)(spasmEvent.db.key))) {
                        mainSpasmEvent.db.key = spasmEvent.db.key;
                    }
                    // table
                    if ((!("table" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.table ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.table)) && (("table" in spasmEvent.db) &&
                        spasmEvent.db.table &&
                        (0, exports.hasValue)(spasmEvent.db.table))) {
                        mainSpasmEvent.db.table = spasmEvent.db.table;
                    }
                    // addedTimestamp
                    if ((!("addedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.addedTimestamp ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.addedTimestamp)) && ("addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number")) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    else if ("addedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(mainSpasmEvent.db.addedTimestamp) &&
                        typeof (mainSpasmEvent.db.addedTimestamp) === "number" &&
                        "addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number" &&
                        mainSpasmEvent.db.addedTimestamp < spasmEvent.db.addedTimestamp) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    // updatedTimestamp
                    if ((!("updatedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.updatedTimestamp ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.updatedTimestamp)) && ("updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.updatedTimestamp) &&
                        typeof (spasmEvent.db.updatedTimestamp) === "number")) {
                        mainSpasmEvent.db.updatedTimestamp =
                            spasmEvent.db.updatedTimestamp;
                    }
                    else if ("updatedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(mainSpasmEvent.db.updatedTimestamp) &&
                        typeof (mainSpasmEvent.db.updatedTimestamp) === "number" &&
                        "updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.updatedTimestamp) &&
                        typeof (spasmEvent.db.updatedTimestamp) === "number" &&
                        mainSpasmEvent.db.updatedTimestamp < spasmEvent.db.updatedTimestamp) {
                        mainSpasmEvent.db.updatedTimestamp =
                            spasmEvent.db.updatedTimestamp;
                    }
                }
            }
            // Children
            if ("children" in spasmEvent &&
                spasmEvent.children &&
                Array.isArray(spasmEvent.children) &&
                (0, exports.hasValue)(spasmEvent.children)) {
                if (!("children" in mainSpasmEvent) ||
                    !mainSpasmEvent.children ||
                    !Array.isArray(mainSpasmEvent.children) ||
                    !(0, exports.hasValue)(mainSpasmEvent.children)) {
                    mainSpasmEvent.children = spasmEvent.children;
                }
                else if ("children" in mainSpasmEvent &&
                    mainSpasmEvent.children &&
                    Array.isArray(mainSpasmEvent.children) &&
                    (0, exports.hasValue)(mainSpasmEvent.children)) {
                    (0, exports.mergeChildrenV2)([
                        mainSpasmEvent.children, spasmEvent.children,
                    ], depth);
                }
            }
        }
    });
    (0, exports.cleanSpasmEventV2)(mainSpasmEvent);
    return mainSpasmEvent;
};
exports.mergeSpasmEventsV2 = mergeSpasmEventsV2;
const mergeDifferentSpasmEventsV2 = (unknownEvents, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const uniqueIds = new Set();
    const uniqueEvents = [];
    const checkIfEventIsAlreadyInUnique = (event) => {
        const allEventIds = (0, exports.getAllEventIds)(event);
        let isAlreadyAdded = false;
        if (allEventIds && Array.isArray(allEventIds)) {
            allEventIds.forEach(id => {
                if (uniqueIds.has(id)) {
                    isAlreadyAdded = true;
                }
            });
        }
        return isAlreadyAdded;
    };
    spasmEvents?.forEach(event => {
        // Spasm events might have multiple IDs so we need to use
        // flags below to avoid redoing the same actions.
        let isEventAddedToUnique = false;
        const isEventAlreadyInUnique = checkIfEventIsAlreadyInUnique(event);
        let isEventMerged = false;
        // TODO check if other IDs of an event
        // are not in uniqueIds
        if ('ids' in event && event.ids &&
            Array.isArray(event.ids)) {
            event.ids.forEach(id => {
                if ("value" in id && id.value &&
                    (typeof (id.value) === "string" ||
                        typeof (id.value) === "number")) {
                    if (!uniqueIds.has(id.value) &&
                        !isEventAlreadyInUnique) {
                        uniqueIds.add(id.value);
                        if (!isEventAddedToUnique) {
                            uniqueEvents.push(event);
                            isEventAddedToUnique = true;
                        }
                    }
                    else if (uniqueIds.has(id.value)) {
                        if (!isEventAddedToUnique && !isEventMerged) {
                            // find unique event with same ID and merge
                            uniqueEvents.forEach((uniqueEvent, uniqueEventIndex) => {
                                if ('ids' in uniqueEvent && uniqueEvent.ids &&
                                    Array.isArray(uniqueEvent.ids)) {
                                    uniqueEvent.ids.forEach(uniqueEventId => {
                                        if ("value" in uniqueEventId &&
                                            uniqueEventId.value &&
                                            (typeof (uniqueEventId.value) === "string" ||
                                                typeof (uniqueEventId.value) === "number")) {
                                            if (uniqueEventId.value === id.value) {
                                                const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                                                    uniqueEvent, event, depth
                                                ]);
                                                if (mergedEvent) {
                                                    uniqueEvents[uniqueEventIndex] =
                                                        mergedEvent;
                                                    isEventMerged = true;
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    });
    if (uniqueEvents && Array.isArray(uniqueEvents) &&
        uniqueEvents[0] &&
        (0, exports.isObjectWithValues)(uniqueEvents[0])) {
        return uniqueEvents;
    }
    else {
        return null;
    }
};
exports.mergeDifferentSpasmEventsV2 = mergeDifferentSpasmEventsV2;
const checkIfArrayHasThisSpasmEventV2 = (array, event) => {
    if (!event)
        return false;
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    const allEventIds = (0, exports.getAllEventIds)(event);
    if (!(0, exports.isArrayWithValues)(allEventIds))
        return false;
    const found = array.some((item) => {
        const itemIds = (0, exports.getAllEventIds)(item);
        if ((0, exports.isArrayWithValues)(itemIds)) {
            return allEventIds.some(id => itemIds.includes(id));
        }
        return false;
    });
    return found;
};
exports.checkIfArrayHasThisSpasmEventV2 = checkIfArrayHasThisSpasmEventV2;
exports.checkIfArrayHasThisEvent = exports.checkIfArrayHasThisSpasmEventV2;
const mergeEventIntoArray = (array, event) => {
    if (!event || !array)
        return;
    if (!Array.isArray(array))
        return;
    const allEventIds = (0, exports.getAllEventIds)(event);
    if (!(0, exports.isArrayWithValues)(allEventIds))
        return;
    array.forEach((item, index) => {
        const itemIds = (0, exports.getAllEventIds)(item);
        if ((0, exports.isArrayWithValues)(itemIds)) {
            const ifMatch = allEventIds.some(id => itemIds.includes(id));
            if (ifMatch) {
                const mergedEvent = (0, exports.mergeSpasmEventsV2)([item, event]);
                if (mergedEvent) {
                    array[index] = mergedEvent;
                }
            }
        }
    });
};
exports.mergeEventIntoArray = mergeEventIntoArray;
const insertIntoArrayIfEventIsUnique = (array, originalEvent, method = "push", ifMergeWhenAvailable = true, ifConvertToSpasm = true, convertToSpasmVersion = "2.0.0") => {
    let event = null;
    if (ifConvertToSpasm) {
        const customConfig = {
            to: { spasm: { version: convertToSpasmVersion } }
        };
        event = (0, convertToSpasm_js_1.convertToSpasm)(originalEvent, customConfig);
    }
    else {
        event = originalEvent;
    }
    if (!event || !array)
        return;
    if (!Array.isArray(array))
        return;
    // Event is already in the array
    if ((0, exports.checkIfArrayHasThisEvent)(array, event)) {
        // Don't use mergeDifferentSpasmEventsV2, it's too costly
        if (ifMergeWhenAvailable) {
            (0, exports.mergeEventIntoArray)(array, event);
        }
        return;
        // Event is not in the array
    }
    else {
        if (method === "unshift") {
            array.unshift(event);
        }
        else if (method === "push") {
            array.push(event);
        }
    }
};
exports.insertIntoArrayIfEventIsUnique = insertIntoArrayIfEventIsUnique;
const pushToArrayIfEventIsUnique = (array, event, ifMergeWhenAvailable = true, ifConvertToSpasm = true, convertToSpasmVersion = "2.0.0") => {
    return (0, exports.insertIntoArrayIfEventIsUnique)(array, event, "push", ifMergeWhenAvailable, ifConvertToSpasm, convertToSpasmVersion);
};
exports.pushToArrayIfEventIsUnique = pushToArrayIfEventIsUnique;
exports.appendToArrayIfEventIsUnique = exports.pushToArrayIfEventIsUnique;
const unshiftToArrayIfEventIsUnique = (array, event, ifMergeWhenAvailable = true, ifConvertToSpasm = true, convertToSpasmVersion = "2.0.0") => {
    return (0, exports.insertIntoArrayIfEventIsUnique)(array, event, "unshift", ifMergeWhenAvailable, ifConvertToSpasm, convertToSpasmVersion);
};
exports.unshiftToArrayIfEventIsUnique = unshiftToArrayIfEventIsUnique;
exports.prependToArrayIfEventIsUnique = exports.unshiftToArrayIfEventIsUnique;
const sortSpasmEventsV2ByDbAddedTimestamp = (unknownEvents, order = "desc") => {
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    try {
        const spasmEventsWithDbTimestamp = [];
        const spasmEventsWithoutDbTimestamp = [];
        // Events without db.addedTimestamp are moved into a separate
        // array which is joined with the sorted array at the end.
        spasmEvents.forEach(event => {
            if ('db' in event && event.db &&
                'addedTimestamp' in event.db &&
                event.db.addedTimestamp &&
                typeof (event.db.addedTimestamp) === "number") {
                spasmEventsWithDbTimestamp.push(event);
            }
            else {
                spasmEventsWithoutDbTimestamp.push(event);
            }
        });
        spasmEventsWithDbTimestamp.sort((a, b) => {
            if (a.db?.addedTimestamp && b.db?.addedTimestamp) {
                if (order === "desc") {
                    const result = String(b.db.addedTimestamp)
                        .localeCompare(String(a.db.addedTimestamp));
                    return result;
                }
                else if (order === "asc") {
                    const result = String(a.db.addedTimestamp)
                        .localeCompare(String(b.db.addedTimestamp));
                    return result;
                }
            }
            // Ideally, return 1 should never happen because we've
            // filtered out events without db.addedTimestamp above.
            // In case if we missed some scenarios,
            // then 'return 1' should push an element without
            // db.addedTimestamp to the end of the array,
            // but it can still mess up the sorting.
            return 1;
        });
        const sortedSpasmEvents = [
            ...spasmEventsWithDbTimestamp,
            ...spasmEventsWithoutDbTimestamp
        ];
        if ((0, exports.isArrayWithValues)(sortedSpasmEvents)) {
            return sortedSpasmEvents;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.sortSpasmEventsV2ByDbAddedTimestamp = sortSpasmEventsV2ByDbAddedTimestamp;
exports.sortSpasmEventsV2 = exports.sortSpasmEventsV2ByDbAddedTimestamp;
const ifEventsHaveSameSpasmId01 = (event1, event2) => {
    if (!event1 || !event2)
        return false;
    if (!(0, exports.isObjectWithValues)(event1))
        return false;
    if (!(0, exports.isObjectWithValues)(event2))
        return false;
    const spasmEvent1 = (0, exports.toBeSpasmEventV2)(event1);
    const spasmEvent2 = (0, exports.toBeSpasmEventV2)(event2);
    if (!spasmEvent1 || !spasmEvent2)
        return false;
    const id1 = (0, exports.extractSpasmId01)(spasmEvent1);
    const id2 = (0, exports.extractSpasmId01)(spasmEvent2);
    return id1 === id2;
};
exports.ifEventsHaveSameSpasmId01 = ifEventsHaveSameSpasmId01;
// Using JSON.stringify method doesn't copy functions
// export const deepCopyOfObject = (obj: any) => {
//   if (!obj || typeof(obj) !== "object") return {}
//   return JSON.parse(JSON.stringify(obj))
// }
const deepCopyOfObject = (obj, seen = new WeakMap()) => {
    // Handle primitives and functions
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    // Check for circular references
    if (seen.has(obj)) {
        return seen.get(obj);
    }
    // Handle Date objects
    if (obj instanceof Date) {
        const copy = new Date(obj);
        seen.set(obj, copy);
        return copy;
    }
    // Handle RegExp objects
    if (obj instanceof RegExp) {
        const copy = new RegExp(obj.source, obj.flags);
        seen.set(obj, copy);
        return copy;
    }
    // Handle Map objects
    if (obj instanceof Map) {
        const copy = new Map();
        seen.set(obj, copy);
        obj.forEach((value, key) => {
            copy.set((0, exports.deepCopyOfObject)(key, seen), (0, exports.deepCopyOfObject)(value, seen));
        });
        return copy;
    }
    // Handle Set objects
    if (obj instanceof Set) {
        const copy = new Set();
        seen.set(obj, copy);
        obj.forEach(value => {
            copy.add((0, exports.deepCopyOfObject)(value, seen));
        });
        return copy;
    }
    // Handle arrays
    if (Array.isArray(obj)) {
        const copy = [];
        seen.set(obj, copy);
        for (let i = 0; i < obj.length; i++) {
            copy[i] = (0, exports.deepCopyOfObject)(obj[i], seen);
        }
        return copy;
    }
    // Handle regular objects
    const copy = {};
    seen.set(obj, copy);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = (0, exports.deepCopyOfObject)(obj[key], seen);
        }
    }
    return copy;
};
exports.deepCopyOfObject = deepCopyOfObject;
exports.copyOf = exports.deepCopyOfObject;
// Used for tests to bypass TypeScript string type checks
const fakeAsString = (val) => val;
exports.fakeAsString = fakeAsString;
// Used for tests to bypass TypeScript number type checks
const fakeAsNumber = (val) => val;
exports.fakeAsNumber = fakeAsNumber;
// Used for tests to bypass TypeScript arrray type checks
const fakeAsArray = (val) => val;
exports.fakeAsArray = fakeAsArray;
// Used for tests to bypass TypeScript null type checks
const fakeAsNull = (val) => val;
exports.fakeAsNull = fakeAsNull;
// Used for tests to bypass TypeScript any type checks
const fakeAsAny = (val) => val;
exports.fakeAsAny = fakeAsAny;
// Used for tests to bypass TypeScript any type checks
const fakeAsObject = (val) => {
    return val;
};
exports.fakeAsObject = fakeAsObject;
// Used for tests to bypass TypeScript string type checks
const fakeAsFunction = (val) => {
    return val;
};
exports.fakeAsFunction = fakeAsFunction;
const cleanSpasmEventV2 = (spasmEvent) => {
    if (!spasmEvent)
        return;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return;
    // Remove siblings without signatures if signed siblings
    // of the same protocol and protocol version are attached.
    const allSiblingTypes = new Set();
    spasmEvent.siblings?.forEach(sibling => {
        if ('type' in sibling && sibling.type) {
            allSiblingTypes.add(sibling.type);
        }
    });
    if ('siblings' in spasmEvent &&
        spasmEvent.siblings &&
        Array.isArray(spasmEvent.siblings)) {
        const cleanSiblings = spasmEvent.siblings?.filter(sibling => {
            if ((sibling.type === "SiblingSpasmV2" &&
                allSiblingTypes.has("SiblingSpasmSignedV2")) ||
                (sibling.type === "SiblingDmpV2" &&
                    allSiblingTypes.has("SiblingDmpSignedV2")) ||
                (sibling.type === "SiblingNostrV2" &&
                    allSiblingTypes.has("SiblingNostrSignedV2")) ||
                (sibling.type === "SiblingNostrSpasmV2" &&
                    allSiblingTypes.has("SiblingNostrSpasmSignedV2"))) {
                return false;
            }
            return true;
        });
        spasmEvent.siblings = cleanSiblings;
    }
};
exports.cleanSpasmEventV2 = cleanSpasmEventV2;
const mergeStatsV2 = (allStats) => {
    if (!allStats)
        return null;
    if (!Array.isArray(allStats))
        return null;
    if (!allStats[0])
        return null;
    if (!allStats[0][0])
        return null;
    const mainStats = allStats[0];
    const mainStatsActions = new Set();
    mainStats?.forEach(mainStat => {
        if ('action' in mainStat && mainStat.action &&
            (typeof (mainStat.action) === "string" ||
                typeof (mainStat.action) === "number")) {
            mainStatsActions.add(mainStat.action);
        }
    });
    allStats.forEach((stats, indexOfStats) => {
        // stats with index 0 is used for main stats
        if (indexOfStats > 0 &&
            stats &&
            Array.isArray(stats)) {
            stats.forEach(stat => {
                if ('action' in stat && stat.action &&
                    (typeof (stat.action) === "string" ||
                        typeof (stat.action) === "number")) {
                    // push stat for actions that don't exist on main stats
                    if (!mainStatsActions.has(stat.action)) {
                        mainStats.push(stat);
                        mainStatsActions.add(stat.action);
                        // if action stat exists on main, set it to the newest
                    }
                    else if (mainStatsActions.has(stat.action)) {
                        mainStats.forEach((mainStat, indexOfMainStat) => {
                            if (mainStat.action &&
                                stat.action === mainStat.action) {
                                if ('latestTimestamp' in mainStat &&
                                    mainStat.latestTimestamp &&
                                    typeof (mainStat.latestTimestamp) === "number" &&
                                    'latestTimestamp' in stat &&
                                    stat.latestTimestamp &&
                                    typeof (stat.latestTimestamp) === "number") {
                                    if (stat.latestTimestamp > mainStat.latestTimestamp) {
                                        mainStats[indexOfMainStat] = stat;
                                    }
                                }
                                else if ('latestDbTimestamp' in mainStat &&
                                    mainStat.latestDbTimestamp &&
                                    typeof (mainStat.latestDbTimestamp) === "number" &&
                                    'latestDbTimestamp' in stat &&
                                    stat.latestDbTimestamp &&
                                    typeof (stat.latestDbTimestamp) === "number") {
                                    if (stat.latestDbTimestamp > mainStat.latestDbTimestamp) {
                                        mainStats[indexOfMainStat] = stat;
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    return mainStats;
};
exports.mergeStatsV2 = mergeStatsV2;
const mergeChildrenV2 = (allChildren, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!allChildren)
        return null;
    if (!Array.isArray(allChildren))
        return null;
    if (!allChildren[0])
        return null;
    // The first array might be empty
    // if (!allChildren[0][0]) return null
    const mainChildren = allChildren[0];
    const mainChildrenIds = new Set();
    mainChildren?.forEach(mainChild => {
        if ('ids' in mainChild && mainChild.ids &&
            Array.isArray(mainChild.ids)) {
            mainChild.ids.forEach(id => {
                if ("value" in id && id.value &&
                    (typeof (id.value) === "string" ||
                        typeof (id.value) === "number")) {
                    mainChildrenIds.add(id.value);
                }
            });
        }
    });
    allChildren.forEach((children, indexOfChildren) => {
        // children with index 0 is used for main children
        if (indexOfChildren > 0 &&
            children &&
            Array.isArray(children)) {
            children.forEach(child => {
                let isChildMerged = false;
                if ('ids' in child && child.ids &&
                    Array.isArray(child.ids)) {
                    child.ids.forEach(id => {
                        if ('value' in id && id.value &&
                            (typeof (id.value) === "string" ||
                                typeof (id.value) === "number")) {
                            // isChildMerged flag is used because events can
                            // have many IDs and we don't want to redo merging
                            // for each ID if a child has already been merged.
                            if (!mainChildrenIds.has(id.value) &&
                                !isChildMerged) {
                                mainChildren.push(child);
                                mainChildrenIds.add(id.value);
                                isChildMerged = true;
                            }
                            else if (mainChildrenIds.has(id.value) &&
                                !isChildMerged) {
                                mainChildren.forEach((mainChild, mainChildIndex) => {
                                    if ('ids' in mainChild && mainChild.ids &&
                                        Array.isArray(mainChild.ids)) {
                                        mainChild.ids.forEach(mainChildId => {
                                            if ('value' in id && mainChildId.value &&
                                                (typeof (mainChildId.value) === "string" ||
                                                    typeof (mainChildId.value) === "number")) {
                                                if (mainChildId.value === id.value) {
                                                    if ('event' in child && child.event &&
                                                        typeof (child.event) === "object" &&
                                                        (0, exports.hasValue)(child.event)) {
                                                        // Add child.event to main if event
                                                        // doesn't exist in main child.
                                                        if (!('event' in mainChild) ||
                                                            !mainChild.event ||
                                                            typeof (mainChild.event) !== "object" ||
                                                            !(0, exports.hasValue)(mainChild.event)) {
                                                            mainChildren[mainChildIndex].event =
                                                                child.event;
                                                            // If event already exists in main,
                                                            // then merge two events.
                                                        }
                                                        else if ('event' in mainChild &&
                                                            mainChild.event &&
                                                            typeof (mainChild.event) === "object" &&
                                                            (0, exports.hasValue)(mainChild.event)) {
                                                            const mergedChildEvent = (0, exports.mergeSpasmEventsV2)([
                                                                mainChild.event,
                                                                child.event,
                                                                depth + 1
                                                            ]);
                                                            const finalChild = {
                                                                ...mainChild
                                                            };
                                                            if (mergedChildEvent) {
                                                                finalChild.event =
                                                                    mergedChildEvent;
                                                            }
                                                            mainChildren[mainChildIndex] =
                                                                finalChild;
                                                        }
                                                    }
                                                    isChildMerged = true;
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
    return mainChildren;
};
exports.mergeChildrenV2 = mergeChildrenV2;
const addEventsToTree = (unknownEvent, unknownEvents, maxDepth = 10, ifRecursively = true, depth = 0, destination = "any", ifMerge = true) => {
    if (!unknownEvent)
        return null;
    let treeEventV2 = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!treeEventV2 || !(0, exports.isObjectWithValues)(treeEventV2))
        return null;
    const maxRecursionDepth = maxDepth ?? 10;
    if (depth >= maxRecursionDepth) {
        return treeEventV2;
    }
    if (!unknownEvents)
        return treeEventV2;
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return treeEventV2;
    const treeRootIds = (0, exports.getAllRootIds)(treeEventV2);
    const treeParentIds = (0, exports.getAllParentIds)(treeEventV2);
    const treeIds = (0, exports.getAllEventIds)(treeEventV2);
    spasmEvents.forEach(event => {
        if (!treeEventV2)
            return; // break from forEach iteration
        if (event && (0, exports.isObjectWithValues)(event)) {
            // const eventRootIds = getAllRootIds(event)
            const eventParentIds = (0, exports.getAllParentIds)(event);
            const eventIds = (0, exports.getAllEventIds)(event);
            // Merge if events have the same ID
            if ((0, exports.ifArraysHaveCommonId)(treeIds, eventIds)) {
                if (ifMerge) {
                    treeEventV2 = (0, exports.mergeSpasmEventsV2)([treeEventV2, event]);
                }
                // Attach to tree as a root event
            }
            else if ((0, exports.ifArraysHaveCommonId)(treeRootIds, eventIds)) {
                if (destination === "any" || destination === "up") {
                    treeEventV2 = (0, exports.attachEventAsRoot)(treeEventV2, event);
                }
                // Attach to tree as a parent event
            }
            else if ((0, exports.ifArraysHaveCommonId)(treeParentIds, eventIds)) {
                if (destination === "any" || destination === "up") {
                    treeEventV2 = (0, exports.attachEventAsParent)(treeEventV2, event);
                }
                // Attach to tree as a child event
            }
            else if ((0, exports.ifArraysHaveCommonId)(treeIds, eventParentIds)) {
                if (destination === "any" || destination === "down") {
                    treeEventV2 = (0, exports.attachEventAsChild)(treeEventV2, event);
                }
                // Check if event should be attached to depth + 1
            }
            else if (ifRecursively) {
                // Root
                if (treeEventV2?.root?.event) {
                    if (destination === "any" || destination === "up") {
                        const eventWithAddedRelative = (0, exports.addEventsToTree)(treeEventV2?.root?.event, [event], maxDepth, ifRecursively, depth + 1, "up");
                        if (eventWithAddedRelative) {
                            treeEventV2.root.event = eventWithAddedRelative;
                        }
                    }
                }
                // Parent
                if (treeEventV2?.parent?.event) {
                    if (destination === "any" || destination === "up") {
                        const eventWithAddedRelative = (0, exports.addEventsToTree)(treeEventV2?.parent?.event, [event], maxDepth, ifRecursively, depth + 1, "up");
                        if (eventWithAddedRelative) {
                            treeEventV2.parent.event = eventWithAddedRelative;
                        }
                    }
                }
                // Children
                if (treeEventV2?.children &&
                    (0, exports.isArrayWithValues)(treeEventV2.children)) {
                    if (destination === "any" || destination === "down") {
                        treeEventV2.children.forEach(child => {
                            // Child
                            if (child?.event) {
                                const eventWithAddedRelative = (0, exports.addEventsToTree)(child?.event, [event], maxDepth, ifRecursively, depth + 1, "down");
                                if (eventWithAddedRelative) {
                                    child.event = eventWithAddedRelative;
                                }
                            }
                        });
                    }
                }
            }
        }
    });
    if (treeEventV2 && (0, exports.isObjectWithValues)(treeEventV2)) {
        return treeEventV2;
    }
    else {
        return null;
    }
};
exports.addEventsToTree = addEventsToTree;
// TODO set directions and maxDepth
exports.addParentToTree = exports.addEventsToTree;
exports.addParentToEvent = exports.addEventsToTree;
exports.addRootToTree = exports.addEventsToTree;
exports.addRootToEvent = exports.addEventsToTree;
exports.addChildrenToTree = exports.addEventsToTree;
exports.addCommentsToEvent = exports.addEventsToTree;
exports.addRepliesToEvent = exports.addEventsToTree;
const ifArraysHaveCommonId = (array1, array2) => {
    if (!array1 || !(0, exports.isArrayOfStringsOrNumbers)(array1))
        return false;
    if (!array2 || !(0, exports.isArrayOfStringsOrNumbers)(array2))
        return false;
    let ifCommonValue = false;
    array1.forEach(value => {
        if (array2.includes(value)) {
            ifCommonValue = true;
        }
    });
    return ifCommonValue;
};
exports.ifArraysHaveCommonId = ifArraysHaveCommonId;
const attachEventAsChild = (unknownMainEvent, unknownChildEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownChildEvent)
        return mainSpasmEvent;
    const childSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownChildEvent);
    if (!childSpasmEvent || !(0, exports.isObjectWithValues)(childSpasmEvent))
        return mainSpasmEvent;
    const child = { event: childSpasmEvent };
    if (childSpasmEvent.ids &&
        (0, exports.isArrayWithValues)(childSpasmEvent.ids)) {
        child.ids = childSpasmEvent.ids;
    }
    // Create children key if it doesn't exist
    mainSpasmEvent.children ??= [];
    const mergedChildren = (0, exports.mergeChildrenV2)([
        mainSpasmEvent.children, [child]
    ]);
    if (mergedChildren) {
        mainSpasmEvent.children = mergedChildren;
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsChild = attachEventAsChild;
const attachEventAsRoot = (unknownMainEvent, unknownRootEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownRootEvent)
        return mainSpasmEvent;
    const rootSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownRootEvent);
    if (!rootSpasmEvent || !(0, exports.isObjectWithValues)(rootSpasmEvent))
        return mainSpasmEvent;
    if (mainSpasmEvent.root) {
        if (!mainSpasmEvent.root.event) {
            mainSpasmEvent.root.event = rootSpasmEvent;
        }
        else if (mainSpasmEvent.root.event &&
            (0, exports.isObjectWithValues)(mainSpasmEvent.root.event)) {
            const mergedRootEvent = (0, exports.mergeSpasmEventsV2)([
                mainSpasmEvent.root.event, rootSpasmEvent
            ]);
            if (mergedRootEvent) {
                mainSpasmEvent.root.event = mergedRootEvent;
            }
        }
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsRoot = attachEventAsRoot;
const attachEventAsParent = (unknownMainEvent, unknownParentEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownParentEvent)
        return mainSpasmEvent;
    const parentSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownParentEvent);
    if (!parentSpasmEvent || !(0, exports.isObjectWithValues)(parentSpasmEvent))
        return mainSpasmEvent;
    if (mainSpasmEvent.parent) {
        if (!mainSpasmEvent.parent.event) {
            mainSpasmEvent.parent.event = parentSpasmEvent;
        }
        else if (mainSpasmEvent.parent.event &&
            (0, exports.isObjectWithValues)(mainSpasmEvent.parent.event)) {
            const mergedParentEvent = (0, exports.mergeSpasmEventsV2)([
                mainSpasmEvent.parent.event, parentSpasmEvent
            ]);
            if (mergedParentEvent) {
                mainSpasmEvent.parent.event = mergedParentEvent;
            }
        }
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsParent = attachEventAsParent;
// Assign formats for IDs, signatures, addresses if don't exist
const assignFormats = (event) => {
    if (!(0, exports.isObjectWithValues)(event) ||
        !("type" in event) || !event.type ||
        event.type !== "SpasmEventV2") {
        return;
    }
    // Assign id format if doesn't exist
    if ("ids" in event && event.ids &&
        (0, exports.isArrayWithValues)(event.ids)) {
        event.ids.forEach(id => {
            if (id.value && (!("format" in id) || !id.format ||
                !(0, exports.isObjectWithValues)(id.format))) {
                if ((0, exports.getFormatFromId)(id.value)) {
                    id.format = (0, exports.getFormatFromId)(id.value);
                }
            }
        });
    }
    // Assign author address format if doesn't exist
    if ("authors" in event && event.authors &&
        (0, exports.isArrayWithValues)(event.authors)) {
        event.authors.forEach(author => {
            if ("addresses" in author && author.addresses &&
                (0, exports.isArrayWithValues)(author.addresses)) {
                author.addresses.forEach(address => {
                    if (!("format" in address) || !address.format ||
                        (0, exports.isObjectWithValues)(address.format)) {
                        if ((0, exports.getFormatFromAddress)(address.value)) {
                            address.format = (0, exports.getFormatFromAddress)(address.value);
                        }
                    }
                });
            }
        });
    }
    // Assign signature format if doesn't exist
    if ("signatures" in event && event.signatures &&
        (0, exports.isArrayWithValues)(event.signatures)) {
        event.signatures.forEach(signature => {
            if (signature.value && (!("format" in signature) || !signature.format ||
                !(0, exports.isObjectWithValues)(signature.format))) {
                if ((0, exports.getFormatFromSignature)(signature.value)) {
                    signature.format =
                        (0, exports.getFormatFromSignature)(signature.value);
                }
            }
        });
    }
    // Assign ID and signature formats for siblings
    if ("siblings" in event && event.siblings &&
        (0, exports.isArrayWithValues)(event.siblings)) {
        event.siblings.forEach(sibling => {
            // Assign id format if doesn't exist
            if ("ids" in sibling && sibling.ids &&
                (0, exports.isArrayWithValues)(sibling.ids)) {
                sibling.ids.forEach(id => {
                    if (id.value && (!("format" in id) || !id.format ||
                        !(0, exports.isObjectWithValues)(id.format))) {
                        if ((0, exports.getFormatFromId)(id.value)) {
                            id.format = (0, exports.getFormatFromId)(id.value);
                        }
                    }
                });
            }
            // Assign signature format if doesn't exist
            if ("signatures" in sibling && sibling.signatures &&
                (0, exports.isArrayWithValues)(sibling.signatures)) {
                sibling.signatures.forEach(signature => {
                    if (signature.value && (!("format" in signature) || !signature.format ||
                        !(0, exports.isObjectWithValues)(signature.format))) {
                        if ((0, exports.getFormatFromSignature)(signature.value)) {
                            signature.format =
                                (0, exports.getFormatFromSignature)(signature.value);
                        }
                    }
                });
            }
        });
    }
    // Assign parent ID format if doesn't exist
    if ("parent" in event && event.parent &&
        (0, exports.isObjectWithValues)(event.parent)) {
        if ("ids" in event.parent && event.parent.ids &&
            (0, exports.isArrayWithValues)(event.parent.ids)) {
            event.parent.ids.forEach(id => {
                if (id.value && (!("format" in id) || !id.format ||
                    !(0, exports.isObjectWithValues)(id.format))) {
                    if ((0, exports.getFormatFromId)(id.value)) {
                        id.format = (0, exports.getFormatFromId)(id.value);
                    }
                }
            });
        }
    }
    // Assign root ID format if doesn't exist
    if ("root" in event && event.root &&
        (0, exports.isObjectWithValues)(event.root)) {
        if ("ids" in event.root && event.root.ids &&
            (0, exports.isArrayWithValues)(event.root.ids)) {
            event.root.ids.forEach(id => {
                if (id.value && (!("format" in id) || !id.format ||
                    !(0, exports.isObjectWithValues)(id.format))) {
                    if ((0, exports.getFormatFromId)(id.value)) {
                        id.format = (0, exports.getFormatFromId)(id.value);
                    }
                }
            });
        }
    }
    // Assign ID format for each reference if doesn't exist
    if ("references" in event && event.references &&
        (0, exports.isArrayWithValues)(event.references)) {
        event.references.forEach(reference => {
            if ("ids" in reference && reference.ids &&
                (0, exports.isArrayWithValues)(reference.ids)) {
                reference.ids.forEach(id => {
                    if (id.value && (!("format" in id) || !id.format ||
                        !(0, exports.isObjectWithValues)(id.format))) {
                        if ((0, exports.getFormatFromId)(id.value)) {
                            id.format = (0, exports.getFormatFromId)(id.value);
                        }
                    }
                });
            }
        });
    }
    // Assign address format for each mentionedAuthor if doesn't exist
    if ("mentions" in event && event.mentions &&
        (0, exports.isArrayWithValues)(event.mentions)) {
        event.mentions.forEach(mention => {
            if ("addresses" in mention && mention.addresses &&
                (0, exports.isArrayWithValues)(mention.addresses)) {
                mention.addresses.forEach(address => {
                    if (!("format" in address) || !address.format ||
                        (0, exports.isObjectWithValues)(address.format)) {
                        if ((0, exports.getFormatFromAddress)(address.value)) {
                            address.format =
                                (0, exports.getFormatFromAddress)(address.value);
                        }
                    }
                });
            }
        });
    }
};
exports.assignFormats = assignFormats;
const isHex = (value) => {
    if (!value)
        return false;
    if (typeof (value) !== "string")
        return false;
    const hexChars = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f"
    ];
    const valueArray = value.toLowerCase().split("");
    return valueArray.every(char => hexChars.includes(char));
};
exports.isHex = isHex;
const isNostrHex = (value) => {
    if (!value)
        return false;
    if (!(0, exports.isHex)(value))
        return false;
    if (typeof (value) !== "string")
        return false;
    if (value.length !== 64)
        return false;
    return true;
};
exports.isNostrHex = isNostrHex;
const normalizeText = (val) => {
    try {
        if (!val)
            return '';
        if (!String(val))
            return '';
        let str = String(val);
        // str = removeNbsp(str)
        // if (!str) return ''
        str = str.normalize('NFC');
        if (!str)
            return '';
        return str;
    }
    catch (err) {
        // console.error(err);
        return '';
    }
};
exports.normalizeText = normalizeText;
const removeNbsp = (val) => {
    try {
        if (!val)
            return '';
        if (typeof (val) !== "string")
            return '';
        // ` ` - NBSP \u00A0 U+00A0 &nbsp; &#160; (non-breaking space)
        // ` ` - SSP  \u0020 U+0020 (standard space)
        const nbsp = '\u00A0';
        let result = '';
        for (let i = 0; i < val.length; i++) {
            const char = val[i];
            // result += char === nbsp ? ' ' : char
            result += char === nbsp ? ' ' : char;
        }
        return result;
    }
    catch (err) {
        // console.error(err);
        return '';
    }
};
exports.removeNbsp = removeNbsp;
const toBeString = (input) => {
    switch (typeof input) {
        case 'number':
            return input.toString();
        case 'boolean':
            // Converts boolean to 'true' or 'false'
            return input.toString();
        case 'object':
            // Arrays are technically also objects in JS
            if (input && input !== null &&
                typeof (input) === 'object') {
                try {
                    return JSON.stringify(input);
                }
                catch (e) {
                    // Return empty string if JSON.stringify fails
                    return '';
                }
            }
            break;
        case 'string':
            return input;
        default:
            return '';
    }
    return ''; // Fallback for cases not covered by the switch
};
exports.toBeString = toBeString;
// Using a Map for O(1) lookups of official MIME types
exports.MIME_TYPE_MAP = new Map([
    // Video
    ['mp4', 'video/mp4'],
    ['mov', 'video/quicktime'],
    ['avi', 'video/x-msvideo'],
    ['mkv', 'video/x-matroska'],
    ['webm', 'video/webm'],
    ['m4v', 'video/mp4'],
    ['wmv', 'video/x-ms-wmv'],
    ['flv', 'video/x-flv'],
    // Audio
    ['mp3', 'audio/mpeg'],
    ['wav', 'audio/wav'],
    ['flac', 'audio/flac'],
    ['ogg', 'audio/ogg'],
    // m4a is usually AAC in mp4 container
    ['m4a', 'audio/mp4'],
    ['aac', 'audio/aac'],
    ['opus', 'audio/opus'],
    ['wma', 'audio/x-ms-wma'],
    // Image
    ['jpg', 'image/jpeg'],
    ['jpeg', 'image/jpeg'],
    ['png', 'image/png'],
    ['gif', 'image/gif'],
    ['bmp', 'image/bmp'],
    ['webp', 'image/webp'],
    ['ico', 'image/vnd.microsoft.icon'],
    ['svg', 'image/svg+xml'],
    ['tiff', 'image/tiff'],
    // Other
    ['pdf', 'application/pdf'],
    ['zip', 'application/zip'],
    ['json', 'application/json'],
    // 'application/git' is not standard IANA, but used by GitHub
    ['git', 'application/git'],
]);
exports.DEFAULT_MIME_TYPE = 'application/octet-stream';
// Supports:
// https://degenrocket.space/video.mp4?extra=info
// podcast-name-episode1.mp3
// prefix0123456.jpeg
const getMimeType = (str) => {
    if (!str || typeof (str) !== "string")
        return exports.DEFAULT_MIME_TYPE;
    const lastDotIndex = str.lastIndexOf('.');
    const queryIndex = str.lastIndexOf('?');
    if (lastDotIndex < 0) {
        const finalExt = exports.MIME_TYPE_MAP.get(str.toLowerCase()) || exports.DEFAULT_MIME_TYPE;
        return finalExt;
    }
    // Determine end of extension part (ignore query params)
    const strEndIndex = queryIndex > -1 ? queryIndex : str.length;
    // Ensure we have a dot and it's somewhere in the path
    // (not just a dot file at start or weird query)
    if (lastDotIndex > -1 && lastDotIndex < strEndIndex - 1) {
        const ext = str.substring(lastDotIndex + 1, strEndIndex);
        const finalExt = exports.MIME_TYPE_MAP.get(ext.toLowerCase())
            || exports.DEFAULT_MIME_TYPE;
        return finalExt;
    }
    return exports.DEFAULT_MIME_TYPE;
};
exports.getMimeType = getMimeType;
const getAllUrlsFromString = (description) => {
    if (!description)
        return [];
    if (typeof (description) !== "string")
        return [];
    const urls = [];
    const length = description.length;
    let i = 0;
    // Chars that typically mark the END of a URL in text
    // We will strip these from the end if found.
    const TRAILING_PUNCTUATION = new Set([
        '.', ',', '!', '?', ';', ':', '"',
        '\'', ')', ']', '}', '>', '`', "'"
    ]);
    // Chars that are NOT allowed in a URL (act as delimiters)
    // Includes whitespace, control chars,
    // and common invisible chars
    const INVALID_CHARS = new Set([
        ' ', '\t', '\n', '\r', '<', '|', '\\',
        '\u00A0', '\u200B', '\u200C', '\u200D',
        ')', // eg [![img](https://b.ot/i.jpg)](https://b.ot/a.mp3)
        ' ' // nbsp
    ]);
    // Allowed characters in a URI (RFC 3986)
    // Unreserved: A-Z a-z 0-9 - . _ ~
    // Reserved: : / ? # [ ] @ ! $ & ' ( ) * + , ; =
    // We will check if char is alphanumeric
    // or one of these symbols
    const URI_SYMBOLS = new Set([
        ':', '/', '?', '#', '[', ']', '@', '!', '$', '&', '(',
        ')', '*', '+', ',', ';', '=', '-', '.', '_', '~', '%'
    ]);
    while (i < length) {
        const char = description[i];
        // 1. Detect "http://" or "https://"
        if (char === 'h') {
            if (description.slice(i, i + 7) === 'http://' ||
                description.slice(i, i + 8) === 'https://') {
                let urlEnd = i;
                // 2. Consume valid URL characters
                while (urlEnd < length) {
                    const c = description[urlEnd];
                    // Stop if we hit an invalid delimiter
                    // (whitespace, brackets, etc)
                    if (INVALID_CHARS.has(c)) {
                        break;
                    }
                    // Stop if it's not alphanumeric and not a valid URI symbol
                    const isAlphaNum = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
                    if (!isAlphaNum && !URI_SYMBOLS.has(c)) {
                        break;
                    }
                    urlEnd++;
                }
                // Extract raw URL (might have trailing punctuation like . or ,)
                let rawUrl = description.substring(i, urlEnd);
                // 3. Strip trailing punctuation (e.g. "video.mp4!" -> "video.mp4")
                while (rawUrl.length > 0) {
                    const lastChar = rawUrl[rawUrl.length - 1];
                    if (TRAILING_PUNCTUATION.has(lastChar)) {
                        rawUrl = rawUrl.slice(0, -1);
                    }
                    else {
                        break;
                    }
                }
                urls.push(rawUrl);
                // Continue searching after this invalid URL
                i = urlEnd;
            }
            else {
                i++;
            }
        }
        else {
            i++;
        }
    }
    return (0, exports.removeDuplicatesFromArrayOfStrings)(urls);
};
exports.getAllUrlsFromString = getAllUrlsFromString;
exports.extractAllUrlsFromString = exports.getAllUrlsFromString;
exports.parseStringForUrls = exports.getAllUrlsFromString;
// Accepts file names and full URLs
const ifFileNameOfMimeType = (value, mimeTypes) => {
    if (!value || typeof (value) !== "string")
        return false;
    if (!mimeTypes)
        return false;
    let arrayOfMimeTypes = [];
    // Concat converts string or number into array
    arrayOfMimeTypes = arrayOfMimeTypes.concat(mimeTypes);
    if (!arrayOfMimeTypes || !(0, exports.isArrayWithValues)(arrayOfMimeTypes))
        return false;
    const fileMimeType = (0, exports.getMimeType)(value);
    let ifMatch = false;
    arrayOfMimeTypes.forEach(mimeType => {
        if (mimeType && typeof (mimeType) === "string" &&
            fileMimeType && typeof (fileMimeType) === "string" &&
            mimeType.toLowerCase() && fileMimeType.toLowerCase()) {
            if (fileMimeType.toLowerCase()
                .startsWith(mimeType.toLowerCase())) {
                ifMatch = true;
            }
        }
    });
    return ifMatch;
};
exports.ifFileNameOfMimeType = ifFileNameOfMimeType;
exports.isFileNameOfMimeType = exports.ifFileNameOfMimeType;
const getAllMediaUrlsFromArrayOfUrls = (array, mediaTypes = ["video", "audio", "image"]) => {
    if (!array)
        return [];
    return array.filter(val => {
        return (0, exports.ifFileNameOfMimeType)(val, mediaTypes);
    });
};
exports.getAllMediaUrlsFromArrayOfUrls = getAllMediaUrlsFromArrayOfUrls;
exports.filterAllMediaUrlsFromArrayOfUrls = exports.getAllMediaUrlsFromArrayOfUrls;
exports.getAllMediaUrlsOfMimeTypeFromArrayOfUrls = exports.getAllMediaUrlsFromArrayOfUrls;
exports.getAllUrlsOfMediaTypeFromArrayOfUrls = exports.getAllMediaUrlsFromArrayOfUrls;
const getAllMediaUrlsFromString = (str, mediaTypes = ["video", "audio", "image"]) => {
    if (!str || typeof (str) !== "string")
        return [];
    const arrayOfUrls = (0, exports.getAllUrlsFromString)(str);
    if (!arrayOfUrls)
        return [];
    const arrayOfMediaUrls = (0, exports.getAllMediaUrlsFromArrayOfUrls)(arrayOfUrls, mediaTypes);
    return arrayOfMediaUrls;
};
exports.getAllMediaUrlsFromString = getAllMediaUrlsFromString;
exports.extractAllMediaUrlsFromString = exports.getAllMediaUrlsFromString;
exports.parseStringForMediaUrls = exports.getAllMediaUrlsFromString;
const getFirstMediaUrlFromString = (str, mediaTypes = ["video", "audio", "image"]) => {
    if (!str || typeof (str) !== "string")
        return "";
    const videoOrAudioUrls = (0, exports.getAllMediaUrlsFromString)(str, mediaTypes);
    if (videoOrAudioUrls && Array.isArray(videoOrAudioUrls) &&
        videoOrAudioUrls[0] &&
        typeof (videoOrAudioUrls[0]) == "string") {
        return videoOrAudioUrls[0];
    }
    return "";
};
exports.getFirstMediaUrlFromString = getFirstMediaUrlFromString;
exports.extractFirstMediaUrlFromString = exports.getFirstMediaUrlFromString;
exports.parseFirstMediaUrlFromString = exports.getFirstMediaUrlFromString;
const getFirstAudioOrVideoUrlFromString = (str) => {
    return (0, exports.getFirstMediaUrlFromString)(str, ["video", "audio"]);
};
exports.getFirstAudioOrVideoUrlFromString = getFirstAudioOrVideoUrlFromString;
exports.extractFirstAudioOrVideoUrlFromString = exports.getFirstAudioOrVideoUrlFromString;
exports.parseFirstAudioOrVideoUrlFromString = exports.getFirstAudioOrVideoUrlFromString;
// Escape XML entities to prevent the RSS feed
// from breaking if a text contains <, >, &, ', "
const escapeXml = (unsafe) => {
    let safe = '';
    for (const char of unsafe) {
        switch (char) {
            case '<':
                safe += '&lt;';
                break;
            case '>':
                safe += '&gt;';
                break;
            case '&':
                safe += '&amp;';
                break;
            case '\'':
                safe += '&apos;';
                break;
            case '"':
                safe += '&quot;';
                break;
            default:
                safe += char;
                break;
        }
    }
    return safe;
};
exports.escapeXml = escapeXml;
// In XML, CDATA sections are terminated by the sequence "]]>"
// If this sequence appears in user input, it would prematurely
// end the CDATA section. This would break the XML structure
// and potentially allow injection of malicious XML.
// Replacing "]]>" with "]]]]><![CDATA[>" preserves the original
// content while ensuring the XML remains well-formed and secure
const escapeXmlCdata = (input) => {
    return input.replace(']]>', ']]]]><![CDATA[>');
};
exports.escapeXmlCdata = escapeXmlCdata;
exports.escapeRssCdata = exports.escapeXmlCdata;
exports.escapeCdata = exports.escapeXmlCdata;
exports.prepareForXmlCdata = exports.escapeXmlCdata;
exports.prepareForRssCdata = exports.escapeXmlCdata;
exports.prepareForCdata = exports.escapeXmlCdata;
// Reverse the transformation done by escapeXmlCdata
const restoreFromXmlCdata = (input) => {
    return input.replace(']]]]><![CDATA[>', ']]>');
};
exports.restoreFromXmlCdata = restoreFromXmlCdata;
exports.restoreFromRssCdata = exports.restoreFromXmlCdata;
exports.restoreFromCdata = exports.restoreFromXmlCdata;
exports.unescapeXmlCdata = exports.restoreFromXmlCdata;
exports.unescapeRssCdata = exports.restoreFromXmlCdata;
exports.unescapeCdata = exports.restoreFromXmlCdata;
const autoGeneratedName = (value) => {
    if (!value)
        return "";
    if (typeof (value) !== "string" &&
        typeof (value) !== "number") {
        return "";
    }
    const firstTech = [
        "bankless",
        "black",
        "blue",
        "dark",
        "decoded",
        "encoded",
        "fluffy",
        "free",
        "golden",
        "gray",
        "green",
        "hidden",
        "indie",
        "new",
        "neon",
        "orange",
        "purple",
        "red",
        "private",
        "pirate",
        "quantum",
        "scaling",
        "secure",
        "shadow",
        "silver",
        "stable",
        "swapping",
        "unbanked",
        "unstable",
        "white",
        "zero",
    ];
    const secondTech = [
        "airdrop",
        "alpha",
        "arbitrage",
        "block",
        "darknet",
        "defi",
        "degen",
        "chain",
        "code",
        "crypto",
        "cypher",
        "cult",
        "foss",
        "freedom",
        "hash",
        "jupiter",
        "key",
        "layer",
        "ledger",
        "linux",
        "lunar",
        "market",
        "mars",
        "meme",
        "mesh",
        "moon",
        "network",
        "night",
        "onion",
        "rollup",
        "script",
        "silkroad",
        "snapshot",
        "solar",
        "source",
        "space",
        "spasm",
        "tech",
        "token",
        "wallet",
        "zk",
    ];
    const thirdTech = [
        "auditor",
        "bot",
        "broker",
        "builder",
        "burner",
        "cyborg",
        "dev",
        "doxxer",
        "exchanger",
        "explorer",
        "farmer",
        "fighter",
        "flipper",
        "forker",
        "geek",
        "hacker",
        "hamster",
        "hodler",
        "hunter",
        // "innovator",
        "keeper",
        "kitty",
        // "liberator",
        // "maker",
        "master",
        "maxi",
        "miner",
        "minter",
        "mixer",
        "naut",
        "node",
        "noncer",
        "phantom",
        "punk",
        "rebel",
        "robot",
        "rocket",
        "router",
        "samourai",
        "scanner",
        "sharder",
        "signer",
        "sniffer",
        "stalker",
        "swapper",
        "tester",
        "trader",
        "wizard",
    ];
    const getNumberHashFromValue = (value) => {
        let seed = "";
        if (typeof (value) === "number") {
            seed = value.toString();
        }
        else if (typeof (value) === "string") {
            seed = value;
        }
        seed = seed.toLowerCase();
        // Map each character to its numerical value,
        // ignoring non-alphanumeric characters
        const charMap = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let sum = 0;
        const maxLength = 64; // Maximum number of chars to process
        for (let i = 0; i < Math.min(seed.length, maxLength); i++) {
            const charCode = seed[i];
            const index = charMap.indexOf(charCode);
            if (index !== -1) { // Character found in map
                // Multiply by 2 to reduce collisions
                sum = Math.floor(sum * 2) + index;
            }
        }
        // Ensure the result fits within 32 bits
        return sum % (2 ** 32);
    };
    let sum = getNumberHashFromValue(value);
    const getUsernameFromNumber = (value, enableAutoGeneratedNamesDictionaryTech = true) => {
        // Use the sum to determine the index
        // for selecting a word from each array
        const index1 = Math.abs((value * 11) % firstTech.length);
        const index2 = Math.abs((value * 13 * 17) % secondTech.length);
        const index3 = Math.abs((value * 19 * 23 * 29) % thirdTech.length);
        let word1 = "";
        let word2 = "";
        let word3 = "";
        // Select a word from each array
        // using the calculated indices
        if (enableAutoGeneratedNamesDictionaryTech) {
            word1 = firstTech[index1];
            word2 = secondTech[index2];
            word3 = thirdTech[index3];
        }
        else {
            // Use default dictionary
            // (currently equal to tech dictionary)
            word1 = firstTech[index1];
            word2 = secondTech[index2];
            word3 = thirdTech[index3];
        }
        // Combine the selected words to form the unique name
        const titleCaseWord = (word) => {
            if (!word)
                return word;
            return word[0].toUpperCase() + word.slice(1);
        };
        return titleCaseWord(word1) +
            titleCaseWord(word2) +
            titleCaseWord(word3);
    };
    let username = getUsernameFromNumber(sum);
    while (username.length > 16) {
        sum += 31;
        username = getUsernameFromNumber(sum);
    }
    return username;
};
exports.autoGeneratedName = autoGeneratedName;
const toBeShortAddress = (longAddress, ifPrefixWithAutoGeneratedName = true) => {
    try {
        const string = String(longAddress);
        if (!string)
            return "";
        const shortAddress = (0, exports.sliceAddress)(string, 6);
        let final = "";
        if (ifPrefixWithAutoGeneratedName) {
            final = (0, exports.autoGeneratedName)(string) + " ";
        }
        final = final + "(" + shortAddress + ")";
        return final;
    }
    catch (err) {
        console.error(err);
        return "";
    }
};
exports.toBeShortAddress = toBeShortAddress;
const sliceAddress = (address, start = 6, end = 4) => {
    return address
        ? `${address.slice(0, start)}...${address.slice(-end)}`
        : '';
};
exports.sliceAddress = sliceAddress;
const sliceId = (id, start = 6, end = 4, max // used for URL length
) => {
    if (!id) {
        return '';
    }
    const str = String(id) ? String(id) : '';
    if (!str)
        return '';
    let maxChar = Number(start) ? Number(start) : 6;
    if (Number(end)) {
        maxChar += Number(end);
    }
    if (max && Number(max)) {
        maxChar = Number(max);
    }
    // ID is URL
    try {
        const url = new URL(str);
        if (url && typeof (url) === "object") {
            let slicedUrl = '';
            if (url.hostname && typeof (url.hostname) === "string") {
                slicedUrl += url.hostname;
            }
            if (url.pathname && typeof (url.pathname) === "string") {
                slicedUrl += url.pathname;
            }
            if (url.search && typeof (url.search) === "string") {
                slicedUrl += url.search;
            }
            if (slicedUrl) {
                if (slicedUrl.length > maxChar + 3) {
                    return `${slicedUrl.slice(0, maxChar)}...`;
                }
                else {
                    return slicedUrl;
                }
            }
            else {
                '';
            }
        }
    }
    catch (err) {
        // Not a valid URL
        // console.error(err);
    }
    // else
    return str
        ? `${str.slice(0, start)}...${str.slice(-end)}`
        : '';
};
exports.sliceId = sliceId;
const randomNumber = (min = 1, max = 1000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.randomNumber = randomNumber;
const getSpasmTagsByName = (originalEvent, tagName) => {
    try {
        if (!tagName || !(0, exports.isStringOrNumber)(tagName))
            return null;
        const spasmEventV2 = (0, exports.toBeSpasmEventV2)(originalEvent);
        if (!spasmEventV2 || !(0, exports.isObjectWithValues)(spasmEventV2)) {
            return null;
        }
        if (spasmEventV2.tags && (0, exports.isArrayWithValues)(spasmEventV2.tags)) {
            const matchedTags = [];
            spasmEventV2.tags.forEach(tag => {
                if (tag && (0, exports.isArrayWithValues)(tag) &&
                    tag[0] && tag[0] === tagName) {
                    matchedTags.push(tag);
                }
            });
            if ((0, exports.isArrayWithValues)(matchedTags))
                return matchedTags;
        }
        return null;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.getSpasmTagsByName = getSpasmTagsByName;
exports.getTagsByName = exports.getSpasmTagsByName;
exports.getAllTagsByName = exports.getSpasmTagsByName;
exports.getAllSpasmTagsByName = exports.getSpasmTagsByName;
exports.extractTagsByName = exports.getSpasmTagsByName;
exports.extractSpasmTagsByName = exports.getSpasmTagsByName;
exports.extractAllSpasmTagsByName = exports.getSpasmTagsByName;
const getSpasmTagByName = (originalEvent, tagName) => {
    const tags = (0, exports.getTagsByName)(originalEvent, tagName);
    if (tags && (0, exports.isArrayWithValues)(tags) &&
        tags[0] && (0, exports.isArrayWithValues)(tags[0])) {
        return tags[0];
    }
    return null;
};
exports.getSpasmTagByName = getSpasmTagByName;
exports.getTagByName = exports.getSpasmTagByName;
exports.getOneTagByName = exports.getSpasmTagByName;
exports.getOneSpasmTagByName = exports.getSpasmTagByName;
exports.extractTagByName = exports.getSpasmTagByName;
exports.extractSpasmTagByName = exports.getSpasmTagByName;
exports.extractOneSpasmTagByName = exports.getSpasmTagByName;
const extractAllCategories = (originalEvent, ifIncludeSubCategory = true) => {
    try {
        const spasmEventV2 = (0, exports.toBeSpasmEventV2)(originalEvent);
        if (!spasmEventV2 ||
            !spasmEventV2?.categories ||
            !Array.isArray(spasmEventV2.categories)) {
            return [];
        }
        const cats = [];
        spasmEventV2.categories.forEach(cat => {
            if ((0, exports.isObjectWithValues)(cat)) {
                if (cat.name && (0, exports.isStringOrNumber)(cat.name)) {
                    cats.push(cat.name);
                }
                if (ifIncludeSubCategory &&
                    cat.sub && (0, exports.isObjectWithValues)(cat.sub) &&
                    (0, exports.isStringOrNumber)(cat.sub.name)) {
                    cats.push(cat.sub.name);
                    if (cat.sub.sub && (0, exports.isObjectWithValues)(cat.sub.sub) &&
                        (0, exports.isStringOrNumber)(cat.sub.sub.name)) {
                        cats.push(cat.sub.sub.name);
                        if (cat.sub.sub.sub &&
                            (0, exports.isObjectWithValues)(cat.sub.sub.sub) &&
                            (0, exports.isStringOrNumber)(cat.sub.sub.sub.name)) {
                            cats.push(cat.sub.sub.sub.name);
                        }
                    }
                }
            }
        });
        if ((0, exports.isArrayWithValues)(cats))
            return cats;
    }
    catch (err) {
        console.error(err);
        return [];
    }
    return [];
};
exports.extractAllCategories = extractAllCategories;
exports.extractCategories = exports.extractAllCategories;
exports.getAllCategories = exports.extractCategories;
exports.getCategories = exports.extractCategories;
const extractOneCategory = (originalEvent) => {
    const cat = (0, exports.extractAllCategories)(originalEvent);
    if (cat && Array.isArray(cat) &&
        cat[0] && (0, exports.isStringOrNumber)(cat[0])) {
        return cat[0];
    }
    return null;
};
exports.extractOneCategory = extractOneCategory;
exports.extractCategory = exports.extractOneCategory;
exports.getOneCategory = exports.extractCategory;
exports.getCategory = exports.extractCategory;
const addSchemaToSpasmEventBody = (spasmEventBodyV2, schema) => {
    try {
        if (!schema || typeof (schema) !== "object")
            return;
        if (Array.isArray(schema))
            return;
        if (!spasmEventBodyV2 ||
            spasmEventBodyV2.type !== "SpasmEventBodyV2") {
            console.error("Custom schema can only be added to SpasmEventBodyV2");
            return;
        }
        spasmEventBodyV2.tags ??= [];
        const tag = (0, exports.createTagFromSchema)(schema);
        if (tag && (0, exports.isArrayWithValues)(tag)) {
            spasmEventBodyV2.tags.push(tag);
        }
        return;
    }
    catch (err) {
        console.error(err);
        return;
    }
};
exports.addSchemaToSpasmEventBody = addSchemaToSpasmEventBody;
exports.addSchema = exports.addSchemaToSpasmEventBody;
exports.addCustomSchemaToSpasmEventBody = exports.addSchemaToSpasmEventBody;
exports.addExtraSchemaToSpasmEventBody = exports.addSchemaToSpasmEventBody;
exports.addConfig = exports.addSchemaToSpasmEventBody;
exports.addConfigToSpasmEventBody = exports.addSchemaToSpasmEventBody;
exports.addCustomConfigToSpasmEventBody = exports.addSchemaToSpasmEventBody;
exports.addExtraConfigToSpasmEventBody = exports.addSchemaToSpasmEventBody;
const createSpasmTagFromSchema = (schema) => {
    if (!schema || typeof (schema) !== "object" ||
        Array.isArray(schema) ||
        !schema.name || !String(schema.name))
        return null;
    const tag = [
        "spasm_custom_schema", String(schema.name)
    ];
    try {
        // Extract keys and sort them alphabetically
        const keys = Object.keys(schema).filter(key => key !== "name").sort();
        // Add key-value pairs to tag
        for (const key of keys) {
            const value = schema[key];
            // Convert value to string properly
            tag.push(key, typeof value === 'object'
                ? JSON.stringify(value) : String(value));
        }
        return tag;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.createSpasmTagFromSchema = createSpasmTagFromSchema;
exports.createTagFromSchema = exports.createSpasmTagFromSchema;
exports.constructSpasmTagFromSchema = exports.createSpasmTagFromSchema;
exports.constructTagFromSchema = exports.createSpasmTagFromSchema;
exports.createSpasmTagFromConfig = exports.createSpasmTagFromSchema;
exports.createTagFromConfig = exports.createSpasmTagFromSchema;
exports.constructSpasmTagFromConfig = exports.createSpasmTagFromSchema;
exports.constructTagFromConfig = exports.createSpasmTagFromSchema;
const extractSchemaTagsFromSpasmEvent = (originalEvent, schemaFlag) => {
    if (!schemaFlag || !(0, exports.isStringOrNumber)(schemaFlag))
        return null;
    try {
        const spasmEventV2 = (0, exports.toBeSpasmEventV2)(originalEvent);
        if (!spasmEventV2 || !(0, exports.isObjectWithValues)(spasmEventV2)) {
            return null;
        }
        const tags = (0, exports.getTagsByName)(spasmEventV2, schemaFlag);
        if (tags && (0, exports.isArrayWithValues)(tags)) {
            const schemaTags = [];
            tags.forEach(tag => {
                if (tag && Array.isArray(tag) &&
                    tag[0] === schemaFlag &&
                    tag[1] && (0, exports.isStringOrNumber)(tag[1])) {
                    schemaTags.push(tag);
                }
            });
            if (schemaTags && (0, exports.isArrayWithValues)(schemaTags)) {
                return schemaTags;
            }
        }
        return null;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.extractSchemaTagsFromSpasmEvent = extractSchemaTagsFromSpasmEvent;
exports.extractConfigTagsFromSpasmEvent = exports.extractSchemaTagsFromSpasmEvent;
exports.getSchemaTagsFromSpasmEvent = exports.extractSchemaTagsFromSpasmEvent;
exports.getConfigTagsFromSpasmEvent = exports.extractSchemaTagsFromSpasmEvent;
const extractSchemaFromSpasmEvent = (originalEvent, schemaName) => {
    try {
        if (!schemaName || !(0, exports.isStringOrNumber)(schemaName)) {
            return null;
        }
        const spasmEventV2 = (0, exports.toBeSpasmEventV2)(originalEvent);
        if (!spasmEventV2 || !(0, exports.isObjectWithValues)(spasmEventV2)) {
            return null;
        }
        /**
         * There might be different flags for marking schema tag.
         * The first flag is "spasm_custom_schema".
         * Once other flags are introduced, we can simply add them
         * to schemaFlags array
         */
        const schemaFlags = ["spasm_custom_schema"];
        const schemaTags = [];
        schemaFlags.forEach(flag => {
            const schemaTagsForThisFlag = (0, exports.extractSchemaTagsFromSpasmEvent)(spasmEventV2, flag);
            if (schemaTagsForThisFlag &&
                (0, exports.isArrayWithValues)(schemaTagsForThisFlag)) {
                schemaTags.push(...schemaTagsForThisFlag);
            }
        });
        if (!schemaTags || !(0, exports.isArrayWithValues)(schemaTags)) {
            return null;
        }
        const schemas = (0, exports.extractSchemasFromSpasmTags)(schemaTags);
        if (!schemas || !(0, exports.isArrayWithValues)(schemas)) {
            return null;
        }
        const matchedSchema = schemas.find(schema => schema.name === schemaName);
        if (matchedSchema && (0, exports.isObjectWithValues)(matchedSchema)) {
            return matchedSchema;
        }
        return null;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.extractSchemaFromSpasmEvent = extractSchemaFromSpasmEvent;
exports.getSchema = exports.extractSchemaFromSpasmEvent;
exports.getConfig = exports.extractSchemaFromSpasmEvent;
exports.extractSchema = exports.extractSchemaFromSpasmEvent;
exports.extractConfig = exports.extractSchemaFromSpasmEvent;
exports.getSchemaFromSpasmEvent = exports.extractSchemaFromSpasmEvent;
exports.getConfigFromSpasmEvent = exports.extractSchemaFromSpasmEvent;
exports.extractConfigFromSpasmEvent = exports.extractSchemaFromSpasmEvent;
const extractSchemasFromSpasmTags = (tags) => {
    if (!tags || !(0, exports.isArrayWithValues)(tags))
        return null;
    const schemas = [];
    tags.forEach(tag => {
        const schema = (0, exports.extractSchemaFromSpasmTag)(tag);
        if (schema && (0, exports.isObjectWithValues)(schema)) {
            schemas.push(schema);
        }
    });
    if (schemas && (0, exports.isArrayWithValues)(schemas))
        return schemas;
    return null;
};
exports.extractSchemasFromSpasmTags = extractSchemasFromSpasmTags;
exports.extractAllSchemasFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.extractConfigsFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.extractAllConfigsFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.getSchemasFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.getAllSchemasFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.getConfigsFromSpasmTags = exports.extractSchemasFromSpasmTags;
exports.getAllConfigsFromSpasmTags = exports.extractSchemasFromSpasmTags;
const extractSchemaFromSpasmTag = (tag) => {
    if (!tag || !(0, exports.isArrayWithValues)(tag))
        return null;
    /**
     * There might be different flags for marking schema tag.
     * The first flag is "spasm_custom_schema".
     * Once other flags are introduced, we can simply add new
     * logic to this function for other flags.
     */
    if (tag[0] === "spasm_custom_schema") {
        if (!tag[1] || !(0, exports.isStringOrNumber)(tag[1]))
            return null;
        const schema = { name: tag[1] };
        // Loop through the tag array starting from the 2nd index
        for (let i = 2; i < tag.length; i += 2) {
            const key = tag[i];
            const value = tag[i + 1];
            // Try to parse objects or arrays
            try {
                const parsedValue = JSON.parse(value);
                // Only assign parsed objects and arrays because other
                // types like "string" can lead to loss of data. For
                // example, if we JSON.parse("1.0") version, it will
                // return number 1, so some data will be lost.
                if ((0, exports.isObjectWithValues)(parsedValue) ||
                    (0, exports.isArrayWithValues)(parsedValue)) {
                    schema[key] = parsedValue;
                }
                else {
                    schema[key] = value;
                }
            }
            catch {
                // In case of parsing error, assign as string
                schema[key] = value;
            }
        }
        return schema;
    }
    // Check for other flags marking schema tags
    return null;
};
exports.extractSchemaFromSpasmTag = extractSchemaFromSpasmTag;
exports.extractConfigFromSpasmTag = exports.extractSchemaFromSpasmTag;
exports.getSchemaFromSpasmTag = exports.extractSchemaFromSpasmTag;
exports.getConfigFromSpasmTag = exports.extractSchemaFromSpasmTag;
exports.extractSchemaFromTag = exports.extractSchemaFromSpasmTag;
exports.extractConfigFromTag = exports.extractSchemaFromSpasmTag;
exports.getSchemaFromTag = exports.extractSchemaFromSpasmTag;
exports.getConfigFromTag = exports.extractSchemaFromSpasmTag;
const flattenArrayOfStringsAndNumbersIntoString = (arr, separator = ",") => {
    return (arr
        // .filter(Boolean) // keep 0
        .filter(exports.isStringOrNumber)
        .map(String)
        .join(separator));
};
exports.flattenArrayOfStringsAndNumbersIntoString = flattenArrayOfStringsAndNumbersIntoString;
exports.joinStringOrNum = exports.flattenArrayOfStringsAndNumbersIntoString;
exports.joinStringOrNumber = exports.flattenArrayOfStringsAndNumbersIntoString;
exports.flattenArrayOfStringsAndNumbers = exports.flattenArrayOfStringsAndNumbersIntoString;
exports.flattenMixedArray = exports.flattenArrayOfStringsAndNumbersIntoString;
exports.flattenArray = exports.flattenArrayOfStringsAndNumbersIntoString;
//# sourceMappingURL=utils.js.map