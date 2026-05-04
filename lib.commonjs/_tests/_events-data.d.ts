import { NostrEvent, NostrEventSignedOpened, NostrSpasmEvent, NostrSpasmEventSignedOpened, DmpEvent, Post, DmpEventSignedClosed, DmpEventSignedOpened, SpasmEventV2, SpasmEventV0, EventForSpasmid01, SpasmEventEnvelopeV2, SpasmEventEnvelopeWithTreeV2, SpasmEventBodyV2, SpasmEventBodySignedClosedV2, RssEvent, SpasmSimpleV2 } from "./../types/interfaces.js";
export declare const validEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2fa";
export declare const invalidEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2f";
export declare const validEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b";
export declare const invalidEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71";
export declare const validNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z";
export declare const validNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d6";
export declare const validHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c81";
export declare const validHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9014aa";
export declare const invalidNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr1z";
export declare const invalidNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d7";
export declare const invalidHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c82";
export declare const invalidHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9015aa";
export declare const validId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mv";
export declare const validId1Nevent = "nevent1qqsyxakxt5hjx2hmaxug9g6m4f8kl6rx038xs36f4at9lxqcx0kk5egkrc3ry";
export declare const validId1Hex = "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65";
export declare const invalidId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mw";
export declare const validId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfq";
export declare const validId2Nevent = "nevent1qqsrm2tegjxehgnrsexy6mc5npxyyw3c8qmyasj47q78jp934emlypszlcsc8";
export declare const validId2Hex = "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206";
export declare const invalidId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfr";
export declare const validId0Spasmid01 = "spasmid01a948904f2f0f479b8f8197694b30184b0d2ed1c1cd2a1ec0fb85d299a192a447";
export declare const validSpasmEventBodyV2: SpasmEventBodyV2;
export declare const validSpasmEventBodyV2ConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmEventBodySignedClosedV2: SpasmEventBodySignedClosedV2;
export declare const validSpasmEventBodySignedClosedV2ConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmEventBodyV2ReplyToGenesis: SpasmEventBodyV2;
export declare const validSpasmEventBodyV2ReplyToGenesisSignedClosed: SpasmEventBodySignedClosedV2;
export declare const validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2: SpasmEventV2;
export declare const validDmpEvent: DmpEvent;
export declare const validDmpEventSignedClosed: DmpEventSignedClosed;
export declare const validDmpEventSignedOpened: DmpEventSignedOpened;
export declare const validDmpEventSignedClosedWithInvalidSignedString: DmpEventSignedClosed;
export declare const validDmpEventSignedClosedWithInvalidSigner: DmpEventSignedClosed;
export declare const validDmpEventSignedClosedWithInvalidSignature: DmpEventSignedClosed;
export declare const validSpasmWithDmpReplyToDmpEventV0: SpasmEventV0;
export declare const validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2: SpasmEventV2;
export declare const validNostrReplyToDmpEvent: NostrSpasmEventSignedOpened;
export declare const validPostWithNostrReplyToDmpEvent: Post;
export declare const validPostWithNostrReplyToDmpEventConvertedToSpasmV2: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithoutFormats: SpasmEventV2;
export declare const validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives: SpasmEventEnvelopeWithTreeV2;
export declare const validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives: SpasmEventEnvelopeWithTreeV2;
export declare const validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren: SpasmEventEnvelopeWithTreeV2;
export declare const validPostWithDmpEventSignedClosed: Post;
export declare const validSpasmDmpEventSignedClosedV0: Post;
export declare const validDmpEventConvertedToSpasmEventV2: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmV2: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse: SpasmEventV2;
export declare const validDmpEventSignedOpenedConvertedToSpasmV2: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToSpasmV2DifferentSource: SpasmEventV2;
export declare const validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2: SpasmEventEnvelopeV2;
export declare const validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent: SpasmEventV2;
export declare const validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2: SpasmEventV2;
export declare const validNostrEvent: NostrEvent;
export declare const validNostrSpasmEvent: NostrSpasmEvent;
export declare const validNostrEventSignedOpened: NostrEventSignedOpened;
export declare const validNostrSpasmEventSignedOpened: NostrSpasmEventSignedOpened;
export declare const validNostrSpasmEventSignedOpenedWithInvalidSignature: NostrSpasmEventSignedOpened;
export declare const validNostrSpasmEventSignedOpenedWithInvalidContent: NostrSpasmEventSignedOpened;
export declare const validNostrSpasmEventSignedOpenedWithInvalidSigner: NostrSpasmEventSignedOpened;
export declare const validPostWithNostrEventSignedOpened: {
    id: number;
    target: string;
    action: string;
    title: string;
    text: string;
    signer: string;
    signed_message: string;
    signature: string;
    signed_time: number;
    added_time: string;
    category: any;
    tags: any;
    tickers: any;
    upvote: number;
    downvote: any;
    bullish: boolean;
    bearish: number;
    important: number;
    scam: number;
    comments_count: any;
    latest_action_added_time: string;
};
export declare const validSpasmNostrEventSignedOpenedV0: {
    id: number;
    target: string;
    action: string;
    title: string;
    text: string;
    signer: string;
    signed_message: string;
    signature: string;
    signed_time: number;
    added_time: string;
    category: any;
    tags: any;
    tickers: any;
    upvote: number;
    downvote: any;
    bullish: boolean;
    bearish: number;
    important: number;
    scam: number;
    comments_count: any;
    latest_action_added_time: string;
};
export declare const validPostWithNostrSpasmEventSignedOpened: Post;
export declare const validSpasmNostrSpasmEventSignedOpenedV0: Post;
export declare const validNostrEventConvertedToSpasmV2: SpasmEventV2;
export declare const validNostrSpasmEventConvertedToSpasmV2: SpasmEventV2;
export declare const validNostrEventSignedOpenedConvertedToSpasmV2: SpasmEventV2;
export declare const validNostrSpasmEventSignedOpenedConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2: SpasmEventV2;
export declare const validNostrSpasmEventV2SingleSignedOpened: NostrSpasmEventSignedOpened;
export declare const validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmEventBodyV2WithOneNostrSigner: SpasmEventBodyV2;
export declare const validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2: NostrSpasmEvent;
export declare const validSpasmEventBodyV2ReplyWithTwoSigners: SpasmEventBodyV2;
export declare const validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2: NostrSpasmEvent;
export declare const validPostWithRssItem: Post;
export declare const validPostWithRssItemReverseTags: Post;
export declare const validSpasmEventRssItemV0: SpasmEventV0;
export declare const validSpasmEventRssItemV0ConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2: SpasmEventV2;
export declare const validSpasmEventV2WithTwoParentUrlIds: SpasmEventV2;
export declare const SpasmEventV2ToTestSpasmid01: SpasmEventV2;
export declare const SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys: SpasmEventV2;
export declare const SpasmEventV2ConvertedToSpasmid01: EventForSpasmid01;
export declare const validPostWithRssItemSpecialChars: {
    id: number;
    guid: string;
    source: string;
    category: string;
    tickers: string;
    tags: any;
    title: string;
    url: string;
    description: string;
    pubdate: string;
    upvote: any;
    downvote: any;
    bullish: any;
    bearish: any;
    important: any;
    scam: any;
    comments_count: any;
    latest_action_added_time: any;
};
export declare const validPostWithRssItemSpecialCharsConvertedToSpasmEventV2: {
    action: string;
    categories: {
        name: string;
    }[];
    content: string;
    db: {
        key: number;
    };
    ids: ({
        format: {
            name: string;
            version: string;
        };
        value: string;
    } | {
        format: {
            name: string;
            version?: undefined;
        };
        value: string;
    })[];
    keywords: string[];
    links: {
        host: string;
        origin: string;
        originalProtocolKey: string;
        pathname: string;
        protocol: string;
        value: string;
    }[];
    siblings: {
        ids: {
            format: {
                name: string;
            };
            value: string;
        }[];
        originalObject: {
            bearish: any;
            bullish: any;
            category: string;
            comments_count: any;
            description: string;
            downvote: any;
            guid: string;
            id: number;
            important: any;
            latest_action_added_time: any;
            pubdate: string;
            scam: any;
            source: string;
            tags: any;
            tickers: string;
            title: string;
            upvote: any;
            url: string;
        };
        protocol: {
            name: string;
        };
        type: string;
    }[];
    source: {
        name: string;
    };
    timestamp: number;
    title: string;
    type: string;
};
export declare const validPostWithRssItemTitleHasSpecialChars: {
    id: number;
    guid: string;
    source: string;
    category: string;
    tickers: string;
    tags: any;
    title: string;
    url: string;
    description: string;
    pubdate: string;
    upvote: any;
    downvote: any;
    bullish: any;
    bearish: any;
    important: any;
    scam: any;
    comments_count: any;
    latest_action_added_time: any;
};
export declare const validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2: {
    type: string;
    action: string;
    title: string;
    timestamp: number;
    content: string;
    ids: ({
        value: string;
        format: {
            name: string;
            version: string;
        };
    } | {
        value: string;
        format: {
            name: string;
            version?: undefined;
        };
    })[];
    links: {
        value: string;
        protocol: string;
        origin: string;
        host: string;
        pathname: string;
        originalProtocolKey: string;
    }[];
    siblings: {
        type: string;
        protocol: {
            name: string;
        };
        ids: {
            value: string;
            format: {
                name: string;
            };
        }[];
        originalObject: {
            id: number;
            guid: string;
            source: string;
            category: string;
            tickers: string;
            tags: any;
            title: string;
            url: string;
            description: string;
            pubdate: string;
            upvote: any;
            downvote: any;
            bullish: any;
            bearish: any;
            important: any;
            scam: any;
            comments_count: any;
            latest_action_added_time: any;
        };
    }[];
    db: {
        key: number;
    };
    source: {
        name: string;
    };
    categories: {
        name: string;
    }[];
};
export declare const validNostrSpasmEventSpasmV0WithInvalidHtmlTags: SpasmEventV0;
export declare const validRssItemWithEmoji: SpasmEventV0;
export declare const validRssItemWithEmojiConvertedToSpasmEvent2: SpasmEventV2;
export declare const validSpasmEventV2TreeDepth0_Post1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    title: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth1_Post1React1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth1_Post1Reply1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth1_Post1Reply2: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth2_Post1Reply1Reply1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth2_Post1Reply2React1: SpasmEventV2;
export declare const validSpasmEventV2TreeDepth2_Post1Reply2Reply1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1: {
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    parent: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmTreeV2Depth0_Plus1: {
    children: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    }[];
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    title: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmTreeV2Depth0_Plus2: {
    children: ({
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    } | {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            children: ({
                ids: import("./../types/interfaces.js").SpasmEventIdV2[];
                event: SpasmEventV2;
            } | {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
                event: {
                    type: string;
                    siblings: {
                        type: string;
                        protocol: {
                            name: string;
                            version: string;
                        };
                        signedString: string;
                        signatures: {
                            value: string;
                            pubkey: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    parent: {
                        ids: {
                            value: string;
                            format: {
                                name: string;
                                version: string;
                            };
                        }[];
                    };
                    action: string;
                    content: string;
                    timestamp: number;
                    license: string;
                    authors: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                            verified: boolean;
                        }[];
                    }[];
                    mentions: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    signatures: {
                        value: string;
                        pubkey: string;
                        format: {
                            name: string;
                        };
                    }[];
                    ids: {
                        value: string;
                        format: {
                            name: string;
                            version: string;
                        };
                    }[];
                };
            })[];
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    })[];
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    title: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmTreeV2Depth0_Plus4: {
    children: ({
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    } | {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            children: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
                event: {
                    children: {
                        ids: {
                            value: string;
                            format: {
                                name: string;
                                version: string;
                            };
                        }[];
                        event: {
                            children: {
                                ids: {
                                    value: string;
                                    format: {
                                        name: string;
                                        version: string;
                                    };
                                }[];
                                event: {
                                    type: string;
                                    siblings: {
                                        type: string;
                                        protocol: {
                                            name: string;
                                            version: string;
                                        };
                                        signedString: string;
                                        signatures: {
                                            value: string;
                                            pubkey: string;
                                            format: {
                                                name: string;
                                            };
                                        }[];
                                    }[];
                                    parent: {
                                        ids: {
                                            value: string;
                                            format: {
                                                name: string;
                                                version: string;
                                            };
                                        }[];
                                    };
                                    action: string;
                                    content: string;
                                    timestamp: number;
                                    license: string;
                                    authors: {
                                        addresses: {
                                            value: string;
                                            format: {
                                                name: string;
                                            };
                                            verified: boolean;
                                        }[];
                                    }[];
                                    mentions: {
                                        addresses: {
                                            value: string;
                                            format: {
                                                name: string;
                                            };
                                        }[];
                                    }[];
                                    signatures: {
                                        value: string;
                                        pubkey: string;
                                        format: {
                                            name: string;
                                        };
                                    }[];
                                    ids: {
                                        value: string;
                                        format: {
                                            name: string;
                                            version: string;
                                        };
                                    }[];
                                };
                            }[];
                            type: string;
                            siblings: {
                                type: string;
                                protocol: {
                                    name: string;
                                    version: string;
                                };
                                signedString: string;
                                signatures: {
                                    value: string;
                                    pubkey: string;
                                    format: {
                                        name: string;
                                    };
                                }[];
                            }[];
                            parent: {
                                ids: {
                                    value: string;
                                    format: {
                                        name: string;
                                        version: string;
                                    };
                                }[];
                            };
                            action: string;
                            content: string;
                            timestamp: number;
                            license: string;
                            authors: {
                                addresses: {
                                    value: string;
                                    format: {
                                        name: string;
                                    };
                                    verified: boolean;
                                }[];
                            }[];
                            mentions: {
                                addresses: {
                                    value: string;
                                    format: {
                                        name: string;
                                    };
                                }[];
                            }[];
                            signatures: {
                                value: string;
                                pubkey: string;
                                format: {
                                    name: string;
                                };
                            }[];
                            ids: {
                                value: string;
                                format: {
                                    name: string;
                                    version: string;
                                };
                            }[];
                        };
                    }[];
                    type: string;
                    siblings: {
                        type: string;
                        protocol: {
                            name: string;
                            version: string;
                        };
                        signedString: string;
                        signatures: {
                            value: string;
                            pubkey: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    parent: {
                        ids: {
                            value: string;
                            format: {
                                name: string;
                                version: string;
                            };
                        }[];
                    };
                    action: string;
                    content: string;
                    timestamp: number;
                    license: string;
                    authors: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                            verified: boolean;
                        }[];
                    }[];
                    mentions: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    signatures: {
                        value: string;
                        pubkey: string;
                        format: {
                            name: string;
                        };
                    }[];
                    ids: {
                        value: string;
                        format: {
                            name: string;
                            version: string;
                        };
                    }[];
                };
            }[];
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    } | {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            children: ({
                ids: import("./../types/interfaces.js").SpasmEventIdV2[];
                event: SpasmEventV2;
            } | {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
                event: {
                    type: string;
                    siblings: {
                        type: string;
                        protocol: {
                            name: string;
                            version: string;
                        };
                        signedString: string;
                        signatures: {
                            value: string;
                            pubkey: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    parent: {
                        ids: {
                            value: string;
                            format: {
                                name: string;
                                version: string;
                            };
                        }[];
                    };
                    action: string;
                    content: string;
                    timestamp: number;
                    license: string;
                    authors: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                            verified: boolean;
                        }[];
                    }[];
                    mentions: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    signatures: {
                        value: string;
                        pubkey: string;
                        format: {
                            name: string;
                        };
                    }[];
                    ids: {
                        value: string;
                        format: {
                            name: string;
                            version: string;
                        };
                    }[];
                };
            })[];
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    })[];
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    title: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmTreeV2Depth2_Plus1: {
    parent: {
        event: {
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    children: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    }[];
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmTreeV2Depth2_Plus2: {
    parent: {
        event: {
            parent: {
                event: {
                    type: string;
                    siblings: {
                        type: string;
                        protocol: {
                            name: string;
                            version: string;
                        };
                        signedString: string;
                        signatures: {
                            value: string;
                            pubkey: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    action: string;
                    title: string;
                    content: string;
                    timestamp: number;
                    license: string;
                    authors: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                            verified: boolean;
                        }[];
                    }[];
                    signatures: {
                        value: string;
                        pubkey: string;
                        format: {
                            name: string;
                        };
                    }[];
                    ids: {
                        value: string;
                        format: {
                            name: string;
                            version: string;
                        };
                    }[];
                };
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
    };
    children: {
        ids: {
            value: string;
            format: {
                name: string;
                version: string;
            };
        }[];
        event: {
            children: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
                event: {
                    type: string;
                    siblings: {
                        type: string;
                        protocol: {
                            name: string;
                            version: string;
                        };
                        signedString: string;
                        signatures: {
                            value: string;
                            pubkey: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    parent: {
                        ids: {
                            value: string;
                            format: {
                                name: string;
                                version: string;
                            };
                        }[];
                    };
                    action: string;
                    content: string;
                    timestamp: number;
                    license: string;
                    authors: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                            verified: boolean;
                        }[];
                    }[];
                    mentions: {
                        addresses: {
                            value: string;
                            format: {
                                name: string;
                            };
                        }[];
                    }[];
                    signatures: {
                        value: string;
                        pubkey: string;
                        format: {
                            name: string;
                        };
                    }[];
                    ids: {
                        value: string;
                        format: {
                            name: string;
                            version: string;
                        };
                    }[];
                };
            }[];
            type: string;
            siblings: {
                type: string;
                protocol: {
                    name: string;
                    version: string;
                };
                signedString: string;
                signatures: {
                    value: string;
                    pubkey: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            parent: {
                ids: {
                    value: string;
                    format: {
                        name: string;
                        version: string;
                    };
                }[];
            };
            action: string;
            content: string;
            timestamp: number;
            license: string;
            authors: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                    verified: boolean;
                }[];
            }[];
            mentions: {
                addresses: {
                    value: string;
                    format: {
                        name: string;
                    };
                }[];
            }[];
            signatures: {
                value: string;
                pubkey: string;
                format: {
                    name: string;
                };
            }[];
            ids: {
                value: string;
                format: {
                    name: string;
                    version: string;
                };
            }[];
        };
    }[];
    type: string;
    siblings: {
        type: string;
        protocol: {
            name: string;
            version: string;
        };
        signedString: string;
        signatures: {
            value: string;
            pubkey: string;
            format: {
                name: string;
            };
        }[];
    }[];
    action: string;
    content: string;
    timestamp: number;
    license: string;
    authors: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
            verified: boolean;
        }[];
    }[];
    mentions: {
        addresses: {
            value: string;
            format: {
                name: string;
            };
        }[];
    }[];
    signatures: {
        value: string;
        pubkey: string;
        format: {
            name: string;
        };
    }[];
    ids: {
        value: string;
        format: {
            name: string;
            version: string;
        };
    }[];
};
export declare const validSpasmEventV2SourceMoneroObserverNbsp: {
    type: string;
    action: string;
    title: string;
    timestamp: number;
    content: string;
    keywords: string[];
    ids: ({
        value: string;
        format: {
            name: string;
            version: string;
        };
    } | {
        value: string;
        format: {
            name: string;
            version?: undefined;
        };
    })[];
    links: {
        value: string;
        protocol: string;
        origin: string;
        host: string;
        pathname: string;
        originalProtocolKey: string;
    }[];
    siblings: {
        type: string;
        protocol: {
            name: string;
        };
        ids: {
            value: string;
            format: {
                name: string;
            };
        }[];
        originalObject: {
            url: string;
            guid: string;
            title: string;
            source: string;
            pubdate: string;
            tickers: string;
            category: string;
            description: string;
        };
    }[];
    source: {
        name: string;
    };
    categories: {
        name: string;
    }[];
    db: {
        key: number;
        addedTimestamp: number;
        updatedTimestamp: number;
        table: string;
    };
};
export declare const validSpasmEnvelopeV2SourceMoneroObserverSsp: {
    type: string;
    ids: ({
        value: string;
        format: {
            name: string;
            version: string;
        };
    } | {
        value: string;
        format: {
            name: string;
            version?: undefined;
        };
    })[];
    siblings: {
        ids: {
            value: string;
            format: {
                name: string;
            };
        }[];
        type: string;
        protocol: {
            name: string;
        };
        originalObject: {
            url: string;
            guid: string;
            title: string;
            source: string;
            pubdate: string;
            tickers: string;
            category: string;
            description: string;
        };
    }[];
    db: {
        key: number;
        addedTimestamp: number;
        updatedTimestamp: number;
        table: string;
    };
    source: {
        name: string;
    };
};
export declare const validMultiSignedSpasmEventV2WithMediaLinks: SpasmEventV2;
export declare const validMultiSignedSpasmEventV2WithMarkdownMediaLinks: SpasmEventV2;
export declare const validDmpEventSignedClosedConvertedToRssEvent: RssEvent;
export declare const validSpasmEventBodyV2ConvertedToRssEvent: RssEvent;
export declare const validSpasmEventBodySignedClosedV2ConvertedToRssEvent: RssEvent;
export declare const validNostrReplyToDmpEventConvertedToRssEvent: RssEvent;
export declare const validSpasmEventV2TreeDepth2_Post1Reply2React1ConvertedToRssEvent: RssEvent;
export declare const validPostWithRssItemConvertedToRssEvent: RssEvent;
export declare const validMultiSignedSpasmEventV2WithMediaLinksConvertedToRssEvent: RssEvent;
export declare const validMultiSignedSpasmEventV2WithMarkdownMediaLinksConvertedToRssEvent: RssEvent;
export declare const validRssFeedChannelEmpty: string;
export declare const validRssFeedChannelEmptyWithEthereumSigner: string;
export declare const validRssFeedChannelEmptyWithNostrSigner: string;
export declare const validSpasmEventBodyV2WithManyDuplicateValues: SpasmEventBodyV2;
export declare const validEventWithUpperCasePubkey: SpasmEventEnvelopeV2;
export declare const validDmpEventConvertedToSimpleV2: SpasmSimpleV2;
export declare const validNostrEventSignedOpenedConvertedToSpasmV2ConvertedToSimpleV2: SpasmSimpleV2;
//# sourceMappingURL=_events-data.d.ts.map