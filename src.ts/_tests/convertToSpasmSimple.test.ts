// import {
//   SpasmEventV2
// } from "../types/interfaces.js";
import {copyOf} from "../utils/index.js";
import {
  convertToSpasmSimple
} from "./../convert/convertToSpasmSimple.js"
import {
  validDmpEventConvertedToSpasmEventV2,
  validDmpEventConvertedToSimpleV2,
  // validDmpEventSignedClosedConvertedToSpasmV2,
  // validDmpEventSignedOpenedConvertedToSpasmV2,
  // validNostrEventConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2ConvertedToSimpleV2,
  // validNostrSpasmEventConvertedToSpasmV2,
  // validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
  // validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2,
  // validPostWithDmpEventSignedClosedConvertedToSpasmV2,
  // validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2,
  // validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2,
  // validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2
} from "./_events-data.js";


describe("convertToSpasmSimple() tests", () => {
  test("should convert SpasmEventV0 (Post) with stats to SpasmEventDatabaseV2", () => {
    expect(convertToSpasmSimple(copyOf(validDmpEventConvertedToSpasmEventV2)))
    .toStrictEqual(validDmpEventConvertedToSimpleV2);
    expect(convertToSpasmSimple(copyOf(validNostrEventSignedOpenedConvertedToSpasmV2)))
    .toStrictEqual(validNostrEventSignedOpenedConvertedToSpasmV2ConvertedToSimpleV2);
  });
});
