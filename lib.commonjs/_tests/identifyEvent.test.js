"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identifyEvent_js_1 = require("./../identify/identifyEvent.js");
const _events_data_js_1 = require("./_events-data.js");
describe("default test identifyEvent", () => {
    test("should return true", () => {
        expect(true).toBe(true);
    });
});
/**
 * NOTE:
 * To avoid bloating the code by creating the same objects again
 * and again, we instead predefine various valid events.
 * We then copy an object of one of the valid events into
 * an 'input' object for each test and modify a new 'input'
 * object to cover situations when a wrong data is passed.
 * This approach not only makes the code easier to read, but
 * it also helps us to bypass TypeScript's type check when
 * passing a wrong data into the functions e.g. if we want to
 * receive 'false'.
 * However, some valid objects might have nested objects.
 * In JavaScript it's common to create shallow copies using:
 * let testPost = { ...validPost };
 * let testPost = Object.assign({}, validPost);
 * These methods won't suit us, because a shallow copy means
 * creating a new object and copying over all the properties
 * from the original object. However, if the property value
 * is a reference to another object (like an array or another
 * object), the new object will still hold a reference to the
 * original object, not a copy of it.
 * So, if you modify the nested object in the new object,
 * it will also modify the original object.
 * Thus, we should create a deep copy of an object using
 * JSON.parse and JSON.stringify, e.g.:
 * const input = JSON.parse(JSON.stringify(validDmpEvent));
 */
// hasSignature()
describe("hasSignature() function tests", () => {
    test("should return false if object doesn't contain necessary properties", () => {
        const input = {};
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    test("should return false if signature key is missing", () => {
        const input = { signer: '0x' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    test("should return false if signature key length is empty", () => {
        const input = { signature: '' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    // Signature verification is done in another function during
    // conversion to SpasmEvent, so disabling this test.
    // test("should return false if signature key length is less than 40", () => {
    //   const input = { signature: '0xbd934a01dc3bd9bb183bda807d35e61accf73' };
    //   expect(hasSignature(input)).toBe(false);
    // });
    test("should return true if signature key exists and its length is greater than 40", () => {
        const input = { signature: 'a'.repeat(50) };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return true if signature key exists and its length is greater than 40", () => {
        const input = { signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return false if sig key length is empty", () => {
        const input = { sig: '', id: '' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    // Signature verification is done in another function during
    // conversion to SpasmEvent, so disabling this test.
    // test("should return false if sig key length is less than 40", () => {
    //   const input = { sig: '0xbd934a01dc3bd9bb183bda807d35e61accf73', id: '' };
    //   expect(hasSignature(input)).toBe(false);
    // });
    test("should return true if sig key exists and its length is greater than 40", () => {
        const input = { sig: 'a'.repeat(50), id: '' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return true if sig key exists and its length is greater than 40", () => {
        const input = { sig: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b', id: '' };
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return false if is a valid DmpEvent without signature", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    test("should return true if is a valid DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return true if is a valid DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return false if is a valid NostrEvent without signature", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    test("should return true if is a valid NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    test("should return false if is a valid NostrSpasmEvent without signature", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(false);
    });
    test("should return true if is a valid NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.hasSignature)(input)).toBe(true);
    });
    // Add similar tests for other signature keys ('sig')
});
// identifyLicense()
describe("identifyLicense() function tests", () => {
    test("should return false if no license found", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        delete input.license;
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe(false);
    });
    test("should identify license inside DmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("MIT");
    });
    test("should identify license inside DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("MIT");
    });
    test("should identify license inside DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("MIT");
    });
    test("should return false for NostrEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe(false);
    });
    test("should return false for NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe(false);
    });
    test("should return SPDX CC0 license for NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("SPDX-License-Identifier: CC0-1.0");
    });
    test("should return false for NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("SPDX-License-Identifier: CC0-1.0");
    });
    test("should identify license inside SPASM tags of NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        input.tags.push([
            "license",
            "SPDX-License-Identifier: CC0-1.0"
        ]);
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("SPDX-License-Identifier: CC0-1.0");
    });
    test("should identify license inside SPASM tags of NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.tags.push([
            "license",
            "SPDX-License-Identifier: CC0-1.0"
        ]);
        expect((0, identifyEvent_js_1.identifyLicense)(input)).toBe("SPDX-License-Identifier: CC0-1.0");
    });
});
// isNostrEvent()
// isNostrEventSignedOpened()
// isNostrSpasmEvent()
// isNostrSpasmEventSignedOpened()
describe("isNostrEvent(), isNostrEventSignedOpened(), isNostrSpasmEvent(), isNostrSpasmEventSignedOpened() functions tests", () => {
    // kind
    test("should return false if an object is missing 'kind'", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        delete input.kind;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return false if kind is a string", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.kind = "1";
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return true if an object has a kind 0", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.kind = 0;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    test("should return true if an object has a kind 1", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.kind = 1;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    // created_at
    test("should return false if an object is missing 'created_at'", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        delete input.created_at;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return false if created_at is a string", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.created_at = "1673347337",
            expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return true if an object has created_at 0", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.created_at = 0;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    test("should return true if an object has a normal created_at", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    // pubkey
    // test("should return false if an object is missing 'pubkey'", () => {
    // Nostr event without pubkey should still be identified as Nostr event,
    // e.g., if we want to convert spasmBody to Nostr and then attach pubkey.
    test("should return true if an object is missing 'pubkey'", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        delete input.pubkey;
        // expect(isNostrEvent(input)).toBe(false);
        // expect(isNostrSpasmEvent(input)).toBe(false);
        // expect(isNostrEventSignedOpened(input)).toBe(false);
        // expect(isNostrSpasmEventSignedOpened(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    test("should return false if pubkey is a number", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.pubkey = 1337;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return true if an object has a normal pubkey", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    // content
    test("should return false if an object is missing 'content'", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        delete input.content;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return false if content is a number", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.content = 1337;
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(false);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(false);
    });
    test("should return true if an object has content '0' (string)", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        input.content = "0";
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    test("should return true if an object has a normal content", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
    // valid event
    test("should return true if an object is a valid Nostr event", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, identifyEvent_js_1.isNostrEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEvent)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrEventSignedOpened)(input)).toBe(true);
        expect((0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(input)).toBe(true);
    });
});
// identifyPostOrEvent() for DMP events
describe("identifyPostOrEvent() tests for DMP events", () => {
    test("should identify DmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        const output = {
            eventInfo: {
                baseProtocol: "dmp",
                hasExtraSpasmFields: false,
                hasSignature: false,
                isSpasmCompatible: true,
                license: "MIT",
                privateKeyType: false,
                type: "DmpEvent"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
    test("should identify DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        // TODO:
        // should 'signedString' also return eventInfo.eventIsSealed?
        // should eventInfo.eventIsSealedUnderKeyName be 'signedString'?
        const output = {
            eventInfo: {
                baseProtocol: "dmp",
                hasExtraSpasmFields: false,
                hasSignature: true,
                isSpasmCompatible: true,
                license: "MIT",
                privateKeyType: "ethereum",
                type: "DmpEventSignedClosed"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
    test("should identify DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const output = {
            eventInfo: {
                baseProtocol: "dmp",
                hasExtraSpasmFields: false,
                hasSignature: true,
                isSpasmCompatible: true,
                license: "MIT",
                privateKeyType: "ethereum",
                type: "DmpEventSignedOpened"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
});
// identifyPostOrEvent() for Posts with DMP events
describe("identifyPostOrEvent() tests for Posts with DMP events", () => {
    test("should identify a Post with DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosed));
        const output = {
            eventInfo: {
                baseProtocol: "dmp",
                hasExtraSpasmFields: false,
                hasSignature: true,
                isSpasmCompatible: true,
                license: "MIT",
                privateKeyType: "ethereum",
                type: "DmpEventSignedClosed"
            },
            eventIsSealed: true,
            eventIsSealedUnderKeyName: "signed_message",
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
});
// identifyPostOrEvent() for Nostr events
describe("identifyPostOrEvent() tests for Nostr events", () => {
    test("should identify NostrEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        const output = {
            eventInfo: {
                baseProtocol: "nostr",
                hasExtraSpasmFields: false,
                hasSignature: false,
                isSpasmCompatible: false,
                license: false,
                privateKeyType: false,
                type: "NostrEvent"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
    test("should identify NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const output = {
            eventInfo: {
                baseProtocol: "nostr",
                hasExtraSpasmFields: false,
                hasSignature: true,
                isSpasmCompatible: false,
                license: false,
                privateKeyType: "nostr",
                type: "NostrEventSignedOpened"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
    test("should identify NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        const output = {
            eventInfo: {
                baseProtocol: "nostr",
                hasExtraSpasmFields: true,
                hasSignature: false,
                isSpasmCompatible: true,
                license: "SPDX-License-Identifier: CC0-1.0",
                privateKeyType: false,
                type: "NostrSpasmEvent"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
    test("should identify NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const output = {
            eventInfo: {
                baseProtocol: "nostr",
                hasExtraSpasmFields: true,
                hasSignature: true,
                isSpasmCompatible: true,
                license: "SPDX-License-Identifier: CC0-1.0",
                privateKeyType: "nostr",
                type: "NostrSpasmEventSignedOpened"
            },
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
});
// identifyPostOrEvent() for Posts with Nostr events
describe("identifyPostOrEvent() tests for Posts with Nostr events", () => {
    test("should identify a Post with NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithNostrSpasmEventSignedOpened));
        const output = {
            eventInfo: {
                baseProtocol: "nostr",
                hasExtraSpasmFields: true,
                hasSignature: true,
                isSpasmCompatible: true,
                license: "SPDX-License-Identifier: CC0-1.0",
                privateKeyType: "nostr",
                type: "NostrSpasmEventSignedOpened"
            },
            eventIsSealed: true,
            eventIsSealedUnderKeyName: "signed_message",
            webType: "web3"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
});
// identifyPostOrEvent() for Posts with RSS item
describe("identifyPostOrEvent() tests for Posts with Nostr events", () => {
    test("should identify a Post with NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithRssItem));
        const output = {
            eventInfo: false,
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            webType: "web2"
        };
        expect((0, identifyEvent_js_1.identifyPostOrEvent)(input)).toEqual(output);
    });
});
//# sourceMappingURL=identifyEvent.test.js.map