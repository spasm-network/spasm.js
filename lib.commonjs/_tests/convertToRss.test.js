"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const convertToRss_1 = require("../convert/convertToRss");
const _events_data_1 = require("./_events-data");
const convertToSpasm_1 = require("../convert/convertToSpasm");
const utils_2 = require("../utils");
describe("convertToRss() different tests", () => {
    test("convertToRss() for DMP signed post with default config", () => {
        // Without converting description to HTML
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        // Without converting description to HTML, but with extra event info
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            convertDescriptionToHtml: false
        })).toStrictEqual({
            ...(0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent),
            description: (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent).description +=
                "\n\n---" +
                    "\nSigned date: " +
                    (0, utils_2.toBeShortDate)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2.timestamp) +
                    "\nEthereum signer: " + (0, utils_1.getVerifiedEthereumSigners)(_events_data_1.validDmpEventSignedClosed)[0]
        });
        // With converting description to HTML (default config)
        const customDomain = "https://degenrocket.space/news";
        const customDomainSame = "https://degenrocket.space/news/";
        const outputDmpWithHtml = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        outputDmpWithHtml.description =
            "<p>" + outputDmpWithHtml.description + `</p>
` + `<hr>
` +
                "<p>Signed date: " +
                (0, utils_2.toBeShortDate)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2.timestamp) +
                "<br>" +
                "Ethereum signer: " + (0, utils_1.getVerifiedEthereumSigners)(_events_data_1.validDmpEventSignedClosed)[0] +
                `</p>
`;
        const outputDmpWithHtmlWithSubmitComment = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        outputDmpWithHtmlWithSubmitComment.description =
            "<p>" + outputDmpWithHtmlWithSubmitComment.description + `</p>
` + `<hr>
` +
                `<p><a href="${customDomainSame + (0, utils_1.extractSpasmId01)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2)}">Submit your comment on Spasm</a><br>` +
                "Signed date: " +
                (0, utils_2.toBeShortDate)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2.timestamp) +
                "<br>" +
                "Ethereum signer: " + (0, utils_1.getVerifiedEthereumSigners)(_events_data_1.validDmpEventSignedClosed)[0] +
                `</p>
`;
        outputDmpWithHtmlWithSubmitComment.link =
            customDomainSame + (0, utils_1.extractSpasmId01)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed))
            .toStrictEqual(outputDmpWithHtml);
        // With converting description to HTML (explicit)
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            convertDescriptionToHtml: true
        })).toStrictEqual(outputDmpWithHtml);
        // With converting description to HTML (explicit)
        // and a custom domain and a submit comment link.
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            convertDescriptionToHtml: true,
            customDomain: customDomain
        })).toStrictEqual(outputDmpWithHtmlWithSubmitComment);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            convertDescriptionToHtml: true,
            customDomain: customDomainSame
        })).toStrictEqual(outputDmpWithHtmlWithSubmitComment);
    });
    test("convertToRss() for DMP signed post with custom config", () => {
        const customDomain = "https://degenrocket.space/news";
        const customGuid = "https://degenrocket.space/news/custom-guid";
        const customLink = "https://degenrocket.space/news/custom-link";
        const customDomainSame = "https://degenrocket.space/news/";
        const spasmId = (0, utils_1.extractSpasmId01)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const outputWithCustomDomain = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        outputWithCustomDomain.link = customDomain + "/" + spasmId;
        const outputWithCustomGuid = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        outputWithCustomGuid.guid = customGuid;
        const outputWithCustomLink = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
        outputWithCustomLink.link = customLink;
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            customDomain,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(outputWithCustomDomain);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            customDomain: customDomainSame,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(outputWithCustomDomain);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            customGuid,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(outputWithCustomGuid);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, {
            customLink, convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(outputWithCustomLink);
    });
    test("convertToRss() for SpasmEventBodyV2 unsigned post with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventBodyV2, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validSpasmEventBodyV2ConvertedToRssEvent);
    });
    test("convertToRss() for SpasmEventBodySignedClosedV2 signed post with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventBodySignedClosedV2, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validSpasmEventBodySignedClosedV2ConvertedToRssEvent);
    });
    test("convertToRss() for validNostrReplyToDmpEvent signed reply with default config", () => {
        const outputWithReplyInfo = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfo.title = "Comment: " + outputWithReplyInfo.description;
        outputWithReplyInfo.description +=
            "\n\n---" +
                "\nSigned date: " +
                (0, utils_2.toBeShortDate)((0, convertToSpasm_1.convertToSpasm)(_events_data_1.validNostrReplyToDmpEvent).timestamp) +
                "\nNostr signer: " + (0, utils_2.toBeNpub)(_events_data_1.validNostrReplyToDmpEvent.pubkey) +
                "\n\n---\nThis message is a response to: " +
                _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, {
            convertDescriptionToHtml: false
        })).toStrictEqual(outputWithReplyInfo);
    });
    test("convertToRss() for validNostrReplyToDmpEvent signed reply with custom config", () => {
        const customDomain = "https://degenrocket.space/news";
        const customDomainSame = "https://degenrocket.space/news/";
        const spasmId = (0, utils_1.extractSpasmId01)(_events_data_1.validNostrReplyToDmpEvent);
        const outputWithReplyInfo = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfo.title = "Comment: " + outputWithReplyInfo.description;
        outputWithReplyInfo.description += "\n\n---\nThis message is a response to: " +
            customDomain + "/" +
            _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        outputWithReplyInfo.link = customDomain + "/" + spasmId;
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, {
            customDomain,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { reply: { enabled: false } } }
        })).toStrictEqual(outputWithReplyInfo);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, {
            customDomain: customDomainSame,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { reply: { enabled: false } } }
        })).toStrictEqual(outputWithReplyInfo);
        const outputWithReplyInfoWithoutDomain = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfoWithoutDomain.title = "Comment: " + outputWithReplyInfoWithoutDomain.description;
        outputWithReplyInfoWithoutDomain.description += "\n\n---\nThis message is a response to: " +
            _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        outputWithReplyInfoWithoutDomain.link = customDomain + "/" + spasmId;
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, {
            customDomain,
            extraContent: { addDomain: { enabled: false } },
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { reply: { enabled: false } } }
        })).toStrictEqual(outputWithReplyInfoWithoutDomain);
    });
    test("convertToRss() for Spasm signed reaction with default config", () => {
        const outputWithExtraContent = (0, utils_1.copyOf)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent);
        outputWithExtraContent.description += "\n\n---\nThis message is a response to: " +
            (0, utils_1.extractParentSpasmId01)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1, {
            convertDescriptionToHtml: false,
        })).not.toEqual(outputWithExtraContent);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).not.toEqual(outputWithExtraContent);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { react: { enabled: false } } }
        })).toStrictEqual(outputWithExtraContent);
    });
    test("convertToRss() for RSS unsigned event with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validPostWithRssItem, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validPostWithRssItemConvertedToRssEvent);
    });
    test("convertToRss() for RSS unsigned event with extra event info", () => {
        const output = (0, utils_1.copyOf)((0, convertToRss_1.convertToRssEvent)(_events_data_1.validPostWithRssItem, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        }));
        output.description +=
            "\n\n---" +
                "\nPublished date: " +
                (0, utils_2.toBeShortDate)((0, convertToSpasm_1.convertToSpasm)(_events_data_1.validPostWithRssItem).timestamp);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validPostWithRssItem, {
            convertDescriptionToHtml: false
        })).toStrictEqual(output);
    });
    test("convertToRss() for RSS unsigned event with extra event info", () => {
        // const customDomain = "https://degenrocket.space/news"
        const customDomainSame = "https://forum.spasm.network/news/";
        const output = (0, utils_1.copyOf)((0, convertToRss_1.convertToRssEvent)(_events_data_1.validPostWithRssItem, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        }));
        output.description +=
            "\n\n---" +
                "\n[Submit your comment on Spasm](" +
                customDomainSame +
                (0, utils_1.extractSpasmId01)((0, convertToSpasm_1.convertToSpasm)(_events_data_1.validPostWithRssItem)) +
                ")" +
                "\nPublished date: " +
                (0, utils_2.toBeShortDate)((0, convertToSpasm_1.convertToSpasm)(_events_data_1.validPostWithRssItem).timestamp);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validPostWithRssItem, {
            convertDescriptionToHtml: false,
            customDomain: customDomainSame
        })).toStrictEqual(output);
    });
    test("convertToRss() for events with media links", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinks, {
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent);
    });
    test("convertToRss() with hooks", () => {
        // Hook 1
        const hook1 = (rssEvent) => {
            if (rssEvent.description && typeof (rssEvent.description) === "string") {
                rssEvent.description += " - changed by hook1";
            }
        };
        const outputAfterHook1 = (0, utils_1.copyOf)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        outputAfterHook1.description +=
            "\n\n---" +
                "\nSigned date: " +
                (0, utils_2.toBeShortDate)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks.timestamp) +
                "\nEthereum signer: " + (0, utils_1.getVerifiedEthereumSigners)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks)[0] +
                "\nNostr signer: " + (0, utils_2.toBeNpub)((0, utils_2.getVerifiedNostrSigners)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks)[0]);
        outputAfterHook1.description += " - changed by hook1";
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: hook1,
            convertDescriptionToHtml: false,
        })).toStrictEqual(outputAfterHook1);
        // Hook 2
        const hook2 = (rssEvent) => {
            if (rssEvent.description && typeof (rssEvent.description) === "string") {
                rssEvent.description = "Description replaced by hook2";
            }
            if (rssEvent.title && typeof (rssEvent.title) === "string") {
                rssEvent.title = "Title replaced by hook2";
            }
        };
        const outputAfterHook2 = (0, utils_1.copyOf)(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent);
        outputAfterHook2.description = "Description replaced by hook2";
        outputAfterHook2.title = "Title replaced by hook2";
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinks, {
            postExecutionHook: hook2,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(outputAfterHook2);
        // Hook with error
        const hookError = (rssEvent) => {
            if (rssEvent) {
                throw new Error("Hook with error");
            }
            else {
                throw new Error("Hook with error anyways");
            }
        };
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: hookError
        })).toStrictEqual(null);
        jest.restoreAllMocks();
        // Invalid hooks
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: (0, utils_1.fakeAsFunction)("hello"),
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        // Hook without arguments
        const hookEmpty = () => { };
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: hookEmpty,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        const hookEmpty2 = () => { return true; };
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: hookEmpty2,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        const hookEmpty3 = () => { return false; };
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks, {
            postExecutionHook: hookEmpty3,
            convertDescriptionToHtml: false,
            extraEventInfo: { forAction: { post: { enabled: false } } }
        })).toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
    });
});
describe("generateRssFeed() different tests", () => {
    test("generateRssFeed() with simple config", () => {
        const validDmpEventSignedClosedWithDbAddedTime = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2);
        validDmpEventSignedClosedWithDbAddedTime.db =
            { addedTimestamp: 1767300000000 };
        expect((0, convertToRss_1.generateRssFeed)([
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
        )).toStrictEqual(_events_data_1.validRssFeedChannelEmpty);
    });
    test("generateRssFeed() with one Ethereum signer in filters", () => {
        expect((0, convertToRss_1.generateRssFeed)([], {
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
        })).toStrictEqual(_events_data_1.validRssFeedChannelEmptyWithEthereumSigner);
    });
    test("generateRssFeed() with Nostr and Ethereum signers in filters", () => {
        expect((0, convertToRss_1.generateRssFeed)([], {
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
        })).toStrictEqual(_events_data_1.validRssFeedChannelEmptyWithNostrSigner);
    });
});
//# sourceMappingURL=convertToRss.test.js.map