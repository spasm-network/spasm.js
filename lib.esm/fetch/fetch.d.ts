import { CustomConvertToSpasmConfig, FetchEventsConfig, SpasmEventSource, SpasmEventV2 } from "./../types/interfaces.js";
export declare const fetchEvents: (fetchConfig: FetchEventsConfig) => Promise<string[] | null>;
export declare const fetchEventsFromUrls: (url?: string | string[], customConfig?: CustomConvertToSpasmConfig) => Promise<(SpasmEventV2 | string)[] | string>;
export declare const fetchEventsFromUrl: (url?: string | string[], customConfig?: CustomConvertToSpasmConfig) => Promise<(SpasmEventV2 | string)[] | string>;
export declare const fetchEventsFromSource: (source: SpasmEventSource, customConfig?: CustomConvertToSpasmConfig) => Promise<SpasmEventV2[] | string | null>;
//# sourceMappingURL=fetch.d.ts.map