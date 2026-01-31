"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_js_1 = require("./_events-data.js");
const convertToSpasm_js_1 = require("./../convert/convertToSpasm.js");
const getSpasmId_js_1 = require("./../convert/getSpasmId.js");
const index_js_1 = require("../utils/index.js");
describe("getSpasmId tests", () => {
    test("should return true if true", () => {
        expect(true).toBe(true);
    });
});
// getSpasmId() for invalid data types
describe("getSpasmId() tests invalid data types", () => {
    test("should return null for invalid data types", () => {
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(null))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(undefined))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(0))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(1))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(true))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(false))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)(""))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)("hello"))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)([1, 2, 3]))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)({ a: "hello" }))).toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)((0, index_js_1.fakeAsObject)({ type: "hello" }))).toEqual(null);
    });
});
// getSpasmId() for DMP events
describe("getSpasmId() tests for DMP events", () => {
    test("should get Spasm ID of validDmpEventConvertedToSpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        const output = "spasmid0103086d8c9881aa566b755d0b50fc0c80ab4362224860ee21859e658f64cca4c3";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of  validDmpEventSignedClosedConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        const output = "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validDmpEventSignedOpenedConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const output = "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validPostWithDmpEventSignedClosedConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2));
        const output = "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validSpasmWithDmpReplyToDmpEventV0", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0));
        const output = "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9";
        expect((0, getSpasmId_js_1.getSpasmId)((0, convertToSpasm_js_1.convertToSpasm)(input))).toEqual(output);
    });
});
// getSpasmId() for Nostr events
describe("getSpasmId() tests for Nostr events", () => {
    test("should get Spasm ID of validNostrEventConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventConvertedToSpasmV2));
        const output = "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    // validNostrEventConvertedToSpasmV2
    // validNostrEventSignedOpenedConvertedToSpasmV2
    // validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2
    test("Spasm IDs of signed and unsigned Nostr events should be equal", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventConvertedToSpasmV2));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const output2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output2));
    });
    test("should get Spasm ID of validNostrSpasmEventConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2));
        const output = "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validNostrSpasmEventSignedOpenedConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const output = "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
        const output = "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("Spasm IDs of signed and unsigned Nostr Spasm events should be equal", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const output2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output2));
    });
    test("should get Spasm ID of validPostWithNostrReplyToDmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithNostrReplyToDmpEvent));
        const output = "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0";
        expect((0, getSpasmId_js_1.getSpasmId)((0, convertToSpasm_js_1.convertToSpasm)(input))).toEqual(output);
    });
});
// getSpasmId() for web2 posts (e.g., RSS items)
describe("getSpasmId() tests for web2 posts", () => {
    test("should get Spasm ID of validSpasmEventRssItemV0", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(null);
    });
    test("should get Spasm ID of validSpasmEventRssItemV0ConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        // console.log("input normal:", input)
        const output = "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
    test("should get Spasm ID of validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2));
        // console.log("input reverse:", input)
        const output = "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual(output);
    });
});
// SpasmEventV2ToTestSpasmid01
// SpasmEventV2ConvertedToSpasmid01
// getSpasmId() for unsigned test events
describe("getSpasmId() tests for unsigned test events", () => {
    test("should get Spasm ID of SpasmEventV2ToTestSpasmid01", () => {
        const input = _events_data_js_1.SpasmEventV2ToTestSpasmid01;
        // const output = SpasmEventV2ConvertedToSpasmid01
        const output = "spasmid01774b98722bd3b3adcc102c3661bcc1b487004aa811440be8c893391e988f7a66";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toStrictEqual(output);
    });
    test("Spasm ID of SpasmEventV2ToTestSpasmid01", () => {
        const input = _events_data_js_1.SpasmEventV2ToTestSpasmid01;
        const output = {
            ..._events_data_js_1.SpasmEventV2ToTestSpasmid01
        };
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toStrictEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    // Changed not important keys
    test("Spasm ID of SpasmEventV2ToTestSpasmid01", () => {
        const input = _events_data_js_1.SpasmEventV2ToTestSpasmid01;
        const output = _events_data_js_1.SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys;
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toStrictEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    // Change important keys
    // Using deep copy (stringify and parse), because we will
    // change some keys in the output object for each test.
    test("Template for chanding important keys for SpasmEventV2ToTestSpasmid01", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Original unchanged title
        output.title = "Test title";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed parent id should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.parent.ids[0].value = "root-id-changed";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed parent marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.parent.marker = "parent-marker-changed";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed timestamp should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.timestamp = 1641074686179;
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed title should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.title = "Test title-new";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed action should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.action = "edit";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed content should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.content = "changed content";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author address should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[0].addresses[0].value = "changed author address";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author address format should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[0].addresses[0].format.name = "nostr-hex";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author username value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].usernames[0].value = "changed author username";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author username owner should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].usernames[0].owner = "changed author username owner";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author username protocol should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].usernames[0].protocol = "changed author username protocol";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author username proof should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].usernames[0].proof = "changed author username proof";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author username provider should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].usernames[0].provider = "changed author username provider";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed author marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.authors[1].marker = "changed author marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    // TODO write tests for tips if it'll be used for Spasm ID 01.
    test("Changed link value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.hosts[0].value = "changed host value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed host marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.hosts[0].marker = "changed host marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed link value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.links[0].value = "changed link value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed link marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.links[0].marker = "changed link marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed keywords should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.keywords[0] = "keyword2-changed";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed tag should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.tags[0][0] = "tag2-0-changed";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed media id value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.medias[0].ids[0].value = "changed media id value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed media hash value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.medias[0].hashes[0].value = "changed media hash value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed reference id value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.references[0].ids[0].value = "changed ref-id";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed reference marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.references[0].marker = "chaned reference marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention address should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].addresses[0].value = "changed mention address";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention address format should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].addresses[0].format.name = "nostr-hex";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention username value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].usernames[0].value = "changed mention username";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention username owner should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].usernames[0].owner = "changed mention username owner";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention username protocol should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].usernames[0].protocol = "changed mention username protocol";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention username proof should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].usernames[0].proof = "changed mention username proof";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention username provider should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].usernames[0].provider = "changed mention username provider";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed mention marker should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.mentions[1].marker = "changed mention marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed proof value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.proofs[0].value = "changed proof value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed proof link value should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.proofs[0].links[0].value = "changed proof link value";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed proof protocol name should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.proofs[1].protocol.name = "changed proof protocol name";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed proof protocol version should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.proofs[1].protocol.version = "changed proof protocol version";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed license should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.license = "changed license";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed language should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.language = "changed language";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Removing key from extra should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.extra.string = undefined;
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changing a key in extra should produce a different Spasm ID", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.extra.number = 3;
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed pow marker should produce a different Spasm ID only if that pow has 'spasmid01' marker with the highest difficulty", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.pows[2].marker = "changed pow marker";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed pow nonce should produce a different Spasm ID only if that pow has 'spasmid01' marker with the highest difficulty", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.pows[2].nonce = "change nonce";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed pow difficulty should produce a different Spasm ID only if that pow has 'spasmid01' marker with the highest difficulty", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.pows[2].difficulty = 21;
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Changed pow word should produce a different Spasm ID only if that pow has 'spasmid01' marker with the highest difficulty", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        const output = JSON.parse(JSON.stringify(_events_data_js_1.SpasmEventV2ToTestSpasmid01));
        // Changed:
        output.pows[2].words[0] = "changed word";
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(output));
    });
    test("Spasm ID 01 should be case-insensitive to values in tips", () => {
        const spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2WithOneNostrSigner));
        const input = (0, index_js_1.copyOf)(spasmEvent);
        const output = (0, index_js_1.copyOf)(spasmEvent);
        const invalidOutput = (0, index_js_1.copyOf)(spasmEvent);
        const upperCaseOutput = (0, index_js_1.copyOf)(spasmEvent);
        // Changed:
        invalidOutput.tips[0].address = "changed address";
        upperCaseOutput.tips[0].address =
            upperCaseOutput.tips[0].address.toUpperCase();
        upperCaseOutput.tips[0].text =
            upperCaseOutput.tips[0].text.toUpperCase();
        upperCaseOutput.tips[0].currency.name =
            upperCaseOutput.tips[0].currency.name.toUpperCase();
        upperCaseOutput.tips[0].currency.ticker =
            upperCaseOutput.tips[0].currency.ticker.toUpperCase();
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual(null);
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual(undefined);
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual("");
        expect(typeof ((0, getSpasmId_js_1.getSpasmId)(input))).toEqual("string");
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(output));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).not.toEqual((0, getSpasmId_js_1.getSpasmId)(invalidOutput));
        expect((0, getSpasmId_js_1.getSpasmId)(input)).toEqual((0, getSpasmId_js_1.getSpasmId)(upperCaseOutput));
    });
});
//# sourceMappingURL=getSpasmId.test.js.map