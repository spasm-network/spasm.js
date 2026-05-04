"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";
const index_js_1 = require("../utils/index.js");
const convertToSpasmSimple_js_1 = require("./../convert/convertToSpasmSimple.js");
const _events_data_js_1 = require("./_events-data.js");
describe("convertToSpasmSimple() tests", () => {
    test("should convert SpasmEventV0 (Post) with stats to SpasmEventDatabaseV2", () => {
        expect((0, convertToSpasmSimple_js_1.convertToSpasmSimple)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2)))
            .toStrictEqual(_events_data_js_1.validDmpEventConvertedToSimpleV2);
        expect((0, convertToSpasmSimple_js_1.convertToSpasmSimple)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)))
            .toStrictEqual(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2ConvertedToSimpleV2);
    });
});
//# sourceMappingURL=convertToSpasmSimple.test.js.map