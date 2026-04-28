Signer and Protocol Agnostic Social Media (Spasm)
=================================================

![cover](https://media.spasm.network/spasmim012d64ac17ad56680f1e1eda5776460dfb8d92cb428f2aa9c64ff4cffd05280817.png)

Mirrors: [Forgejo](https://git.spasm.network/spasm-network/spasm.js) [Codeberg](https://codeberg.org/spasm-network/spasm.js) [Github](https://github.com/spasm-network/spasm.js)

## Overview

The future of social media is agnostic to signing keys, messaging formats, transport protocols and storage infrastructure. However, such design places significant burden on developers, who must maintain a myriad of protocols, formats, and architectures.

This library simplifies the process by encapsulating the complexities of various messaging formats into a single, standardized JSON object called `SpasmEvent`. By abstracting the underlying differences between these formats, it provides a unified interface for developers to work with, ensuring consistency and reducing the need for custom handling of each format.

For instance, instead of maintaining three distinct versions of the frontend (UI) and three separate database tables for three different messaging formats, developers can leverage this library to standardize all messages into a single format. This approach simplifies the architecture by consolidating the database tables into one and requiring only a single version of the UI, with minor adjustments as needed.

This library also introduces an innovative concept of signing the same message with multiple protocols and different private keys, while still sharing the same deterministic Spasm event ID, allowing not only the distribution of the message across different networks, but also chaining of all replies and reactions back to the original message. 

TypeScript interfaces of JSON objects of messaging formats that can be standardized with this library can be found at `./src.ts/types/interfaces.ts`.

```typescript
export type UnknownEventV2 =
  DmpEvent |
  DmpEventSignedClosed |
  DmpEventSignedOpened |
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  SpasmEventV0 |
  SpasmEventV2 |
  SpasmEventBodyV2 |
  SpasmEventEnvelopeV2 |
  SpasmEventEnvelopeWithTreeV2 |
  SpasmEventDatabaseV2 |
  SpasmEventBodySignedClosedV2
```

After converting an unknown event to a Spasm event, you can easily access common properties across most public messaging formats such as:
- `spasmEvent.action`
- `spasmEvent.content`
- `spasmEvent.timestamp`
- `spasmEvent.parent.ids`
- `spasmEvent.parent.ids[0].value`
- `spasmEvent.ids`
- `spasmEvent.ids[0].value`
- `spasmEvent.ids[0].format.name`
- `spasmEvent.authors`
- `spasmEvent.authors[0].addresses`
- `spasmEvent.authors[0].addresses[0].value`
- `spasmEvent.authors[0].addresses[0].format.name`
- `spasmEvent.signatures`
- `spasmEvent.signatures[0].value`
- `spasmEvent.signatures[0].pubkey`
- `spasmEvent.signatures[0].format.name`

Any Spasm event can be signed with different protocols (e.g., Spasm, Dmp, Nostr), so all the original (un)signed event objects/strings are stored at:
- `spasmEvent.siblings`

See the full list of properties of `SpasmEventV2` at `./src.ts/types/interfaces.ts`.

Here is a schema of the SpasmEventV2 interface:

```
#01  = EventForSpasmid01
SE   = SpasmEvent
Body = SpasmEventBody
Env  = SpasmEventEnvelope
Tree = SpasmEventEnvelopeWithTree
DB   = SpasmEventDatabase

event*
│
├── type                             --- SE Body Env Tree DB
├── protocol             (+ sibling) --- -- Body --- ---- --
│   ├── name                         --- -- Body --- ---- --
│   └── version                      --- -- Body --- ---- --
├── root                             --- SE ---- --- Tree DB
│   ├── ids[]                        --- SE ---- --- Tree DB
│   ├── marker                       --- SE ---- --- Tree DB  
│   ├── depth                        --- SE ---- --- Tree --
│   └── event*                       --- SE ---- --- Tree --
├── parent                           #01 SE Body --- Tree DB
│   ├── ids[]                        #01 SE Body --- Tree DB
│   ├── marker                       #01 SE Body --- Tree DB
│   ├── depth                        --- SE ---- --- Tree --
│   └── event*                       --- SE ---- --- Tree --
├── action                           #01 SE Body --- ---- DB
├── title                            #01 SE Body --- ---- DB
├── content                          #01 SE Body --- ---- DB
├── timestamp                        #01 SE Body --- ---- DB
├── authors[]                        #01 SE Body --- ---- DB
│   ├── addresses[]                  #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   ├── format                   #01 SE Body --- ---- DB
│   │   │   ├── name                 #01 SE Body --- ---- DB
│   │   │   └── version              #01 SE Body --- ---- DB
│   │   └── verified                 --- SE ---- --- ---- DB
│   └── usernames[] (eg RSS posts)   #01 SE Body --- ---- DB
│       ├── value                    #01 SE Body --- ---- DB
│       ├── protocol                 #01 SE Body --- ---- DB
│       ├── proof                    #01 SE Body --- ---- DB
│       └── provider                 #01 SE Body --- ---- DB
├── categories[]                     --- SE Body --- ---- DB
│   ├── name                         --- SE Body --- ---- DB
│   └── sub (recursive category)     --- SE Body --- ---- DB
├── tips[]                           #01 SE Body --- ---- DB
│   ├── address                      #01 SE Body --- ---- DB
│   ├── text                         #01 SE Body --- ---- DB
│   ├── expiration                   #01 SE Body --- ---- DB
│   │   └── timestamp                #01 SE Body --- ---- DB
│   ├── currency                     #01 SE Body --- ---- DB
│   │   ├── name                     #01 SE Body --- ---- DB
│   │   └── ticker                   #01 SE Body --- ---- DB
│   └── network                      #01 SE Body --- ---- DB
│       ├── name                     #01 SE Body --- ---- DB
│       └── id                       #01 SE Body --- ---- DB
├── hosts[] (see hosts below)        #01 SE Body --- ---- DB
├── links[] (see link below)         #01 SE Body --- ---- DB
├── keywords[]                       #01 SE Body --- ---- DB
├── tags[]                           #01 SE Body --- ---- DB
├── medias[]                         #01 SE Body --- ---- DB
│   ├── hashes[] (see hash below)    #01 SE Body --- ---- DB
│   ├── links[] (see link below)     #01 SE Body --- ---- DB
│   └── type                         #01 SE Body --- ---- DB
├── references[]                     #01 SE Body --- Tree DB
│   ├── ids[]                        #01 SE Body --- Tree DB
│   ├── marker                       #01 SE Body --- Tree DB
│   └── event*                       --- SE ---- --- Tree --
├── mentions[]                       #01 SE Body --- ---- DB
│   ├── addresses[]                  #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   └── format                   #01 SE Body --- ---- DB
│   │       ├── name                 #01 SE Body --- ---- DB
│   │       └── version              #01 SE Body --- ---- DB
│   └── usernames[]                  #01 SE Body --- ---- DB
│       ├── value                    #01 SE Body --- ---- DB
│       ├── protocol                 #01 SE Body --- ---- DB
│       ├── proof                    #01 SE Body --- ---- DB
│       └── provider                 #01 SE Body --- ---- DB
├── proofs[]                         #01 SE Body --- ---- DB
│   ├── value                        #01 SE Body --- ---- DB
│   ├── links[]                      #01 SE Body --- ---- DB
│   └── protocol                     #01 SE Body --- ---- DB
│       ├── name                     #01 SE Body --- ---- DB
│       └── version                  #01 SE Body --- ---- DB
├── previousEvent        (+ sibling) --- -- Body --- ---- --
│   ├── ids[]                        --- -- Body --- ---- --
│   ├── marker                       --- -- Body --- ---- --
│   ├── depth                        --- -- Body --- ---- --
│   └── event*                       --- -- ---- --- ---- --
├── sequence             (+ sibling) --- -- Body --- ---- --
├── license                          #01 SE Body --- ---- DB
├── language                         #01 SE Body --- ---- DB
├── extra                            #01 SE Body --- ---- DB
├── pows            (only 1 in body) --- SE Body --- ---- DB
│   ├── nonce                        --- SE Body --- ---- DB
│   ├── difficulty                   --- SE Body --- ---- DB
│   ├── words[]                      --- SE Body --- ---- DB
│   └── network                      --- SE Body --- ---- DB
│       ├── name                     --- SE Body --- ---- DB
│       └── id                       --- SE Body --- ---- DB
│
├── ids[]                            --- SE ---- Env Tree DB
├── signatures[]                     --- SE ---- Env Tree DB
│   ├── value                        --- SE ---- Env Tree DB
│   ├── pubkey                       --- SE ---- Env Tree DB
│   └── format                       --- SE ---- Env Tree DB
│       ├── name                     --- SE ---- Env Tree DB
│       └── version                  --- SE ---- Env Tree DB
│
├── siblings[]                       --- SE ---- Env Tree DB
│   ├── type                         --- SE ---- Env Tree DB
│   ├── signedString                 --- SE ---- Env Tree DB
│   ├── originalObject               --- SE ---- Env Tree DB
│   ├── signatures[]                 --- SE ---- Env Tree DB
│   │   ├── value                    --- SE ---- Env Tree DB
│   │   ├── pubkey                   --- SE ---- Env Tree DB
│   │   └── format                   --- SE ---- Env Tree DB
│   │       ├── name                 --- SE ---- Env Tree DB
│   │       └── version              --- SE ---- Env Tree DB
│   ├── sequence                     --- SE ---- Env Tree DB
│   ├── previousEvent                --- SE ---- Env Tree DB
│   │   ├── ids[]                    --- SE ---- Env Tree DB
│   │   ├── marker                   --- SE ---- Env Tree DB
│   │   ├── depth                    --- SE ---- Env Tree DB
│   │   └── event*                   --- SE ---- --- Tree DB
│   └── protocol                     --- SE ---- Env Tree DB
│       ├── name                     --- SE ---- Env Tree DB
│       ├── version                  --- SE ---- Env Tree DB
│       ├── hasExtraSpasmFields      --- SE ---- Env Tree DB
│       └── extraSpasmFieldsVersion  --- SE ---- Env Tree DB
│
├── db                               --- SE ---- Env Tree DB
│   ├── key                          --- SE ---- Env Tree DB
│   ├── addedTimestamp               --- SE ---- Env Tree DB
│   ├── updatedTimestamp             --- SE ---- Env Tree DB
│   └── table                        --- SE ---- Env Tree DB
├── source                           --- SE ---- Env Tree DB
│   ├── name                         --- SE ---- Env Tree DB
│   ├── uiUrl                        --- SE ---- Env Tree DB
│   ├── apiUrl                       --- SE ---- Env Tree DB
│   ├── query                        --- SE ---- Env Tree DB
│   └── showSource                   --- SE ---- Env Tree DB
├── stats[]                          --- SE ---- Env Tree DB
│   ├── action                       --- SE ---- Env Tree DB
│   ├── total                        --- SE ---- Env Tree DB
│   ├── latestTimestamp              --- SE ---- Env Tree DB
│   ├── latestDbTimestamp            --- SE ---- Env Tree DB
│   └── ...(upvote, downvote, etc.)  --- SE ---- Env Tree DB
├── sharedBy[]                       --- SE ---- Env Tree DB
│   └── ids[]                        --- SE ---- Env Tree DB
│
│   (Envelope with tree)
├── root                             --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
├── parent                           --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
├── references[]                     --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
└── children[]                       --- SE ---- Env Tree --
    └── SE | Env | Tree              --- SE ---- Env Tree --

id
├── value #.
├── format #.
│   ├── name
│   └── version
└── hosts[]

hash
├── value
├── name
├── length
├── type
├── pieceLength
└── pieces[]

link
├── value
├── protocol
├── origin
├── host
├── pathname
├── search
├── port
└── originalProtocolKey
```

### Spasm ID

The Spasm ID of version `01` is a sha256 hash of some values of a Spasm event prepended with identifiers. The exact key-value pairs used for calculating the Spasm ID can be found by examining EventForSpasmid01. Many key-value pairs are not used because of various reasons. For example, a source will be different on different instances; the same event can be submitted to different instances with different PoW values; categories can be signed by the author, but can also be attached on the instance, e.g., for web2 unsigned events fetched from legacy RSS feeds.

Here is a hash of a [genesis](https://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f) message 'not your keys, not your words':

```
spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f
```

`spasm` - identifies that this is a Spasm hash

`id` - identifies that this is a hash of an event

`01` - identifies a hash version


### Spasm media hashes

[Video](https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4) files are hashed and prepended with `spasmvi01`.

```
spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee
```

[Image](https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg) files are hashed and prepended with `spasmim01`.

```
spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa
```

Audio files are hashed and prepended with `spasmau01`.

Other files are hashed and prepended with `spasmfl01`.

Using hashes for file names enables instances to locate files across different domains, even if the original domain is offline. This method is part of a broader concept known as "content-addressing" that ensures that files can be retrieved based on their content rather than their location, promoting resilience and decentralization in data management.


### Features

- identify web2 posts and web3 events

- convert web2 posts and web3 events to Spasm event

- create unique Spasm ID for single-signed and multi-signed events

- merge two Spasm events with the same Spasm ID

## Installation

Option 1. Install with npm.

```bash
npm install spasm.js
```

Option 2. Include the bundled version in HTML

```js
// Dowload the bundle file from dist/spasm.min.js
// Add the following tag to your HTML file:
<script src="dist/spasm.min.js"></script>
```

## Usage

#### CommonJS (require)

Option 1. Import separate functions:

```js
const {identifyObject} = require('spasm.js')
const {convertToSpasm} = require('spasm.js')
const {mergeSpasmEventsV2} = require('spasm.js')
const {mergeDifferentSpasmEventsV2} = require('spasm.js')

const event = {
  // some event
}

// Identify the event
const info = identifyObject(event)

// Convert to Spasm (the latest version)
const spasmEvent = convertToSpasm(event)

// Convert to Spasm (specify version)
const spasmEvent = convertToSpasm(
  event, { to: { spasm: { version: "2.0.0" } } }
)

// Merge events into one event
const spasmEvent = mergeSpasmEventsV2([
  event, eventWithStats, eventWithComments
])

// Merge different events
const spasmEvents = mergeDifferentSpasmEventsV2([
  event, eventWithStats, eventWithComments,
  anotherEvent, anotherEventWithStats
])
```

Option 2. Import all functions:

```js
const spasm = require('spasm.js')

const event = {
  // some event
}

// Identify the event
const info = spasm.identifyObject(event)

// Convert to Spasm
const spasmEvent = spasm.convertToSpasm(event)

// Merge events into one event
const spasmEvent = spasm.mergeSpasmEventsV2([
  event, eventWithStats, eventWithComments
])

// Merge different events
const spasmEvents = spasm.mergeDifferentSpasmEventsV2([
  event, eventWithStats, eventWithComments,
  anotherEvent, anotherEventWithStats
])
```

#### ESM (import)

Option 1. Import separate functions:

```js
import {identifyObject} from 'spasm.js'
import {convertToSpasm} from 'spasm.js'

const event = {
  // some event
}

// Identify the event
const info = identifyObject(event)

// Convert to Spasm
const spasmEvent = convertToSpasm(event)
```

Option 2. Import all functions:

```js
import * as spasm from 'spasm.js'

const event = {
  // some event
}

// Identify the event
const info = spasm.identifyObject(event)

// Convert to Spasm
const spasmEvent = spasm.convertToSpasm(event)
```

#### Static HTML (bundle)

```html
<script src="dist/spasm.min.js"></script>
<script>
    // Display status in console (should be "success")
    spasm.utilsStatus();

    const event = {
      // some event
    };

    // Convert to Spasm
    const spasmEvent = spasm.convertToSpasm(event);
</script>
```

## Utils


```js
// Spasm Envelope is a compressed version of Spasm Event.
// It's used to reduce bandwidth when exchanging events.

// Convert one event to Spasm Envelope
const spasmEnvelope = spasm.convertToSpasmEventEnvelope(event)
// Convert many events to Spasm Envelopes
const spasmEnvelopes = spasm.convertManyToSpasmEventEnvelope(event)
```

```js
// Spasm Event is an uncompressed version of Spasm Event.
// It's important to convert received envelopes to Spasm
// events because that will verify signatures.

// Convert one event to Spasm Event
const spasmEvent = spasm.convertToSpasm(event)
// Convert many events to Spasm Events
const spasmEvents = spasm.convertManyToSpasm(events)
```

```js
// Get an array of all signers/pubkeys from the event
// (including signers which cannot be verified against signatures)
const signers = spasm.getAllSigners(event)

// Get an array of signers/pubkeys which have
// been verified against attached signatures
const verifiedSigners = spasm.getVerifiedSigners(event)

const spasmSigners = getAllSpasmSigners(event)
const ethereumSigners = getAllEthereumSigners(event)
const nostrSigners = getAllNostrSigners(event)
const verifiedSpasmSigners = getVerifiedSpasmSigners(event)
const verifiedEthereumSigners = getVerifiedEthereumSigners(event)
const verifiedNostrSigners = getVerifiedNostrSigners(event)
```

```js
// Get an array of signers/pubkeys which match values provided
// in the attached list (e.g., moderators, whitelisted, banned)
const moderators = spasm.getSignersListedIn(event, moderatorsList)
// alias
const banned = spasm.getPubkeysListedIn(event, bannedList)
```

```js
// Check if all signers/pubkeys match values provided
// in the attached list (e.g., moderators, whitelisted, banned)
const areModerators = spasm.areAllSignersListedIn(event, moderatorsList)
// alias
const areBanned = spasm.areAllPubkeysListedIn(event, bannedList)
```

```js
// Check if at least one signer/pubkey matches a value provided
// in the attached list (e.g., moderators, whitelisted, banned)
const isModerator = spasm.isAnySignerListedIn(event, moderatorsList)
// alias
const isBanned = spasm.isAnyPubkeyListedIn(event, bannedList)
```

```js
// Get an array of all event IDs
const ids = spasm.getAllEventIds(event)

// Get an array of all parent IDs
const parentIds = spasm.getAllParentIds(event)

// Get an array of all root IDs
const rootIds = spasm.getAllRootIds(event)
```

```js
// Get an array of all event signatures
const signatures = spasm.getAllSignatures(event)
```

```js
// Get a stat object of a specified action
const stats = spasm.getStatByAction(event, "react")
```

```js
// Get a total number of a specified action
const stats = spasm.getTotalOfAction(event, "reply")
```

```js
// Get a total number of a specified reaction
const stats = spasm.getTotalOfReaction(event, "upvote")
```

```js
// Get a total number of the most popular reaction
const stats = spasm.getTotalOfMostPopularReaction(event)
```

```js
// Get a total number of a react/reply action
const stats = spasm.getTotalOfReact(event)
const stats = spasm.getTotalOfReply(event)

// aliases
const stats = spasm.getTotalOfActionReact(event)
const stats = spasm.getTotalOfReactAction(event)
const stats = spasm.getTotalOfActionReply(event)
const stats = spasm.getTotalOfReplyAction(event)
```

```js
// Extract an ID from an event.
const nostrId = spasm.getIdByFormat(event, { name: "nostr-hex" })

const spasmId = spasm.getIdByFormat(event, {
  name: "spasmid", version: "01"
})

// alias
const spasmId = spasm.extractIdByFormat(event, {
  name: "spasmid"
})

// other aliases for extracting event, parent, and root IDs:
// extractSpasmId01()
// extractParentIdByFormat()
// extractParentSpasmId01()
// extractRootIdByFormat()
// extractRootSpasmId01()

// Note: the functions above don't calculate new IDs, but
// simply extracts an existing ID from an event object.
// If you want to calculate a Spasm ID (e.g., to verify it),
// then you must use another function, for example:
const spasmId = spasm.getSpasmId(event)
```

```js
// Extract Nostr event(s) from a Spasm event.
const nostrEvent = extractNostrEvent(spasmEvent)
const nostrSignedEvent = extractSignedNostrEvent(spasmEvent)
const nostrEvents = extractNostrEvents(spasmEvent)
const nostrSignedEvents = extractSignedNostrEvents(spasmEvent)

// Note: Spasm event can have multiple siblings of Nostr event type
```

```js
// Check if Spasm event has any sibling of protocol type
const ifHasSiblingOfProtocol = hasSiblingOfProtocol(event, "spasm")
const ifHasSiblingSpasm = hasSiblingSpasm(event)
const ifHasSiblingDmp = hasSiblingDmp(event)
const ifHasSiblingNostr = hasSiblingNostr(event)
const ifHasSiblingWeb2 = hasSiblingWeb2(event)
```

```js
const idFormatName = extractIdFormatNameFromSpasmEventIdV2(event)

const ifFormatNames = extractAllIdFormatNamesFromSpasmEventV2(event)

// aliases
const ifFormatNames = getAllFormatNamesFromSpasmEventV2(event)
const ifFormatNames = getAllFormatNamesFromEvent(event)
```

```js
const ifEventHasThisId = spasm.checkIfEventHasThisId(
  event, "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
)
```

```js
const event = spasm.getEventById(
  [ event1, event2, event3 ],
  "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
)
```

```js
const events = spasm.getEventsByIds(
  [ event1, event2, event3 ],
  [
    "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
    "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
  ]
)
```

```js
// Convert an event to SpasmEventV2 only if
// it's not SpasmEventV2 yet.
const spasmEventV2 = toBeSpasmEventV2(event)

// Convert each event of an array of events to SpasmEventV2 only
// if event is not SpasmEventV2 yet.
const spasmEventsV2 = toBeSpasmEventsV2(events)

// Note: you must use convertToSpasm() at least one time
// upon receiving an event, because by default it will
// verify all the signatures and sanitize nested strings.
// After that you can use toBeSpasmEventV2() in each
// function to minimize computational load.
```

```js
// Merge event children
const mergedChildren = mergedChildrenV2(children1, children2)
```

```js
// Add events (root, parent, children) to event's tree recursively
const eventWithTree = addEventsToTree(mainEvent, relatives)

// Aliases
// addParentToTree()
// addParentToEvent()
// addRootToTree()
// addRootToEvent()
// addChildrenToTree()
// addCommentsToEvent()
// addRepliesToEvent()

// Attaching events as relatives to event's tree
const eventWithRoot = attachEventAsRoot(mainEvent, root)
const eventWithParent = attachEventAsParent(mainEvent, parent)
const eventWithChildren = attachEventAsChild(mainEvent, child)
```

```js
// Check if arrays have common IDs
const ifCommonId = ifArraysHaveCommonId(array1, array2)

// Example of finding whether events are relatives
// and then attaching event as a root
const event1RootIds = getAllRootIds(event1)
const event2Ids = getAllEventIds(event2)
if (ifArraysHaveCommonId(event1RootIds, event2Ids)) {
  treeEventV2 = attachEventAsRoot(event1, event2)
}
```

```js
// Check if an array already has this event
checkIfArrayHasThisEvent(array, event)

// alias
checkIfArrayHasThisSpasmEventV2

// Insert or merge an event into array
insertIntoArrayIfEventIsUnique(array, event)

// alias (merge enabled by default)
appendToArrayIfEventIsUnique(array, event)
pushToArrayIfEventIsUnique(array, event)

// alias (merge enabled by default)
prependToArrayIfEventIsUnique(array, event)
unshiftToArrayIfEventIsUnique(array, event)

// Merge event into array (only if not unique)
mergeEventIntoArray(array, event)
```

```js
// Sort events by added timestamp ascending
const asc = sortSpasmEventsV2ByDbAddedTimestamp(events, "asc")

// Sort events by added timestamp descending
const desc = sortSpasmEventsV2ByDbAddedTimestamp(events, "desc")

// alias
const sortDesc = sortSpasmEventsV2()
```

```js
// Check if two events have the same Spasm ID version 01
const ifSameEvent = ifEventsHaveSameSpasmId01(event1, event2)
```

```js
// Get Spasm tags by name
const tags = getSpasmTagsByName(event, "my-tag")

// Aliases
getTagsByName()
getAllTagsByName()
getAllSpasmTagsByName()

// Get Spasm tag by name
const tag = getSpasmTagByName(event, "my-tag")

// Aliases
getTagByName()
getOneTagByName()
getOneSpasmTagByName()
```

```js
// Add custom schema to SpasmEventBodyV2 before signing an event
const spasmEventBody =  {
  type: "SpasmEventBodyV2",
  // other key-value pairs
}

// The first "name" key is necessary, other keys are optional
// and might have different names. The recommended value for
// each key is "string", but other values like objects and
// arrays can be used. If you pass numbers and booleans, they
// will be extraced as strings.
const schema = {
  name: "my-schema",
  version: "1.0",
  kind: "text",
  cid: "",
  time: "123456",
  yes: "true",
  no: "false",
  media_type: "audio",
  array_key: [ 1, "two", { three: "four" } ],
  object_key: { five: "six", seven: [ 8 ] }
}

// Add schema
addSchema(spasmEventBody, schema)

// Extract custom schema from SpasmEventV2
const spasmEvent = convertToSpasm(unknownEvent)
const mySchema = getSchema(spasmEvent, "my-schema")

// Schemas are added to tags, compatible with Spasm and Nostr
```

```js
// Merge stats
const mergedStats = mergeStatsV2(arrayOfStats)
```

```js
const mergedChildren = mergeChildrenV2(arrayOfChildren)
```

```js
// Remove siblings without signatures if signed siblings
// of the same protocol and protocol version are attached.
cleanSpasmEventV2(spasmEventV2)
```

```js
// Assign formats for IDs, signatures, addresses if don't exist
assignFormats(event)
```

```js
// Get all URLs from a string
const urls = getAllUrlsFromString(event)

// aliases
const urls = extractAllUrlsFromString(event)
const urls = parseStringForUrls(event)
```

```js
// Generate RSS feed
const rssFeed = generateRssFeed(events, config)

const rssEvent = convertToRssEvent(event, config)
```

## Examples

### Sign SpasmEventBodyV2

```js
// Single-signing with one private key
const signSpasmEventBodyV2 = async (
  spasmEventBodyV2: SpasmEventBodyV2
): Promise<SpasmEventV2 | null> => {
  const stringToSign: string = JSON.stringify(spasmEventBodyV2)

  const signature: string = await signString(stringToSign)

  const signedEvent: SpasmEventBodySignedClosedV2 = {
    type: "SpasmEventBodySignedClosedV2",
    signedString: stringToSign,
    signature,
    signer: signerAddress.toLowerCase()
  }

  const spasmEvent: SpasmEventV2 = spasm.convertToSpasm(signedEvent)

  return spasmEvent
}
```

### Convert DmpEventSignedClosed to Spasm

Here is a signed DMP event:

```typescript
const event: DmpEventSignedClosed = {
  signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
  signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
  signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
}
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: {
    baseProtocol: "dmp",
    hasExtraSpasmFields: false,
    hasSignature: true,
    isSpasmCompatible: true,
    license: "MIT",
    privateKeyType: "ethereum",
    type: "DmpEventSignedClosed"
  },
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web3"
}
```

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEventV2 = {
  type: "SpasmEventV2",
  action: "post",
  title: "genesis",
  content: "not your keys, not your words",
  timestamp: 1641074686178,
  authors: [
    {
      addresses: [
        {
          value: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
          format: { name: "ethereum-pubkey", }
        }
      ]
    }
  ],
  license: "MIT",
  ids: [
    {
      value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
      format: { name: "ethereum-sig", }
    },
  ],
  signatures: [
    {
      value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
      pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
      format: { name: "ethereum-sig" }
    }
  ],
  siblings: [
    {
      type: "SiblingDmpSignedV2",
      protocol: {
        name: "dmp",
        version: "0.0.1"
      },
      signedString: JSON.stringify(validDmpEvent),
      ids: [
        {
          value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
          format: { name: "ethereum-sig" }
        },
      ],
      signatures: [
        {
          value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
          pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
          format: { name: "ethereum-sig" }
        }
      ]
    }
  ]
}
```

### Convert NostrSpasmEventSignedOpened to Spasm

Here is a signed Nostr event with extra Spasm tags:

```typescript
export const event: NostrSpasmEventSignedOpened = {
  kind: 1,
  created_at: 1705462957,
  tags:[
    ["license","SPDX-License-Identifier: CC0-1.0"],
    ["spasm_version","1.0.0"],
    ["spasm_action","post"],
    ["spasm_title","Nostr Spasm genesis"]
  ],
  content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
  pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
  id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
  sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
}
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: true,
    hasSignature: true,
    isSpasmCompatible: true,
    license: "SPDX-License-Identifier: CC0-1.0",
    privateKeyType: "nostr",
    type: "NostrSpasmEventSignedOpened"
  },
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web3"
}
```

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEventV2 = {
  type: "SpasmEventV2",
  action: "post",
  title: "Nostr Spasm genesis",
  content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
  timestamp: 1705462957,
  authors: [
    {
      addresses: [
        {
          value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
          format: { name: "nostr-hex" }
        }
      ]
    }
  ],
  license: "SPDX-License-Identifier: CC0-1.0",
  ids: [
    {
      value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
      format: { name: "nostr-hex" }
    },
    {
      value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
      format: { name: "nostr-sig" }
    }
  ],
  signatures: [
    {
      value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
      pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
      format: { name: "nostr-sig" }
    }
  ],
  siblings: [
    {
      type: "SiblingNostrSpasmSignedV2",
      originalObject: {
        kind: 1,
        created_at: 1705462957,
        tags:[
          ["license","SPDX-License-Identifier: CC0-1.0"],
          ["spasm_version","1.0.0"],
          ["spasm_action","post"],
          ["spasm_title","Nostr Spasm genesis"]
        ],
        content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
        pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
        id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
        sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        },
      protocol: {
        name: "nostr",
        hasExtraSpasmFields: true,
        extraSpasmFieldsVersion: "1.0.0"
      },
      ids: [
        {
          value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
          format: { name: "nostr-hex" }
        },
        {
          value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
          format: { name: "nostr-sig" }
        }
      ],
      signatures: [
        {
          value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
          pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
          format: { name: "nostr-sig" }
        }
      ]
    }
  ]
}
```

### Convert RssItem to Spasm

Here is a Spasm event v0 with an RSS item:

```typescript
const event: SpasmEventV0 = {
  id: 18081,
  guid: "https://forum.degenrocket.space/?l=terraforming",
  source: "degenrocket.space",
  author: "stablepony",
  tickers: "cookies",
  title: "To the Moon!",
  url: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
  description: "Tornado is coming back! Roger that! Starting the engine...",
  pubdate: "2024-03-12T20:24:04.240Z",
  category: "defi",
  tags: ["dark", "forest"],
  upvote: 3,
  downvote: null,
  bullish: 2,
  bearish: 0,
  important: 6,
  scam: 1,
  comments_count: 0,
  latest_action_added_time: null
}
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: false,
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web2"
}
```

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEvent = {
  type: "SpasmEventV2",
  ids: [
    {
      value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
      format: { name: "url" }
    },
    {
      value: "https://forum.degenrocket.space/?l=terraforming",
      format: { name: "guid" }
    }
  ],
  db: {
    key: 18081
  },
  action: "post",
  title: "To the Moon!",
  content: "Tornado is coming back! Roger that! Starting the engine...",
  timestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
  authors: [
    {
      usernames: [ { value: "stablepony" } ]
    }
  ],
  categories: [ { name: "defi" } ],
  links: [
    {
      value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
      protocol: "https",
      origin: "https://forum.degenrocket.space",
      host: "forum.degenrocket.space",
      pathname: "/",
      search: "?b=21&t=fog&c=samourai&h=hijack",
      originalProtocolKey: "url"
    },
    {
      value: "https://forum.degenrocket.space/?l=terraforming",
      protocol: "https",
      origin: "https://forum.degenrocket.space",
      host: "forum.degenrocket.space",
      pathname: "/",
      search: "?l=terraforming",
      originalProtocolKey: "guid"
    }
  ],
  keywords: [ "dark", "forest", "cookies" ],
  source: {
    name: "degenrocket.space"
  },
  siblings: [
    {
      type: "SiblingWeb2V2",
      protocol: { name: "web2" },
      originalObject: {
        id: 18081,
        guid: "https://forum.degenrocket.space/?l=terraforming",
        source: "degenrocket.space",
        author: "stablepony",
        tickers: "cookies",
        title: "To the Moon!",
        url: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
        description: "Tornado is coming back! Roger that! Starting the engine...",
        pubdate: "2024-03-12T20:24:04.240Z",
        category: "defi",
        tags: ["dark", "forest"],
        upvote: 3,
        downvote: null,
        bullish: 2,
        bearish: 0,
        important: 6,
        scam: 1,
        comments_count: 0,
        latest_action_added_time: null
      },
      ids: [
        {
          value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
          format: { name: "url" }
        },
        {
          value: "https://forum.degenrocket.space/?l=terraforming",
          format: { name: "guid" }
        }
      ]
    }
  ],
  stats: [
    {
      action: "react",
      contents: [
        {
          value: "upvote",
          total: 3
        },
        {
          value: "bullish",
          total: 2
        },
        {
          value: "bearish",
          total: 0
        },
        {
          value: "important",
          total: 6
        },
        {
          value: "scam",
          total: 1
        },
      ]
    },
    {
      action: "reply",
      total: 0
    }
  ]
}
```

## License

MIT License


---

Learn more at [spasm.network](https://spasm.network) or **spasmnetwork.eth**

**Unplug from slave tech!**

![unplug-from-slave-tech](https://media.spasm.network/spasmim015be887d352784380ddbfc3952c06ac17c9d0401509231723cc89360f1df0d030.jpeg)

