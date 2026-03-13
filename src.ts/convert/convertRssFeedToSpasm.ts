import {
  RssFeed,
  RssItem,
  SpasmEventV2,
  CustomConvertToSpasmConfig,
  SpasmEventV0,
  SpasmEventEnvelopeV2,
  SpasmEventSource
} from "./../types/interfaces.js";

import {isArrayWithValues, isObjectWithValues} from "../utils/index.js";
import {convertToSpasm} from "./convertToSpasm.js";

import { XMLParser } from "fast-xml-parser";

import TurndownService from 'turndown';

export const convertRssFeedToSpasm = async (
  rssFeedUnknown: string | RssFeed,
  source: SpasmEventSource,
  customConfig?: CustomConvertToSpasmConfig
): Promise<SpasmEventV2[]> => {
  if (!rssFeedUnknown) return []

  let rssFeed: RssFeed = {}

  // 1. RSS feed is a string
  if (typeof(rssFeedUnknown) === "string") {
    const rssFeedParsed = await parseRssFeedString(rssFeedUnknown)
    if (rssFeedParsed && typeof(rssFeedParsed) === "object") {
      rssFeed = rssFeedParsed
    }
  // 2. RSS feed is an object
  } else if (typeof(rssFeedUnknown) === "object"
  ) {
    rssFeed = rssFeedUnknown
  }

  if (!rssFeed) return []

  let rssItems: RssItem[] = []

  if (rssFeed.items && Array.isArray(rssFeed.items)) {
    rssItems = rssFeed.items
  } else if (rssFeed.items && typeof(rssFeed.items) === "object") {
    rssItems.push(rssFeed.items as RssItem)
  } else if (rssFeed.item && Array.isArray(rssFeed.item)) {
    rssItems = rssFeed.item
  } else if (rssFeed.item && typeof(rssFeed.item) === "object") {
    rssItems.push(rssFeed.item as RssItem)
  } else if (rssFeed.entry && Array.isArray(rssFeed.entry)) {
    rssItems = rssFeed.entry
  } else if (rssFeed.entry && typeof(rssFeed.entry) === "object") {
    rssItems.push(rssFeed.entry as RssItem)
  }

  if (rssItems && isArrayWithValues(rssItems)) {
    const spasmEvents: SpasmEventV2[] =
      convertRssItemsToSpasm(rssItems, source, customConfig)
    if (spasmEvents && isArrayWithValues(spasmEvents)) {
      return spasmEvents
    }
  }

  return []
}


export const parseRssFeedString = async (
  xmlString: string
): Promise<RssFeed | string> => {
  try {
    const feed: RssFeed = await parseRSS(xmlString);
    if (feed) return feed
    return "ERROR: cannot parse RSS feed"
  } catch (err) {
    console.error(err);
    return "ERROR: cannot parse RSS feed"
  }
}
 
export const convertRssItemsToSpasm = (
  items: RssItem[],
  source: SpasmEventSource,
  customConfig?: CustomConvertToSpasmConfig
): SpasmEventV2[] => {
  try {
    const turndownService = new TurndownService()
    if (!items || !Array.isArray(items)) return []
    const spasmEvents: SpasmEventV2[] = []
    items.forEach(item => {
      // 0. Check if RSS item has Spasm envelope
      if (
        "spasmEnvelope" in item && item.spasmEnvelope &&
        typeof(item.spasmEnvelope) === "string"
      ) {
        const spasmEnvelope: SpasmEventEnvelopeV2 =
          JSON.parse(item.spasmEnvelope)
        const spasmEvent: SpasmEventV2 | null = convertToSpasm(
          spasmEnvelope, customConfig
        )
        if (spasmEvent && isObjectWithValues(spasmEvent)) {
          spasmEvents.push(spasmEvent)
        }
      } else {
        // Convert RSS item to SpasmEventV0, then to SpasmEventV2
        // 1. Convert RSS item to SpasmEventV0
        const post: SpasmEventV0 = {}
        // guid
        if (item.guid && typeof(item.guid) === "string") {
          // RSS
          post.guid = turndownService.turndown(item.guid)
        } else if (item.id && typeof(item.id) === "string") {
          // Atom
          post.guid = turndownService.turndown(item.id)
        }
        // title
        if (item.title && typeof(item.title) === "string") {
          post.title = turndownService.turndown(item.title)
        }
        // link
        if (item.link && typeof(item.link) === "string") {
          post.url = turndownService.turndown(item.link)
        }
        // pubDate
        if (item.pubDate && typeof(item.pubDate) === "string") {
          post.pubdate = turndownService.turndown(item.pubDate)
        }

        post.description = ''
        // description
        if (
          item.description &&
          typeof(item.description) === "string"
        ) { post.description = item.description }
        // summary
        if (
          item.summary &&
          typeof(item.summary) === "string" &&
          item.summary.length > post.description?.length
        ) { post.description = item.summary }
        // contentSnippet
        if (
          item.contentSnippet &&
          typeof(item.contentSnippet) === "string" &&
          item.contentSnippet.length > post.description?.length
        ) { post.description = item.contentSnippet }
        // content:encodedSnippet
        if (
          item['content:encodedSnippet'] &&
          typeof(item['content:encodedSnippet']) === "string" &&
          item['content:encodedSnippet']?.length > post.description.length
        ) { post.description = item['content:encodedSnippet'] }
        // content:encoded
        if (
          item['content:encoded'] &&
          typeof(item['content:encoded']) === "string" &&
          item['content:encoded']?.length > post.description.length
        ) { post.description = item['content:encoded'] }

        // Convert HTML to markdown
        post.description = turndownService.turndown(post.description)

        if (source.category) {
          const cat = source.category
          if (
            typeof(cat) === "string" || typeof(cat) === "number"
          ) { if (String(cat)) { post.category = String(cat) } }
        }

        // 2. Convert SpasmEventV0 item to SpasmEventV2
        const spasmEvent: SpasmEventV2 | null = convertToSpasm(
          post, customConfig
        )
        if (spasmEvent && isObjectWithValues(spasmEvent)) {
          spasmEvents.push(spasmEvent)
        }
      }
    })
    return spasmEvents
  } catch (err) {
    console.error(err);
    return []
  }
}

// XML Document interfaces
export async function parseRSS(
  xmlString: string
): Promise<RssFeed> {
  const parser = new XMLParser();
  const feedJson = await parser.parse(xmlString);
  const items = extractItemsFromParsedFeedJson(feedJson)
  const rssFeed = { items }
  return rssFeed
}

interface parsedRss { rss?: { channel?: RssFeed } }

interface parsedAtom { feed?: RssFeed }

/**
 * Depending on the xml parser and RSS/Atom feed, posts can be in
 * "item", "items", "entry" as an array or as an object if it's
 * only one post.
 */
const extractItemsFromParsedFeedJson = (
  feedJson: parsedRss | parsedAtom
): RssItem[] => {
  if (!feedJson || !isObjectWithValues(feedJson)) return []
  // RSS
  if (
    "rss" in feedJson && feedJson.rss &&
    "channel" in feedJson.rss && feedJson.rss.channel
  ) {
    if (feedJson.rss.channel.item) {
      if (Array.isArray(feedJson.rss.channel.item)) {
        return feedJson.rss.channel.item
      } else if (isObjectWithValues(feedJson.rss.channel.item)) {
        return [feedJson.rss.channel.item]
      }
    } else if (feedJson.rss.channel.items) {
      if (Array.isArray(feedJson.rss.channel.items)) {
        return feedJson.rss.channel.items
      } else if (isObjectWithValues(feedJson.rss.channel.items)) {
        return [feedJson.rss.channel.items]
      }
    }
  // Atom
  } else if ("feed" in feedJson && feedJson.feed) {
    if (feedJson.feed.entry) {
      if (Array.isArray(feedJson.feed.entry)) {
        return feedJson.feed.entry
      } else if (isObjectWithValues(feedJson.feed.entry)) {
        return [feedJson.feed.entry]
      }
    }
  }
  return []
}

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
