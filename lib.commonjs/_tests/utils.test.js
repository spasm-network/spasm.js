"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToSpasm_js_1 = require("../convert/convertToSpasm.js");
const interfaces_js_1 = require("../types/interfaces.js");
const index_js_1 = require("./../utils/index.js");
const _events_data_js_1 = require("./_events-data.js");
const _events_data_js_2 = require("./_events-data.js");
// template()
describe("template() function tests", () => {
    test("template() should return true if true", () => {
        const input = true;
        const output = true;
        expect(input).toStrictEqual(output);
    });
});
// isObjectWithValues()
describe("isObjectWithValues() function tests", () => {
    test("should return false if object is empty", () => {
        const input = {};
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(false);
    });
    test("should return true if has a valid DmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithDmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosed));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithNostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithNostrSpasmEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return false if event is a string", () => {
        const input = JSON.stringify(_events_data_js_1.validNostrEventSignedOpened);
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(false);
    });
    test("should return false if input is not an object", () => {
        expect((0, index_js_1.isObjectWithValues)('')).toBe(false);
        expect((0, index_js_1.isObjectWithValues)('abc')).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(null)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(undefined)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(0)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(123)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(true)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)(false)).toBe(false);
        expect((0, index_js_1.isObjectWithValues)([1, 2, 3])).toBe(false);
    });
});
// isArrayOfStringsOrNumbers
describe("isArrayOfStringsOrNumbers() function tests", () => {
    test("should return false if input is null", () => {
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(null)).toBe(false);
    });
    test("should return false if input array has null value", () => {
        const input = [null, 1];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
    test("should return true if input array has only numbers", () => {
        const input = [1, 2, 3];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return true if input array has only strings", () => {
        const input = ["one", "2", "null"];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return true if input array has only strings and numbers", () => {
        const input = ["one", 2, "null"];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return false if input array has strings, numbers, and null", () => {
        const input = ["one", 2, null];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
    test("should return false if input array has no values", () => {
        const input = [];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
    test("should return false if input is not an array", () => {
        expect((0, index_js_1.isArrayOfStringsOrNumbers)('')).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)('abc')).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(null)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(undefined)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(0)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(123)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(true)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(false)).toBe(false);
        expect((0, index_js_1.isArrayOfStringsOrNumbers)({ a: 1, b: 2 })).toBe(false);
    });
});
// ifArraysHaveCommonId
describe("ifArraysHaveCommonId() function tests", () => {
    test("should return false if inputs are empty arrays", () => {
        const input1 = [];
        const input2 = [];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input is empty array", () => {
        const input1 = [1, 2, 3];
        const input2 = [];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input is empty array", () => {
        const input1 = [];
        const input2 = ["one", 2];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if inputs have no common values", () => {
        const input1 = [1, 2, 3];
        const input2 = [4];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has an object as value", () => {
        const input1 = [1, 2, "four", {}];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has an array as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", []];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has null as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", null];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has undefined as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", undefined];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return true if inputs a common value number", () => {
        const input1 = [1, 2, 3];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
    test("should return true if inputs a common value string", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
    test("should return true if inputs have same values", () => {
        const input1 = [1, 2, "four"];
        const input2 = [1, 2, "four"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
    test("should return false if one input is not an array", () => {
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(null))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(''))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)('1'))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(false))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(true))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(0))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)(123))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)([1], (0, index_js_1.fakeAsArray)({ a: 1 }))).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(null), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(''), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)('1'), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(false), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(true), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(0), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)(123), [1])).toBe(false);
        expect((0, index_js_1.ifArraysHaveCommonId)((0, index_js_1.fakeAsArray)({ a: 1 }), [1])).toBe(false);
    });
});
// isValidUrl
describe("isValidUrl() function tests", () => {
    test("should return true if URL is valid, else false", () => {
        expect((0, index_js_1.isValidUrl)(false)).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)(null)).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)(123)).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)(0)).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)([1])).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)({ url: 'https://spasm.network' })).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)('hellow world')).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)('degenrocket.space')).toStrictEqual(false);
        expect((0, index_js_1.isValidUrl)('ftp://degenrocket.space')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://degenrocket.space')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://forum.spasm.network')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://one.two.three.four.com')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://thedefiant.io')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://thedefiant.io/news/123')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('https://monero.observer')).toStrictEqual(true);
        expect((0, index_js_1.isValidUrl)('mailto:monero.observer')).toStrictEqual(true);
        // TODO URL inside array returns true. Is it safe to change that?
        // expect(isValidUrl(['https://spasm.network'])).toStrictEqual(false)
    });
});
// getFormatFromId
describe("getFormatFromId() function tests", () => {
    test("should return proper format", () => {
        // const input = {};
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId0Spasmid01)).toStrictEqual({
            name: "spasmid",
            version: "01"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value)).toStrictEqual({
            name: "spasmid",
            version: "01"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value)).toStrictEqual({
            name: "ethereum-sig",
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[0].value)).toStrictEqual({
            name: "spasmid",
            version: "01"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[1].value)).toStrictEqual({
            name: "url"
        });
    });
    test("should return null if cannot identify format", () => {
        expect((0, index_js_1.getFormatFromId)('')).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)(null))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)(0))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)(true))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)(false))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)([1]))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromId)((0, index_js_1.fakeAsString)({ a: 1 }))).toStrictEqual(null);
    });
});
// getFormatFromAddress
describe("getFormatFromAddress() function tests", () => {
    test("should return proper format", () => {
        // getFormatFromAddress
        expect((0, index_js_1.getFormatFromAddress)(_events_data_js_2.validNpubAddress1)).toStrictEqual({
            name: "nostr-npub"
        });
        expect((0, index_js_1.getFormatFromAddress)(_events_data_js_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)('abc'))).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)(123))).toStrictEqual({
            name: "number"
        });
    });
    test("should return null if cannot identify format", () => {
        expect((0, index_js_1.getFormatFromAddress)('')).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)(null))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)(0))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)(true))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)(false))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)([1]))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromAddress)((0, index_js_1.fakeAsString)({ a: 1 }))).toStrictEqual(null);
    });
});
// getFormatFromValue
describe("getFormatFromValue() function tests", () => {
    test("should return proper format", () => {
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.invalidEthereumAddress1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validEthereumSignature1)).toStrictEqual({
            name: "ethereum-sig"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.invalidEthereumSignature1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_js_1.getFormatFromValue)("https://degenrocket.space")).toStrictEqual({
            name: "url"
        });
        expect((0, index_js_1.getFormatFromValue)("degenrocket.space")).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)("hello world")).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(123)).toStrictEqual({
            name: "number"
        });
    });
    test("should return null if cannot identify format", () => {
        expect((0, index_js_1.getFormatFromValue)('')).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)(null))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)(0))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)(true))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)(false))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)([1]))).toStrictEqual(null);
        expect((0, index_js_1.getFormatFromValue)((0, index_js_1.fakeAsString)({ a: 1 }))).toStrictEqual(null);
    });
});
// extractIdFormatNameFromSpasmEventIdV2
describe("extractIdFormatNameFromSpasmEventIdV2() tests", () => {
    test("should extract ID format name", () => {
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1]))).toStrictEqual("ethereum-sig");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[1]))).toStrictEqual("nostr-hex");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[2]))).toStrictEqual("nostr-sig");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(true))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[1]))).toStrictEqual("url");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[2]))).toStrictEqual("guid");
    });
    test("should return null if cannot identify format", () => {
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(''))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(null))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(0))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(true))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(false))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)([1]))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)({ a: 1 }))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual(null);
    });
});
// extractAllIdFormatNamesFromSpasmEventV2
// getAllFormatNamesFromSpasmEventV2
// getAllFormatNamesFromEvent
describe("extractAllIdFormatNamesFromSpasmEventV2() tests", () => {
    test("should extract all ID format names", () => {
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2))).toStrictEqual(["spasmid"]);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toStrictEqual(["spasmid", "ethereum-sig"]);
        expect((0, index_js_1.getAllFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2))).toStrictEqual(["spasmid", "nostr-hex", "nostr-sig"]);
        expect((0, index_js_1.getAllFormatNamesFromEvent)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2))).toStrictEqual(["spasmid", "url", "guid"]);
    });
    test("should return null if cannot identify any format", () => {
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(''))).toStrictEqual(null);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(null))).toStrictEqual(null);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(0))).toStrictEqual(null);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(true))).toStrictEqual(null);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(false))).toStrictEqual(null);
        // TODO arrays and objects have Spasm ID, is that OK?
        // expect(extractAllIdFormatNamesFromSpasmEventV2(
        //   fakeAsObject([1]) as SpasmEventV2)).toStrictEqual(null);
        // expect(extractAllIdFormatNamesFromSpasmEventV2(
        //   fakeAsObject({a:1}) as SpasmEventV2)).toStrictEqual(null);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual(null);
    });
});
// getHashOfString()
describe("getHashOfString() function tests", () => {
    test("should return valid hash", () => {
        // const input = {};
        expect((0, index_js_1.getHashOfString)("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        expect((0, index_js_1.getHashOfString)("hello world")).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
        expect((0, index_js_1.getHashOfString)("1234567890-=!@#$%^&*()_+")).toBe("37af4cc38359f092b705241b286aaabf42aa6054fcb70016e971d63f9470793b");
        expect((0, index_js_1.getHashOfString)('<br>line<div class="main">Main text</div>')).toBe("ca5588d79172608051a13af3f6692e656179ab0e1a4e6153ef5eb969687c4330");
        expect((0, index_js_1.getHashOfString)("<br>line<div class='main'>Main text</div>")).toBe("6f7c80389ac8d9e6a5ce20539c569fcf7ab20b056f4b41cacfab391200472ec4");
        // Japanese
        expect((0, index_js_1.getHashOfString)("ハローワールド")).toBe("9b58f66ce16f8efa41f9ea5fcc767ae639bb1ee83849efc1400da3832c6bff90");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)(null))).toStrictEqual("");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)(0))).toStrictEqual("");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)(true))).toStrictEqual("");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)(false))).toStrictEqual("");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)([1]))).toStrictEqual("");
        expect((0, index_js_1.getHashOfString)((0, index_js_1.fakeAsString)({ a: 1 }))).toStrictEqual("");
    });
});
// keepTheseKeysOnly
describe("keepTheseKeysOnly() function tests", () => {
    test("should return valid hash", () => {
        const input = {
            addresses: [
                { value: "1b234", format: { name: "ethereum-pubkey" } },
                { value: "1a234", format: { name: "ethereum-pubkey" } },
                { value: "0x123", format: { name: "ethereum-pubkey" } }
            ],
            usernames: [
                { value: "carol1" },
                { value: "alice1" },
                { value: "bob1" }
            ],
            version: "123",
            extra: [
                { value: "extra1" },
                { value: "extra2" },
                { value: "extra3" }
            ]
        };
        const output1 = {};
        const output2 = {
            addresses: [
                { value: "1b234", format: { name: "ethereum-pubkey" } },
                { value: "1a234", format: { name: "ethereum-pubkey" } },
                { value: "0x123", format: { name: "ethereum-pubkey" } }
            ],
            usernames: [
                { value: "carol1" },
                { value: "alice1" },
                { value: "bob1" }
            ]
        };
        const output3 = { version: "123" };
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["version", "invalid"])).toStrictEqual(output3);
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["invalid"])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [""])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)(null)])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)(0)])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)(false)])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)(true)])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)([1])])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)(input, [(0, index_js_1.fakeAsString)({ a: 1 })])).toStrictEqual({});
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(null), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(undefined), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(0), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(123), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)("123"), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(true), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)(false), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObject)((0, index_js_1.fakeAsObject)([1]), ["id"])).toStrictEqual(null);
    });
});
// keepTheseKeysInObjectsInArray
describe("keepTheseKeysInObjectsInArray() function tests", () => {
    test("should return valid hash", () => {
        const input = [
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "bob1" }
                ],
                version: "123",
                extra: [
                    { value: "extra1" },
                    { value: "extra2" }
                ]
            },
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol1" },
                    { value: "alice1" }
                ],
                version: "456",
                extra: [
                    { value: "extra3" }
                ]
            }
        ];
        const output1 = [{}, {}];
        const output2 = [
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                ],
                usernames: [
                    { value: "bob1" }
                ]
            },
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol1" },
                    { value: "alice1" },
                ]
            }
        ];
        const output3 = [{ version: "123" }, { version: "456" }];
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["version", "invalid"])).toStrictEqual(output3);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["version", "invalid", (0, index_js_1.fakeAsString)(null)])).toStrictEqual(output3);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)(null)])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)(undefined)])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)(0)])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)(false)])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)(true)])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)([1])])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, [(0, index_js_1.fakeAsString)({ a: 1 })])).toStrictEqual([{}, {}]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)(null), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)(undefined), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)(0), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)(false), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)(true), ["id"])).toStrictEqual(null);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)([1]), ["id"])).toStrictEqual([null]);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)((0, index_js_1.fakeAsArray)({ a: 1 }), ["id"])).toStrictEqual(null);
    });
});
// sortArrayOfStringsAndNumbers()
describe("sortArrayOfStringsAndNumbers() function tests", () => {
    test("should return sorted array", () => {
        const input = ["1", 3, ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }, 2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4"];
        const output = ["1", 2, 3, "3a", "3ab", "4", "5", "abc1", "abc2", "abcd", ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }];
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)(input)).toStrictEqual(output);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(null))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(undefined))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(0))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(123))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(false))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)(true))).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)((0, index_js_1.fakeAsArray)({ a: 1 }))).toStrictEqual([]);
    });
});
// sortArrayOfObjects()
describe("sortArrayOfObjects() function tests", () => {
    test("should return sorted array", () => {
        const input = [
            "3", 1, ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
            { title: "white" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1d234", title: "purple" },
            { id: "1a", title: "red" },
            { title: "black" },
            { value: "1c", title: "yellow" },
            { id: 1, title: "green" },
        ];
        const output = [
            { id: 1, title: "green" },
            { id: "1a", title: "red" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1c", title: "yellow" },
            { value: "1d234", title: "purple" },
            { title: "black" },
            { title: "white" },
            1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
            ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
        ];
        expect((0, index_js_1.sortArrayOfObjects)(input, ["id", "value", "title"])).toStrictEqual(output);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(null), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(undefined), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(0), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(123), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(false), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)(true), ["id", "value", "title"])).toStrictEqual([]);
        expect((0, index_js_1.sortArrayOfObjects)((0, index_js_1.fakeAsArray)({ a: 1 }), ["id", "value", "title"])).toStrictEqual([]);
    });
});
describe("sortSpasmEventsV2ByDbAddedTimestamp() tests", () => {
    test("should return sorted array", () => {
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])[0].title).toStrictEqual("genesis");
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])[0]).not.toEqual(null);
        // Default order is descending "desc"
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
        ], "asc")).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
    });
    // invalid types
    test("should handle wrong types when sorting array", () => {
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            null,
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            undefined,
            0,
            123,
            "abc",
            [1, 2, 3]
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(null)))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(undefined))).toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(0)))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(123)))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(false)))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)(true)))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)("123")))
            .toStrictEqual(null);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)((0, index_js_1.fakeAsArray)({ a: 1 })))
            .toStrictEqual(null);
    });
});
// sortAuthorsForSpasmEventV2()
describe("sortAuthorsForSpasmEventV2() function tests", () => {
    test("should return sorted array", () => {
        const input = [
            "3", 1, ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
            { title: "white" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1d234", title: "purple" },
            { id: "1a", title: "red" },
            { title: "black" },
            { value: "1c", title: "yellow" },
            { id: 1, title: "green" },
            {
                usernames: [
                    { value: "carol5" },
                    { value: "alice5" },
                    { value: "bob5" }
                ]
            },
            {
                usernames: [
                    { value: "carol2" },
                    { value: "alice2" },
                    { value: "bob2" }
                ]
            },
            {
                addresses: [
                    { value: "3b234", format: { name: "ethereum-pubkey" } },
                    { value: "3a234", format: { name: "ethereum-pubkey" } },
                    { value: 30234, format: { name: "ethereum-pubkey" } }
                ],
            },
            {
                addresses: [
                    { value: "4b234", format: { name: "ethereum-pubkey" } }
                ]
            },
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol8" },
                    { value: "alice8" },
                    { value: "bob8" }
                ]
            },
        ];
        const output = [
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                    { value: "1b234", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "alice8" },
                    { value: "bob8" },
                    { value: "carol8" }
                ]
            },
            {
                addresses: [
                    { value: 30234, format: { name: "ethereum-pubkey" } },
                    { value: "3a234", format: { name: "ethereum-pubkey" } },
                    { value: "3b234", format: { name: "ethereum-pubkey" } }
                ],
            },
            {
                addresses: [
                    { value: "4b234", format: { name: "ethereum-pubkey" } }
                ]
            },
            {
                usernames: [
                    { value: "alice2" },
                    { value: "bob2" },
                    { value: "carol2" }
                ]
            },
            {
                usernames: [
                    { value: "alice5" },
                    { value: "bob5" },
                    { value: "carol5" }
                ]
            },
            { id: 1, title: "green" },
            { id: "1a", title: "red" },
            { id: "2a", value: "1b", title: "blue" },
            1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
            ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            { title: "white" },
            { value: "1d234", title: "purple" },
            { title: "black" },
            { value: "1c", title: "yellow" },
        ];
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)(input)).toStrictEqual(output);
    });
    test("should handle invalid types when sorting authors", () => {
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(null)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(undefined)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(0)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(123)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(false)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)(true)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)("123")))
            .toStrictEqual([]);
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)((0, index_js_1.fakeAsArray)({ a: 1 })))
            .toStrictEqual([]);
    });
});
// sortMediasForSpasmid01
describe("sortMediasForSpasmid01() function tests", () => {
    test("sortMediasForSpasmid01() should return sorted medias", () => {
        const input = [
            // media 2
            { ids: [{ value: "mediaid2" },
                    { value: "mediaid5" },
                    { value: "mediaid4" }],
                hashes: [{ value: "hash7" },
                    { value: "hash8" }] },
            // media 1
            { ids: [{ value: "mediaid3" },
                    { value: "mediaid1" }] },
            // media 6
            { extra: [{ value: "extra2" },
                    { value: "extra1" }] },
            // media 4
            { hashes: [{ value: "hash6" },
                    { value: "hash5" }] },
            // media 3
            { hashes: [{ value: "hash4" },
                    { value: "hash3" }],
                links: [{ value: "link4" },
                    { value: "link2" }] },
            // media 5
            { links: [{ value: "link3" },
                    { value: "link1" }] }
        ];
        const output = [
            // media 1
            { ids: [{ value: "mediaid1" },
                    { value: "mediaid3" }] },
            // media 2
            { ids: [{ value: "mediaid2" },
                    { value: "mediaid4" },
                    { value: "mediaid5" }],
                hashes: [{ value: "hash7" },
                    { value: "hash8" }] },
            // media 3
            { hashes: [{ value: "hash3" },
                    { value: "hash4" }],
                links: [{ value: "link2" },
                    { value: "link4" }] },
            // media 4
            { hashes: [{ value: "hash5" },
                    { value: "hash6" }] },
            // media 5
            { links: [{ value: "link1" },
                    { value: "link3" }] },
            // media 6
            { extra: [{ value: "extra2" },
                    { value: "extra1" }] }
        ];
        expect((0, index_js_1.sortMediasForSpasmid01)(input)).toStrictEqual(output);
    });
    test("should handle invalid types when sorting media", () => {
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(null)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(undefined)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(0)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(123)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(false)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)(true)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)("123")))
            .toStrictEqual([]);
        expect((0, index_js_1.sortMediasForSpasmid01)((0, index_js_1.fakeAsArray)({ a: 1 })))
            .toStrictEqual([]);
    });
});
// sortParentForSpasmid01()
describe("sortParentForSpasmid01() function tests", () => {
    test("sortParentForSpasmid01() should return sorted parent", () => {
        const input = { ids: [{ value: "parent-id3" },
                { value: "parent-id1b" },
                { value: "parent-id1a" },
                { value: "parent-idx" },
                { value: "parent-id1" }],
            marker: "parent-marker1" };
        const output = { ids: [{ value: "parent-id1" },
                { value: "parent-id1a" },
                { value: "parent-id1b" },
                { value: "parent-id3" },
                { value: "parent-idx" }],
            marker: "parent-marker1" };
        expect((0, index_js_1.sortParentForSpasmid01)(input)).toStrictEqual(output);
    });
    test("sortParentForSpasmid01() should handle invalid types", () => {
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(null))).toStrictEqual(null);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual(undefined);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(0))).toStrictEqual(0);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(123))).toStrictEqual(123);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(true))).toStrictEqual(true);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)(false))).toStrictEqual(false);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)([1]))).toStrictEqual([1]);
        expect((0, index_js_1.sortParentForSpasmid01)((0, index_js_1.fakeAsObject)({ a: 1 }))).toStrictEqual({ a: 1 });
    });
});
// sortReferencesForSpasmid01()
describe("sortReferencesForSpasmid01() function tests", () => {
    test("sortReferencesForSpasmid01() should return sorted references", () => {
        const input = [
            // reference 2
            { ids: [{ value: "ref-id4" },
                    { value: "ref-id2" }],
                marker: "ref-marker2" },
            // reference 1
            { ids: [{ value: "ref-id3" },
                    { value: "ref-id1" }],
                marker: "ref-marker1" },
        ];
        const output = [
            // reference 1
            { ids: [{ value: "ref-id1" },
                    { value: "ref-id3" }],
                marker: "ref-marker1" },
            // reference 2
            { ids: [{ value: "ref-id2" },
                    { value: "ref-id4" }],
                marker: "ref-marker2" },
        ];
        expect((0, index_js_1.sortReferencesForSpasmid01)(input)).toStrictEqual(output);
    });
    test("should handle invalid types when sorting references", () => {
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(null)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(undefined)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(0)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(123)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(false)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)(true)))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)("123")))
            .toStrictEqual([]);
        expect((0, index_js_1.sortReferencesForSpasmid01)((0, index_js_1.fakeAsArray)({ a: 1 })))
            .toStrictEqual([]);
    });
});
// sortTagsForSpasmid01()
describe("sortTagsForSpasmid01() function tests", () => {
    test("sortTagsForSpasmid01() should return sorted tags", () => {
        const input = [
            ["p", "pubkey2", "marker3", "extra2"],
            ["p", "pubkey2", "marker3", "extra1"],
            ["p", "pubkey1", "marker1"],
            ["p", "pubkey2", "marker3"],
            ["p", "pubkey2", "marker2"],
            ["e", "event1", "event-marker2"],
            ["e", "event2", "event-marker1"],
            ["license", "SPDX-License-Identifier: CC0-1.0"],
            ["spasm_version", "1.0.0"],
            ["spasm_action", "reply"],
            ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
        ];
        const output = [
            ["e", "event1", "event-marker2"],
            ["e", "event2", "event-marker1"],
            ["license", "SPDX-License-Identifier: CC0-1.0"],
            ["p", "pubkey1", "marker1"],
            ["p", "pubkey2", "marker2"],
            ["p", "pubkey2", "marker3"],
            ["p", "pubkey2", "marker3", "extra1"],
            ["p", "pubkey2", "marker3", "extra2"],
            ["spasm_action", "reply"],
            ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"],
            ["spasm_version", "1.0.0"],
        ];
        expect((0, index_js_1.sortTagsForSpasmid01)(input)).toStrictEqual(output);
    });
    test("should handle invalid types when sorting tags", () => {
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(null)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(undefined)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(0)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(123)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(false)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)(true)))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)("123")))
            .toStrictEqual([[]]);
        expect((0, index_js_1.sortTagsForSpasmid01)((0, index_js_1.fakeAsArray)({ a: 1 })))
            .toStrictEqual([[]]);
    });
});
// executeFunctionForAllNestedValuesOfType()
describe("executeFunctionForNestedValues() function tests", () => {
    const changeString = (value) => {
        if (typeof (value) === "string") {
            if (value === "世界")
                return "新" + value;
            return "new " + value;
        }
        return value;
    };
    const changeNumber = (value) => {
        if (typeof (value) === "number") {
            if (value / 4 === 496)
                return value + 36;
            return value * 10;
        }
        return value;
    };
    const changeBoolean = (value) => {
        if (typeof (value) === "boolean") {
            if (value) {
                return false;
            }
            else {
                return true;
            }
        }
        return value;
    };
    const nestedArray = [
        "one", "two", ["three"], 4,
        [5, true, ["six", 7, 8, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [19, true, "twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedStrings = [
        "new one", "new two", ["new three"], 4,
        [5, true, ["new six", 7, 8, false],
            {
                word: "new nine",
                words: ["new ten", "new eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "new sixteen", "new seventeen", true, false, "new "],
                object: {
                    text: "new eighteen",
                    booleans: [true, false],
                    mix: [19, true, "new twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedNumbers = [
        "one", "two", ["three"], 40,
        [50, true, ["six", 70, 80, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 120,
                numbers: [130, 140],
                mix: [150, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [190, true, "twenty", 210, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedBooleans = [
        "one", "two", ["three"], 4,
        [5, false, ["six", 7, 8, true],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", false, true, ""],
                object: {
                    text: "eighteen",
                    booleans: [false, true],
                    mix: [19, false, "twenty", 21, true]
                }
            }
        ]
    ];
    const nestedObject = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArray))
        }
    };
    const nestedObjectWithChangedStrings = {
        content: "new hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "新世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
        }
    };
    const nestedObjectWithChangedNumbers = {
        content: "hello",
        value: (4 + 12 + 12 + 13) * 50 - 30,
        valent: false,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers))
        }
    };
    const nestedObjectWithChangedBooleans = {
        content: "hello",
        value: 31 * 64,
        valent: true,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans))
        }
    };
    test("should return undefined if input is a string", () => {
        const input = "hello world";
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, // bypass TypeScript type checking
            {
                customFunction: changeString,
                valueType: "string"
            });
        }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.");
    });
    test("should return undefined if input is a number", () => {
        const input = 1;
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, // bypass TypeScript type checking
            {
                customFunction: changeNumber,
                valueType: "number"
            });
        }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.");
    });
    test("should throw an error if maxium recursion depth exceeded", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
                customFunction: changeString,
                valueType: "string",
                maxDepth: 3
            });
        }).toThrow("Maximum recursion depth exceeded");
    });
    test("sanitizeEventWith should return empty array if maximum recursion depth exceeded", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: changeString,
            valueType: "string",
            maxDepth: 3
        });
        expect(input).toStrictEqual([]);
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("sanitizeEventWith should return empty object if maximum recursion depth exceeded", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: changeString,
            valueType: "string",
            maxDepth: 3
        });
        expect(input).toStrictEqual({});
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("should change all nested strings in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested numbers in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested booleans in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeBoolean,
            valueType: "boolean"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested strings in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested numbers in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedNumbers));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested booleans in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeBoolean,
            valueType: "boolean"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedBooleans));
        expect(input).toStrictEqual(output);
    });
    test("should not change anything", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedArray));
        expect(input).toStrictEqual(output);
    });
    test("should not change anything", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedArray));
        expect(input).toStrictEqual(output);
    });
});
// sanitizeEventWith()
describe("sanitizeEventWith() function tests", () => {
    const sanitizeStringFunction = (value) => {
        if (typeof (value) === "string") {
            return "sanitized " + value;
        }
        return value;
    };
    const nestedArray = [
        "one", "two", ["three"], 4,
        [5, true, ["six", 7, 8, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [19, true, "twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedStrings = [
        "sanitized one", "sanitized two", ["sanitized three"], 4,
        [5, true, ["sanitized six", 7, 8, false],
            {
                word: "sanitized nine",
                words: ["sanitized ten", "sanitized eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sanitized sixteen", "sanitized seventeen", true, false, "sanitized "],
                object: {
                    text: "sanitized eighteen",
                    booleans: [true, false],
                    mix: [19, true, "sanitized twenty", 21, false]
                }
            }
        ]
    ];
    const nestedObject = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArray))
        }
    };
    const nestedObjectWithChangedStrings = {
        content: "sanitized hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "sanitized world",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
        }
    };
    test("should sanitize all nested strings in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: sanitizeStringFunction
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
});
// sanitizeEvent()
describe("sanitizeEvent() function tests", () => {
    // Array with nested malicious HTML tags
    const nestedArrayDirty = [
        "one", "<img src=x onerror=alert(1)//>", ["three"], 4,
        [5, true, ["<svg><g/onload=alert(2)//<p>", 7, 8, false],
            {
                word: "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", '<math><mi//xlink:href="data:x,<script>alert(4)</script>">', true, false, ""],
                object: {
                    text: "<TABLE><tr><td>HELLO</tr></TABL>",
                    booleans: [true, false],
                    mix: [19, true, "<UL><li><A HREF=//google.com>click</UL>", 21, false]
                }
            }
        ]
    ];
    // DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
    // DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
    // DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
    // DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
    // DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
    // DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
    const nestedObjectDirty = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArrayDirty))
        }
    };
    const eventDirty = JSON.parse(JSON.stringify(nestedObjectDirty));
    const nestedArrayClean = [
        "one", '<img src="x">', ["three"], 4,
        [5, true, ["<svg><g></g></svg>", 7, 8, false],
            {
                word: "<p>abc</p>",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "<math><mi></mi></math>", true, false, ""],
                object: {
                    text: "<table><tbody><tr><td>HELLO</td></tr></tbody></table>",
                    booleans: [true, false],
                    mix: [19, true, '<ul><li><a href="//google.com">click</a></li></ul>', 21, false]
                }
            }
        ]
    ];
    const nestedObjectClean = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArrayClean))
        }
    };
    const eventClean = JSON.parse(JSON.stringify(nestedObjectClean));
    test("should sanitize all nested strings in event", () => {
        const input = JSON.parse(JSON.stringify(eventDirty));
        (0, index_js_1.sanitizeEvent)(input);
        const output = JSON.parse(JSON.stringify(eventClean));
        expect(input).toStrictEqual(output);
    });
});
// toLowerCaseAllNestedStrings()
// toLowerCaseIfString()
describe("custom toLowerCase() functions tests", () => {
    test("should sanitize all nested strings in object", () => {
        const input = {
            one: "Hello",
            two: {
                three: "WORLD",
                four: ["UP", "down", { and: "UP", num: 0, val: 1 }]
            }
        };
        const output = {
            one: "hello",
            two: {
                three: "world",
                four: ["up", "down", { and: "up", num: 0, val: 1 }]
            }
        };
        (0, index_js_1.toLowerCaseAllNestedStrings)(input);
        expect(input).toStrictEqual(output);
        const inputArray = ["UP", "down", { and: "UP", num: 0, val: 1 }];
        const outputArray = ["up", "down", { and: "up", num: 0, val: 1 }];
        (0, index_js_1.toLowerCaseAllNestedStrings)(inputArray);
        expect(inputArray).toStrictEqual(outputArray);
        const inputString = (0, index_js_1.toLowerCaseIfString)("Hello World");
        const outputString = "hello world";
        expect(inputString).toStrictEqual(outputString);
        const inputNumber = (0, index_js_1.toLowerCaseIfString)(1);
        const outputNumber = 1;
        expect(inputNumber).toStrictEqual(outputNumber);
    });
});
// mergeConfigs()
describe("mergeConfigs() function tests", () => {
    test("mergeConfigs() should merge two full configs", () => {
        const defaultConfig = new interfaces_js_1.ConvertToSpasmConfig();
        const customConfig = new interfaces_js_1.ConvertToSpasmConfig();
        customConfig.to.spasm.id.versions = ["02", "03"];
        customConfig.xss.enableSanitization = false;
        const input = (0, index_js_1.mergeConfigs)(defaultConfig, customConfig);
        const output = new interfaces_js_1.ConvertToSpasmConfig();
        output.to.spasm.id.versions = ["02", "03"];
        output.xss.enableSanitization = false;
        expect(input).toEqual(output);
    });
    test("mergeConfigs() should merge full and partial configs", () => {
        const defaultConfig = new interfaces_js_1.ConvertToSpasmConfig();
        const customConfigPartial = {
            to: {
                spasm: {
                    version: "1.0.0",
                    id: {
                        versions: ["03"]
                    }
                }
            },
            xss: {
                enableSanitization: false
            },
        };
        const input = (0, index_js_1.mergeConfigs)(defaultConfig, customConfigPartial);
        const output = new interfaces_js_1.ConvertToSpasmConfig();
        output.to.spasm.version = "1.0.0";
        output.to.spasm.id.versions = ["03"];
        output.xss.enableSanitization = false;
        expect(input).toEqual(output);
    });
});
// hasSiblingDmp()
// hasSiblingNostr()
// hasSiblingWeb2()
// hasSiblingSpasm()
describe("hasSiblingSpasm() function tests", () => {
    test("hasSibling...() should return true if event has specified siblings", () => {
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        const inputSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2));
        // hasSiblingSpasm()
        expect((0, index_js_1.hasSiblingSpasm)(inputSpasm)).toEqual(true);
        expect((0, index_js_1.hasSiblingSpasm)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSiblingSpasm)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSiblingSpasm)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingSpasm)(inputWeb2)).toEqual(false);
        // hasSiblingDmp()
        expect((0, index_js_1.hasSiblingDmp)(inputSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingDmp)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasSiblingDmp)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSiblingDmp)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingDmp)(inputWeb2)).toEqual(false);
        // hasSiblingNostr()
        expect((0, index_js_1.hasSiblingNostr)(inputSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingNostr)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSiblingNostr)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasSiblingNostr)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasSiblingNostr)(inputWeb2)).toEqual(false);
        // hasSiblingWeb2()
        expect((0, index_js_1.hasSiblingWeb2)(inputSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputWeb2)).toEqual(true);
    });
});
// hasSignatureOfFormat()
// hasSignatureEthereum()
// hasSignatureNostr()
describe("hasSignatureOfFormat() function tests", () => {
    test("hasSignatureOfFormat...() should return true if event has specified signature", () => {
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        const inputSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2));
        const inputSpasmUnsigned = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventBodyV2ConvertedToSpasmV2));
        // hasSignatureOfFormat for invalid signature format
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(null))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(undefined))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(true))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(false))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(0))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)(1))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)("abc"))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)([1, 2, 3]))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, (0, index_js_1.fakeAsString)({ a: 1 }))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(null))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(undefined))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(true))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(false))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(0))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)(1))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)("abc"))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)([1, 2, 3]))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, (0, index_js_1.fakeAsString)({ a: 1 }))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(null))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(undefined))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(true))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(false))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(0))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)(1))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)("abc"))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)([1, 2, 3]))).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, (0, index_js_1.fakeAsString)({ a: 1 }))).toEqual(false);
        // hasSignatureOfFormat for ethereum
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasmUnsigned, "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, "ethereum")).toEqual(true);
        expect((0, index_js_1.hasSignatureOfFormat)(inputDmp, "ethereum")).toEqual(true);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostrSpasm, "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, "ethereum")).toEqual(false);
        // hasSignatureOfFormat for nostr
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasmUnsigned, "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputSpasm, "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputDmp, "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostr, "nostr")).toEqual(true);
        expect((0, index_js_1.hasSignatureOfFormat)(inputNostrSpasm, "nostr")).toEqual(true);
        expect((0, index_js_1.hasSignatureOfFormat)(inputWeb2, "nostr")).toEqual(false);
        // hasSignatureEthereum()
        expect((0, index_js_1.hasSignatureEthereum)(inputSpasmUnsigned)).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)(inputSpasm)).toEqual(true);
        expect((0, index_js_1.hasSignatureEthereum)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasSignatureEthereum)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)(inputWeb2)).toEqual(false);
        // hasSignatureNostr()
        expect((0, index_js_1.hasSignatureNostr)(inputSpasmUnsigned)).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)(inputSpasm)).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasSignatureNostr)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasSignatureNostr)(inputWeb2)).toEqual(false);
    });
    test("hasSignatureOfFormat...() should return false if event is invalid type", () => {
        // hasSignatureOfFormat for ethereum
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(null), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(undefined), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(0), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(1), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(true), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(false), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)("abc"), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)([1, 2, 3]), "ethereum")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)({ a: 1 }), "ethereum")).toEqual(false);
        // hasSignatureOfFormat for nostr
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(null), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(undefined), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(0), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(1), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(true), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)(false), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)("abc"), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)([1, 2, 3]), "nostr")).toEqual(false);
        expect((0, index_js_1.hasSignatureOfFormat)((0, index_js_1.fakeAsObject)({ a: 1 }), "nostr")).toEqual(false);
        // hasSignatureEthereum()
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(null))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(undefined))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(0))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(1))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(true))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)(false))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)("abc"))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)((0, index_js_1.fakeAsObject)({ a: 1 }))).toEqual(false);
        // hasSignatureNostr()
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(null))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(undefined))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(0))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(1))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(true))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)(false))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)("abc"))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)((0, index_js_1.fakeAsObject)({ a: 1 }))).toEqual(false);
    });
});
describe("extractNostrEvents() function tests", () => {
    test("extractNostrEvents() should return null when passed invalid type", () => {
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(null))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(0))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(1))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(true))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)(false))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)("abc"))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)((0, index_js_1.fakeAsObject)({ a: 1 }))).toStrictEqual(null);
    });
    test("extractNostrEvents() should extract valid Nostr event from Spasm event", () => {
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2)).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrEvent);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrEventSignedOpened);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpened);
        expect((0, index_js_1.extractNostrEvents)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual([_events_data_js_1.validNostrEvent]);
        expect((0, index_js_1.extractSignedNostrEvents)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractSignedNostrEvents)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)).toStrictEqual([_events_data_js_1.validNostrEventSignedOpened]);
    });
});
// getAllSigners()
describe("getAllSigners() function tests", () => {
    test("getAllSigners() should return an empty array when passed invalid type", () => {
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(null))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(0))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(1))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(true))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)(false))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)("abc"))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toStrictEqual([]);
        expect((0, index_js_1.getAllSigners)((0, index_js_1.fakeAsObject)({ a: 1 }))).toStrictEqual([]);
    });
    test("getVerifiedSigners() should return an empty array when passed invalid type", () => {
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(null))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(undefined))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(0))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(1))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(true))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)(false))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)("abc"))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toStrictEqual([]);
        expect((0, index_js_1.getVerifiedSigners)((0, index_js_1.fakeAsObject)({ a: 1 }))).toStrictEqual([]);
    });
    test("getAllSigners() should return an array of author addresses", () => {
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputDmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputNostrConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostrSpasmConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2Converted = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"];
        const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"];
        const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"];
        const outputWeb2 = [];
        // getAllSigners() for original events
        expect((0, index_js_1.getAllSigners)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSigners)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSigners)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSigners)(inputWeb2)).toEqual(outputWeb2);
        // getAllSigners() for events converted to SpasmEventV2
        expect((0, index_js_1.getAllSigners)(inputDmpConverted)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSigners)(inputNostrConverted)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSigners)(inputNostrSpasmConverted)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSigners)(inputWeb2Converted)).toEqual(outputWeb2);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks))
            .toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "any", "any"))
            .toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "any", "hex"))
            .toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "any", "npub"))
            .toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "npub195ke7xdf3efncf6spe0s26322mdcl6frj0n6yy6akcadxqzgdapqjsm60y"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "nostr", "any"))
            .toEqual([
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "nostr", "hex"))
            .toEqual([
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, true, true, "nostr", "npub"))
            .toEqual([
            "npub195ke7xdf3efncf6spe0s26322mdcl6frj0n6yy6akcadxqzgdapqjsm60y"
        ]);
        // getVerifiedSigners()
        expect((0, index_js_1.getVerifiedSigners)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getVerifiedSigners)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getVerifiedSigners)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getVerifiedSigners)(inputWeb2)).toEqual(outputWeb2);
        expect((0, index_js_1.getVerifiedSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks))
            .toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getVerifiedSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, "hex")).toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getVerifiedSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, "npub")).toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "npub195ke7xdf3efncf6spe0s26322mdcl6frj0n6yy6akcadxqzgdapqjsm60y"
        ]);
        // Test an event with upper case pubkeys
        expect((0, index_js_1.getVerifiedSigners)(_events_data_js_1.validEventWithUpperCasePubkey)).toEqual([
            "0xae4e282bca7c7dacaa4f65522e33340317c47292",
        ]);
        // getNostrSigners
        expect((0, index_js_1.getAllNostrSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks)).toEqual([
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllNostrSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, "hex")).toEqual([
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
        ]);
        expect((0, index_js_1.getAllNostrSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks, "npub")).toEqual([
            "npub195ke7xdf3efncf6spe0s26322mdcl6frj0n6yy6akcadxqzgdapqjsm60y"
        ]);
        // getAllEthereumSigners
        expect((0, index_js_1.getAllEthereumSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks)).toEqual([
            "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e"
        ]);
        // getAllSpasmSigners
        expect((0, index_js_1.getAllSpasmSigners)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks)).toEqual([]);
        // hasVerifiedSigner()
        expect((0, index_js_1.hasVerifiedSigner)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasVerifiedSigner)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasVerifiedSigner)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasVerifiedSigner)(inputWeb2)).toEqual(false);
        expect((0, index_js_1.hasVerifiedSigner)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks)).toEqual(true);
        // hasValidSignature
        expect((0, index_js_1.hasValidSignature)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasValidSignature)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasValidSignature)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasValidSignature)(inputWeb2)).toEqual(false);
        expect((0, index_js_1.hasValidSignature)(_events_data_js_1.validMultiSignedSpasmEventV2WithMediaLinks)).toEqual(true);
    });
});
// getAllSignatures()
describe("getAllSignatures() function tests", () => {
    test("getAllSignatures() should return an array of signatures", () => {
        // Events
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        // Signatures
        const outputDmp = ["0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"];
        const outputNostr = ["908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"];
        const outputNostrSpasm = ["db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"];
        const outputWeb2 = [];
        // getAllSignatures()
        expect((0, index_js_1.getAllSignatures)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSignatures)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSignatures)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSignatures)(inputWeb2)).toEqual(outputWeb2);
    });
});
// getSignersListedIn()
// isAnySignerListedIn()
// areAllSignersListedIn()
describe("getSignersListedIn() function tests", () => {
    test("getSignersListedIn() should return an array of signers listed as moderators", () => {
        // Events
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputDmpBanned = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasmConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const moderators = [
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
        ];
        const whitelistedForActionPost = [
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const whitelistedForActionPostWithNpub = [
            "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const whitelistedForActionPostWithNpubAndHex = [
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const bannedAuthors = [
            "0x49e8d02294e721ac47f6f4794625312b9005fd80",
            "vita1ik.eth"
        ];
        const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"];
        const outputDmpBanned = ["0x49e8d02294e721ac47f6f4794625312b9005fd80"];
        const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"];
        const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"];
        // const outputWeb2 = []
        // Check invalid types
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(null), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(undefined), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(0), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(1), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(true), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(false), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)([1, 2, 3]), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)({ a: 1 }), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)("string"), moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(null))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(undefined))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(0))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(1))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(true))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)(false))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)([1, 2, 3]))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)({ a: 1 }))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, (0, index_js_1.fakeAsArray)("string"))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(null))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(undefined))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(0))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(1))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(true))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)(false))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)([1, 2, 3]))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)({ a: 1 }))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, (0, index_js_1.fakeAsArray)("string"))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(null))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(undefined))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(0))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(1))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(true))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)(false))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)([1, 2, 3]))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)({ a: 1 }))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, (0, index_js_1.fakeAsArray)("string"))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(null), (0, index_js_1.fakeAsArray)(null))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(undefined), (0, index_js_1.fakeAsArray)(undefined))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(0), (0, index_js_1.fakeAsArray)(0))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(1), (0, index_js_1.fakeAsArray)(1))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(true), (0, index_js_1.fakeAsArray)(true))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)(false), (0, index_js_1.fakeAsArray)(false))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)([1, 2, 3]), (0, index_js_1.fakeAsArray)([1, 2, 3]))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)({ a: 1 }), (0, index_js_1.fakeAsArray)({ a: 1 }))).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)((0, index_js_1.fakeAsObject)("string"), (0, index_js_1.fakeAsArray)("string"))).toEqual([]);
        // getSignersListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputDmp, moderators)).toEqual(outputDmp);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, whitelistedForActionPost)).toEqual(outputDmp);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, bannedAuthors)).toEqual([]);
        // alias getPubkeysListedIn()
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, moderators)).toEqual(outputDmp);
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, whitelistedForActionPost)).toEqual(outputDmp);
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with Dmp banned
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, bannedAuthors)).toEqual(outputDmpBanned);
        // getSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputNostr, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, whitelistedForActionPost)).toEqual(outputNostr);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with NostrSpasm whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, whitelistedForActionPost)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with web2
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, whitelistedForActionPost)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, bannedAuthors)).toEqual([]);
        // isAnySignerListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, moderators)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, bannedAuthors)).toEqual(false);
        // isAnySignerListedIn() with Dmp banned
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // isAnySignerListedIn() with Nostr whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPostWithNpub)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPostWithNpubAndHex)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // alias isAnyPubkeyListedIn()
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // isAnySignerListedIn() with Nostr whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, moderators)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Dmp banned
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // alias areAllPubkeysListedIn()
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // areAllSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, bannedAuthors)).toEqual(false);
    });
});
describe("getStatsByAction() tests", () => {
    test("getStatsByAction() should return a stat", () => {
        // Default is "react"
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)).action).toEqual("react");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "react").action).toEqual("react");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "reply").action).toEqual("reply");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "moderate")).toEqual(null);
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "react")).toEqual(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats[0]);
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "reply")).toEqual(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats[1]);
    });
});
describe("getTotalOfReaction() tests", () => {
    test("getTotalOfReaction() should return a stat", () => {
        // Default is "upvote"
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(8);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "upvote")).toEqual(8);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), "upvote")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "downvote")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "bullish")).toEqual(5);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "bearish")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "important")).toEqual(6);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "scam")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "random")).toEqual(0);
    });
});
describe("getTotalOfMostPopularReaction() tests", () => {
    test("getTotalOfMostPopularReaction() should return a total of most popular reaction", () => {
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(8);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(11);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew))).toEqual(26);
    });
});
describe("getTotalOfReply() tests", () => {
    test("getTotalOfReply() should return a total of most popular reaction", () => {
        expect((0, index_js_1.getTotalOfReact)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfReply)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfReply)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(3);
        expect((0, index_js_1.getTotalOfActionReply)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(3);
        expect((0, index_js_1.getTotalOfReplyAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(3);
        expect((0, index_js_1.getTotalOfAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "reply")).toEqual(18081);
        expect((0, index_js_1.getTotalOfAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "react")).toEqual(0);
    });
});
// getAllIdsFromArrayOfIdObjects()
describe("getAllIdsFromArrayOfIdObjects() tests", () => {
    test("getAllIdsFromArrayOfIdObjects() should return array of IDs", () => {
        const input = [
            { value: "123" },
            { value: "AbC", extra: "def" },
            { value: 456, meta: 789 },
            { value: true },
            { value: false },
            { value: [10, "11"] },
            { value: { value: "12" } },
        ];
        const output = ["123", "abc", 456];
        expect((0, index_js_1.getAllIdsFromArrayOfIdObjects)(input, true)).toStrictEqual(output);
    });
});
// getAllEventIds()
describe("getAllEventIds() tests", () => {
    test("getAllEventIds() should return array of IDs", () => {
        const input1 = _events_data_js_1.validNostrSpasmEventSignedOpened;
        const output1 = [
            "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        ];
        expect((0, index_js_1.getAllEventIds)(input1, true)).toStrictEqual(output1);
        const input2 = _events_data_js_1.validSpasmWithDmpReplyToDmpEventV0;
        const output2 = [
            "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
            "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b"
        ];
        expect((0, index_js_1.getAllEventIds)(input2, true)).toStrictEqual(output2);
    });
});
// getAllParentIds()
describe("getAllParentIds() tests", () => {
    test("getAllParentIds() should return array with parent ID", () => {
        const input = _events_data_js_1.validSpasmWithDmpReplyToDmpEventV0;
        const output = [input.target];
        expect((0, index_js_1.getAllParentIds)(input, true)).toStrictEqual(output);
    });
    test("getAllParentIds() should return array with genesis IDs", () => {
        const input = _events_data_js_1.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2;
        const output = [input.parent?.ids[0].value, input.parent?.ids[1].value];
        expect((0, index_js_1.getAllParentIds)(input, true)).toStrictEqual(output);
    });
    test("getAllParentIds() should return empty array", () => {
        const input = _events_data_js_1.validPostWithRssItem;
        const output = [];
        expect((0, index_js_1.getAllParentIds)(input, true)).toStrictEqual(output);
    });
    test("getAllParentIds() should return an array with DMP ID", () => {
        const input = _events_data_js_1.validNostrReplyToDmpEvent;
        const output = [input.tags[3][1]];
        expect((0, index_js_1.getAllParentIds)(input, true)).toStrictEqual(output);
    });
});
// toBeSpasmEventV2()
describe("toBeSpasmEventV2() function tests", () => {
    test("toBeSpasmEventV2() should return SpasmEventV2 or null", () => {
        const inputDmp = _events_data_js_1.validDmpEventSignedClosed;
        const inputNostr = _events_data_js_1.validNostrEventSignedOpened;
        const inputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpened;
        const outputDmp = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const outputNostr = _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2;
        const outputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2;
        // Not SpasmEventV2 yet
        expect((0, index_js_1.toBeSpasmEventV2)(inputDmp)).toStrictEqual(outputDmp);
        expect((0, index_js_1.toBeSpasmEventV2)(inputNostr)).toStrictEqual(outputNostr);
        expect((0, index_js_1.toBeSpasmEventV2)(inputNostrSpasm)).toStrictEqual(outputNostrSpasm);
        // Already SpasmEventV2
        expect((0, index_js_1.toBeSpasmEventV2)(outputDmp)).toStrictEqual(outputDmp);
        expect((0, index_js_1.toBeSpasmEventV2)(outputNostr)).toStrictEqual(outputNostr);
        expect((0, index_js_1.toBeSpasmEventV2)(outputNostrSpasm)).toStrictEqual(outputNostrSpasm);
        // Other
        expect((0, index_js_1.toBeSpasmEventV2)("hello")).toStrictEqual(null);
    });
});
// getIdByFormat()
// extractIdByFormat() - alias
describe("getIdByFormat() tests", () => {
    test("getIdByFormat() get ID by format", () => {
        // Not converted to SpasmEventV2 yet
        const inputDmp = _events_data_js_1.validDmpEventSignedClosed;
        const inputNostr = _events_data_js_1.validNostrEventSignedOpened;
        const inputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpened;
        // Already converted to SpasmEvent2
        const inputDmpConverted = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const inputNostrConverted = _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2;
        const inputNostrSpasmConverted = _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2;
        // default format name and version
        expect((0, index_js_1.getIdByFormat)(inputDmp)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr)).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm)).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        expect((0, index_js_1.getIdByFormat)(inputDmpConverted)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostrConverted)).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasmConverted)).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // spasmid
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // alias
        expect((0, index_js_1.extractIdByFormat)(inputDmp, { name: "spasmid" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.extractIdByFormat)(inputNostr, { name: "spasmid" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.extractIdByFormat)(inputNostrSpasm, { name: "spasmid" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // spasmid01
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid", version: "01" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid", version: "01" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid", version: "01" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        expect((0, index_js_1.extractSpasmId01)(inputDmp)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        // spasmid99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid", version: "99" })).toStrictEqual(null);
        // ethereum-sig
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "ethereum-sig" })).toStrictEqual("0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "ethereum-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "ethereum-sig" })).toStrictEqual(null);
        // ethereum-sig99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        // nostr-hex
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-hex" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-hex" })).toStrictEqual("4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-hex" })).toStrictEqual("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651");
        // nostr-hex99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        // nostr-sig
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-sig" })).toStrictEqual("db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1");
        // nostr-sig99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
        // url
        expect((0, index_js_1.getIdByFormat)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2, { name: "url" })).toStrictEqual("https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack");
        // guid
        expect((0, index_js_1.getIdByFormat)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2, { name: "guid" })).toStrictEqual("https://forum.degenrocket.space/?l=terraforming");
    });
});
describe("getParentIdByFormat() tests", () => {
    test("getParentIdByFormat() get ID by format", () => {
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "nostr-hex" })).toStrictEqual(null);
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.extractParentSpasmId01)(_events_data_js_1.validNostrReplyToDmpEvent)).toStrictEqual(null);
        expect((0, index_js_1.extractParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "ethereum-sig" })).toStrictEqual("0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b");
        // event with two parent url ids
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validSpasmEventV2WithTwoParentUrlIds, { name: "url" })).toStrictEqual("https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/"
        // "https://reason.com/?p=8317331"
        );
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validSpasmEventV2WithTwoParentUrlIds, { name: "guid" })).toStrictEqual(null);
    });
});
// findMostLikelyUrl
// findMostLikelyGuid
describe("findMostLikelyUrl and findMostLikelyGuid tests", () => {
    test("findMostLikelyUrl()", () => {
        expect((0, index_js_1.findMostLikelyUrl)([
            "123abc",
            "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
            "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
            "https://reason.com/?p=8317331",
            "https://reason.com/?p=8317331",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f123456789"
        ])).toStrictEqual("https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/");
    });
    test("findMostLikelyGuid()", () => {
        expect((0, index_js_1.findMostLikelyGuid)([
            "123abc",
            "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
            "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
            "https://reason.com/?p=8317331",
            "https://reason.com/?p=8317331",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f123456789"
        ])).toStrictEqual("https://reason.com/?p=8317331");
    });
});
describe("checkIfEventHasThisId() tests", () => {
    test("checkIfEventHasThisId() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual(true);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6e")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b")).toStrictEqual(true);
        // Converted Nostr
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807")).toStrictEqual(true);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27808")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65")).toStrictEqual(true);
    });
});
describe("getEventById() tests", () => {
    test("getEventById() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
        ], "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], 
        // Wrong ID
        "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], null)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([], "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)({}, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)(undefined, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)(null, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        // Short ID (not URL)
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20))).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 19), 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 21), 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 21)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 19)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 15), 15
        // Valid short ID should be at least 16 chars
        )).toStrictEqual(null);
    });
});
describe("getEventsByIds() tests", () => {
    test("getEventsByIds() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
        ], [
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            // NostrSpasm
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
            // DMP
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            // NostrSpasm
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            // NostrSpasm
            "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            // Wrong ID
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            null
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)({}, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)(undefined, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)(null, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        // Short ID
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ], 19)).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20)
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994b"
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 19)
        ], 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 21)
        ], 20)).toStrictEqual(null);
    });
});
// mergeSpasmEventsV2()
describe("mergeSpasmEventsV2() tests", () => {
    test("mergeSpasmEventsV2() tests with null", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([null, (0, index_js_1.copyOf)(input)]))
            .toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            null, (0, index_js_1.copyOf)(input), (0, index_js_1.copyOf)(input)
        ])).toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([null, (0, index_js_1.copyOf)(input), null]))
            .toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input), null]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input), null, null]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(input), null, null, (0, index_js_1.copyOf)(input)
        ])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([null, null, null]))
            .toStrictEqual(null);
    });
    test("mergeSpasmEventsV2() should merge same DMP events", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpened);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.title)
            .toStrictEqual("genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same DMP events", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.title).toStrictEqual("Nostr Spasm genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with DMP siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ])?.title)
            .toStrictEqual("genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input, input, input, input, input])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with Nostr siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.content)
            .toStrictEqual("Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with NostrSpasm siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.title)
            .toStrictEqual("Nostr Spasm genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should return the first event if events have different Spasm ID", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const input3 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpened);
        const input4 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const input5 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2);
        const input6 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const input7 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const input8 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2);
        const input9 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const input10 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        const input11 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([input2, input1]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input2));
        expect((0, index_js_1.mergeSpasmEventsV2)([input3, input4]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input3));
        expect((0, index_js_1.mergeSpasmEventsV2)([input5, input6]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input5));
        expect((0, index_js_1.mergeSpasmEventsV2)([input7, input8]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input7));
        expect((0, index_js_1.mergeSpasmEventsV2)([input8, input9]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input8));
        expect((0, index_js_1.mergeSpasmEventsV2)([input9, input10]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input10));
        expect((0, index_js_1.mergeSpasmEventsV2)([input10, input11]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input10));
        expect((0, index_js_1.mergeSpasmEventsV2)([input11, input1]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input11));
        expect((0, index_js_1.mergeSpasmEventsV2)([input1, input2, input3, input4]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input1));
    });
    test("mergeSpasmEventsV2() tests for merging unsigned with signed events, which have the same Spasm ID", () => {
        const dmpUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const dmpSigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const nostrUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const nostrSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const nostrSpasmUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const nostrSpasmSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        // DMP signed and unsigned events have different Spasm IDs
        // because unsigned events don't have a signer, which
        // affects the Spasm ID.
        // Since events have different Spasm IDs, they aren't merged.
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, dmpSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        // Signed and unsigned Nostr events have the same Spasm ID
        // so unsigned sibling is dropped in favor of a signed
        // sibling during merge.
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrUnsigned, nostrUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        // Not equal
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSpasmSigned]))
            .not.toEqual(null);
    });
    test("mergeSpasmEventsV2() tests for merging events with different Spasm IDs", () => {
        const dmpUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const dmpSigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const nostrUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const nostrSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const nostrSpasmUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const nostrSpasmSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        // DMP signed and unsigned events have different Spasm IDs
        // because unsigned events don't have a signer, which
        // affects the Spasm ID.
        // Since events have different Spasm IDs, they aren't merged.
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, dmpSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpSigned, dmpUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            dmpSigned, dmpUnsigned, dmpSigned, dmpUnsigned, dmpUnsigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        // Signed and unsigned Nostr events have the same Spasm ID
        // so unsigned sibling is dropped in favor of a signed
        // sibling during merge.
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            nostrUnsigned, nostrSpasmUnsigned, nostrSpasmUnsigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, dmpUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            nostrSpasmUnsigned, dmpSigned, dmpSigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        // Not equal
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpSigned, nostrSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, dmpSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrUnsigned]))
            .not.toEqual(null);
    });
    test("mergeSpasmEventsV2() tests for merging events with and without source", () => {
        const dmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const dmpConvertedWithSource = {
            ...dmpConverted,
            source: "newsource.space"
        };
        const dmpConvertedWithAnotherSource = {
            ...dmpConverted,
            source: "anothersource.space"
        };
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConverted)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConverted)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource), (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .not.toEqual(dmpConverted);
    });
    test("mergeSpasmEventsV2() tests for merging events with and without sharedBy", () => {
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
        const dmpConvertedWithAnotherSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0xanother" }]
            }
        };
        const dmpConvertedWithThreeSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [
                    { value: "0x12345" },
                    { value: "0x67890" },
                    { value: "0xanother" }
                ]
            }
        };
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConverted)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConverted)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy),
            (0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithThreeSharedBy)));
    });
    test("mergeSpasmEventsV2() tests for merging events with parent event", () => {
        const spasmParent = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2);
        const spasmReply = (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEvent);
        const spasmReplyWithSpasmParent = (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]))
            .toStrictEqual((0, index_js_1.copyOf)(spasmReplyWithSpasmParent));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(spasmReplyWithSpasmParent))));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]).parent.event)
            .toStrictEqual((0, index_js_1.copyOf)(spasmParent));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]).parent.event?.title)
            .toStrictEqual("genesis");
    });
    test("mergeSpasmEventsV2() should merge events with stats", () => {
        const event1WithoutStats = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithStats = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats;
        const event1WithStatsOld = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld;
        const event1WithStatsNew = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew;
        const event2WithStats = _events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2;
        // Same event
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event1WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsOld));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsNew)
        ]).stats[0].action)
            .toStrictEqual("react");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).not.toEqual(null);
        // Merge with different event
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event2WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event2WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
    });
    test("mergeSpasmEventsV2() should merge events with db", () => {
        const event1WithoutDb = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithDb = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb;
        const event1WithDbNew = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew;
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithoutDb)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutDb));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithDb));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithDbNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ])).not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.key).toStrictEqual(1337);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.table).toStrictEqual("spasm_events");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.updatedTimestamp).toStrictEqual(1642074686195);
    });
    test("mergeSpasmEventsV2() should merge events with children", () => {
        const event1WithoutChildren = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithOneChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild;
        const event1WithAnotherChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild;
        const event1WithAnotherChildWithoutEvent = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent;
        const event1WithBothChildren = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren;
        const event1WithBothChildrenReverse = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse;
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithoutChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithOneChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithOneChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithBothChildren),
            (0, index_js_1.copyOf)(event1WithBothChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithOneChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithoutChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildrenReverse));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChildWithoutEvent),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithAnotherChildWithoutEvent)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ]).children[1].event?.content).toStrictEqual("To the moon!");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).not.toEqual(null);
    });
});
// mergeDifferentSpasmEventsV2()
describe("mergeDifferentSpasmEventsV2() tests", () => {
    test("mergeDifferentSpasmEventsV2() tests with many events", () => {
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent)
        ])[0].title).toStrictEqual("genesis");
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent)
        ])[0]).not.toEqual(null);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSignature),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            null, undefined, false, true, "hello world", 1, [], {},
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
    });
});
// checkIfArrayHasThisEvent()
describe("checkIfArrayHasThisEvent() function tests", () => {
    test("checkIfArrayHasThisEvent()", () => {
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(null))).toStrictEqual(false);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(false);
        // Should return true because it's the same event, but one
        // is signed, while another one is unsigned
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
    });
});
// appendToArrayIfEventIsUnique()
// prependToArrayIfEventIsUnique()
describe("appendToArrayIfEventIsUnique() function tests", () => {
    test("appendToArrayIfEventIsUnique() should push to array", () => {
        const event1 = (0, index_js_1.copyOf)(_events_data_js_1.validRssItemWithEmojiConvertedToSpasmEvent2);
        const event2 = (0, index_js_1.copyOf)(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2);
        const event3 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2);
        const event3signed = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const event4 = (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventBodySignedClosedV2);
        const array1 = [(0, index_js_1.copyOf)(event2), (0, index_js_1.copyOf)(event3)];
        expect(array1.length).toStrictEqual(2);
        (0, index_js_1.prependToArrayIfEventIsUnique)(array1, event1);
        expect(array1.length).toStrictEqual(3);
        expect(array1[0].content).toStrictEqual(event1.content);
        expect(array1[1].content).toStrictEqual(event2.content);
        expect(array1[2].content).toStrictEqual(event3.content);
        expect(array1[0]).toStrictEqual(event1);
        // Append without converting to SpasmEvent
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, event4, false, false);
        expect(array1.length).toStrictEqual(4);
        expect(array1[0].content).toStrictEqual(event1.content);
        expect(array1[1].content).toStrictEqual(event2.content);
        expect(array1[2].content).toStrictEqual(event3.content);
        // Event is unchanged
        expect(array1[3].type).toStrictEqual(event4.type);
        expect('content' in array1[3]).toStrictEqual(false);
        expect(array1[3]).toStrictEqual(event4);
        // Nothing happens when appending duplicate without merging
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event4), false, false);
        expect(array1.length).toStrictEqual(4);
        expect(array1[3].type).toStrictEqual(event4.type);
        expect('content' in array1[3]).toStrictEqual(false);
        expect(array1[3]).toStrictEqual(event4);
        // Re-inserting the same event, but converted to SpasmEvent
        array1.pop();
        expect(array1.length).toStrictEqual(3);
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event4));
        expect(array1.length).toStrictEqual(4);
        expect(array1[3]).toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(event4));
        // Nothing happens when inserting signed event without merging
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event3signed), false, false);
        expect(array1.length).toStrictEqual(4);
        expect('signatures' in array1[2]).toStrictEqual(false);
        expect(array1[2]).toStrictEqual(event3);
        // Unsigned event should be replaced with signed event
        // because merging is enabled by default
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event3signed));
        expect(array1.length).toStrictEqual(4);
        expect('signatures' in array1[2]).toStrictEqual(true);
        expect(array1[2]).toStrictEqual(event3signed);
        expect(array1[2]).not.toEqual(event3);
        // Final result
        expect(array1[0]).toStrictEqual(event1);
        expect(array1[1]).toStrictEqual(event2);
        expect(array1[2]).toStrictEqual(event3signed);
        expect(array1[3]).toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(event4));
    });
});
// mergeStatsV2()
describe("mergeStatsV2() function tests", () => {
    test("mergeStatsV2() should merge different stats", () => {
        const statReactOld = {
            action: "react",
            latestTimestamp: 1641077686178,
            latestDbTimestamp: 1644077686178,
            contents: [
                {
                    value: "upvote",
                    total: 2
                }
            ]
        };
        const statReactNew = {
            action: "react",
            latestTimestamp: 1642077686178,
            latestDbTimestamp: 1643077686178,
            contents: [
                {
                    value: "upvote",
                    total: 3
                },
                {
                    value: "downvote",
                    total: 1
                },
            ]
        };
        const statReplyOld = {
            action: "reply",
            latestTimestamp: 1641087686178,
            latestDbTimestamp: 1644087686178,
            total: 15
        };
        const statReplyNew = {
            action: "reply",
            latestTimestamp: 1642087686178,
            latestDbTimestamp: 1643087686178,
            total: 23
        };
        const statsReactOld = [statReactOld];
        const statsReactNew = [statReactNew];
        const statsReplyOld = [statReplyOld];
        const statsReplyNew = [statReplyNew];
        const statsAllOld = [statReactOld, statReplyOld];
        const statsAllMix = [statReactOld, statReplyNew];
        const statsAllNew = [statReactNew, statReplyNew];
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactOld), (0, index_js_1.copyOf)(statsReactNew)
        ])[0].action).toStrictEqual("react");
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactOld), (0, index_js_1.copyOf)(statsReactNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsReactNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReplyOld), (0, index_js_1.copyOf)(statsReplyNew)
        ])[0].action).toStrictEqual("reply");
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReplyOld), (0, index_js_1.copyOf)(statsReplyNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsReplyNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllMix)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllMix),
            (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllMix), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllMix), (0, index_js_1.copyOf)(statsAllOld),
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllNew), (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactNew), (0, index_js_1.copyOf)(statsAllMix)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), null
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            null, (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual(null);
    });
});
// addEventsToTree()
describe("addEventsToTree() function tests", () => {
    test("addEventsToTree() should return original event if no tree events were provided", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), [])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
    });
    test("addEventsToTree() should add one comment to an event without any comments", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild));
    });
    test("addEventsToTree() should add one comment to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild));
    });
    test("addEventsToTree() should add one comment to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).not.toEqual(null);
    });
    test("addEventsToTree() should add two comments to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse));
    });
    test("addEventsToTree() should add two comments to an event without any children", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), [
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren));
    });
    test("addEventsToTree() should add attach only related events", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), [
            // Add many unrelated events
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren));
    });
    test("addEventsToTree() should only add related parent event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2), [
            // unrelated
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2));
    });
    test("addEventsToTree() should add a parent event to an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2), [
            // unrelated
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            // related
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent));
    });
    test("addEventsToTree() should add two comments to an event without any children", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached because maxDepth is 0
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 0 // maxDepth
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached, depth is already max
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        true, // ifRecursively
        10 // depth (current)
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached because direction is up
            // so only parent or root can be attached.
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        true, // ifRecursively
        0, // depth (current)
        "up")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            // Depth2 should not be attached because maxDepth is 1
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 1 // maxDepth
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            // Depth2 should not be attached since recursion disabled
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        false // ifRecursively
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            // No events merged because merge is disabled
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1),
        ], 10, // maxDepth
        true, // ifRecursively
        0, // depth (current)
        "any", // direction
        false // ifMerge
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Try to add many duplicate relatives
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Try many related and unrelated events
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithRssItemTitleHasSpecialChars),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            false,
            null,
            [],
            { id: 18081 },
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Add the same event
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2));
        // Merge if events have the same ID
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Merge if events have the same ID
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ]
        // No events should be added because depth 2 is missing
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        // Add parent and children any direction (up and down)
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus1));
        // Add parent and children any direction (up and down)
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            // order matters
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2));
        // Test direction to avoid adding
        // parent to child to parent to child to parent
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus1));
    });
});
// assignFormats()
describe("assignFormats() function tests", () => {
    test("assignFormats() should assign formats", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        (0, index_js_1.assignFormats)(input);
        expect(input).toStrictEqual(output);
    });
});
// toBeShortTimestamp()
describe("toBeShortTimestamp() function tests", () => {
    test("toBeShortTimestamp() should return short timestamp", () => {
        expect((0, index_js_1.toBeShortTimestamp)(1641074686178))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeShortTimestamp)("1641074686178"))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeTimestamp)("2024-04-27T00:00:00+00:00"))
            .toStrictEqual(1714176000000);
        expect((0, index_js_1.toBeShortTimestamp)("2024-04-27T00:00:00+00:00"))
            .toStrictEqual(1714176000);
        expect((0, index_js_1.toBeTimestamp)("Mon, 19 Feb 2025"))
            .toStrictEqual(1739923200000);
        expect((0, index_js_1.toBeShortTimestamp)("Mon, 19 Feb 2025"))
            .toStrictEqual(1739923200);
        expect((0, index_js_1.toBeTimestamp)("Wed, 19 Feb 2025 22:00:39 GMT"))
            .toStrictEqual(1740002439000);
        expect((0, index_js_1.toBeNostrTimestamp)(1641074686))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeNostrTimestamp)("1641074686"))
            .toStrictEqual(1641074686);
    });
});
// toBeDate()
describe("toBeDate() function tests", () => {
    test("toBeDate() should return date", () => {
        expect((0, index_js_1.toBeDate)(1641074686178))
            .toStrictEqual("Sat, 01 Jan 2022 22:04:46 GMT");
        expect((0, index_js_1.toBeDate)("1641074686178"))
            .toStrictEqual("Sat, 01 Jan 2022 22:04:46 GMT");
        expect((0, index_js_1.toBeDate)("2022-01-01T22:04:46+00:00"))
            .toStrictEqual("Sat, 01 Jan 2022 22:04:46 GMT");
        expect((0, index_js_1.toBeDate)(1714176000))
            .toStrictEqual("Sat, 27 Apr 2024 00:00:00 GMT");
        // Wrong weekday (Mon istead of Wed)
        expect((0, index_js_1.toBeDate)("Mon, 19 Feb 2025"))
            .toStrictEqual("Wed, 19 Feb 2025 00:00:00 GMT");
        expect((0, index_js_1.toBeDate)("Wed, 19 Feb 2025 22:00:39 GMT"))
            .toStrictEqual("Wed, 19 Feb 2025 22:00:39 GMT");
        expect((0, index_js_1.toBeDate)("hello world"))
            .toStrictEqual(null);
        expect((0, index_js_1.toBeDate)(0))
            .toStrictEqual(null);
    });
    test("toBeDate() aliases should return date", () => {
        expect((0, index_js_1.toBeShortDate)(1641074686178))
            .toStrictEqual("01 Jan 2022");
        expect((0, index_js_1.toBeDateShort)("1641074686178"))
            .toStrictEqual("01 Jan 2022");
        expect((0, index_js_1.toBeLongDate)("2022-01-01T22:04:46+00:00"))
            .toStrictEqual("01 Jan 2022 22:04:46");
        expect((0, index_js_1.toBeDateLong)(1714176000))
            .toStrictEqual("27 Apr 2024 00:00:00");
        // Wrong weekday (Mon istead of Wed)
        expect((0, index_js_1.toBeFullDate)("Mon, 19 Feb 2025"))
            .toStrictEqual("Wed, 19 Feb 2025 00:00:00 GMT");
        expect((0, index_js_1.toBeDateFull)("Wed, 19 Feb 2025 22:00:39 GMT"))
            .toStrictEqual("Wed, 19 Feb 2025 22:00:39 GMT");
        expect((0, index_js_1.toBeShortDate)("hello world"))
            .toStrictEqual(null);
        expect((0, index_js_1.toBeLongDate)(0))
            .toStrictEqual(null);
    });
});
// isHex()
// isNostrHex()
describe("isHex() and isNostrHex() function tests", () => {
    test("isHex() tests", () => {
        expect((0, index_js_1.isHex)(null)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(undefined)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(true)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(false)).toStrictEqual(false);
        expect((0, index_js_1.isHex)([1, 2, 3])).toStrictEqual(false);
        expect((0, index_js_1.isHex)(123)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(0)).toStrictEqual(false);
        expect((0, index_js_1.isHex)({ id: 1 })).toStrictEqual(false);
        expect((0, index_js_1.isHex)("")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("0")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("0123456789abcdef")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("0123456789abcdefg")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("https://degenrocket.space")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(true);
    });
    test("isNostrHex() tests", () => {
        expect((0, index_js_1.isNostrHex)(null)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(undefined)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(true)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(false)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)([1, 2, 3])).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(123)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(0)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)({ id: 1 })).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0123456789abcdef")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0123456789abcdefg")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("https://degenrocket.space")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42")).toStrictEqual(true);
        expect((0, index_js_1.isNostrHex)("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(true);
    });
});
// Troubled events from monero.observer
describe("troubled events from monero.observer tests", () => {
    test("getAllSigners() should return true if true", () => {
        const spasmEvent = _events_data_js_1.validSpasmEventV2SourceMoneroObserverNbsp;
        const spasmEnvelope = _events_data_js_1.validSpasmEnvelopeV2SourceMoneroObserverSsp;
        expect((0, index_js_1.getAllSigners)(spasmEvent)).toStrictEqual((0, index_js_1.getAllSigners)(spasmEnvelope));
        // TODO
        // expect(
        //   getAllEventIds(spasmEvent)
        // ).toStrictEqual(
        //   getAllEventIds(spasmEnvelope)
        // );
        // expect(
        //   getSpasmId01(spasmEvent)
        // ).toStrictEqual(
        //   getSpasmId01(convertToSpasm(spasmEnvelope)!)
        // );
    });
});
// fakeAsString()
describe("fakeAsString() function tests", () => {
    test("fakeAsString() should return original value", () => {
        expect((0, index_js_1.fakeAsString)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsString)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsString)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsString)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsString)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsString)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsString)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// fakeAsNumber()
describe("fakeAsNumber() function tests", () => {
    test("fakeAsNumber() should return original value", () => {
        expect((0, index_js_1.fakeAsNumber)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsNumber)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsNumber)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsNumber)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsNumber)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsNumber)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsNumber)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// fakeAsArray()
describe("fakeAsArray() function tests", () => {
    test("fakeAsArray() should return original value", () => {
        expect((0, index_js_1.fakeAsArray)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsArray)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsArray)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsArray)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsArray)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsArray)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsArray)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// fakeAsNull()
describe("fakeAsNull() function tests", () => {
    test("fakeAsNull() should return original value", () => {
        expect((0, index_js_1.fakeAsNull)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsNull)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsNull)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsNull)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsNull)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsNull)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsNull)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// fakeAsAny()
describe("fakeAsAny() function tests", () => {
    test("fakeAsAny() should return original value", () => {
        expect((0, index_js_1.fakeAsAny)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsAny)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsAny)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsAny)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsAny)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsAny)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsAny)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// fakeAsObject()
describe("fakeAsObject() function tests", () => {
    test("fakeAsObject() should return original value", () => {
        expect((0, index_js_1.fakeAsObject)('')).toStrictEqual('');
        expect((0, index_js_1.fakeAsObject)('0')).toStrictEqual('0');
        expect((0, index_js_1.fakeAsObject)(0)).toStrictEqual(0);
        expect((0, index_js_1.fakeAsObject)('0123')).toStrictEqual('0123');
        expect((0, index_js_1.fakeAsObject)(null)).toStrictEqual(null);
        expect((0, index_js_1.fakeAsObject)([null])).toStrictEqual([null]);
        expect((0, index_js_1.fakeAsObject)({ a: 1 })).toStrictEqual({ a: 1 });
    });
});
// getMiteType()
describe("getMimeType() function tests", () => {
    test("getMimeType() should return proper mime type", () => {
        expect((0, index_js_1.getMimeType)('')).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)('0')).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)((0, index_js_1.fakeAsString)(0))).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)('0123')).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)((0, index_js_1.fakeAsString)(null))).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)((0, index_js_1.fakeAsString)([null]))).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)((0, index_js_1.fakeAsString)({ a: 1 }))).toStrictEqual('application/octet-stream');
        expect((0, index_js_1.getMimeType)('.mp5')).toStrictEqual('application/octet-stream');
        // Video
        expect((0, index_js_1.getMimeType)('.mp4')).toStrictEqual('video/mp4');
        expect((0, index_js_1.getMimeType)('.mov')).toStrictEqual('video/quicktime');
        expect((0, index_js_1.getMimeType)('avi')).toStrictEqual('video/x-msvideo');
        expect((0, index_js_1.getMimeType)('mKv')).toStrictEqual('video/x-matroska');
        expect((0, index_js_1.getMimeType)('weBM')).toStrictEqual('video/webm');
        expect((0, index_js_1.getMimeType)('.m4v')).toStrictEqual('video/mp4');
        expect((0, index_js_1.getMimeType)('.Wmv')).toStrictEqual('video/x-ms-wmv');
        expect((0, index_js_1.getMimeType)('.FLV')).toStrictEqual('video/x-flv');
        // Audio
        expect((0, index_js_1.getMimeType)('.mp3')).toStrictEqual('audio/mpeg');
        expect((0, index_js_1.getMimeType)('.wav')).toStrictEqual('audio/wav');
        expect((0, index_js_1.getMimeType)('.flac')).toStrictEqual('audio/flac');
        expect((0, index_js_1.getMimeType)('.ogg')).toStrictEqual('audio/ogg');
        expect((0, index_js_1.getMimeType)('.m4a')).toStrictEqual('audio/mp4');
        expect((0, index_js_1.getMimeType)('.aac')).toStrictEqual('audio/aac');
        expect((0, index_js_1.getMimeType)('.opus')).toStrictEqual('audio/opus');
        expect((0, index_js_1.getMimeType)('.wma')).toStrictEqual('audio/x-ms-wma');
        // Image
        expect((0, index_js_1.getMimeType)('.jpg')).toStrictEqual('image/jpeg');
        expect((0, index_js_1.getMimeType)('.jpeg')).toStrictEqual('image/jpeg');
        expect((0, index_js_1.getMimeType)('.png')).toStrictEqual('image/png');
        expect((0, index_js_1.getMimeType)('.gif')).toStrictEqual('image/gif');
        expect((0, index_js_1.getMimeType)('.bmp')).toStrictEqual('image/bmp');
        expect((0, index_js_1.getMimeType)('.webp')).toStrictEqual('image/webp');
        expect((0, index_js_1.getMimeType)('.ico')).toStrictEqual('image/vnd.microsoft.icon');
        expect((0, index_js_1.getMimeType)('.svg')).toStrictEqual('image/svg+xml');
        expect((0, index_js_1.getMimeType)('.tiff')).toStrictEqual('image/tiff');
        // Other
        expect((0, index_js_1.getMimeType)('.pdf')).toStrictEqual('application/pdf');
        expect((0, index_js_1.getMimeType)('.zip')).toStrictEqual('application/zip');
        expect((0, index_js_1.getMimeType)('.json')).toStrictEqual('application/json');
        expect((0, index_js_1.getMimeType)('.git')).toStrictEqual('application/git');
        // URLs
        expect((0, index_js_1.getMimeType)('https://degenrocket.space/video.mp4')).toStrictEqual('video/mp4');
        expect((0, index_js_1.getMimeType)('https://degenrocket.space/video.mp4?b=21m&s=21b')).toStrictEqual('video/mp4');
        expect((0, index_js_1.getMimeType)('https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4')).toStrictEqual('video/mp4');
        // names
        expect((0, index_js_1.getMimeType)('spasm-the-endgame-of-social-media.mp4')).toStrictEqual('video/mp4');
        // hashes
        expect((0, index_js_1.getMimeType)('spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4')).toStrictEqual('video/mp4');
        expect((0, index_js_1.getMimeType)('spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg?b=21m&s=21b')).toStrictEqual('image/jpeg');
    });
});
describe("getAllUrlsFromString() function tests", () => {
    test("getAllUrlsFromString() for links", () => {
        expect((0, index_js_1.getAllUrlsFromString)("audio3.mp3")).toStrictEqual([]);
        // https
        expect((0, index_js_1.getAllUrlsFromString)("https://degenrocket.space/audio1.mp3")).toStrictEqual(["https://degenrocket.space/audio1.mp3"]);
        // http
        expect((0, index_js_1.getAllUrlsFromString)("http://degenrocket.space/audio1.mp3")).toStrictEqual(["http://degenrocket.space/audio1.mp3"]);
        // uri
        expect((0, index_js_1.getAllUrlsFromString)("https://forum.spasm.network/audio1.mp3?b=21m&s=21b")).toStrictEqual(["https://forum.spasm.network/audio1.mp3?b=21m&s=21b"]);
        // trailing
        expect((0, index_js_1.getAllUrlsFromString)("https://degenrocket.space/audio1.mp3.?!)")).toStrictEqual(["https://degenrocket.space/audio1.mp3"]);
        // markdown
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!")).toStrictEqual(["https://degenrocket.space/video1.mp4"]);
        // markdown, multiple lines, multiple media files
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!\nWatch the second episode [here](https://degenrocket.space/video2.mp4)!\nSubscribe to [RSS feed](https://degenrocket.space/api/events?format=rss)")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/api/events?format=rss"
        ]);
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!\\nWatch the second episode [here](https://degenrocket.space/video2.mp4)!")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        // multiple lines, multiple media files
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode here: https://degenrocket.space/video1.mp4\nWatch the second episode here: https://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode here: https://degenrocket.space/video1.mp4\\nWatch the second episode here: https://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.getAllUrlsFromString)("Watch the first episode here:\nhttps://degenrocket.space/video1.mp4\nWatch the second episode here:\nhttps://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.extractAllUrlsFromString)("Watch the first episode here:\\nhttps://degenrocket.space/video1.mp4\\nWatch the second episode here:\\nhttps://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.parseStringForUrls)("https://degenrocket.space/ and https://forum.spasm.network/")).toStrictEqual([
            "https://degenrocket.space/",
            "https://forum.spasm.network/",
        ]);
    });
});
// ifFileNameOfMimeType()
describe("ifFileNameOfMimeType() function tests", () => {
    test("ifFileNameOfMimeType() should return true if true", () => {
        expect((0, index_js_1.ifFileNameOfMimeType)("https://forum.spasm.network/", ["audio", "image", "video"])).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("https://degenrocket.space/", ["video", "audio", "image"])).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode1", "video")).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode2.mp3", "video")).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode3.mp4", "video")).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode3.mp4", ["image"])).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode3.mp4", ["audio", "image"])).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode3.mp4", ["audio", "image", "video"])).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("episode3.mp4", ["video", "video", "video"])).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg?b=21m&s=21b", ["video", "audio"])).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg?b=21m&s=21b", ["video", "audio", "image"])).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg?b=21m&s=21b", ["video", "audio", "ima"])).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg?b=21m&s=21b", "Image")).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("https://degenrocket.space/video1.mp4", "audio")).toStrictEqual(false);
        expect((0, index_js_1.ifFileNameOfMimeType)("https://degenrocket.space/video1.mp4", "vIdEo")).toStrictEqual(true);
        expect((0, index_js_1.ifFileNameOfMimeType)("https://degenrocket.space/video1.mp4", ["audio", "video"])).toStrictEqual(true);
        expect((0, index_js_1.isFileNameOfMimeType)("https://degenrocket.space/video1.mp4?format=rss", ["audio", "video"])).toStrictEqual(true);
    });
});
// getAllMediaUrlsFromArrayOfUrls()
describe("getAllMediaUrlsFromArrayOfUrls() function tests", () => {
    test("getAllMediaUrlsFromArrayOfUrls() should return true if true", () => {
        const input = [
            "https://forum.spasm.network/audio1.mp3?b=21m&s=21b",
            "https://degenrocket.space/api/events?format=rss",
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/image1.jpeg",
            "https://forum.spasm.network/",
            "https://degenrocket.space/",
        ];
        // default media types
        expect((0, index_js_1.getAllMediaUrlsFromArrayOfUrls)(input)).toStrictEqual([
            "https://forum.spasm.network/audio1.mp3?b=21m&s=21b",
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/image1.jpeg",
        ]);
        expect((0, index_js_1.getAllMediaUrlsFromArrayOfUrls)(input, ["video", "audio", "image"])).toStrictEqual([
            "https://forum.spasm.network/audio1.mp3?b=21m&s=21b",
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/image1.jpeg",
        ]);
        expect((0, index_js_1.filterAllMediaUrlsFromArrayOfUrls)(input, ["audio", "image"])).toStrictEqual([
            "https://forum.spasm.network/audio1.mp3?b=21m&s=21b",
            "https://degenrocket.space/image1.jpeg",
        ]);
        expect((0, index_js_1.getAllMediaUrlsOfMimeTypeFromArrayOfUrls)(input, "image")).toStrictEqual([
            "https://degenrocket.space/image1.jpeg",
        ]);
        expect((0, index_js_1.getAllUrlsOfMediaTypeFromArrayOfUrls)(input, ["video", "audio"])).toStrictEqual([
            "https://forum.spasm.network/audio1.mp3?b=21m&s=21b",
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
    });
});
describe("getAllMediaUrlsFromString() function tests", () => {
    test("getAllMediaUrlsFromString() for links", () => {
        expect((0, index_js_1.getAllMediaUrlsFromString)("audio3.mp3")).toStrictEqual([]);
        // https
        expect((0, index_js_1.getAllMediaUrlsFromString)("https://degenrocket.space/audio1.mp3")).toStrictEqual(["https://degenrocket.space/audio1.mp3"]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("https://degenrocket.space/audio1.mp3", ["video", "audio"])).toStrictEqual(["https://degenrocket.space/audio1.mp3"]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("https://degenrocket.space/audio1.mp3", ["video"])).toStrictEqual([]);
        // http
        expect((0, index_js_1.getAllMediaUrlsFromString)("http://degenrocket.space/audio1.mp3", ["video", "audio"])).toStrictEqual(["http://degenrocket.space/audio1.mp3"]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("http://degenrocket.space/audio1.mp3", ["image", "video"])).toStrictEqual([]);
        // uri
        expect((0, index_js_1.getAllMediaUrlsFromString)("https://forum.spasm.network/audio1.mp3?b=21m&s=21b")).toStrictEqual(["https://forum.spasm.network/audio1.mp3?b=21m&s=21b"]);
        // trailing
        expect((0, index_js_1.getAllMediaUrlsFromString)("https://degenrocket.space/audio1.mp3.?!)")).toStrictEqual(["https://degenrocket.space/audio1.mp3"]);
        // markdown
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!")).toStrictEqual(["https://degenrocket.space/video1.mp4"]);
        // markdown inside image
        expect((0, index_js_1.getAllMediaUrlsFromString)("The first track [![cover](https://degenrocket.space/image.jpg)](https://degenrocket.space/audio.mp3)")).toStrictEqual(["https://degenrocket.space/image.jpg", "https://degenrocket.space/audio.mp3"]);
        // markdown, multiple lines, multiple media files
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!\nWatch the second episode [here](https://degenrocket.space/video2.mp4)!\nSubscribe to [RSS feed](https://degenrocket.space/api/events?format=rss)")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode [here](https://degenrocket.space/video1.mp4)!\\nWatch the second episode [here](https://degenrocket.space/video2.mp4)!")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        // multiple lines, multiple media files
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode here: https://degenrocket.space/video1.mp4\nWatch the second episode here: https://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode here: https://degenrocket.space/video1.mp4\\nWatch the second episode here: https://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.getAllMediaUrlsFromString)("Watch the first episode here:\nhttps://degenrocket.space/video1.mp4\nWatch the second episode here:\nhttps://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.extractAllMediaUrlsFromString)("Watch the first episode here:\\nhttps://degenrocket.space/video1.mp4\\nWatch the second episode here:\\nhttps://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
        ]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/")).toStrictEqual([]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4")).toStrictEqual([
            "https://forum.spasm.network/image.jpeg",
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/audio1.mp3",
            "https://degenrocket.space/audio2.mp3",
        ]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4", ["audio"])).toStrictEqual([
            "https://degenrocket.space/audio1.mp3",
            "https://degenrocket.space/audio2.mp3",
        ]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4", ["audio", "video"])).toStrictEqual([
            "https://degenrocket.space/video1.mp4",
            "https://degenrocket.space/video2.mp4",
            "https://degenrocket.space/audio1.mp3",
            "https://degenrocket.space/audio2.mp3",
        ]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4", ["image"])).toStrictEqual([
            "https://forum.spasm.network/image.jpeg",
        ]);
        expect((0, index_js_1.parseStringForMediaUrls)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4", [])).toStrictEqual([]);
        expect((0, index_js_1.parseFirstAudioOrVideoUrlFromString)("https://degenrocket.space/ and https://forum.spasm.network/ \n![image](https://forum.spasm.network/image.jpeg)\nMore episodes:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4\nAnd audio files: https://degenrocket.space/audio1.mp3, https://degenrocket.space/audio2.mp3\nAnd duplicates:\nhttps://degenrocket.space/video1.mp4\nhttps://degenrocket.space/video2.mp4")).toStrictEqual("https://degenrocket.space/video1.mp4");
        expect((0, index_js_1.parseFirstAudioOrVideoUrlFromString)("The first track [![cover](https://degenrocket.space/image.jpg)](https://degenrocket.space/audio.mp3)")).toStrictEqual("https://degenrocket.space/audio.mp3");
    });
});
describe("removeDuplicateTags() function tests", () => {
    test("removes completely duplicate tag arrays", () => {
        const tags = [
            ['e', '123', 'wss://relay.damus.io'],
            ['p', '456'],
            // Duplicate of first tag
            ['e', '123', 'wss://relay.damus.io'],
            ['e', '789', 'wss://relay.damus.io'],
        ];
        const result = (0, index_js_1.removeDuplicateTags)(tags);
        expect(result).toEqual([
            ['e', '123', 'wss://relay.damus.io'],
            ['p', '456'],
            ['e', '789', 'wss://relay.damus.io'],
        ]);
    });
    test('keeps tags with different values even if first element is same', () => {
        const tags = [
            ['e', '123', 'wss://relay.damus.io'],
            ['e', '456', 'wss://relay.damus.io'],
            // Different third element
            ['e', '123', 'wss://relay.nostr.com'],
        ];
        const result = (0, index_js_1.removeDuplicateNostrTags)(tags);
        expect(result).toEqual([
            ['e', '123', 'wss://relay.damus.io'],
            ['e', '456', 'wss://relay.damus.io'],
            ['e', '123', 'wss://relay.nostr.com'],
        ]);
    });
    test('handles empty array', () => {
        const tags = [];
        const result = (0, index_js_1.removeDuplicateTags)(tags);
        expect(result).toEqual([]);
    });
    test('handles array with single tag', () => {
        const tags = [['p', '456']];
        const result = (0, index_js_1.removeDuplicateTags)(tags);
        expect(result).toEqual([['p', '456']]);
    });
    test('preserves order of unique tags', () => {
        const tags = [
            ['p', '111'],
            ['e', '222'],
            ['p', '111'], // Duplicate
            ['d', '333'],
            ['e', '222'], // Duplicate
        ];
        const result = (0, index_js_1.removeDuplicateTags)(tags);
        expect(result).toEqual([
            ['p', '111'],
            ['e', '222'],
            ['d', '333'],
        ]);
    });
    test('handles tags with duplicate values inside a single tag', () => {
        const tags = [
            // Duplicate '123' inside tag
            ['e', '123', '123', 'wss://relay.damus.io'],
            // Duplicate '456' inside tag
            ['p', '456', '456'],
        ];
        const result = (0, index_js_1.removeDuplicateTags)(tags);
        // Should keep the tags as-is,
        // including duplicate values inside each tag
        expect(result).toEqual([
            ['e', '123', '123', 'wss://relay.damus.io'],
            ['p', '456', '456'],
        ]);
    });
});
// getSpasmTagByName()
describe("getSpasmTagByName() function tests", () => {
    test("getSpasmTagByName() should return true if true", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.SpasmEventV2ToTestSpasmid01);
        const output = input.tags[3];
        expect((0, index_js_1.getSpasmTagByName)(input, "01")).toStrictEqual(null);
        expect((0, index_js_1.getOneTagByName)(input, "tag5-0")).toStrictEqual(output);
    });
});
// template()
describe("template() function tests", () => {
    test("template() should return true if true", () => {
        const input = true;
        const output = true;
        expect(input).toStrictEqual(output);
    });
});
//# sourceMappingURL=utils.test.js.map