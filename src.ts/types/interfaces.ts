import { sanitizeStringWithDompurify } from "./../utils/utils.js"

export type FiltersActivity = "hot" | "rising" | "all" | null;
export type FiltersCategory = "defi" | "nft" | "privacy" | "any" | null;
export type FiltersWebType = "web2" | "web3" | null;

export type PostId = string | number | null | undefined
export type PostUrl = string |  null | undefined
export type PostSignature = string |  null | undefined
export type PostAction = Web3MessageAction | null | undefined

export interface Post {
  // web2 & web3
  // Each post might have different IDs on different servers
  id?: PostId // spasmEvent.dbKey

  // web2 only
  // guid, source, author, url, description, pubdate
  // are usually taken from the RSS feed.
  guid?: string | null // spasmEvent.id
  source?: string | null // spasmEvent.source
  author?: string | null // spasmEvent.author
  url?: PostUrl // spasmEvent.id
  description?: string | null // spasmEvent.content
  pubdate?: string | null // spasmEvent.timestamp

  // web3 only
  target?: string | null // spasmEvent.target
  action?: PostAction // spasmEvent.action
  text?: string | null // spasmEvent.content
  signer?: string | null // spasmEvent.author
  signed_message?: string | null // spasmEvent.originalEventString
  signature?: PostSignature // spasmEvent.signature
  signed_time?: string | null // spasmEvent.timestamp
  added_time?: string | null // spasmEvent.dbTimestamp
  ipfs? : string | null // spasmEvent.links.ipfs

  // web2 & web3
  tickers?: string | string[] | null // spasmEvent.keywords
  title?: string | null // spasmEvent.title
  category?: string | null // spasmEvent.category
  tags?: string[] | null // spasmEvent.tags ??
  upvote?: number | null // spasmEvent.stats.reactions.upvote
  downvote?: number | null
  bullish?: number | null
  bearish?: number | null
  important?: number | null
  scam?: number | null
  comments_count?: number | null // spasmEvent.stats.replies.total
  latest_action_added_time?: string | null // spasmEvent.stats.reactions/replies.latestTimestamp

  // comments
  children?: Post[] // spasmEvent.children.replies
}

export type Web3MessageAction = "post" | "react" | "reply" | "share" | "shared" | "moderate" | "admin"

export type Web3MessageLicense = "MIT" | "CC0" | "CC0-1.0" | "SPDX-License-Identifier: CC0-1.0" | "SPDX-License-Identifier: MIT"

export interface Web3Message {
  version: string
  time?: string
  action: Web3MessageAction
  target?: string
  title?: string 
  text?: string
  license: Web3MessageLicense
}

export type NostrSpasmTag = SpasmVersionTag | SpasmTargetTag | SpasmActionTag | SpasmCategoryTag | SpasmTitleTag | SpasmLicenseTag 

export type SpasmVersionTag = ["spasm_version", string] | ["nostr_spasm_version", string]

export type SpasmTargetTag = ["spasm_target", string]

export type SpasmActionTag = ["spasm_action", Web3MessageAction]

export type SpasmCategoryTag = ["spasm_category", FiltersCategory]

export type SpasmTitleTag = ["spasm_title", string]

export type SpasmLicenseTag = ["license", Web3MessageLicense]

export type AnyTag = any[]

export type UnknownEvent =
  DmpEvent |
  DmpEventSignedClosed |
  DmpEventSignedOpened |
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened

export type AnyNostrEvent =
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened

export type UnknownPostOrEvent = Post | UnknownEvent

// Post is essentially SpasmEventV0
export type SpasmEventV0 = Post

export type UnknownEventV1 = 
  | UnknownEvent
  | SpasmEventV0

export type SpasmEventAnyV2 =
  | SpasmEventV2
  | SpasmEventBodyV2
  | SpasmEventEnvelopeV2
  | SpasmEventEnvelopeWithTreeV2
  | SpasmEventDatabaseV2
  | SpasmEventBodySignedClosedV2

export type UnknownEventV2 =
  | UnknownEventV1
  | SpasmEventAnyV2

export interface NostrEvent {
  id?: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  tags: AnyTag[]
}

export interface NostrEventSignedOpened extends NostrEvent {
  id: string
  sig: string
}

// Nostr event with extra tags to be compatible with SPASM.
export interface NostrSpasmEvent {
  id?: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  // tags: (NostrSpasmTag | AnyTag)[]
  // Require at least one tag, followed by any number of tags.
  tags: [(NostrSpasmTag | AnyTag), ...(NostrSpasmTag | AnyTag)[]]

  // TODO: how to enforce that tags should have at least
  // one element of type NostrSpasmTag?
  // The solution below requires that the first element
  // of tags array should be of type NostrSpasmTag, 
  // followed by any number of elements of type NostrSpasmTag or AnyTag.
  // However, there might be other tags, so NostrSpasmTag might be not
  // the first element in the tags array.
  // tags: [NostrSpasmTag, ...(NostrSpasmTag | AnyTag)[]]
}

// Signed Nostr event with extra tags to be compatible with SPASM.
// 'Opened' means that the signed event is already an object
// so there is no need to convert any string to an object.
export interface NostrSpasmEventSignedOpened extends NostrSpasmEvent {
  id: string
  sig: string
}

export interface DmpEvent extends Web3Message {}

// 'Closed' means that the signed string has to be converted to an
// object in order to get an access to the properties of the event.
export interface DmpEventSignedClosed {
  signedString: string
  signature: string
  signer?: string
}

// 'Opened' means that the signed event has an object with all the
// properties of the event, so there is no need to convert
// any string to an object in order to work with the event.
export interface DmpEventSignedOpened extends DmpEventSignedClosed {
  signedObject: DmpEvent
}

export type SpasmVersion = "1.0.0" | "2.0.0"
export type SpasmIdVersion = "01" | "02" | "03"
export type DmpVersion = "0.0.1" | "0.1.0"
export type NostrSpasmVersion = "1.0.0" | "2.0.0"
export type ExtraSpasmFieldsVersion = NostrSpasmVersion

export type EventBaseProtocol = "dmp" | "nostr" | "spasm"

export type EventBaseProtocolVersion = "dmp_v0.1.0" | string

export type EventPrivateKeyType = "ethereum" | "nostr"

// Nostr usually uses "schnorr", while Ethereum uses "ecdsa"
export type EventProtocolCryptography = "schnorr" | "ecdsa" | "secp256k1" | string

export type SpasmAction = Web3MessageAction

// export type ExtraObject = Record<string | number | symbol, any>
// Unlike Record, index signature allows recursive structure, e.g.:
// [key: string]: number | ExtraObject
export type ExtraObject = {
  [key: string | number | symbol]: any
}

export interface HashFormat {
  // value: string
  name?: string // eg "SHA-3"
  version?: string
  length?: number | string // eg "arbitrary"
  type?: string // eg "sponge function"
  pieceLength?: number | string
  pieces?: string[]
}

export interface LinkObject {
  value: string // eg "https://forum.example.com/posts/123?p=abc"
  protocol?: string // eg "https, ftp, ipfs, file, mailto"
  origin?: string // eg "https://forum.example.com"
  host?: string // eg "forum.example.com"
  pathname?: string // eg "/posts/123"
  search?: string // eg "?p=abc"
  port?: string // eg "18081"
  hash?: string // eg "abc123def456"
  originalProtocolKey?: string | number
}

export type MimeType =
  | "image/jpeg" | "image/png" | "image/gif" | "image/webp"
  | "image/svg+xml"
  | "audio/mpeg" | "audio/ogg" | "audio/wav"
  | "video/mp4" | "video/ogg" | "video/webm"
  | "text/plain" | "text/html" | "text/css" | "text/javascript"
  | "application/json" | "application/xml" | "application/pdf"
  | "application/octet-stream"

export interface SpasmEventMediaV2 {
  ids?: SpasmEventIdV2[]
  hashes?: SpasmEventHashV2[]
  links?: SpasmEventLinkV2[]
  type?: MimeType
}

export interface SpasmEventStatContentV2 {
  // value: string | number
  value: SpasmEventReactionNameV2
  total: number | string
}

// export interface SpasmEventStatV2 extends
//   Record<SpasmEventReactionNameV2, null | number> {
export interface SpasmEventStatV2 {
  // Nostr events might have a number for action (kind)
  action: SpasmEventActionV2 | number
  total?: number | string
  latestTimestamp?: number
  latestDbTimestamp?: number
  contents?: SpasmEventStatContentV2[]
}

export type SpasmEventReactionNameV2 =
  | "upvote" | "downvote" | "bullish" | "bearish" | "important"
  | "scam" | "toxic" | "sad" | "laugh" | "clown" | "love"
  | "facepalm" | "mushroom" | "moon" | "rocket"

export interface StandardizedEvent {
  signedString?: string
  signature?: string
  signer?: string
  target?: string
  action?: string
  title?: string
  text?: string
  signedDate?: string
}

export interface SpasmEventSource {
  network?: "spasm" | "nostr" | "rss"
  name?: string
  uiUrl?: string
  apiUrl?: string
  query?: string
  showSource?: boolean
  category?: string | number | SpasmEventCategoryV2
}

export class IgnoreWhitelistFor {
  action: {
    post: boolean
    reply: boolean
    react: boolean
    moderate: boolean
  }

  constructor() {
    this.action = {
      post: false,
      reply: false,
      react: false,
      moderate: false
    }
  }
}

export type EventType =
  "DmpEvent" |
  "DmpEventSignedClosed" |
  "DmpEventSignedOpened" |
  "NostrEvent" |
  "NostrEventSignedOpened" |
  "NostrSpasmEvent" |
  "NostrSpasmEventSignedOpened" |
  "SpasmEvent" |
  "unknown"

export type EventInfoType = EventType | "Post"

export interface EventInfo {
  type: EventInfoType | false
  hasSignature: boolean
  baseProtocol: EventBaseProtocol | false
  privateKeyType: EventPrivateKeyType | false
  isSpasmCompatible: boolean
  hasExtraSpasmFields: boolean
  license: string | false
  // originalEvent: UnknownEvent
}

export type WebType = "web2" | "web3"

export type EventIsSealedUnderKeyName = "signed_message" | "signedObject"

export interface KnownPostOrEventInfo {
  webType: WebType | false
  eventIsSealed: boolean
  eventIsSealedUnderKeyName: EventIsSealedUnderKeyName | false
  eventInfo: EventInfo | false
}

export type PrivateKeyType = "ethereum" | "nostr"

////////////////
// Spasm V2

export type SpasmEventType =
  | SpasmEventTypeV2
  | SpasmEventTypeV0

export type SpasmEventTypeV2 =
  | "SpasmEventV2"
  | "SpasmEventBodyV2" | "SpasmEventDatabaseV2"
  | "SpasmEventEnvelopeV2" | "SpasmEventEnvelopeWithTreeV2"

export type SpasmEventTypeV0 = "SpasmEventV0"

export interface SpasmEventBodySignedClosedV2 {
  type: "SpasmEventBodySignedClosedV2",
  signedString: string,
  signature: string,
  signer?: string
}

export interface SpasmEventBodyV2 {
  type: "SpasmEventBodyV2"
 /**
  * Body & Sibling have a protocol field, but not SpasmEventV2
  * because each Spasm event can be signed with many protocols.
  * Protocol is not hashed for Spasm ID for the same reason.
  */
  protocol?: SpasmEventBodyProtocolV2
  /**
   * A root (an event without a parent) should not be included
   * into a signed body because it can easily be manipulated
   * by a malicious actor in an off-chain environment to hijack
   * a conversation. Instead, a root should be found on a server
   * similar to children if a database contains the whole event
   * tree, and then the root should be added to an envelope with
   * tree (SpasmEventEnvelopeWithTreeV2).
   */
  // root?: SpasmEventBodyRootV2
  parent?: SpasmEventBodyParentV2
  action?: SpasmEventActionV2
  title?: string
  content?: string
  timestamp?: number
  authors?: SpasmEventBodyAuthorV2[]
  categories?: SpasmEventCategoryV2[]
  tips?: SpasmEventBodyTipsV2[]
  hosts?: SpasmEventBodyLinkV2[]
  links?: SpasmEventBodyLinkV2[]
  keywords?: string[]
  tags?: any[][]
  medias?: SpasmEventMediaV2[]
  references?: SpasmEventBodyReferenceV2[]
  mentions?: SpasmEventMentionV2[]
  proofs?: SpasmEventProofV2[]
 /**
  * Some protocols have a sequence number and an ID (hash) of a
  * previous event in order to increase censorship-resistance.
  * These fields should be signed, but not hashed for Spasm ID,
  * because a user should be able to sign an already signed
  * event again with a protocol that will have different values
  * for sequence and a previous event.
  * TODO: think about the logic, whether add to Sibling, etc.
  */
  previousEvent?: SpasmEventBodyPreviousEventV2
  sequence?: number
  license?: SpasmEventLicenseV2
  language?: string
  extra?: Record<string | number, any>
 /**
  * Depending on the implementation, proof-of-work will likely
  * affect spasm ID (e.g., require 6 leading zeros), so only
  * one POW can be signed to keep spasm ID the same.
  * However, multiple pows[] can also be signed within one
  * Body and then 'nonce' and 'words' from each POW will be
  * used to check difficulty of spasmpow, not spasmid.
  * In other words, there might be two levels of proof-of-work:
  * - event-wide POW (spasmid01000000abc, spasmid02000000xyz)
  * - instance-specific POW (spasmpow01degen, spasmpow02rebel)
  * Spasm ID (spasmid) is used to chain replies, reactions, etc.
  * Spasm POW (spasmpow) is only used to check POW.
  * Users should be able to submit already signed messages to
  * new instances by signing new siblings with extra POW, so
  * only POWs with "spasmid" markers should be used to 
  * calculate Spasm IDs.
  */
  pows?: SpasmEventPowV2[]
}

/**
 * The structure of the event for calculating Spasm ID should
 * be similar to the structure of the Spasm body, but with a
 * few differences:
 * - No type, because it's not signed.
 * - No protocol, because a Spasm event can be signed with
 *   multiple protocols (Spasm, Dmp, Nostr). Instead, a protocol
 *   can be found in each sibling, e.g. siblings[0].protocol.name
 * - No categories, because a Spasm event can be signed again
 *   with different categories and e.g. different POW values.
 */
// TODO Nostr content might include #[1], #[2] to reference
// some content in tags. This should be converted to actual
// text before hashing.
export interface EventForSpasmid01 extends
  Omit<SpasmEventBodyV2,
  | 'type'
  | 'protocol'
  | 'authors'
  | 'categories'
  | 'sequence' | 'previousEvent'
  > {
   /**
    * Authors should not have a 'verified' key
    * for calculating the Spasm ID.
    */
    authors?: SpasmEventBodyAuthorV2[]
  }

export interface SpasmEventEnvelopeV2 {
  type: "SpasmEventEnvelopeV2"
  // spasmid01, spasmer01/spasmus01, spasmsig, spasmpub, spasmsec
  // ids are separate from SpasmEventBody because they can change
  ids?: SpasmEventIdV2[]
  siblings?: SpasmEventSiblingV2[]
  // --------
  db?: SpasmEventDbV2
  source?: SpasmEventSource
  stats?: SpasmEventStatV2[]
  sharedBy?: EventSharedByV2
}

export interface SpasmEventDbV2 {
  key?: number
  addedTimestamp?: number
  updatedTimestamp?: number
  table?: string | number
}

export interface EventSharedByV2 {
  ids?: SpasmEventIdV2[]
}

export interface SpasmEventEnvelopeWithTreeV2 extends 
  Omit<SpasmEventEnvelopeV2, 'type'> {
  type: "SpasmEventEnvelopeWithTreeV2"
  root?: SpasmEventEnvelopeWithTreeRootV2
  parent?: SpasmEventEnvelopeWithTreeParentV2
  references?: SpasmEventEnvelopeWithTreeReferenceV2[]
  previousEvent?: SpasmEventEnvelopeWithTreePreviousEventV2
  children?: SpasmEventEnvelopeWithTreeChildV2[]
}

export type SpasmEventEnvelopeWithTreeChildEventV2 =
  SpasmEventV2 |
  SpasmEventEnvelopeV2 |
  SpasmEventEnvelopeWithTreeV2

export interface SpasmEventV2 extends
  Omit<SpasmEventBodyV2,
    'type' | 'protocol' | 'authors' | 'parent' | 'hosts' | 'links' | 'references' | 'sequence' | 'previousEvent'>,
  // Omit<SpasmEventEnvelopeV2, 'type'>,
  Omit<SpasmEventEnvelopeWithTreeV2,
    'type' | 'protocol' | 'authors' | 'parent' | 'root' | 'hosts' | 'links' | 'references' | 'sequence' | 'previousEvent' | 'children'> {
  type: "SpasmEventV2"
  /**
   * Protocol, sequence, previousEvent shouldn't be a part
   * of SpasmEvent because an event can be signed with different
   * protocols as different siblings some of which might have
   * a sequence number or previous event attached.
   * Thus, these fields can be found in Body and in Siblings.
   */
  authors?: SpasmEventAuthorV2[]
  root?: SpasmEventRootV2
  parent?: SpasmEventParentV2
  hosts?: SpasmEventHostV2[]
  links?: SpasmEventLinkV2[]
  references?: SpasmEventReferenceV2[]
  // Some events don't have signatures (e.g. RSS posts, URLs)
  signatures?: SpasmEventSignatureV2[]
  children?: SpasmEventChildV2[]
}

export interface SpasmEventDatabaseV2 extends
  Omit<SpasmEventBodyV2, 'type' | 'protocol' | 'authors' | 'previousEvent' | 'sequence'>,
  Omit<SpasmEventEnvelopeV2, 'type' | 'db'> {
    type: "SpasmEventDatabaseV2"
   /**
    * Omitting authors from Body to add a 'verified'
    * field to authors in Spasm Event and Database.
    */
    authors?: SpasmEventAuthorV2[]
    signatures?: SpasmEventSignatureV2[]
  }

// Example:
// root.ids
// spasmid01abc
//      id.value // spasmid01abc
//      id.format.name // spasmid
//      id.format.version // 01
//      id.hosts // Array of hosts
// note1def
//      id.value // note1def
//      id.format.name // nostr-note
//      id.format.version // 1 // TODO
//      id.hosts // Array of hosts
// 0x123
//      id.value // 0x123
//      id.format.name // dmp
//      id.format.version // 0.1.0
//      id.hosts // Array of hosts
// root.depth // 5
// root.event // SpasmEvent

export type SpasmEventAddressFormatNameV2 =
  | "spasmer" | "ethereum-pubkey"
  | "nostr-hex" | "nostr-npub"

export type SpasmEventSignatureFormatNameV2 =
  | "ethereum-sig" // e.g. used as event IDs in Dmp
  | "nostr-sig"

export type SpasmEventIdFormatNameV2 =
  // ID (e.g. parent) can be anything, including pubkeys
  // E.g., a user can submit a comment to another profile.
  | SpasmEventAddressFormatNameV2
  | "spasmid"
  | "nostr-hex" | "nostr-note" | "nostr-nevent"
  // NostrSpasm events prior to 2.0.0 used signatures
  // as event IDs similar to Dmp's approach
  | SpasmEventSignatureFormatNameV2
  // web2 (e.g. RSS items)
  | "url" | "guid"
  // ID can be any string or number
  | "string" | "number"

export interface SpasmEventSignatureFormatV2 {
  name: SpasmEventSignatureFormatNameV2
  version?: string| number
}

export interface SpasmEventIdFormatV2 {
  name: SpasmEventIdFormatNameV2
  version?: string | number
}

// TODO add 'marker' to each ID?
// e.g. some referenced nostr events might have a marker
// thus, there might a marker for the referenced event,
// and for each ID (e.g., Spasm ID and Nostr ID)
export interface SpasmEventIdV2 {
  value: string | number
  // Some protocols might include a pubkey of an author
  // so preferred hosts can be retrieved when an event
  // with this ID cannot be found.
  pubkey?: string | number
  marker?: string | number
  format?: SpasmEventIdFormatV2
  hosts?: SpasmEventHostV2[]
}

export interface SpasmEventHashV2 extends
  Omit<SpasmEventIdV2, 'format'> {
  format?: HashFormat
}

/**
 * Each author can have multiple addresses
 * (e.g., Ethereum, Nostr, Solana).
 * Each co-author should be added as a separate author.
 */
export interface SpasmEventBodyAuthorV2 {
  addresses?: SpasmEventBodyAddressV2[]
  usernames?: SpasmEventUsernameV2[]
  marker?: string | number
}

export interface SpasmEventAuthorV2 extends
  SpasmEventBodyAuthorV2 {
  addresses?: SpasmEventAddressV2[]
  usernames?: SpasmEventUsernameV2[]
}

export interface SpasmEventAddressFormatV2 {
  name: SpasmEventAddressFormatNameV2
  version?: string| number
}

export interface SpasmEventBodyAddressV2 {
  value: string | number
  format?: SpasmEventAddressFormatV2
  marker?: string | number
  hosts?: SpasmEventHostV2[]
}

/**
 * Verified shows whether this address matches with at least
 * one attached signature. Note that there might be multiple
 * different signatures made by the same address.
 * For example, if a user signs the same message using the same
 * protocol and the same private key multiple times with
 * different POW values to be accepted on different instances.
 * - Verified is added to SpasmEvent for better Dev Experience.
 * - Verified is added to SpasmEventDatabase for better queries.
 * - Verified is NOT added to SpasmEnvelope because signatures
 *   have to be verified after receiving envelopes by converting
 *   them to SpasmEvent.
 */
export interface SpasmEventAddressV2 extends
  SpasmEventBodyAddressV2 {
  verified?: boolean // Whether matches any attached signatures
}

// Can be used for both web2 and web3 authors,
// e.g., RSS items don't have any signer.
export interface SpasmEventAuthorUsername {
  value?: string
  owner?: string // address
  protocol?: string
  proof?: string
  provider?: string
}

export interface SpasmEventUsernameV2 extends SpasmEventAuthorUsername {}

export interface SpasmEventCategoryV2 {
  name: string | number
  sub?: SpasmEventCategoryV2
}

export interface SpasmEventBodyHostV2 extends SpasmEventBodyLinkV2 {}

export interface SpasmEventBodyLinkV2 extends Pick<SpasmEventLinkV2, 'value' | 'marker'> {}

export interface SpasmEventHostV2 extends SpasmEventLinkV2 {}

export interface SpasmEventLinkV2 {
  value: string // eg "https://forum.example.com/posts/123?p=abc"
  marker?: string
  protocol?: string // eg "https, ftp, ipfs, file, mailto"
  origin?: string // eg "https://forum.example.com"
  host?: string // eg "forum.example.com"
  pathname?: string // eg "/posts/123"
  search?: string // eg "?p=abc"
  port?: string // eg "18081"
  originalProtocolKey?: string | number
}

export interface SpasmEventSignatureV2 {
  value: string | number
  pubkey?: string | number
  format?: SpasmEventSignatureFormatV2
}

export interface SpasmEventBodyProtocolV2 {
  name: "spasm" | "dmp" | "nostr" | "web2"
  version?: string
}

export type SiblingProtocolV2 = SpasmEventProtocolV2

export interface SpasmEventProtocolV2 extends
  SpasmEventBodyProtocolV2 {
  hasExtraSpasmFields?: boolean
  extraSpasmFieldsVersion?: string | number
}

export interface SpasmEventBodyReferenceV2 {
  ids: SpasmEventIdV2[]
  // Authors can be used to get preferred hosts
  // when an event with these IDs cannot be found.
  // authors?: SpasmEventBodyAuthorV2[]
  marker?: string | number
}

export interface SpasmEventBodyRootV2 extends
  SpasmEventBodyReferenceV2 {}

export interface SpasmEventBodyParentV2 extends
  SpasmEventBodyReferenceV2 {}

export interface SpasmEventBodyPreviousEventV2 extends
  SpasmEventBodyReferenceV2 {}

/**
 * The depth of the event shouldn't be included in the signed
 * body (SpasmEventBody) because we cannot prove it without the
 * access to the full event tree and so it can be manipulated.
 * The depth shows the distance from the original event and can
 * only be calculated inside SpasmEventEnvelopeWithTree which
 * has access to all the events in the event tree.
 * There is no need to add the depth level to the reference,
 * so the depth is only added to root, parent, previousEvent.
 */
export interface SpasmEventEnvelopeWithTreeReferenceV2 extends
  // Partial<SpasmEventBodyReferenceV2> {
  SpasmEventBodyReferenceV2 {
  event?: SpasmEventEnvelopeV2 | SpasmEventEnvelopeWithTreeV2
}

export interface SpasmEventEnvelopeWithTreeRootV2 extends
  SpasmEventEnvelopeWithTreeReferenceV2 {
    depth?: number
}

export interface SpasmEventEnvelopeWithTreeParentV2 extends
  SpasmEventEnvelopeWithTreeReferenceV2 {
    depth?: number
}

export interface SpasmEventEnvelopeWithTreePreviousEventV2 extends
  SpasmEventEnvelopeWithTreeReferenceV2 {
    depth?: number
}

export interface SpasmEventEnvelopeWithTreeChildV2 {
  ids?: SpasmEventIdV2[]
  marker?: string | number
  event?: SpasmEventEnvelopeWithTreeChildEventV2
  depth?: number
}

export interface SpasmEventChildV2 extends
  SpasmEventEnvelopeWithTreeChildV2 {
    event?: SpasmEventV2
}

export interface SpasmEventReferenceV2 {
  ids: SpasmEventIdV2[]
  marker?: string | number
  event?: SpasmEventV2
}

export interface SpasmEventRootV2 extends
  SpasmEventReferenceV2 {
  depth?: number
}

export interface SpasmEventParentV2 extends
  SpasmEventReferenceV2 {
  depth?: number
}

export interface SpasmEventPreviousEventV2 extends
  SpasmEventReferenceV2 {
  depth?: number
}

export interface SpasmEventBodyTipsV2 {
  address?: string
  text?: string
  expiration?: { timestamp?: number }
  currency?: {
    name?: string
    ticker?: string
  }
  network?: {
    name?: string
    id?: string
  }
}

export interface SpasmEventMentionV2 extends SpasmEventBodyAuthorV2 {}

export interface SpasmEventProofV2 {
  value?: string | number
  links?: Pick<SpasmEventLinkV2, 'value' | 'marker'>[]
  protocol?: {
    name: string
    version?: string | number
  }
}

export type EventSignatureProtocol = "ethereum" | "nostr"

export type SpasmEventActionV2 = "post" | "react" | "reply" | "share" | "shared" | "moderate" | "admin" | "edit" | "delete" | "vote" | "media" | "metadata" | "follow_list" | "direct_message"

export type SpasmEventLicense = "MIT" | "CC0" | "CC0-1.0" | "SPDX-License-Identifier: CC0-1.0" | "SPDX-License-Identifier: MIT"

export type SpasmEventLicenseV2 = SpasmEventLicense

export type SpasmEventAddressTypeV2 =
  "ethereum" | "nostr-npub" | "nostr-hex"

export interface SpasmEventPowV2 {
  marker?: string | number
  nonce?: string | number
  difficulty?: number
  words?: (string | number)[]
  network?: {
    name: string | number
    id: string | number
  }
}

export type SpasmEventSiblingV2 =
  | SiblingSpasmV2
  | SiblingSpasmSignedV2
  | SiblingDmpV2
  | SiblingDmpSignedV2
  | SiblingNostrV2
  | SiblingNostrSpasmV2
  | SiblingNostrSignedV2
  | SiblingNostrSpasmSignedV2
  | SiblingWeb2V2

export interface SiblingWeb2V2 {
  type: "SiblingWeb2V2"
  protocol: {
    name: "web2"
  }
  // originalObject instead of signedObject because some
  // posts are not signed (e.g., web3 RSS posts).
  originalObject?: UnknownEventV2
  ids?: SpasmEventIdV2[]
}

export interface SiblingSpasmV2 {
  type: "SiblingSpasmV2"
  protocol: {
    name: "spasm"
    version?: SpasmVersion
  }
  signedString?: string
  sequence?: number
  previousEvent?: SpasmEventBodyPreviousEventV2
  ids?: SpasmEventIdV2[]
}

export interface SiblingSpasmSignedV2 {
  type: "SiblingSpasmSignedV2"
  protocol: {
    name: "spasm"
    version?: SpasmVersion
  }
  signedString?: string
  sequence?: number
  previousEvent?: SpasmEventBodyPreviousEventV2
  ids?: SpasmEventIdV2[]
  signatures?: SpasmEventSignatureV2[]
}

export interface SiblingDmpV2 {
  type: "SiblingDmpV2"
  protocol: {
    name: "dmp"
    version?: DmpVersion
    hasExtraSpasmFields?: false
  }
  signedString?: string
}

export interface SiblingDmpSignedV2 {
  type: "SiblingDmpSignedV2"
  protocol: {
    name: "dmp"
    version?: DmpVersion
    hasExtraSpasmFields?: false
  }
  signedString?: string
  ids?: SpasmEventIdV2[]
  signatures?: SpasmEventSignatureV2[]
}

export interface SiblingNostrV2 {
  type: "SiblingNostrV2"
  protocol: {
    name: "nostr"
    version?: string
    hasExtraSpasmFields?: false
  }
  originalObject?: AnyNostrEvent
  ids?: SpasmEventIdV2[]
}

export interface SiblingNostrSpasmV2 {
  type: "SiblingNostrSpasmV2"
  protocol: {
    name: "nostr"
    version?: string
    hasExtraSpasmFields?: true
    extraSpasmFieldsVersion?: NostrSpasmVersion
  }
  originalObject?: AnyNostrEvent
  ids?: SpasmEventIdV2[]
}

export interface SiblingNostrSignedV2 {
  type: "SiblingNostrSignedV2"
  protocol: {
    name: "nostr"
    version?: string
  }
  originalObject?: AnyNostrEvent
  ids?: SpasmEventIdV2[]
  signatures?: SpasmEventSignatureV2[]
}

export interface SiblingNostrSpasmSignedV2 {
  type: "SiblingNostrSpasmSignedV2"
  protocol: {
    name: "nostr"
    version?: string
    hasExtraSpasmFields?: true
    extraSpasmFieldsVersion?: NostrSpasmVersion
  }
  originalObject?: AnyNostrEvent
  ids?: SpasmEventIdV2[]
  signatures?: SpasmEventSignatureV2[]
}

export type CustomFunctionType = (...args: any[]) => any;

export class ConvertToSpasmConfig {
  to: {
    spasm: {
      version: SpasmVersion,
      type: "SpasmEventV2",
      id: {
        versions: SpasmIdVersion[]
      }
    }
  }
  from: {
    spasm: { enableEventVerification: boolean },
    dmp: { enableEventVerification: boolean },
    nostr: { enableEventVerification: boolean }
  }
  signature: {
    ethereum: { enableVerification: boolean },
    nostr: { enableVerification: boolean }
  }
  xss: {
    enableSanitization: boolean
    sanitizationConfig: SanitizationConfig
  }
  constructor() {
    this.to = {
      spasm: {
        version: "2.0.0",
        type: "SpasmEventV2",
        id: {
          versions: ["01"]
        }
      }
    }
    this.from = {
      spasm: { enableEventVerification: true },
      dmp: { enableEventVerification: true },
      nostr: { enableEventVerification: true }
    }
    this.signature = {
      ethereum: { enableVerification: true },
      nostr: { enableVerification: true }
    }
    this.xss = {
      enableSanitization: true,
      sanitizationConfig: new SanitizationConfig()
    }
    this.xss.sanitizationConfig = new SanitizationConfig()
  }
}

export class SanitizationConfig {
  customFunction: CustomFunctionType
  valueType: string
  maxDepth: number
  constructor() {
    this.customFunction = sanitizeStringWithDompurify,
    this.valueType = "string",
    this.maxDepth = 100
  }
}

type MakeOptional<T> = {
  [P in keyof T]?: T[P] extends object ? MakeOptional<T[P]> : T[P];
};

export type CustomConvertToSpasmConfig =
  MakeOptional<ConvertToSpasmConfig>

export type CustomSanitizationConfig =
  MakeOptional<SanitizationConfig>

// Parsed RSS feed (or Atom)
export class RssFeed {
  title?: string
  description?: string
  link?: string
  feedUrl?: string
  lastBuildDate?: string
  updated?: string;
  author?: string;
  isoDate?: string
  language?: string
  image?: {
    link?: string,
    url?: string,
    title?: string
  }
  paginationLinks?: { self?: string }
  items?: RssItem[] | RssEvent[] | RssItem | RssEvent
  item?: RssItem[] | RssEvent[] | RssItem | RssEvent
  entry?: RssItem[] | RssEvent[]
}

// Traditional RSS item after parsing the feed
export interface RssItem {
  creator?: string
  author?: string
  title?: string
  description?: string
  content?: string
  contentSnippet?: string
  summary?: string
  'content:encoded'?: string
  'content:encodedSnippet'?: string
  guid?: string
  link?: string
  pubDate?: string
  published?: string
  updated?: string
  id?: string
  isoDate?: string
  enclosureUrl?: string
  imgAlt?: string
  mediaThumbnailUrl?: string
  categories?: string[];
}

// Spasm event converted into RSS event
export interface RssEvent {
  type?: "RssEvent"
  spasmEnvelope?: string
  author?: string
  title?: string
  description?: string
  guid?: string
  link?: string
  pubDate?: string
  mediaThumbnailUrl?: string
  enclosureUrl?: string
  imgAlt?: string
}

export class ConvertToRssConfig {
  to: {
    rss: {
      type: "RssEvent",
    }
  }
  customDomain?: string
  customGuid?: string
  customLink?: string
  addSpasmEnvelope?: boolean
  extraEventInfo: {
    forAction: {
      post: { enabled: boolean }
      reply: { enabled: boolean }
      react: { enabled: boolean }
    }
    addSubmitComment: { enabled: boolean }
    addSignedDate: { enabled: boolean }
    addSigner: { enabled: boolean }
  }
  extraContent: {
    forAction: {
      post: { enabled: boolean }
      reply: { enabled: boolean }
      react: { enabled: boolean }
    }
    addDomain: { enabled: boolean }
    text: string
  }
  convertDescriptionToHtml?: boolean
  postExecutionHook?: CustomFunctionType
  constructor() {
    this.to = {
      rss: {
        type: "RssEvent",
      }
    }
    this.addSpasmEnvelope = true
    this.extraEventInfo = {
      forAction: {
        post: { enabled: true },
        reply: { enabled: true },
        react: { enabled: true }
      },
      addSubmitComment: { enabled: true },
      addSignedDate: { enabled: true },
      addSigner: { enabled: true },
    }
    this.extraContent = {
      forAction: {
        post: { enabled: false },
        reply: { enabled: true },
        react: { enabled: true }
      },
      addDomain: { enabled: true },
      text: "\n\n---\nThis message is a response to: "
    }
    this.convertDescriptionToHtml = true
  }
}

export type CustomConvertToRssConfig =
  MakeOptional<ConvertToRssConfig>

export class GenerateRssFeedConfig {
  channel: {
    title: string
    link?: string
    description: string
    language: string
    lastBuildDate: string
    fullUri?: string
    imageUrl?: string
    addSignerToTitle?: boolean
    enableAutoGeneratedNamesInTitle?: boolean
  }
  items: {
    enableAutoGeneratedNames: boolean
  }
  filters?: FeedFiltersV2
  customConvertToRssConfig?: CustomConvertToRssConfig
  constructor() {
    this.channel = {
      title: "Spasm",
      description: "RSS Feed of Spasm events",
      language: "en-us",
      lastBuildDate: new Date().toUTCString(),
      imageUrl: "https://media.spasm.network/spasmim016863a1cae922c77a970a86e0d339455d6417c6106125b8ebac744e50f51581a9.jpeg",
      addSignerToTitle: true,
      enableAutoGeneratedNamesInTitle: true
    }
    this.items = {
      enableAutoGeneratedNames: true
    }
  }
}

export type CustomGenerateRssFeedConfig =
  MakeOptional<GenerateRssFeedConfig>

export interface FeedFiltersV2 {
  format?: "spasm" | "rss" | null
  webType?: FiltersWebType | FiltersWebType[] | null
  signer?: string | string[] | null
  parentId?: string | number | (string | number)[] | null
  action?: string | number | (string | number)[] | null
  category?: FiltersCategory | FiltersCategory[] | null
  source?: string | string[] | null
  activity?: FiltersActivity | FiltersActivity[] | null
  keyword?: string | string[] | null
  limit?: number | string
}

export interface FetchEventsConfig extends FeedFiltersV2 {
  url?: string | string[] | null
  timeout?: string | number | null
  short?: boolean | null
}

// Ideas:
// - Short names? SE2 SE2Body SE2Envelope SE2EnvelopeWithTree
