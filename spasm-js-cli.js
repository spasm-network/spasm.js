#!/usr/bin/env node
// This is just a bridge to ./bin/spasm-js-cli.js
// So you can execute the functions like this:
// node spasm-js-cli.js functionName inputData
// Examples::
/*
node spasm-js-cli.js utilsStatus
node spasm-js-cli.js toBeDate 1778000000 "full"
node spasm-js-cli.js toBeDate "1641074686178" short
node spasm-js-cli.js convertToSpasmEventEnvelope '{ "type": "SpasmEventV2", "title": "hello", "action": "post", "content": "world", "authors": [ { "addresses": [ { "value": "0x123" } ] } ], "siblings": [ { "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "originalObject": { "text": "SPASM" } } ] }'
*/

import { main } from './bin/spasm-js-cli.js';

const args = process.argv.slice(2);

// Call the main function with the provided arguments
main(args);
