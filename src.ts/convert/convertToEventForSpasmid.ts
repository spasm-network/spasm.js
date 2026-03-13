/**
 * Many key-value pairs of the Spasm event are not used to
 * calculate Spasm IDs. See README.md for more information.
 */
import {
  UnknownEventV2,
  EventForSpasmid01,
  SpasmEventV2,
  SpasmEventBodyAuthorV2,
  SpasmEventBodyHostV2,
  SpasmEventBodyLinkV2,
  SpasmEventMentionV2,
  SpasmEventBodyReferenceV2,
  SpasmEventBodyParentV2,
  CustomConvertToSpasmConfig,
} from "./../types/interfaces.js";

import { convertToSpasm } from "./convertToSpasm.js"

import {
  isObjectWithValues,
  sortArrayOfStringsAndNumbers,
  sortArrayOfObjects,
  keepTheseKeysInObject,
  keepTheseKeysInObjectsInArray,
  sortAuthorsForSpasmid01,
  sortHostsForSpasmid01,
  sortLinksForSpasmid01,
  sortMediasForSpasmid01,
  sortParentForSpasmid01,
  sortReferencesForSpasmid01,
  sortTagsForSpasmid01,
  toLowerCaseAllNestedStrings,
  copyOf
} from "./../utils/utils.js";

// Spasm V2
export const convertToEventForSpasmid = (
  unknownEvent: UnknownEventV2,
  idVersion = "01"
): EventForSpasmid01 | null => {

  let spasmEventV2: SpasmEventV2 | null = {
    type: "SpasmEventV2"
  }

  // SpasmEventV2
  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventV2"
  ) {
    spasmEventV2 = unknownEvent
  } else {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: "2.0.0" } }
    }
    spasmEventV2 = convertToSpasm(unknownEvent, customConfig)
  }

  if (!spasmEventV2) return null

  if (idVersion === "01") {
    const eventForSpasmid01 =
      convertSpasmEventV2ToEventForSpasmid01(
        spasmEventV2,
        // idVersion
    )
    return eventForSpasmid01
  }

  return null
}

export const convertSpasmEventV2ToEventForSpasmid01 = (
  spasmEvent: SpasmEventV2,
  // idVersion = "01"
): EventForSpasmid01 | null => {

  if (!isObjectWithValues(spasmEvent)) return null
  
  if (spasmEvent.type !== "SpasmEventV2") return null

  const eventForSpasmid: EventForSpasmid01 = {}

  if (spasmEvent.parent) {
    // Only 'ids' and 'marker' of a parent are used for Spasm ID
    const cleanParent: SpasmEventBodyParentV2 = 
      keepTheseKeysInObject(
        spasmEvent.parent, ["ids", "marker"]
      ) as SpasmEventBodyParentV2

    const sortedParent = sortParentForSpasmid01(cleanParent)

    eventForSpasmid.parent = sortedParent
  }

  if (spasmEvent.action) {
    eventForSpasmid.action = spasmEvent.action
  }

  if (spasmEvent.title) {
    eventForSpasmid.title = spasmEvent.title
  }

  if (spasmEvent.content) {
    eventForSpasmid.content = spasmEvent.content
  }

  if (spasmEvent.timestamp) {
    eventForSpasmid.timestamp = spasmEvent.timestamp
  }

  if (spasmEvent.authors) {
   /**
    * The 'hosts' key is not used for the Spasm ID, because
    * a user might submit an already signed event to a new
    * instance with different hosts.
    */
    const cleanAuthors: SpasmEventBodyAuthorV2[] =
      keepTheseKeysInObjectsInArray(
      spasmEvent.authors, ["addresses", "usernames", "marker"]
    ) as SpasmEventBodyAuthorV2[]

    const sortedAuthors = sortAuthorsForSpasmid01(cleanAuthors)

    eventForSpasmid.authors = sortedAuthors
  }

  if (spasmEvent.tips) {
    eventForSpasmid.tips = sortArrayOfObjects(
      spasmEvent.tips, "address"
    )
    if (eventForSpasmid.tips) {
      // We need to do a deep copy to make sure that we don't
      // mess up the original object with toLowerCase()
      const lowerCaseTips = copyOf(eventForSpasmid.tips)
      toLowerCaseAllNestedStrings(lowerCaseTips)
      eventForSpasmid.tips = lowerCaseTips
    }
  }

  if (spasmEvent.hosts) {
    const cleanHosts: SpasmEventBodyHostV2[] = 
      keepTheseKeysInObjectsInArray(
        spasmEvent.hosts, ["value", "marker"]
      ) as SpasmEventBodyHostV2[]

    const sortedHosts = sortHostsForSpasmid01(cleanHosts)

    eventForSpasmid.hosts = sortedHosts
  }

  if (spasmEvent.links) {
    const cleanLinks: SpasmEventBodyLinkV2[] = 
      keepTheseKeysInObjectsInArray(
        spasmEvent.links, ["value", "marker"]
      ) as SpasmEventBodyLinkV2[]

    const sortedLinks = sortLinksForSpasmid01(cleanLinks)

    eventForSpasmid.links = sortedLinks
  }

  if (spasmEvent.keywords) {
    eventForSpasmid.keywords =
      sortArrayOfStringsAndNumbers(
        spasmEvent.keywords
    ) as string[]
  }

  if (spasmEvent.tags) {
    eventForSpasmid.tags = sortTagsForSpasmid01(spasmEvent.tags)
  }

  if (spasmEvent.medias) {
    const sortedMedias =
      sortMediasForSpasmid01(spasmEvent.medias)

    eventForSpasmid.medias = sortedMedias
  }

  if (spasmEvent.references) {
    const cleanReferences = keepTheseKeysInObjectsInArray(
      spasmEvent.references, ["ids", "marker"]
    ) as SpasmEventBodyReferenceV2[]

    const sortedReferences = sortReferencesForSpasmid01(
      cleanReferences
    )

    eventForSpasmid.references = sortedReferences
  }

  if (spasmEvent.mentions) {
   /**
    * The 'hosts' key is not used for the Spasm ID, because
    * a user might submit an already signed event to a new
    * instance with different hosts.
    */
    const cleanMentions: SpasmEventMentionV2[] =
      keepTheseKeysInObjectsInArray(
      spasmEvent.mentions, ["addresses", "usernames", "marker"]
    ) as SpasmEventMentionV2[]

    // Mentions is the same as authors in V2
    const sortedMentions = sortAuthorsForSpasmid01(cleanMentions)

    eventForSpasmid.mentions = sortedMentions
  }

  if (spasmEvent.proofs) {
    eventForSpasmid.proofs = sortArrayOfObjects(
      spasmEvent.proofs, "value"
    )

    // Sort proofs.links
    eventForSpasmid.proofs.forEach((proof, index) => {
      if (
        proof && proof.links &&
        Array.isArray(proof.links) &&
        proof.links[0]
      ) {
        const cleanLinks: SpasmEventBodyLinkV2[] = 
          keepTheseKeysInObjectsInArray(
            proof.links, ["value", "marker"]
          ) as SpasmEventBodyLinkV2[]

        const sortedLinks = sortLinksForSpasmid01(cleanLinks)

        if (
          eventForSpasmid.proofs &&
          Array.isArray(eventForSpasmid.proofs)
        ) {
          eventForSpasmid.proofs[index].links = sortedLinks
        }
      }
    })
  }

  if (spasmEvent.license) {
    eventForSpasmid.license = spasmEvent.license
  }

  if (spasmEvent.language) {
    eventForSpasmid.language = spasmEvent.language
  }

  if (spasmEvent.extra) {
    eventForSpasmid.extra = spasmEvent.extra
  }

 /*
  * Only one POW is used to calculate the Spasm ID,
  * other POWs might be attached to satistify requirements
  * on certain instances/relays, but they should not affect
  * the Spasm ID, because a user can sign many siblings for
  * the same event with many different POW values.
  */
  if (
    spasmEvent.pows &&
    Array.isArray(spasmEvent.pows) &&
    spasmEvent.pows[0]
  ) {
    // Find a POW with "spasmid01" marker
    spasmEvent.pows.forEach(pow => {
      if (
        pow && "marker" in pow &&
        pow.marker === "spasmid01"
      ) {
        // If multple spasmid01 are found, then keep
        // the one with the highest difficulty.
        if (!eventForSpasmid.pows) {
          eventForSpasmid.pows = [pow]
        } else if (
          eventForSpasmid.pows &&
          Array.isArray(eventForSpasmid.pows) &&
          eventForSpasmid.pows[0] &&
          eventForSpasmid.pows[0].difficulty &&
          typeof(eventForSpasmid.pows[0].difficulty) === "number" &&
          pow.difficulty &&
          typeof(pow.difficulty) === "number" &&
          eventForSpasmid.pows[0].difficulty < pow.difficulty
        ) {
          eventForSpasmid.pows = [pow]
        }
      }
    })
    // Sort words inside POW
    if (
      eventForSpasmid.pows &&
      Array.isArray(eventForSpasmid.pows) &&
      eventForSpasmid.pows[0] &&
      eventForSpasmid.pows[0].words &&
      Array.isArray(eventForSpasmid.pows[0].words)
    ) {
      eventForSpasmid.pows[0].words =
        sortArrayOfStringsAndNumbers(
          eventForSpasmid.pows[0].words
      ) as string[]
    }
  }

  return eventForSpasmid
}
