import {
  EventForSpasmid01,
} from "./../types/interfaces.js";

import {
  isObjectWithValues,
} from "./../utils/utils.js";

export const sortEventForSpasmid = (
  eventForSpasmid: EventForSpasmid01,
  idVersion: string = "01"
): EventForSpasmid01 | null => {

  if (!isObjectWithValues(eventForSpasmid)) return null
  
  const sortedEvent: EventForSpasmid01 = {}

  if (idVersion === "01") {
    // console.log("idVersion:", idVersion)
  }

  return sortedEvent
}
