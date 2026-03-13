"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRssItemsToSpasm = exports.parseRssFeedString = exports.convertRssFeedToSpasm = void 0;
exports.parseRSS = parseRSS;
const index_js_1 = require("../utils/index.js");
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const fast_xml_parser_1 = require("fast-xml-parser");
const turndown_1 = __importDefault(require("turndown"));
const convertRssFeedToSpasm = async (rssFeedUnknown, source, customConfig) => {
    if (!rssFeedUnknown)
        return [];
    let rssFeed = {};
    // 1. RSS feed is a string
    if (typeof (rssFeedUnknown) === "string") {
        const rssFeedParsed = await (0, exports.parseRssFeedString)(rssFeedUnknown);
        if (rssFeedParsed && typeof (rssFeedParsed) === "object") {
            rssFeed = rssFeedParsed;
        }
        // 2. RSS feed is an object
    }
    else if (typeof (rssFeedUnknown) === "object") {
        rssFeed = rssFeedUnknown;
    }
    if (!rssFeed)
        return [];
    let rssItems = [];
    if (rssFeed.items && Array.isArray(rssFeed.items)) {
        rssItems = rssFeed.items;
    }
    else if (rssFeed.items && typeof (rssFeed.items) === "object") {
        rssItems.push(rssFeed.items);
    }
    else if (rssFeed.item && Array.isArray(rssFeed.item)) {
        rssItems = rssFeed.item;
    }
    else if (rssFeed.item && typeof (rssFeed.item) === "object") {
        rssItems.push(rssFeed.item);
    }
    else if (rssFeed.entry && Array.isArray(rssFeed.entry)) {
        rssItems = rssFeed.entry;
    }
    else if (rssFeed.entry && typeof (rssFeed.entry) === "object") {
        rssItems.push(rssFeed.entry);
    }
    if (rssItems && (0, index_js_1.isArrayWithValues)(rssItems)) {
        const spasmEvents = (0, exports.convertRssItemsToSpasm)(rssItems, source, customConfig);
        if (spasmEvents && (0, index_js_1.isArrayWithValues)(spasmEvents)) {
            return spasmEvents;
        }
    }
    return [];
};
exports.convertRssFeedToSpasm = convertRssFeedToSpasm;
const parseRssFeedString = async (xmlString) => {
    try {
        const feed = await parseRSS(xmlString);
        if (feed)
            return feed;
        return "ERROR: cannot parse RSS feed";
    }
    catch (err) {
        console.error(err);
        return "ERROR: cannot parse RSS feed";
    }
};
exports.parseRssFeedString = parseRssFeedString;
const convertRssItemsToSpasm = (items, source, customConfig) => {
    try {
        const turndownService = new turndown_1.default();
        if (!items || !Array.isArray(items))
            return [];
        const spasmEvents = [];
        items.forEach(item => {
            // 0. Check if RSS item has Spasm envelope
            if ("spasmEnvelope" in item && item.spasmEnvelope &&
                typeof (item.spasmEnvelope) === "string") {
                const spasmEnvelope = JSON.parse(item.spasmEnvelope);
                const spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(spasmEnvelope, customConfig);
                if (spasmEvent && (0, index_js_1.isObjectWithValues)(spasmEvent)) {
                    spasmEvents.push(spasmEvent);
                }
            }
            else {
                // Convert RSS item to SpasmEventV0, then to SpasmEventV2
                // 1. Convert RSS item to SpasmEventV0
                const post = {};
                // guid
                if (item.guid && typeof (item.guid) === "string") {
                    // RSS
                    post.guid = turndownService.turndown(item.guid);
                }
                else if (item.id && typeof (item.id) === "string") {
                    // Atom
                    post.guid = turndownService.turndown(item.id);
                }
                // title
                if (item.title && typeof (item.title) === "string") {
                    post.title = turndownService.turndown(item.title);
                }
                // link
                if (item.link && typeof (item.link) === "string") {
                    post.url = turndownService.turndown(item.link);
                }
                // pubDate
                if (item.pubDate && typeof (item.pubDate) === "string") {
                    post.pubdate = turndownService.turndown(item.pubDate);
                }
                post.description = '';
                // description
                if (item.description &&
                    typeof (item.description) === "string") {
                    post.description = item.description;
                }
                // summary
                if (item.summary &&
                    typeof (item.summary) === "string" &&
                    item.summary.length > post.description?.length) {
                    post.description = item.summary;
                }
                // contentSnippet
                if (item.contentSnippet &&
                    typeof (item.contentSnippet) === "string" &&
                    item.contentSnippet.length > post.description?.length) {
                    post.description = item.contentSnippet;
                }
                // content:encodedSnippet
                if (item['content:encodedSnippet'] &&
                    typeof (item['content:encodedSnippet']) === "string" &&
                    item['content:encodedSnippet']?.length > post.description.length) {
                    post.description = item['content:encodedSnippet'];
                }
                // content:encoded
                if (item['content:encoded'] &&
                    typeof (item['content:encoded']) === "string" &&
                    item['content:encoded']?.length > post.description.length) {
                    post.description = item['content:encoded'];
                }
                // Convert HTML to markdown
                post.description = turndownService.turndown(post.description);
                if (source.category) {
                    const cat = source.category;
                    if (typeof (cat) === "string" || typeof (cat) === "number") {
                        if (String(cat)) {
                            post.category = String(cat);
                        }
                    }
                }
                // 2. Convert SpasmEventV0 item to SpasmEventV2
                const spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(post, customConfig);
                if (spasmEvent && (0, index_js_1.isObjectWithValues)(spasmEvent)) {
                    spasmEvents.push(spasmEvent);
                }
            }
        });
        return spasmEvents;
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
exports.convertRssItemsToSpasm = convertRssItemsToSpasm;
// XML Document interfaces
async function parseRSS(xmlString) {
    const parser = new fast_xml_parser_1.XMLParser();
    const feedJson = await parser.parse(xmlString);
    const items = extractItemsFromParsedFeedJson(feedJson);
    const rssFeed = { items };
    return rssFeed;
}
/**
 * Depending on the xml parser and RSS/Atom feed, posts can be in
 * "item", "items", "entry" as an array or as an object if it's
 * only one post.
 */
const extractItemsFromParsedFeedJson = (feedJson) => {
    if (!feedJson || !(0, index_js_1.isObjectWithValues)(feedJson))
        return [];
    // RSS
    if ("rss" in feedJson && feedJson.rss &&
        "channel" in feedJson.rss && feedJson.rss.channel) {
        if (feedJson.rss.channel.item) {
            if (Array.isArray(feedJson.rss.channel.item)) {
                return feedJson.rss.channel.item;
            }
            else if ((0, index_js_1.isObjectWithValues)(feedJson.rss.channel.item)) {
                return [feedJson.rss.channel.item];
            }
        }
        else if (feedJson.rss.channel.items) {
            if (Array.isArray(feedJson.rss.channel.items)) {
                return feedJson.rss.channel.items;
            }
            else if ((0, index_js_1.isObjectWithValues)(feedJson.rss.channel.items)) {
                return [feedJson.rss.channel.items];
            }
        }
        // Atom
    }
    else if ("feed" in feedJson && feedJson.feed) {
        if (feedJson.feed.entry) {
            if (Array.isArray(feedJson.feed.entry)) {
                return feedJson.feed.entry;
            }
            else if ((0, index_js_1.isObjectWithValues)(feedJson.feed.entry)) {
                return [feedJson.feed.entry];
            }
        }
    }
    return [];
};
// const extractRssDataFromJson = (
//   parsedFeed: parsedRss
// ): RssFeed => {
//   if (!parsedFeed.rss || !parsedFeed.rss?.channel) return {}
//   if (!isObjectWithValues(parsedFeed.rss.channel)) return {}
//   const feed: RssFeed = {}
//     feed.title = parsedFeed.rss.channel.title
//     feed.description = parsedFeed.rss.channel.description
//     feed.link = parsedFeed.rss.channel.link
//     feed.language = parsedFeed.rss.channel.language
//     feed.lastBuildDate = parsedFeed.rss.channel.lastBuildDate
//     feed.image = parsedFeed.rss.channel.image
//   let items = []
// }
//# sourceMappingURL=convertRssFeedToSpasm.js.map