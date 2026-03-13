/**
 * Many key-value pairs of the Spasm event are not used to
 * calculate Spasm IDs. See README.md for more information.
 */
import { UnknownEventV2, EventForSpasmid01, SpasmEventV2 } from "./../types/interfaces.js";
export declare const convertToEventForSpasmid: (unknownEvent: UnknownEventV2, idVersion?: string) => EventForSpasmid01 | null;
export declare const convertSpasmEventV2ToEventForSpasmid01: (spasmEvent: SpasmEventV2) => EventForSpasmid01 | null;
//# sourceMappingURL=convertToEventForSpasmid.d.ts.map