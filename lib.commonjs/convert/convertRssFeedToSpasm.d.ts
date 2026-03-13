import { RssFeed, RssItem, SpasmEventV2, CustomConvertToSpasmConfig, SpasmEventSource } from "./../types/interfaces.js";
export declare const convertRssFeedToSpasm: (rssFeedUnknown: string | RssFeed, source: SpasmEventSource, customConfig?: CustomConvertToSpasmConfig) => Promise<SpasmEventV2[]>;
export declare const parseRssFeedString: (xmlString: string) => Promise<RssFeed | string>;
export declare const convertRssItemsToSpasm: (items: RssItem[], source: SpasmEventSource, customConfig?: CustomConvertToSpasmConfig) => SpasmEventV2[];
export declare function parseRSS(xmlString: string): Promise<RssFeed>;
//# sourceMappingURL=convertRssFeedToSpasm.d.ts.map