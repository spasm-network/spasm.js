import { CustomConvertToSpasmConfig, FetchEventsConfig, SpasmEventSource, SpasmEventV2 } from "./../types/interfaces.js";
export declare const fetchEvents: (config: FetchEventsConfig) => Promise<string[] | null>;
export declare const fetchEventsFromUrl: (url?: string, customConfig?: CustomConvertToSpasmConfig) => Promise<SpasmEventV2[] | string | null>;
export declare const fetchEventsFromSource: (source: SpasmEventSource, customConfig?: CustomConvertToSpasmConfig) => Promise<SpasmEventV2[] | string | null>;
//# sourceMappingURL=fetch.d.ts.map