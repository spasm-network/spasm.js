// import {
//   validSpasmEventBodyV2WithManyDuplicateValues,
// } from "./_events-data.js"
// import {
//   copyOf,
// } from "../utils/utils.js";
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";
// import {convertToSpasm} from "../convert/convertToSpasm.js";
// import {convertToNostr} from "../convert/convertToNostr.js";
// import {getSpasmId01} from "../convert/getSpasmId.js";

describe("convertToSpasm() tests for events with multiple duplicate values", () => {
  // const spasmEvent: SpasmEventV2 =
  //   convertToSpasm(validSpasmEventBodyV2WithManyDuplicateValues)!
  // const spasmEventToNostr = convertToNostr(copyOf(spasmEvent))
  // const spasmEventToNostrToSpasm = convertToSpasm(spasmEventToNostr!)
  // const id1 = getSpasmId01(copyOf(spasmEvent))
  // const id2 = getSpasmId01(copyOf(spasmEventToNostrToSpasm))
  //
  // test("IDs should have string values", () => {
  //   expect(id1).not.toEqual(null);
  //   expect(id1).not.toEqual(undefined);
  //   expect(id1).not.toEqual("");
  //   expect(typeof(id1)).toStrictEqual("string")
  //   expect(id2).not.toEqual(null);
  //   expect(id2).not.toEqual(undefined);
  //   expect(id2).not.toEqual("");
  //   expect(typeof(id2)).toStrictEqual("string")
  // });
  //
  // test("IDs should be equal after converting Spasm to Nostr to Spasm", () => {
  //   expect(id1).toStrictEqual(id2)
  // });

  test("template", () => {
    expect(true).toStrictEqual(true)
  });
});
