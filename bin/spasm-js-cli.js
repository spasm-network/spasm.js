#!/usr/bin/env node
import * as spasm from './../lib.esm/index.js';

spasm.utilsStatus()

// Define a main function to handle the CLI logic
function main(args) {
    // Destructure to get the function name and remaining arguments
    const [functionName, ...otherArgs] = args;

    try {
        if (typeof spasm[functionName] !== 'function') {
            throw new Error(`Function ${functionName} does not exist in the package.`);
        }

        // TODO events will be passed as strings, so there are two options:
        // 1. Make sure that all convert() functions parse strings into JSON, e.g.:
        //    if (typeof(event) === "string") { event = JSON.parse(event) }
        //    Done:
        //    + convertRssFeedToSpasm()
        //    - convertToEventForSpasmid()
        //    - convertToNostr()
        //    - convertToRss()
        //    - convertToSpasm()
        //    - convertToSpasmEventDatabase()
        //    + convertToSpasmEventEnvelope()
        //    - convertToSpasmEventEnvelopeWithTree()
        // 2. Parse string in this script, but only allow calling convert functions.
        //    E.g., throw error if cannot convert an argument into JSON object.
        //    Spread the otherArgs into the function
        const result = spasm[functionName](...otherArgs);

        // Stringifying the result to display all nested values
        // in objects/arrays. Setting indentation to 2 improves
        // readability, but also significantly increases the
        // size of the output, which is bad for AI agents.
        // console.log('Result:', JSON.stringify(result, null, 2));
        // console.log('Result:', JSON.stringify(result, null, 0));

        console.log(JSON.stringify(result, (key, value) => {
          // Skip internal/debug fields
          // if (key.startsWith('siblings')) return undefined;
          if (key.startsWith('original')) return undefined;
          return value;
        }, 0));

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Check if the module is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    // At least the function name should be provided
    if (args.length < 1) {
        console.error('Usage: my-package-cli <functionName> <jsonData>');
        process.exit(1);
    }
    main(args);
}

// Export the main function for external use
export { main };
