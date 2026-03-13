"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventsFromSource = exports.fetchEventsFromUrl = exports.fetchEvents = void 0;
const convertRssFeedToSpasm_js_1 = require("./../convert/convertRssFeedToSpasm.js");
const convertToSpasm_js_1 = require("../convert/convertToSpasm.js");
const index_js_1 = require("../utils/index.js");
const fetchEvents = async (config) => {
    if (!config)
        return null;
    return null;
};
exports.fetchEvents = fetchEvents;
const fetchEventsFromUrl = async (url, customConfig) => {
    return await (0, exports.fetchEventsFromSource)({ apiUrl: url }, customConfig);
};
exports.fetchEventsFromUrl = fetchEventsFromUrl;
const fetchEventsFromSource = async (source, customConfig) => {
    if (!source)
        return "ERROR: no source provided";
    if (!source.apiUrl)
        return "ERROR: no API URL in Spasm source";
    try {
        let fetchUrl = source.apiUrl;
        if (source.query) {
            fetchUrl += source.query;
        }
        const result = await makeRequest(fetchUrl, { method: 'GET', timeout: 10000 }, source, customConfig);
        addSourceInfoToSpasmEvents(result, source);
        return result;
    }
    catch (err) {
        const errorMsg = 'Fetching events failed for URL: ' + source.apiUrl;
        console.error(errorMsg);
        return errorMsg;
    }
};
exports.fetchEventsFromSource = fetchEventsFromSource;
async function makeRequest(url, options = {}, source, customConfig) {
    const { method = 'GET', body, timeout = 10000 } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        };
        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }
        const response = await fetch(url, fetchOptions);
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const contentType = response?.headers?.get('Content-Type');
        let responseData = [];
        if (response?.status === 200) {
            // Spasm feed
            if (contentType?.includes('application/json')) {
                const responseJson = await response.json();
                const spasmEvents = (0, convertToSpasm_js_1.convertManyToSpasm)(responseJson, customConfig);
                if (spasmEvents && (0, index_js_1.isArrayWithValues)(spasmEvents)) {
                    responseData = spasmEvents;
                }
                // RSS feed
            }
            else if (contentType?.includes('application/rss+xml') ||
                contentType?.includes('application/atom+xml') ||
                contentType?.includes('application/xml') ||
                contentType?.includes('text/xml')) {
                const responseText = await response.text();
                const spasmEvents = await (0, convertRssFeedToSpasm_js_1.convertRssFeedToSpasm)(responseText, source, customConfig);
                responseData = spasmEvents;
            }
            else if (contentType?.includes('text/html')) {
                responseData = "URL returned HTML page. Not logging it to save context.";
            }
            else {
                // Fallback to text for other types
                const responseText = await response.text();
                if (responseText && typeof (responseText) === "string") {
                    const length = responseText.length;
                    if (length > 255) {
                        responseData =
                            `${url} response length is ${length} chars. These are first 255 chars: ${responseText.slice(0, 255)}`;
                    }
                    else {
                        responseData = responseText;
                    }
                }
            }
        }
        else {
            responseData =
                `${url} returned status: ${response?.status} with statusText: ${response?.statusText}`;
        }
        return responseData;
    }
    catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error(`Request timed out after ${timeout}ms: ${url}`);
            throw new Error(`Request timed out after ${timeout}ms`);
        }
        throw error;
    }
    finally {
        clearTimeout(timeoutId);
    }
}
const addSourceInfoToSpasmEvents = (events, source) => {
    if (!events || !Array.isArray(events))
        return;
    try {
        events.forEach(event => addSourceInfoToSpasmEvent(event, source));
    }
    catch (err) {
        console.error(err);
        return;
    }
};
const addSourceInfoToSpasmEvent = (event, source) => {
    if (!event || !(0, index_js_1.isObjectWithValues)(event))
        return;
    if (event.type !== "SpasmEventV2")
        return;
    if (!source)
        return;
    if (!(0, index_js_1.isObjectWithValues)(source))
        return;
    try {
        event.source = source;
    }
    catch (err) {
        console.error(err);
        return;
    }
};
//# sourceMappingURL=fetch.js.map