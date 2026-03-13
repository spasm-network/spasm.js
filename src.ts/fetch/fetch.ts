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
  isObjectWithValues
} from "../utils/index.js";

export const fetchEvents = async (
  config: FetchEventsConfig
): Promise<string[] | null> => {
  if (!config) return null
  return null
}

export const fetchEventsFromUrl = async (
  url?: string,
  customConfig?: CustomConvertToSpasmConfig
): Promise<SpasmEventV2[] | string | null> => {
  return await fetchEventsFromSource(
    { apiUrl: url },
    customConfig
  )
}

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
    method?: 'GET' | 'POST';
    body?: Record<string, unknown>;
    timeout?: number;
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
