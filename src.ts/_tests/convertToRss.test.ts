import {copyOf, extractParentSpasmId01, extractSpasmId01, fakeAsFunction, getVerifiedEthereumSigners} from "../utils/utils";
import {
  convertToRss,
  convertToRssEvent,
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
  validRssFeedChannelEmpty,
  validRssFeedChannelEmptyWithEthereumSigner,
  validRssFeedChannelEmptyWithNostrSigner,
  validSpasmEventBodySignedClosedV2,
  validSpasmEventBodySignedClosedV2ConvertedToRssEvent,
  validSpasmEventBodyV2,
  validSpasmEventBodyV2ConvertedToRssEvent,
  validSpasmEventV2TreeDepth2_Post1Reply2React1,
  validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent,
} from "./_events-data";
import {RssEvent, SpasmEventV2} from "../types/interfaces";
import {convertToSpasm} from "../convert/convertToSpasm";
import {getVerifiedNostrSigners, toBeNpub, toBeShortDate} from "../utils";

describe("convertToRss() different tests", () => {
  test("convertToRss() for DMP signed post with default config", () => {
    // Without converting description to HTML
    expect(convertToRss(validDmpEventSignedClosed, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validDmpEventSignedClosedConvertedToRssEvent)
    // Without converting description to HTML, but with extra event info
    expect(convertToRss(validDmpEventSignedClosed, {
      convertDescriptionToHtml: false
    })).toStrictEqual({
      ...copyOf(validDmpEventSignedClosedConvertedToRssEvent),
      description: copyOf(validDmpEventSignedClosedConvertedToRssEvent).description +=
        "\n\n---" +
        "\nSigned date: " +
        toBeShortDate(validDmpEventSignedClosedConvertedToSpasmV2.timestamp!)!+
        "\nEthereum signer: " + getVerifiedEthereumSigners(validDmpEventSignedClosed)[0]
    })

    // With converting description to HTML (default config)
    const customDomain = "https://degenrocket.space/news"
    const customDomainSame = "https://degenrocket.space/news/"

    const outputDmpWithHtml: RssEvent =
      copyOf(validDmpEventSignedClosedConvertedToRssEvent)
    outputDmpWithHtml.description =
      "<p>" + outputDmpWithHtml.description + `</p>
` + `<hr>
` +
        "<p>Signed date: " +
        toBeShortDate(validDmpEventSignedClosedConvertedToSpasmV2.timestamp!)! +
        "<br>" +
        "Ethereum signer: " + getVerifiedEthereumSigners(validDmpEventSignedClosed)[0] +
        `</p>
`
    const outputDmpWithHtmlWithSubmitComment: RssEvent =
      copyOf(validDmpEventSignedClosedConvertedToRssEvent)
    outputDmpWithHtmlWithSubmitComment.description =
      "<p>" + outputDmpWithHtmlWithSubmitComment.description + `</p>
` + `<hr>
` +
    `<p><a href="${customDomainSame + extractSpasmId01(validDmpEventSignedClosedConvertedToSpasmV2)}">Submit your comment on Spasm</a><br>` +
        "Signed date: " +
        toBeShortDate(validDmpEventSignedClosedConvertedToSpasmV2.timestamp!)! +
        "<br>" +
        "Ethereum signer: " + getVerifiedEthereumSigners(validDmpEventSignedClosed)[0] +
        `</p>
`
    outputDmpWithHtmlWithSubmitComment.link = 
      customDomainSame + extractSpasmId01(validDmpEventSignedClosedConvertedToSpasmV2)

    expect(convertToRss(validDmpEventSignedClosed))
      .toStrictEqual(outputDmpWithHtml)
    // With converting description to HTML (explicit)
    expect(convertToRss(validDmpEventSignedClosed, {
      convertDescriptionToHtml: true
    })).toStrictEqual(outputDmpWithHtml)
    // With converting description to HTML (explicit)
    // and a custom domain and a submit comment link.
    expect(convertToRss(validDmpEventSignedClosed, {
      convertDescriptionToHtml: true,
      customDomain: customDomain
    })).toStrictEqual(outputDmpWithHtmlWithSubmitComment)
    expect(convertToRss(validDmpEventSignedClosed, {
      convertDescriptionToHtml: true,
      customDomain: customDomainSame
    })).toStrictEqual(outputDmpWithHtmlWithSubmitComment)
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

    expect(convertToRss(validDmpEventSignedClosed, {
      customDomain,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(outputWithCustomDomain)
    expect(convertToRss(validDmpEventSignedClosed, {
      customDomain: customDomainSame,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(outputWithCustomDomain)
    expect(convertToRss(validDmpEventSignedClosed, {
      customGuid,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(outputWithCustomGuid)
    expect(convertToRss(validDmpEventSignedClosed, {
      customLink, convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(outputWithCustomLink)
  });
  test("convertToRss() for SpasmEventBodyV2 unsigned post with default config", () => {
    expect(convertToRss(validSpasmEventBodyV2, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validSpasmEventBodyV2ConvertedToRssEvent)
  });
  test("convertToRss() for SpasmEventBodySignedClosedV2 signed post with default config", () => {
    expect(convertToRss(validSpasmEventBodySignedClosedV2, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validSpasmEventBodySignedClosedV2ConvertedToRssEvent)
  });
  test("convertToRss() for validNostrReplyToDmpEvent signed reply with default config", () => {
    const outputWithReplyInfo = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfo.title = "Comment: " + outputWithReplyInfo.description
    outputWithReplyInfo.description +=
      "\n\n---" +
      "\nSigned date: " +
      toBeShortDate(convertToSpasm(validNostrReplyToDmpEvent)!.timestamp!)! +
      "\nNostr signer: " + toBeNpub(validNostrReplyToDmpEvent.pubkey) +
      "\n\n---\nThis message is a response to: " + 
      validNostrReplyToDmpEvent.tags[3][1]
    expect(convertToRss(validNostrReplyToDmpEvent, {
      convertDescriptionToHtml: false
    })).toStrictEqual(outputWithReplyInfo)
  });
  test("convertToRss() for validNostrReplyToDmpEvent signed reply with custom config", () => {
    const customDomain = "https://degenrocket.space/news"
    const customDomainSame = "https://degenrocket.space/news/"
    const spasmId = extractSpasmId01(validNostrReplyToDmpEvent)
    const outputWithReplyInfo = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfo.title = "Comment: " + outputWithReplyInfo.description
    outputWithReplyInfo.description += "\n\n---\nThis message is a response to: " + 
      customDomain + "/" +
      validNostrReplyToDmpEvent.tags[3][1]
    outputWithReplyInfo.link = customDomain + "/" + spasmId
    expect(convertToRss(validNostrReplyToDmpEvent, {
      customDomain,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { reply: { enabled: false } } }
    })).toStrictEqual(outputWithReplyInfo)
    expect(convertToRss(validNostrReplyToDmpEvent, {
      customDomain: customDomainSame,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { reply: { enabled: false } } }
    })).toStrictEqual(outputWithReplyInfo)

    const outputWithReplyInfoWithoutDomain = copyOf(validNostrReplyToDmpEventConvertedToRssEvent)
    outputWithReplyInfoWithoutDomain.title = "Comment: " + outputWithReplyInfoWithoutDomain.description
    outputWithReplyInfoWithoutDomain.description += "\n\n---\nThis message is a response to: " + 
      validNostrReplyToDmpEvent.tags[3][1]
    outputWithReplyInfoWithoutDomain.link = customDomain + "/" + spasmId
    expect(convertToRss(validNostrReplyToDmpEvent, {
      customDomain,
      extraContent: { addDomain: { enabled: false }},
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { reply: { enabled: false } } }
    })).toStrictEqual(outputWithReplyInfoWithoutDomain)
  });
  test("convertToRss() for Spasm signed reaction with default config", () => {
    const outputWithExtraContent = copyOf(validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent)
    outputWithExtraContent.description += "\n\n---\nThis message is a response to: " +
      extractParentSpasmId01(validSpasmEventV2TreeDepth2_Post1Reply2React1)
    expect(convertToRss(validSpasmEventV2TreeDepth2_Post1Reply2React1, {
      convertDescriptionToHtml: false,
    })).not.toEqual(outputWithExtraContent)
    expect(convertToRss(validSpasmEventV2TreeDepth2_Post1Reply2React1, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).not.toEqual(outputWithExtraContent)
    expect(convertToRss(validSpasmEventV2TreeDepth2_Post1Reply2React1, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { react: { enabled: false } } }
    })).toStrictEqual(outputWithExtraContent)
  });
  test("convertToRss() for RSS unsigned event with default config", () => {
    expect(convertToRss(validPostWithRssItem, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validPostWithRssItemConvertedToRssEvent)
  });
  test("convertToRss() for RSS unsigned event with extra event info", () => {
    const output = copyOf(convertToRssEvent(validPostWithRssItem, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    }))
    output.description +=
        "\n\n---" +
        "\nPublished date: " +
        toBeShortDate(convertToSpasm(validPostWithRssItem)!.timestamp!)!
    expect(convertToRss(validPostWithRssItem, {
      convertDescriptionToHtml: false
    })).toStrictEqual(output)
  });
  test("convertToRss() for RSS unsigned event with extra event info", () => {
    // const customDomain = "https://degenrocket.space/news"
    const customDomainSame = "https://forum.spasm.network/news/"
    const output = copyOf(convertToRssEvent(validPostWithRssItem, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    }))
    output.description +=
        "\n\n---" +
        "\n[Submit your comment on Spasm](" +
        customDomainSame +
        extractSpasmId01(convertToSpasm(validPostWithRssItem)!) +
        ")" +
        "\nPublished date: " +
        toBeShortDate(convertToSpasm(validPostWithRssItem)!.timestamp!)!
    expect(convertToRss(validPostWithRssItem, {
      convertDescriptionToHtml: false,
      customDomain: customDomainSame
    })).toStrictEqual(output)
  });
  test("convertToRss() for events with media links", () => {
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
    expect(convertToRss(validMultiSignedSpasmEventV2WithMarkdownMediaLinks, {
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent)
  });
  test("convertToRss() with hooks", () => {
    // Hook 1
    const hook1 = (rssEvent: RssEvent) => {
      if (rssEvent.description && typeof(rssEvent.description) === "string") {
        rssEvent.description += " - changed by hook1"
      }
    }
    const outputAfterHook1 = copyOf(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
    outputAfterHook1.description +=
        "\n\n---" +
        "\nSigned date: " +
        toBeShortDate(validMultiSignedSpasmEventV2WithMediaLinks.timestamp!)! +
        "\nEthereum signer: " + getVerifiedEthereumSigners(validMultiSignedSpasmEventV2WithMediaLinks)[0] +
        "\nNostr signer: " + toBeNpub(
          getVerifiedNostrSigners(validMultiSignedSpasmEventV2WithMediaLinks)[0] as string
        )
    outputAfterHook1.description += " - changed by hook1"

    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: hook1,
      convertDescriptionToHtml: false,
    })).toStrictEqual(outputAfterHook1)

    // Hook 2
    const hook2 = (rssEvent: RssEvent) => {
      if (rssEvent.description && typeof(rssEvent.description) === "string") {
        rssEvent.description = "Description replaced by hook2"
      }
      if (rssEvent.title && typeof(rssEvent.title) === "string") {
        rssEvent.title = "Title replaced by hook2"
      }
    }
    const outputAfterHook2 = copyOf(validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent)
    outputAfterHook2.description = "Description replaced by hook2"
    outputAfterHook2.title = "Title replaced by hook2"

    expect(convertToRss(validMultiSignedSpasmEventV2WithMarkdownMediaLinks, {
      postExecutionHook: hook2,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(outputAfterHook2)

    // Hook with error
    const hookError = (rssEvent: RssEvent) => {
      if (rssEvent) {
        throw new Error("Hook with error")
      } else {
        throw new Error("Hook with error anyways")
      }
    }

    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: hookError
    })).toStrictEqual(null)
    jest.restoreAllMocks();

    // Invalid hooks
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: fakeAsFunction("hello"),
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)

    // Hook without arguments
    const hookEmpty = () => { }
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: hookEmpty,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
    const hookEmpty2 = () => { return true }
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: hookEmpty2,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
    const hookEmpty3 = () => { return false }
    expect(convertToRss(validMultiSignedSpasmEventV2WithMediaLinks, {
      postExecutionHook: hookEmpty3,
      convertDescriptionToHtml: false,
      extraEventInfo: { forAction: { post: { enabled: false } } }
    })).toStrictEqual(validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent)
  });
});

describe("generateRssFeed() different tests", () => {
  test("generateRssFeed() with simple config", () => {
    const validDmpEventSignedClosedWithDbAddedTime: SpasmEventV2 =
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2)
    validDmpEventSignedClosedWithDbAddedTime.db =
      { addedTimestamp: 1767300000000 }
    expect(generateRssFeed([
      // validDmpEventSignedClosed,
      // validDmpEventSignedClosed,
      // validDmpEventSignedClosedWithDbAddedTime,
      // validDmpEventSignedClosedConvertedToSpasmV2,
      // validMultiSignedSpasmEventV2WithMediaLinks,
      // validMultiSignedSpasmEventV2WithMarkdownMediaLinks,
      // validPostWithRssItem
    ], {
      channel: {
        fullUri: "https://degenrocket.space/api/events?format=rss&action=post&action=reply",
        lastBuildDate: "Tue, 01 Jan 2026 12:34:56 GMT"
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
    // )).not.toStrictEqual("hello world")
    )).toStrictEqual(validRssFeedChannelEmpty)
  });
  test("generateRssFeed() with one Ethereum signer in filters", () => {
    expect(generateRssFeed([
    ], {
      channel: {
        fullUri: "https://degenrocket.space/api/events?format=rss&action=post&action=reply",
        lastBuildDate: "Tue, 01 Jan 2026 12:34:56 GMT",
        // enableAutoGeneratedNamesInTitle: false
      },
      filters: {
        signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
      },
      customConvertToRssConfig: {
        customDomain: "https://degenrocket.space/news",
        addSpasmEnvelope: false
      }
    }
    )).toStrictEqual(validRssFeedChannelEmptyWithEthereumSigner)
  });
  test("generateRssFeed() with Nostr and Ethereum signers in filters", () => {
    expect(generateRssFeed([
    ], {
      channel: {
        fullUri: "https://degenrocket.space/api/events?format=rss&action=post&action=reply",
        lastBuildDate: "Tue, 01 Jan 2026 12:34:56 GMT",
        // enableAutoGeneratedNamesInTitle: false
      },
      filters: {
        signer: [
          "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
          "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ]
      },
      customConvertToRssConfig: {
        customDomain: "https://degenrocket.space/news",
        addSpasmEnvelope: false
      }
    }
    )).toStrictEqual(validRssFeedChannelEmptyWithNostrSigner)
  });
});
