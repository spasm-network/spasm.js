"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const convertToRss_1 = require("../convert/convertToRss");
const _events_data_1 = require("./_events-data");
describe("convertToRss() different tests", () => {
    test("convertToRss() for DMP signed post with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed))
            .toStrictEqual(_events_data_1.validDmpEventSignedClosedConvertedToRssEvent);
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
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, { customDomain }))
            .toStrictEqual(outputWithCustomDomain);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, { customDomain: customDomainSame }))
            .toStrictEqual(outputWithCustomDomain);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, { customGuid }))
            .toStrictEqual(outputWithCustomGuid);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validDmpEventSignedClosed, { customLink }))
            .toStrictEqual(outputWithCustomLink);
    });
    test("convertToRss() for SpasmEventBodyV2 unsigned post with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventBodyV2))
            .toStrictEqual(_events_data_1.validSpasmEventBodyV2ConvertedToRssEvent);
    });
    test("convertToRss() for SpasmEventBodySignedClosedV2 signed post with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventBodySignedClosedV2))
            .toStrictEqual(_events_data_1.validSpasmEventBodySignedClosedV2ConvertedToRssEvent);
    });
    test("convertToRss() for validNostrReplyToDmpEvent signed reply with default config", () => {
        const outputWithReplyInfo = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfo.description += "\n\n---\nThis is a response to: " +
            _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent))
            .toStrictEqual(outputWithReplyInfo);
    });
    test("convertToRss() for validNostrReplyToDmpEvent signed reply with custom config", () => {
        const customDomain = "https://degenrocket.space/news";
        const customDomainSame = "https://degenrocket.space/news/";
        const spasmId = (0, utils_1.extractSpasmId01)(_events_data_1.validNostrReplyToDmpEvent);
        const outputWithReplyInfo = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfo.description += "\n\n---\nThis is a response to: " +
            customDomain + "/" +
            _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        outputWithReplyInfo.link = customDomain + "/" + spasmId;
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, { customDomain }))
            .toStrictEqual(outputWithReplyInfo);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, { customDomain: customDomainSame }))
            .toStrictEqual(outputWithReplyInfo);
        const outputWithReplyInfoWithoutDomain = (0, utils_1.copyOf)(_events_data_1.validNostrReplyToDmpEventConvertedToRssEvent);
        outputWithReplyInfoWithoutDomain.description += "\n\n---\nThis is a response to: " +
            _events_data_1.validNostrReplyToDmpEvent.tags[3][1];
        outputWithReplyInfoWithoutDomain.link = customDomain + "/" + spasmId;
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validNostrReplyToDmpEvent, { customDomain, extraContent: { addDomain: { enabled: false } } })).toStrictEqual(outputWithReplyInfoWithoutDomain);
    });
    test("convertToRss() for Spasm signed reaction with default config", () => {
        const outputWithExtraContent = (0, utils_1.copyOf)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent);
        outputWithExtraContent.description += "\n\n---\nThis is a response to: " +
            (0, utils_1.extractParentSpasmId01)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validSpasmEventV2TreeDepth2_Post1Reply2React1))
            .toStrictEqual(outputWithExtraContent);
    });
    test("convertToRss() for RSS unsigned event with default config", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validPostWithRssItem))
            .toStrictEqual(_events_data_1.validPostWithRssItemConvertedToRssEvent);
    });
    test("convertToRss() for events with media links", () => {
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinks))
            .toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent);
        expect((0, convertToRss_1.convertToRss)(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinks))
            .toStrictEqual(_events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent);
    });
});
describe("convertToRss() different tests", () => {
    test("convertToRss() for DMP signed post with default config", () => {
        const validDmpEventSignedClosedWithDbAddedTime = (0, utils_1.copyOf)(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2);
        validDmpEventSignedClosedWithDbAddedTime.db =
            { addedTimestamp: 1767300000000 };
        expect((0, convertToRss_1.generateRssFeed)([
            _events_data_1.validDmpEventSignedClosed,
            _events_data_1.validDmpEventSignedClosed,
            validDmpEventSignedClosedWithDbAddedTime,
            _events_data_1.validDmpEventSignedClosedConvertedToSpasmV2,
            _events_data_1.validMultiSignedSpasmEventV2WithMediaLinks,
            _events_data_1.validMultiSignedSpasmEventV2WithMarkdownMediaLinks,
            _events_data_1.validPostWithRssItem
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
        )).not.toStrictEqual("hello world");
    });
});
//# sourceMappingURL=convertToRss.test.js.map