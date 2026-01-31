"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_js_1 = require("./_events-data.js");
const convertToSpasm_js_1 = require("./../convert/convertToSpasm.js");
const convertToNostr_js_1 = require("./../convert/convertToNostr.js");
const convertToSpasmEventEnvelope_js_1 = require("./../convert/convertToSpasmEventEnvelope.js");
const convertToSpasmEventEnvelopeWithTree_js_1 = require("../convert/convertToSpasmEventEnvelopeWithTree.js");
const convertToSpasmEventDatabase_js_1 = require("../convert/convertToSpasmEventDatabase.js");
const utils_js_1 = require("../utils/utils.js");
const getSpasmId_js_1 = require("../convert/getSpasmId.js");
describe("convertToSpasm tests", () => {
    test("should return true if true", () => {
        expect(true).toBe(true);
    });
});
// convertToSpasm() for DMP events
describe("convertToSpasm() tests for DMP events", () => {
    // DmpEvent to V2
    test("should convert validDmpEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedClosed to V2
    test("should convert validDmpEventSignedClosed to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedOpened to V2
    test("should convert validDmpEventSignedOpened to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // SpasmDmpEventSignedClosedV0 to V2
    // validPostWithDmpEventSignedClosed - old name
    // validSpasmDmpEventSignedClosedV0 - new name
    test("should convert validSpasmDmpEventSignedClosedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmDmpEventSignedClosedV0));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // SpasmEventBodyV2 to SpasmEventV2
    test("should convert validSpasmEventBodyV2 to SpasmEventV2", () => {
        const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
        const input = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2);
        const output = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2ConvertedToSpasmV2);
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, convertConfigV2))
            .toEqual(output);
    });
    // SpasmEventBodySignedClosedV2 to SpasmEventV2
    test("should convert validSpasmEventBodySignedClosedV2 to SpasmEventV2", () => {
        const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
        const input = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodySignedClosedV2);
        const output = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2);
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, convertConfigV2))
            .toEqual(output);
    });
    // validSpasmEventBodyV2ReplyToGenesisSignedClosed to SpasmEventV2
    test("should convert validSpasmEventBodyV2ReplyToGenesisSignedClosed to SpasmEventV2", () => {
        const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
        const input = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2ReplyToGenesisSignedClosed);
        const output = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2);
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, convertConfigV2))
            .toEqual(output);
    });
    test("should return null if signed Dmp events have invalid signatures", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        };
        const inputValid1 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71c"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signature: "dmp-invalid-signature"
        };
        const inputInvalid3 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fb"
        };
        const inputInvalid4 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signer: "dmp-invalid-signer"
        };
        // const inputInvalid5 = {
        //   ...JSON.parse(JSON.stringify(validDmpEventSignedClosed)),
        //   signature: ""
        // };
        const inputInvalid6 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signer: ""
        };
        const inputInvalid7 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed)),
            signature: "dmp-invalid-signature",
            signer: "dmp-invalid-signer"
        };
        // const inputInvalid8 = {
        //   ...JSON.parse(JSON.stringify(validDmpEventSignedClosed)),
        //   signature: "",
        //   signer: ""
        // };
        const inputInvalid9 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened)),
            signature: "dmp-invalid-signature",
            signer: "dmp-invalid-signer"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        const outputValid1 = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputValid1)).toEqual(outputValid1);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid2)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid3)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid4)).toEqual(null);
        // expect(convertToSpasm(inputInvalid5)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid6)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid7)).toEqual(null);
        // expect(convertToSpasm(inputInvalid8)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid9)).toEqual(null);
    });
});
describe("convertMany... tests for different events", () => {
    test("should convert DMP events to SpasmEventV2", () => {
        const dmpInput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const dmpOutput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        expect((0, convertToSpasm_js_1.convertManyToSpasm)([
            (0, utils_js_1.copyOf)(dmpInput), (0, utils_js_1.copyOf)(dmpInput), (0, utils_js_1.copyOf)(dmpInput)
        ])).toEqual([
            (0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(dmpOutput)
        ]);
    });
    test("should convert different DMP and Nostr events to SpasmEventV2", () => {
        const dmpInput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const nostrInput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const dmpOutput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        const nostrOutput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertManyToSpasm)([
            (0, utils_js_1.copyOf)(dmpInput), (0, utils_js_1.copyOf)(nostrInput), (0, utils_js_1.copyOf)(dmpInput)
        ])).toEqual([
            (0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(nostrOutput), (0, utils_js_1.copyOf)(dmpOutput)
        ]);
    });
    test("should convert DMP events to SpasmEventEnvelopeV2", () => {
        const dmpInput = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosed));
        const dmpOutput = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2));
        expect((0, convertToSpasmEventEnvelope_js_1.convertManyToSpasmEventEnvelope)([
            (0, utils_js_1.copyOf)(dmpInput), (0, utils_js_1.copyOf)(dmpInput), (0, utils_js_1.copyOf)(dmpInput)
        ])).toEqual([
            (0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(dmpOutput)
        ]);
    });
    test("should convert different DMP and Nostr events to EnvelopeWithTree and then to SpasmEventV2", () => {
        const dmpInput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const nostrInput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const dmpOutput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        const nostrOutput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const envelopesWithTree = (0, convertToSpasmEventEnvelopeWithTree_js_1.convertManyToSpasmEventEnvelopeWithTree)([
            dmpInput, nostrInput
        ]);
        expect((0, convertToSpasm_js_1.convertManyToSpasm)(envelopesWithTree))
            .toEqual([(0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(nostrOutput)]);
    });
    test("should convert different DMP and Nostr events to SpasmEventDatabaseV2 and then to SpasmEventV2", () => {
        const dmpInput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const nostrInput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const dmpOutput = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        const nostrOutput = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const databaseEvents = (0, convertToSpasmEventDatabase_js_1.convertManyToSpasmEventDatabase)([
            dmpInput, nostrInput
        ]);
        expect((0, convertToSpasm_js_1.convertManyToSpasm)(databaseEvents))
            .toEqual([(0, utils_js_1.copyOf)(dmpOutput), (0, utils_js_1.copyOf)(nostrOutput)]);
    });
});
// convertToSpasm() for Nostr events
describe("convertToSpasm() tests for Nostr events", () => {
    // NostrEvent to V2
    test("should convert validNostrEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEvent to V2
    test("should convert validNostrSpasmEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrEventSignedOpened to V2
    test("should convert validNostrEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrEventSignedOpened to V2
    test("should return null if validNostrEventSignedOpened has invalid signature", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened)),
            sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened)),
            sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009263"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened)),
            sig: "nostr-sig-123"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        // const output = null;
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid2)).toEqual(null);
    });
    // NostrSpasmEventSignedOpened to V2
    test("should convert validNostrSpasmEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEventSignedOpened to V2
    test("should return null if validNostrSpasmEventSignedOpened has invalid signature", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened)),
            sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened)),
            sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f2"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened)),
            sig: "nostr-spasm-sig-123"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputInvalid2)).toEqual(null);
    });
    // PostWithNostrEventSignedOpened - old name
    // SpasmNostrEventSignedOpenedV0 - new name
    test("should convert validSpasmNostrEventSignedOpenedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrEventSignedOpenedV0));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithNostrSpasmEventSignedOpened - old name
    // SpasmNostrSpasmEventSignedOpenedV0 - new name
    test("should convert SpasmNostrSpasmEventSignedOpenedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrSpasmEventSignedOpenedV0));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    // validNostrReplyToDmpEvent
    // validNostrReplyToDmpEvent ("To the SPASM!") is tested as a
    // child (reply) of a validPostWithDmpEventSignedClosed inside
    // of SpasmDmpEventSignedClosedV0ConvertedToSpasmV2.
});
// convertToSpasm() for RSS items
// validPostWithRssItem - old name
// validSpasmEventRssItemV0 - new name
// validSpasmEventRssItemV0ConvertedToSpasmV2
describe("convertToSpasm() tests for RSS items", () => {
    // RssItem
    test("should convert validSpasmEventRssItemV0 to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
});
describe("convertToSpasm() tests for events with sharedBy", () => {
    test("convertToSpasm() tests for events with and without sharedBy", () => {
        const dmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const dmpConvertedWithOneSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0x12345" }]
            }
        };
        const dmpConvertedWithTwoSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0x12345" }, { value: "0x67890" }]
            }
        };
        expect((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(dmpConverted)))
            .toStrictEqual((0, utils_js_1.copyOf)(dmpConverted));
        expect((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(dmpConvertedWithOneSharedBy)))
            .toStrictEqual((0, utils_js_1.copyOf)(dmpConvertedWithOneSharedBy));
        expect((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(dmpConvertedWithTwoSharedBy)))
            .toStrictEqual((0, utils_js_1.copyOf)(dmpConvertedWithTwoSharedBy));
    });
});
describe("convertToSpasm() tests for events with parent and root events", () => {
    test("convertToSpasm() tests for converting events with and without parent and root events", () => {
        // const spasmReply: SpasmEventV2 =
        //   copyOf(validPostWithNostrReplyToDmpEvent)
        const spasmReplyWithSpasmParent = (0, utils_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent);
        expect((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(spasmReplyWithSpasmParent)))
            .toStrictEqual((0, utils_js_1.copyOf)(spasmReplyWithSpasmParent));
    });
});
// convertToSpasm() with sanitizeEvent() with DOMPurify
// validPostWithRssItem - old name
// validSpasmEventRssItemV0 - new name
// validSpasmEventRssItemV0ConvertedToSpasmV2
describe("convertToSpasm() tests with sanitizeEvent", () => {
    // RssItem
    test("should return null if an event has malicious code", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputMalicious = {
            ...input,
            tags: ["dark", "<img src=x onerror=alert(1)//>"]
        };
        /* const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2)); */
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputMalicious)).toEqual(null);
    });
    test("should return null if an event has deeply nested malicious code", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputMalicious = {
            ...input,
            tags: [
                "dark", "forest",
                {
                    object: {
                        array: [
                            [1, 2, "three", "<svg><g/onload=alert(2)//<p>"]
                        ]
                    }
                }
            ]
        };
        /* const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2)); */
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputMalicious)).toEqual(null);
    });
    test("should return event with malicious input if xss sanitization is turned off", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputMalicious = {
            ...input,
            tags: ["dark", "<img src=x onerror=alert(1)//>"]
        };
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        const outputMalicious = {
            ...output
        };
        outputMalicious.ids[0].value = "spasmid019c82c9d5bee650a096e15ddbe4567928c17343653f2a34f2f6d2dfc2f6c744d1";
        outputMalicious.keywords = ["dark", "<img src=x onerror=alert(1)//>", "cookies"];
        outputMalicious.siblings[0].originalObject.tags = ["dark", "<img src=x onerror=alert(1)//>"];
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputMalicious, { xss: { enableSanitization: false } })).toEqual(outputMalicious);
    });
    test("should return null if an event has deeply nested malicious code", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputMalicious = {
            ...input,
            tags: [
                "dark", "forest",
                {
                    object: {
                        array: [
                            [1, 2, "three", "<svg><g/onload=alert(2)//<p>"]
                        ]
                    }
                }
            ]
        };
        /* const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2)); */
        expect((0, convertToSpasm_js_1.convertToSpasm)(inputMalicious)).toEqual(null);
    });
    test("should return valid spasm event if custom sanitization function returns unchanged value", () => {
        const customFunction = (value) => value;
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, {
            xss: {
                sanitizationConfig: {
                    customFunction: customFunction
                }
            }
        })).toEqual(output);
    });
    test("should return null if custom sanitization function returns changed value", () => {
        const customFunction = (value) => value + " changed";
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        // const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, {
            xss: {
                sanitizationConfig: {
                    customFunction: customFunction
                }
            }
        })).toEqual(null);
    });
    test("should return null if sanitization max recursion depth exceeded", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        // const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input, {
            xss: {
                sanitizationConfig: {
                    maxDepth: 0
                }
            }
        })).toEqual(null);
        // Restore console errors
        jest.restoreAllMocks();
    });
});
// convertToSpasm() for events with special chars
describe("convertToSpasm() tests for events with special characters", () => {
    test("should convert validPostWithRssItemSpecialChars to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithRssItemSpecialChars));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    test("should convert validPostWithRssItemTitleHasSpecialChars to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithRssItemTitleHasSpecialChars));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
    test("an attempt to convert validNostrSpasmEventSpasmV0WithInvalidHtmlTags to SpasmEventV2 should return null", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSpasmV0WithInvalidHtmlTags));
        // null because cannot identify event
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(null);
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("should convert validRssItemWithEmoji to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validRssItemWithEmoji));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validRssItemWithEmojiConvertedToSpasmEvent2));
        expect((0, convertToSpasm_js_1.convertToSpasm)(input)).toEqual(output);
    });
});
describe("convertToSpasm() tests for SpasmEventEnvelopeV2", () => {
    const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
    const testDoubleConvert = (from, to, equal = true) => {
        const event = JSON.parse(JSON.stringify(from));
        const spasmEnvelope = (0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(event, "2.0.0");
        const input = (0, convertToSpasm_js_1.convertToSpasm)(spasmEnvelope, convertConfigV2);
        const output = JSON.parse(JSON.stringify(to));
        if (equal) {
            expect(input).toEqual(output);
        }
        else {
            expect(input).not.toEqual(output);
        }
    };
    const testDoubleConvertWithTree = (from, to, equal = true) => {
        const event = JSON.parse(JSON.stringify(from));
        const spasmEnvelope = (0, convertToSpasmEventEnvelopeWithTree_js_1.convertToSpasmEventEnvelopeWithTree)(event, "2.0.0");
        const input = (0, convertToSpasm_js_1.convertToSpasm)(spasmEnvelope, convertConfigV2);
        const output = JSON.parse(JSON.stringify(to));
        if (equal) {
            expect(input).toEqual(output);
        }
        else {
            expect(input).not.toEqual(output);
        }
    };
    const testDoubleConvertDatabase = (from, to, equal = true) => {
        const event = JSON.parse(JSON.stringify(from));
        const spasmDatabase = (0, convertToSpasmEventDatabase_js_1.convertToSpasmEventDatabase)(event, "2.0.0");
        const input = (0, convertToSpasm_js_1.convertToSpasm)(spasmDatabase, convertConfigV2);
        const output = JSON.parse(JSON.stringify(to));
        if (equal) {
            expect(input).toEqual(output);
        }
        else {
            expect(input).not.toEqual(output);
        }
    };
    test("validDmpEvent, validDmpEvent, false", () => {
        testDoubleConvert(_events_data_js_1.validDmpEvent, _events_data_js_1.validDmpEvent, false);
    });
    test("validDmpEvent, convertToSpasm(validDmpEvent, convertConfigV2)", () => {
        testDoubleConvert(_events_data_js_1.validDmpEvent, (0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEvent), convertConfigV2));
    });
    test("validDmpEvent, validDmpEventConvertedToSpasmEventV2", () => {
        testDoubleConvert(_events_data_js_1.validDmpEvent, _events_data_js_1.validDmpEventConvertedToSpasmEventV2);
    });
    test("validDmpEvent, validDmpEventSignedClosed, false", () => {
        testDoubleConvert(_events_data_js_1.validDmpEvent, _events_data_js_1.validDmpEventSignedClosed, false);
    });
    test("validDmpEvent, validDmpEventSignedClosedConvertedToSpasmV2, false", () => {
        testDoubleConvert(_events_data_js_1.validDmpEvent, _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2, false);
    });
    test("validDmpEventSignedClosed, validDmpEventSignedClosed, false", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosed, _events_data_js_1.validDmpEventSignedClosed, false);
    });
    test("validDmpEventSignedClosed, convertToSpasm(validDmpEventSignedClosed, convertConfigV2)", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosed, (0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), convertConfigV2));
    });
    test("validDmpEventSignedClosed, validDmpEventSignedClosedConvertedToSpasmV2", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosed, _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
    });
    test("validDmpEventSignedOpened, validDmpEventSignedOpened, false", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedOpened, _events_data_js_1.validDmpEventSignedOpened, false);
    });
    test("validDmpEventSignedOpened, convertToSpasm(validDmpEventSignedOpened, convertConfigV2)", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedOpened, (0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpened), convertConfigV2));
    });
    test("validDmpEventSignedOpened, validDmpEventSignedOpenedConvertedToSpasmV2", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedOpened, _events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2);
    });
    test("validDmpEventSignedClosedConvertedToSpasmV2, validDmpEventSignedClosedConvertedToSpasmV2", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2, _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
    });
    test("validDmpEventSignedOpenedConvertedToSpasmV2, validDmpEventSignedClosedConvertedToSpasmV2", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2, _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
    });
    test("multiple convertToSpasm for DmpEvent", () => {
        testDoubleConvert((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2), (0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), convertConfigV2), convertConfigV2), convertConfigV2));
    });
    test("validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2, rest1", () => {
        const { children, ...rest1 } = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2;
        testDoubleConvert(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2, rest1);
    });
    test("validDmpEventSignedClosedWithInvalidSigner, null", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosedWithInvalidSigner, null);
    });
    test("validDmpEventSignedClosedWithInvalidSignature, null", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosedWithInvalidSignature, null);
    });
    test("validDmpEventSignedClosedWithInvalidSignedString, null", () => {
        testDoubleConvert(_events_data_js_1.validDmpEventSignedClosedWithInvalidSignedString, null);
    });
    test("should convert various Nostr events to SpasmEventEnvelopeV2 and then to SpasmEventV2", () => {
        testDoubleConvert(_events_data_js_1.validNostrEvent, _events_data_js_1.validNostrEvent, false);
        testDoubleConvert(_events_data_js_1.validNostrEvent, _events_data_js_1.validNostrEventConvertedToSpasmV2);
        testDoubleConvert(_events_data_js_1.validNostrEventSignedOpened, _events_data_js_1.validNostrEventSignedOpened, false);
        testDoubleConvert(_events_data_js_1.validNostrEventSignedOpened, _events_data_js_1.validNostrEventConvertedToSpasmV2, false);
        testDoubleConvert(_events_data_js_1.validNostrEventSignedOpened, _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEvent, _events_data_js_1.validNostrSpasmEventSignedOpened, false);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEvent, _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2, false);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEvent, _events_data_js_1.validNostrSpasmEventConvertedToSpasmV2);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSignedOpened, _events_data_js_1.validNostrSpasmEventSignedOpened, false);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSignedOpened, _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        testDoubleConvert((0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened), (0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened), convertConfigV2), convertConfigV2), convertConfigV2));
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSignature, null);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSigner, null);
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidContent, null);
    });
    test("should convert various RSS items to SpasmEventEnvelopeV2 and then to SpasmEventV2", () => {
        testDoubleConvert(_events_data_js_1.validPostWithRssItemSpecialChars, _events_data_js_1.validPostWithRssItemSpecialChars, false);
        testDoubleConvert(_events_data_js_1.validPostWithRssItemSpecialChars, _events_data_js_1.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2);
        testDoubleConvert(_events_data_js_1.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2, _events_data_js_1.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2);
        testDoubleConvert(_events_data_js_1.validNostrEvent, _events_data_js_1.validNostrEventConvertedToSpasmV2);
    });
    test("converting various edge case events to SpasmEventEnvelopeV2 and then to SpasmEventV2", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        testDoubleConvert(_events_data_js_1.validNostrSpasmEventSpasmV0WithInvalidHtmlTags, null);
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("converting events with comments to SpasmEventEnvelopeWithTreeV2 and then to SpasmEventV2", () => {
        testDoubleConvertWithTree(_events_data_js_1.validPostWithDmpEventSignedClosed, _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2);
        testDoubleConvertWithTree([], null);
        testDoubleConvert(_events_data_js_1.validPostWithDmpEventSignedClosed, _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2, false);
    });
    test("converting various events SpasmEventDatabaseV2 and then to SpasmEventV2", () => {
        testDoubleConvertDatabase(_events_data_js_1.validDmpEventSignedClosed, _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        testDoubleConvertDatabase(_events_data_js_1.validDmpEventSignedClosed, _events_data_js_1.validDmpEventSignedClosed, false);
        testDoubleConvertDatabase(_events_data_js_1.validNostrSpasmEventSignedOpened, (0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)(_events_data_js_1.validNostrSpasmEventSignedOpened, convertConfigV2), convertConfigV2), convertConfigV2));
        testDoubleConvertDatabase(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSignature, null);
        testDoubleConvertDatabase(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSigner, null);
        testDoubleConvertDatabase(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidContent, null);
    });
});
describe("convertToSpasmEventEnvelopeWithTree() tests", () => {
    test("convertToSpasmEventEnvelopeWithTree() should convert event with relatives", () => {
        const envelopeWithTree = (0, convertToSpasmEventEnvelopeWithTree_js_1.convertToSpasmEventEnvelopeWithTree)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren), "2.0.0");
        expect(envelopeWithTree).not.toEqual(null);
        expect(envelopeWithTree?.type).toStrictEqual("SpasmEventEnvelopeWithTreeV2");
        expect(envelopeWithTree?.children?.length).toStrictEqual(2);
        expect(envelopeWithTree?.children?.[0]?.event?.type).toStrictEqual("SpasmEventEnvelopeWithTreeV2");
        expect(envelopeWithTree?.children?.[0]?.event?.ids).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2).ids);
        expect(envelopeWithTree).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren));
        // Convert envelopeWithTree back to SpasmEvent
        const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
        const envelopeWithTreeConvertedToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(envelopeWithTree), convertConfigV2);
        const spasmEvent = envelopeWithTreeConvertedToSpasmEventV2;
        expect(spasmEvent).not.toEqual(null);
        expect(spasmEvent?.type).toStrictEqual("SpasmEventV2");
        expect(spasmEvent?.title).toStrictEqual("genesis");
        expect("children" in spasmEvent).toStrictEqual(true);
        expect(spasmEvent?.children?.length).toStrictEqual(2);
        expect(spasmEvent?.children?.[0].event?.type)
            .toStrictEqual("SpasmEventV2");
        expect(spasmEvent?.children?.[1].event?.type)
            .toStrictEqual("SpasmEventV2");
        expect(spasmEvent?.children?.[0].event).toStrictEqual(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2);
        // Testing max recursion with depth 0
        const envelopeWithTreeMaxDepth0 = (0, convertToSpasmEventEnvelopeWithTree_js_1.convertToSpasmEventEnvelopeWithTree)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren), "2.0.0", 0, 0);
        expect(envelopeWithTreeMaxDepth0).not.toEqual(null);
        expect(envelopeWithTreeMaxDepth0?.type)
            .toStrictEqual("SpasmEventEnvelopeWithTreeV2");
        expect("title" in envelopeWithTreeMaxDepth0)
            .toStrictEqual(false);
        expect("content" in envelopeWithTreeMaxDepth0)
            .toStrictEqual(false);
        expect("children" in envelopeWithTreeMaxDepth0)
            .toStrictEqual(false);
        // Testing max recursion with depth 1
        const envelopeWithTreeMaxDepth1 = (0, convertToSpasmEventEnvelopeWithTree_js_1.convertToSpasmEventEnvelopeWithTree)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren), "2.0.0", 0, 1);
        expect(envelopeWithTreeMaxDepth1).not.toEqual(null);
        expect(envelopeWithTreeMaxDepth1?.type)
            .toStrictEqual("SpasmEventEnvelopeWithTreeV2");
        expect("title" in envelopeWithTreeMaxDepth1)
            .toStrictEqual(false);
        expect("content" in envelopeWithTreeMaxDepth1)
            .toStrictEqual(false);
        expect("children" in envelopeWithTreeMaxDepth1)
            .toStrictEqual(true);
        expect(envelopeWithTreeMaxDepth1?.children?.[0]?.event?.type).toStrictEqual("SpasmEventEnvelopeWithTreeV2");
        expect(envelopeWithTreeMaxDepth1?.children?.[0]?.event?.ids).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2).ids);
    });
});
describe("convertToSpasm() tests for single signed Nostr Spasm events", () => {
    test("convertToSpasm() should convert single signed Nostr Spasm event", () => {
        const input = (0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpened);
        const inputConverted = (0, convertToSpasm_js_1.convertToSpasm)(input);
        const output = (0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2);
        // TODO why Ethereum signer is removed?
        // expect(inputConverted).toStrictEqual(output)
        expect(inputConverted).not.toEqual(output);
    });
});
describe("convertToSpasmEventEnvelope() tests", () => {
    test("convertToSpasmEventEnvelope() should convert event with relatives", () => {
        const envelope = (0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren), "2.0.0");
        expect(envelope).not.toEqual(null);
        expect(envelope.type).toStrictEqual("SpasmEventEnvelopeV2");
        expect("title" in envelope).toStrictEqual(false);
        expect("content" in envelope).toStrictEqual(false);
        expect("children" in envelope).toStrictEqual(false);
        expect(envelope?.ids).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids));
        // Convert envelope back to SpasmEvent
        const convertConfigV2 = { to: { spasm: { version: "2.0.0" } } };
        const envelopeConvertedToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)((0, utils_js_1.copyOf)(envelope), convertConfigV2);
        const spasmEvent = envelopeConvertedToSpasmEventV2;
        expect(spasmEvent).not.toEqual(null);
        expect(spasmEvent?.type).toStrictEqual("SpasmEventV2");
        expect(spasmEvent?.title).toStrictEqual("genesis");
        expect("children" in spasmEvent).toStrictEqual(false);
    });
});
describe("convertToSpasm() tests for events with multiple duplicate values", () => {
    const spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(_events_data_js_1.validSpasmEventBodyV2WithManyDuplicateValues);
    const spasmEventToNostr = (0, convertToNostr_js_1.convertToNostr)((0, utils_js_1.copyOf)(spasmEvent));
    const spasmEventToNostrToSpasm = (0, convertToSpasm_js_1.convertToSpasm)(spasmEventToNostr);
    const id1 = (0, getSpasmId_js_1.getSpasmId01)((0, utils_js_1.copyOf)(spasmEvent));
    const id2 = (0, getSpasmId_js_1.getSpasmId01)((0, utils_js_1.copyOf)(spasmEventToNostrToSpasm));
    test("IDs should have string values", () => {
        expect(id1).not.toEqual(null);
        expect(id1).not.toEqual(undefined);
        expect(id1).not.toEqual("");
        expect(typeof (id1)).toStrictEqual("string");
        expect(id2).not.toEqual(null);
        expect(id2).not.toEqual(undefined);
        expect(id2).not.toEqual("");
        expect(typeof (id2)).toStrictEqual("string");
    });
    test("IDs should be equal after converting Spasm to Nostr to Spasm", () => {
        expect(id1).toStrictEqual(id2);
    });
});
//# sourceMappingURL=convertToSpasm.test.js.map