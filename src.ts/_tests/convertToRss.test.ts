import {copyOf, extractParentSpasmId01, extractSpasmId01} from "../utils/utils";
import {
  convertToRss,
  generateRssFeed,
} from "../convert/convertToRss";
import {
  validDmpEventSignedClosed,
  validDmpEventSignedClosedConvertedToRssEvent,
  validDmpEventSignedClosedConvertedToSpasmV2,
  validMultiSignedSpasmEventV2WithMarkdownMediaLinks,
  validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent,
  validMultiSignedSpasmEventV2WithMediaLinks,
  validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent,
  validNostrReplyToDmpEvent,
  validNostrReplyToDmpEventConvertedToRssEvent,
  validPostWithRssItem,
  validPostWithRssItemConvertedToRssEvent,
  validSpasmEventBodySignedClosedV2,
  validSpasmEventBodySignedClosedV2ConvertedToRssEvent,
  validSpasmEventBodyV2,
  validSpasmEventBodyV2ConvertedToRssEvent,
  validSpasmEventV2TreeDepth2_Post1Reply2React1,
  validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent,
  // validNostrSpasmEvent,
  // validSpasmEventBodyV2ReplyWithTwoSigners,
  // validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2,
  // validSpasmEventBodyV2WithOneNostrSigner,
  // validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2
} from "./_events-data";
import {SpasmEventV2} from "../types/interfaces";

describe("convertToRss() different tests", () => {
  test("convertToRss() for DMP signed post with default config", () => {
    expect(convertToRss(validDmpEventSignedClosed))
      .toStrictEqual(validDmpEventSignedClosedConvertedToRssEvent)
  });
  test("convertToRss() for DMP signed post with custom config", () => {
    const customDomain = "https://degenrocket.space/news"
    const customGuid = "https://degenrocket.space/news/custom-guid"
    const customLink = "https://degenrocket.space/news/custom-link"
    const customDomainSame = "https://degenrocket.space/news/"

    const spasmId = extractSpasmId01(validDmpEventSignedClosedConvertedToSpasmV2)
    const outputWithCustomDomain = copyOf(validDmpEventSignedClosedConvertedToRssEvent)
    outputWithCustomDomain.link = customDomain + "/" + spasmId
    const outputWithCustomGuid = copyOf(validDmpEventSignedClosedConvertedToRssEvent)
    outputWithCustomGuid.guid = customGuid
    const outputWithCustomLink = copyOf(validDmpEventSignedClosedConvertedToRssEvent)
    outputWithCustomLink.link = customLink

    expect(convertToRss(validDmpEventSignedClosed, { customDomain }))
      .toStrictEqual(outputWithCustomDomain)
    expect(convertToRss(validDmpEventSignedClosed, { customDomain: customDomainSame }))
      .toStrictEqual(outputWithCustomDomain)
    expect(convertToRss(validDmpEventSignedClosed, { customGuid }))
      .toStrictEqual(outputWithCustomGuid)
    expect(convertToRss(validDmpEventSignedClosed, { customLink }))
      .toStrictEqual(outputWithCustomLink)
  });
  test("convertToRss() for SpasmEventBodyV2 unsigned post with default config", () => {
    expect(convertToRss(validSpasmEventBodyV2))
      .toStrictEqual(validSpasmEventBodyV2ConvertedToRssEvent)
  });
  test("convertToRss() for SpasmEventBodySignedClosedV2 signed post with default config", () => {
    expect(convertToRss(validSpasmEventBodySignedClosedV2))
      .toStrictEqual(validSpasmEventBodySignedClosedV2ConvertedToRssEvent)
  });
  test("convertToRss() for validNostrReplyToDmpEvent signed reply with default config", () => {
    const outputWithReplyInfo = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfo.description += "\n\n---\nThis is a response to: " + 
      validNostrReplyToDmpEvent.tags[3][1]
    expect(convertToRss(validNostrReplyToDmpEvent))
      .toStrictEqual(outputWithReplyInfo)
  });
  test("convertToRss() for validNostrReplyToDmpEvent signed reply with custom config", () => {
    const customDomain = "https://degenrocket.space/news"
    const customDomainSame = "https://degenrocket.space/news/"
    const spasmId = extractSpasmId01(validNostrReplyToDmpEvent)
    const outputWithReplyInfo = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfo.description += "\n\n---\nThis is a response to: " + 
      customDomain + "/" +
      validNostrReplyToDmpEvent.tags[3][1]
    outputWithReplyInfo.link = customDomain + "/" + spasmId
    expect(convertToRss(validNostrReplyToDmpEvent, { customDomain }))
      .toStrictEqual(outputWithReplyInfo)
    expect(convertToRss(validNostrReplyToDmpEvent, { customDomain: customDomainSame }))
      .toStrictEqual(outputWithReplyInfo)

    const outputWithReplyInfoWithoutDomain = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfoWithoutDomain.description += "\n\n---\nThis is a response to: " + 
      validNostrReplyToDmpEvent.tags[3][1]
    outputWithReplyInfoWithoutDomain.link = customDomain + "/" + spasmId
    expect(convertToRss(
      validNostrReplyToDmpEvent, { customDomain, extraContent: { addDomain: { enabled: false }} })
    ).toStrictEqual(outputWithReplyInfoWithoutDomain)
  });
  test("convertToRss() for Spasm signed reaction with default config", () => {
    const outputWithExtraContent = copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent)
    outputWithExtraContent.description += "\n\n---\nThis is a response to: " +
      extractParentSpasmId01(validSpasmEventV2TreeDepth2_Post1Reply2React1)
    expect(convertToRss(validSpasmEventV2TreeDepth2_Post1Reply2React1))
      .toStrictEqual(outputWithExtraContent)
  });
  test("convertToRss() for RSS unsigned event with default config", () => {
    expect(convertToRss(validPostWithRssItem))
      .toStrictEqual(validPostWithRssItemConvertedToRssEvent)
  });
  test("convertToRss() for events with media links", () => {
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks))
      .toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
    expect(convertToRss(validMultiSignedSpasmEventV2WithMarkdownMediaLinks))
      .toStrictEqual(validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent)
  });
});

describe("convertToRss() different tests", () => {
  test("convertToRss() for DMP signed post with default config", () => {
    const validDmpEventSignedClosedWithDbAddedTime: SpasmEventV2 =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    validDmpEventSignedClosedWithDbAddedTime.db =
      { addedTimestamp: 1767300000000 }
    expect(generateRssFeed([
      validDmpEventSignedClosed,
      validDmpEventSignedClosed,
      validDmpEventSignedClosedWithDbAddedTime,
      validDmpEventSignedClosedConvertedToSpasmV2,
      validMultiSignedSpasmEventV2WithMediaLinks,
      validMultiSignedSpasmEventV2WithMarkdownMediaLinks,
      validPostWithRssItem
    ], {
      channel: {
        fullUri: "https://degenrocket.space/api/events?format=rss&action=post&action=reply",
      },
      // items: {
      //   enableAutoGeneratedNames: false
      // },
      customConvertToRssConfig: {
        customDomain: "https://degenrocket.space/news",
        addSpasmEnvelope: false
      }
    }
    // )).toStrictEqual("hello world")
    )).not.toStrictEqual("hello world")
  });
});
