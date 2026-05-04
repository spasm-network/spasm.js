"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSpasmSimple = exports.convertManyToSpasmSimple = void 0;
/**
 * WARNING: Converting to SpasmSimpleV2 is a one-way ticket.
 * SpasmSimpleV2 is only used to display events in a short form
 * after all signatures were verified by convertToSpasm() func.
 * SpasmSimpleV2 cannot be converted back to SpasmEventAnyV2
 * since it lacks siblings and signatures.
 * Simple version consumes less tokens when analyzed by LLMs.
 */
const interfaces_js_1 = require("../types/interfaces.js");
const utils_js_1 = require("../utils/utils.js");
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const convertManyToSpasmSimple = (unknownEvents, customConfig) => {
    try {
        if (!unknownEvents)
            return null;
        if (!Array.isArray(unknownEvents))
            return null;
        if (!(0, utils_js_1.hasValue)(unknownEvents))
            return null;
        const convertedEvents = [];
        unknownEvents.forEach(event => {
            const convertedEvent = (0, exports.convertToSpasmSimple)(event, customConfig);
            if (convertedEvent) {
                convertedEvents.push(convertedEvent);
            }
        });
        if (!(0, utils_js_1.hasValue)(convertedEvents))
            return null;
        return convertedEvents;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.convertManyToSpasmSimple = convertManyToSpasmSimple;
const convertToSpasmSimple = (unknownEvent, customConfig) => {
    try {
        const defaultConfig = new interfaces_js_1.ConvertToSpasmSimpleConfig();
        const config = (0, utils_js_1.mergeConvertToSpasmSimpleConfigs)(defaultConfig, customConfig || {});
        if (!unknownEvent)
            return null;
        if (typeof (unknownEvent) === "string") {
            const eventParsed = JSON.parse(unknownEvent);
            if (eventParsed && (0, utils_js_1.isObjectWithValues)(eventParsed)) {
                unknownEvent = eventParsed;
            }
        }
        if (!(0, utils_js_1.isObjectWithValues)(unknownEvent))
            return null;
        if ('type' in unknownEvent &&
            unknownEvent.type === "SpasmSimpleV2") {
            return unknownEvent;
        }
        let spasmEventV2 = null;
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
        if (config.version && config.version === "2.0.0") {
            const SpasmEventSimpleV2 = convertSpasmEventV2ToSpasmSimpleV2(spasmEventV2, config);
            return SpasmEventSimpleV2;
        }
    }
    catch (err) {
        console.error(err);
    }
    return null;
};
exports.convertToSpasmSimple = convertToSpasmSimple;
const convertSpasmEventV2ToSpasmSimpleV2 = (spasmEvent, config) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const limit = config?.limit ?? {};
    const simple = {
        type: "SpasmSimpleV2"
    };
    if (spasmEvent.title && String(spasmEvent.title)) {
        const max = Number(limit.title) || 256;
        simple.title =
            String(spasmEvent.title).slice(0, max);
        const length = String(spasmEvent.title).length || 0;
        if (length > max) {
            simple.title += `... This string is ${length} chars long, so sliced it at ${max} chars.`;
        }
    }
    if (spasmEvent.content && String(spasmEvent.content)) {
        const max = Number(limit.content) || 256;
        simple.content =
            String(spasmEvent.content).slice(0, max);
        const length = String(spasmEvent.content).length || 0;
        if (length > max) {
            simple.content += `... This string is ${length} chars long, so sliced it at ${max} chars.`;
        }
    }
    if (spasmEvent.timestamp && Number(spasmEvent.timestamp)) {
        const max = Number(limit.timestamp) || 30;
        if (String(spasmEvent.timestamp).length < max) {
            simple.timestamp = Number(spasmEvent.timestamp);
        }
    }
    if (spasmEvent.action && String(spasmEvent.action)) {
        const max = Number(limit.action) || 256;
        simple.action =
            String(spasmEvent.action).slice(0, max);
        const length = String(spasmEvent.action).length || 0;
        if (length > max) {
            simple.action += `... This string is ${length} chars long, so sliced it at ${max} chars.`;
        }
    }
    if (spasmEvent.authors && Array.isArray(spasmEvent.authors)) {
        const authors = (0, utils_js_1.getVerifiedSigners)(spasmEvent);
        const authorsString = (0, utils_js_1.flattenArray)(authors);
        if (typeof (authorsString) === "string") {
            simple.authors = authorsString;
        }
    }
    if (spasmEvent.parent) {
        const parentIds = (0, utils_js_1.getAllParentIds)(spasmEvent);
        const parentIdsString = (0, utils_js_1.flattenArray)(parentIds);
        if (typeof (parentIdsString) === "string") {
            simple.parentId = parentIdsString;
        }
    }
    if (spasmEvent.categories &&
        Array.isArray(spasmEvent.categories)) {
        const categories = (0, utils_js_1.getAllCategories)(spasmEvent);
        const categoriesString = (0, utils_js_1.flattenArray)(categories);
        if (typeof (categoriesString) === "string") {
            simple.categories = categoriesString;
        }
    }
    if (spasmEvent.source && "name" in spasmEvent.source &&
        spasmEvent.source.name &&
        typeof (spasmEvent.source.name) === "string") {
        simple.source = spasmEvent.source.name;
    }
    if (spasmEvent.ids && Array.isArray(spasmEvent.ids)) {
        const ids = (0, utils_js_1.getAllEventIds)(spasmEvent);
        const idsString = (0, utils_js_1.flattenArray)(ids);
        if (idsString && typeof (idsString) === "string") {
            simple.ids = idsString;
        }
    }
    if ((0, utils_js_1.isObjectWithValues)(simple))
        return simple;
    return null;
};
//# sourceMappingURL=convertToSpasmSimple.js.map