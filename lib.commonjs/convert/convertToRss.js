"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRssFeed = exports.convertSpasmEventV2ToRssEvent = exports.convertToRssEvent = exports.convertToRss = void 0;
const marked_1 = require("marked");
const interfaces_js_1 = require("../types/interfaces.js");
const nostrUtils_js_1 = require("../utils/nostrUtils.js");
const utils_js_1 = require("../utils/utils.js");
const convertToSpasmEventEnvelope_js_1 = require("./convertToSpasmEventEnvelope.js");
const isRssEvent = (item) => {
    if (item && typeof (item) === "object" &&
        "type" in item && item.type &&
        typeof (item.type) === "string" &&
        item.type === "RssEvent") {
        return true;
    }
    return false;
};
const convertToRss = (unknownEvent, customConfig) => {
    try {
        const defaultConfig = new interfaces_js_1.ConvertToRssConfig();
        const config = (0, utils_js_1.mergeConvertToRssConfigs)(defaultConfig, customConfig || {});
        // Already RSS event
        if (isRssEvent(unknownEvent)) {
            return unknownEvent;
        }
        const spasmEventV2 = (0, utils_js_1.toBeSpasmEventV2)(unknownEvent);
        if (!spasmEventV2)
            return null;
        if (spasmEventV2.type === "SpasmEventV2") {
            const rssEvent = (0, exports.convertSpasmEventV2ToRssEvent)(spasmEventV2, config);
            return rssEvent;
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.convertToRss = convertToRss;
exports.convertToRssEvent = exports.convertToRss;
const convertSpasmEventV2ToRssEvent = (spasmEventV2, config) => {
    try {
        const rssEvent = {};
        if (config?.to?.rss?.type &&
            config?.to?.rss?.type === "RssEvent") {
            rssEvent.type = "RssEvent";
        }
        if (config?.addSpasmEnvelope) {
            const spasmEnvelope = (0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(spasmEventV2);
            if (spasmEnvelope && (0, utils_js_1.isObjectWithValues)(spasmEnvelope)) {
                const spasmEnvelopeString = JSON.stringify(spasmEnvelope);
                if (spasmEnvelopeString) {
                    rssEvent.spasmEnvelope = JSON.stringify(spasmEnvelope);
                }
            }
        }
        const verifiedSpasmSigners = (0, utils_js_1.getVerifiedSpasmSigners)(spasmEventV2);
        const verifiedEthereumSigners = (0, utils_js_1.getVerifiedEthereumSigners)(spasmEventV2);
        const verifiedNostrSigners = (0, utils_js_1.getVerifiedNostrSigners)(spasmEventV2);
        const verifiedSigners = (0, utils_js_1.getVerifiedSigners)(spasmEventV2);
        if (verifiedSpasmSigners &&
            (0, utils_js_1.isArrayWithValues)(verifiedSpasmSigners) &&
            verifiedSpasmSigners[0] &&
            typeof (verifiedSpasmSigners[0]) === "string") {
            rssEvent.author = verifiedSpasmSigners[0];
        }
        else if (verifiedEthereumSigners &&
            (0, utils_js_1.isArrayWithValues)(verifiedEthereumSigners) &&
            verifiedEthereumSigners[0] &&
            typeof (verifiedEthereumSigners[0]) === "string") {
            rssEvent.author = verifiedEthereumSigners[0];
        }
        else if (verifiedNostrSigners &&
            (0, utils_js_1.isArrayWithValues)(verifiedNostrSigners) &&
            verifiedNostrSigners[0] &&
            typeof (verifiedNostrSigners[0]) === "string") {
            rssEvent.author = (0, nostrUtils_js_1.toBeNpub)(verifiedNostrSigners[0]);
        }
        else if (verifiedSigners &&
            (0, utils_js_1.isArrayWithValues)(verifiedSigners) &&
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
                        const id = (0, utils_js_1.extractSpasmId01)(spasmEventV2);
                        if (id && typeof (id) === "string") {
                            let link = config.customDomain;
                            if (config.customDomain.endsWith("/")) {
                                link += id;
                            }
                            else {
                                link += "/" + id;
                            }
                            if ((0, utils_js_1.isValidUrl)(link)) {
                                rssEvent.description +=
                                    `\n[Submit your comment on Spasm](${link})`;
                            }
                        }
                    }
                }
                // Signed/published date
                if (config.extraEventInfo?.addSignedDate?.enabled) {
                    if (spasmEventV2.timestamp) {
                        const date = (0, utils_js_1.toBeShortDate)(spasmEventV2.timestamp);
                        if (date) {
                            if ((0, utils_js_1.hasVerifiedSigner)(spasmEventV2)) {
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
                    const spasmSigners = (0, utils_js_1.getVerifiedSpasmSigners)(spasmEventV2);
                    if ((0, utils_js_1.isArrayWithValues)(spasmSigners)) {
                        spasmSigners.forEach(signer => {
                            if ((0, utils_js_1.toBeString)(signer)) {
                                rssEvent.description +=
                                    "\nSpasm signer: " +
                                        (0, utils_js_1.toBeString)(signer);
                            }
                        });
                    }
                    const ethereumSigners = (0, utils_js_1.getVerifiedEthereumSigners)(spasmEventV2);
                    if ((0, utils_js_1.isArrayWithValues)(ethereumSigners)) {
                        ethereumSigners.forEach(signer => {
                            if ((0, utils_js_1.toBeString)(signer)) {
                                rssEvent.description +=
                                    "\nEthereum signer: " +
                                        (0, utils_js_1.toBeString)(signer);
                            }
                        });
                    }
                    const nostrSigners = (0, utils_js_1.getVerifiedNostrSigners)(spasmEventV2);
                    if ((0, utils_js_1.isArrayWithValues)(nostrSigners)) {
                        nostrSigners.forEach(signer => {
                            if ((0, nostrUtils_js_1.toBeNpub)((0, utils_js_1.toBeString)(signer))) {
                                rssEvent.description +=
                                    "\nNostr signer: " +
                                        (0, nostrUtils_js_1.toBeNpub)((0, utils_js_1.toBeString)(signer));
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
                let parentIdUrl = (0, utils_js_1.extractParentIdByFormat)(spasmEventV2, { name: "url" });
                let parentIdGuid = (0, utils_js_1.extractParentIdByFormat)(spasmEventV2, { name: "guid" });
                let parentSpasmId = (0, utils_js_1.extractParentSpasmId01)(spasmEventV2);
                let parentNostrIdHex = (0, utils_js_1.extractParentIdByFormat)(spasmEventV2, { name: "nostr-hex" });
                let parentNostrIdNote = (0, utils_js_1.extractParentIdByFormat)(spasmEventV2, { name: "nostr-note" });
                let parentNostrIdNevent = (0, utils_js_1.extractParentIdByFormat)(spasmEventV2, { name: "nostr-nevent" });
                let parentId = null;
                let ifParentIdisUrlOrGuid = false;
                if (parentIdUrl) {
                    parentId = (0, utils_js_1.toBeString)(parentIdUrl);
                    ifParentIdisUrlOrGuid = true;
                }
                else if (parentIdGuid) {
                    parentId = (0, utils_js_1.toBeString)(parentIdGuid);
                    ifParentIdisUrlOrGuid = true;
                }
                else if (parentSpasmId) {
                    parentId = (0, utils_js_1.toBeString)(parentSpasmId);
                }
                else if (parentNostrIdHex) {
                    parentId = (0, nostrUtils_js_1.toBeNote)((0, utils_js_1.toBeString)(parentNostrIdHex));
                }
                else if (parentNostrIdNote) {
                    parentId = (0, nostrUtils_js_1.toBeNote)((0, utils_js_1.toBeString)(parentNostrIdNote));
                }
                else if (parentNostrIdNevent) {
                    parentId = (0, utils_js_1.toBeString)(parentNostrIdNevent);
                }
                else {
                    const allParentIds = (0, utils_js_1.getAllParentIds)(spasmEventV2);
                    if (allParentIds && (0, utils_js_1.isArrayWithValues)(allParentIds) &&
                        allParentIds[0] && (0, utils_js_1.toBeString)(allParentIds)) {
                        parentId = (0, utils_js_1.toBeString)(allParentIds[0]);
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
            const html = marked_1.marked.parse(rssEvent.description, { breaks: true });
            if (html && typeof (html) === "string") {
                rssEvent.description = html;
            }
        }
        // guid: customGuid, else guid, else spasmId
        if (config.customGuid && typeof (config.customGuid) === "string") {
            rssEvent.guid = config.customGuid;
        }
        else {
            const guid = (0, utils_js_1.extractIdByFormat)(spasmEventV2, { name: "guid" });
            const spasmId = (0, utils_js_1.extractSpasmId01)(spasmEventV2);
            if (guid) {
                rssEvent.guid = (0, utils_js_1.toBeString)(guid);
            }
            else if (spasmId) {
                rssEvent.guid = (0, utils_js_1.toBeString)(spasmId);
            }
        }
        // link: customLink, else urlId, else domain + spasmId
        if (config.customLink && typeof (config.customLink) === "string") {
            rssEvent.link = config.customLink;
        }
        else {
            const urlId = (0, utils_js_1.extractIdByFormat)(spasmEventV2, { name: "url" });
            const spasmId = (0, utils_js_1.extractSpasmId01)(spasmEventV2);
            if (urlId) {
                rssEvent.link = (0, utils_js_1.toBeString)(urlId);
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
            (0, utils_js_1.getFirstAudioOrVideoUrlFromString)(spasmEventV2.content)) {
            rssEvent.enclosureUrl =
                (0, utils_js_1.getFirstAudioOrVideoUrlFromString)(spasmEventV2.content);
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
        (0, utils_js_1.sanitizeAnything)(rssEvent);
        if (config.postExecutionHook &&
            typeof (config.postExecutionHook) === "function") {
            const hookedRssEvent = (0, utils_js_1.copyOf)(rssEvent);
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
exports.convertSpasmEventV2ToRssEvent = convertSpasmEventV2ToRssEvent;
const generateRssFeed = (unknownEvents, customConfig) => {
    try {
        const defaultConfig = new interfaces_js_1.GenerateRssFeedConfig();
        const config = (0, utils_js_1.mergeGenerateRssFeedConfigs)(defaultConfig, customConfig || {});
        const spasmEvents = (0, utils_js_1.toBeUniqueSpasmEventsV2)(unknownEvents);
        let rssString = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>`;
        if (config.channel.title &&
            typeof (config.channel.title) === "string") {
            let title = config.channel.title;
            if (config.channel?.addSignerToTitle &&
                (0, utils_js_1.hasValue)(config.filters?.signer)) {
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
                        signer = (0, utils_js_1.toBeShortAddress)(signer, true);
                    }
                    else {
                        signer = (0, utils_js_1.toBeShortAddress)(signer, false);
                    }
                }
                if (signer) {
                    title += " - " + signer;
                }
            }
            rssString += `
    <title>${(0, utils_js_1.escapeXml)(title)}</title>`;
        }
        if (config.channel?.link &&
            typeof (config.channel?.link) === "string") {
            rssString += `
    <link>${(0, utils_js_1.escapeXml)(config.channel.link)}</link>`;
        }
        if (config.channel?.description &&
            typeof (config.channel?.description) === "string") {
            rssString += `
    <description>${(0, utils_js_1.escapeXml)(config.channel.description)}</description>`;
        }
        if (config.channel?.language &&
            typeof (config.channel?.language) === "string") {
            rssString += `
    <language>${(0, utils_js_1.escapeXml)(config.channel.language)}</language>`;
        }
        if (config.channel?.lastBuildDate &&
            typeof (config.channel?.lastBuildDate) === "string") {
            rssString += `
    <lastBuildDate>${(0, utils_js_1.escapeXml)(config.channel.lastBuildDate)}</lastBuildDate>`;
        }
        if (config.channel?.fullUri &&
            typeof (config.channel?.fullUri) === "string") {
            rssString += `
    <atom:link href="${(0, utils_js_1.escapeXml)(config.channel.fullUri)}" rel="self" type="application/rss+xml" />`;
        }
        if (config.channel?.imageUrl &&
            typeof (config.channel?.imageUrl) === "string") {
            rssString += `
    <image>
      <url>${(0, utils_js_1.escapeXml)(config.channel.imageUrl)}</url>`;
            if (config.channel.title &&
                typeof (config.channel.title) === "string") {
                rssString += `
      <title>${(0, utils_js_1.escapeXml)(config.channel.title)}</title>`;
            }
            if (config.channel?.link &&
                typeof (config.channel?.link) === "string") {
                rssString += `
      <link>${(0, utils_js_1.escapeXml)(config.channel.link)}</link>`;
            }
            rssString += `
    </image>`;
        }
        // Empty line
        rssString += `
`;
        if (spasmEvents && (0, utils_js_1.isArrayWithValues)(spasmEvents)) {
            spasmEvents.forEach((spasmEvent) => {
                const rssEvent = (0, exports.convertToRssEvent)(spasmEvent, config?.customConvertToRssConfig);
                if (rssEvent && isRssEvent(rssEvent) &&
                    (rssEvent.guid || rssEvent.link)) {
                    // Use the link as guid if not provided,
                    // otherwise ensure guid is present
                    const id = rssEvent.guid || rssEvent.link;
                    const mediaUrl = rssEvent.enclosureUrl;
                    let author = "";
                    if (rssEvent.author) {
                        if (config.items.enableAutoGeneratedNames) {
                            author = (0, utils_js_1.toBeShortAddress)(rssEvent.author, true);
                        }
                        else {
                            author = (0, utils_js_1.toBeShortAddress)(rssEvent.author, false);
                        }
                    }
                    let description = rssEvent.description;
                    rssString += `
    <item>`;
                    if (id && (0, utils_js_1.isValidUrl)(id)) {
                        rssString += `
      <guid isPermaLink="true">${(0, utils_js_1.escapeXml)(id)}</guid>`;
                    }
                    else if (id && !(0, utils_js_1.isValidUrl)(id)) {
                        rssString += `
      <guid>${(0, utils_js_1.escapeXml)(id)}</guid>`;
                    }
                    if (rssEvent.title) {
                        rssString += `
      <title>${(0, utils_js_1.escapeXml)(rssEvent.title)}</title>`;
                    }
                    if (description) {
                        rssString += `
      <description>${(0, utils_js_1.escapeXml)(description)}</description>`;
                    }
                    if (rssEvent.link) {
                        rssString += `
      <link>${(0, utils_js_1.escapeXml)(rssEvent.link)}</link>`;
                    }
                    if (rssEvent.pubDate) {
                        rssString += `
      <pubDate>${(0, utils_js_1.escapeXml)(rssEvent.pubDate)}</pubDate>`;
                    }
                    if (rssEvent.author) {
                        rssString += `
      <author>${(0, utils_js_1.escapeXml)(author)}</author>`;
                    }
                    if (mediaUrl) {
                        rssString += `
      <enclosure url="${(0, utils_js_1.escapeXml)(mediaUrl)}" type="${(0, utils_js_1.getMimeType)(mediaUrl)}" />`;
                    }
                    if (rssEvent.spasmEnvelope) {
                        rssString += `
      <spasmEnvelope><![CDATA[${(0, utils_js_1.escapeXmlCdata)(rssEvent.spasmEnvelope)}]]></spasmEnvelope>`;
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
exports.generateRssFeed = generateRssFeed;
//# sourceMappingURL=convertToRss.js.map