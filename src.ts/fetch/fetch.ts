import {
  CustomConvertToSpasmConfig,
  FetchEventsConfig,
  SpasmEventSource,
  SpasmEventV2
} from "./../types/interfaces.js";

import {
  convertRssFeedToSpasm
} from "./../convert/convertRssFeedToSpasm.js";
import {convertManyToSpasm} from "../convert/convertToSpasm.js";
import {
  isArrayWithValues,
  isObjectWithValues,
  isUrl,
  pushToArrayIfEventIsUnique
} from "../utils/index.js";

export const fetchEvents = async (
  fetchConfig: FetchEventsConfig
): Promise<string[] | null> => {
  if (!fetchConfig) return null
  if (!isObjectWithValues(fetchConfig)) return null
  if (!fetchConfig.url) return null
  const arr = Array.isArray(fetchConfig.url)
    ? fetchConfig.url : [fetchConfig.url]
  const urls = arr
    .filter(item => typeof item === 'string')
    .filter(item => isUrl(item))
    .map(item => item.toLowerCase())

  // TODO convert fetchConfig into query
  // Execute sequentially one by one
  for (const url of urls) {
    console.log("url:", url)
    // const result = await fetchEventsFromSource(fetchConfig)
    // TODO limit non-Spasm RSS feed response to "limit" val
  }
  
  return null
}

// Good for full Spasm and RSS URLs
export const fetchEventsFromUrls = async (
  url?: string | string[],
  customConfig?: CustomConvertToSpasmConfig
): Promise<(SpasmEventV2 | string)[] | string> => {
  if (!url) return "ERROR: no URL provided"
  try {
    const arr = Array.isArray(url) ? url : [url]
    const urls = arr
      .filter(item => typeof item === 'string')
      .filter(item => isUrl(item))
      .map(item => item.toLowerCase())

    const spasmEvents: SpasmEventV2[] = []

    const stringResponses: string[] = []

    const finalResponse: (SpasmEventV2 | string)[] = []

    for (const url of urls) {
      const urlObj = new URL(url)
      const source: SpasmEventSource = {}
      let hostname = ""
      if (
        urlObj.hostname && typeof(urlObj.hostname) === "string"
      ) {
        hostname = urlObj.hostname
      } else if (
        urlObj.host && typeof(urlObj.host) === "string"
      ) {
        hostname = urlObj.host
      }
      if (hostname && typeof(hostname) === "string") {
        if (hostname.startsWith("www.")) {
          hostname = hostname.slice(4)
        }
        source.name = hostname
      }
      if (
        urlObj.origin && urlObj.pathname &&
        typeof(urlObj.origin) === "string" &&
        typeof(urlObj.pathname) === "string"
      ) { source.apiUrl = urlObj.origin + urlObj.pathname }
      if (urlObj.search && typeof(urlObj.search) === "string") {
        source.query = urlObj.search
      }
      const response = await fetchEventsFromSource(
        source,
        customConfig
      )
      if (response && Array.isArray(response)) {
        response.forEach(event => {
          pushToArrayIfEventIsUnique(spasmEvents, event)
        })
      } else if (typeof(response) === "string") {
        stringResponses.push(`"${url}" response: ${response}`)
      } else if (!response) {
        stringResponses.push(`"${url}" didn't respond.`)
      }
    }
    finalResponse.push(...stringResponses)
    finalResponse.push(...spasmEvents)
    return finalResponse
  } catch (err) {
    console.error(err)
    return "ERROR: something went wrong in fetchEventsFromUrls"
  }
}

export const fetchEventsFromUrl = fetchEventsFromUrls

export const fetchEventsFromSource = async (
  source: SpasmEventSource,
  customConfig?: CustomConvertToSpasmConfig
): Promise<SpasmEventV2[] | string | null> => {
  if (!source) return "ERROR: no source provided"
  if (!source.apiUrl) return "ERROR: no API URL in Spasm source"

  try {
    let fetchUrl = source.apiUrl

    if (source.query) { fetchUrl += source.query }

    const result: SpasmEventV2[] | string = await makeRequest(
      fetchUrl,
      { method: 'GET', timeout: 10000 },
      source,
      customConfig
    )

    addSourceInfoToSpasmEvents(result, source)
    
    return result

  } catch (err) {
    const errorMsg = 'Fetching events failed for URL: ' + source.apiUrl
    console.error(errorMsg)
    return errorMsg
  }
}

async function makeRequest (
  url: string,
  options: {
    method?: 'GET' | 'POST'
    body?: Record<string, unknown>
    timeout?: number
  } = {},
  source: SpasmEventSource,
  customConfig?: CustomConvertToSpasmConfig
): Promise<SpasmEventV2[] | string> {
  const { method = 'GET', body, timeout = 10000 } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const fetchOptions: RequestInit = {
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
      throw new Error(`HTTP error! status: ${response?.status}`)
    }

    const contentType = response?.headers?.get('Content-Type')

    let responseData: SpasmEventV2[] | string = []

    if (response?.status === 200) {
      // Spasm feed
      if (contentType?.includes('application/json')) {
        const responseJson = await response.json()
        const spasmEvents: SpasmEventV2[] | null =
          convertManyToSpasm(responseJson, customConfig)
        if (spasmEvents && isArrayWithValues(spasmEvents)) {
          responseData = spasmEvents
        }
      // RSS feed
      } else if (
        contentType?.includes('application/rss+xml') ||
        contentType?.includes('application/atom+xml') ||
        contentType?.includes('application/xml') ||
        contentType?.includes('text/xml')
      ) {
        const responseText = await response.text()
        const spasmEvents: SpasmEventV2[] =
          await convertRssFeedToSpasm(responseText, source, customConfig)
        responseData = spasmEvents
      } else if (
        contentType?.includes('text/html')
      ) {
        responseData = "URL returned HTML page. Not logging it to save context."
      } else {
        // Fallback to text for other types
        const responseText = await response.text();
        if (responseText && typeof(responseText) === "string") {
          const length = responseText.length
          if (length > 255) {
            responseData =
              `${url} response length is ${length} chars. These are first 255 chars: ${responseText.slice(0,255)}`
          } else {
            responseData = responseText
          }
        }
      }
    } else {
      responseData =
        `${url} returned status: ${response?.status} with statusText: ${response?.statusText}`
    }

    return responseData

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`Request timed out after ${timeout}ms: ${url}`);
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId)
  }
}

const addSourceInfoToSpasmEvents = (
  events: SpasmEventV2[] | string,
  source: SpasmEventSource
): void => {
  if (!events || !Array.isArray(events)) return
  try {
    events.forEach(event => addSourceInfoToSpasmEvent(event, source))
  } catch (err) {
    console.error(err);
    return
  }
}

const addSourceInfoToSpasmEvent = (
  event: SpasmEventV2,
  source: SpasmEventSource
): void => {
  if (!event || !isObjectWithValues(event)) return
  if (event.type !== "SpasmEventV2") return
  if (!source) return
  if (!isObjectWithValues(source)) return
  try {
    event.source = source
  } catch (err) {
    console.error(err);
    return
  }
}
