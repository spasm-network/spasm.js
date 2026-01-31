import { marked } from "marked";
import { ConvertToRssConfig, GenerateRssFeedConfig } from "../types/interfaces.js";
import { toBeNote, toBeNpub } from "../utils/nostrUtils.js";
import { toBeSpasmEventV2, extractParentSpasmId01, isObjectWithValues, getVerifiedSigners, isArrayWithValues, extractIdByFormat, extractSpasmId01, toBeString, mergeConvertToRssConfigs, mergeGenerateRssFeedConfigs, getVerifiedNostrSigners, getVerifiedSpasmSigners, getVerifiedEthereumSigners, extractParentIdByFormat, getAllParentIds, getFirstAudioOrVideoUrlFromString, escapeXml, escapeXmlCdata, getMimeType, toBeShortAddress, toBeUniqueSpasmEventsV2, isValidUrl, copyOf, sanitizeAnything, hasValue, toBeShortDate, hasVerifiedSigner } from "../utils/utils.js";
import { convertToSpasmEventEnvelope } from "./convertToSpasmEventEnvelope.js";
const isRssEvent = (item) => {
    if (item && typeof (item) === "object" &&
        "type" in item && item.type &&
        typeof (item.type) === "string" &&
        item.type === "RssEvent") {
        return true;
    }
    return false;
};
export const convertToRss = (unknownEvent, customConfig) => {
    try {
        const defaultConfig = new ConvertToRssConfig();
        const config = mergeConvertToRssConfigs(defaultConfig, customConfig || {});
        // Already RSS event
        if (isRssEvent(unknownEvent)) {
            return unknownEvent;
        }
        const spasmEventV2 = toBeSpasmEventV2(unknownEvent);
        if (!spasmEventV2)
            return null;
        if (spasmEventV2.type === "SpasmEventV2") {
            const rssEvent = convertSpasmEventV2ToRssEvent(spasmEventV2, config);
            return rssEvent;
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export const convertToRssEvent = convertToRss;
export const convertSpasmEventV2ToRssEvent = (spasmEventV2, config) => {
    try {
        const rssEvent = {};
        if (config?.to?.rss?.type &&
            config?.to?.rss?.type === "RssEvent") {
            rssEvent.type = "RssEvent";
        }
        if (config?.addSpasmEnvelope) {
            const spasmEnvelope = convertToSpasmEventEnvelope(spasmEventV2);
            if (spasmEnvelope && isObjectWithValues(spasmEnvelope)) {
                const spasmEnvelopeString = JSON.stringify(spasmEnvelope);
                if (spasmEnvelopeString) {
                    rssEvent.spasmEnvelope = JSON.stringify(spasmEnvelope);
                }
            }
        }
        const verifiedSpasmSigners = getVerifiedSpasmSigners(spasmEventV2);
        const verifiedEthereumSigners = getVerifiedEthereumSigners(spasmEventV2);
        const verifiedNostrSigners = getVerifiedNostrSigners(spasmEventV2);
        const verifiedSigners = getVerifiedSigners(spasmEventV2);
        if (verifiedSpasmSigners &&
            isArrayWithValues(verifiedSpasmSigners) &&
            verifiedSpasmSigners[0] &&
            typeof (verifiedSpasmSigners[0]) === "string") {
            rssEvent.author = verifiedSpasmSigners[0];
        }
        else if (verifiedEthereumSigners &&
            isArrayWithValues(verifiedEthereumSigners) &&
            verifiedEthereumSigners[0] &&
            typeof (verifiedEthereumSigners[0]) === "string") {
            rssEvent.author = verifiedEthereumSigners[0];
        }
        else if (verifiedNostrSigners &&
            isArrayWithValues(verifiedNostrSigners) &&
            verifiedNostrSigners[0] &&
            typeof (verifiedNostrSigners[0]) === "string") {
            rssEvent.author = toBeNpub(verifiedNostrSigners[0]);
        }
        else if (verifiedSigners &&
            isArrayWithValues(verifiedSigners) &&
            verifiedSigners[0] &&
            typeof (verifiedSigners[0]) === "string") {
            rssEvent.author = verifiedSigners[0];
        }
        if ("title" in spasmEventV2 && spasmEventV2.title &&
            typeof (spasmEventV2.title) === "string") {
            rssEvent.title = spasmEventV2.title;
        }
        else {
            if (spasmEventV2.action === "reply") {
                let title = "Comment: ";
                if ("content" in spasmEventV2 && spasmEventV2.content &&
                    typeof (spasmEventV2.content) === "string") {
                    title += spasmEventV2.content.slice(0, 60);
                    if (spasmEventV2.content.length > 60) {
                        title += "...";
                    }
                    if (title && typeof (title) === "string") {
                        rssEvent.title = title;
                    }
                }
            }
        }
        if ("content" in spasmEventV2 && spasmEventV2.content &&
            typeof (spasmEventV2.content) === "string") {
            rssEvent.description = spasmEventV2.content;
            // Add extra event info to description
            if ("action" in spasmEventV2 && spasmEventV2.action &&
                ((spasmEventV2.action === "post" &&
                    config.extraEventInfo?.forAction?.post?.enabled) || (spasmEventV2.action === "reply" &&
                    config.extraEventInfo?.forAction?.reply?.enabled) || (spasmEventV2.action === "react" &&
                    config.extraEventInfo?.forAction?.react?.enabled))) {
                rssEvent.description += "\n\n---";
                // Submit comment
                if (config.extraEventInfo?.addSubmitComment?.enabled) {
                    if (config.customDomain &&
                        typeof (config.customDomain) == "string") {
                        const id = extractSpasmId01(spasmEventV2);
                        if (id && typeof (id) === "string") {
                            let link = config.customDomain;
                            if (config.customDomain.endsWith("/")) {
                                link += id;
                            }
                            else {
                                link += "/" + id;
                            }
                            if (isValidUrl(link)) {
                                rssEvent.description +=
                                    `\n[Submit your comment on Spasm](${link})`;
                            }
                        }
                    }
                }
                // Signed/published date
                if (config.extraEventInfo?.addSignedDate?.enabled) {
                    if (spasmEventV2.timestamp) {
                        const date = toBeShortDate(spasmEventV2.timestamp);
                        if (date) {
                            if (hasVerifiedSigner(spasmEventV2)) {
                                rssEvent.description += "\nSigned date: ";
                            }
                            else {
                                rssEvent.description += "\nPublished date: ";
                            }
                            rssEvent.description += date;
                        }
                    }
                }
                // Signer pubkey
                if (config.extraEventInfo?.addSigner?.enabled) {
                    const spasmSigners = getVerifiedSpasmSigners(spasmEventV2);
                    if (isArrayWithValues(spasmSigners)) {
                        spasmSigners.forEach(signer => {
                            if (toBeString(signer)) {
                                rssEvent.description +=
                                    "\nSpasm signer: " +
                                        toBeString(signer);
                            }
                        });
                    }
                    const ethereumSigners = getVerifiedEthereumSigners(spasmEventV2);
                    if (isArrayWithValues(ethereumSigners)) {
                        ethereumSigners.forEach(signer => {
                            if (toBeString(signer)) {
                                rssEvent.description +=
                                    "\nEthereum signer: " +
                                        toBeString(signer);
                            }
                        });
                    }
                    const nostrSigners = getVerifiedNostrSigners(spasmEventV2);
                    if (isArrayWithValues(nostrSigners)) {
                        nostrSigners.forEach(signer => {
                            if (toBeNpub(toBeString(signer))) {
                                rssEvent.description +=
                                    "\nNostr signer: " +
                                        toBeNpub(toBeString(signer));
                            }
                        });
                    }
                }
            }
            // Add extra content like "This is a response to: "
            if ("action" in spasmEventV2 && spasmEventV2.action &&
                ((spasmEventV2.action === "post" &&
                    config.extraContent?.forAction?.post?.enabled) || (spasmEventV2.action === "reply" &&
                    config.extraContent?.forAction?.reply?.enabled) || (spasmEventV2.action === "react" &&
                    config.extraContent?.forAction?.react?.enabled))) {
                let parentIdUrl = extractParentIdByFormat(spasmEventV2, { name: "url" });
                let parentIdGuid = extractParentIdByFormat(spasmEventV2, { name: "guid" });
                let parentSpasmId = extractParentSpasmId01(spasmEventV2);
                let parentNostrIdHex = extractParentIdByFormat(spasmEventV2, { name: "nostr-hex" });
                let parentNostrIdNote = extractParentIdByFormat(spasmEventV2, { name: "nostr-note" });
                let parentNostrIdNevent = extractParentIdByFormat(spasmEventV2, { name: "nostr-nevent" });
                let parentId = null;
                let ifParentIdisUrlOrGuid = false;
                if (parentIdUrl) {
                    parentId = toBeString(parentIdUrl);
                    ifParentIdisUrlOrGuid = true;
                }
                else if (parentIdGuid) {
                    parentId = toBeString(parentIdGuid);
                    ifParentIdisUrlOrGuid = true;
                }
                else if (parentSpasmId) {
                    parentId = toBeString(parentSpasmId);
                }
                else if (parentNostrIdHex) {
                    parentId = toBeNote(toBeString(parentNostrIdHex));
                }
                else if (parentNostrIdNote) {
                    parentId = toBeNote(toBeString(parentNostrIdNote));
                }
                else if (parentNostrIdNevent) {
                    parentId = toBeString(parentNostrIdNevent);
                }
                else {
                    const allParentIds = getAllParentIds(spasmEventV2);
                    if (allParentIds && isArrayWithValues(allParentIds) &&
                        allParentIds[0] && toBeString(allParentIds)) {
                        parentId = toBeString(allParentIds[0]);
                    }
                }
                if (parentId && typeof (parentId) === "string") {
                    let parentLink = "";
                    if (ifParentIdisUrlOrGuid) {
                        parentLink = parentId;
                    }
                    else if (config.customDomain &&
                        config.extraContent.addDomain.enabled &&
                        typeof (config.customDomain) == "string") {
                        if (config.customDomain.endsWith("/")) {
                            parentLink = config.customDomain + parentId;
                        }
                        else {
                            parentLink = config.customDomain + "/" + parentId;
                        }
                    }
                    else {
                        parentLink = parentId;
                    }
                    if (parentLink && typeof (parentLink) === "string") {
                        const extraContent = config.extraContent.text + parentLink;
                        rssEvent.description += extraContent;
                    }
                }
            }
        }
        // Convert markdown to HTML
        if ("convertDescriptionToHtml" in config &&
            config.convertDescriptionToHtml &&
            rssEvent.description) {
            const html = marked.parse(rssEvent.description, { breaks: true });
            if (html && typeof (html) === "string") {
                rssEvent.description = html;
            }
        }
        // guid: customGuid, else guid, else spasmId
        if (config.customGuid && typeof (config.customGuid) === "string") {
            rssEvent.guid = config.customGuid;
        }
        else {
            const guid = extractIdByFormat(spasmEventV2, { name: "guid" });
            const spasmId = extractSpasmId01(spasmEventV2);
            if (guid) {
                rssEvent.guid = toBeString(guid);
            }
            else if (spasmId) {
                rssEvent.guid = toBeString(spasmId);
            }
        }
        // link: customLink, else urlId, else domain + spasmId
        if (config.customLink && typeof (config.customLink) === "string") {
            rssEvent.link = config.customLink;
        }
        else {
            const urlId = extractIdByFormat(spasmEventV2, { name: "url" });
            const spasmId = extractSpasmId01(spasmEventV2);
            if (urlId) {
                rssEvent.link = toBeString(urlId);
            }
            else if (spasmId && config.customDomain) {
                if (config.customDomain.endsWith("/")) {
                    rssEvent.link = config.customDomain + spasmId;
                }
                else {
                    rssEvent.link = config.customDomain + "/" + spasmId;
                }
            }
        }
        if ("db" in spasmEventV2 && spasmEventV2.db &&
            "addedTimestamp" in spasmEventV2.db &&
            spasmEventV2.db?.addedTimestamp) {
            const addedTime = new Date(spasmEventV2.db?.addedTimestamp).toUTCString();
            if (addedTime) {
                rssEvent.pubDate = addedTime;
            }
        }
        else if (spasmEventV2.timestamp) {
            const signedtime = new Date(spasmEventV2.timestamp).toUTCString();
            if (signedtime) {
                rssEvent.pubDate = signedtime;
            }
        }
        // TODO enclosureUrl get media from media key,
        // else parse content for media files
        if (spasmEventV2.content &&
            getFirstAudioOrVideoUrlFromString(spasmEventV2.content)) {
            rssEvent.enclosureUrl =
                getFirstAudioOrVideoUrlFromString(spasmEventV2.content);
        }
        // TODO
        // mediaThumbnailUrl
        // TODO
        // imgAlt
        // Hooks
        // Hooks are useful if you want to generate your RSS feed
        // with generateRssFeed(), but you want to apply extra
        // changes to RSS events before converting them into XML.
        // For example, convert markdown into HTML with marked.
        // const convertMarkdownToHtml = (rssEvent: RssEvent) => {
        //   if (rssEvent.description) {
        //     const html = marked.parse(
        //       rssEvent.description, {breaks:true}
        //     )
        //     if (html && typeof(html) === "string") {
        //       rssEvent.description = html
        //     }
        //   }
        // }
        sanitizeAnything(rssEvent);
        if (config.postExecutionHook &&
            typeof (config.postExecutionHook) === "function") {
            const hookedRssEvent = copyOf(rssEvent);
            config.postExecutionHook(rssEvent);
            if (hookedRssEvent && isRssEvent(hookedRssEvent)) {
                return rssEvent;
            }
            else {
                return null;
            }
        }
        return rssEvent;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export const generateRssFeed = (unknownEvents, customConfig) => {
    try {
        const defaultConfig = new GenerateRssFeedConfig();
        const config = mergeGenerateRssFeedConfigs(defaultConfig, customConfig || {});
        const spasmEvents = toBeUniqueSpasmEventsV2(unknownEvents);
        let rssString = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>`;
        if (config.channel.title &&
            typeof (config.channel.title) === "string") {
            let title = config.channel.title;
            if (config.channel?.addSignerToTitle &&
                hasValue(config.filters?.signer)) {
                let signer = "";
                // One signer
                if (config.filters?.signer &&
                    typeof (config.filters?.signer) === "string") {
                    signer = config.filters?.signer;
                    // Multiple signers
                }
                else if (Array.isArray(config.filters?.signer) &&
                    config.filters?.signer[0] &&
                    typeof (config.filters?.signer[0]) === "string") {
                    signer = config.filters?.signer[0];
                }
                if (signer) {
                    if (config.channel.enableAutoGeneratedNamesInTitle) {
                        signer = toBeShortAddress(signer, true);
                    }
                    else {
                        signer = toBeShortAddress(signer, false);
                    }
                }
                if (signer) {
                    title += " - " + signer;
                }
            }
            rssString += `
    <title>${escapeXml(title)}</title>`;
        }
        if (config.channel?.link &&
            typeof (config.channel?.link) === "string") {
            rssString += `
    <link>${escapeXml(config.channel.link)}</link>`;
        }
        if (config.channel?.description &&
            typeof (config.channel?.description) === "string") {
            rssString += `
    <description>${escapeXml(config.channel.description)}</description>`;
        }
        if (config.channel?.language &&
            typeof (config.channel?.language) === "string") {
            rssString += `
    <language>${escapeXml(config.channel.language)}</language>`;
        }
        if (config.channel?.lastBuildDate &&
            typeof (config.channel?.lastBuildDate) === "string") {
            rssString += `
    <lastBuildDate>${escapeXml(config.channel.lastBuildDate)}</lastBuildDate>`;
        }
        if (config.channel?.fullUri &&
            typeof (config.channel?.fullUri) === "string") {
            rssString += `
    <atom:link href="${escapeXml(config.channel.fullUri)}" rel="self" type="application/rss+xml" />`;
        }
        if (config.channel?.imageUrl &&
            typeof (config.channel?.imageUrl) === "string") {
            rssString += `
    <image>
      <url>${escapeXml(config.channel.imageUrl)}</url>`;
            if (config.channel.title &&
                typeof (config.channel.title) === "string") {
                rssString += `
      <title>${escapeXml(config.channel.title)}</title>`;
            }
            if (config.channel?.link &&
                typeof (config.channel?.link) === "string") {
                rssString += `
      <link>${escapeXml(config.channel.link)}</link>`;
            }
            rssString += `
    </image>`;
        }
        // Empty line
        rssString += `
`;
        if (spasmEvents && isArrayWithValues(spasmEvents)) {
            spasmEvents.forEach((spasmEvent) => {
                const rssEvent = convertToRssEvent(spasmEvent, config?.customConvertToRssConfig);
                if (rssEvent && isRssEvent(rssEvent) &&
                    (rssEvent.guid || rssEvent.link)) {
                    // Use the link as guid if not provided,
                    // otherwise ensure guid is present
                    const id = rssEvent.guid || rssEvent.link;
                    const mediaUrl = rssEvent.enclosureUrl;
                    let author = "";
                    if (rssEvent.author) {
                        if (config.items.enableAutoGeneratedNames) {
                            author = toBeShortAddress(rssEvent.author, true);
                        }
                        else {
                            author = toBeShortAddress(rssEvent.author, false);
                        }
                    }
                    let description = rssEvent.description;
                    rssString += `
    <item>`;
                    if (id && isValidUrl(id)) {
                        rssString += `
      <guid isPermaLink="true">${escapeXml(id)}</guid>`;
                    }
                    else if (id && !isValidUrl(id)) {
                        rssString += `
      <guid>${escapeXml(id)}</guid>`;
                    }
                    if (rssEvent.title) {
                        rssString += `
      <title>${escapeXml(rssEvent.title)}</title>`;
                    }
                    if (description) {
                        rssString += `
      <description>${escapeXml(description)}</description>`;
                    }
                    if (rssEvent.link) {
                        rssString += `
      <link>${escapeXml(rssEvent.link)}</link>`;
                    }
                    if (rssEvent.pubDate) {
                        rssString += `
      <pubDate>${escapeXml(rssEvent.pubDate)}</pubDate>`;
                    }
                    if (rssEvent.author) {
                        rssString += `
      <author>${escapeXml(author)}</author>`;
                    }
                    if (mediaUrl) {
                        rssString += `
      <enclosure url="${escapeXml(mediaUrl)}" type="${getMimeType(mediaUrl)}" />`;
                    }
                    if (rssEvent.spasmEnvelope) {
                        rssString += `
      <spasmEnvelope><![CDATA[${escapeXmlCdata(rssEvent.spasmEnvelope)}]]></spasmEnvelope>`;
                    }
                    rssString += `
    </item>
`;
                }
            });
        }
        // Close the tags
        rssString += `
  </channel>
</rss>`;
        return rssString;
    }
    catch (error) {
        console.error(error);
        return "";
    }
};
//# sourceMappingURL=convertToRss.js.map