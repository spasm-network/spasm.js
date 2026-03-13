#!/usr/bin/env node
import * as spasm from './../lib.esm/index.js';
// const convertToSpasmConfig = {
//   xss: {
//     enableSanitization: true,
//   }
// };

spasm.utilsStatus();

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: spasm-fetch-events <url>');
    process.exit(1);
}

const [url] = args;

try {
  const result = await spasm.fetchEventsFromUrl(url)
  console.log("spasm-fetch-events result:", result)
} catch (err) {
  console.error(err);
  process.exit(1);
}
