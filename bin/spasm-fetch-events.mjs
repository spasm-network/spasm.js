#!/usr/bin/env node
// import * as spasm from './../lib.esm/index.js';
// import { SPASM_API_PATH } from './config.js';
// const spasmApiPath = SPASM_API_PATH || "/api/events"
const spasmApiPath = "/api/events"

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node bin/fetch-events.mjs --url <url> --flag val...');
  console.error(`Example: node bin/fetch-events.mjs --url "https://forum.spasm.network${spasmApiPath}" --activity rising --limit 10`);
  process.exit(1);
}

// Initialize config object with defaults
const config = {
  url: undefined,
  category: undefined,
  id: undefined,
  parentId: undefined,
  webType: undefined,
  signer: undefined,
  action: undefined,
  source: undefined,
  keyword: undefined,
  format: undefined,   // only one allowed
  activity: undefined, // only one allowed
  limit: 12,
  timeout: 10000,
  short: true,
  smartUrl: true,
  // baseUrl: undefined,
};

args.forEach(arg => {
  if (
    arg === "--no-smart-url" ||
    arg === "--noSmartUrl" ||
    arg === "--dumbUrl" ||
    arg === "--dumb-url" ||
    arg === "--normalUrl" ||
    arg === "--normal-url"||
    arg === "--unchangedUrl" ||
    arg === "--unchanged-url"
  ) {
    config.smartUrl = false
  } else if (
    arg === "--smart-url" ||
    arg === "--smartUrl"
  ) {
    config.smartUrl = true
  }
})

// Iterate through arguments to populate config
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg.startsWith('--')) {
    // Get flag name without value
    const flagName = arg.slice(2).split('=')[0];
    // Get value if '=' present
    let value = arg.includes('=') ? arg.split('=')[1] : undefined;

    // Special handling for --url which can accept multiple values
    if (flagName === 'url') {
      let val = ""
      if (value) {
        val = value
      } else if (args[i + 1] && !args[i + 1].startsWith('--')) {
        val = args[++i]
      }
      if (val && typeof(val) === "string") {
        if (config.smartUrl) {
          val = prependProtocol(val)
          val = appendApiEvents(val)
        }
        config.url = config.url || [];
        config.url.push(val.toLowerCase())
      }
      continue;
    }

    // Special handling for --full (boolean flag)
    if (flagName === 'full' || flagName === 'long') {
      config.short = false;
      continue;
    }

    if (flagName === 'short') {
      config.short = true;
      continue;
    }

    // Special handling for --timeout (numbers)
    if (flagName === 'timeout') {
      const parsed = parseInt(value || args[++i]);
      config[flagName] = isNaN(parsed) ? (config[flagName] || 11000) : parsed;
      continue;
    }

    // Special handling for --limit (numbers)
    if (flagName === 'limit') {
      const parsed = parseInt(value || args[++i]);
      config[flagName] = isNaN(parsed) ? (config[flagName] || 15) : parsed;
      continue;
    }

    if (flagName === "activity" || flagName === "format") {
      let val = value
      if (!val && (args[i + 1] && !args[i + 1].startsWith('--'))) {
        val = args[i + 1]
      }
      if (val) {config[flagName] = [val.toLowerCase()]}
      continue;
    }

    if (flagName === "web-type" || flagName === "webtype") {
      let val = value
      if (!val && (args[i + 1] && !args[i + 1].startsWith('--'))) {
        val = args[i + 1]
      }
      config.webType = config.webType || [];
      if (val) {config.webType.push(val.toLowerCase())}
      continue;
    }

    if (flagName === "parent-id" || flagName === "parentid") {
      let val = value
      if (!val && (args[i + 1] && !args[i + 1].startsWith('--'))) {
        val = args[i + 1]
      }
      config.parentId = config.parentId || [];
      if (val) {config.parentId.push(val.toLowerCase())}
      continue;
    }

    // Default handling: for all other flags, accumulate into an array
    if (value !== undefined) {
      config[flagName] = config[flagName] || [];
      config[flagName].push(value.toLowerCase()); // Push value into array
    } else if (args[i + 1] && !args[i + 1].startsWith('--')) {
      config[flagName] = config[flagName] || [];
      config[flagName].push(args[++i].toLowerCase()); // Push next argument if no '=' or space
    }
  }
}

// Validate URL presence
// if (config.url.length === 0) {
//     console.error('Error: --url is required');
//     process.exit(1);
// }

try {
  // TODO
  // const result = await spasm.fetchEvents(config);
  // console.log("result:", result);
  console.log("config:", config);
} catch (err) {
  console.error(err);
  process.exit(1);
}

function appendApiEvents(url) {
    try {
        if (
          url.endsWith(`${spasmApiPath}`) ||
          url.endsWith(`${spasmApiPath}/`)
        ) { return url }

        // Create a URL object to parse the input URL
        const parsedUrl = new URL(url);

        // Check if the pathname is empty or only contains "/"
        if (
          parsedUrl.pathname === '' || parsedUrl.pathname === '/' ||
          parsedUrl.pathname === '/?' || parsedUrl.pathname === '//'
        ) {
            // Append spasmApiPath if there's no existing path
            return `${parsedUrl.origin}${spasmApiPath}`;
        }

        // Return the URL unchanged if it has a longer path
        return url;
    } catch (error) {
        // Handle invalid URLs
        console.error("Invalid URL:", error);
        return url; // Return the original URL for invalid cases
    }
}

function prependProtocol(url) {
  try {
    // Define common protocols that should not be changed
    const protocols = ["http://", "https://", "ftp://", "spasm:", "nostr:", "mailto:"];

    // Check if the URL starts with any of the defined protocols
    for (const protocol of protocols) {
        if (url.startsWith(protocol)) {
            return url; // Return the original URL if it already has a protocol
        }
    }

    // Determine if the URL is an IPv4 address
    const isIPv4 = (url) => {
        const parts = url.split('/')[0].split('.'); // Isolate the base part before any path
        if (parts.length !== 4) return false;

        // Check if each part is a number between 0 and 255
        for (const part of parts) {
            const num = Number(part);
            if (isNaN(num) || num < 0 || num > 255) {
                return false;
            }
        }
        return true;
    };

    // Determine if the URL is an IPv6 address
    const isIPv6 = (url) => {
        const parts = url.split('/')[0].split(':');
        return parts.length >= 3
    };

    // Check if the URL is a valid IPv4 or IPv6 address
    if (url.startsWith("localhost")) {
        return `http://${url}`;
    } else if (isIPv4(url)) {
        return `http://${url}`; // Prepend http for IPv4 addresses
    } else if (isIPv6(url)) {
        return `http://${url}`; // Prepend http for IPv6 addresses
    }

    return `https://${url}`; // Prepend https for domain names
  } catch (err) {
    console.error(err);
    return url
  }
}

// Example usage:
// console.log(prependProtocol("example.com")); // https://example.com
// console.log(prependProtocol("192.168.1.1")); // http://192.168.1.1
// console.log(prependProtocol("192.168.1.1/path")); // http://192.168.1.1/path
// console.log(prependProtocol("localhost:3000")); // localhost:3000
// console.log(prependProtocol("fe80::1")); // http://fe80::1 (IPv6)
// console.log(prependProtocol("fe80::1/path")); // http://fe80::1/path (IPv6)
// console.log(prependProtocol("2620:fe::fe")); // http://2620:fe::fe (IPv6)
// console.log(prependProtocol("2001:4860:4860::8888")); // http://2001:4860:4860::8888
// console.log(prependProtocol("https://example.com")); // https://example.com
// console.log(prependProtocol("ftp://example-ftp.com")); // ftp://example.com
// console.log(prependProtocol("nostr:example-nostr.com")); // nostr:example.com
