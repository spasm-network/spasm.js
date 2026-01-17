"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld = exports.validDmpEventConvertedToSpasmEventV2 = exports.validSpasmDmpEventSignedClosedV0 = exports.validPostWithDmpEventSignedClosed = exports.validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren = exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = exports.validDmpEventSignedClosedConvertedToSpasmV2WithoutFormats = exports.validDmpEventSignedClosedConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEvent = exports.validNostrReplyToDmpEvent = exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2 = exports.validSpasmWithDmpReplyToDmpEventV0 = exports.validDmpEventSignedClosedWithInvalidSignature = exports.validDmpEventSignedClosedWithInvalidSigner = exports.validDmpEventSignedClosedWithInvalidSignedString = exports.validDmpEventSignedOpened = exports.validDmpEventSignedClosed = exports.validDmpEvent = exports.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2 = exports.validSpasmEventBodyV2ReplyToGenesisSignedClosed = exports.validSpasmEventBodyV2ReplyToGenesis = exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2 = exports.validSpasmEventBodySignedClosedV2 = exports.validSpasmEventBodyV2ConvertedToSpasmV2 = exports.validSpasmEventBodyV2 = exports.validId0Spasmid01 = exports.invalidId2Note = exports.validId2Hex = exports.validId2Nevent = exports.validId2Note = exports.invalidId1Note = exports.validId1Hex = exports.validId1Nevent = exports.validId1Note = exports.invalidHexAddress2 = exports.invalidHexAddress1 = exports.invalidNpubAddress2 = exports.invalidNpubAddress1 = exports.validHexAddress2 = exports.validHexAddress1 = exports.validNpubAddress2 = exports.validNpubAddress1 = exports.invalidEthereumSignature1 = exports.validEthereumSignature1 = exports.invalidEthereumAddress1 = exports.validEthereumAddress1 = void 0;
exports.validNostrSpasmEventSpasmV0WithInvalidHtmlTags = exports.validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2 = exports.validPostWithRssItemTitleHasSpecialChars = exports.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2 = exports.validPostWithRssItemSpecialChars = exports.SpasmEventV2ConvertedToSpasmid01 = exports.SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys = exports.SpasmEventV2ToTestSpasmid01 = exports.validSpasmEventV2WithTwoParentUrlIds = exports.validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2 = exports.validSpasmEventRssItemV0ConvertedToSpasmV2 = exports.validSpasmEventRssItemV0 = exports.validPostWithRssItemReverseTags = exports.validPostWithRssItem = exports.validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2 = exports.validSpasmEventBodyV2ReplyWithTwoSigners = exports.validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2 = exports.validSpasmEventBodyV2WithOneNostrSigner = exports.validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2 = exports.validNostrSpasmEventV2SingleSignedOpened = exports.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2 = exports.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2 = exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2 = exports.validNostrEventSignedOpenedConvertedToSpasmV2 = exports.validNostrSpasmEventConvertedToSpasmV2 = exports.validNostrEventConvertedToSpasmV2 = exports.validSpasmNostrSpasmEventSignedOpenedV0 = exports.validPostWithNostrSpasmEventSignedOpened = exports.validSpasmNostrEventSignedOpenedV0 = exports.validPostWithNostrEventSignedOpened = exports.validNostrSpasmEventSignedOpenedWithInvalidSigner = exports.validNostrSpasmEventSignedOpenedWithInvalidContent = exports.validNostrSpasmEventSignedOpenedWithInvalidSignature = exports.validNostrSpasmEventSignedOpened = exports.validNostrEventSignedOpened = exports.validNostrSpasmEvent = exports.validNostrEvent = exports.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent = exports.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2 = exports.validDmpEventSignedClosedConvertedToSpasmV2DifferentSource = exports.validDmpEventSignedOpenedConvertedToSpasmV2 = exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse = exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2 = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb = void 0;
exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent = exports.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent = exports.validPostWithRssItemConvertedToRssEvent = exports.validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent = exports.validNostrReplyToDmpEventConvertedToRssEvent = exports.validSpasmEventBodySignedClosedV2ConvertedToRssEvent = exports.validSpasmEventBodyV2ConvertedToRssEvent = exports.validDmpEventSignedClosedConvertedToRssEvent = exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks = exports.validMultiSignedSpasmEventV2WithMediaLinks = exports.validSpasmEnvelopeV2SourceMoneroObserverSsp = exports.validSpasmEventV2SourceMoneroObserverNbsp = exports.validSpasmTreeV2Depth2_Plus2 = exports.validSpasmTreeV2Depth2_Plus1 = exports.validSpasmTreeV2Depth0_Plus4 = exports.validSpasmTreeV2Depth0_Plus2 = exports.validSpasmTreeV2Depth0_Plus1 = exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1 = exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1 = exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1 = exports.validSpasmEventV2TreeDepth2_Post1Reply2React1 = exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1 = exports.validSpasmEventV2TreeDepth1_Post1Reply2 = exports.validSpasmEventV2TreeDepth1_Post1Reply1 = exports.validSpasmEventV2TreeDepth1_Post1React1 = exports.validSpasmEventV2TreeDepth0_Post1 = exports.validRssItemWithEmojiConvertedToSpasmEvent2 = exports.validRssItemWithEmoji = void 0;
const convertToSpasm_js_1 = require("../convert/convertToSpasm.js");
const convertToSpasmEventEnvelope_js_1 = require("../convert/convertToSpasmEventEnvelope.js");
const getSpasmId_js_1 = require("../convert/getSpasmId.js");
const index_js_1 = require("./../utils/index.js");
const index_js_2 = require("./../utils/index.js");
// import { convertToSpasm } from "./../convert/convertToSpasm"
// const latestSpasmVersion = "2.0.0"
exports.validEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2fa";
exports.invalidEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2f";
exports.validEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b";
exports.invalidEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71";
exports.validNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z";
exports.validNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d6";
exports.validHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c81";
exports.validHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9014aa";
exports.invalidNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr1z";
exports.invalidNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d7";
exports.invalidHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c82";
exports.invalidHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9015aa";
// 4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65
exports.validId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mv";
exports.validId1Nevent = "nevent1qqsyxakxt5hjx2hmaxug9g6m4f8kl6rx038xs36f4at9lxqcx0kk5egkrc3ry";
exports.validId1Hex = "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65";
exports.invalidId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mw";
exports.validId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfq";
exports.validId2Nevent = "nevent1qqsrm2tegjxehgnrsexy6mc5npxyyw3c8qmyasj47q78jp934emlypszlcsc8";
exports.validId2Hex = "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206";
exports.invalidId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfr";
// hello world | sha256
exports.validId0Spasmid01 = "spasmid01a948904f2f0f479b8f8197694b30184b0d2ed1c1cd2a1ec0fb85d299a192a447";
exports.validSpasmEventBodyV2 = {
    type: "SpasmEventBodyV2",
    action: "post",
    content: "Native spasm event body V2",
    title: "Native spasm event title V2",
    timestamp: 1728711181918,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "post",
    title: "Native spasm event title V2",
    content: "Native spasm event body V2",
    timestamp: 1728711181918,
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid01e3e37437febee283d67499a413dccf0b9d3121e120ec4a8b022fe6296039cce5",
            format: { name: "spasmid", version: "01" }
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    siblings: [
        {
            type: "SiblingSpasmV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2)
        }
    ],
};
exports.validSpasmEventBodySignedClosedV2 = {
    type: 'SpasmEventBodySignedClosedV2',
    signedString: '{"type":"SpasmEventBodyV2","action":"post","content":"Native spasm event body V2","title":"Native spasm event title V2","timestamp":1728711181918,"license":"SPDX-License-Identifier: CC0-1.0","protocol":{"name":"spasm","version":"2.0.0"},"authors":[{"addresses":[{"value":"0x899a9413f0a3a4eee462e10d18ad8813fe0092c0","format":{"name":"ethereum-pubkey"}}]}]}',
    signature: '0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b',
    signer: '0x899a9413f0a3a4eee462e10d18ad8813fe0092c0'
};
exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: exports.validSpasmEventBodyV2.action,
    content: exports.validSpasmEventBodyV2.content,
    title: exports.validSpasmEventBodyV2.title,
    timestamp: exports.validSpasmEventBodyV2.timestamp,
    license: exports.validSpasmEventBodyV2.license,
    ids: [
        {
            value: "spasmid01e3e37437febee283d67499a413dccf0b9d3121e120ec4a8b022fe6296039cce5",
            format: { name: "spasmid", version: "01" }
        }
    ],
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    signatures: [
        {
            value: "0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b",
            pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingSpasmSignedV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2),
            signatures: [
                {
                    value: "0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b",
                    pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-sig" }
                }
            ],
        }
    ],
};
exports.validSpasmEventBodyV2ReplyToGenesis = {
    type: "SpasmEventBodyV2",
    action: "reply",
    content: "Spasm body V2 reply to genesis.",
    parent: {
        ids: [
            {
                value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
            },
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
            }
        ]
    },
    timestamp: 1728711057154,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: { "name": "spasm", "version": "2.0.0" },
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { "name": "ethereum-pubkey" }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2ReplyToGenesisSignedClosed = {
    type: 'SpasmEventBodySignedClosedV2',
    signedString: '{"type":"SpasmEventBodyV2","action":"reply","content":"Spasm body V2 reply to genesis.","parent":{"ids":[{"value":"spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"},{"value":"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"}]},"timestamp":1728711057154,"license":"SPDX-License-Identifier: CC0-1.0","protocol":{"name":"spasm","version":"2.0.0"},"authors":[{"addresses":[{"value":"0x899a9413f0a3a4eee462e10d18ad8813fe0092c0","format":{"name":"ethereum-pubkey"}}]}]}',
    signature: '0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c',
    signer: '0x899a9413f0a3a4eee462e10d18ad8813fe0092c0'
};
exports.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2 = {
    type: "SpasmEventV2",
    action: exports.validSpasmEventBodyV2ReplyToGenesis.action,
    content: exports.validSpasmEventBodyV2ReplyToGenesis.content,
    timestamp: exports.validSpasmEventBodyV2ReplyToGenesis.timestamp,
    license: exports.validSpasmEventBodyV2ReplyToGenesis.license,
    parent: {
        ids: [
            {
                value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
                format: { name: "spasmid", version: "01" }
            },
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: { name: "ethereum-sig" }
            }
        ]
    },
    ids: [
        {
            value: "spasmid014df27d56a0f0a3fcb97d325665a6fca968c1cc25b9458b87ed7e5ded60f446f4",
            format: { name: "spasmid", version: "01" }
        }
    ],
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    signatures: [
        {
            value: "0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c",
            pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingSpasmSignedV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2ReplyToGenesis),
            signatures: [
                {
                    value: "0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c",
                    pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-sig" }
                }
            ],
        }
    ],
};
exports.validDmpEvent = {
    version: "dmp_v0.0.1",
    time: "2022-01-01T22:04:46.178Z",
    action: "post",
    target: "",
    title: "genesis",
    text: "not your keys, not your words",
    license: "MIT"
};
exports.validDmpEventSignedClosed = {
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fa',
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
    // signedString: JSON.stringify(validDmpEvent)
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
};
exports.validDmpEventSignedOpened = {
    ...exports.validDmpEventSignedClosed,
    signedObject: exports.validDmpEvent
};
exports.validDmpEventSignedClosedWithInvalidSignedString = {
    ...exports.validDmpEventSignedClosed,
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your word\",\"license\":\"MIT\"}"
};
exports.validDmpEventSignedClosedWithInvalidSigner = {
    ...exports.validDmpEventSignedClosed,
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fb'
};
exports.validDmpEventSignedClosedWithInvalidSignature = {
    ...exports.validDmpEventSignedClosed,
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71a'
};
exports.validSpasmWithDmpReplyToDmpEventV0 = {
    "id": 401,
    "target": "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
    "action": "reply",
    "title": "",
    "text": "To the moon!",
    "signer": "0x49e8d02294e721ac47f6f4794625312b9005fd80",
    "signed_message": "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}",
    "signature": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
    "signed_time": "2024-02-17T05:47:59.932Z",
    "added_time": "2024-02-17T05:48:00.076Z",
    "category": null,
    "tags": null,
    "tickers": null,
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: {
                    name: "ethereum-sig",
                }
            }
        ]
    },
    db: {
        key: 401,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-02-17T05:48:00.076Z")
    },
    action: "reply",
    content: "To the moon!",
    timestamp: (0, index_js_2.toBeTimestamp)("2024-02-17T05:47:59.932Z"),
    authors: [
        {
            addresses: [
                {
                    value: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
                    format: { name: "ethereum-pubkey" },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
            format: {
                name: "ethereum-sig",
            }
        },
    ],
    signatures: [
        {
            value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
            pubkey: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingDmpSignedV2",
            protocol: {
                name: "dmp",
                version: "0.1.0"
            },
            signedString: "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}",
            ids: [
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                }
            ],
            signatures: [
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    pubkey: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
                    format: { name: "ethereum-sig" }
                }
            ]
        }
    ]
};
exports.validNostrReplyToDmpEvent = {
    kind: 1,
    created_at: 1708153412,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "reply"],
        ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    ],
    content: "To the SPASM!",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
    sig: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290"
};
exports.validPostWithNostrReplyToDmpEvent = {
    id: 5,
    target: exports.validNostrReplyToDmpEvent.tags[3][1],
    action: "reply",
    title: "",
    text: exports.validNostrReplyToDmpEvent.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrReplyToDmpEvent.pubkey),
    signed_message: JSON.stringify(exports.validNostrReplyToDmpEvent),
    signature: exports.validNostrReplyToDmpEvent.sig,
    // signed_time: validNostrReplyToDmpEvent.created_at,
    signed_time: new Date(exports.validNostrReplyToDmpEvent.created_at).toISOString(),
    added_time: "2024-01-18T02:37:40.712Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 11,
    downvote: 1,
    bullish: 2,
    bearish: 3,
    important: 6,
    scam: 3,
    comments_count: 3,
    latest_action_added_time: "2024-01-21T10:52:37.165Z",
};
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: {
                    name: "ethereum-sig"
                }
            }
        ]
    },
    db: {
        key: 5,
        addedTimestamp: 1705545460712
        // addedTimestamp: toBeTimestamp("2024-01-18T02:37:40.712Z")
    },
    action: "reply",
    content: "To the SPASM!",
    timestamp: 1708153412,
    authors: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: {
                        name: "nostr-hex",
                    },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
            format: {
                name: "nostr-hex",
            }
        },
        {
            value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
            format: {
                name: "nostr-sig",
            }
        }
    ],
    signatures: [
        {
            value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
            pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmSignedV2",
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "1.0.0"
            },
            originalObject: exports.validNostrReplyToDmpEvent,
            ids: [
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            signatures: [
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-sig" }
                }
            ],
        }
    ],
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 11
                },
                {
                    value: "downvote",
                    total: 1
                },
                {
                    value: "bullish",
                    total: 2
                },
                {
                    value: "bearish",
                    total: 3
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2 = {
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
                    format: { name: "ethereum-pubkey" },
                    verified: true
                }
            ]
        }
    ],
    license: "MIT",
    ids: [
        {
            value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            format: { name: "ethereum-sig", }
        }
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
            signedString: JSON.stringify(exports.validDmpEvent),
            ids: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    format: { name: "ethereum-sig" }
                }
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
};
// For testing assignFormats() function
exports.validDmpEventSignedClosedConvertedToSpasmV2WithoutFormats = {
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
                    format: { name: "ethereum-pubkey" },
                    verified: true
                }
            ]
        }
    ],
    license: "MIT",
    ids: [
        {
            value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        },
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
        }
    ],
    signatures: [
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        }
    ],
    siblings: [
        {
            type: "SiblingDmpSignedV2",
            protocol: {
                name: "dmp",
                version: "0.0.1"
            },
            signedString: JSON.stringify(exports.validDmpEvent),
            ids: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
                }
            ],
            signatures: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
                }
            ]
        }
    ]
};
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = { "db": { "addedTimestamp": 1705545460712, "key": 5 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0" }, { "format": { "name": "nostr-hex" }, "value": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f" }, { "format": { "name": "nostr-sig" }, "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "siblings": [{ "ids": [{ "format": { "name": "nostr-hex" }, "value": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f" }, { "format": { "name": "nostr-sig" }, "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "originalObject": { "content": "To the SPASM!", "created_at": 1708153412, "id": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f", "kind": 1, "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", "sig": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290", "tags": [["license", "SPDX-License-Identifier: CC0-1.0"], ["spasm_version", "1.0.0"], ["spasm_action", "reply"], ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]] }, "protocol": { "extraSpasmFieldsVersion": "1.0.0", "hasExtraSpasmFields": true, "name": "nostr" }, "signatures": [{ "format": { "name": "nostr-sig" }, "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "type": "SiblingNostrSpasmSignedV2" }], "stats": [{ "action": "react", "contents": [{ "total": 11, "value": "upvote" }, { "total": 1, "value": "downvote" }, { "total": 2, "value": "bullish" }, { "total": 3, "value": "bearish" }, { "total": 6, "value": "important" }, { "total": 3, "value": "scam" }] }, { "action": "reply", "total": 3 }], "type": "SpasmEventEnvelopeWithTreeV2" };
exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = { "db": { "addedTimestamp": 1708148880076, "key": 401 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9" }, { "format": { "name": "ethereum-sig" }, "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "siblings": [{ "ids": [{ "format": { "name": "ethereum-sig" }, "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "protocol": { "name": "dmp", "version": "0.1.0" }, "signatures": [{ "format": { "name": "ethereum-sig" }, "pubkey": "0x49e8d02294e721ac47f6f4794625312b9005fd80", "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "signedString": "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}", "type": "SiblingDmpSignedV2" }], "type": "SpasmEventEnvelopeWithTreeV2" };
exports.validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren = {
    type: "SpasmEventEnvelopeWithTreeV2",
    ids: exports.validDmpEventSignedClosedConvertedToSpasmV2.ids,
    siblings: exports.validDmpEventSignedClosedConvertedToSpasmV2.siblings,
    children: [
        {
            ids: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2.ids,
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives
        },
        {
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives,
            ids: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2.ids
        }
    ]
};
exports.validPostWithDmpEventSignedClosed = {
    id: 1337,
    target: exports.validDmpEvent.target,
    action: exports.validDmpEvent.action,
    title: exports.validDmpEvent.title,
    text: exports.validDmpEvent.text,
    signer: exports.validDmpEventSignedClosed.signer,
    signed_message: JSON.stringify(exports.validDmpEvent),
    signature: exports.validDmpEventSignedClosed.signature,
    signed_time: exports.validDmpEvent.time,
    added_time: "2022-01-01T22:04:46.195Z",
    // category: "privacy",
    source: "degenrocket.space",
    tags: null,
    tickers: null,
    upvote: 8,
    downvote: 0,
    bullish: 5,
    bearish: 0,
    important: 6,
    scam: 0,
    comments_count: 3,
    latest_action_added_time: "2023-01-01T22:04:46.195Z",
    children: [
        exports.validPostWithNostrReplyToDmpEvent,
        exports.validSpasmWithDmpReplyToDmpEventV0
    ]
};
exports.validSpasmDmpEventSignedClosedV0 = exports.validPostWithDmpEventSignedClosed;
exports.validDmpEventConvertedToSpasmEventV2 = {
    type: "SpasmEventV2",
    action: "post",
    ids: [
        {
            value: "spasmid0103086d8c9881aa566b755d0b50fc0c80ab4362224860ee21859e658f64cca4c3",
            format: {
                name: "spasmid",
                version: "01"
            }
        }
    ],
    title: "genesis",
    content: "not your keys, not your words",
    timestamp: 1641074686178,
    license: "MIT",
    siblings: [
        {
            type: "SiblingDmpV2",
            protocol: {
                name: "dmp",
                version: "0.0.1"
            },
            signedString: JSON.stringify(exports.validDmpEvent),
        }
    ]
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            latestTimestamp: 1641077686178,
            latestDbTimestamp: 1644077686178,
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
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
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            latestTimestamp: 1641087686178,
            latestDbTimestamp: 1644087686178,
            total: 3
        }
    ],
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            latestTimestamp: 1642077686178,
            latestDbTimestamp: 1643077686178,
            contents: [
                {
                    value: "upvote",
                    total: 18
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 8
                },
                {
                    value: "bearish",
                    total: 7
                },
                {
                    value: "important",
                    total: 26
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        {
            action: "reply",
            latestTimestamp: 1642087686178,
            latestDbTimestamp: 1643087686178,
            total: 18081
        }
    ],
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
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
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ],
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1641074686195
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        table: "spasm_events",
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1642074686195
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2 = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    // categories: [
    //   {
    //     name: "privacy"
    //   }
    // ],
    db: {
        key: 1337,
        addedTimestamp: 1641074686195
    },
    source: {
        name: "degenrocket.space"
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
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
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ],
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        },
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                }
            ]
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        },
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        },
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
exports.validDmpEventSignedOpenedConvertedToSpasmV2 = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
};
exports.validDmpEventSignedClosedConvertedToSpasmV2DifferentSource = {
    ...exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2,
    source: {
        name: "differentsource.space"
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2 = {
    type: "SpasmEventEnvelopeV2",
    ids: exports.validDmpEventSignedClosedConvertedToSpasmV2.ids,
    siblings: exports.validDmpEventSignedClosedConvertedToSpasmV2.siblings,
    source: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.source,
    db: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.db,
    stats: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.stats
};
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent = {
    ...exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2,
    parent: {
        ids: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2.parent.ids,
        event: exports.validDmpEventSignedClosedConvertedToSpasmV2
    }
};
// Post with event is essentially SpasmEventV0
exports.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2 = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2;
exports.validNostrEvent = {
    id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    created_at: 1673347337,
    kind: 1,
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    tags: [
        [
            "e",
            "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206"
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
        ]
    ]
};
exports.validNostrSpasmEvent = {
    kind: 1,
    created_at: 1705462957,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "post"],
        ["spasm_title", "Nostr Spasm genesis"]
    ],
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
};
exports.validNostrEventSignedOpened = {
    id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    created_at: 1673347337,
    kind: 1,
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    tags: [
        [
            "e",
            "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206"
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
        ]
    ],
    sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
};
exports.validNostrSpasmEventSignedOpened = {
    kind: 1,
    created_at: 1705462957,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "post"],
        ["spasm_title", "Nostr Spasm genesis"]
    ],
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
    sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
};
exports.validNostrSpasmEventSignedOpenedWithInvalidSignature = {
    ...exports.validNostrSpasmEventSignedOpened,
    sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f2"
};
exports.validNostrSpasmEventSignedOpenedWithInvalidContent = {
    ...exports.validNostrSpasmEventSignedOpened,
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls!"
};
exports.validNostrSpasmEventSignedOpenedWithInvalidSigner = {
    ...exports.validNostrSpasmEventSignedOpened,
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f43"
};
exports.validPostWithNostrEventSignedOpened = {
    id: 6,
    target: "",
    action: "post",
    title: "",
    text: exports.validNostrEventSignedOpened.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrEventSignedOpened.pubkey),
    signed_message: JSON.stringify(exports.validNostrEventSignedOpened),
    signature: exports.validNostrEventSignedOpened.sig,
    signed_time: exports.validNostrEventSignedOpened.created_at,
    added_time: "2024-01-17T03:42:38.608Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 8,
    downvote: null,
    bullish: false,
    bearish: 5,
    important: 0,
    scam: 3,
    comments_count: null,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
exports.validSpasmNostrEventSignedOpenedV0 = exports.validPostWithNostrEventSignedOpened;
exports.validPostWithNostrSpasmEventSignedOpened = {
    id: 7,
    target: "",
    action: "post",
    title: exports.validNostrSpasmEventSignedOpened.tags[3][1],
    text: exports.validNostrSpasmEventSignedOpened.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrSpasmEventSignedOpened.pubkey),
    signed_message: JSON.stringify(exports.validNostrSpasmEventSignedOpened),
    signature: exports.validNostrSpasmEventSignedOpened.sig,
    signed_time: new Date(exports.validNostrSpasmEventSignedOpened.created_at).toISOString(),
    added_time: "2024-01-17T03:42:38.908Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 0,
    downvote: 3,
    bullish: 9,
    bearish: 0,
    important: 6,
    scam: 0,
    comments_count: 5,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
exports.validSpasmNostrSpasmEventSignedOpenedV0 = exports.validPostWithNostrSpasmEventSignedOpened;
exports.validNostrEventConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206",
                format: {
                    name: "nostr-hex"
                }
            }
        ]
    },
    action: "reply",
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    timestamp: 1673347337,
    authors: [
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrV2",
            originalObject: exports.validNostrEvent,
            protocol: {
                name: "nostr",
            },
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
exports.validNostrSpasmEventConvertedToSpasmV2 = {
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
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmV2",
            originalObject: exports.validNostrSpasmEvent,
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "1.0.0"
            },
            ids: [
                {
                    value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
exports.validNostrEventSignedOpenedConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206",
                format: {
                    name: "nostr-hex"
                }
            }
        ]
    },
    action: "reply",
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    timestamp: 1673347337,
    authors: [
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: {
                        name: "nostr-hex"
                    },
                    verified: true
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    signatures: [
        {
            value: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262",
            pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSignedV2",
            originalObject: exports.validNostrEventSignedOpened,
            protocol: {
                name: "nostr",
            },
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ],
            signatures: [
                {
                    value: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262",
                    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: { name: "nostr-sig" }
                }
            ]
        }
    ]
};
exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2 = {
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
                    format: { name: "nostr-hex" },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
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
            originalObject: exports.validNostrSpasmEventSignedOpened,
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
};
exports.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...exports.validNostrEventSignedOpenedConvertedToSpasmV2,
    db: {
        key: 6,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-01-17T03:42:38.608Z")
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                // downvote count is null
                // {
                //   value: "downvote",
                //   total: 0
                // },
                // bullish count is null
                // {
                //   value: "bullish",
                //   total: 0
                // },
                {
                    value: "bearish",
                    total: 5
                },
                {
                    value: "important",
                    total: 0
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        // comments_count is null
        // {
        //   action: "reply",
        //   total: 7
        // }
    ]
};
exports.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
    type: "SpasmEventV2",
    db: {
        key: 7,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-01-17T03:42:38.908Z")
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 0
                },
                {
                    value: "downvote",
                    total: 3
                },
                {
                    value: "bullish",
                    total: 9
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
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 5
        }
    ]
};
exports.validNostrSpasmEventV2SingleSignedOpened = {
    kind: 1,
    created_at: 1730416636,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "2.0.0"], // Do we need this?
        ["nostr_spasm_version", "2.0.0"],
        ["spasm_action", "reply"],
        ["spasm_category", "memes", "memecoins", "wojak"],
        ["spasm_category", "stonks"],
        ["title", "Nostr Spasm event V2 title"],
        ["t", "defi"],
        ["t", "degen"],
        ["t", "pepe"],
        ["r", "https://degenrocket.space"],
        ["r", "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop"],
        [
            "e",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "parent.ids", // key in target event
            "0", // parent index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts ("wss://relay1,wss://relay2,wss://relay3")
            "" // spasm_pubkey
        ],
        [
            "e",
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c", // tag value to map
            "se2", // target event type
            "parent.ids", // key in SpasmEvent
            "0", // parent index
            "1", // ids index
            "hex_to_spasmid01_1", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", ""
        ],
        [
            "e",
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779", // tag value to map
            "se2", // target event type
            "parent.ids", // key in target event
            "0", // parent index
            "2", // ids index
            "slice064", // method
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1", // original value
            "nostr-sig", // spasm_format_name
            "", "", "", ""
        ],
        [
            "e",
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "references.ids", // key in target event
            "0", // references index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "0", // references index
            "1", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "1", // references index
            "0", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", ""
        ],
        [
            "e",
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "1", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack", // original value
            "url", // format name
            "", "", "", ""
        ],
        [
            "e",
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "2", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?l=terraforming", // original
            "guid", // format name
            "", "", "", ""
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
            "" // relay
        ],
        [
            "p",
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"
        ],
        [
            "p",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "0", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "p",
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562",
            "", // relay
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562", // tag value to map
            // 657468657265756d2d707562 - 'ethereum-pub' in hex
            "se2", // target event type
            "mentions.addresses", // key in target event
            "1", // mentions index
            "0", // addresses index
            "hex_to_eth_pub_1", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
            "ethereum-pubkey", // format name
            "", "", ""
        ],
        [
            "O",
            "spasm_extra_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
            "spasm_eaadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_eaadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_extra_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "1", // addresses index
            "slice.19", // method
            "", // original
            "ethereum-pubkey", // format name
            "", // format version
            "", // hosts
            "", // extra signature
            "", // signed string
            "" // type?
        ],
    ],
    content: "Walled gardens became prisons, and NostrSpasmV2 is the third step towards tearing down the prison walls.",
    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
    id: "d33724f8aec2f71b830baac3c0a50c2bf13b5c86e3283f080a435a058808a5a2",
    sig: "68ece6436137b5d04fa4ffab7ed9ad1fc3b55ac788bfd38eb5256787463254b131c956f12d052b4ea4d55db56c95f4f0c4d0b7d6b22074072f7d73c562490d66"
};
// TODO this is how event should look like, but in reality
// Ethereum signer is removed after conversion. Need to check.
exports.validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "reply",
    title: "Nostr Spasm event V2 title",
    content: "Walled gardens became prisons, and NostrSpasmV2 is the third step towards tearing down the prison walls.",
    timestamp: 1730416636,
    license: "SPDX-License-Identifier: CC0-1.0",
    categories: [
        {
            name: "memes",
            sub: {
                name: "memecoins",
                sub: {
                    name: "wojak"
                }
            }
        },
        { name: "stonks" }
    ],
    keywords: ["defi", "degen", "pepe"],
    parent: {
        ids: [
            {
                value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                format: { name: "nostr-hex" }
            },
            {
                value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
                format: { name: "spasmid", version: "01" }
            },
            {
                value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
                format: { name: "nostr-sig" }
            }
        ]
    },
    authors: [
        {
            addresses: [
                {
                    value: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: { name: "nostr-hex" },
                    verified: true
                },
                {
                    value: "0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    references: [
        {
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: { name: "nostr-hex" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                },
                {
                    value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
                    format: { name: "spasmid", version: "01" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                }
            ]
        },
        {
            ids: [
                {
                    value: "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
                    format: { name: "spasmid", version: "01" }
                },
                {
                    value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
                    format: { name: "url" }
                },
                {
                    value: "https://forum.degenrocket.space/?l=terraforming",
                    format: { name: "guid" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://degenrocket.space",
                    format: { name: "url" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
                    format: { name: "url" }
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: { name: "nostr-hex" }
                }
            ]
        },
    ],
    ids: [
        {
            value: "spasmid017fd3f089dbb4a5a5cf6e4a9082d299d1c887ba42302133c5013364ed4f65db52",
            format: { name: "spasmid", version: "01" }
        },
        {
            value: "d33724f8aec2f71b830baac3c0a50c2bf13b5c86e3283f080a435a058808a5a2",
            format: { name: "nostr-hex" }
        }
    ],
    signatures: [
        {
            value: "68ece6436137b5d04fa4ffab7ed9ad1fc3b55ac788bfd38eb5256787463254b131c956f12d052b4ea4d55db56c95f4f0c4d0b7d6b22074072f7d73c562490d66",
            pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmSignedV2",
            originalObject: exports.validNostrSpasmEventV2SingleSignedOpened,
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "2.0.0"
            },
            ids: [
                {
                    value: "d33724f8aec2f71b830baac3c0a50c2bf13b5c86e3283f080a435a058808a5a2",
                    format: { name: "nostr-hex" }
                }
            ],
            signatures: [
                {
                    value: "68ece6436137b5d04fa4ffab7ed9ad1fc3b55ac788bfd38eb5256787463254b131c956f12d052b4ea4d55db56c95f4f0c4d0b7d6b22074072f7d73c562490d66",
                    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: { name: "nostr-sig" }
                }
            ],
        }
    ]
};
exports.validSpasmEventBodyV2WithOneNostrSigner = {
    type: "SpasmEventBodyV2",
    action: "post",
    content: "Single signed simple Nostr content 1",
    title: "Single signed simple Nostr title 1",
    timestamp: 1730666903773,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    authors: [
        {
            addresses: [
                {
                    value: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2 = {
    id: "",
    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
    kind: 1,
    content: "Single signed simple Nostr content 1",
    created_at: 1730666903,
    tags: [
        ["spasm_action", "post"],
        // ["spasm_timestamp","1730666903000"],
        ["spasm_timestamp", "1730666903773"],
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "2.0.0"],
        ["nostr_spasm_version", "2.0.0"],
        ["title", "Single signed simple Nostr title 1"],
        [
            "O",
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "0", // addresses index
            "slice.13", // method
            "", // original
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
    ]
};
exports.validSpasmEventBodyV2ReplyWithTwoSigners = {
    type: "SpasmEventBodyV2",
    action: "reply",
    content: "Single signed Nostr reply content",
    title: "Single signed Nostr reply title",
    timestamp: 1730666913773,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    categories: [
        {
            name: "memes",
            sub: {
                name: "memecoins",
                sub: {
                    name: "wojak"
                }
            }
        },
        { name: "stonks" }
    ],
    keywords: ["defi", "degen", "pepe"],
    authors: [
        {
            addresses: [
                {
                    value: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: {
                        name: "nostr-hex"
                    }
                },
                {
                    value: "0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    parent: {
        ids: [
            {
                value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                // TODO add format or not?
                // format: { name: "nostr-hex" }
            },
            {
                value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
                // format: { name: "spasmid", version: "01" }
            },
            {
                value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
                // format: { name: "nostr-sig" }
            }
        ]
    },
    references: [
        {
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: { name: "nostr-hex" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                },
                {
                    value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
                    format: { name: "spasmid", version: "01" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                }
            ]
        },
        {
            ids: [
                {
                    value: "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
                    format: { name: "spasmid", version: "01" }
                },
                {
                    value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
                    format: { name: "url" }
                },
                {
                    value: "https://forum.degenrocket.space/?l=terraforming",
                    format: { name: "guid" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://degenrocket.space",
                    format: { name: "url" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
                    format: { name: "url" }
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: { name: "nostr-hex" }
                }
            ]
        },
    ],
};
exports.validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2 = {
    id: "",
    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
    kind: 1,
    content: "Single signed Nostr reply content",
    created_at: 1730666913,
    tags: [
        ["spasm_action", "reply"],
        ["spasm_timestamp", "1730666913773"],
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "2.0.0"],
        ["nostr_spasm_version", "2.0.0"],
        ["spasm_category", "memes", "memecoins", "wojak"],
        ["spasm_category", "stonks"],
        ["t", "defi"],
        ["t", "degen"],
        ["t", "pepe"],
        ["title", "Single signed Nostr reply title"],
        // parent (target)
        [
            "e",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "parent.ids", // key in target event
            "0", // parent index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts ("wss://relay1,wss://relay2,wss://relay3")
            "", // spasm_pubkey_method
            "" // spasm_pubkey_original
        ],
        [
            "e",
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c", // tag value to map
            "se2", // target event type
            "parent.ids", // key in SpasmEvent
            "0", // parent index
            "1", // ids index
            "hex_to_spasmid01_1", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", "", ""
        ],
        [
            "e",
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779", // tag value to map
            "se2", // target event type
            "parent.ids", // key in target event
            "0", // parent index
            "2", // ids index
            "slice064", // method
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1", // original value
            "nostr-sig", // spasm_format_name
            "", "", "", "", ""
        ],
        // references
        [
            "e",
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "references.ids", // key in target event
            "0", // references index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "0", // references index
            "1", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "1", // references index
            "0", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", "", ""
        ],
        [
            "e",
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "1", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack", // original value
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "2", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?l=terraforming", // original
            "guid", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "8e6be79e0f901aac1e18618163fc4e9e307ff2865b93a9fd50c97de5deeeee5d",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "8e6be79e0f901aac1e18618163fc4e9e307ff2865b93a9fd50c97de5deeeee5d", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "2", // reference index
            "0", // ids index
            "sha256", // method
            "https://degenrocket.space", // original
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "b0a9d1ad5f352dc2771e930a1f34efc20c8d53f6203c01be8dc999132b5efcae",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "b0a9d1ad5f352dc2771e930a1f34efc20c8d53f6203c01be8dc999132b5efcae", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "3", // reference index
            "0", // ids index
            "sha256", // method
            "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", // original
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "p",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            ""
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "0", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "p",
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562",
            "", // relay
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562", // tag value to map
            // 657468657265756d2d707562 - 'ethereum-pub' in hex
            "se2", // target event type
            "mentions.addresses", // key in target event
            "1", // mentions index
            "0", // addresses index
            "hex_to_eth_pub_1", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
            "ethereum-pubkey", // format name
            "", "", ""
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
            "" // relay
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "2", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "p",
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            ""
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "3", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "O",
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "0", // addresses index
            "slice.13", // method
            "", // original
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
        [
            "O",
            "spasm_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "1", // addresses index
            "slice.13", // method
            "", // original
            "ethereum-pubkey", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
    ]
};
exports.validPostWithRssItem = {
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
};
exports.validPostWithRssItemReverseTags = {
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
    tags: ["forest", "dark"],
    upvote: 3,
    downvote: null,
    bullish: 2,
    bearish: 0,
    important: 6,
    scam: 1,
    comments_count: 0,
    latest_action_added_time: null
};
exports.validSpasmEventRssItemV0 = exports.validPostWithRssItem;
exports.validSpasmEventRssItemV0ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    ids: [
        {
            value: "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
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
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
    authors: [
        {
            usernames: [{ value: "stablepony" }]
        }
    ],
    categories: [{ name: "defi" }],
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
    keywords: ["dark", "forest", "cookies"],
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
                // {
                //   value: "downvote",
                //   total: 0
                // },
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
};
exports.validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2 = {
    ...exports.validSpasmEventRssItemV0ConvertedToSpasmV2,
    keywords: ["forest", "dark", "cookies"]
};
exports.validSpasmEventV2WithTwoParentUrlIds = {
    "type": "SpasmEventV2",
    "parent": {
        "ids": [
            {
                "value": "spasmid01fb7dd2d6c12af436069bcf6addeecb7da78a97136c5b492c67c22d8df3c3fcfc",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            },
            {
                "value": "https://reason.com/?p=8317331",
                "format": {
                    "name": "url"
                }
            },
            {
                "value": "https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/",
                "format": {
                    "name": "url"
                }
            },
        ]
    },
    "action": "reply",
    "content": "wen?",
    "timestamp": 1740089703936,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x153cd0873c96a4a164d723bafb6ffde81d6011b8",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "categories": [
        {
            "name": "politics"
        }
    ],
    "signatures": [
        {
            "value": "0x063540a7408bd6af4245a94f397c7313c811f95694a0777cc756c0a32605a1b1590712dad195c6209d65bd6e3de69d3d135bfa9bc1d175c6e6316ef410a4d24c1c",
            "pubkey": "0x153cd0873c96a4a164d723bafb6ffde81d6011b8",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid014aaafc4a35cac58b87850b4a8489d23db29e5ee34439ceb2ee1ae4155048e223",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ],
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"wen?\",\"parent\":{\"ids\":[{\"value\":\"spasmid01fb7dd2d6c12af436069bcf6addeecb7da78a97136c5b492c67c22d8df3c3fcfc\"},{\"value\":\"https://reason.com/2025/02/18/supersonic-commercial-air-travel-is-on-its-way/\"},{\"value\":\"https://reason.com/?p=8317331\"}]},\"categories\":[{\"name\":\"politics\"}],\"timestamp\":1740089703936,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x153cd0873c96a4a164d723bafb6ffde81d6011b8\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x063540a7408bd6af4245a94f397c7313c811f95694a0777cc756c0a32605a1b1590712dad195c6209d65bd6e3de69d3d135bfa9bc1d175c6e6316ef410a4d24c1c",
                    "pubkey": "0x153cd0873c96a4a164d723bafb6ffde81d6011b8",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
};
exports.SpasmEventV2ToTestSpasmid01 = {
    type: "SpasmEventV2",
    root: {
        depth: 3,
        marker: "root-marker1",
        ids: [
            { value: "root-idz" },
            { value: "root-id3" },
            { value: "root-id3a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "post",
            title: "root-event-title",
            content: "root-event-text"
        }
    },
    parent: {
        depth: 1,
        marker: "parent-marker1",
        ids: [
            { value: "parent-idx" },
            { value: "parent-id1" },
            { value: "parent-id1a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "reply",
            title: "parent-event-title",
            content: "parent-event-text"
        }
    },
    ids: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            format: { name: "url" },
            hosts: [
                {
                    value: "ids-host-1",
                    marker: "ids-host-marker-1"
                },
                {
                    value: "ids-host-1a",
                    marker: "ids-host-marker-1a"
                }
            ]
        },
        {
            value: "spasmid01abc",
            format: { name: "spasmid" },
            hosts: [{ value: "ids-host-1" }]
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            format: { name: "guid" }
        },
    ],
    db: {
        key: 20240430,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
        updatedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
        table: "spasm_events"
    },
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
    title: "Test title",
    action: "reply",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    authors: [
        // Author 2
        {
            addresses: [
                {
                    format: { name: "ethereum-pubkey" },
                    verified: true,
                    value: "address3a",
                }
            ]
        },
        // Author 1
        {
            addresses: [
                {
                    verified: false,
                    value: "address1b",
                    format: { name: "ethereum-pubkey" }
                },
                {
                    value: "address1a",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ],
            usernames: [
                {
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b",
                    value: "username1b",
                },
                {
                    owner: "owner1a",
                    value: "username1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                }
            ],
            marker: "author1-marker"
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        }
    ],
    categories: [
        { name: 0 },
        { name: 1 },
        { name: "category-1", sub: { name: "sub1" } }
    ],
    tips: [
        {
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            address: "tips-address-88",
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        },
        {
            address: "tips-address-84",
            currency: { name: "Monero", ticker: "XMR" },
            text: "tips-text-84",
            network: { name: "mainnet", id: "1" },
            expiration: { timestamp: 1641074686178 }
        },
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            search: "?i=url1",
            marker: "hosts-marker-url1",
            origin: "https://forum.degenrocket.space",
            pathname: "/",
            protocol: "https",
            host: "forum.degenrocket.space",
            originalProtocolKey: "url"
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=guid1",
            originalProtocolKey: "guid"
        }
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=url1",
            originalProtocolKey: "url"
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=guid1",
            originalProtocolKey: "guid"
        }
    ],
    keywords: ["keyword2", "keyword3", "keyword1"],
    tags: [
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag1-0", "tag1-1"]
    ],
    medias: [
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid5" },
                { value: "mediaid4" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 1
        {
            ids: [
                { value: "mediaid3" },
                { value: "mediaid1" }
            ]
        },
        // media 3
        {
            hashes: [
                { value: "hash4" },
                { value: "hash3" }
            ],
            links: [
                { value: "link4" },
                { value: "link2" }
            ]
        },
    ],
    references: [
        // reference 2
        {
            ids: [
                { value: "ref-id4" },
                { value: "ref-id2" }
            ],
            marker: "ref-marker2"
        },
        // reference 1
        {
            ids: [
                { value: "ref-id3" },
                { value: "ref-id1" }
            ],
            marker: "ref-marker1"
        },
    ],
    mentions: [
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        }
    ],
    proofs: [
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        },
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link2", marker: "proof-marker1" },
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    // TODO add complex logic for sorting 'extra'.
    // - if a key is an array, sort it 
    //   - if an element inside the array is an array, sort it
    // - if a key is an object, go inside to check for arrays
    extra: {
        string: "hello",
        object: { value: "123" },
        number: 1,
        null: null,
        array: [1, 2, 3],
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmpow01",
            nonce: "hello",
            difficulty: 1,
            words: ["degen", "rebel"]
        },
        {
            marker: "spasmid02",
            nonce: 20240430,
            difficulty: 5,
            words: ["one", "two", "three", "four", "five"],
        },
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            words: ["one", "two", "three", "four"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
        {
            marker: "spasmid01",
            nonce: 8,
            difficulty: 2,
            words: ["one", "two"],
        }
    ],
    source: {
        name: "degenrocket.space",
        uiUrl: "https://degenrocket.space/news/",
        apiUrl: "https://degenrocket.space/api/",
        query: "posts?webType=web3&category=any&platform=false&source=false&activity=all&keyword=false&ticker=false&limitWeb2=0&limitWeb3=50",
        showSource: true
    },
    siblings: [
        {
            type: "SiblingWeb2V2",
            protocol: { name: "web2" },
            originalObject: {
                type: "SpasmEventBodyV2"
            },
            ids: [
                {
                    value: "https://forum.degenrocket.space/?i=url1",
                    format: { name: "url" },
                    hosts: [
                        {
                            value: "ids-host-1",
                            marker: "ids-host-marker-1"
                        },
                        {
                            value: "ids-host-1a",
                            marker: "ids-host-marker-1a"
                        }
                    ]
                },
                {
                    value: "spasmid01abc",
                    format: { name: "spasmid" },
                    hosts: [{ value: "ids-host-1" }]
                },
                {
                    value: "https://forum.degenrocket.space/?i=guid1",
                    format: { name: "guid" }
                }
            ],
        }
    ],
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 3
                }
            ]
        },
        {
            action: "reply",
            total: 0
        }
    ],
    sharedBy: {
        ids: [
            {
                value: "sharedBy-ids-1"
            },
            {
                value: "sharedBy-ids-2"
            }
        ]
    }
};
exports.SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys = {
    type: "SpasmEventV2",
    root: {
        depth: 5, // changed
        marker: "root-marker1",
        ids: [
            { value: "root-id3" },
            { value: "root-idz" },
            { value: "root-id3a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "post",
            title: "root-event-title-new", // changed
            content: "root-event-text-new" // changed
        }
    },
    parent: {
        depth: 4, // changed
        marker: "parent-marker1",
        ids: [
            { value: "parent-id1" },
            { value: "parent-idx" },
            { value: "parent-id1a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "edit", // changed
            title: "parent-event-title-new", // changed
            content: "parent-event-text-new" // changed
        }
    },
    ids: [
        {
            value: "https://forum.degenrocket.space/?i=url1-new", // changed
            format: { name: "nostr-hex" }, // changed
            hosts: [
                {
                    value: "ids-host-1-new", // changed
                    marker: "ids-host-marker-1-new" // changed
                },
                {
                    value: "ids-host-1a-new", // changed
                    marker: "ids-host-marker-1a-new" // changed
                }
            ]
        },
        {
            value: "spasmid01abc-new", // changed
            format: { name: "ethereum-sig" }, // changed
            hosts: [{ value: "ids-host-1-new" }] // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1-new", // changed
            format: { name: "spasmid" } // changed
        }
    ],
    db: {
        key: 20240431, // changed
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.241Z"), // changed
        updatedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.241Z"), // changed
        table: "spasm_events-new" // changed
    },
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
    title: "Test title",
    action: "reply",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    authors: [
        // Author 2
        {
            addresses: [
                {
                    format: { name: "ethereum-pubkey" },
                    verified: false, // changed
                    value: "address3a",
                }
            ]
        },
        // Author 1
        {
            addresses: [
                {
                    verified: true, // changed
                    value: "address1b",
                    format: { name: "ethereum-pubkey" }
                },
                {
                    value: "address1a",
                    verified: false, // changed
                    format: { name: "ethereum-pubkey" }
                }
            ],
            usernames: [
                {
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b",
                    value: "username1b",
                },
                {
                    owner: "owner1a",
                    value: "username1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                }
            ],
            marker: "author1-marker"
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        }
    ],
    categories: [
        { name: 5 }, // changed
        { name: 6 }, // changed
        { name: "category-3", sub: { name: "sub4" } } // changed
    ],
    // TODO should tips be included in spasmid?
    // e.g., user might want to update tips on his posts, so
    // then tips should NOT be included.
    // However, what if a malicious actor gets access to user's
    // private key and updates all posts with his tips addresses?
    tips: [
        {
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            address: "tips-address-88",
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        },
        {
            address: "tips-address-84",
            currency: { name: "Monero", ticker: "XMR" },
            text: "tips-text-84",
            network: { name: "mainnet", id: "1" },
            expiration: { timestamp: 1641074686178 }
        },
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            search: "?i=url1-new", // changed
            marker: "hosts-marker-url1",
            origin: "https://forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            protocol: "https-new", // changed
            host: "forum.degenrocket.space-new", // changed
            originalProtocolKey: "url-new" // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=guid1-new", // changed
            originalProtocolKey: "guid-new" // changed
        }
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=url1-new", // changed
            originalProtocolKey: "url-new" // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=guid1-new", // changed
            originalProtocolKey: "guid-new" // changed
        }
    ],
    keywords: ["keyword2", "keyword3", "keyword1"],
    tags: [
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag1-0", "tag1-1"]
    ],
    medias: [
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid5" },
                { value: "mediaid4" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 1
        {
            ids: [
                { value: "mediaid3" },
                { value: "mediaid1" }
            ]
        },
        // media 3
        {
            hashes: [
                { value: "hash4" },
                { value: "hash3" }
            ],
            links: [
                { value: "link4" },
                { value: "link2" }
            ]
        },
    ],
    references: [
        // reference 2
        {
            ids: [
                { value: "ref-id4" },
                { value: "ref-id2" }
            ],
            marker: "ref-marker2"
        },
        // reference 1
        {
            ids: [
                { value: "ref-id3" },
                { value: "ref-id1" }
            ],
            marker: "ref-marker1"
        },
    ],
    mentions: [
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        }
    ],
    proofs: [
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        },
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link2", marker: "proof-marker1" },
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    // TODO add complex logic for sorting 'extra'.
    // - if a key value is an array, sort it 
    //   - if an element inside the array is an array, sort it
    // - if a key value is an object, go inside to check for arrays
    extra: {
        string: "hello",
        object: { value: "123" },
        number: 1,
        null: null,
        array: [1, 2, 3],
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmpow01",
            nonce: "hello",
            difficulty: 1,
            words: ["degen", "rebel"]
        },
        {
            marker: "spasmid02",
            nonce: 20240430,
            difficulty: 5,
            words: ["one", "two", "three", "four", "five"],
        },
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            words: ["one", "two", "three", "four"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
        {
            marker: "spasmid01",
            nonce: 8,
            difficulty: 2,
            words: ["one", "two"],
        }
    ],
    source: {
        name: "degenrocket.space-new", // changed
        uiUrl: "https://degenrocket.space/news/-new", // changed
        apiUrl: "https://degenrocket.space/api/-new", // changed
        query: "posts?webType=web3&category=any&platform=false&source=false&activity=all&keyword=false&ticker=false&limitWeb2=0&limitWeb3=50-new", // changed
        showSource: false // changed
    },
    siblings: [
        {
            type: "SiblingWeb2V2",
            protocol: { name: "web2" },
            originalObject: {
                type: "SpasmEventBodyV2"
            },
            ids: [
                {
                    value: "https://forum.degenrocket.space/?i=url1-new", // changed
                    format: { name: "nostr-hex" }, // changed
                    hosts: [
                        {
                            value: "ids-host-1-new", // changed
                            marker: "ids-host-marker-1-new" // changed
                        },
                        {
                            value: "ids-host-1a-new", // changed
                            marker: "ids-host-marker-1a-new" // changed
                        }
                    ]
                },
                {
                    value: "spasmid01abc-new", // changed
                    format: { name: "ethereum-sig" }, // changed
                    hosts: [{ value: "ids-host-1-new" }] // changed
                },
                {
                    value: "https://forum.degenrocket.space/?i=guid1-new", // changed
                    format: { name: "spasmid" } // changed
                }
            ]
        }
    ],
    stats: [
        {
            action: "edit", // changed
            contents: [
                {
                    value: "important", // changed
                    total: 5 // changed
                }
            ]
        },
        {
            action: "moderate", // changed
            total: 9 // changed
        }
    ],
    sharedBy: {
        ids: [
            {
                value: "sharedBy-ids-1-new" // changed
            },
            {
                value: "sharedBy-ids-2-new" // changed
            }
        ]
    }
};
exports.SpasmEventV2ConvertedToSpasmid01 = {
    parent: {
        ids: [
            { value: "parent-id1" },
            { value: "parent-id1a" },
            { value: "parent-idx" }
        ],
        marker: "parent-marker1",
    },
    action: "reply",
    title: "Test title",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
    authors: [
        // Author 1
        {
            addresses: [
                {
                    value: "address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "username1a",
                    owner: "owner1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                },
                {
                    value: "username1b",
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b"
                },
            ],
            marker: "author1-marker"
        },
        // Author 2
        {
            addresses: [
                {
                    value: "address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        },
    ],
    tips: [
        {
            address: "tips-address-84",
            text: "tips-text-84",
            expiration: { timestamp: 1641074686178 },
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "mainnet", id: "1" }
        },
        {
            address: "tips-address-88",
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        }
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
        },
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "hosts-marker-url1",
        },
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
        },
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
        },
    ],
    keywords: ["keyword1", "keyword2", "keyword3"],
    tags: [
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag1-0", "tag1-1"],
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
    ],
    medias: [
        // media 1
        {
            ids: [
                { value: "mediaid1" },
                { value: "mediaid3" }
            ]
        },
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid4" },
                { value: "mediaid5" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 3
        {
            links: [
                { value: "link2" },
                { value: "link4" }
            ],
            hashes: [
                { value: "hash3" },
                { value: "hash4" }
            ],
        },
    ],
    references: [
        // reference 1
        {
            ids: [
                { value: "ref-id1" },
                { value: "ref-id3" }
            ],
            marker: "ref-marker1"
        },
        // reference 2
        {
            ids: [
                { value: "ref-id2" },
                { value: "ref-id4" }
            ],
            marker: "ref-marker2"
        },
    ],
    mentions: [
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        },
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
    ],
    proofs: [
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
                { value: "proof-value1-link2", marker: "proof-marker1" }
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    extra: {
        number: 1,
        string: "hello",
        array: [1, 2, 3],
        object: { value: "123" },
        null: null,
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            // Sorted alphabetically
            words: ["four", "one", "three", "two"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
    ]
};
exports.validPostWithRssItemSpecialChars = {
    "id": 7830,
    "guid": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/",
    "source": "moneroobserver-feed",
    "category": "privacy",
    "tickers": "XMR",
    "tags": null,
    "title": "hinto-janai releases Gupax v1.3.3",
    "url": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/",
    "description": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...",
    "pubdate": "2023-11-26T23:00:00.000Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
exports.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2 = { "action": "post", "categories": [{ "name": "privacy" }], "content": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "db": { "key": 7830 }, "ids": [{ "format": { "name": "spasmid", "version": "01" },
            // "value": "spasmid01caafe2d603fe08302bd8abf5ce499d5c0adcae24790f1cf9c73e8b7012e6781c"
            "value": "spasmid012231bee2002f36b0fe99f10aa0f9bbd62b4c6240779e7a77457a5cc37498ce92"
        }, { "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "keywords": ["XMR"], "links": [{ "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "url", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "guid", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "siblings": [{ "ids": [{ "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "originalObject": { "bearish": null, "bullish": null, "category": "privacy", "comments_count": null, "description": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "downvote": null, "guid": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/", "id": 7830, "important": null, "latest_action_added_time": null, "pubdate": "2023-11-26T23:00:00.000Z", "scam": null, "source": "moneroobserver-feed", "tags": null, "tickers": "XMR", "title": "hinto-janai releases Gupax v1.3.3", "upvote": null, "url": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, "protocol": { "name": "web2" }, "type": "SiblingWeb2V2" }], "source": { "name": "moneroobserver-feed" }, "timestamp": 1701039600000, "title": "hinto-janai releases Gupax v1.3.3", "type": "SpasmEventV2" };
exports.validPostWithRssItemTitleHasSpecialChars = {
    "id": 4934,
    "guid": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
    "source": "thedefiant.io",
    "category": "defi",
    "tickers": "",
    "tags": null,
    "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?",
    "url": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
    "description": "What's after PEPE?...",
    "pubdate": "2023-04-24T09:41:16.000Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
exports.validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2 = { "type": "SpasmEventV2", "action": "post", "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "timestamp": 1682329276000, "content": "What's after PEPE?...", "ids": [{ "value": "spasmid014bf6e5c3dfb0c48cd4b808b3f1879275fb3a91cac9f500f35252ac1dbc3b66b5", "format": { "name": "spasmid", "version": "01" } }, { "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "links": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.io", "host": "thedefiant.io", "pathname": "/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "originalProtocolKey": "url" }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "host": "thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "pathname": "/", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "originalObject": { "id": 4934, "guid": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "source": "thedefiant.io", "category": "defi", "tickers": "", "tags": null, "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "url": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "description": "What's after PEPE?...", "pubdate": "2023-04-24T09:41:16.000Z", "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 4934 }, "source": { "name": "thedefiant.io" }, "categories": [{ "name": "defi" }] };
exports.validNostrSpasmEventSpasmV0WithInvalidHtmlTags = {
    "id": 3803,
    "target": "021d3791000e3f66699c8e3e3f8b46331a2b2acea0c19224d05160203d3142f5f7f0197a350f328ae34f590dcfcfef961e78a9158719c2bb0c27b56b61ef9a00",
    "action": "reply",
    "category": null,
    "title": "",
    "text": "<img src=\"x\"> test ",
    "signer": "npub1xypux8nyuhaxhx0a9qugpz72ey6wacmsyma5uluauwm2aurn0hcq68gnae",
    "signed_message": "{\"kind\":1,\"created_at\":1714510408,\"tags\":[[\"license\",\"SPDX-License-Identifier: CC0-1.0\"],[\"spasm_version\",\"1.0.0\"],[\"spasm_action\",\"reply\"],[\"spasm_target\",\"021d3791000e3f66699c8e3e3f8b46331a2b2acea0c19224d05160203d3142f5f7f0197a350f328ae34f590dcfcfef961e78a9158719c2bb0c27b56b61ef9a00\"]],\"content\":\"<img src=\"x\"> test \",\"pubkey\":\"3103c31e64e5fa6b99fd2838808bcac934eee37026fb4e7f9de3b6aef0737df0\",\"id\":\"e18dc3d5b73b89d4b1e269e7a525e780934cffbf94a4e4512b26dc97ffbec874\",\"sig\":\"b9e9cc534046f548ce94d664f906366f00ec90674a26678e1752bf1f89029e84c2b58a75d249688b7d3af45bffcf66f0ee67454b64f0db7a70e51476c93a3a13\"}",
    "signature": "b9e9cc534046f548ce94d664f906366f00ec90674a26678e1752bf1f89029e84c2b58a75d249688b7d3af45bffcf66f0ee67454b64f0db7a70e51476c93a3a13",
    "signed_time": "2024-04-30T20:53:28.000Z",
    "added_time": "2024-04-30T20:53:39.734Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": 1,
    "latest_action_added_time": "2024-04-30T20:57:10.296Z"
};
exports.validRssItemWithEmoji = {
    "id": 936756,
    "guid": "https://medium.com/p/5b93a387639c",
    "source": "osmosis-medium",
    "category": "defi",
    "tickers": "OSMO",
    "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi",
    "url": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c",
    "description": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...",
    "pubdate": "2024-05-13T14:11:34.000Z",
    "tags": null,
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
exports.validRssItemWithEmojiConvertedToSpasmEvent2 = { "type": "SpasmEventV2", "action": "post", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "timestamp": 1715609494000, "content": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "keywords": ["OSMO"], "ids": [{
            // "value":"spasmid01da7c2f4ece8599315be56b8a7cdb870187dba0ec5c024af947e59cc631262076",
            "value": "spasmid01fc9080487349b7fc6d298d7df02e29d7d39617dd38913dfda515556eee3e156c",
            "format": { "name": "spasmid", "version": "01" }
        }, { "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "links": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "originalProtocolKey": "url" }, { "value": "https://medium.com/p/5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/p/5b93a387639c", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "originalObject": { "id": 936756, "guid": "https://medium.com/p/5b93a387639c", "source": "osmosis-medium", "category": "defi", "tickers": "OSMO", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "url": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "description": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "pubdate": "2024-05-13T14:11:34.000Z", "tags": null, "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 936756 }, "source": { "name": "osmosis-medium" }, "categories": [{ "name": "defi" }] };
// Testing event tree (relatives)
// validSpasmEventV2TreeDepth0_Post1
// validSpasmEventV2TreeDepth1_Post1React1
// validSpasmEventV2TreeDepth1_Post1Reply1
// validSpasmEventV2TreeDepth1_Post1Reply2
// validSpasmEventV2TreeDepth2_Post1Reply1Reply1
// validSpasmEventV2TreeDepth2_Post1Reply2React1
// validSpasmEventV2TreeDepth2_Post1Reply2Reply1
// validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1
// validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1
// validSpasmEventV2TreeDepth0_Post1
exports.validSpasmEventV2TreeDepth0_Post1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"post\",\"content\":\"validSpasmEventV2TreeDepth0_Post1\",\"title\":\"Depth0_Post1 title\",\"timestamp\":1739126601242,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0xd4739c15de36243645841d99137f7a625a2aa6a0557ba0c5b5d6c9ffb45aaf3865dc8db92706ec7d942231b211b08402be603748240af082860df872830a15981c",
                    "pubkey": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "action": "post",
    "title": "Depth0_Post1 title",
    "content": "validSpasmEventV2TreeDepth0_Post1",
    "timestamp": 1739126601242,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0xd4739c15de36243645841d99137f7a625a2aa6a0557ba0c5b5d6c9ffb45aaf3865dc8db92706ec7d942231b211b08402be603748240af082860df872830a15981c",
            "pubkey": "0x91def065c0476500751f459ed84e8932bf88a8bf",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth1_Post1React1
exports.validSpasmEventV2TreeDepth1_Post1React1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"react\",\"content\":\"upvote\",\"parent\":{\"ids\":[{\"value\":\"spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739126741045,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0xa145a31fde5a73a3259764da166da5af03b1e43d\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0xc44bd98cd4e8f95adfc0d3ab068e1c3880969086281df083f2d573d5a31910ff21b567426aaec3447bf94e0fc25f182d8086b0973de5eef8fe8823af4eede9231b",
                    "pubkey": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "react",
    "content": "upvote",
    "timestamp": 1739126741045,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0xc44bd98cd4e8f95adfc0d3ab068e1c3880969086281df083f2d573d5a31910ff21b567426aaec3447bf94e0fc25f182d8086b0973de5eef8fe8823af4eede9231b",
            "pubkey": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid015d5feb857692488dd1e55e9f50315af81af2ba2ecc9267907a0e4d2b5ed74790",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth1_Post1Reply1
exports.validSpasmEventV2TreeDepth1_Post1Reply1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth1_Post1Reply1\",\"parent\":{\"ids\":[{\"value\":\"spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739126881083,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0xa145a31fde5a73a3259764da166da5af03b1e43d\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x6632713506f965ea9d1a9ae961c35c164ceefb79d74036da603b6e3f281d83b615e0c740ee0e7ac1940a311cc214ffb78411a443872b4daf8015ee341f6d50af1b",
                    "pubkey": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth1_Post1Reply1",
    "timestamp": 1739126881083,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x6632713506f965ea9d1a9ae961c35c164ceefb79d74036da603b6e3f281d83b615e0c740ee0e7ac1940a311cc214ffb78411a443872b4daf8015ee341f6d50af1b",
            "pubkey": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid011ef9f8a77b030ba0217aeb60e43b06332a4ffcb95772d50dd3771f57d08923fa",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth1_Post1Reply2
exports.validSpasmEventV2TreeDepth1_Post1Reply2 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth1_Post1Reply2\",\"parent\":{\"ids\":[{\"value\":\"spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739126964427,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x779d750879ffe8e1694edbe64336a9cbb8795d30\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x3e084d5823000d26e13ea029652be13ea7d5c6ffa49ef26a163102d99a8d4d420c10bf5913d852d69422d13237f722d44e5e7f1132eac73598777a2091b78cc11b",
                    "pubkey": "0x779d750879ffe8e1694edbe64336a9cbb8795d30",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid0141f35fbfc8391a8f560e99ff6f7b728f670c2216fd15c581bdd0dda84fcd0b7f",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth1_Post1Reply2",
    "timestamp": 1739126964427,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x779d750879ffe8e1694edbe64336a9cbb8795d30",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x3e084d5823000d26e13ea029652be13ea7d5c6ffa49ef26a163102d99a8d4d420c10bf5913d852d69422d13237f722d44e5e7f1132eac73598777a2091b78cc11b",
            "pubkey": "0x779d750879ffe8e1694edbe64336a9cbb8795d30",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid01a80271c545afc3fe2426cc5de39d35ec832f925f08ee5fa6c479273cf939580d",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth2_Post1Reply1Reply1
exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth2_Post1Reply1Reply1\",\"parent\":{\"ids\":[{\"value\":\"spasmid011ef9f8a77b030ba0217aeb60e43b06332a4ffcb95772d50dd3771f57d08923fa\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0xa145a31fde5a73a3259764da166da5af03b1e43d\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739127035261,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x92d31890d8326f9d43790a051c2217a5b579f805\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x0b21b67a51d3bba3323a1cc58ce19d5d3b77363a250b5ee77ba54d63c262fa950586e4a7f8efdc4ca4caf10f019f6fa6240c04433115c61635fcbe6f9688ebf91c",
                    "pubkey": "0x92d31890d8326f9d43790a051c2217a5b579f805",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid011ef9f8a77b030ba0217aeb60e43b06332a4ffcb95772d50dd3771f57d08923fa",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth2_Post1Reply1Reply1",
    "timestamp": 1739127035261,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x92d31890d8326f9d43790a051c2217a5b579f805",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x0b21b67a51d3bba3323a1cc58ce19d5d3b77363a250b5ee77ba54d63c262fa950586e4a7f8efdc4ca4caf10f019f6fa6240c04433115c61635fcbe6f9688ebf91c",
            "pubkey": "0x92d31890d8326f9d43790a051c2217a5b579f805",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid012f36f4703baf70ebb856f762dafac239159e2a7c68ef63ca926354ca8b55a024",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth2_Post1Reply2React1
exports.validSpasmEventV2TreeDepth2_Post1Reply2React1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"react\",\"content\":\"downvote\",\"parent\":{\"ids\":[{\"value\":\"spasmid01a80271c545afc3fe2426cc5de39d35ec832f925f08ee5fa6c479273cf939580d\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x779d750879ffe8e1694edbe64336a9cbb8795d30\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739138296751,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x220fa46c79c181f63a6d6fd4acfaf14b29002ac8\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x257d38f625843e11b6597d3713b03ccea72da5841fff3d334d6b8ff78ca2608a5029547d5ba1d45f26daced4b8b52ca3dd8e7c9f67905b86a3486e26239eade91c",
                    "pubkey": "0x220fa46c79c181f63a6d6fd4acfaf14b29002ac8",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid01a80271c545afc3fe2426cc5de39d35ec832f925f08ee5fa6c479273cf939580d",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "react",
    "content": "downvote",
    "timestamp": 1739138296751,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x220fa46c79c181f63a6d6fd4acfaf14b29002ac8",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x779d750879ffe8e1694edbe64336a9cbb8795d30",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x257d38f625843e11b6597d3713b03ccea72da5841fff3d334d6b8ff78ca2608a5029547d5ba1d45f26daced4b8b52ca3dd8e7c9f67905b86a3486e26239eade91c",
            "pubkey": "0x220fa46c79c181f63a6d6fd4acfaf14b29002ac8",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid014e800c0a192d4158c2a18d1f3c9ac876d9aa6803092688068f3250cb872dd5ff",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth2_Post1Reply2Reply1
exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth2_Post1Reply2Reply1\",\"parent\":{\"ids\":[{\"value\":\"spasmid01a80271c545afc3fe2426cc5de39d35ec832f925f08ee5fa6c479273cf939580d\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x779d750879ffe8e1694edbe64336a9cbb8795d30\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739138387982,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x2f411d4b20e160b1e62ca2cd427b56a2ea1e8ddf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x8ebf97ae17493eaa7b5d7bd5c95e7c4d8080527653f76e0117118b464c1897602902354acf1e12d58c31a5060ac6266176bbbb97d8b5366b6fb1cbeee28d5f801c",
                    "pubkey": "0x2f411d4b20e160b1e62ca2cd427b56a2ea1e8ddf",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid01a80271c545afc3fe2426cc5de39d35ec832f925f08ee5fa6c479273cf939580d",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth2_Post1Reply2Reply1",
    "timestamp": 1739138387982,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x2f411d4b20e160b1e62ca2cd427b56a2ea1e8ddf",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x779d750879ffe8e1694edbe64336a9cbb8795d30",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x8ebf97ae17493eaa7b5d7bd5c95e7c4d8080527653f76e0117118b464c1897602902354acf1e12d58c31a5060ac6266176bbbb97d8b5366b6fb1cbeee28d5f801c",
            "pubkey": "0x2f411d4b20e160b1e62ca2cd427b56a2ea1e8ddf",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid0115f5c9d46a451129dacb31bbee917e9ab41f4f8021dd5c0fff899a20e67436bd",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1
exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1\",\"parent\":{\"ids\":[{\"value\":\"spasmid012f36f4703baf70ebb856f762dafac239159e2a7c68ef63ca926354ca8b55a024\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0x92d31890d8326f9d43790a051c2217a5b579f805\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0xa145a31fde5a73a3259764da166da5af03b1e43d\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739138464237,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x1bdbdc29b86c5cfd5ab4689329537db6088eb880\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x663b1e807f76eac5e74438d698289ab11d99874dbec92b5e3042b397e6a61770620d75f648bc421414b766516c4e7657add08d0f8e08a298484b3c94395d64cd1c",
                    "pubkey": "0x1bdbdc29b86c5cfd5ab4689329537db6088eb880",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid012f36f4703baf70ebb856f762dafac239159e2a7c68ef63ca926354ca8b55a024",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1",
    "timestamp": 1739138464237,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x1bdbdc29b86c5cfd5ab4689329537db6088eb880",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0x92d31890d8326f9d43790a051c2217a5b579f805",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x663b1e807f76eac5e74438d698289ab11d99874dbec92b5e3042b397e6a61770620d75f648bc421414b766516c4e7657add08d0f8e08a298484b3c94395d64cd1c",
            "pubkey": "0x1bdbdc29b86c5cfd5ab4689329537db6088eb880",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid01e7030bbdedd1a19a9d924d2106f8a7f128887586afe261b4a87e13f476d4f08a",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
// validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1
exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1 = {
    "type": "SpasmEventV2",
    "siblings": [
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"reply\",\"content\":\"validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1\",\"parent\":{\"ids\":[{\"value\":\"spasmid01e7030bbdedd1a19a9d924d2106f8a7f128887586afe261b4a87e13f476d4f08a\"}]},\"mentions\":[{\"addresses\":[{\"value\":\"0x1bdbdc29b86c5cfd5ab4689329537db6088eb880\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0x91def065c0476500751f459ed84e8932bf88a8bf\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0x92d31890d8326f9d43790a051c2217a5b579f805\",\"format\":{\"name\":\"ethereum-pubkey\"}}]},{\"addresses\":[{\"value\":\"0xa145a31fde5a73a3259764da166da5af03b1e43d\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}],\"timestamp\":1739138551911,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0xd4a2b4e99b7d180233dcad516b0a05b44fb88b40\",\"format\":{\"name\":\"ethereum-pubkey\"}}]}]}",
            "signatures": [
                {
                    "value": "0x786f696856468c860a22dc2d03333ae53ef27a40b65045667141678d75807b1f603e731ca304dc774df5272bb0383d3c821a6d012b7534d186686596d94fb04e1c",
                    "pubkey": "0xd4a2b4e99b7d180233dcad516b0a05b44fb88b40",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "parent": {
        "ids": [
            {
                "value": "spasmid01e7030bbdedd1a19a9d924d2106f8a7f128887586afe261b4a87e13f476d4f08a",
                "format": {
                    "name": "spasmid",
                    "version": "01"
                }
            }
        ]
    },
    "action": "reply",
    "content": "validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1",
    "timestamp": 1739138551911,
    "license": "SPDX-License-Identifier: CC0-1.0",
    "authors": [
        {
            "addresses": [
                {
                    "value": "0xd4a2b4e99b7d180233dcad516b0a05b44fb88b40",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "mentions": [
        {
            "addresses": [
                {
                    "value": "0x1bdbdc29b86c5cfd5ab4689329537db6088eb880",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0x91def065c0476500751f459ed84e8932bf88a8bf",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0x92d31890d8326f9d43790a051c2217a5b579f805",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        },
        {
            "addresses": [
                {
                    "value": "0xa145a31fde5a73a3259764da166da5af03b1e43d",
                    "format": {
                        "name": "ethereum-pubkey"
                    }
                }
            ]
        }
    ],
    "signatures": [
        {
            "value": "0x786f696856468c860a22dc2d03333ae53ef27a40b65045667141678d75807b1f603e731ca304dc774df5272bb0383d3c821a6d012b7534d186686596d94fb04e1c",
            "pubkey": "0xd4a2b4e99b7d180233dcad516b0a05b44fb88b40",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ],
    "ids": [
        {
            "value": "spasmid0135e25a90290cef965d923dd2a4df4812887cb4e0afbd37ff4f7fb4a5cf2baf62",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        }
    ]
};
exports.validSpasmTreeV2Depth0_Plus1 = {
    ...exports.validSpasmEventV2TreeDepth0_Post1,
    children: [
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1React1.ids,
            event: exports.validSpasmEventV2TreeDepth1_Post1React1
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply1.ids,
            event: exports.validSpasmEventV2TreeDepth1_Post1Reply1
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply2.ids,
            event: exports.validSpasmEventV2TreeDepth1_Post1Reply2
        }
    ]
};
exports.validSpasmTreeV2Depth0_Plus2 = {
    // Depth 0
    ...exports.validSpasmEventV2TreeDepth0_Post1,
    // Depth 1
    children: [
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1React1.ids,
            event: exports.validSpasmEventV2TreeDepth1_Post1React1
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply1.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth1_Post1Reply1,
                // Depth 2
                children: [
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1.ids,
                        event: exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1
                    }
                ]
            }
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply2.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth1_Post1Reply2,
                // Depth 2
                children: [
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1.ids,
                        event: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1
                    },
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1.ids,
                        event: exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1
                    }
                ]
            }
        }
    ]
};
exports.validSpasmTreeV2Depth0_Plus4 = {
    // Depth 0
    ...exports.validSpasmEventV2TreeDepth0_Post1,
    // Depth 1
    children: [
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1React1.ids,
            event: exports.validSpasmEventV2TreeDepth1_Post1React1
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply1.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth1_Post1Reply1,
                // Depth 2
                children: [
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1.ids,
                        event: {
                            ...exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1,
                            // Depth 3
                            children: [
                                {
                                    ids: exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1.ids,
                                    event: {
                                        ...exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1,
                                        // Depth 4
                                        children: [
                                            {
                                                ids: exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1.ids,
                                                event: exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            ids: exports.validSpasmEventV2TreeDepth1_Post1Reply2.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth1_Post1Reply2,
                // Depth 2
                children: [
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1.ids,
                        event: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1
                    },
                    {
                        ids: exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1.ids,
                        event: exports.validSpasmEventV2TreeDepth2_Post1Reply2Reply1
                    }
                ]
            }
        }
    ]
};
exports.validSpasmTreeV2Depth2_Plus1 = {
    // Depth 2 (zero)
    ...exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1,
    // Depth 1 (+1 up)
    parent: {
        ...exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1.parent,
        event: exports.validSpasmEventV2TreeDepth1_Post1Reply1
    },
    // Depth 3 (+1 down)
    children: [
        {
            ids: exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1
            }
        }
    ]
};
exports.validSpasmTreeV2Depth2_Plus2 = {
    // Depth 2 (zero)
    ...exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1,
    // Depth 1 (+1 up)
    parent: {
        ...exports.validSpasmEventV2TreeDepth2_Post1Reply1Reply1.parent,
        event: {
            ...exports.validSpasmEventV2TreeDepth1_Post1Reply1,
            // Depth 0 (+2 up)
            parent: {
                ...exports.validSpasmEventV2TreeDepth1_Post1Reply1.parent,
                event: {
                    ...exports.validSpasmEventV2TreeDepth0_Post1
                }
            }
        }
    },
    // Depth 3 (+1 down)
    children: [
        {
            ids: exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1.ids,
            event: {
                ...exports.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1,
                // Depth 4 (+2 down)
                children: [
                    {
                        ids: exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1.ids,
                        event: {
                            ...exports.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1
                        }
                    }
                ]
            }
        }
    ]
};
exports.validSpasmEventV2SourceMoneroObserverNbsp = {
    "type": "SpasmEventV2",
    "action": "post",
    "title": "rottenwheel publishes 'Revuo Monero' Issue #227",
    "timestamp": 1739746800000,
    "content": "rottenwheel1 has published Issue #2272’3 of the weekly Revuo Monero audience-funded newsletter, which covers February 9 - 16 2025 news: Recent News Upcoming Events CCS Proposals Price & Blockchain Stats Volunteer Opportunities Support To support Revuo Monero, you can contribute XMR to the address listed in the footer of each issue and on the Support4 page. Join the Revuo XMPP MUC5 and Matrix room6 to get involved with the project. Suggestions and comments can be sent directly to rotten via email7. https://farside.link/nitter/rottenwheel1, https://rottenwheel.com/ ↩ https://www.revuo-xmr.com/weekly/issue-227/ ↩ (onion) http://revuo75joezkbeitqmas4ab6spbrkr4vzbhjmeuv75ovrfqfp47mtjid.onion/weekly/issue-227/, (eepsite) http://qve7i3ke5h2mbbyphd7agmh5awzcwulvrvghjvhndkagdbi4mkcq.b32.i2p/ ↩ https://revuo-xmr.com/support/ ↩ (XMPP MUC) xmpp:revuo-monero@conference.jabbers.one?join ↩ (Matrix) https://matrix.to/#/#revuo:monero.social ↩ rotten (at) revuo-xmr (dot) com ↩...",
    "keywords": [
        "XMR"
    ],
    "ids": [
        {
            // "value": "spasmid019b42eab1a04ee1c26c083f3ca6b0c428c5e6a8df7c600c75e624b6580969db24",
            "value": "spasmid0150ff53944b6f7dcc0610ce160a41793cd192b67fe5c4a1076e99f410fc474cb4",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        },
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "format": {
                "name": "url"
            }
        },
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "format": {
                "name": "guid"
            }
        }
    ],
    "links": [
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "protocol": "https",
            "origin": "https://monero.observer",
            "host": "monero.observer",
            "pathname": "/rottenwheel-publishes-revuo-monero-issue-227/",
            "originalProtocolKey": "url"
        },
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "protocol": "https",
            "origin": "https://monero.observer",
            "host": "monero.observer",
            "pathname": "/rottenwheel-publishes-revuo-monero-issue-227/",
            "originalProtocolKey": "guid"
        }
    ],
    "siblings": [
        {
            "type": "SiblingWeb2V2",
            "protocol": {
                "name": "web2"
            },
            "ids": [
                {
                    "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                    "format": {
                        "name": "url"
                    }
                },
                {
                    "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                    "format": {
                        "name": "guid"
                    }
                }
            ],
            "originalObject": {
                "url": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                "guid": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                "title": "rottenwheel publishes 'Revuo Monero' Issue #227",
                "source": "moneroobserver-feed",
                "pubdate": "Mon, 17 Feb 2025",
                "tickers": "XMR",
                "category": "privacy",
                "description": "rottenwheel1 has published Issue #2272’3 of the weekly Revuo Monero audience-funded newsletter, which covers February 9 - 16 2025 news: Recent News Upcoming Events CCS Proposals Price & Blockchain Stats Volunteer Opportunities Support To support Revuo Monero, you can contribute XMR to the address listed in the footer of each issue and on the Support4 page. Join the Revuo XMPP MUC5 and Matrix room6 to get involved with the project. Suggestions and comments can be sent directly to rotten via email7. https://farside.link/nitter/rottenwheel1, https://rottenwheel.com/ ↩ https://www.revuo-xmr.com/weekly/issue-227/ ↩ (onion) http://revuo75joezkbeitqmas4ab6spbrkr4vzbhjmeuv75ovrfqfp47mtjid.onion/weekly/issue-227/, (eepsite) http://qve7i3ke5h2mbbyphd7agmh5awzcwulvrvghjvhndkagdbi4mkcq.b32.i2p/ ↩ https://revuo-xmr.com/support/ ↩ (XMPP MUC) xmpp:revuo-monero@conference.jabbers.one?join ↩ (Matrix) https://matrix.to/#/#revuo:monero.social ↩ rotten (at) revuo-xmr (dot) com ↩..."
            }
        }
    ],
    "source": {
        "name": "moneroobserver-feed"
    },
    "categories": [
        {
            "name": "privacy"
        }
    ],
    "db": {
        "key": 36327,
        "addedTimestamp": 1739828609589,
        "updatedTimestamp": 1739828609589,
        "table": "spasm_events"
    }
};
exports.validSpasmEnvelopeV2SourceMoneroObserverSsp = {
    "type": "SpasmEventEnvelopeV2",
    "ids": [
        {
            // "value": "spasmid01fd8f03f8ba71eb4d71c2a3b1f695b7bc0e3858582e83a6a6d98de9e39788c572",
            "value": "spasmid0150ff53944b6f7dcc0610ce160a41793cd192b67fe5c4a1076e99f410fc474cb4",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        },
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "format": {
                "name": "url"
            }
        },
        {
            "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
            "format": {
                "name": "guid"
            }
        }
    ],
    "siblings": [
        {
            "ids": [
                {
                    "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                    "format": {
                        "name": "url"
                    }
                },
                {
                    "value": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                    "format": {
                        "name": "guid"
                    }
                }
            ],
            "type": "SiblingWeb2V2",
            "protocol": {
                "name": "web2"
            },
            "originalObject": {
                "url": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                "guid": "https://monero.observer/rottenwheel-publishes-revuo-monero-issue-227/",
                "title": "rottenwheel publishes 'Revuo Monero' Issue #227",
                "source": "moneroobserver-feed",
                "pubdate": "Mon, 17 Feb 2025",
                "tickers": "XMR",
                "category": "privacy",
                "description": "rottenwheel1 has published Issue #2272’3 of the weekly Revuo Monero audience-funded newsletter, which covers February 9 - 16 2025 news: Recent News Upcoming Events CCS Proposals Price & Blockchain Stats Volunteer Opportunities Support To support Revuo Monero, you can contribute XMR to the address listed in the footer of each issue and on the Support4 page. Join the Revuo XMPP MUC5 and Matrix room6 to get involved with the project. Suggestions and comments can be sent directly to rotten via email7. https://farside.link/nitter/rottenwheel1, https://rottenwheel.com/ ↩ https://www.revuo-xmr.com/weekly/issue-227/ ↩ (onion) http://revuo75joezkbeitqmas4ab6spbrkr4vzbhjmeuv75ovrfqfp47mtjid.onion/weekly/issue-227/, (eepsite) http://qve7i3ke5h2mbbyphd7agmh5awzcwulvrvghjvhndkagdbi4mkcq.b32.i2p/ ↩ https://revuo-xmr.com/support/ ↩ (XMPP MUC) xmpp:revuo-monero@conference.jabbers.one?join ↩ (Matrix) https://matrix.to/#/#revuo:monero.social ↩ rotten (at) revuo-xmr (dot) com ↩..."
            }
        }
    ],
    "db": {
        "key": 36327,
        "addedTimestamp": 1739828609589,
        "updatedTimestamp": 1739828609589,
        "table": "spasm_events"
    },
    "source": {
        "name": "moneroobserver-feed"
    }
};
exports.validMultiSignedSpasmEventV2WithMediaLinks = {
    "type": "SpasmEventV2",
    "content": "https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg\n\nHere are some links to learn more about the Spasm ecosystem.\n\nOfficial website:\nhttps://spasm.network\n\nForum:\nhttps://forum.spasm.network\n\nNpm package:\nhttps://www.npmjs.com/package/spasm.js\n\nSpasm genesis:\nhttps://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f\n\nSpasm - the endgame of social media:\nhttps://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4\n\nWeb3 authentication vs Spasm-powered direct signing:\nhttps://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4\n\nRSS feed:\nhttps://forum.spasm.network/api/events?format=rss&action=post&activity=rising",
    "timestamp": 1768346774182,
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                },
                {
                    "value": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    "format": {
                        "name": "nostr-hex"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "siblings": [
        {
            "type": "SiblingNostrSpasmSignedV2",
            "originalObject": {
                "content": "https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg\n\nHere are some links to learn more about the Spasm ecosystem.\n\nOfficial website:\nhttps://spasm.network\n\nForum:\nhttps://forum.spasm.network\n\nNpm package:\nhttps://www.npmjs.com/package/spasm.js\n\nSpasm genesis:\nhttps://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f\n\nSpasm - the endgame of social media:\nhttps://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4\n\nWeb3 authentication vs Spasm-powered direct signing:\nhttps://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4\n\nRSS feed:\nhttps://forum.spasm.network/api/events?format=rss&action=post&activity=rising",
                "created_at": 1768346774,
                "kind": 1,
                "id": "39b001f00b8d449a3e9aadf53bf352d9b71374e86562776d268265633a5aa5fe",
                "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                "tags": [
                    [
                        "spasm_action",
                        "post"
                    ],
                    [
                        "spasm_timestamp",
                        "1768346774182"
                    ],
                    [
                        "license",
                        "SPDX-License-Identifier: CC0-1.0"
                    ],
                    [
                        "spasm_version",
                        "2.0.0"
                    ],
                    [
                        "nostr_spasm_version",
                        "2.0.0"
                    ],
                    [
                        "spasm_category",
                        "general"
                    ],
                    [
                        "title",
                        "Multi-signed post with media links"
                    ],
                    [
                        "O",
                        "spasm_author:0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                        "spasm_aadd_1"
                    ],
                    [
                        "tags_mapping",
                        "spasm_aadd_1",
                        "O",
                        "spasm_author:0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                        "se2",
                        "authors.addresses",
                        "0",
                        "0",
                        "slice.13",
                        "",
                        "ethereum-pubkey",
                        "",
                        "",
                        ""
                    ],
                    [
                        "O",
                        "spasm_author:2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                        "spasm_aadd_1"
                    ],
                    [
                        "tags_mapping",
                        "spasm_aadd_1",
                        "O",
                        "spasm_author:2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                        "se2",
                        "authors.addresses",
                        "0",
                        "1",
                        "slice.13",
                        "",
                        "nostr-hex",
                        "",
                        "",
                        ""
                    ]
                ],
                "sig": "7ae1392f00c55429ce37f0edae929284e4bc5c2ec93522844a2e5cbb9b905db3e6f4f2835ce57f663e4b362e7efcc07259b634b83494bfb4dc0669e35130ec91"
            },
            "protocol": {
                "name": "nostr",
                "hasExtraSpasmFields": true,
                "extraSpasmFieldsVersion": "2.0.0"
            },
            "ids": [
                {
                    "value": "39b001f00b8d449a3e9aadf53bf352d9b71374e86562776d268265633a5aa5fe",
                    "format": {
                        "name": "nostr-hex"
                    }
                }
            ],
            "signatures": [
                {
                    "value": "7ae1392f00c55429ce37f0edae929284e4bc5c2ec93522844a2e5cbb9b905db3e6f4f2835ce57f663e4b362e7efcc07259b634b83494bfb4dc0669e35130ec91",
                    "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    "format": {
                        "name": "nostr-sig"
                    }
                }
            ]
        },
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"post\",\"content\":\"https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg\\n\\nHere are some links to learn more about the Spasm ecosystem.\\n\\nOfficial website:\\nhttps://spasm.network\\n\\nForum:\\nhttps://forum.spasm.network\\n\\nNpm package:\\nhttps://www.npmjs.com/package/spasm.js\\n\\nSpasm genesis:\\nhttps://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f\\n\\nSpasm - the endgame of social media:\\nhttps://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4\\n\\nWeb3 authentication vs Spasm-powered direct signing:\\nhttps://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4\\n\\nRSS feed:\\nhttps://forum.spasm.network/api/events?format=rss&action=post&activity=rising\",\"title\":\"Multi-signed post with media links\",\"categories\":[{\"name\":\"general\"}],\"timestamp\":1768346774182,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e\",\"format\":{\"name\":\"ethereum-pubkey\"}},{\"value\":\"2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42\",\"format\":{\"name\":\"nostr-hex\"}}]}]}",
            "signatures": [
                {
                    "value": "0xb2837cf85e6bfc62a0014ea7645c33d57568e5e99c9060af63e540b902bd688f38a777e0016feceecea7e469ffb7fe043ef22c6899dee65520621a348c015f4e1c",
                    "pubkey": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "ids": [
        {
            "value": "spasmid01ce14f534a896997aae3820167c4e0d39a5f516c5a1ecc3ab2db224d196c27b5f",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        },
        {
            "value": "39b001f00b8d449a3e9aadf53bf352d9b71374e86562776d268265633a5aa5fe",
            "format": {
                "name": "nostr-hex"
            }
        }
    ],
    "action": "post",
    "categories": [
        {
            "name": "general"
        }
    ],
    "license": "SPDX-License-Identifier: CC0-1.0",
    "title": "Multi-signed post with media links",
    "signatures": [
        {
            "value": "7ae1392f00c55429ce37f0edae929284e4bc5c2ec93522844a2e5cbb9b905db3e6f4f2835ce57f663e4b362e7efcc07259b634b83494bfb4dc0669e35130ec91",
            "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "format": {
                "name": "nostr-sig"
            }
        },
        {
            "value": "0xb2837cf85e6bfc62a0014ea7645c33d57568e5e99c9060af63e540b902bd688f38a777e0016feceecea7e469ffb7fe043ef22c6899dee65520621a348c015f4e1c",
            "pubkey": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ]
};
exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks = {
    "type": "SpasmEventV2",
    "content": "![image](https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg)\n\nHere are some links to learn more about the Spasm ecosystem:\n- [Official website](https://spasm.network)\n- [Forum](https://forum.spasm.network)\n- [Npm package](https://www.npmjs.com/package/spasm.js)\n- [Spasm genesis](https://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f)\n- [Spasm - the endgame of social media](https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4)\n- [Web3 authentication vs Spasm-powered direct signing](https://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4)\n- [RSS feed](https://forum.spasm.network/api/events?format=rss&action=post&activity=rising)",
    "timestamp": 1768346910230,
    "authors": [
        {
            "addresses": [
                {
                    "value": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                    "format": {
                        "name": "ethereum-pubkey"
                    },
                    "verified": true
                },
                {
                    "value": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    "format": {
                        "name": "nostr-hex"
                    },
                    "verified": true
                }
            ]
        }
    ],
    "siblings": [
        {
            "type": "SiblingNostrSpasmSignedV2",
            "originalObject": {
                "content": "![image](https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg)\n\nHere are some links to learn more about the Spasm ecosystem:\n- [Official website](https://spasm.network)\n- [Forum](https://forum.spasm.network)\n- [Npm package](https://www.npmjs.com/package/spasm.js)\n- [Spasm genesis](https://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f)\n- [Spasm - the endgame of social media](https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4)\n- [Web3 authentication vs Spasm-powered direct signing](https://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4)\n- [RSS feed](https://forum.spasm.network/api/events?format=rss&action=post&activity=rising)",
                "created_at": 1768346910,
                "kind": 1,
                "id": "8cd6ae397a6046097a5863586959ae350ba787da4a790b963e3e18d716ba14d7",
                "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                "tags": [
                    [
                        "spasm_action",
                        "post"
                    ],
                    [
                        "spasm_timestamp",
                        "1768346910230"
                    ],
                    [
                        "license",
                        "SPDX-License-Identifier: CC0-1.0"
                    ],
                    [
                        "spasm_version",
                        "2.0.0"
                    ],
                    [
                        "nostr_spasm_version",
                        "2.0.0"
                    ],
                    [
                        "spasm_category",
                        "general"
                    ],
                    [
                        "title",
                        "Multi-signed post with markdown media links"
                    ],
                    [
                        "O",
                        "spasm_author:0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                        "spasm_aadd_1"
                    ],
                    [
                        "tags_mapping",
                        "spasm_aadd_1",
                        "O",
                        "spasm_author:0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                        "se2",
                        "authors.addresses",
                        "0",
                        "0",
                        "slice.13",
                        "",
                        "ethereum-pubkey",
                        "",
                        "",
                        ""
                    ],
                    [
                        "O",
                        "spasm_author:2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                        "spasm_aadd_1"
                    ],
                    [
                        "tags_mapping",
                        "spasm_aadd_1",
                        "O",
                        "spasm_author:2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                        "se2",
                        "authors.addresses",
                        "0",
                        "1",
                        "slice.13",
                        "",
                        "nostr-hex",
                        "",
                        "",
                        ""
                    ]
                ],
                "sig": "cbd656552ade80cdfdd7b70b31ffdf44e9815441b4042576b0190433dcf00e62ebf9bad352c9928205f3b905ec712d7dd272a9b01288da0ee7201a6c13e3a1bd"
            },
            "protocol": {
                "name": "nostr",
                "hasExtraSpasmFields": true,
                "extraSpasmFieldsVersion": "2.0.0"
            },
            "ids": [
                {
                    "value": "8cd6ae397a6046097a5863586959ae350ba787da4a790b963e3e18d716ba14d7",
                    "format": {
                        "name": "nostr-hex"
                    }
                }
            ],
            "signatures": [
                {
                    "value": "cbd656552ade80cdfdd7b70b31ffdf44e9815441b4042576b0190433dcf00e62ebf9bad352c9928205f3b905ec712d7dd272a9b01288da0ee7201a6c13e3a1bd",
                    "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    "format": {
                        "name": "nostr-sig"
                    }
                }
            ]
        },
        {
            "type": "SiblingSpasmSignedV2",
            "protocol": {
                "name": "spasm",
                "version": "2.0.0"
            },
            "signedString": "{\"type\":\"SpasmEventBodyV2\",\"action\":\"post\",\"content\":\"![image](https://media.spasm.network/spasmim01b6b7dc9972c02b70eec2d1ae4a5b95d9b3f0ebb04725d03bfd93664646ca41aa.jpeg)\\n\\nHere are some links to learn more about the Spasm ecosystem:\\n- [Official website](https://spasm.network)\\n- [Forum](https://forum.spasm.network)\\n- [Npm package](https://www.npmjs.com/package/spasm.js)\\n- [Spasm genesis](https://forum.spasm.network/news/spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f)\\n- [Spasm - the endgame of social media](https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4)\\n- [Web3 authentication vs Spasm-powered direct signing](https://media.spasm.network/spasmvi0154b262c75008c8314b1aab4167533be1de92cd958591af7f0f75602bb7524434.mp4)\\n- [RSS feed](https://forum.spasm.network/api/events?format=rss&action=post&activity=rising)\",\"title\":\"Multi-signed post with markdown media links\",\"categories\":[{\"name\":\"general\"}],\"timestamp\":1768346910230,\"license\":\"SPDX-License-Identifier: CC0-1.0\",\"protocol\":{\"name\":\"spasm\",\"version\":\"2.0.0\"},\"authors\":[{\"addresses\":[{\"value\":\"0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e\",\"format\":{\"name\":\"ethereum-pubkey\"}},{\"value\":\"2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42\",\"format\":{\"name\":\"nostr-hex\"}}]}]}",
            "signatures": [
                {
                    "value": "0xbc19fd22232318f13c91aa179addc03ab5ab8fe5ce7c52dd14af05c8495bebaa778d7fcc5174a6dd352cfb670bb3a465eb41acca4342997f1ce117880883cbe61b",
                    "pubkey": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
                    "format": {
                        "name": "ethereum-sig"
                    }
                }
            ]
        }
    ],
    "ids": [
        {
            "value": "spasmid01d7a2d69b20cc06d7094a23270fbc2aa48cc18023f91678696a89b790a77f0525",
            "format": {
                "name": "spasmid",
                "version": "01"
            }
        },
        {
            "value": "8cd6ae397a6046097a5863586959ae350ba787da4a790b963e3e18d716ba14d7",
            "format": {
                "name": "nostr-hex"
            }
        }
    ],
    "action": "post",
    "categories": [
        {
            "name": "general"
        }
    ],
    "license": "SPDX-License-Identifier: CC0-1.0",
    "title": "Multi-signed post with markdown media links",
    "signatures": [
        {
            "value": "cbd656552ade80cdfdd7b70b31ffdf44e9815441b4042576b0190433dcf00e62ebf9bad352c9928205f3b905ec712d7dd272a9b01288da0ee7201a6c13e3a1bd",
            "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "format": {
                "name": "nostr-sig"
            }
        },
        {
            "value": "0xbc19fd22232318f13c91aa179addc03ab5ab8fe5ce7c52dd14af05c8495bebaa778d7fcc5174a6dd352cfb670bb3a465eb41acca4342997f1ce117880883cbe61b",
            "pubkey": "0x29e00e23ca1b5b3ccc26c9aa9279c18ce65c9c7e",
            "format": {
                "name": "ethereum-sig"
            }
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validDmpEventSignedClosed)),
    author: exports.validDmpEventSignedClosed.signer,
    title: exports.validDmpEvent.title,
    description: exports.validDmpEvent.text,
    guid: (0, getSpasmId_js_1.getSpasmId01)(exports.validDmpEventSignedClosedConvertedToSpasmV2),
    // pubDate: "Sat, 01 Jan 2022 22:04:46 GMT"
    pubDate: new Date(exports.validDmpEventSignedClosedConvertedToSpasmV2.timestamp).toUTCString()
};
exports.validSpasmEventBodyV2ConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validSpasmEventBodyV2)),
    // No author because event is unsigned, so it's impossible to verify signature
    // author: validSpasmEventBodyV2!.authors![0].addresses![0].value as string,
    title: exports.validSpasmEventBodyV2.title,
    description: exports.validSpasmEventBodyV2.content,
    guid: (0, getSpasmId_js_1.getSpasmId01)(exports.validSpasmEventBodyV2ConvertedToSpasmV2),
    // pubDate: "Sat, 12 Oct 2024 05:33:01 GMT"
    pubDate: new Date(exports.validSpasmEventBodyV2.timestamp).toUTCString()
};
exports.validSpasmEventBodySignedClosedV2ConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validSpasmEventBodySignedClosedV2)),
    author: exports.validSpasmEventBodyV2.authors[0].addresses[0].value,
    title: exports.validSpasmEventBodyV2.title,
    description: exports.validSpasmEventBodyV2.content,
    guid: (0, getSpasmId_js_1.getSpasmId01)(exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2),
    // pubDate: "Sat, 12 Oct 2024 05:33:01 GMT"
    pubDate: new Date(exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2.timestamp).toUTCString()
};
exports.validNostrReplyToDmpEventConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validNostrReplyToDmpEvent)),
    author: (0, index_js_1.toBeNpub)(exports.validNostrReplyToDmpEvent.pubkey),
    description: exports.validNostrReplyToDmpEvent.content,
    guid: (0, getSpasmId_js_1.getSpasmId01)((0, convertToSpasm_js_1.convertToSpasm)(exports.validNostrReplyToDmpEvent)),
    // pubDate: "Tue, 20 Jan 1970 18:29:13 GMT"
    pubDate: new Date((0, convertToSpasm_js_1.convertToSpasm)(exports.validNostrReplyToDmpEvent).timestamp).toUTCString()
};
exports.validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validSpasmEventV2TreeDepth2_Post1Reply2React1)),
    author: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1.authors[0].addresses[0].value,
    description: exports.validSpasmEventV2TreeDepth2_Post1Reply2React1.content,
    guid: (0, getSpasmId_js_1.getSpasmId01)(exports.validSpasmEventV2TreeDepth2_Post1Reply2React1),
    // pubDate: "Sun, 09 Feb 2025 21:58:16 GMT"
    pubDate: new Date(exports.validSpasmEventV2TreeDepth2_Post1Reply2React1.timestamp).toUTCString()
};
exports.validPostWithRssItemConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validPostWithRssItem)),
    title: exports.validPostWithRssItem.title,
    description: exports.validPostWithRssItem.description,
    guid: exports.validPostWithRssItem.guid,
    link: exports.validPostWithRssItem.url,
    pubDate: "Tue, 12 Mar 2024 20:24:04 GMT",
};
exports.validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validMultiSignedSpasmEventV2WithMediaLinks)),
    author: exports.validMultiSignedSpasmEventV2WithMediaLinks.authors[0].addresses[0].value,
    title: exports.validMultiSignedSpasmEventV2WithMediaLinks.title,
    description: exports.validMultiSignedSpasmEventV2WithMediaLinks.content,
    guid: (0, index_js_1.extractSpasmId01)(exports.validMultiSignedSpasmEventV2WithMediaLinks),
    pubDate: new Date(exports.validMultiSignedSpasmEventV2WithMediaLinks.timestamp).toUTCString(),
    enclosureUrl: "https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4"
};
exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent = {
    type: "RssEvent",
    spasmEnvelope: JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks)),
    author: exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks.authors[0].addresses[0].value,
    title: exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks.title,
    description: exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks.content,
    guid: (0, index_js_1.extractSpasmId01)(exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks),
    pubDate: new Date(exports.validMultiSignedSpasmEventV2WithMarkdownMediaLinks.timestamp).toUTCString(),
    enclosureUrl: "https://media.spasm.network/spasmvi01f316a39a710c2bef7288a8f8485876c48a87ede8f4f23941d4577c05617101ee.mp4"
};
//# sourceMappingURL=_events-data.js.map