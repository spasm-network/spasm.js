import {convertToSpasm} from '../convert/convertToSpasm.js';
import {
  ConvertToSpasmConfig,
  CustomConvertToSpasmConfig,
  SpasmEventBodyParentV2,
  SpasmEventEnvelopeV2,
  SpasmEventIdV2,
  SpasmEventStatV2,
  SpasmEventV2,
  UnknownEventV2
} from '../types/interfaces.js';
import {
  isObjectWithValues,
  getFormatFromId, getFormatFromAddress, getFormatFromValue,
  getHashOfString,
  keepTheseKeysInObject,
  keepTheseKeysInObjectsInArray,
  sortArrayOfObjects,
  sortArrayOfStringsAndNumbers,
  sortAuthorsForSpasmEventV2,
  sortMediasForSpasmid01,
  sortReferencesForSpasmid01,
  sortTagsForSpasmid01,
  sortParentForSpasmid01,
  executeFunctionForAllNestedValuesOfType,
  sanitizeEventWith,
  sanitizeEvent,
  mergeConfigs,
  hasSiblingDmp,
  hasSiblingNostr,
  hasSiblingWeb2,
  hasSignatureEthereum,
  hasSignatureNostr,
  getAllSigners,
  getVerifiedSigners,
  getAllSignatures,
  getSignersListedIn,
  isAnySignerListedIn,
  areAllSignersListedIn,
  getPubkeysListedIn,
  isAnyPubkeyListedIn,
  areAllPubkeysListedIn,
  getAllIdsFromArrayOfIdObjects,
  getAllEventIds,
  getAllParentIds,
  toBeSpasmEventV2,
  getIdByFormat,
  extractIdByFormat,
  extractSpasmId01,
  mergeSpasmEventsV2,
  mergeDifferentSpasmEventsV2,
  copyOf,
  mergeStatsV2,
  sortSpasmEventsV2ByDbAddedTimestamp,
  getStatByAction,
  getTotalOfReaction,
  getTotalOfMostPopularReaction,
  getTotalOfReply,
  getTotalOfAction,
  getTotalOfActionReply,
  getTotalOfReplyAction,
  getTotalOfReact,
  checkIfEventHasThisId,
  getEventById,
  getEventsByIds,
  isArrayOfStringsOrNumbers,
  ifArraysHaveCommonId,
  addEventsToTree,
  assignFormats,
  getParentIdByFormat,
  extractParentSpasmId01,
  extractParentIdByFormat,
  toBeShortTimestamp,
  toBeTimestamp,
  toBeNostrTimestamp,
  extractNostrEvent,
  extractSignedNostrEvent,
  extractNostrEvents,
  extractSignedNostrEvents,
  checkIfArrayHasThisEvent,
  appendToArrayIfEventIsUnique,
  prependToArrayIfEventIsUnique,
  extractIdFormatNameFromSpasmEventIdV2,
  extractAllIdFormatNamesFromSpasmEventV2,
  getAllFormatNamesFromSpasmEventV2,
  getAllFormatNamesFromEvent,
  isHex,
  isNostrHex,
  isValidUrl,
  findMostLikelyUrl,
  findMostLikelyGuid,
  hasSiblingSpasm,
  fakeAsString,
  fakeAsNumber,
  fakeAsArray,
  fakeAsNull,
  fakeAsAny,
  fakeAsObject,
  hasSignatureOfFormat
} from './../utils/index.js';
import {
  validDmpEvent, validDmpEventSignedClosed,
  validDmpEventSignedOpened, validPostWithDmpEventSignedClosed,
  validNostrEvent, validNostrSpasmEvent,
  validNostrEventSignedOpened, validNostrSpasmEventSignedOpened,
  validPostWithNostrSpasmEventSignedOpened,
  validDmpEventSignedOpenedConvertedToSpasmV2,
  validSpasmEventRssItemV0ConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2,
  validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
  validSpasmEventRssItemV0,
  validSpasmWithDmpReplyToDmpEventV0,
  validDmpEventSignedClosedConvertedToSpasmV2,
  validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent,
  validPostWithNostrReplyToDmpEvent,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew,
  validPostWithNostrReplyToDmpEventConvertedToSpasmV2,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew,
  validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren,
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild,
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild,
  validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse,
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent,
  validDmpEventConvertedToSpasmEventV2,
  validNostrSpasmEventSignedOpenedWithInvalidSignature,
  validNostrEventConvertedToSpasmV2,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2,
  validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2,
  validNostrSpasmEventConvertedToSpasmV2,
  validNostrReplyToDmpEvent,
  validNostrSpasmEventV2SingleSignedOpened,
  validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2,
  validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2,
  validRssItemWithEmojiConvertedToSpasmEvent2,
  validSpasmEventBodySignedClosedV2,
  validSpasmEventV2TreeDepth0_Post1,
  validSpasmEventV2TreeDepth1_Post1React1,
  validSpasmEventV2TreeDepth1_Post1Reply1,
  validSpasmTreeV2Depth0_Plus1,
  validSpasmEventV2TreeDepth1_Post1Reply2,
  validSpasmEventV2TreeDepth2_Post1Reply1Reply1,
  validSpasmTreeV2Depth0_Plus2,
  validSpasmEventV2TreeDepth2_Post1Reply2Reply1,
  validSpasmEventV2TreeDepth2_Post1Reply2React1,
  validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1,
  validSpasmTreeV2Depth0_Plus4,
  validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1,
  validSpasmTreeV2Depth2_Plus1,
  validSpasmTreeV2Depth2_Plus2,
  validPostWithRssItemTitleHasSpecialChars,
  validSpasmEventV2SourceMoneroObserverNbsp,
  validSpasmEnvelopeV2SourceMoneroObserverSsp,
  validSpasmEventV2WithTwoParentUrlIds,
  validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2,
  validPostWithRssItem,
  validSpasmEventBodyV2ConvertedToSpasmV2,
  validSpasmEventBodySignedClosedV2ConvertedToSpasmV2
} from "./_events-data.js"

import {
  validEthereumAddress1,
  invalidEthereumAddress1,
  validEthereumSignature1,
  invalidEthereumSignature1,
  validNpubAddress1,
  validId1Note, validId1Nevent, validId1Hex,
  validId0Spasmid01
} from "./_events-data.js"

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
    expect(isObjectWithValues(input)).toBe(false);
  });

  test("should return true if has a valid DmpEvent", () => {
    const input = JSON.parse(JSON.stringify(validDmpEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid DmpEventSignedClosed", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedClosed));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid DmpEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid PostWithDmpEventSignedClosed", () => {
    const input = JSON.parse(JSON.stringify(validPostWithDmpEventSignedClosed));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrEvent", () => {
    const input = JSON.parse(JSON.stringify(validNostrEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrSpasmEvent", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrSpasmEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid PostWithNostrSpasmEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validPostWithNostrSpasmEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return false if event is a string", () => {
    const input = JSON.stringify(validNostrEventSignedOpened);
    expect(isObjectWithValues(input)).toBe(false);
  });

  test("should return false if input is not an object", () => {
    expect(isObjectWithValues('')).toBe(false);
    expect(isObjectWithValues('abc')).toBe(false);
    expect(isObjectWithValues(null)).toBe(false);
    expect(isObjectWithValues(undefined)).toBe(false);
    expect(isObjectWithValues(0)).toBe(false);
    expect(isObjectWithValues(123)).toBe(false);
    expect(isObjectWithValues(true)).toBe(false);
    expect(isObjectWithValues(false)).toBe(false);
    expect(isObjectWithValues([1,2,3])).toBe(false);
  });
});

// isArrayOfStringsOrNumbers
describe("isArrayOfStringsOrNumbers() function tests", () => {
  test("should return false if input is null", () => {
    expect(isArrayOfStringsOrNumbers(null)).toBe(false);
  });
  test("should return false if input array has null value", () => {
    const input = [ null, 1 ]
    expect(isArrayOfStringsOrNumbers(input)).toBe(false);
  });
  test("should return true if input array has only numbers", () => {
    const input = [ 1, 2, 3 ]
    expect(isArrayOfStringsOrNumbers(input)).toBe(true);
  });
  test("should return true if input array has only strings", () => {
    const input = [ "one", "2", "null" ]
    expect(isArrayOfStringsOrNumbers(input)).toBe(true);
  });
  test("should return true if input array has only strings and numbers", () => {
    const input = [ "one", 2, "null" ]
    expect(isArrayOfStringsOrNumbers(input)).toBe(true);
  });
  test("should return false if input array has strings, numbers, and null", () => {
    const input = [ "one", 2, null ]
    expect(isArrayOfStringsOrNumbers(input)).toBe(false);
  });
  test("should return false if input array has no values", () => {
    const input = []
    expect(isArrayOfStringsOrNumbers(input)).toBe(false);
  });
  test("should return false if input is not an array", () => {
    expect(isArrayOfStringsOrNumbers('')).toBe(false);
    expect(isArrayOfStringsOrNumbers('abc')).toBe(false);
    expect(isArrayOfStringsOrNumbers(null)).toBe(false);
    expect(isArrayOfStringsOrNumbers(undefined)).toBe(false);
    expect(isArrayOfStringsOrNumbers(0)).toBe(false);
    expect(isArrayOfStringsOrNumbers(123)).toBe(false);
    expect(isArrayOfStringsOrNumbers(true)).toBe(false);
    expect(isArrayOfStringsOrNumbers(false)).toBe(false);
    expect(isArrayOfStringsOrNumbers({a:1,b:2})).toBe(false);
  });
});

// ifArraysHaveCommonId
describe("ifArraysHaveCommonId() function tests", () => {
  test("should return false if inputs are empty arrays", () => {
    const input1 = []
    const input2 = []
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input is empty array", () => {
    const input1 = [ 1, 2, 3 ]
    const input2 = []
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input is empty array", () => {
    const input1 = []
    const input2 = [ "one", 2 ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if inputs have no common values", () => {
    const input1 = [ 1, 2, 3 ]
    const input2 = [ 4 ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input has an object as value", () => {
    const input1 = [ 1, 2, "four", {} ] as (string | number)[]
    const input2 = [ 3, "four", "five" ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input has an array as value", () => {
    const input1 = [ 1, 2, "four" ]
    const input2 = [ 3, "four", "five", [] ] as (string | number)[]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input has null as value", () => {
    const input1 = [ 1, 2, "four" ]
    const input2 = [ 3, "four", "five", null] as (string | number)[]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return false if one input has undefined as value", () => {
    const input1 = [ 1, 2, "four" ]
    const input2 = [ 3, "four", "five", undefined] as (string | number)[]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(false);
  });
  test("should return true if inputs a common value number", () => {
    const input1 = [ 1, 2, 3 ]
    const input2 = [ 3, "four", "five" ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(true);
  });
  test("should return true if inputs a common value string", () => {
    const input1 = [ 1, 2, "four" ]
    const input2 = [ 3, "four", "five" ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(true);
  });
  test("should return true if inputs have same values", () => {
    const input1 = [ 1, 2, "four" ]
    const input2 = [ 1, 2, "four" ]
    expect(ifArraysHaveCommonId(input1,input2)).toBe(true);
  });
  test("should return false if one input is not an array", () => {
    expect(ifArraysHaveCommonId([1],fakeAsArray(null))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray(''))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray('1'))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray(false))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray(true))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray(0))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray(123))).toBe(false);
    expect(ifArraysHaveCommonId([1],fakeAsArray({a:1}))).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(null),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(''),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray('1'),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(false),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(true),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(0),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray(123),[1])).toBe(false);
    expect(ifArraysHaveCommonId(fakeAsArray({a:1}),[1])).toBe(false);
  });
});

// isValidUrl
describe("isValidUrl() function tests", () => {
  test("should return true if URL is valid, else false", () => {
    expect(isValidUrl(false)).toStrictEqual(false)
    expect(isValidUrl(null)).toStrictEqual(false)
    expect(isValidUrl(123)).toStrictEqual(false)
    expect(isValidUrl(0)).toStrictEqual(false)
    expect(isValidUrl([1])).toStrictEqual(false)
    expect(isValidUrl({url:'https://spasm.network'})).toStrictEqual(false)
    expect(isValidUrl('hellow world')).toStrictEqual(false)
    expect(isValidUrl('degenrocket.space')).toStrictEqual(false)
    expect(isValidUrl('ftp://degenrocket.space')).toStrictEqual(true)
    expect(isValidUrl('https://degenrocket.space')).toStrictEqual(true)
    expect(isValidUrl('https://forum.spasm.network')).toStrictEqual(true)
    expect(isValidUrl('https://one.two.three.four.com')).toStrictEqual(true)
    expect(isValidUrl('https://thedefiant.io')).toStrictEqual(true)
    expect(isValidUrl('https://thedefiant.io/news/123')).toStrictEqual(true)
    expect(isValidUrl('https://monero.observer')).toStrictEqual(true)
    expect(isValidUrl('mailto:monero.observer')).toStrictEqual(true)
    // TODO URL inside array returns true. Is it safe to change that?
    // expect(isValidUrl(['https://spasm.network'])).toStrictEqual(false)
  });
});

// getFormatFromId
describe("getFormatFromId() function tests", () => {
  test("should return proper format", () => {
    // const input = {};
    expect(getFormatFromId(validId1Hex)).toStrictEqual({
      name: "nostr-hex"
    });
    expect(getFormatFromId(validId1Note)).toStrictEqual({
      name: "nostr-note"
    });
    expect(getFormatFromId(validId1Nevent)).toStrictEqual({
      name: "nostr-nevent"
    });
    expect(getFormatFromId(validId0Spasmid01)).toStrictEqual({
      name: "spasmid",
      version: "01"
    });
    expect(getFormatFromId(validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value)).toStrictEqual({
      name: "spasmid",
      version: "01"
    });
    expect(getFormatFromId(validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value)).toStrictEqual({
      name: "ethereum-sig",
    });
    expect(getFormatFromId(validSpasmEventRssItemV0ConvertedToSpasmV2.ids![0].value)).toStrictEqual({
      name: "spasmid",
      version: "01"
    });
    expect(getFormatFromId(validSpasmEventRssItemV0ConvertedToSpasmV2.ids![1].value)).toStrictEqual({
      name: "url"
    });
  });
  test("should return null if cannot identify format", () => {
    expect(getFormatFromId('')).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString(null))).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString(0))).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString(true))).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString(false))).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString([1]))).toStrictEqual(null);
    expect(getFormatFromId(fakeAsString({a:1}))).toStrictEqual(null);
  });
});

// getFormatFromAddress
describe("getFormatFromAddress() function tests", () => {
  test("should return proper format", () => {
    // getFormatFromAddress
    expect(getFormatFromAddress(validNpubAddress1)).toStrictEqual({
      name: "nostr-npub"
    });
    expect(getFormatFromAddress(validEthereumAddress1)).toStrictEqual({
      name: "ethereum-pubkey"
    });
    expect(getFormatFromAddress(fakeAsString('abc'))).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromAddress(fakeAsString(123))).toStrictEqual({
      name: "number"
    });
  });
  test("should return null if cannot identify format", () => {
    expect(getFormatFromAddress('')).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString(null))).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString(0))).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString(true))).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString(false))).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString([1]))).toStrictEqual(null);
    expect(getFormatFromAddress(fakeAsString({a:1}))).toStrictEqual(null);
  });
});

// getFormatFromValue
describe("getFormatFromValue() function tests", () => {
  test("should return proper format", () => {
    expect(getFormatFromValue(validEthereumAddress1)).toStrictEqual({
      name: "ethereum-pubkey"
    });
    expect(getFormatFromValue(invalidEthereumAddress1)).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(validEthereumSignature1)).toStrictEqual({
      name: "ethereum-sig"
    });
    expect(getFormatFromValue(invalidEthereumSignature1)).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(validId1Hex)).toStrictEqual({
      name: "nostr-hex"
    });
    expect(getFormatFromValue(validId1Note)).toStrictEqual({
      name: "nostr-note"
    });
    expect(getFormatFromValue(validId1Nevent)).toStrictEqual({
      name: "nostr-nevent"
    });
    expect(getFormatFromValue("https://degenrocket.space")).toStrictEqual({
      name: "url"
    });
    expect(getFormatFromValue("degenrocket.space")).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue("hello world")).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(123)).toStrictEqual({
      name: "number"
    });
  });
  test("should return null if cannot identify format", () => {
    expect(getFormatFromValue('')).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString(null))).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString(0))).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString(true))).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString(false))).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString([1]))).toStrictEqual(null);
    expect(getFormatFromValue(fakeAsString({a:1}))).toStrictEqual(null);
  });
});

// extractIdFormatNameFromSpasmEventIdV2
describe("extractIdFormatNameFromSpasmEventIdV2() tests", () => {
  test("should extract ID format name", () => {
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validDmpEventConvertedToSpasmEventV2.ids![0]
    ))).toStrictEqual("spasmid")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0]
    ))).toStrictEqual("spasmid")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1]
    ))).toStrictEqual("ethereum-sig")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids![0]
    ))).toStrictEqual("spasmid")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids![1]
    ))).toStrictEqual("nostr-hex")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids![2]
    ))).toStrictEqual("nostr-sig")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(true
    ))).toStrictEqual(null)
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validSpasmEventRssItemV0ConvertedToSpasmV2.ids![0]
    ))).toStrictEqual("spasmid")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validSpasmEventRssItemV0ConvertedToSpasmV2.ids![1]
    ))).toStrictEqual("url")
    expect(extractIdFormatNameFromSpasmEventIdV2(copyOf(
      validSpasmEventRssItemV0ConvertedToSpasmV2.ids![2]
    ))).toStrictEqual("guid")
  });
  test("should return null if cannot identify format", () => {
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject('') as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject(null) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject(0) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject(true) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject(false) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject([1]) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject({a:1}) as SpasmEventIdV2)).toStrictEqual(null);
    expect(extractIdFormatNameFromSpasmEventIdV2(
      fakeAsObject(undefined) as SpasmEventIdV2)).toStrictEqual(null);
  });
});

// extractAllIdFormatNamesFromSpasmEventV2
// getAllFormatNamesFromSpasmEventV2
// getAllFormatNamesFromEvent
describe("extractAllIdFormatNamesFromSpasmEventV2() tests", () => {
  test("should extract all ID format names", () => {
    expect(extractAllIdFormatNamesFromSpasmEventV2(copyOf(
      validDmpEventConvertedToSpasmEventV2
    ))).toStrictEqual(["spasmid"])
    expect(extractAllIdFormatNamesFromSpasmEventV2(copyOf(
      validDmpEventSignedClosedConvertedToSpasmV2
    ))).toStrictEqual(["spasmid","ethereum-sig"])
    expect(getAllFormatNamesFromSpasmEventV2(copyOf(
      validNostrSpasmEventSignedOpenedConvertedToSpasmV2
    ))).toStrictEqual(["spasmid","nostr-hex", "nostr-sig"])
    expect(getAllFormatNamesFromEvent(copyOf(
      validSpasmEventRssItemV0ConvertedToSpasmV2
    ))).toStrictEqual(["spasmid","url", "guid"])
  });
  test("should return null if cannot identify any format", () => {
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject('') as SpasmEventV2)).toStrictEqual(null);
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject(null) as SpasmEventV2)).toStrictEqual(null);
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject(0) as SpasmEventV2)).toStrictEqual(null);
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject(true) as SpasmEventV2)).toStrictEqual(null);
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject(false) as SpasmEventV2)).toStrictEqual(null);
    // TODO arrays and objects have Spasm ID, is that OK?
    // expect(extractAllIdFormatNamesFromSpasmEventV2(
    //   fakeAsObject([1]) as SpasmEventV2)).toStrictEqual(null);
    // expect(extractAllIdFormatNamesFromSpasmEventV2(
    //   fakeAsObject({a:1}) as SpasmEventV2)).toStrictEqual(null);
    expect(extractAllIdFormatNamesFromSpasmEventV2(
      fakeAsObject(undefined) as SpasmEventV2)).toStrictEqual(null);
  });
});

// getHashOfString()
describe("getHashOfString() function tests", () => {
  test("should return valid hash", () => {
    // const input = {};
    expect(getHashOfString("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(getHashOfString("hello world")).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
    expect(getHashOfString("1234567890-=!@#$%^&*()_+")).toBe("37af4cc38359f092b705241b286aaabf42aa6054fcb70016e971d63f9470793b");
    expect(getHashOfString('<br>line<div class="main">Main text</div>')).toBe("ca5588d79172608051a13af3f6692e656179ab0e1a4e6153ef5eb969687c4330");
    expect(getHashOfString("<br>line<div class='main'>Main text</div>")).toBe("6f7c80389ac8d9e6a5ce20539c569fcf7ab20b056f4b41cacfab391200472ec4");
    // Japanese
    expect(getHashOfString("ハローワールド")).toBe("9b58f66ce16f8efa41f9ea5fcc767ae639bb1ee83849efc1400da3832c6bff90");
    expect(getHashOfString(fakeAsString(null))).toStrictEqual("");
    expect(getHashOfString(fakeAsString(0))).toStrictEqual("");
    expect(getHashOfString(fakeAsString(true))).toStrictEqual("");
    expect(getHashOfString(fakeAsString(false))).toStrictEqual("");
    expect(getHashOfString(fakeAsString([1]))).toStrictEqual("");
    expect(getHashOfString(fakeAsString({a:1}))).toStrictEqual("");
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
    const output3 = { version: "123" }
    expect(keepTheseKeysInObject(input, ["id"])).toStrictEqual(output1);
    expect(keepTheseKeysInObject(input, ["addresses", "usernames"])).toStrictEqual(output2);
    expect(keepTheseKeysInObject(input, ["version", "invalid"])).toStrictEqual(output3);
    expect(keepTheseKeysInObject(input, ["invalid"])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [""])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString(null)])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString(0)])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString(false)])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString(true)])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString([1])])).toStrictEqual({});
    expect(keepTheseKeysInObject(input, [fakeAsString({a:1})])).toStrictEqual({});
    expect(keepTheseKeysInObject(fakeAsObject(null), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject(undefined), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject(0), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject(123), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject("123"), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject(true), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject(false), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObject(fakeAsObject([1]), ["id"])).toStrictEqual(null);
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
    const output1 = [{},{}];
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
    const output3 = [{ version: "123" }, { version: "456" }]
    expect(keepTheseKeysInObjectsInArray(input, ["id"])).toStrictEqual(output1);
    expect(keepTheseKeysInObjectsInArray(input, ["addresses", "usernames"])).toStrictEqual(output2);
    expect(keepTheseKeysInObjectsInArray(input, ["version", "invalid"])).toStrictEqual(output3);
    expect(keepTheseKeysInObjectsInArray(input, ["version", "invalid", fakeAsString(null)])).toStrictEqual(output3);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString(null)])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString(undefined)])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString(0)])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString(false)])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString(true)])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString([1])])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(input, [fakeAsString({a:1})])).toStrictEqual([{},{}]);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray(null), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray(undefined), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray(0), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray(false), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray(true), ["id"])).toStrictEqual(null);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray([1]), ["id"])).toStrictEqual([null]);
    expect(keepTheseKeysInObjectsInArray(fakeAsArray({a:1}), ["id"])).toStrictEqual(null);
  });
});

// sortArrayOfStringsAndNumbers()
describe("sortArrayOfStringsAndNumbers() function tests", () => {
  test("should return sorted array", () => {
    const input = ["1", 3, ["invalid", 0], undefined, null, {a:69, b:420, c: {d: "invalid again"}}, 2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4"];
    const output = ["1", 2, 3, "3a", "3ab", "4", "5", "abc1", "abc2", "abcd", ["invalid", 0], undefined, null,{a:69, b:420, c: {d: "invalid again"}}];
    expect(sortArrayOfStringsAndNumbers(input)).toStrictEqual(output);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(null))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(undefined))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(0))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(123))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(false))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray(true))).toStrictEqual([]);
    expect(sortArrayOfStringsAndNumbers(fakeAsArray({a:1}))).toStrictEqual([]);
  });
});

// sortArrayOfObjects()
describe("sortArrayOfObjects() function tests", () => {
  test("should return sorted array", () => {
    const input = [
      "3", 1, ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
      {title: "white"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1d234", title: "purple"},
      {id:"1a", title: "red"},
      {title: "black"},
      {value:"1c", title: "yellow"},
      {id:1, title: "green"},
    ];
    const output = [
      {id:1, title: "green"},
      {id:"1a", title: "red"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1c", title: "yellow"},
      {value:"1d234", title: "purple"},
      {title: "black"},
      {title: "white"},
      1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
      ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
    ];
    expect(sortArrayOfObjects(input, ["id", "value", "title"])).toStrictEqual(output);
    expect(sortArrayOfObjects(fakeAsArray(null), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray(undefined), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray(0), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray(123), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray(false), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray(true), ["id", "value", "title"])).toStrictEqual([]);
    expect(sortArrayOfObjects(fakeAsArray({a:1}), ["id", "value", "title"])).toStrictEqual([]);
  });
});


describe("sortSpasmEventsV2ByDbAddedTimestamp() tests", () => {
  test("should return sorted array", () => {
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpened)
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2)
    ]);
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validNostrEventSignedOpened),
      copyOf(validDmpEventSignedClosed)
    ])).toStrictEqual([
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    ]);
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpened)
    ])![0].title).toStrictEqual("genesis");
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpened)
    ])![0]).not.toEqual(null);
    // Default order is descending "desc"
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
      copyOf(validSpasmWithDmpReplyToDmpEventV0),
      copyOf(validNostrEventSignedOpened),
      copyOf(validPostWithDmpEventSignedClosed),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
    ])).toStrictEqual([
      copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2)
    ]);
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      copyOf(validDmpEventSignedClosed),
      copyOf(validSpasmWithDmpReplyToDmpEventV0),
      copyOf(validNostrEventSignedOpened),
      copyOf(validPostWithDmpEventSignedClosed),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
    ], "asc")).toStrictEqual([
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2)
    ]);
  });
  // invalid types
  test("should handle wrong types when sorting array", () => {
    expect(sortSpasmEventsV2ByDbAddedTimestamp([
      null,
      copyOf(validDmpEventSignedClosed),
      undefined,
      0,
      123,
      "abc",
      [1,2,3]
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    ]);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray(null)))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(
      fakeAsArray(undefined)
    )).toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray(0)))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray(123)))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray(false)))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray(true)))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray("123")))
      .toStrictEqual(null);
    expect(sortSpasmEventsV2ByDbAddedTimestamp(fakeAsArray({a:1})))
      .toStrictEqual(null);
  });
});

// sortAuthorsForSpasmEventV2()
describe("sortAuthorsForSpasmEventV2() function tests", () => {
  test("should return sorted array", () => {
    const input: any[] = [
      "3", 1, ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
      {title: "white"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1d234", title: "purple"},
      {id:"1a", title: "red"},
      {title: "black"},
      {value:"1c", title: "yellow"},
      {id:1, title: "green"},
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
    const output: any[] = [
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
      {id:1, title: "green"},
      {id:"1a", title: "red"},
      {id:"2a", value:"1b", title: "blue"},
      1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
      ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      {title: "white"},
      {value:"1d234", title: "purple"},
      {title: "black"},
      {value:"1c", title: "yellow"},
    ];
    expect(sortAuthorsForSpasmEventV2(input)).toStrictEqual(output);
  });
  test("should handle invalid types when sorting authors", () => {
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(null)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(undefined)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(0)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(123)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(false)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray(true)))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray("123")))
      .toStrictEqual([]);
    expect(sortAuthorsForSpasmEventV2(fakeAsArray({a:1})))
      .toStrictEqual([]);
  });
});

// sortMediasForSpasmid01
describe("sortMediasForSpasmid01() function tests", () => {
  test("sortMediasForSpasmid01() should return sorted medias", () => {
    const input = [
      // media 2
      { ids: [    { value: "mediaid2" },
                  { value: "mediaid5" },
                  { value: "mediaid4" } ],
        hashes: [ { value: "hash7" },
                  { value: "hash8" } ] },
      // media 1
      { ids: [    { value: "mediaid3" },
                  { value: "mediaid1" } ] },
      // media 6
      { extra: [  { value: "extra2" },
                  { value: "extra1" } ] },
      // media 4
      { hashes: [ { value: "hash6" },
                  { value: "hash5" } ] },
      // media 3
      { hashes: [ { value: "hash4" },
                  { value: "hash3" } ],
        links: [  { value: "link4" },
                  { value: "link2" } ] },
      // media 5
      { links: [  { value: "link3" },
                  { value: "link1" } ] }
    ];

    const output = [
      // media 1
      { ids: [    { value: "mediaid1" },
                  { value: "mediaid3" } ] },
      // media 2
      { ids: [    { value: "mediaid2" },
                  { value: "mediaid4" },
                  { value: "mediaid5" } ],
        hashes: [ { value: "hash7" },
                  { value: "hash8" } ] },
      // media 3
      { hashes: [ { value: "hash3" },
                  { value: "hash4" } ],
        links: [  { value: "link2" },
                  { value: "link4" } ] },
      // media 4
      { hashes: [ { value: "hash5" },
                  { value: "hash6" } ] },
      // media 5
      { links: [  { value: "link1" },
                  { value: "link3" } ] },
      // media 6
      { extra: [  { value: "extra2" },
                  { value: "extra1" } ] }
    ];
      
    expect(sortMediasForSpasmid01(input)).toStrictEqual(output);
  });
  test("should handle invalid types when sorting media", () => {
    expect(sortMediasForSpasmid01(fakeAsArray(null)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray(undefined)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray(0)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray(123)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray(false)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray(true)))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray("123")))
      .toStrictEqual([]);
    expect(sortMediasForSpasmid01(fakeAsArray({a:1})))
      .toStrictEqual([]);
  });
});

// sortParentForSpasmid01()
describe("sortParentForSpasmid01() function tests", () => {
  test("sortParentForSpasmid01() should return sorted parent", () => {
    const input = { ids: [ { value: "parent-id3" },
                           { value: "parent-id1b" },
                           { value: "parent-id1a" },
                           { value: "parent-idx" },
                           { value: "parent-id1" } ],
                    marker: "parent-marker1" };

    const output = { ids: [ { value: "parent-id1" },
                            { value: "parent-id1a" },
                            { value: "parent-id1b" },
                            { value: "parent-id3" },
                            { value: "parent-idx" } ],
                     marker: "parent-marker1" };

    expect(sortParentForSpasmid01(input)).toStrictEqual(output);
  });
  test("sortParentForSpasmid01() should handle invalid types", () => {
    expect(sortParentForSpasmid01(
      fakeAsObject(null) as SpasmEventBodyParentV2)
    ).toStrictEqual(null);
    expect(sortParentForSpasmid01(
      fakeAsObject(undefined) as SpasmEventBodyParentV2)
    ).toStrictEqual(undefined);
    expect(sortParentForSpasmid01(
      fakeAsObject(0) as SpasmEventBodyParentV2)
    ).toStrictEqual(0);
    expect(sortParentForSpasmid01(
      fakeAsObject(123) as SpasmEventBodyParentV2)
    ).toStrictEqual(123);
    expect(sortParentForSpasmid01(
      fakeAsObject(true) as SpasmEventBodyParentV2)
    ).toStrictEqual(true);
    expect(sortParentForSpasmid01(
      fakeAsObject(false) as SpasmEventBodyParentV2)
    ).toStrictEqual(false);
    expect(sortParentForSpasmid01(
      fakeAsObject([1]) as SpasmEventBodyParentV2)
    ).toStrictEqual([1]);
    expect(sortParentForSpasmid01(
      fakeAsObject({a:1}) as SpasmEventBodyParentV2)
    ).toStrictEqual({a:1});
  });
});

// sortReferencesForSpasmid01()
describe("sortReferencesForSpasmid01() function tests", () => {
  test("sortReferencesForSpasmid01() should return sorted references", () => {
    const input = [
      // reference 2
      { ids:    [ { value: "ref-id4" },
                  { value: "ref-id2" } ],
        marker: "ref-marker2" },
      // reference 1
      { ids:    [ { value: "ref-id3" },
                  { value: "ref-id1" } ],
        marker: "ref-marker1" },
    ];
    const output = [
      // reference 1
      { ids:    [ { value: "ref-id1" },
                  { value: "ref-id3" } ],
        marker: "ref-marker1" },
      // reference 2
      { ids:    [ { value: "ref-id2" },
                  { value: "ref-id4" } ],
        marker: "ref-marker2" },
    ];
    expect(sortReferencesForSpasmid01(input)).toStrictEqual(output);
  });
  test("should handle invalid types when sorting references", () => {
    expect(sortReferencesForSpasmid01(fakeAsArray(null)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray(undefined)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray(0)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray(123)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray(false)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray(true)))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray("123")))
      .toStrictEqual([]);
    expect(sortReferencesForSpasmid01(fakeAsArray({a:1})))
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
      ["license","SPDX-License-Identifier: CC0-1.0"],
      ["spasm_version","1.0.0"],
      ["spasm_action","reply"],
      ["spasm_target","0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    ];
    const output = [
      ["e", "event1", "event-marker2"],
      ["e", "event2", "event-marker1"],
      ["license","SPDX-License-Identifier: CC0-1.0"],
      ["p", "pubkey1", "marker1"],
      ["p", "pubkey2", "marker2"],
      ["p", "pubkey2", "marker3"],
      ["p", "pubkey2", "marker3", "extra1"],
      ["p", "pubkey2", "marker3", "extra2"],
      ["spasm_action","reply"],
      ["spasm_target","0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"],
      ["spasm_version","1.0.0"],
    ];
    expect(sortTagsForSpasmid01(input)).toStrictEqual(output);
  });
  test("should handle invalid types when sorting tags", () => {
    expect(sortTagsForSpasmid01(fakeAsArray(null)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray(undefined)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray(0)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray(123)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray(false)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray(true)))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray("123")))
      .toStrictEqual([[]]);
    expect(sortTagsForSpasmid01(fakeAsArray({a:1})))
      .toStrictEqual([[]]);
  });
});

// executeFunctionForAllNestedValuesOfType()
describe("executeFunctionForNestedValues() function tests", () => {
  const changeString = (value: any) => {
    if (typeof(value) === "string") {
      if (value === "世界") return "新" + value
      return "new " + value
    }
    return value
  }
  const changeNumber = (value: any) => {
    if (typeof(value) === "number") {
      if (value / 4 === 496) return value + 36
      return value * 10
    }
    return value
  }
  const changeBoolean = (value: any) => {
    if (typeof(value) === "boolean") {
      if (value) { return false } else { return true }
    }
    return value
  }
  const nestedArray = [
    "one", "two", [ "three" ], 4,
    [ 5, true, [ "six", 7, 8, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 19, true, "twenty", 21, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedStrings = [
    "new one", "new two", [ "new three" ], 4,
    [ 5, true, [ "new six", 7, 8, false ],
      {
        word: "new nine", 
        words: [ "new ten", "new eleven" ],
        number: 12,
        numbers: [ 13, 14 ],
        mix: [ 15, "new sixteen", "new seventeen", true, false, "new " ],
        object: {
          text: "new eighteen",
          booleans: [ true, false ],
          mix: [ 19, true, "new twenty", 21, false ]
        }
      }
    ]
  ]
  const nestedArrayWithChangedNumbers = [
    "one", "two", [ "three" ], 40,
    [ 50, true, [ "six", 70, 80, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 120,
          numbers: [ 130, 140 ],
          mix: [ 150, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 190, true, "twenty", 210, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedBooleans = [
    "one", "two", [ "three" ], 4,
    [ 5, false, [ "six", 7, 8, true ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", false, true, "" ],
          object: {
            text: "eighteen",
            booleans: [ false, true ],
            mix: [ 19, false, "twenty", 21, true ]
          }
        }
    ]
  ]
  const nestedObject = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArray))
    }
  }
  const nestedObjectWithChangedStrings = {
    content: "new hello",
    value: 31*64,
    valent: false,
    original: {
      content: "新世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
    }
  }
  const nestedObjectWithChangedNumbers = {
    content: "hello",
    value: (4 + 12 + 12 + 13) * 50 - 30,
    valent: false,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers))
    }
  }
  const nestedObjectWithChangedBooleans = {
    content: "hello",
    value: 31*64,
    valent: true,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans))
    }
  }
  test("should return undefined if input is a string", () => {
    const input = "hello world";
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input as Object, // bypass TypeScript type checking
        {
          customFunction: changeString,
          valueType: "string"
        }
      )
    }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.")
  });
  test("should return undefined if input is a number", () => {
    const input = 1;
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input as Object, // bypass TypeScript type checking
        {
          customFunction: changeNumber,
          valueType: "number"
        }
      )
    }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.")
  });
  test("should throw an error if maxium recursion depth exceeded", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input,
        {
          customFunction: changeString,
          valueType: "string",
          maxDepth: 3
        }
      )
    }).toThrow("Maximum recursion depth exceeded")
  });
  test("sanitizeEventWith should return empty array if maximum recursion depth exceeded", () => {
    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const input = JSON.parse(JSON.stringify(nestedArray));
    sanitizeEventWith(
      input,
      {
        customFunction: changeString,
        valueType: "string",
        maxDepth: 3
      }
    )
    expect(input).toStrictEqual([]);
    // Restore console errors
    jest.restoreAllMocks();
  });
  test("sanitizeEventWith should return empty object if maximum recursion depth exceeded", () => {
    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const input = JSON.parse(JSON.stringify(nestedObject));
    sanitizeEventWith(
      input,
      {
        customFunction: changeString,
        valueType: "string",
        maxDepth: 3
      }
    )
    expect(input).toStrictEqual({});
    // Restore console errors
    jest.restoreAllMocks();
  });
  test("should change all nested strings in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeString,
        valueType: "string"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested numbers in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested booleans in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeBoolean,
        valueType: "boolean"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested strings in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
        {
          customFunction: changeString,
          valueType: "string"
        }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested numbers in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedNumbers));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested booleans in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeBoolean,
        valueType: "boolean"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedBooleans));
    expect(input).toStrictEqual(output);
  });
  test("should not change anything", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeString,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArray));
    expect(input).toStrictEqual(output);
  });
  test("should not change anything", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "string"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArray));
    expect(input).toStrictEqual(output);
  });
});

// sanitizeEventWith()
describe("sanitizeEventWith() function tests", () => {
  const sanitizeStringFunction = (value: any) => {
    if (typeof(value) === "string") {
      return "sanitized " + value
    }
    return value
  }
  const nestedArray = [
    "one", "two", [ "three" ], 4,
    [ 5, true, [ "six", 7, 8, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 19, true, "twenty", 21, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedStrings = [
    "sanitized one", "sanitized two", [ "sanitized three" ], 4,
    [ 5, true, [ "sanitized six", 7, 8, false ],
      {
        word: "sanitized nine", 
        words: [ "sanitized ten", "sanitized eleven" ],
        number: 12,
        numbers: [ 13, 14 ],
        mix: [ 15, "sanitized sixteen", "sanitized seventeen", true, false, "sanitized " ],
        object: {
          text: "sanitized eighteen",
          booleans: [ true, false ],
          mix: [ 19, true, "sanitized twenty", 21, false ]
        }
      }
    ]
  ]
  const nestedObject = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArray))
    }
  }
  const nestedObjectWithChangedStrings = {
    content: "sanitized hello",
    value: 31*64,
    valent: false,
    original: {
      content: "sanitized world",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
    }
  }
  test("should sanitize all nested strings in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    sanitizeEventWith(
      input,
      {
        customFunction: sanitizeStringFunction
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
});

// sanitizeEvent()
describe("sanitizeEvent() function tests", () => {
  // Array with nested malicious HTML tags
  const nestedArrayDirty = [
    "one", "<img src=x onerror=alert(1)//>", [ "three" ], 4,
    [ 5, true, [ "<svg><g/onload=alert(2)//<p>", 7, 8, false ],
        {
          word: "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", '<math><mi//xlink:href="data:x,<script>alert(4)</script>">', true, false, "" ],
          object: {
            text: "<TABLE><tr><td>HELLO</tr></TABL>",
            booleans: [ true, false ],
            mix: [ 19, true, "<UL><li><A HREF=//google.com>click</UL>", 21, false ]
          }
        }
    ]
  ]
// DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
// DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
// DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
// DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
// DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
// DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
  const nestedObjectDirty = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArrayDirty))
    }
  }
  const eventDirty = JSON.parse(JSON.stringify(nestedObjectDirty))
  const nestedArrayClean = [
    "one", '<img src="x">', [ "three" ], 4,
    [ 5, true, [ "<svg><g></g></svg>", 7, 8, false ],
        {
          word: "<p>abc</p>",
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "<math><mi></mi></math>", true, false, "" ],
          object: {
            text: "<table><tbody><tr><td>HELLO</td></tr></tbody></table>",
            booleans: [ true, false ],
            mix: [ 19, true, '<ul><li><a href="//google.com">click</a></li></ul>', 21, false ]
          }
        }
    ]
  ]
  const nestedObjectClean = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArrayClean))
    }
  }
  const eventClean = JSON.parse(JSON.stringify(nestedObjectClean))

  test("should sanitize all nested strings in event", () => {
    const input = JSON.parse(JSON.stringify(eventDirty));
    sanitizeEvent(input)
    const output = JSON.parse(JSON.stringify(eventClean));
    expect(input).toStrictEqual(output);
  });
});

// mergeConfigs()
describe("mergeConfigs() function tests", () => {
  test("mergeConfigs() should merge two full configs", () => {
    const defaultConfig = new ConvertToSpasmConfig()
    const customConfig = new ConvertToSpasmConfig()
    customConfig.to.spasm.id.versions = ["02", "03"]
    customConfig.xss.enableSanitization = false

    const input = mergeConfigs(defaultConfig, customConfig)
    const output = new ConvertToSpasmConfig()
    output.to.spasm.id.versions = ["02", "03"]
    output.xss.enableSanitization = false
    expect(input).toEqual(output);
  });
  test("mergeConfigs() should merge full and partial configs", () => {
    const defaultConfig = new ConvertToSpasmConfig()
    const customConfigPartial: CustomConvertToSpasmConfig = {
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
    }

    const input = mergeConfigs(defaultConfig, customConfigPartial)
    const output = new ConvertToSpasmConfig()
    output.to.spasm.version = "1.0.0"
    output.to.spasm.id.versions = ["03"]
    output.xss.enableSanitization = false
    expect(input).toEqual(output);
  });
});

// hasSiblingDmp()
// hasSiblingNostr()
// hasSiblingWeb2()
// hasSiblingSpasm()
describe("hasSiblingSpasm() function tests", () => {
  test("hasSibling...() should return true if event has specified siblings", () => {
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
    const inputSpasm = JSON.parse(JSON.stringify(validSpasmEventBodySignedClosedV2ConvertedToSpasmV2));

    // hasSiblingSpasm()
    expect(hasSiblingSpasm(inputSpasm)).toEqual(true);
    expect(hasSiblingSpasm(inputDmp)).toEqual(false);
    expect(hasSiblingSpasm(inputNostr)).toEqual(false);
    expect(hasSiblingSpasm(inputNostrSpasm)).toEqual(false);
    expect(hasSiblingSpasm(inputWeb2)).toEqual(false);
    // hasSiblingDmp()
    expect(hasSiblingDmp(inputSpasm)).toEqual(false);
    expect(hasSiblingDmp(inputDmp)).toEqual(true);
    expect(hasSiblingDmp(inputNostr)).toEqual(false);
    expect(hasSiblingDmp(inputNostrSpasm)).toEqual(false);
    expect(hasSiblingDmp(inputWeb2)).toEqual(false);
    // hasSiblingNostr()
    expect(hasSiblingNostr(inputSpasm)).toEqual(false);
    expect(hasSiblingNostr(inputDmp)).toEqual(false);
    expect(hasSiblingNostr(inputNostr)).toEqual(true);
    expect(hasSiblingNostr(inputNostrSpasm)).toEqual(true);
    expect(hasSiblingNostr(inputWeb2)).toEqual(false);
    // hasSiblingWeb2()
    expect(hasSiblingWeb2(inputSpasm)).toEqual(false);
    expect(hasSiblingWeb2(inputDmp)).toEqual(false);
    expect(hasSiblingWeb2(inputNostr)).toEqual(false);
    expect(hasSiblingWeb2(inputNostrSpasm)).toEqual(false);
    expect(hasSiblingWeb2(inputWeb2)).toEqual(true);
  });
});

// hasSignatureOfFormat()
// hasSignatureEthereum()
// hasSignatureNostr()
describe("hasSignatureOfFormat() function tests", () => {
  test("hasSignatureOfFormat...() should return true if event has specified signature", () => {
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
    const inputSpasm = JSON.parse(JSON.stringify(validSpasmEventBodySignedClosedV2ConvertedToSpasmV2));
    const inputSpasmUnsigned = JSON.parse(JSON.stringify(validSpasmEventBodyV2ConvertedToSpasmV2));

    // hasSignatureOfFormat for invalid signature format
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(null) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(undefined) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(true) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(false) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(0) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString(1) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString("abc") as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString([1,2,3]) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, fakeAsString({a:1}) as "ethereum")).toEqual(false);

    expect(hasSignatureOfFormat(inputNostr, fakeAsString(null) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString(undefined) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString(true) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString(false) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString(0) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString(1) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString("abc") as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString([1,2,3]) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, fakeAsString({a:1}) as "ethereum")).toEqual(false);

    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(null) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(undefined) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(true) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(false) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(0) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString(1) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString("abc") as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString([1,2,3]) as "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, fakeAsString({a:1}) as "ethereum")).toEqual(false);

    // hasSignatureOfFormat for ethereum
    expect(hasSignatureOfFormat(inputSpasmUnsigned, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, "ethereum")).toEqual(true);
    expect(hasSignatureOfFormat(inputDmp, "ethereum")).toEqual(true);
    expect(hasSignatureOfFormat(inputNostr, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostrSpasm, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(inputWeb2, "ethereum")).toEqual(false);

    // hasSignatureOfFormat for nostr
    expect(hasSignatureOfFormat(inputSpasmUnsigned, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(inputSpasm, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(inputDmp, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(inputNostr, "nostr")).toEqual(true);
    expect(hasSignatureOfFormat(inputNostrSpasm, "nostr")).toEqual(true);
    expect(hasSignatureOfFormat(inputWeb2, "nostr")).toEqual(false);

    // hasSignatureEthereum()
    expect(hasSignatureEthereum(inputSpasmUnsigned)).toEqual(false);
    expect(hasSignatureEthereum(inputSpasm)).toEqual(true);
    expect(hasSignatureEthereum(inputDmp)).toEqual(true);
    expect(hasSignatureEthereum(inputNostr)).toEqual(false);
    expect(hasSignatureEthereum(inputNostrSpasm)).toEqual(false);
    expect(hasSignatureEthereum(inputWeb2)).toEqual(false);

    // hasSignatureNostr()
    expect(hasSignatureNostr(inputSpasmUnsigned)).toEqual(false);
    expect(hasSignatureNostr(inputSpasm)).toEqual(false);
    expect(hasSignatureNostr(inputDmp)).toEqual(false);
    expect(hasSignatureNostr(inputNostr)).toEqual(true);
    expect(hasSignatureNostr(inputNostrSpasm)).toEqual(true);
    expect(hasSignatureNostr(inputWeb2)).toEqual(false);
  });

  test("hasSignatureOfFormat...() should return false if event is invalid type", () => {
    // hasSignatureOfFormat for ethereum
    expect(hasSignatureOfFormat(fakeAsObject(null) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(undefined) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(0) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(1) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(true) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(false) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject("abc") as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject([1,2,3]) as SpasmEventV2, "ethereum")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject({a:1}) as SpasmEventV2, "ethereum")).toEqual(false);

    // hasSignatureOfFormat for nostr
    expect(hasSignatureOfFormat(fakeAsObject(null) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(undefined) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(0) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(1) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(true) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject(false) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject("abc") as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject([1,2,3]) as SpasmEventV2, "nostr")).toEqual(false);
    expect(hasSignatureOfFormat(fakeAsObject({a:1}) as SpasmEventV2, "nostr")).toEqual(false);

    // hasSignatureEthereum()
    expect(hasSignatureEthereum(fakeAsObject(null) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject(undefined) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject(0) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject(1) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject(true) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject(false) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject("abc") as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject([1,2,3]) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureEthereum(fakeAsObject({a:1}) as SpasmEventV2)).toEqual(false);


    // hasSignatureNostr()
    expect(hasSignatureNostr(fakeAsObject(null) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject(undefined) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject(0) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject(1) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject(true) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject(false) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject("abc") as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject([1,2,3]) as SpasmEventV2)).toEqual(false);
    expect(hasSignatureNostr(fakeAsObject({a:1}) as SpasmEventV2)).toEqual(false);
  });
});

describe("extractNostrEvents() function tests", () => {
  test("extractNostrEvents() should return null when passed invalid type", () => {
    expect(extractNostrEvent(fakeAsObject(null) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject(undefined) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject(0) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject(1) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject(true) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject(false) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject("abc") as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject([1,2,3]) as SpasmEventV2)).toStrictEqual(null)
    expect(extractNostrEvent(fakeAsObject({a:1}) as SpasmEventV2)).toStrictEqual(null)
  });
  test("extractNostrEvents() should extract valid Nostr event from Spasm event", () => {
    expect(extractNostrEvent(
      validDmpEventConvertedToSpasmEventV2
    )).toStrictEqual(null)
    expect(extractNostrEvent(
      validDmpEventSignedOpenedConvertedToSpasmV2
    )).toStrictEqual(null)
    expect(extractNostrEvent(
      validNostrEventConvertedToSpasmV2
    )).toStrictEqual(validNostrEvent)
    expect(extractSignedNostrEvent(
      validNostrEventConvertedToSpasmV2
    )).toStrictEqual(null)
    expect(extractSignedNostrEvent(
      validNostrEventSignedOpenedConvertedToSpasmV2
    )).toStrictEqual(validNostrEventSignedOpened)
    expect(extractSignedNostrEvent(
      validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2
    )).toStrictEqual(validNostrSpasmEventV2SingleSignedOpened)
    expect(extractNostrEvents(
      validNostrEventConvertedToSpasmV2
    )).toStrictEqual([validNostrEvent])
    expect(extractSignedNostrEvents(
      validNostrEventConvertedToSpasmV2
    )).toStrictEqual(null)
    expect(extractSignedNostrEvents(
      validNostrEventSignedOpenedConvertedToSpasmV2
    )).toStrictEqual([validNostrEventSignedOpened])
  });
});

// getAllSigners()
describe("getAllSigners() function tests", () => {
  test("getAllSigners() should return an empty array when passed invalid type", () => {
    expect(getAllSigners(fakeAsObject(null) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject(undefined) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject(0) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject(1) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject(true) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject(false) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject("abc") as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject([1,2,3]) as SpasmEventV2)).toStrictEqual([])
    expect(getAllSigners(fakeAsObject({a:1}) as SpasmEventV2)).toStrictEqual([])
  });

  test("getVerifiedSigners() should return an empty array when passed invalid type", () => {
    expect(getVerifiedSigners(fakeAsObject(null) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject(undefined) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject(0) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject(1) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject(true) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject(false) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject("abc") as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject([1,2,3]) as SpasmEventV2)).toStrictEqual([])
    expect(getVerifiedSigners(fakeAsObject({a:1}) as SpasmEventV2)).toStrictEqual([])
  });

  test("getAllSigners() should return an array of author addresses", () => {
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));

    const inputDmpConverted = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputNostrConverted = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostrSpasmConverted = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2Converted = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));

    const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"]
    const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"]
    const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"]
    const outputWeb2 = []

    // getAllSigners() for original events
    expect(getAllSigners(inputDmp)).toEqual(outputDmp);
    expect(getAllSigners(inputNostr)).toEqual(outputNostr);
    expect(getAllSigners(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getAllSigners(inputWeb2)).toEqual(outputWeb2);

    // getAllSigners() for events converted to SpasmEventV2
    expect(getAllSigners(inputDmpConverted)).toEqual(outputDmp);
    expect(getAllSigners(inputNostrConverted)).toEqual(outputNostr);
    expect(getAllSigners(inputNostrSpasmConverted)).toEqual(outputNostrSpasm);
    expect(getAllSigners(inputWeb2Converted)).toEqual(outputWeb2);

    // getVerifiedSigners()
    expect(getVerifiedSigners(inputDmp)).toEqual(outputDmp);
    expect(getVerifiedSigners(inputNostr)).toEqual(outputNostr);
    expect(getVerifiedSigners(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getVerifiedSigners(inputWeb2)).toEqual(outputWeb2);
  });
});

// getAllSignatures()
describe("getAllSignatures() function tests", () => {
  test("getAllSignatures() should return an array of signatures", () => {
    // Events
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));

    // Signatures
    const outputDmp = ["0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    const outputNostr = ["908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"]
    const outputNostrSpasm = ["db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"]
    const outputWeb2 = []

    // getAllSigners()
    expect(getAllSignatures(inputDmp)).toEqual(outputDmp);
    expect(getAllSignatures(inputNostr)).toEqual(outputNostr);
    expect(getAllSignatures(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getAllSignatures(inputWeb2)).toEqual(outputWeb2);
  });
});

// getSignersListedIn()
// isAnySignerListedIn()
// areAllSignersListedIn()
describe("getSignersListedIn() function tests", () => {
  test("getSignersListedIn() should return an array of signers listed as moderators", () => {
    // Events
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputDmpBanned = JSON.parse(JSON.stringify(validSpasmWithDmpReplyToDmpEventV0));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasmConverted = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));
    const moderators = [
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
    ]

    const whitelistedForActionPost = [
      "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
    ]

    const whitelistedForActionPostWithNpub = [
      "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
    ]

    const whitelistedForActionPostWithNpubAndHex = [
      "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
      "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
    ]

    const bannedAuthors = [
      "0x49e8d02294e721ac47f6f4794625312b9005fd80",
      "vita1ik.eth"
    ]

    const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"]
    const outputDmpBanned = ["0x49e8d02294e721ac47f6f4794625312b9005fd80"]
    const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"]
    const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"]
    // const outputWeb2 = []

    // Check invalid types
    expect(getSignersListedIn(fakeAsObject(null) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject(undefined) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject(0) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject(1) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject(true) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject(false) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject([1,2,3]) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject({a:1}) as SpasmEventV2, moderators)).toEqual([]);
    expect(getSignersListedIn(fakeAsObject("string") as SpasmEventV2, moderators)).toEqual([]);

    expect(getSignersListedIn(inputDmp, fakeAsArray(null))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray(undefined))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray(0))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray(1))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray(true))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray(false))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray([1,2,3]))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray({a:1}))).toEqual([]);
    expect(getSignersListedIn(inputDmp, fakeAsArray("string"))).toEqual([]);

    // getSignersListedIn() with Dmp moderator and whitelisted
    expect(getSignersListedIn(
      inputDmp,
      moderators
    )).toEqual(outputDmp);
    expect(getSignersListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(outputDmp);
    expect(getSignersListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual([]);
    // alias getPubkeysListedIn()
    expect(getPubkeysListedIn(
      inputDmp,
      moderators
    )).toEqual(outputDmp);
    expect(getPubkeysListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(outputDmp);
    expect(getPubkeysListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with Dmp banned
    expect(getSignersListedIn(
      inputDmpBanned,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual([]);
    expect(getSignersListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(outputDmpBanned);

    // getSignersListedIn() with Nostr whitelisted
    expect(getSignersListedIn(
      inputNostr,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(outputNostr);
    expect(getSignersListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with NostrSpasm whitelisted
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      whitelistedForActionPost
    )).toEqual(outputNostrSpasm);
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with web2
    expect(getSignersListedIn(
      inputWeb2,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual([]);
    expect(getSignersListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual([]);

    // isAnySignerListedIn() with Dmp moderator and whitelisted
    expect(isAnySignerListedIn(
      inputDmp,
      moderators
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual(false);

    // isAnySignerListedIn() with Dmp banned
    expect(isAnySignerListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);

    // isAnySignerListedIn() with Nostr whitelisted
    expect(isAnySignerListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputNostrSpasmConverted,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputNostrSpasmConverted,
      whitelistedForActionPostWithNpub
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputNostrSpasmConverted,
      whitelistedForActionPostWithNpubAndHex
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);
    // alias isAnyPubkeyListedIn()
    expect(isAnyPubkeyListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(isAnyPubkeyListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnyPubkeyListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);

    // isAnySignerListedIn() with Nostr whitelisted
    expect(isAnySignerListedIn(
      inputWeb2,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Dmp moderator and whitelisted
    expect(areAllSignersListedIn(
      inputDmp,
      moderators
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Dmp banned
    expect(areAllSignersListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);
    // alias areAllPubkeysListedIn()
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);

    // areAllSignersListedIn() with Nostr whitelisted
    expect(areAllSignersListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Nostr whitelisted
    expect(areAllSignersListedIn(
      inputWeb2,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual(false);
  });
});

describe("getStatsByAction() tests", () => {
  test("getStatsByAction() should return a stat", () => {
    // Default is "react"
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)
    )!.action).toEqual("react");
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "react"
    )!.action).toEqual("react");
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "reply"
    )!.action).toEqual("reply");
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "moderate"
    )).toEqual(null);
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "react"
    )).toEqual(
      validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats![0]
    );
    expect(getStatByAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "reply"
    )).toEqual(
      validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats![1]
    );
  });
});

describe("getTotalOfReaction() tests", () => {
  test("getTotalOfReaction() should return a stat", () => {
    // Default is "upvote"
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)
    )).toEqual(8);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "upvote"
    )).toEqual(8);
    expect(getTotalOfReaction(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      "upvote"
    )).toEqual(0);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "downvote"
    )).toEqual(0);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "bullish"
    )).toEqual(5);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "bearish"
    )).toEqual(0);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "important"
    )).toEqual(6);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "scam"
    )).toEqual(0);
    expect(getTotalOfReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats),
      "random"
    )).toEqual(0);
  });
});

describe("getTotalOfMostPopularReaction() tests", () => {
  test("getTotalOfMostPopularReaction() should return a total of most popular reaction", () => {
    expect(getTotalOfMostPopularReaction(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    )).toEqual(0);
    expect(getTotalOfMostPopularReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)
    )).toEqual(8);
    expect(getTotalOfMostPopularReaction(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
    )).toEqual(11);
    expect(getTotalOfMostPopularReaction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew)
    )).toEqual(26);
  });
});

describe("getTotalOfReply() tests", () => {
  test("getTotalOfReply() should return a total of most popular reaction", () => {
    expect(getTotalOfReact(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    )).toEqual(0);
    expect(getTotalOfReply(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    )).toEqual(0);
    expect(getTotalOfReply(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)
    )).toEqual(3);
    expect(getTotalOfActionReply(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
    )).toEqual(3);
    expect(getTotalOfReplyAction(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
    )).toEqual(3);
    expect(getTotalOfAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "reply"
    )).toEqual(18081);
    expect(getTotalOfAction(
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "react"
    )).toEqual(0);
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
      { value: [ 10, "11" ] },
      { value: { value: "12" } },
    ];
    const output = ["123", "abc", 456]
    expect(getAllIdsFromArrayOfIdObjects(
      input as SpasmEventIdV2[], true
    )).toStrictEqual(output);
  });
});

// getAllEventIds()
describe("getAllEventIds() tests", () => {
  test("getAllEventIds() should return array of IDs", () => {
    const input1 = validNostrSpasmEventSignedOpened;
    const output1 = [
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    ]
    expect(getAllEventIds(
      input1, true
    )).toStrictEqual(output1);

    const input2 = validSpasmWithDmpReplyToDmpEventV0;
    const output2 = [
      "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
      "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b"
    ]
    expect(getAllEventIds(
      input2, true
    )).toStrictEqual(output2);
  });
});

// getAllParentIds()
describe("getAllParentIds() tests", () => {
  test("getAllParentIds() should return array with parent ID", () => {
    const input = validSpasmWithDmpReplyToDmpEventV0;
    const output = [ input.target ]
    expect(getAllParentIds(
      input, true
    )).toStrictEqual(output);
  });
  test("getAllParentIds() should return array with genesis IDs", () => {
    const input = validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2
    const output = [ input.parent?.ids[0].value, input.parent?.ids[1].value ]
    expect(getAllParentIds(
      input, true
    )).toStrictEqual(output);
  });
  test("getAllParentIds() should return empty array", () => {
    const input = validPostWithRssItem;
    const output = []
    expect(getAllParentIds(
      input, true
    )).toStrictEqual(output);
  });
  test("getAllParentIds() should return an array with DMP ID", () => {
    const input = validNostrReplyToDmpEvent;
    const output = [ input.tags[3][1] ]
    expect(getAllParentIds(
      input, true
    )).toStrictEqual(output);
  });
});

// toBeSpasmEventV2()
describe("toBeSpasmEventV2() function tests", () => {
  test("toBeSpasmEventV2() should return SpasmEventV2 or null", () => {
    const inputDmp = validDmpEventSignedClosed
    const inputNostr = validNostrEventSignedOpened
    const inputNostrSpasm = validNostrSpasmEventSignedOpened

    const outputDmp = validDmpEventSignedClosedConvertedToSpasmV2
    const outputNostr = validNostrEventSignedOpenedConvertedToSpasmV2
    const outputNostrSpasm = validNostrSpasmEventSignedOpenedConvertedToSpasmV2

    // Not SpasmEventV2 yet
    expect(toBeSpasmEventV2(inputDmp)).toStrictEqual(outputDmp);
    expect(toBeSpasmEventV2(inputNostr)).toStrictEqual(outputNostr);
    expect(toBeSpasmEventV2(inputNostrSpasm)).toStrictEqual(outputNostrSpasm);

    // Already SpasmEventV2
    expect(toBeSpasmEventV2(outputDmp)).toStrictEqual(outputDmp);
    expect(toBeSpasmEventV2(outputNostr)).toStrictEqual(outputNostr);
    expect(toBeSpasmEventV2(outputNostrSpasm)).toStrictEqual(outputNostrSpasm);

    // Other
    expect(toBeSpasmEventV2("hello" as UnknownEventV2)).toStrictEqual(null);
  });
});

// getIdByFormat()
// extractIdByFormat() - alias
describe("getIdByFormat() tests", () => {
  test("getIdByFormat() get ID by format", () => {
    // Not converted to SpasmEventV2 yet
    const inputDmp = validDmpEventSignedClosed
    const inputNostr = validNostrEventSignedOpened
    const inputNostrSpasm = validNostrSpasmEventSignedOpened

    // Already converted to SpasmEvent2
    const inputDmpConverted = validDmpEventSignedClosedConvertedToSpasmV2
    const inputNostrConverted = validNostrEventSignedOpenedConvertedToSpasmV2
    const inputNostrSpasmConverted = validNostrSpasmEventSignedOpenedConvertedToSpasmV2

    // default format name and version
    expect(
      getIdByFormat(inputDmp)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr)
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm)
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );
    expect(
      getIdByFormat(inputDmpConverted)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostrConverted)
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasmConverted)
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // spasmid
    expect(
      getIdByFormat(inputDmp, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // alias
    expect(
      extractIdByFormat(inputDmp, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      extractIdByFormat(inputNostr, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      extractIdByFormat(inputNostrSpasm, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // spasmid01
    expect(
      getIdByFormat(inputDmp, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );
    expect(
      extractSpasmId01(inputDmp)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );

    // spasmid99
    expect(
      getIdByFormat(inputDmp, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);

    // ethereum-sig
    expect(
      getIdByFormat(inputDmp, { name: "ethereum-sig" } )
    ).toStrictEqual(
      "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
    );
    expect(
      getIdByFormat(inputNostr, { name: "ethereum-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "ethereum-sig" } )
    ).toStrictEqual(null);

    // ethereum-sig99
    expect(
      getIdByFormat(inputDmp, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);

    // nostr-hex
    expect(
      getIdByFormat(inputDmp, { name: "nostr-hex" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-hex" } )
    ).toStrictEqual(
      "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-hex" } )
    ).toStrictEqual(
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    );

    // nostr-hex99
    expect(
      getIdByFormat(inputDmp, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);

    // nostr-sig
    expect(
      getIdByFormat(inputDmp, { name: "nostr-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-sig" } )
    ).toStrictEqual(
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    );

    // nostr-sig99
    expect(
      getIdByFormat(inputDmp, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);

    // url
    expect(
      getIdByFormat(
        validSpasmEventRssItemV0ConvertedToSpasmV2,
        { name: "url" } )
    ).toStrictEqual("https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack");

    // guid
    expect(
      getIdByFormat(
        validSpasmEventRssItemV0ConvertedToSpasmV2,
        { name: "guid" } )
    ).toStrictEqual(
      "https://forum.degenrocket.space/?l=terraforming"
    );

  });
});

describe("getParentIdByFormat() tests", () => {
  test("getParentIdByFormat() get ID by format", () => {
    expect(getParentIdByFormat(
      validNostrReplyToDmpEvent, { name: "nostr-hex" }
    )).toStrictEqual(null)
    expect(getParentIdByFormat(
        validNostrReplyToDmpEvent, { name: "nostr-sig" }
    )).toStrictEqual(null)
    expect(extractParentSpasmId01(
      validNostrReplyToDmpEvent
    )).toStrictEqual(null)
    expect(extractParentIdByFormat(
        validNostrReplyToDmpEvent, { name: "ethereum-sig" }
    )).toStrictEqual(
      "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
    )
    // event with two parent url ids
    expect(
      getParentIdByFormat(
        validSpasmEventV2WithTwoParentUrlIds,
        { name: "url" } )
    ).toStrictEqual(
      "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/"
      // "https://reason.com/?p=8317331"
    );
    expect(
      getParentIdByFormat(
        validSpasmEventV2WithTwoParentUrlIds,
        { name: "guid" } )
    ).toStrictEqual(null);
  });
});

// findMostLikelyUrl
// findMostLikelyGuid
describe("findMostLikelyUrl and findMostLikelyGuid tests", () => {
  test("findMostLikelyUrl()", () => {
    expect(
      findMostLikelyUrl([
        "123abc",
        "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
        "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
        "https://reason.com/?p=8317331",
        "https://reason.com/?p=8317331",
        "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
        "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f123456789"
      ])
    ).toStrictEqual(
        "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/"
    )
  });
  test("findMostLikelyGuid()", () => {
    expect(
      findMostLikelyGuid([
        "123abc",
        "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
        "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
        "https://reason.com/?p=8317331",
        "https://reason.com/?p=8317331",
        "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
        "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f123456789"
      ])
    ).toStrictEqual(
        "https://reason.com/?p=8317331"
    )
  });
});

describe("checkIfEventHasThisId() tests", () => {
  test("checkIfEventHasThisId() get ID by format", () => {
    // Not converted DMP
    expect(checkIfEventHasThisId(
      copyOf(validDmpEventSignedClosed),
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(true);
    expect(checkIfEventHasThisId(
      copyOf(validDmpEventSignedClosed),
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6e"
    )).toStrictEqual(false);
    expect(checkIfEventHasThisId(
      copyOf(validDmpEventSignedClosed),
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    )).toStrictEqual(false);
    expect(checkIfEventHasThisId(
      copyOf(validDmpEventSignedClosed),
      "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
    )).toStrictEqual(true);

    // Converted Nostr
    expect(checkIfEventHasThisId(
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    )).toStrictEqual(true);
    expect(checkIfEventHasThisId(
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27808"
    )).toStrictEqual(false);
    expect(checkIfEventHasThisId(
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(false);
    expect(checkIfEventHasThisId(
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65"
    )).toStrictEqual(true);
  });
});

describe("getEventById() tests", () => {
  test("getEventById() get ID by format", () => {
    // Not converted DMP
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosed),
    ],
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosed),
    ],
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ],
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpened),
    ],
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    )).toStrictEqual(
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ],
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ],
      // Wrong ID
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652"
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], null!
    )).toStrictEqual(null);
    expect(getEventById([],
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(null);
    expect(getEventById({} as UnknownEventV2[],
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(null);
    expect(getEventById(undefined!,
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(null);
    expect(getEventById(null!,
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(null);
    // Short ID (not URL)
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,20),
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,20),
      20
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validNostrEventSignedOpenedConvertedToSpasmV2.ids![0].value.toString().slice(0,20),
      20
    )).toStrictEqual(
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,20),
      20
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    );
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,19),
      20
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,21),
      20
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,20),
      21
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,20),
      19
    )).toStrictEqual(null);
    expect(getEventById([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ],
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,15),
      15
      // Valid short ID should be at least 16 chars
    )).toStrictEqual(null);
  });
});

describe("getEventsByIds() tests", () => {
  test("getEventsByIds() get ID by format", () => {
    // Not converted DMP
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosed),
    ], [
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosed),
    ], [
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ], [
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpened),
    ], [
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    ])).toStrictEqual([
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual([
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    ])).toStrictEqual([
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validNostrSpasmEventConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
    ])).toStrictEqual([
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEvent),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
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
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      // Wrong ID
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652"
    ])).toStrictEqual(null);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ], [
      null!
    ])).toStrictEqual(null);
    expect(getEventsByIds([], [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual(null);
    expect(getEventsByIds({} as UnknownEventV2[], [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual(null);
    expect(getEventsByIds(undefined!, [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual(null);
    expect(getEventsByIds(null!, [
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    ])).toStrictEqual(null);
    // Short ID
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,20)
    ])).toStrictEqual(null);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,20)
    ], 19)).toStrictEqual(null);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,20)
    ], 20)).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![1].value.toString().slice(0,20)
    ], 20)).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      "spasmid01192d1f9994b"
    ], 20)).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
    ]);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,19)
    ], 20)).toStrictEqual(null);
    expect(getEventsByIds([
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2),
    ], [
      validDmpEventSignedClosedConvertedToSpasmV2.ids![0].value.toString().slice(0,21)
    ], 20)).toStrictEqual(null);
  });
});

// mergeSpasmEventsV2()
describe("mergeSpasmEventsV2() tests", () => {
  test("mergeSpasmEventsV2() tests with null", () => {
    const input = copyOf(validDmpEventSignedClosed);
    const output =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2);
    expect(mergeSpasmEventsV2([null, copyOf(input)]))
      .toStrictEqual(null);
    expect(mergeSpasmEventsV2([
      null, copyOf(input), copyOf(input)
    ])).toStrictEqual(null);
    expect(mergeSpasmEventsV2([null, copyOf(input), null]))
      .toStrictEqual(null);
    expect(mergeSpasmEventsV2([copyOf(input), null]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input), null, null]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([
      copyOf(input), null, null, copyOf(input)
    ])).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([null, null, null]))
      .toStrictEqual(null);
  });
  test("mergeSpasmEventsV2() should merge same DMP events", () => {
    const input1 = copyOf(validDmpEventSignedClosed);
    const input2 = copyOf(validDmpEventSignedOpened);
    const output =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2);
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input1), copyOf(input1)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input1)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input2), copyOf(input2), copyOf(input2)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input2), copyOf(input1), copyOf(input2)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]))
      .toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2(
      [copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]
    )?.title)
      .toStrictEqual("genesis");
    expect(mergeSpasmEventsV2(
      [copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]
    )?.siblings?.length)
      .toStrictEqual(1);
  });
  test("mergeSpasmEventsV2() should merge same DMP events", () => {
    const input1 = copyOf(validNostrSpasmEventSignedOpened);
    const input2 =
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
    const output =
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input1), copyOf(input1)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input1)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input2), copyOf(input2), copyOf(input2)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input2), copyOf(input1), copyOf(input2)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)])
    ).toStrictEqual(copyOf(output));
    expect(mergeSpasmEventsV2([copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)])
    ).not.toEqual(null);
    expect(mergeSpasmEventsV2(
      [copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]
    )?.title
    ).toStrictEqual("Nostr Spasm genesis");
    expect(mergeSpasmEventsV2(
      [copyOf(input1), copyOf(input2), copyOf(input2), copyOf(input1)]
    )?.siblings?.length)
      .toStrictEqual(1);
  });
  test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with DMP siblings", () => {
    const input =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2);
    const output = copyOf(input)
    expect(mergeSpasmEventsV2([input, input]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input, input, input, input
    ]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input, input, input, input
    ]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([
      input, input, input, input, input, input
    ])?.title)
      .toStrictEqual("genesis");
    expect(mergeSpasmEventsV2(
      [input, input, input, input, input, input ]
    )?.siblings?.length)
      .toStrictEqual(1);
  });
  test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with Nostr siblings", () => {
    const input =
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2);
    const output = copyOf(input)
    expect(mergeSpasmEventsV2([input, input]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ])?.content)
      .toStrictEqual("Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.");
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ])?.siblings?.length)
      .toStrictEqual(1);
  });
  test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with NostrSpasm siblings", () => {
    const input =
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
    const output = copyOf(input)
    expect(mergeSpasmEventsV2([input, input]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ]))
      .toStrictEqual(output);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ])?.title)
      .toStrictEqual("Nostr Spasm genesis");
    expect(mergeSpasmEventsV2([
      input, input, input,
      input, input, input
    ])?.siblings?.length)
      .toStrictEqual(1);
  });
  test("mergeSpasmEventsV2() should return the first event if events have different Spasm ID", () => {
    const input1 =
      copyOf(validDmpEvent);
    const input2 =
      copyOf(validDmpEventSignedClosed);
    const input3 =
      copyOf(validDmpEventSignedOpened);
    const input4 =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2);
    const input5 =
      copyOf(validDmpEventSignedOpenedConvertedToSpasmV2);
    const input6 =
      copyOf(validNostrEvent);
    const input7 =
      copyOf(validNostrEventSignedOpened);
    const input8 =
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2);
    const input9 =
      copyOf(validNostrSpasmEvent);
    const input10 =
      copyOf(validNostrSpasmEventSignedOpened);
    const input11 =
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
    expect(mergeSpasmEventsV2([input2, input1]))
      .toStrictEqual(convertToSpasm(input2));
    expect(mergeSpasmEventsV2([input3, input4]))
      .toStrictEqual(convertToSpasm(input3));
    expect(mergeSpasmEventsV2([input5, input6]))
      .toStrictEqual(convertToSpasm(input5));
    expect(mergeSpasmEventsV2([input7, input8]))
      .toStrictEqual(convertToSpasm(input7));
    expect(mergeSpasmEventsV2([input8, input9]))
      .toStrictEqual(convertToSpasm(input8));
    expect(mergeSpasmEventsV2([input9, input10]))
      .toStrictEqual(convertToSpasm(input10));
    expect(mergeSpasmEventsV2([input10, input11]))
      .toStrictEqual(convertToSpasm(input10));
    expect(mergeSpasmEventsV2([input11, input1]))
      .toStrictEqual(convertToSpasm(input11));
    expect(mergeSpasmEventsV2([input1, input2, input3, input4]))
      .toStrictEqual(convertToSpasm(input1));
  });
  test("mergeSpasmEventsV2() tests for merging unsigned with signed events, which have the same Spasm ID", () => {
    const dmpUnsigned =
      copyOf(validDmpEvent);
    const dmpSigned =
      copyOf(validDmpEventSignedClosed);
    const nostrUnsigned =
      copyOf(validNostrEvent);
    const nostrSigned =
      copyOf(validNostrEventSignedOpened);
    const nostrSpasmUnsigned =
      copyOf(validNostrSpasmEvent);
    const nostrSpasmSigned =
      copyOf(validNostrSpasmEventSignedOpened);
    // DMP signed and unsigned events have different Spasm IDs
    // because unsigned events don't have a signer, which
    // affects the Spasm ID.
    // Since events have different Spasm IDs, they aren't merged.
    expect(mergeSpasmEventsV2([dmpUnsigned, dmpSigned]))
      .toStrictEqual(convertToSpasm(dmpUnsigned));
    // Signed and unsigned Nostr events have the same Spasm ID
    // so unsigned sibling is dropped in favor of a signed
    // sibling during merge.
    expect(mergeSpasmEventsV2([nostrUnsigned, nostrSigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrSigned, nostrSigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrSigned, nostrUnsigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrUnsigned, nostrUnsigned, nostrSigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrSigned, nostrUnsigned, nostrUnsigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrSpasmUnsigned, nostrSpasmSigned]))
      .toStrictEqual(convertToSpasm(nostrSpasmSigned));
    expect(mergeSpasmEventsV2([
      copyOf(validNostrSpasmEventConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ])).toStrictEqual(
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    )
    // Not equal
    expect(mergeSpasmEventsV2([nostrUnsigned, nostrSigned]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([nostrSpasmUnsigned, nostrSpasmSigned]))
      .not.toEqual(null);
  });
  test("mergeSpasmEventsV2() tests for merging events with different Spasm IDs", () => {
    const dmpUnsigned =
      copyOf(validDmpEvent);
    const dmpSigned =
      copyOf(validDmpEventSignedClosed);
    const nostrUnsigned =
      copyOf(validNostrEvent);
    const nostrSigned =
      copyOf(validNostrEventSignedOpened);
    const nostrSpasmUnsigned =
      copyOf(validNostrSpasmEvent);
    const nostrSpasmSigned =
      copyOf(validNostrSpasmEventSignedOpened);
    // DMP signed and unsigned events have different Spasm IDs
    // because unsigned events don't have a signer, which
    // affects the Spasm ID.
    // Since events have different Spasm IDs, they aren't merged.
    expect(mergeSpasmEventsV2([dmpUnsigned, dmpSigned]))
      .toStrictEqual(convertToSpasm(dmpUnsigned));
    expect(mergeSpasmEventsV2([dmpSigned, dmpUnsigned]))
      .toStrictEqual(convertToSpasm(dmpSigned));
    expect(mergeSpasmEventsV2([
      dmpSigned, dmpUnsigned, dmpSigned, dmpUnsigned, dmpUnsigned
    ]))
      .toStrictEqual(convertToSpasm(dmpSigned));
    expect(mergeSpasmEventsV2([dmpUnsigned, nostrSpasmSigned]))
      .toStrictEqual(convertToSpasm(dmpUnsigned));
    // Signed and unsigned Nostr events have the same Spasm ID
    // so unsigned sibling is dropped in favor of a signed
    // sibling during merge.
    expect(mergeSpasmEventsV2([nostrSigned, nostrSpasmSigned]))
      .toStrictEqual(convertToSpasm(nostrSigned));
    expect(mergeSpasmEventsV2([nostrUnsigned, nostrSpasmSigned]))
      .toStrictEqual(convertToSpasm(nostrUnsigned));
    expect(mergeSpasmEventsV2([
      nostrUnsigned, nostrSpasmUnsigned, nostrSpasmUnsigned
    ]))
      .toStrictEqual(convertToSpasm(nostrUnsigned));
    expect(mergeSpasmEventsV2([nostrSpasmUnsigned, nostrSigned]))
      .toStrictEqual(convertToSpasm(nostrSpasmUnsigned));
    expect(mergeSpasmEventsV2([nostrSpasmUnsigned, dmpUnsigned]))
      .toStrictEqual(convertToSpasm(nostrSpasmUnsigned));
    expect(mergeSpasmEventsV2([
      nostrSpasmUnsigned, dmpSigned, dmpSigned
    ]))
      .toStrictEqual(convertToSpasm(nostrSpasmUnsigned));
    // Not equal
    expect(mergeSpasmEventsV2([dmpSigned, nostrSigned]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([nostrUnsigned, dmpSigned]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([nostrSpasmUnsigned, nostrUnsigned]))
      .not.toEqual(null);
  });
  test("mergeSpasmEventsV2() tests for merging events with and without source", () => {
    const dmpConverted = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const dmpConvertedWithSource = {
      ...dmpConverted,
      source: "newsource.space"
    }
    const dmpConvertedWithAnotherSource = {
      ...dmpConverted,
      source: "anothersource.space"
    }
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConverted)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConverted))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConvertedWithSource)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithSource))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConvertedWithSource), copyOf(dmpConvertedWithSource)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithSource))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConvertedWithSource),
      copyOf(dmpConvertedWithAnotherSource)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithSource))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConvertedWithAnotherSource)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithAnotherSource))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConvertedWithSource),
      copyOf(dmpConvertedWithAnotherSource)
    ]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted),
      copyOf(dmpConvertedWithSource)
    ]))
      .not.toEqual(null);
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted),
      copyOf(dmpConvertedWithSource)
    ]))
      .not.toEqual(dmpConverted);
  });
  test("mergeSpasmEventsV2() tests for merging events with and without sharedBy", () => {
    const dmpConverted: SpasmEventV2 =
      JSON.parse(JSON.stringify(
        validDmpEventSignedOpenedConvertedToSpasmV2
    ));
    const dmpConvertedWithOneSharedBy: SpasmEventV2 = {
      ...dmpConverted,
      sharedBy: {
        ids: [ { value: "0x12345" } ]
      }
    }
    const dmpConvertedWithTwoSharedBy: SpasmEventV2 = {
      ...dmpConverted,
      sharedBy: {
        ids: [ { value: "0x12345" }, { value: "0x67890" } ]
      }
    }
    const dmpConvertedWithAnotherSharedBy: SpasmEventV2 = {
      ...dmpConverted,
      sharedBy: {
        ids: [ { value: "0xanother" } ]
      }
    }
    const dmpConvertedWithThreeSharedBy: SpasmEventV2 = {
      ...dmpConverted,
      sharedBy: {
        ids: [
          { value: "0x12345" },
          { value: "0x67890" },
          { value: "0xanother" }
        ]
      }
    }
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConverted)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConverted))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConvertedWithOneSharedBy)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithOneSharedBy))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted), copyOf(dmpConvertedWithTwoSharedBy)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithTwoSharedBy))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConverted),
      copyOf(dmpConvertedWithAnotherSharedBy)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithAnotherSharedBy))
      );
    expect(mergeSpasmEventsV2([
      copyOf(dmpConvertedWithOneSharedBy),
      copyOf(dmpConvertedWithTwoSharedBy),
      copyOf(dmpConvertedWithAnotherSharedBy)
    ]))
      .toStrictEqual(
        convertToSpasm(copyOf(dmpConvertedWithThreeSharedBy))
      );
  });
  test("mergeSpasmEventsV2() tests for merging events with parent event", () => {
    const spasmParent: SpasmEventV2 =
      copyOf(validDmpEventSignedOpenedConvertedToSpasmV2)
    const spasmReply: SpasmEventV2 =
      copyOf(validPostWithNostrReplyToDmpEvent)
    const spasmReplyWithSpasmParent: SpasmEventV2 =
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent)
    expect(mergeSpasmEventsV2([
      copyOf(spasmReply), copyOf(spasmReplyWithSpasmParent)
    ]))
      .toStrictEqual(
        copyOf(spasmReplyWithSpasmParent)
      );
    expect(mergeSpasmEventsV2([
      copyOf(spasmReply), copyOf(spasmReplyWithSpasmParent)
    ]))
      .toStrictEqual(
        convertToSpasm(
          convertToSpasm(
            copyOf(spasmReplyWithSpasmParent)
          ) as SpasmEventV2
        )
      );
    expect(mergeSpasmEventsV2([
      copyOf(spasmReply), copyOf(spasmReplyWithSpasmParent)
    ])!.parent!.event)
      .toStrictEqual(copyOf(spasmParent));
    expect(mergeSpasmEventsV2([
      copyOf(spasmReply), copyOf(spasmReplyWithSpasmParent)
    ])!.parent!.event?.title)
      .toStrictEqual("genesis");
  });

  test("mergeSpasmEventsV2() should merge events with stats", () => {
    const event1WithoutStats = validDmpEventSignedClosedConvertedToSpasmV2
    const event1WithStats = validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats
    const event1WithStatsOld = validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld
    const event1WithStatsNew = validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew
    const event2WithStats = validPostWithNostrReplyToDmpEventConvertedToSpasmV2
    // Same event
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutStats),
      copyOf(event1WithoutStats)
    ])).toStrictEqual(copyOf(event1WithoutStats));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutStats),
      copyOf(event1WithStats)
    ])).toStrictEqual(copyOf(event1WithStats));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStats),
      copyOf(event1WithoutStats)
    ])).toStrictEqual(copyOf(event1WithStats));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStats),
      copyOf(event1WithStats),
      copyOf(event1WithStats),
      copyOf(event1WithoutStats)
    ])).toStrictEqual(copyOf(event1WithStats));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsNew)
    ])).toStrictEqual(copyOf(event1WithStatsNew));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsNew),
      copyOf(event1WithStatsOld)
    ])).toStrictEqual(copyOf(event1WithStatsNew));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld)
    ])).toStrictEqual(copyOf(event1WithStatsOld));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsNew),
      copyOf(event1WithStatsNew),
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsOld)
    ])).toStrictEqual(copyOf(event1WithStatsNew));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsOld),
      copyOf(event1WithStatsNew)
    ])!.stats![0]!.action)
      .toStrictEqual("react");
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStatsNew),
      copyOf(event1WithStatsOld)
    ])).not.toEqual(null);
    // Merge with different event
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutStats),
      copyOf(event2WithStats)
    ])).toStrictEqual(copyOf(event1WithoutStats));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithStats),
      copyOf(event2WithStats)
    ])).toStrictEqual(copyOf(event1WithStats));
  });

  test("mergeSpasmEventsV2() should merge events with db", () => {
    const event1WithoutDb = validDmpEventSignedClosedConvertedToSpasmV2
    const event1WithDb = validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb
    const event1WithDbNew = validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutDb),
      copyOf(event1WithoutDb)
    ])).toStrictEqual(copyOf(event1WithoutDb));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutDb),
      copyOf(event1WithDb)
    ])).toStrictEqual(copyOf(event1WithDb));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutDb),
      copyOf(event1WithDb),
      copyOf(event1WithDbNew)
    ])).toStrictEqual(copyOf(event1WithDbNew));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutDb),
      copyOf(event1WithDb),
      copyOf(event1WithDbNew)
    ])).not.toEqual(null);
    expect(mergeSpasmEventsV2([
      copyOf(event1WithDb),
      copyOf(event1WithDbNew)
    ])!.db!.key).toStrictEqual(1337);
    expect(mergeSpasmEventsV2([
      copyOf(event1WithDb),
      copyOf(event1WithDbNew)
    ])!.db!.table).toStrictEqual("spasm_events");
    expect(mergeSpasmEventsV2([
      copyOf(event1WithDb),
      copyOf(event1WithDbNew)
    ])!.db!.updatedTimestamp).toStrictEqual(1642074686195);
  });
  test("mergeSpasmEventsV2() should merge events with children", () => {
    const event1WithoutChildren = validDmpEventSignedClosedConvertedToSpasmV2
    const event1WithOneChild = validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild
    const event1WithAnotherChild = validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild
    const event1WithAnotherChildWithoutEvent = validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent
    const event1WithBothChildren = validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren
    const event1WithBothChildrenReverse = validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutChildren),
      copyOf(event1WithoutChildren)
    ])).toStrictEqual(copyOf(event1WithoutChildren));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithOneChild),
      copyOf(event1WithOneChild)
    ])).toStrictEqual(copyOf(event1WithOneChild));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithAnotherChild),
      copyOf(event1WithAnotherChild)
    ])).toStrictEqual(copyOf(event1WithAnotherChild));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithBothChildren),
      copyOf(event1WithBothChildren)
    ])).toStrictEqual(copyOf(event1WithBothChildren));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutChildren),
      copyOf(event1WithOneChild)
    ])).toStrictEqual(copyOf(event1WithOneChild));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithOneChild),
      copyOf(event1WithAnotherChild)
    ])).toStrictEqual(copyOf(event1WithBothChildren));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutChildren),
      copyOf(event1WithOneChild),
      copyOf(event1WithAnotherChild)
    ])).toStrictEqual(copyOf(event1WithBothChildren));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithAnotherChild),
      copyOf(event1WithOneChild),
      copyOf(event1WithoutChildren)
    ])).toStrictEqual(copyOf(event1WithBothChildrenReverse));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithAnotherChildWithoutEvent),
      copyOf(event1WithAnotherChild)
    ])).toStrictEqual(copyOf(event1WithAnotherChild));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithAnotherChild),
      copyOf(event1WithAnotherChildWithoutEvent)
    ])).toStrictEqual(copyOf(event1WithAnotherChild));
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutChildren),
      copyOf(event1WithOneChild),
      copyOf(event1WithAnotherChild)
    ])!.children![1].event?.content).toStrictEqual("To the moon!");
    expect(mergeSpasmEventsV2([
      copyOf(event1WithoutChildren),
      copyOf(event1WithOneChild),
      copyOf(event1WithAnotherChild)
    ])).not.toEqual(null);
  });
});

// mergeDifferentSpasmEventsV2()
describe("mergeDifferentSpasmEventsV2() tests", () => {
  test("mergeDifferentSpasmEventsV2() tests with many events", () => {
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent)
    ])![0].title).toStrictEqual("genesis");
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent)
    ])![0]).not.toEqual(null);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent),
      copyOf(validDmpEvent),
    ])).toStrictEqual([
      copyOf(validDmpEventConvertedToSpasmEventV2)
    ]);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    ])).toStrictEqual([
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    ]);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent),
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEvent)
    ])).toStrictEqual([
      copyOf(validDmpEventConvertedToSpasmEventV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventConvertedToSpasmV2)
    ]);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent),
      copyOf(validDmpEvent),
      copyOf(validNostrSpasmEventSignedOpenedWithInvalidSignature),
      copyOf(validDmpEventSignedClosed),
      null, undefined, false, true, "hello world", 1, [], {},
      copyOf(validNostrEvent),
      copyOf(validNostrEventSignedOpened),
      copyOf(validDmpEventSignedClosed),
      copyOf(validDmpEventSignedClosed)
    ])).toStrictEqual([
      copyOf(validDmpEventConvertedToSpasmEventV2),
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      copyOf(validNostrEventSignedOpenedConvertedToSpasmV2)
    ]);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validDmpEvent),
      copyOf(validDmpEventSignedClosed),
      copyOf(validNostrEvent),
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld)
    ])).toStrictEqual([
      copyOf(validDmpEventConvertedToSpasmEventV2),
      copyOf(validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
      copyOf(validNostrEventConvertedToSpasmV2)
    ]);
    expect(mergeDifferentSpasmEventsV2([
      copyOf(validNostrSpasmEventConvertedToSpasmV2),
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ])).toStrictEqual([
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
    ]);
  });
});

// checkIfArrayHasThisEvent()
describe("checkIfArrayHasThisEvent() function tests", () => {
  test("checkIfArrayHasThisEvent()", () => {
    expect(checkIfArrayHasThisEvent(
      [
        copyOf(validNostrSpasmEventConvertedToSpasmV2),
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ], copyOf(validNostrSpasmEventConvertedToSpasmV2),
      )).toStrictEqual(true);
    expect(checkIfArrayHasThisEvent(
      [
        copyOf(validNostrSpasmEventConvertedToSpasmV2),
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ], copyOf(null),
      )).toStrictEqual(false);
    expect(checkIfArrayHasThisEvent(
      [ ], copyOf(validNostrSpasmEventConvertedToSpasmV2),
      )).toStrictEqual(false);
    // Should return true because it's the same event, but one
    // is signed, while another one is unsigned
    expect(checkIfArrayHasThisEvent(
      [
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ], copyOf(validNostrSpasmEventConvertedToSpasmV2),
      )).toStrictEqual(true);
    expect(checkIfArrayHasThisEvent(
      [
        copyOf(validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2),
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ], copyOf(validNostrSpasmEventConvertedToSpasmV2),
      )).toStrictEqual(true);
    expect(checkIfArrayHasThisEvent(
      [
        copyOf(validNostrSpasmEventConvertedToSpasmV2),
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ], copyOf(validNostrSpasmEventConvertedToSpasmV2),
      )).toStrictEqual(true);
  });
});

// appendToArrayIfEventIsUnique()
// prependToArrayIfEventIsUnique()
describe("appendToArrayIfEventIsUnique() function tests", () => {
  test("appendToArrayIfEventIsUnique() should push to array", () => {
    const event1 =
      copyOf(validRssItemWithEmojiConvertedToSpasmEvent2)
    const event2 =
      copyOf(validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2)
    const event3 =
      copyOf(validNostrSpasmEventConvertedToSpasmV2)
    const event3signed =
      copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2)
    const event4 =
      copyOf(validSpasmEventBodySignedClosedV2)
    const array1 = [ copyOf(event2), copyOf(event3) ]
    expect(array1.length).toStrictEqual(2)

    prependToArrayIfEventIsUnique(array1, event1)
    expect(array1.length).toStrictEqual(3)
    expect(array1[0].content).toStrictEqual(event1.content)
    expect(array1[1].content).toStrictEqual(event2.content)
    expect(array1[2].content).toStrictEqual(event3.content)
    expect(array1[0]).toStrictEqual(event1)

    // Append without converting to SpasmEvent
    appendToArrayIfEventIsUnique(array1, event4, false, false)
    expect(array1.length).toStrictEqual(4)
    expect(array1[0].content).toStrictEqual(event1.content)
    expect(array1[1].content).toStrictEqual(event2.content)
    expect(array1[2].content).toStrictEqual(event3.content)
    // Event is unchanged
    expect(array1[3].type).toStrictEqual(event4.type)
    expect('content' in array1[3]).toStrictEqual(false)
    expect(array1[3]).toStrictEqual(event4)

    // Nothing happens when appending duplicate without merging
    appendToArrayIfEventIsUnique(
      array1, copyOf(event4), false, false)
    expect(array1.length).toStrictEqual(4)
    expect(array1[3].type).toStrictEqual(event4.type)
    expect('content' in array1[3]).toStrictEqual(false)
    expect(array1[3]).toStrictEqual(event4)

    // Re-inserting the same event, but converted to SpasmEvent
    array1.pop()
    expect(array1.length).toStrictEqual(3)
    appendToArrayIfEventIsUnique(array1, copyOf(event4))
    expect(array1.length).toStrictEqual(4)
    expect(array1[3]).toStrictEqual(convertToSpasm(event4))

    // Nothing happens when inserting signed event without merging
    appendToArrayIfEventIsUnique(
      array1, copyOf(event3signed), false, false)
    expect(array1.length).toStrictEqual(4)
    expect('signatures' in array1[2]).toStrictEqual(false)
    expect(array1[2]).toStrictEqual(event3)

    // Unsigned event should be replaced with signed event
    // because merging is enabled by default
    appendToArrayIfEventIsUnique(
      array1, copyOf(event3signed))
    expect(array1.length).toStrictEqual(4)
    expect('signatures' in array1[2]).toStrictEqual(true)
    expect(array1[2]).toStrictEqual(event3signed)
    expect(array1[2]).not.toEqual(event3)

    // Final result
    expect(array1[0]).toStrictEqual(event1)
    expect(array1[1]).toStrictEqual(event2)
    expect(array1[2]).toStrictEqual(event3signed)
    expect(array1[3]).toStrictEqual(convertToSpasm(event4))
  });
});

// mergeStatsV2()
describe("mergeStatsV2() function tests", () => {
  test("mergeStatsV2() should merge different stats", () => {
    const statReactOld: SpasmEventStatV2 = {
      action: "react",
      latestTimestamp: 1641077686178,
      latestDbTimestamp: 1644077686178,
      contents: [
        {
          value: "upvote",
          total: 2
        }
      ]
    }
    const statReactNew: SpasmEventStatV2 = {
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
    }
    const statReplyOld: SpasmEventStatV2 = {
      action: "reply",
      latestTimestamp: 1641087686178,
      latestDbTimestamp: 1644087686178,
      total: 15
    }
    const statReplyNew: SpasmEventStatV2 = {
      action: "reply",
      latestTimestamp: 1642087686178,
      latestDbTimestamp: 1643087686178,
      total: 23
    }
    const statsReactOld = [statReactOld]
    const statsReactNew = [statReactNew]
    const statsReplyOld = [statReplyOld]
    const statsReplyNew = [statReplyNew]
    const statsAllOld = [statReactOld, statReplyOld]
    const statsAllMix = [statReactOld, statReplyNew]
    const statsAllNew = [statReactNew, statReplyNew]
    expect(mergeStatsV2([
      copyOf(statsReactOld), copyOf(statsReactNew)
    ])![0]!.action).toStrictEqual("react");
    expect(mergeStatsV2([
      copyOf(statsReactOld), copyOf(statsReactNew)
    ])).toStrictEqual(copyOf(statsReactNew));
    expect(mergeStatsV2([
      copyOf(statsReplyOld), copyOf(statsReplyNew)
    ])![0]!.action).toStrictEqual("reply");
    expect(mergeStatsV2([
      copyOf(statsReplyOld), copyOf(statsReplyNew)
    ])).toStrictEqual(copyOf(statsReplyNew));
    expect(mergeStatsV2([
      copyOf(statsAllOld), copyOf(statsAllOld)
    ])).toStrictEqual(copyOf(statsAllOld));
    expect(mergeStatsV2([
      copyOf(statsAllOld), copyOf(statsAllMix)
    ])).toStrictEqual(copyOf(statsAllMix));
    expect(mergeStatsV2([
      copyOf(statsAllOld), copyOf(statsAllNew)
    ])).toStrictEqual(copyOf(statsAllNew));
    expect(mergeStatsV2([
      copyOf(statsAllOld), copyOf(statsAllMix),
      copyOf(statsAllNew)
    ])).toStrictEqual(copyOf(statsAllNew));
    expect(mergeStatsV2([
      copyOf(statsAllMix), copyOf(statsAllOld)
    ])).toStrictEqual(copyOf(statsAllMix));
    expect(mergeStatsV2([
      copyOf(statsAllMix), copyOf(statsAllOld),
      copyOf(statsAllOld), copyOf(statsAllOld)
    ])).toStrictEqual(copyOf(statsAllMix));
    expect(mergeStatsV2([
      copyOf(statsAllNew), copyOf(statsAllNew)
    ])).toStrictEqual(copyOf(statsAllNew));
    expect(mergeStatsV2([
      copyOf(statsReactNew), copyOf(statsAllMix)
    ])).toStrictEqual(copyOf(statsAllNew));
    expect(mergeStatsV2([
      copyOf(statsAllOld)
    ])).toStrictEqual(copyOf(statsAllOld));
    expect(mergeStatsV2([
      copyOf(statsAllOld), null
    ])).toStrictEqual(copyOf(statsAllOld));
    expect(mergeStatsV2([
      null, copyOf(statsAllOld)
    ])).toStrictEqual(null);
  });
});

// addEventsToTree()
describe("addEventsToTree() function tests", () => {
  test("addEventsToTree() should return original event if no tree events were provided", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      []
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    );
  });
  test("addEventsToTree() should add one comment to an event without any comments", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2),
      [ copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2) ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild),
    );
  });
  test("addEventsToTree() should add one comment to an event with a child without an event", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent),
      [ copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2) ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild),
    );
  });
  test("addEventsToTree() should add one comment to an event with a child without an event", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent),
      [ copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2) ]
    )).not.toEqual(null);
  });
  test("addEventsToTree() should add two comments to an event with a child without an event", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent),
      [
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
      ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse),
    );
  });
  test("addEventsToTree() should add two comments to an event without any children", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosed),
      [
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
      ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren),
    );
  });
  test("addEventsToTree() should add attach only related events", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosed),
      [
        // Add many unrelated events
        copyOf(validNostrEvent),
        copyOf(validNostrSpasmEventSignedOpened),
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
        copyOf(validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
      ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren),
    );
  });
  test("addEventsToTree() should only add related parent event", () => {
    expect(addEventsToTree(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      [
        // unrelated
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
      ]
    )).toStrictEqual(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
    );
  });
  test("addEventsToTree() should add a parent event to an event", () => {
    expect(addEventsToTree(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
      [
        // unrelated
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
        // related
        copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
      ]
    )).toStrictEqual(
      copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent),
    );
  });
  test("addEventsToTree() should add two comments to an event without any children", () => {
    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        // No events should be attached because maxDepth is 0
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ],
      0 // maxDepth
    )).toStrictEqual(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
    );

    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        // No events should be attached, depth is already max
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ],
      10, // maxDepth
      true, // ifRecursively
      10 // depth (current)
    )).toStrictEqual(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
    );

    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        // No events should be attached because direction is up
        // so only parent or root can be attached.
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ],
      10, // maxDepth
      true, // ifRecursively
      0, // depth (current)
      "up"
    )).toStrictEqual(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
    );

    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        // Depth2 should not be attached because maxDepth is 1
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ],
      1 // maxDepth
    )).toStrictEqual(
      copyOf(validSpasmTreeV2Depth0_Plus1),
    );

    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        // Depth2 should not be attached since recursion disabled
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ],
      10, // maxDepth
      false // ifRecursively
    )).toStrictEqual(
      copyOf(validSpasmTreeV2Depth0_Plus1),
    );

    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        // No events merged because merge is disabled
        copyOf(validSpasmTreeV2Depth0_Plus2),
        copyOf(validSpasmTreeV2Depth0_Plus4),
        copyOf(validSpasmTreeV2Depth0_Plus2),
        copyOf(validSpasmTreeV2Depth0_Plus1),
      ],
      10, // maxDepth
      true, // ifRecursively
      0, // depth (current)
      "any", // direction
      false // ifMerge
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus1));

    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth0_Post1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
      ]
    )).toStrictEqual(
      copyOf(validSpasmTreeV2Depth0_Plus2),
    );

    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
      ]
    )).toStrictEqual(
      copyOf(validSpasmTreeV2Depth0_Plus2),
    );

    // Try to add many duplicate relatives
    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus2));

    // Try many related and unrelated events
    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validDmpEventSignedClosed),
        copyOf(validPostWithRssItemTitleHasSpecialChars),
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1React1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply2),
        false,
        null,
        [],
        { id: 18081 },
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus2));

    // Add the same event
    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth2_Plus2),
      [
        copyOf(validSpasmTreeV2Depth2_Plus2),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth2_Plus2));

    // Merge if events have the same ID
    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validSpasmTreeV2Depth0_Plus2),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus2));

    // Merge if events have the same ID
    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validSpasmTreeV2Depth0_Plus2),
        copyOf(validSpasmTreeV2Depth0_Plus4),
        copyOf(validSpasmTreeV2Depth0_Plus2),
        copyOf(validSpasmTreeV2Depth0_Plus1),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus4));

    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus2),
      [
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus4));

    expect(addEventsToTree(
      copyOf(validSpasmTreeV2Depth0_Plus1),
      [
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
      ]
      // No events should be added because depth 2 is missing
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth0_Plus1));

    // Add parent and children any direction (up and down)
    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth2_Plus1));

    // Add parent and children any direction (up and down)
    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      [
        // order matters
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth0_Post1),
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth2_Plus2));

    // Test direction to avoid adding
    // parent to child to parent to child to parent
    expect(addEventsToTree(
      copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      [
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth1_Post1Reply1),
        copyOf(validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        copyOf(validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
      ]
    )).toStrictEqual(copyOf(validSpasmTreeV2Depth2_Plus1));
  });
});

// assignFormats()
describe("assignFormats() function tests", () => {
  test("assignFormats() should assign formats", () => {
    const input = copyOf(
      validDmpEventSignedClosedConvertedToSpasmV2)
    const output = copyOf(
      validDmpEventSignedClosedConvertedToSpasmV2)
    assignFormats(input)
    expect(input).toStrictEqual(output);
  });
});

// toBeShortTimestamp()
describe("toBeShortTimestamp() function tests", () => {
  test("toBeShortTimestamp() should return short timestamp", () => {
    expect(toBeShortTimestamp(1641074686178))
      .toStrictEqual(1641074686);
    expect(toBeShortTimestamp("1641074686178"))
      .toStrictEqual(1641074686);
    expect(toBeTimestamp("2024-04-27T00:00:00+00:00"))
      .toStrictEqual(1714176000000);
    expect(toBeShortTimestamp("2024-04-27T00:00:00+00:00"))
      .toStrictEqual(1714176000);
    expect(toBeTimestamp("Mon, 19 Feb 2025"))
      .toStrictEqual(1739923200000);
    expect(toBeShortTimestamp("Mon, 19 Feb 2025"))
      .toStrictEqual(1739923200);
    expect(toBeTimestamp("Wed, 19 Feb 2025 22:00:39 GMT"))
      .toStrictEqual(1740002439000);
    expect(toBeNostrTimestamp(1641074686))
      .toStrictEqual(1641074686);
    expect(toBeNostrTimestamp("1641074686"))
      .toStrictEqual(1641074686);
  });
});

// isHex()
// isNostrHex()
describe("isHex() and isNostrHex() function tests", () => {
  test("isHex() tests", () => {
    expect(isHex(null)).toStrictEqual(false);
    expect(isHex(undefined)).toStrictEqual(false);
    expect(isHex(true)).toStrictEqual(false);
    expect(isHex(false)).toStrictEqual(false);
    expect(isHex([1,2,3])).toStrictEqual(false);
    expect(isHex(123)).toStrictEqual(false);
    expect(isHex(0)).toStrictEqual(false);
    expect(isHex({ id: 1 })).toStrictEqual(false);
    expect(isHex("")).toStrictEqual(false);
    expect(isHex("0")).toStrictEqual(true);
    expect(isHex("0123456789abcdef")).toStrictEqual(true);
    expect(isHex("0123456789abcdefg")).toStrictEqual(false);
    expect(isHex(
      "https://degenrocket.space"
    )).toStrictEqual(false);
    expect(isHex(
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
    )).toStrictEqual(true);
    expect(isHex(
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(true);
  });
  test("isNostrHex() tests", () => {
    expect(isNostrHex(null)).toStrictEqual(false);
    expect(isNostrHex(undefined)).toStrictEqual(false);
    expect(isNostrHex(true)).toStrictEqual(false);
    expect(isNostrHex(false)).toStrictEqual(false);
    expect(isNostrHex([1,2,3])).toStrictEqual(false);
    expect(isNostrHex(123)).toStrictEqual(false);
    expect(isNostrHex(0)).toStrictEqual(false);
    expect(isNostrHex({ id: 1 })).toStrictEqual(false);
    expect(isNostrHex("")).toStrictEqual(false);
    expect(isNostrHex("0")).toStrictEqual(false);
    expect(isNostrHex("0123456789abcdef")).toStrictEqual(false);
    expect(isNostrHex("0123456789abcdefg")).toStrictEqual(false);
    expect(isNostrHex(
      "https://degenrocket.space"
    )).toStrictEqual(false);
    expect(isNostrHex(
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"
    )).toStrictEqual(true);
    expect(isNostrHex(
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    )).toStrictEqual(true);
  });
});

// Troubled events from monero.observer
describe("troubled events from monero.observer tests", () => {
  test("template() should return true if true", () => {
    const spasmEvent: SpasmEventV2 =
      validSpasmEventV2SourceMoneroObserverNbsp as SpasmEventV2;
    const spasmEnvelope: SpasmEventEnvelopeV2 =
      validSpasmEnvelopeV2SourceMoneroObserverSsp as SpasmEventEnvelopeV2;
    expect(
      getAllSigners(spasmEvent)
    ).toStrictEqual(
      getAllSigners(spasmEnvelope)
    );
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
    expect(fakeAsString('')).toStrictEqual('');
    expect(fakeAsString('0')).toStrictEqual('0');
    expect(fakeAsString(0)).toStrictEqual(0);
    expect(fakeAsString('0123')).toStrictEqual('0123');
    expect(fakeAsString(null)).toStrictEqual(null);
    expect(fakeAsString([null])).toStrictEqual([null]);
    expect(fakeAsString({a:1})).toStrictEqual({a:1});
  });
});

// fakeAsNumber()
describe("fakeAsNumber() function tests", () => {
  test("fakeAsNumber() should return original value", () => {
    expect(fakeAsNumber('')).toStrictEqual('');
    expect(fakeAsNumber('0')).toStrictEqual('0');
    expect(fakeAsNumber(0)).toStrictEqual(0);
    expect(fakeAsNumber('0123')).toStrictEqual('0123');
    expect(fakeAsNumber(null)).toStrictEqual(null);
    expect(fakeAsNumber([null])).toStrictEqual([null]);
    expect(fakeAsNumber({a:1})).toStrictEqual({a:1});
  });
});

// fakeAsArray()
describe("fakeAsArray() function tests", () => {
  test("fakeAsArray() should return original value", () => {
    expect(fakeAsArray('')).toStrictEqual('');
    expect(fakeAsArray('0')).toStrictEqual('0');
    expect(fakeAsArray(0)).toStrictEqual(0);
    expect(fakeAsArray('0123')).toStrictEqual('0123');
    expect(fakeAsArray(null)).toStrictEqual(null);
    expect(fakeAsArray([null])).toStrictEqual([null]);
    expect(fakeAsArray({a:1})).toStrictEqual({a:1});
  });
});

// fakeAsNull()
describe("fakeAsNull() function tests", () => {
  test("fakeAsNull() should return original value", () => {
    expect(fakeAsNull('')).toStrictEqual('');
    expect(fakeAsNull('0')).toStrictEqual('0');
    expect(fakeAsNull(0)).toStrictEqual(0);
    expect(fakeAsNull('0123')).toStrictEqual('0123');
    expect(fakeAsNull(null)).toStrictEqual(null);
    expect(fakeAsNull([null])).toStrictEqual([null]);
    expect(fakeAsNull({a:1})).toStrictEqual({a:1});
  });
});

// fakeAsAny()
describe("fakeAsAny() function tests", () => {
  test("fakeAsAny() should return original value", () => {
    expect(fakeAsAny('')).toStrictEqual('');
    expect(fakeAsAny('0')).toStrictEqual('0');
    expect(fakeAsAny(0)).toStrictEqual(0);
    expect(fakeAsAny('0123')).toStrictEqual('0123');
    expect(fakeAsAny(null)).toStrictEqual(null);
    expect(fakeAsAny([null])).toStrictEqual([null]);
    expect(fakeAsAny({a:1})).toStrictEqual({a:1});
  });
});

// fakeAsObject()
describe("fakeAsObject() function tests", () => {
  test("fakeAsObject() should return original value", () => {
    expect(fakeAsObject('')).toStrictEqual('');
    expect(fakeAsObject('0')).toStrictEqual('0');
    expect(fakeAsObject(0)).toStrictEqual(0);
    expect(fakeAsObject('0123')).toStrictEqual('0123');
    expect(fakeAsObject(null)).toStrictEqual(null);
    expect(fakeAsObject([null])).toStrictEqual([null]);
    expect(fakeAsObject({a:1})).toStrictEqual({a:1});
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

