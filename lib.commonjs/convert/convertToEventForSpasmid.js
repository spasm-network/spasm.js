"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpasmEventV2ToEventForSpasmid01 = exports.convertToEventForSpasmid = void 0;
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const utils_js_1 = require("./../utils/utils.js");
// Spasm V2
const convertToEventForSpasmid = (unknownEvent, idVersion = "01") => {
    let spasmEventV2 = {
        type: "SpasmEventV2"
    };
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
    if (!spasmEventV2)
        return null;
    if (idVersion === "01") {
        const eventForSpasmid01 = (0, exports.convertSpasmEventV2ToEventForSpasmid01)(spasmEventV2);
        return eventForSpasmid01;
    }
    return null;
};
exports.convertToEventForSpasmid = convertToEventForSpasmid;
const convertSpasmEventV2ToEventForSpasmid01 = (spasmEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const eventForSpasmid = {};
    if (spasmEvent.parent) {
        // Only 'ids' and 'marker' of a parent are used for Spasm ID
        const cleanParent = (0, utils_js_1.keepTheseKeysInObject)(spasmEvent.parent, ["ids", "marker"]);
        const sortedParent = (0, utils_js_1.sortParentForSpasmid01)(cleanParent);
        eventForSpasmid.parent = sortedParent;
    }
    if (spasmEvent.action) {
        eventForSpasmid.action = spasmEvent.action;
    }
    if (spasmEvent.title) {
        eventForSpasmid.title = spasmEvent.title;
    }
    if (spasmEvent.content) {
        eventForSpasmid.content = spasmEvent.content;
    }
    if (spasmEvent.timestamp) {
        eventForSpasmid.timestamp = spasmEvent.timestamp;
    }
    if (spasmEvent.authors) {
        /**
         * The 'hosts' key is not used for the Spasm ID, because
         * a user might submit an already signed event to a new
         * instance with different hosts.
         */
        const cleanAuthors = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.authors, ["addresses", "usernames", "marker"]);
        const sortedAuthors = (0, utils_js_1.sortAuthorsForSpasmid01)(cleanAuthors);
        eventForSpasmid.authors = sortedAuthors;
    }
    if (spasmEvent.tips) {
        eventForSpasmid.tips = (0, utils_js_1.sortArrayOfObjects)(spasmEvent.tips, "address");
        if (eventForSpasmid.tips) {
            // We need to do a deep copy to make sure that we don't
            // mess up the original object with toLowerCase()
            const lowerCaseTips = (0, utils_js_1.copyOf)(eventForSpasmid.tips);
            (0, utils_js_1.toLowerCaseAllNestedStrings)(lowerCaseTips);
            eventForSpasmid.tips = lowerCaseTips;
        }
    }
    if (spasmEvent.hosts) {
        const cleanHosts = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.hosts, ["value", "marker"]);
        const sortedHosts = (0, utils_js_1.sortHostsForSpasmid01)(cleanHosts);
        eventForSpasmid.hosts = sortedHosts;
    }
    if (spasmEvent.links) {
        const cleanLinks = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.links, ["value", "marker"]);
        const sortedLinks = (0, utils_js_1.sortLinksForSpasmid01)(cleanLinks);
        eventForSpasmid.links = sortedLinks;
    }
    if (spasmEvent.keywords) {
        eventForSpasmid.keywords =
            (0, utils_js_1.sortArrayOfStringsAndNumbers)(spasmEvent.keywords);
    }
    if (spasmEvent.tags) {
        eventForSpasmid.tags = (0, utils_js_1.sortTagsForSpasmid01)(spasmEvent.tags);
    }
    if (spasmEvent.medias) {
        const sortedMedias = (0, utils_js_1.sortMediasForSpasmid01)(spasmEvent.medias);
        eventForSpasmid.medias = sortedMedias;
    }
    if (spasmEvent.references) {
        const cleanReferences = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.references, ["ids", "marker"]);
        const sortedReferences = (0, utils_js_1.sortReferencesForSpasmid01)(cleanReferences);
        eventForSpasmid.references = sortedReferences;
    }
    if (spasmEvent.mentions) {
        /**
         * The 'hosts' key is not used for the Spasm ID, because
         * a user might submit an already signed event to a new
         * instance with different hosts.
         */
        const cleanMentions = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.mentions, ["addresses", "usernames", "marker"]);
        // Mentions is the same as authors in V2
        const sortedMentions = (0, utils_js_1.sortAuthorsForSpasmid01)(cleanMentions);
        eventForSpasmid.mentions = sortedMentions;
    }
    if (spasmEvent.proofs) {
        eventForSpasmid.proofs = (0, utils_js_1.sortArrayOfObjects)(spasmEvent.proofs, "value");
        // Sort proofs.links
        eventForSpasmid.proofs.forEach((proof, index) => {
            if (proof && proof.links &&
                Array.isArray(proof.links) &&
                proof.links[0]) {
                const cleanLinks = (0, utils_js_1.keepTheseKeysInObjectsInArray)(proof.links, ["value", "marker"]);
                const sortedLinks = (0, utils_js_1.sortLinksForSpasmid01)(cleanLinks);
                if (eventForSpasmid.proofs &&
                    Array.isArray(eventForSpasmid.proofs)) {
                    eventForSpasmid.proofs[index].links = sortedLinks;
                }
            }
        });
    }
    if (spasmEvent.license) {
        eventForSpasmid.license = spasmEvent.license;
    }
    if (spasmEvent.language) {
        eventForSpasmid.language = spasmEvent.language;
    }
    if (spasmEvent.extra) {
        eventForSpasmid.extra = spasmEvent.extra;
    }
    /*
     * Only one POW is used to calculate the Spasm ID,
     * other POWs might be attached to satistify requirements
     * on certain instances/relays, but they should not affect
     * the Spasm ID, because a user can sign many siblings for
     * the same event with many different POW values.
     */
    if (spasmEvent.pows &&
        Array.isArray(spasmEvent.pows) &&
        spasmEvent.pows[0]) {
        // Find a POW with "spasmid01" marker
        spasmEvent.pows.forEach(pow => {
            if (pow && "marker" in pow &&
                pow.marker === "spasmid01") {
                // If multple spasmid01 are found, then keep
                // the one with the highest difficulty.
                if (!eventForSpasmid.pows) {
                    eventForSpasmid.pows = [pow];
                }
                else if (eventForSpasmid.pows &&
                    Array.isArray(eventForSpasmid.pows) &&
                    eventForSpasmid.pows[0] &&
                    eventForSpasmid.pows[0].difficulty &&
                    typeof (eventForSpasmid.pows[0].difficulty) === "number" &&
                    pow.difficulty &&
                    typeof (pow.difficulty) === "number" &&
                    eventForSpasmid.pows[0].difficulty < pow.difficulty) {
                    eventForSpasmid.pows = [pow];
                }
            }
        });
        // Sort words inside POW
        if (eventForSpasmid.pows &&
            Array.isArray(eventForSpasmid.pows) &&
            eventForSpasmid.pows[0] &&
            eventForSpasmid.pows[0].words &&
            Array.isArray(eventForSpasmid.pows[0].words)) {
            eventForSpasmid.pows[0].words =
                (0, utils_js_1.sortArrayOfStringsAndNumbers)(eventForSpasmid.pows[0].words);
        }
    }
    return eventForSpasmid;
};
exports.convertSpasmEventV2ToEventForSpasmid01 = convertSpasmEventV2ToEventForSpasmid01;
//# sourceMappingURL=convertToEventForSpasmid.js.map