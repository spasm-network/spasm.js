/**
 * WARNING: Converting to SpasmSimpleV2 is a one-way ticket.
 * SpasmSimpleV2 is only used to display events in a short form
 * after all signatures were verified by convertToSpasm() func.
 * SpasmSimpleV2 cannot be converted back to SpasmEventAnyV2
 * since it lacks siblings and signatures.
 * Simple version consumes less tokens when analyzed by LLMs.
 */
import { CustomConvertToSpasmSimpleConfig, SpasmSimpleV2, UnknownEventV2 } from "../types/interfaces.js";
export declare const convertManyToSpasmSimple: (unknownEvents: (UnknownEventV2 | SpasmSimpleV2)[], customConfig?: CustomConvertToSpasmSimpleConfig) => SpasmSimpleV2[] | null;
export declare const convertToSpasmSimple: (unknownEvent: UnknownEventV2 | SpasmSimpleV2, customConfig?: CustomConvertToSpasmSimpleConfig) => SpasmSimpleV2 | null;
//# sourceMappingURL=convertToSpasmSimple.d.ts.map