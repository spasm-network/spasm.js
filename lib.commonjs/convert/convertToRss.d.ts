import { SpasmEventV2, UnknownEventV2, RssEvent, CustomConvertToRssConfig, ConvertToRssConfig, CustomGenerateRssFeedConfig } from "../types/interfaces.js";
export declare const convertToRss: (unknownEvent: UnknownEventV2, customConfig?: CustomConvertToRssConfig) => RssEvent | null;
export declare const convertToRssEvent: (unknownEvent: UnknownEventV2, customConfig?: CustomConvertToRssConfig) => RssEvent | null;
export declare const convertSpasmEventV2ToRssEvent: (spasmEventV2: SpasmEventV2, config: ConvertToRssConfig) => RssEvent;
export declare const generateRssFeed: (unknownEvents: UnknownEventV2[], customConfig?: CustomGenerateRssFeedConfig) => string;
//# sourceMappingURL=convertToRss.d.ts.map