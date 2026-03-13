"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpasmEventV2ToSpasmEventEnvelopeV2 = exports.convertToSpasmEventEnvelope = exports.convertManyToSpasmEventEnvelope = void 0;
const utils_js_1 = require("../utils/utils.js");
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const convertManyToSpasmEventEnvelope = (unknownEvents, envelopeVersion = "2.0.0") => {
    try {
        if (!unknownEvents)
            return null;
        if (!Array.isArray(unknownEvents))
            return null;
        if (!(0, utils_js_1.hasValue)(unknownEvents))
            return null;
        const convertedEvents = [];
        unknownEvents.forEach(event => {
            const convertedEvent = (0, exports.convertToSpasmEventEnvelope)(event, envelopeVersion);
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
exports.convertManyToSpasmEventEnvelope = convertManyToSpasmEventEnvelope;
// Spasm V2
const convertToSpasmEventEnvelope = (unknownEvent, envelopeVersion = "2.0.0") => {
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
    // Already SpasmEventEnvelopeV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventEnvelopeV2") {
        return unknownEvent;
    }
    // SpasmEventV2
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
    if (envelopeVersion === "2.0.0") {
        const SpasmEventEnvelopeV2 = (0, exports.convertSpasmEventV2ToSpasmEventEnvelopeV2)(spasmEventV2);
        return SpasmEventEnvelopeV2;
    }
    return null;
};
exports.convertToSpasmEventEnvelope = convertToSpasmEventEnvelope;
const convertSpasmEventV2ToSpasmEventEnvelopeV2 = (spasmEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const spasmEventEnvelope = {
        type: "SpasmEventEnvelopeV2"
    };
    if (spasmEvent.ids) {
        spasmEventEnvelope.ids = spasmEvent.ids;
    }
    if (spasmEvent.siblings) {
        spasmEventEnvelope.siblings = spasmEvent.siblings;
    }
    if (spasmEvent.db) {
        spasmEventEnvelope.db = spasmEvent.db;
    }
    if (spasmEvent.source) {
        spasmEventEnvelope.source = spasmEvent.source;
    }
    if (spasmEvent.stats) {
        spasmEventEnvelope.stats = spasmEvent.stats;
    }
    if (spasmEvent.sharedBy) {
        spasmEventEnvelope.sharedBy = spasmEvent.sharedBy;
    }
    /**
     * SpasmEventEnvelopeV2 is used for sending events to other
     * parties, so it includes siblings, which should be used by
     * a receiver in order to verify and sanitize an event by
     * converting an envelope into a Spasm event.
     * Envelope includes fields like `stats` and 'sharedBy',
     * allowing a receiver to display that info for each event.
     * However, envelope doesn't include other events from a
     * family tree such as parent, root, and children, because
     * that data is not needed e.g. when displaying events in a
     * feed with filters.
     * In order to display children (comments), parent, or root
     * events, SpasmEventEnvelopeWithTreeV2 is used.
     */
    return spasmEventEnvelope;
};
exports.convertSpasmEventV2ToSpasmEventEnvelopeV2 = convertSpasmEventV2ToSpasmEventEnvelopeV2;
//# sourceMappingURL=convertToSpasmEventEnvelope.js.map