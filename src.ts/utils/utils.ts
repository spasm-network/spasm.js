/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
import { sha256 } from "js-sha256-v0"
import { ethers } from "ethers-v6";
import {
  toBeHex, toBeNpub
} from './../utils/index.js';
import * as DOMPurify from "isomorphic-dompurify-v2";

import {
  UnknownPostOrEvent, UnknownEvent, NostrSpasmEvent,
  NostrSpasmEventSignedOpened, NostrSpasmVersion,
  LinkObject,
  SpasmEventIdFormatV2,
  SpasmEventAddressFormatV2,
  SpasmEventSignatureFormatV2,
  SpasmEventV2,
  SpasmEventAuthorV2,
  SpasmEventBodyHostV2,
  SpasmEventMediaV2,
  SpasmEventIdV2,
  SpasmEventHashV2,
  SpasmEventLinkV2,
  SpasmEventBodyReferenceV2,
  SpasmEventAddressV2,
  SpasmEventBodyParentV2,
  ConvertToSpasmConfig,
  CustomConvertToSpasmConfig,
  CustomSanitizationConfig,
  SanitizationConfig,
  UnknownEventV2,
  SpasmEventStatV2,
  SpasmEventChildV2,
  SpasmEventAddressFormatNameV2,
  NostrEventSignedOpened,
  NostrEvent,
  SpasmEventIdFormatNameV2,
  ConvertToRssConfig,
  CustomConvertToRssConfig,
  CustomGenerateRssFeedConfig,
  GenerateRssFeedConfig,
  PostSignature,
  CustomFunctionType
} from "./../types/interfaces.js"

import { convertToSpasm } from "./../convert/convertToSpasm.js"

// Filter out undefined, null, 0, '', false, NaN, {}, []
// Keep {a: null}, {b: undefined}
// Examples:
// hasValue() // false
// hasValue(undefined)) // false
// hasValue(null) // false
// hasValue(0) // false
// hasValue('') // false
// hasValue(false) // false
// hasValue(NaN) // false
// hasValue([]) // false
// hasValue({}) // false
// hasValue({a:null}) // true
// hasValue({b:undefined}) // true
// hasValue({c:1}) // true
// hasValue(new Date()) // true
// hasValue([0]) // false
// hasValue([null]) // false
// hasValue([undefined]) // false
// hasValue([[undefined], [0], [null, NaN], '']) // false
// hasValue([[undefined], [0], [null, 1], '']) // true
// hasValue([[undefined], 1, [null, NaN], '']) // true
// hasValue([[null], 0, [true, NaN]]) // true
// hasValue([[null], 0, ['hello', NaN]]) // true
export const hasValue = (el?: any) => {
  // Filter out undefined, null, 0, '', false, NaN
  if (!el) return false

  // Filter out an empty object
  if (
    el // <- null and undefined check
    && Object.keys(el).length === 0
    && Object.getPrototypeOf(el) === Object.prototype
  ) {return false}

  // Filter out an empty array
  if (Array.isArray(el) && !el?.length) {return false}

  // Recursively check for at least one value inside an array
  if (Array.isArray(el) && el?.length) {
    let hasAtLeastOneValue: boolean = false
    // For of is used instead of forEach to break from
    // the loop once at least one element has value.
    for (const e of el) {
      if (hasValue(e)) {
        hasAtLeastOneValue = true
        break
      }
    }

    if (hasAtLeastOneValue) {
      return true
    } else {
      // console.error("ERROR. There are no values in the array", el)
      return false
    }
  }

  return true
}

export const isStringOrNumber = (val: any): boolean => {
  if (!val && val !== 0) return false
  if (typeof(val) === "string") return true
  if (typeof(val) === "number") return true
  return false
}

export const isNumberOrString = isStringOrNumber
export const ifStringOrNumber = isStringOrNumber
export const ifNumberOrString = isStringOrNumber

export const isObjectWithValues = (val: any): boolean => {
  if (!val) return false
  if (Array.isArray(val)) return false
  if (typeof(val) !== "object") return false
  if (Object.keys(val).length === 0) return false

  return true
}

export const isArrayWithValues = (array: any): boolean => {
  if (!array) return false
  if (!Array.isArray(array)) return false
  if (!hasValue(array)) return false
  return true
}

export const isArrayOfStrings = (array: any): boolean => {
  if (!array) return false
  if (!Array.isArray(array)) return false
  if (
    array.length > 0 &&
    array.every(element => typeof(element) === "string")
  ) {
    return true
  }
  return false
}

export const isArrayOfNumbers = (array: any): boolean => {
  if (!array) return false
  if (!Array.isArray(array)) return false
  if (
    array.length > 0 &&
    array.every(element => typeof(element) === "number")
  ) {
    return true
  }
  return false
}

export const isArrayOfStringsOrNumbers = (array: any): boolean => {
  if (!array) return false
  if (!Array.isArray(array)) return false
  if (
    array.length > 0 &&
    array.every(element =>
      typeof(element) === "string" ||
      typeof(element) === "number"
    )
  ) {
    return true
  }
  return false
}

export const isArrayOfNumbersOrStrings =
  isArrayOfStringsOrNumbers

export const extractVersion = (
  versionString: string
): string => {
  if (
    !versionString ||
    typeof(versionString) !== "string"
  ) return ""

  if (versionString.startsWith("dmp_v")) {
    return versionString.substring(5)
  }

  return ""
}

export const extractSealedEvent = (
  unknownPostOrEvent: UnknownPostOrEvent
): UnknownEvent | false => {
  if (!isObjectWithValues(unknownPostOrEvent)) return false

  let signedObject: UnknownEvent | false = false

  if (
    unknownPostOrEvent &&
    typeof(unknownPostOrEvent) === "object" &&
    'signed_message' in unknownPostOrEvent &&
    unknownPostOrEvent['signed_message'] &&
    typeof(unknownPostOrEvent['signed_message'] === "string")
  ) {
    signedObject = JSON.parse(unknownPostOrEvent['signed_message'])

  } else if (
    unknownPostOrEvent &&
    typeof(unknownPostOrEvent) === "object" &&
    'signedString' in unknownPostOrEvent &&
    unknownPostOrEvent['signedString'] &&
    typeof(unknownPostOrEvent['signedString'] === "string")
  ) {
    signedObject = JSON.parse(unknownPostOrEvent['signedString'])
  }

  return signedObject
}

/**
 * Converts value to a consistent timestamp across all platforms.
 * Input time value can be string, number, or Date object.
 * returns Consistent timestamp in milliseconds or undefined.
 */
export const toBeTimestamp = (
  originalTime: any
): number | undefined => {
  if (!originalTime) return undefined
  let time = Number(originalTime)
    ? Number(originalTime)
    : originalTime

  // First, normalize the input to a Date object
  let date: Date

  // Handle numeric inputs (timestamps or years)
  if (
    typeof time === 'number' &&
    !isNaN(time) &&
    Number.isSafeInteger(time)
  ) {
    date = new Date(time);
    
    if (!isValidDate(date)) {
      return undefined
    }
  } 
  // Handle string inputs
  else if (typeof time === 'string') {
    try {
      // Try parsing with timezone specification
      date = new Date(`${time} GMT`)
      
      // Fallback to standard parsing if needed
      if (!isValidDate(date)) {
        date = new Date(time)
        if (!isValidDate(date)) {
          return undefined
        }
      }
    } catch (err) {
      return undefined
    }
  } 
  // Handle Date objects
  else if (time instanceof Date) {
    date = time
    
    if (!isValidDate(date)) {
      return undefined
    }
  } 
  // Invalid input type
  else {
    return undefined
  }

  // Always use UTC for consistency
  return isValidDate(date) ? date.getTime() : undefined
}

const isValidDate = (date: Date): boolean => {
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    Number.isFinite(date.getTime())
  )
}

/*
export const toBeTimestamp = (time: any): number | undefined => {
 let date = new Date(time);
 let timestamp = date.getTime();

  // Check if the timestamp is NaN, indicating an invalid date
  if (Number.isNaN(timestamp)) {
    if (Number(time)) {
      date = new Date(Number(time))
      timestamp = date.getTime()
      if (Number(timestamp)) {
        return timestamp
      }
    }
    return undefined;
  }

  // Optional
  // Standardize the timestamp to 10 characters (seconds)
  // by rounding down the timestamp to the nearest second.
  // if (timestamp.toString().length > 10) {
  //   timestamp = Math.floor(timestamp / 1000) * 1000;
  // }

 return timestamp;
}
*/

// Nostr relays only accept 10 digits long timestamps
export const toBeShortTimestamp = (
  value: string | number
): number | undefined => {
  if (!value || !isStringOrNumber) return undefined
  let timestamp = toBeTimestamp(value)
  if (!timestamp) return undefined
  if (String(timestamp) && String(timestamp).length === 13) {
    const str = String(timestamp)
    if (str && str.slice(0,10)) {
      const shortStr = str.slice(0,10)
      if (Number(shortStr)) { return Number(shortStr) }
    }
  } else if (
    String(timestamp) && String(timestamp).length === 10
  ) { return timestamp }
  return undefined
}

export const toBeLongTimestamp = (
  value: string | number
): number | null => {
  if (!value || !isStringOrNumber) return null
  let timestamp = toBeTimestamp(value)
  if (!timestamp) return null
  // Some timestamps are 10 digits long, so we
  // need to standardize them to 13 digits
  if (String(timestamp) && String(timestamp).length === 10) {
    timestamp = timestamp * 1000;
  }
  if (
    timestamp && typeof(timestamp) === "number" &&
    String(timestamp) && String(timestamp).length >= 13
  ) {
    return timestamp
  } else {
    return null
  }
}

export const toBeFullTimestamp = toBeLongTimestamp
export const toBeStandardizedTimestamp = toBeShortTimestamp
export const toBeStandardTimestamp = toBeShortTimestamp
export const toBeNostrTimestamp = toBeShortTimestamp

export const toBeDate = (
  value: string | number,
  format: "full" | "long" | "medium" | "short" = "full"
): string | null => {
  if (!value || !isStringOrNumber) return null
  let fullTimestamp = toBeFullTimestamp(value)
  if (fullTimestamp && isStringOrNumber(fullTimestamp)) {
    const date = new Date(fullTimestamp).toUTCString()
    if (date && typeof(date) === "string") {
      if (format === "full") {
        return date
      } else if (format === "long") {
        return date.slice(5,25)
      } else if (format === "medium") {
        return date.slice(5,22)
      } else if (format === "short") {
        return date.slice(5,16)
      }
    }
  }
  return null
}

export const toBeDateFull = (val: string | number) => {
  return toBeDate(val, "full")
}

export const toBeFullDate = toBeDateFull

export const toBeDateLong = (val: string | number) => {
  return toBeDate(val, "long")
}

export const toBeLongDate = toBeDateLong

export const toBeDateShort = (val: string | number) => {
  return toBeDate(val, "short")
}

export const toBeShortDate = toBeDateShort

export const getNostrSpasmVersion = (
  event: NostrSpasmEvent | NostrSpasmEventSignedOpened,
): NostrSpasmVersion | null => {
  let nostrSpasmVersion: NostrSpasmVersion | null = null

  if (
    event.tags && Array.isArray(event.tags)
  ) {
    event.tags.forEach(function (tag) {
      if (
        Array.isArray(tag) && tag[0] === "nostr_spasm_version"
      ) {
        nostrSpasmVersion = tag[1]
      } else if (
        Array.isArray(tag) && tag[0] === "spasm_version"
      ) {
        nostrSpasmVersion = tag[1]
      }
    })
  }
  return nostrSpasmVersion
}

// Example usage
// getSchemeFromUrl('https://example.com/news') // return 'https'
// getSchemeFromUrl('http://example.com') // return 'http'
// getSchemeFromUrl('ftp://example.com') // return 'ftp'
// getSchemeFromUrl('mailto://...') // return 'mailto'
// getSchemeFromUrl('ipfs://123abc') // return 'ipfs'
// export const getSchemeFromUrl = (url: any) => {
//   if (!url || typeof(url) !== "string") return ""
//   try {
//     const urlObject = new URL(url);
//     return urlObject.protocol.slice(0, -1); // Remove the trailing colon
//   } catch (error) {
//     console.log('Invalid URL:', url);
//     return "";
//   }
// }

export const isValidUrl = (value?: any): boolean => {
  if (!value) return false
  try { 
      // new URL() constructor is less vulnerable to ReDoS attacks
      // because it's a built-it JS function that doesn't use regex
      new URL(value); 
      return true; 
  }
  catch(e) { 
      return false; 
  }
}

export const isUrl = isValidUrl

export const createLinkObjectFromUrl = (
  url: any,
  key?: any
): LinkObject | null => {
  if (!url || typeof(url) !== "string") return null

  try {
    const urlObject = new URL(url);

    const linkObject: LinkObject = {
      value: url,
      // protocol: urlObject.protocol.slice(0, -1),
      // host: urlObject.host,
      // path: urlObject.pathname,
      // search: urlObject.search,
    }

    if (urlObject.protocol) {
      linkObject.protocol = urlObject.protocol.slice(0, -1)
    }

    if (urlObject.origin) {
      linkObject.origin = urlObject.origin
    }

    if (urlObject.host) {
      linkObject.host = urlObject.host
    }

    if (
      urlObject.pathname &&
      typeof(urlObject.pathname) === "string" // &&
      // urlObject.pathname.length > 1
    ) {
      linkObject.pathname = urlObject.pathname
    }

    if (
      urlObject.search &&
      typeof(urlObject.search) === "string" // &&
      // urlObject.search.length > 1
    ) {
      linkObject.search = urlObject.search
    }

    if (urlObject.port) {
      linkObject.port = urlObject.port
    }

    if (urlObject.hash) {
      linkObject.hash = urlObject.hash
    }

    if (
      key &&
      (typeof(key) === "string" || typeof(key) === "number")
    ) {
      linkObject.originalProtocolKey = key
    }

    return linkObject

  } catch (error) {
    // console.log('Invalid URL:', url);
    return null;
  }
}

export const getFormatFromValue = (
  value?: string | number
): SpasmEventIdFormatV2 | SpasmEventSignatureFormatV2 | null => {
  let format: SpasmEventIdFormatV2 | undefined =
    undefined

  if (!value) return null
  if (typeof(value) !== "string" && typeof(value) !== "number") {
    return null
  }

  if (typeof(value) === "number") {
    return format = { name: "number" }
  }

  if (value && typeof(value) === "string") {

    // Spasm ID
    if (value.length === 64 + 9 && value.startsWith("spasmid")) {
      const version = value.slice(7,9)
      format = { name: "spasmid", version: version }
      return format
    }

    // Dmp ID (ethereum signature)
    if (
      value.length === 132 && value.startsWith("0x") &&
      typeof(value) === "string" && isHex(value.slice(2))
    ) {
      format = { name: "ethereum-sig" }
      return format
    }

    // Dmp ID (nostr signature)
    if (
      value.length === 128 && isHex(value)
    ) {
      format = { name: "nostr-sig" }
      return format
    }

    // Nostr ID
    if (value.length === 63 && value.startsWith("note")) {
      format = { name: "nostr-note" }
      return format
    }

    if (value.length === 68 && value.startsWith("nevent")) {
      format = { name: "nostr-nevent" }
      return format
    }

    // Spasm signer
    // if (address.length === 64 + 9 && address.startsWith("spasmer")) {
    //   const version = address.slice(7,9)
    //   format = { name: "spasmer", version: version }
    //   return format
    // }

    // Ethereum signer
    if (value.length === 42 && value.startsWith("0x")) {
      format = { name: "ethereum-pubkey" }
      return format
    }

    // Nostr signer
    if (value.length === 63 && value.startsWith("npub")) {
      format = { name: "nostr-npub" }
      return format
    }

    // url
    if (isValidUrl(value)) {
      format = { name: "url" }
      return format
    }

    if (
      value.length === 64 &&
      !value.startsWith("note") &&
      !value.startsWith("nevent") &&
      !value.startsWith("npub")
    ) {
      format = { name: "nostr-hex" }
      return format
    }

  }

  if (typeof(value) === "string") {
    return format = { name: "string" }
  }

  if (!format) return null
  return format
}

export const getFormatFromId = (
  id: string | number
): SpasmEventIdFormatV2 | null => {
  return getFormatFromValue(id) as SpasmEventIdFormatV2 | null
}

export const getFormatFromAddress = (
  address: string | number
): SpasmEventAddressFormatV2 | null => {
  return getFormatFromValue(address) as SpasmEventAddressFormatV2 | null
}

export const getFormatFromSignature = (
  address: string | number
): SpasmEventSignatureFormatV2 | null => {
  return getFormatFromValue(address) as SpasmEventSignatureFormatV2 | null
}

export const extractIdFormatNameFromSpasmEventIdV2 = (
  id: SpasmEventIdV2
): SpasmEventIdFormatNameV2 | null => {
  if (!id) return null
  if (typeof(id) !== "object") return null
  if (
    id &&
    'format' in id && id.format &&
    'name' in id.format && id.format.name &&
    typeof(id.format.name) === "string"
  ) { return id.format.name }
  return null
}

export const extractAllIdFormatNamesFromSpasmEventV2 = (
  originalEvent: SpasmEventV2
): (SpasmEventIdFormatNameV2)[] | null => {
  const spasmEventV2: SpasmEventV2 | null =
    toBeSpasmEventV2(originalEvent)
  if (!spasmEventV2 || !isObjectWithValues(spasmEventV2)) {
    return null
  }
  if (
    'ids' in spasmEventV2 && spasmEventV2.ids &&
    isArrayWithValues(spasmEventV2.ids)
  ) {
    const formatNames: SpasmEventIdFormatNameV2[] = []
    spasmEventV2.ids?.forEach(id => {
      const formatName =
        extractIdFormatNameFromSpasmEventIdV2(id)
      if (formatName && typeof(formatName) === "string") {
        formatNames.push(formatName)
      }
    })
    return formatNames
  }
  return null
}

export const getAllFormatNamesFromSpasmEventV2 =
  extractAllIdFormatNamesFromSpasmEventV2

export const getAllFormatNamesFromEvent =
  getAllFormatNamesFromSpasmEventV2

export const getHashOfString = (
  string: string,
  algorithm = "sha256"
): string => {
  if (typeof(string) !== "string") return ""

  if (algorithm === "sha256") {
    return sha256(string)
  }

  return ""
}

// Keep only specified keys in an object.
export const keepTheseKeysInObject = (
  obj: Record<string, any>, keys: string[]
): Partial<Record<string, any>> | null => {
  if (!obj) return null
  if (typeof(obj) !== "object") return null
  if (Array.isArray(obj)) return null
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

// Keep only specified keys in each object of an array.
export const keepTheseKeysInObjectsInArray = (
  array: Record<string, any>[], keys: string[]
): Partial<(Record<string, any> | null)[]> | null => {
  if (!Array.isArray(array)) return null
  return array.map(obj => keepTheseKeysInObject(obj, keys));
}

// This function only sorts string and number values.
export const sortArrayOfStringsAndNumbers = (
  array: any[]
): any[] => {
  if (
    !array ||
    !Array.isArray(array) ||
    !array[0]
  ) { return [] }
  // Separate values into valid and invalid categories.
  const {
    validValues, invalidValues
  } = array.reduce<{
    validValues: any[]; invalidValues: any[];
  }>(
    (acc, value) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number'
      ) {
        acc.validValues.push(value)
      } else {
        acc.invalidValues.push(value)
      }
      return acc
    },
    { validValues: [], invalidValues: [] }
  )

  // Sort the valid values
  const sortedValidValues = validValues.sort(
    (a, b) => String(a).localeCompare(String(b))
  )

  // Combine sorted valid values with invalid values
  const result = [...sortedValidValues,...invalidValues]

  return result
}

export const sortArrayOfObjects = (
  objects: any[],
  sortBy: string | string[] = ["id"]
): any[] => {
  if (
    !objects ||
    !Array.isArray(objects) ||
    !objects[0]
  ) {
    return []
  }
  // Ensure sortBy is always treated as an array
  const sortedBy = Array.isArray(sortBy)? sortBy : [sortBy]

  // Separate objects into valid and invalid categories based
  // on the existence of the specified property(ies)
  const {
    validObjects, invalidValues
  } = objects.reduce<{
    validObjects: SpasmEventV2[]; invalidValues: any[];
  }>(
    (acc, item) => {
      let isValid: boolean = false

      // Only one prop should exist in item in order
      // to make it a valid item.
      sortedBy.forEach((key) => {
        if (
          typeof(item) === 'object' && item &&
          key in item && item[key] &&
          (
            typeof(item[key]) === "string" ||
            typeof(item[key]) === "number"
          )
        ) {
          isValid = true
        }
      })

      if (isValid) {
          acc.validObjects.push(item as SpasmEventV2);
      } else {
          acc.invalidValues.push(item);
      }
      return acc;
    },
    { validObjects: [], invalidValues: [] }
  );

  // Sort the valid objects by the specified property(ies)
  const sortedValidObjects = validObjects.sort((a, b) => {
    for (const key of sortedBy) {
      const aValue =
        typeof a[key] === 'string'? a[key] : String(a[key]);
      const bValue =
        typeof b[key] === 'string'? b[key] : String(b[key]);
      const compareResult = aValue.localeCompare(bValue);
      if (compareResult!== 0) {
          return compareResult;
      }
    }
    return 0; // Equal
  });

  const sortedInvalidValues = sortArrayOfStringsAndNumbers(
    invalidValues
  )

  // Combine sorted valid objects with invalid objects
  const result = [...sortedValidObjects, ...sortedInvalidValues]

  return result;
}

export const sortAuthorsForSpasmEventV2 = (
  authors: SpasmEventAuthorV2[],
): SpasmEventAuthorV2[] => {
  if (
    !authors ||
    !Array.isArray(authors) ||
    !authors[0]
  ) { return [] }

  // Clean and sort addresses
  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'addresses' in author && author.addresses &&
      Array.isArray(author.addresses) &&
      author.addresses[0]
    ) {
      // Clean addresses to keep only  'value' and 'format' keys
      // and remove 'verified' and 'hosts' keys.
      author.addresses = keepTheseKeysInObjectsInArray(
        author.addresses, ["value", "format"]
      ) as SpasmEventAddressV2[]

      // Sort addresses
      author.addresses = sortArrayOfObjects(
        author.addresses, "value"
      )
    }
  })

  // Clean and sort usernames
  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'usernames' in author && author.usernames &&
      Array.isArray(author.usernames) &&
      author.usernames[0]
    ) {
      // There is no need to clean usernames because all fields
      // should be calculated for the Spasm ID 01.

      // Sort usernames
      author.usernames = sortArrayOfObjects(
        author.usernames, "value"
      )
    }
  })


  let authorsWithAddress: SpasmEventAuthorV2[] = []
  // Authors without address are used temporary until we split
  // them further depending on whether they have usernames.
  let authorsWithoutAddress: any[] = []
  let authorsWithoutAddressWithUsername: SpasmEventAuthorV2[] = []
  let authorsWithoutAddressWithoutUsername: any[] = []

  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'addresses' in author && author.addresses &&
      Array.isArray(author.addresses) && author.addresses[0] &&
      author.addresses[0].value &&
      (
        typeof(author.addresses[0].value) === "string" ||
        typeof(author.addresses[0].value) === "number"
      )
    ) {
      authorsWithAddress.push(author)
    } else {
      authorsWithoutAddress.push(author)
    }
  })

  authorsWithoutAddress.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'usernames' in author && author.usernames &&
      Array.isArray(author.usernames) && author.usernames[0] &&
      author.usernames[0].value &&
      (
        typeof(author.usernames[0].value) === "string" ||
        typeof(author.usernames[0].value) === "number"
      )
    ) {
      authorsWithoutAddressWithUsername.push(author)
    } else {
      authorsWithoutAddressWithoutUsername.push(author)
    }
  })

  // Sort all 3 arrays
  const sortedAuthorsWithAddress: SpasmEventAuthorV2[] =
    sortArrayOfObjectsByKeyValue(
      authorsWithAddress, "addresses"
  ) as SpasmEventAuthorV2[]

  const sortedAuthorsWithoutAddressWithUsername: SpasmEventAuthorV2[] =
    sortArrayOfObjectsByKeyValue(
      authorsWithoutAddressWithUsername, "usernames"
  ) as SpasmEventAuthorV2[]

  const sortedAuthorsWithoutAddressWithoutUsername: any[] =
    sortArrayOfObjects(
      authorsWithoutAddressWithoutUsername, ["id"]
  )

  const result = [
    ...sortedAuthorsWithAddress,
    ...sortedAuthorsWithoutAddressWithUsername,
    ...sortedAuthorsWithoutAddressWithoutUsername
  ]

  return result
}

export const sortAuthorsForSpasmid01 = sortAuthorsForSpasmEventV2

export const sortArrayOfObjectsByKeyValue = (
  objects: SpasmEventAuthorV2[] | SpasmEventMediaV2[],
  key: string
): any[] => {
  const sortedObjects = objects.sort((a: any, b: any) => {
    let aValue = ""
    let bValue = ""

    if (
      a[key] && a[key][0] &&
      a[key][0].value
    ) {
      if (typeof(a[key][0].value) === 'string') {
        aValue = a[key][0].value
      } else if ( typeof(a[key][0].value) === 'number') {
        aValue = String(a[key][0].value);
      }
    }

    if (
      b[key] && b[key][0] &&
      b[key][0].value
    ) {
      if (typeof(b[key][0].value) === 'string') {
        bValue = b[key][0].value
      } else if ( typeof(b[key][0].value) === 'number') {
        bValue = String(b[key][0].value);
      }
    }

    const compareResult = aValue.localeCompare(bValue);
    if (compareResult!== 0) {
        return compareResult;
    }

    return 0; // Equal
  });

  return sortedObjects
}

export const sortHostsForSpasmEventV2 = (
  hosts: SpasmEventBodyHostV2[],
): SpasmEventBodyHostV2[] => {
  if (
    !hosts ||
    !Array.isArray(hosts) ||
    !hosts[0]
  ) {
    return hosts
  }

  const sortedHosts: SpasmEventBodyHostV2[] =
    sortArrayOfObjects(
    hosts, "value"
  )
  return sortedHosts
}

export const sortHostsForSpasmid01 = sortHostsForSpasmEventV2

export const sortLinksForSpasmEventV2 = sortHostsForSpasmEventV2

export const sortLinksForSpasmid01 = sortLinksForSpasmEventV2

export const sortMediasForSpasmid01 = (
  medias: any,
): SpasmEventMediaV2[] => {

  if (!medias || !Array.isArray(medias)) return []

  // Clean and sort IDs
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'ids' in media && media.ids &&
      Array.isArray(media.ids) &&
      media.ids[0]
    ) {
      // Clean ids to keep only  'value' key
      media.ids = keepTheseKeysInObjectsInArray(
        media.ids, ["value"]
      ) as SpasmEventIdV2[]

      // Sort ids
      media.ids = sortArrayOfObjects(
        media.ids, "value"
      )
    }
  })

  // Clean and sort hashes
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'hashes' in media && media.hashes &&
      Array.isArray(media.hashes) &&
      media.hashes[0]
    ) {
      // Clean hashes to keep only  'value' key
      media.hashes = keepTheseKeysInObjectsInArray(
        media.hashes, ["value"]
      ) as SpasmEventHashV2[]

      // Sort hashes
      media.hashes = sortArrayOfObjects(
        media.hashes, "value"
      )
    }
  })

  // Clean and sort links
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'links' in media && media.links &&
      Array.isArray(media.links) &&
      media.links[0]
    ) {
      // Clean links to keep only  'value' key
      media.links = keepTheseKeysInObjectsInArray(
        media.links, ["value"]
      ) as SpasmEventLinkV2[]

      // Sort links
      media.links = sortArrayOfObjects(
        media.links, "value"
      )
    }
  })

  // mediasWithIds might also have hashes and links
  let mediasWithIds: SpasmEventMediaV2[] = []
  let mediasWithoutIds: any[] = []
  // mediasWithHashes might also have links, but no ids
  let mediasWithHashes: SpasmEventMediaV2[] = []
  let mediasWithoutIdsHashes: any[] = []
  // mediasWithLinks only has links, but no ids and hashes
  let mediasWithLinks: SpasmEventMediaV2[] = []
  let mediasWithoutIdsHashesLinks: any[] = []

  // Sort medias by ids
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'ids' in media && media.ids &&
      Array.isArray(media.ids) && media.ids[0] &&
      media.ids[0].value &&
      (
        typeof(media.ids[0].value) === "string" ||
        typeof(media.ids[0].value) === "number"
      )
    ) {
      mediasWithIds.push(media)
    } else {
      mediasWithoutIds.push(media)
    }
  })

  // Sort medias by hashes
  mediasWithoutIds.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'hashes' in media && media.hashes &&
      Array.isArray(media.hashes) && media.hashes[0] &&
      media.hashes[0].value &&
      (
        typeof(media.hashes[0].value) === "string" ||
        typeof(media.hashes[0].value) === "number"
      )
    ) {
      mediasWithHashes.push(media)
    } else {
      mediasWithoutIdsHashes.push(media)
    }
  })

  // Sort medias by links
  mediasWithoutIdsHashes.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'links' in media && media.links &&
      Array.isArray(media.links) && media.links[0] &&
      media.links[0].value &&
      (
        typeof(media.links[0].value) === "string" ||
        typeof(media.links[0].value) === "number"
      )
    ) {
      mediasWithLinks.push(media)
    } else {
      mediasWithoutIdsHashesLinks.push(media)
    }
  })

  const mediasOther: any[] = mediasWithoutIdsHashesLinks

  // Sort all 3 arrays
  const sortedMediasWithIds: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithIds, "ids"
  ) as SpasmEventMediaV2[]

  const sortedMediasWithHashes: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithHashes, "hashes"
  ) as SpasmEventMediaV2[]

  const sortedMediasWithLinks: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithLinks, "links"
  ) as SpasmEventMediaV2[]

  const sortedMediasOther: any[] =
    sortArrayOfObjects(mediasOther, ["id"])

  const result = [
    ...sortedMediasWithIds,
    ...sortedMediasWithHashes,
    ...sortedMediasWithLinks,
    ...sortedMediasOther
  ]

  return result
}

// Deprecated sortMediasForSpasmEventV2 because we only keep
// a 'value' key to calculate Spasm ID 01.
// export const sortMediasForSpasmid01 = sortMediasforSpasmEventV2

export const sortReferencesForSpasmid01 = (
  references: SpasmEventBodyReferenceV2[]
): SpasmEventBodyReferenceV2[] => {

  if (!references || !Array.isArray(references)) return []

  // Clean and sort IDs
  references.forEach(reference => {
    if (
      reference && typeof(reference) === "object" &&
      'ids' in reference && reference.ids &&
      Array.isArray(reference.ids) &&
      reference.ids[0]
    ) {
      // Clean ids to keep only  'value' key
      reference.ids = keepTheseKeysInObjectsInArray(
        reference.ids, ["value"]
      ) as SpasmEventIdV2[]

      // Sort ids
      reference.ids = sortArrayOfObjects(
        reference.ids, "value"
      )
    }
  })

  // Sort references based on IDs
  const sortedReferences: SpasmEventBodyReferenceV2[] =
    sortArrayOfObjectsByKeyValue(
      references, "ids"
  ) as SpasmEventBodyReferenceV2[]

  return sortedReferences
}

export const sortParentForSpasmid01 = (
  parent: SpasmEventBodyParentV2
): SpasmEventBodyParentV2 => {

  if (!parent || typeof(parent) !== "object") return parent

  // Clean and sort IDs
  if (
    parent && typeof(parent) === "object" &&
    'ids' in parent && parent.ids &&
    Array.isArray(parent.ids) &&
    parent.ids[0]
  ) {
    // Clean ids to keep only 'value' key
    parent.ids = keepTheseKeysInObjectsInArray(
      parent.ids, ["value"]
    ) as SpasmEventIdV2[]

    // Sort ids
    parent.ids = sortArrayOfObjects(
      parent.ids, "value"
    )
  }

  return parent
}

export const sortTagsForSpasmid01 = (
  tags: any[][]
): any[][] => {

  if (!tags || !Array.isArray(tags)) return [[]]
 
 /**
  * Tags are an array of arrays (e.g., Nostr tags).
  * Each tag is an array with any number of elements.
  * Some tags will have the same one-letter first element,
  * so sorting by the first element is not a good approach.
  * Instead, the current sorting logic for spasmid01 is
  * to find the length of the longest tag array (e.g., 10),
  * and start sorting tags by the 10th element, then
  * by the 9th element, and continue until sorting is
  * done by the first element.
  *
  * Each tag is an array of values. However, values inside
  * each tag should not be sorted as it can affect the
  * intention of the event. For example, the order of an
  * element in a Nostr tag array has a meaning.
  */

  const sortTagsByElementNumber = (
    elementNumber: number = 0
  ): void => {
    tags = tags.sort((a, b) => {
      const key = elementNumber
      let aValue = ""
      let bValue = ""

      if (a[key]) {
        if (typeof(a[key]) === 'string') {
          aValue = a[key]
        } else if (typeof(a[key]) === 'number') {
          aValue = String(a[key])
        }
      }

      if (b[key]) {
        if (typeof(b[key]) === 'string') {
          bValue = b[key]
        } else if (typeof(b[key]) === 'number') {
          bValue = String(b[key])
        }
      }

      const compareResult = aValue.localeCompare(bValue);
      if (compareResult!== 0) {
          return compareResult;
      }

      return 0; // Equal
    });
  }

  let longestTagArrayLength = 1

  // Find the longest array (tag) to be used for sorting.
  tags.forEach(tag => {
    if (
      tag && Array.isArray(tag) &&
      tag.length > longestTagArrayLength
    ) {
      longestTagArrayLength = tag.length
    }
  })

  for (let i = longestTagArrayLength; i >= 0; i--) {
    sortTagsByElementNumber(i)
  }

  return tags
}

export const markSpasmEventAddressAsVerified = (
  spasmEvent: SpasmEventV2,
  verifiedAddress: string | number,
  version: string = "2.0.0"
): void => {
  if (!verifiedAddress) return
  if (version === "2.0.0") {
    if (spasmEvent.authors) {
      spasmEvent.authors.forEach(author => {
        if (author.addresses) {
          author.addresses.forEach(address => {
            if (address.value === verifiedAddress) {
              address.verified = true;
            }
          });
        }
      });
    }
  }
}


export const verifyEthereumSignature = (
  messageString: string,
  signature: string,
  signerAddress: string
): boolean => {
  try {
    if (signature && typeof (signature) === 'string') {
      const recoveredAddress = ethers.verifyMessage(
        messageString, signature
      )

      return recoveredAddress.toLowerCase() ===
        signerAddress.toLowerCase()
    }

    return false

  } catch (error) {
    return false
  }
}

export const utilsStatus = (): void => {
  console.log("spasm.js utils status: success")
}

export const executeFunctionForAllNestedValuesOfType = (
  originalItem: Object | any[],
  customConfig?: CustomSanitizationConfig
): void => {

  const defaultConfig = new SanitizationConfig()
  const config = mergeSanitizationConfigs(
    defaultConfig, customConfig || {}
  ) 

  const { customFunction, valueType, maxDepth } = config

  // Keep in mind that an array is of type "object" in typescript
  if (
    typeof(originalItem) !== "object" &&
    !Array.isArray(originalItem)
  ) {
    throw new Error("ERROR: There are no nested values because an item is not an object, nor an array.")
  }

  const seenItems = new Set()
  // Maximum recursion depth to prevent stack overflow
  const maxRecursionDepth = maxDepth ?? 10

  const executeRecursive = (
    currentItem: Object | any[],
    depth: number = 0
  ) => {
    if (depth > maxRecursionDepth) {
      throw new Error("Maximum recursion depth exceeded")
    }
    if (seenItems.has(currentItem)) return
    seenItems.add(currentItem)
    if (!currentItem) return

    // 1. Array
    if (Array.isArray(currentItem)) {
      currentItem.forEach((value, index) => {
        // 1.1. Exact data type match
        if (typeof(value) === valueType) {
          currentItem[index] = customFunction(value)
        }
        // 1.2. Array
        if (Array.isArray(value)) {
          executeRecursive(value, depth + 1)
        }
        // 1.3. Object
        if (isObjectWithValues(value)) {
          executeRecursive(value, depth + 1)
        }
        // 1.4. Other types
        // Do nothing

        return
      })
    }

    // 2. Object
    if (isObjectWithValues(currentItem)) {
      Object.keys(currentItem).forEach(key => {
        // 1.1. Exact data type match
        if (typeof currentItem[key] === valueType) {
          currentItem[key] = customFunction(currentItem[key]);
        }
        // 1.2. Array
        if (Array.isArray(currentItem[key])) {
          executeRecursive(currentItem[key], depth + 1)
        }

        // 1.3. Object
        if (isObjectWithValues(currentItem[key])) {
          executeRecursive(currentItem[key], depth + 1)
        }

        // 1.4. Other types
        // Do nothing

        return
      })
    }

    // 3. Other data types
    // Do nothing

    return
  }

  executeRecursive(originalItem)

  return
}

export const sanitizeEventWith = (
  originalItem: Object | any[],
  config?: CustomSanitizationConfig
): void => {
  try {
    executeFunctionForAllNestedValuesOfType(
      originalItem,
      config
    )
  } catch (error) {
    console.error("Sanitization failed", error)
    if (Array.isArray(originalItem)) {
      clearArray(originalItem)
    } else if ( isObjectWithValues(originalItem)) {
      clearObject(originalItem)
    }
  }
}

export const sanitizeStringWithDompurify = (
  val: any
): any => {
  if (typeof(val) === "string") {
    return DOMPurify.sanitize(val)
  }
  return val
}

export const sanitizeEventWithDompurify = (
  originalItem: Object | any[],
  config?: CustomSanitizationConfig
): void => {
  sanitizeEventWith(
    originalItem,
    config
  )
}

export const sanitizeEvent = sanitizeEventWithDompurify
export const sanitizeArray = sanitizeEventWithDompurify
export const sanitizeAnything = sanitizeEventWithDompurify

export const toLowerCaseIfValueIsString = (val: any) => {
  if (val && typeof(val) === "string") {
    const str = val.toLowerCase()
    if (str && typeof(str) === "string") {
      return str
    }
  }
  return val
}

export const toLowerCaseIfString = toLowerCaseIfValueIsString

export const toLowerCaseAllNestedStrings = (
  originalItem: Object | any[]
): void => {
  try {
    executeFunctionForAllNestedValuesOfType(
      originalItem,
      { customFunction: toLowerCaseIfString }
    )
  } catch (error) {
    console.error("toLowerCase failed", error)
    // Clearing is only used for sanitization,
    // to make sure that unsanitized values can pass
    // through in case of an error.
    // However, if lowercase fails, it's better
    // to keep the original values.
    // if (Array.isArray(originalItem)) {
    //   clearArray(originalItem)
    // } else if ( isObjectWithValues(originalItem)) {
    //   clearObject(originalItem)
    // }
  }
}

export const clearArray = (arr : any[]) => {
  arr.length = 0; // This clears the array
}

export const clearObject = (obj: Record<string, any>): void => {
  Object.keys(obj).forEach(key => {
    delete obj[key]
  })
}

type MergeObjectsHandleArrays = "overwriteArrays" | "mergeArrays"

export const mergeObjects = (
  defaultObject: Object,
  customObject: Object,
  handleArrays: MergeObjectsHandleArrays = "overwriteArrays",
  depth: number = 0
): Object => {
  const maxRecursionDepth = 50
  if (depth > maxRecursionDepth) {
    throw new Error("Maximum recursion depth exceeded")
  }

  if (
    !isObjectWithValues(defaultObject) &&
    !isObjectWithValues(customObject)
  ) return {}
  if (
    isObjectWithValues(defaultObject) &&
    !isObjectWithValues(customObject)
  ) return defaultObject
  if (
    !isObjectWithValues(defaultObject) &&
    isObjectWithValues(customObject)
  ) return customObject

  const mergedObject: Object = { ...defaultObject };

  for (const key in customObject) {
    const value = customObject[key]
    const defaultValue = defaultObject[key]
    if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value !== null
    ) {
      // If the value is an object, recursively merge it
      mergedObject[key] = mergeObjects(
        defaultValue, value, handleArrays, depth + 1
      )
    } else if (
      Array.isArray(value) &&
      hasValue(value) &&
      handleArrays === "mergeArrays"
    ) {
      mergedObject[key] =
        mergeArrays(defaultValue, value)
    } else if (
      value !== undefined
    ) {
      mergedObject[key] = value
    }
  }

  return mergedObject
}

export const mergeConfigs = (
  defaultConfig: ConvertToSpasmConfig,
  customConfig: CustomConvertToSpasmConfig,
  handleArrays: MergeObjectsHandleArrays = "overwriteArrays"
): ConvertToSpasmConfig => {
  const newConfig =
    mergeObjects(defaultConfig, customConfig, handleArrays)
  return newConfig as ConvertToSpasmConfig
}

export const mergeSanitizationConfigs = (
  defaultConfig: SanitizationConfig,
  customConfig: CustomSanitizationConfig,
  handleArrays: MergeObjectsHandleArrays = "overwriteArrays"
): SanitizationConfig => {
  const newConfig =
    mergeObjects(defaultConfig, customConfig, handleArrays)
  return newConfig as SanitizationConfig
}

export const mergeConvertToRssConfigs = (
  defaultConfig: ConvertToRssConfig,
  customConfig: CustomConvertToRssConfig,
  handleArrays: MergeObjectsHandleArrays = "overwriteArrays"
): ConvertToRssConfig => {
  const newConfig =
    mergeObjects(defaultConfig, customConfig, handleArrays)
  return newConfig as ConvertToRssConfig
}

export const mergeGenerateRssFeedConfigs = (
  defaultConfig: GenerateRssFeedConfig,
  customConfig: CustomGenerateRssFeedConfig,
  handleArrays: MergeObjectsHandleArrays = "overwriteArrays"
): GenerateRssFeedConfig => {
  const newConfig =
    mergeObjects(defaultConfig, customConfig, handleArrays)
  return newConfig as GenerateRssFeedConfig
}

export const hasSignatureOfFormat = (
  spasmEvent: SpasmEventV2,
  signatureFormat: "ethereum" | "nostr"
): boolean => {
  if (!spasmEvent) return false
  if (!isObjectWithValues(spasmEvent)) return false  
  if (!spasmEvent.signatures) return false
  if (!Array.isArray(spasmEvent.siblings)) return false
  let isSignatureFormatDetected = false
  spasmEvent.signatures.forEach(signature => {
    if (
      isObjectWithValues(signature) &&
      signature.format &&
      isObjectWithValues(signature.format) &&
      signature.format.name &&
      typeof(signature.format.name) === "string"
    ) {
      if (signature.format.name.startsWith(signatureFormat)) {
        isSignatureFormatDetected = true
      }
    }
  })
  return isSignatureFormatDetected
}

export const hasSignatureEthereum = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSignatureOfFormat(spasmEvent, "ethereum")
}

export const hasSignatureNostr = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSignatureOfFormat(spasmEvent, "nostr")
}

export const extractNostrEvent = (
  spasmEvent: SpasmEventV2,
  onlySigned: boolean = false
): 
  NostrEvent | NostrEventSignedOpened |
  NostrSpasmEvent | NostrSpasmEventSignedOpened |
  null => {
  const nostrEvents = extractNostrEvents(spasmEvent, onlySigned)
  if (
    nostrEvents && Array.isArray(nostrEvents) && nostrEvents[0]
  ) { return nostrEvents[0] } else { return null }
}

export const extractSignedNostrEvent = (
  spasmEvent: SpasmEventV2,
): 
  NostrEvent | NostrEventSignedOpened |
  NostrSpasmEvent | NostrSpasmEventSignedOpened |
  null => {
  return extractNostrEvent(spasmEvent, true)
}

export const extractSignedNostrEvents = (
  spasmEvent: SpasmEventV2,
): (
    NostrEvent | NostrEventSignedOpened |
    NostrSpasmEvent | NostrSpasmEventSignedOpened
  )[] |
  null => {
  return extractNostrEvents(spasmEvent, true)
}

export const extractNostrEvents = (
  unknownEvent: UnknownEventV2,
  onlySigned: boolean = false
): (
    NostrEvent | NostrEventSignedOpened |
    NostrSpasmEvent | NostrSpasmEventSignedOpened
  )[] |
  null => {
  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent) return null
  if (!isObjectWithValues(spasmEvent)) return null
  if (!spasmEvent.siblings) return null
  if (!Array.isArray(spasmEvent.siblings)) return null
  const nostrEvents: (
    NostrEvent | NostrEventSignedOpened |
    NostrSpasmEvent | NostrSpasmEventSignedOpened
  )[] = []
  spasmEvent.siblings.forEach(sibling => {
    if (
      isObjectWithValues(sibling) &&
      sibling.protocol &&
      isObjectWithValues(sibling.protocol) &&
      sibling.protocol.name &&
      typeof(sibling.protocol.name) === "string" &&
      sibling.protocol.name === "nostr" ||
      sibling.type
    ) {
      if (onlySigned) {
        if (
          sibling.type === "SiblingNostrSignedV2" ||
          sibling.type === "SiblingNostrSpasmSignedV2"
        ) {
          if (
            "originalObject" in sibling && sibling.originalObject
          ) { nostrEvents.push(sibling.originalObject) }
        }
      } else if (!onlySigned) {
        if (
          sibling.type === "SiblingNostrV2" ||
          sibling.type === "SiblingNostrSpasmV2" ||
          sibling.type === "SiblingNostrSignedV2" ||
          sibling.type === "SiblingNostrSpasmSignedV2"
        ) {
          if (
            "originalObject" in sibling && sibling.originalObject
          ) { nostrEvents.push(sibling.originalObject) }
        }
      }
    }
  })

  if (isArrayWithValues(nostrEvents)) { return nostrEvents }

  return null
}

export const hasSiblingOfProtocol = (
  spasmEvent: SpasmEventV2,
  eventProtocol: "spasm" | "dmp" | "nostr" | "web2"
): boolean => {
  if (!spasmEvent) return false
  if (!isObjectWithValues(spasmEvent)) return false  
  if (!spasmEvent.siblings) return false
  if (!Array.isArray(spasmEvent.siblings)) return false
  let isEventProtocolDetected = false
  spasmEvent.siblings.forEach(sibling => {
    if (
      isObjectWithValues(sibling) &&
      sibling.protocol &&
      isObjectWithValues(sibling.protocol) &&
      sibling.protocol.name &&
      typeof(sibling.protocol.name) === "string"
    ) {
      if (sibling.protocol.name === eventProtocol) {
        isEventProtocolDetected = true
      }
    }
  })
  return isEventProtocolDetected
}

export const hasSiblingSpasm = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSiblingOfProtocol(spasmEvent, "spasm")
}

export const hasSiblingDmp = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSiblingOfProtocol(spasmEvent, "dmp")
}

export const hasSiblingNostr = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSiblingOfProtocol(spasmEvent, "nostr")
}

export const hasSiblingWeb2 = (
  spasmEvent: SpasmEventV2
): boolean => {
  return hasSiblingOfProtocol(spasmEvent, "web2")
}

export const getAllSigners = (
  unknownEvent: UnknownEventV2,
  onlyVerifiedFlag: boolean = false,
  toLowerCase: boolean = true,
  formatName?: SpasmEventAddressFormatNameV2
            | "nostr" | "ethereum" | "spasm" | "any",
  returnNostrSignersAs?: "hex" | "npub" | "any"
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []

  const spasmEventV2 = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEventV2 ||
    !Array.isArray(spasmEventV2.authors)
  ) return []

  const nostrTo: "hex" | "npub" | "any" = 
    returnNostrSignersAs || "hex"

  const signers: (string | number)[] = []

  spasmEventV2.authors.forEach(author => {
    if (
      author &&
      author.addresses &&
      Array.isArray(author.addresses) &&
      author.addresses[0]
    ) {
      author.addresses.forEach(address => {
        if (
          address &&
          typeof(address) === "object" &&
          !Array.isArray(address) &&
          address.value &&
          (
            typeof(address.value) === "string" ||
            typeof(address.value) === "number"
          )
        ) {
          // Format name is not specified
          if (!formatName || formatName === "any") {
            let val: string | number | null = null
            if (onlyVerifiedFlag && address.verified) {
              val = address.value
            } else if (!onlyVerifiedFlag) {
              val = address.value
            }
            if (
              nostrTo === "npub" && address.format &&
              address.format.name === "nostr-hex" &&
              typeof(val) === "string"
            ) {
              val = toBeNpub(val)
            } else if (
              nostrTo === "hex" && address.format &&
              address.format.name === "nostr-npub" &&
              typeof(val) === "string"
            ) {
              val = toBeHex(val)
            }
            if (val) {
              signers.push(val)
            }
          // Format name is specified
          } else {
            if ((
              formatName === "nostr" ||
              formatName === "nostr-hex" ||
              formatName === "nostr-npub"
            ) && address.format && (
              address.format.name === "nostr-hex" ||
              address.format.name === "nostr-npub"
            )) {
              let val: string | number | null = null
              if (onlyVerifiedFlag && address.verified) {
                val = address.value
              } else if (!onlyVerifiedFlag) {
                val = address.value
              }
              if (
                nostrTo === "npub" && address.format &&
                address.format.name === "nostr-hex" &&
                typeof(val) === "string"
              ) {
                val = toBeNpub(val)
              } else if (
                nostrTo === "hex" && address.format &&
                address.format.name === "nostr-npub" &&
                typeof(val) === "string"
              ) {
                val = toBeHex(val)
              }
              if (val) {
                signers.push(val)
              }
            } else if ((
              formatName === "ethereum" ||
              formatName === "ethereum-pubkey"
            ) && address.format && (
              address.format.name === "ethereum-pubkey"
            )) {
              if (onlyVerifiedFlag && address.verified) {
                signers.push(address.value)
              } else if (!onlyVerifiedFlag) {
                signers.push(address.value)
              }
            } else if ((
              formatName === "spasm" ||
              formatName === "spasmer"
            ) && address.format && (
              address.format.name === "spasmer"
            )) {
              if (onlyVerifiedFlag && address.verified) {
                signers.push(address.value)
              } else if (!onlyVerifiedFlag) {
                signers.push(address.value)
              }
            }
          }
        }
      })
    }
  })

  if (toLowerCase) {
    signers.forEach((signer, index) => {
      if (typeof(signer) === "string") {
        signers[index] = signer.toLowerCase()
      }
    })
  }

  return signers
}

export const getAllSpasmSigners = (
  unknownEvent: UnknownEventV2,
): (string | number)[] => {
  return getAllSigners (unknownEvent, false, true, "spasm")
}

export const getAllEthereumSigners = (
  unknownEvent: UnknownEventV2,
): (string | number)[] => {
  return getAllSigners (unknownEvent, false, true, "ethereum")
}

export const getAllNostrSigners = (
  unknownEvent: UnknownEventV2,
  returnNostrSignersAs?: "hex" | "npub" | "any"
): (string | number)[] => {
  return getAllSigners (
    unknownEvent, false, true, "nostr", returnNostrSignersAs
  )
}

// TODO doesn't work with events where author
// addresses are not lowercase
export const getVerifiedSigners = (
  unknownEvent: UnknownEventV2,
  returnNostrSignersAs?: "hex" | "npub" | "any"
): (string | number)[] => {
  return getAllSigners (
    unknownEvent, true, true, "any", returnNostrSignersAs
  )
}

export const getVerifiedSpasmSigners = (
  unknownEvent: UnknownEventV2,
): (string | number)[] => {
  return getAllSigners (unknownEvent, true, true, "spasm")
}

export const getVerifiedEthereumSigners = (
  unknownEvent: UnknownEventV2,
): (string | number)[] => {
  return getAllSigners (unknownEvent, true, true, "ethereum")
}

export const getVerifiedNostrSigners = (
  unknownEvent: UnknownEventV2,
): (string | number)[] => {
  return getAllSigners (unknownEvent, true, true, "nostr")
}

export const hasVerifiedSigner = (
  unknownEvent: UnknownEventV2,
): boolean => {
  const allSigners = getVerifiedSigners(unknownEvent)
  if (allSigners && isArrayWithValues(allSigners)) {
    return true
  } else {
    return false
  }
}

export const hasValidSignature = hasVerifiedSigner

export const getAllIdsFromArrayOfIdObjects = (
  arrayOfIdObjects: SpasmEventIdV2[],
  toLowerCase: boolean = true
): (string | number)[] => {
  if (!arrayOfIdObjects || !Array.isArray(arrayOfIdObjects)) {
    return []
  }

  const allIds: (string | number)[] = []

  arrayOfIdObjects.forEach(idObject => {
    if (
      idObject &&
      'value' in idObject &&
      idObject.value &&
      (
        typeof(idObject.value) === "string" ||
        typeof(idObject.value) === "number"
      )
    ) {
      allIds.push(idObject.value)
    }
  })

  if (toLowerCase) {
    allIds.forEach((id, index) => {
      if (typeof(id) === "string") {
        allIds[index] = id.toLowerCase()
      }
    })
  }

  return allIds
}

export const getAllEventIds = (
  unknownEvent: UnknownEventV2,
  toLowerCase: boolean = true
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []

  const spasmEvent = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return []

  if (
    'ids' in spasmEvent &&
    Array.isArray(spasmEvent.ids) &&
    hasValue(spasmEvent.ids)
  ) {
    const arrayOfIds =
      getAllIdsFromArrayOfIdObjects(
        spasmEvent.ids, toLowerCase
    )

    return arrayOfIds
  }

  return []
}

export const getAllParentIds = (
  unknownEvent: UnknownEventV2,
  toLowerCase: boolean = true
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []

  const spasmEvent = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return []

  if (
    'parent' in spasmEvent &&
    spasmEvent.parent &&
    isObjectWithValues(spasmEvent.parent)
  ) {
    if (
      'ids' in spasmEvent.parent &&
      Array.isArray(spasmEvent.parent.ids) &&
      hasValue(spasmEvent.parent.ids)
    ) {
      const arrayOfIds =
        getAllIdsFromArrayOfIdObjects(
          spasmEvent.parent.ids, toLowerCase
      )

      return arrayOfIds
    }
  }

  return []
}

// TODO write tests
export const getAllRootIds = (
  unknownEvent: UnknownEventV2,
  toLowerCase: boolean = true
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []

  const spasmEvent = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return []

  if (
    'root' in spasmEvent &&
    spasmEvent.root &&
    isObjectWithValues(spasmEvent.root)
  ) {
    if (
      'ids' in spasmEvent.root &&
      Array.isArray(spasmEvent.root.ids) &&
      hasValue(spasmEvent.root.ids)
    ) {
      const arrayOfIds =
        getAllIdsFromArrayOfIdObjects(
          spasmEvent.root.ids, toLowerCase
      )

      return arrayOfIds
    }
  }

  return []
}

export const getAllSignatures = (
  unknownEvent: UnknownEventV2,
  toLowerCase: boolean = true
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []

  let spasmEventV2: SpasmEventV2 | null = null

  // SpasmEventV2
  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventV2"
  ) {
    spasmEventV2 = unknownEvent
  } else {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: "2.0.0" } }
    }
    spasmEventV2 = convertToSpasm(unknownEvent, customConfig)
  }

  if (
    !spasmEventV2 ||
    !Array.isArray(spasmEventV2.signatures)
  ) return []

  const allSignatures: (string | number)[] = []

  spasmEventV2.signatures.forEach(signature => {
    if (
      signature &&
      signature.value &&
      (
        typeof(signature.value) === "string" ||
        typeof(signature.value) === "number"
      )
    ) {
      allSignatures.push(signature.value)
    }
  })

  if (toLowerCase) {
    allSignatures.forEach((signature, index) => {
      if (typeof(signature) === "string") {
        allSignatures[index] = signature.toLowerCase()
      }
    })
  }

  return allSignatures
}

export const getSignersListedIn = (
  unknownEvent: UnknownEventV2,
  originaList: (string | number)[]
): (string | number)[] => {
  if (!isObjectWithValues(unknownEvent)) return []
  if (
    !originaList ||
    !Array.isArray(originaList) ||
    !hasValue(originaList)
  ) return []

  // Standardize list
  // Convert npubs to hex
  const list: (string | number)[] = []
  originaList.forEach(signer => {
    if (
      // Address is npub
      signer && typeof(signer) === "string" &&
      signer.startsWith("npub") &&
      signer.length === 63
    ) {
      const signerHex = toBeHex(signer)
      if (signerHex) {
        list.push(signerHex)
      }
      // Address is not npub
    } else if (isStringOrNumber(signer)) {
      list.push(signer)
    }
  })

  if (!isArrayOfStringsOrNumbers(list)) return []

  let spasmEvent: SpasmEventV2 | null = null
  // SpasmEventV2
  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventV2"
  ) {
    spasmEvent = unknownEvent
  } else {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: "2.0.0" } }
    }
    spasmEvent = convertToSpasm(unknownEvent, customConfig)
  }

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return []

  const allSigners: (string | number)[] =
    getVerifiedSigners(spasmEvent)

  if (
    !allSigners ||
    !hasValue(allSigners)
  ) return []

  const filteredSigners: (string | number)[] = []

  allSigners.forEach(signer => {
    if (signer && list.includes(signer)) {
      filteredSigners.push(signer)
    }
  })

  return filteredSigners
}

export const getPubkeysListedIn = getSignersListedIn

export const getStatByAction = (
  unknownEvent: any,
  action: string | number = "react"
): SpasmEventStatV2 | null => {
  if (!action || !isStringOrNumber) { return null }

  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent || !isObjectWithValues(spasmEvent)) {
    return null
  }

  if (!("stats" in spasmEvent) || !spasmEvent.stats) {
    return null
  }

  let spasmEventStat: SpasmEventStatV2 | null = null

  spasmEvent.stats?.forEach(stat => {
    if (
      isObjectWithValues(stat) &&
      "action" in stat && stat.action &&
      stat.action === action
    ) {
      spasmEventStat = stat
    }
  })

  return spasmEventStat
}

export const getTotalOfReaction = (
  unknownEvent: any,
  reaction: string | number = "upvote"
): number => {
  if (!reaction || !isStringOrNumber) { return 0 }

  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent || !isObjectWithValues(spasmEvent)) {
    return 0
  }

  const reactionStat = getStatByAction(spasmEvent, "react")
  if (!reactionStat) { return 0 }

  if (
    !("contents" in reactionStat) || !reactionStat.contents ||
    !isArrayWithValues(reactionStat.contents)
  ) { return 0 }

  let total: number = 0

  reactionStat.contents.forEach(content => {
    if (
      "value" in content && content.value &&
      content.value === reaction &&
      "total" in content && content.total
    ) {
      if (typeof(content.total) === "number") {
        total = content.total
      } else if (typeof(content.total) === "string") {
        total = Number(content.total)
      }
    }
  })

  return total
}

export const getTotalOfMostPopularReaction = (
  unknownEvent: any
): number => {
  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent || !isObjectWithValues(spasmEvent)) {
    return 0
  }

  const reactionStat = getStatByAction(spasmEvent, "react")
  if (!reactionStat) { return 0 }

  if (
    !("contents" in reactionStat) || !reactionStat.contents ||
    !isArrayWithValues(reactionStat.contents)
  ) { return 0 }

  let total: number = 0

  reactionStat.contents.forEach(content => {
    if ("total" in content && content.total) {
      let newTotal = 0
      if (typeof(content.total) === "number") {
        newTotal = content.total
      } else if (typeof(content.total) === "string") {
        newTotal = Number(content.total)
      }
      if (newTotal > total) {
        total = newTotal
      }
    }
  })

  return total
}

export const getTotalOfAction = (
  unknownEvent: any,
  action: string | number = "reply"
): number => {
  if (!action || !isStringOrNumber) { return 0 }

  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent || !isObjectWithValues(spasmEvent)) {
    return 0
  }

  const actionStat = getStatByAction(spasmEvent, action)
  if (!actionStat) { return 0 }

  if ("total" in actionStat && actionStat.total) {
    if (typeof(actionStat.total) === "number") {
      return actionStat.total
    } else if (typeof(actionStat.total) === "string") {
      return Number(actionStat.total)
    }
  }

  return 0
}

export const getTotalOfReply = (
  unknownEvent: any
): number => {
  return getTotalOfAction(unknownEvent, "reply")
}

export const getTotalOfReplyAction = getTotalOfReply
export const getTotalOfActionReply = getTotalOfReply

export const getTotalOfReact = (
  unknownEvent: any
): number => {
  return getTotalOfAction(unknownEvent, "react")
}

export const getTotalOfReactAction = getTotalOfReact
export const getTotalOfActionReact = getTotalOfReact

export const isAnySignerListedIn = (
  unknownEvent: UnknownEventV2,
  list: (string | number)[]
): boolean => {
  const signersListedIn = getSignersListedIn(
    unknownEvent, list
  )

  if (
    signersListedIn &&
    Array.isArray(signersListedIn) &&
    hasValue(signersListedIn)
  ) {
    return true
  }

  return false
}

export const isAnyPubkeyListedIn = isAnySignerListedIn

export const areAllSignersListedIn = (
  unknownEvent: UnknownEventV2,
  list: (string | number)[]
): boolean => {
  if (!isObjectWithValues(unknownEvent)) return false

  if (
    !list ||
    !Array.isArray(list) ||
    !hasValue(list)
  ) return false

  const spasmEvent = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return false

  const allSigners: (string | number)[] =
    getVerifiedSigners(spasmEvent)

  if (
    !allSigners ||
    !hasValue(allSigners)
  ) return false

  return allSigners.every(signer => {
    if (signer) {
      return list.includes(signer)
    } else {
      return false
    }
  })
}

export const areAllPubkeysListedIn = areAllSignersListedIn

// TODO use getAllSigners() instead
// export const getAuthorsAddressesByFormat = (
//   unknownEvent: UnknownEventV2,
//   customAddressFormat?: SpasmEventAddressFormatV2,
//   from?: "authors" | "mentions",
//   onlyVerifiedFlag?: boolean
// ): (string | number)[] | null => {
//   const defaultAddressFormat: SpasmEventAddressFormatV2 =
//     { name: "spasmer" }
//   const addressFormat =
//     customAddressFormat || defaultAddressFormat
//
//   const addressFormatName = addressFormat?.name
//     ? addressFormat?.name : "spasmer"
//   const addressFormatVersion = addressFormat?.version
//     ? addressFormat?.version : ""
//
//   const spasmEvent = toBeSpasmEventV2(unknownEvent)
//
//   if (
//     !spasmEvent ||
//     !isObjectWithValues(spasmEvent) ||
//     !hasValue(spasmEvent)
//   ) return null
//
//   let authors: SpasmEventAuthorV2[] | null = null
//
//   // Authors
//   if (!from || from === "authors") {
//     if (
//       "authors" in spasmEvent && spasmEvent.authors &&
//       isArrayWithValues(spasmEvent.authors)
//     ) { authors = spasmEvent.authors }
//
//   // Mentions
//   } else if (from === "mentions") {
//     if (
//       "mentions" in spasmEvent && spasmEvent.mentions &&
//       isArrayWithValues(spasmEvent.mentions)
//     ) { authors = spasmEvent.mentions }
//   }
//
//   if (!authors || !isArrayWithValues(authors)) { return null }
//
//   let addressesValue: (string | number)[] = []
//
//   authors.forEach(author => {
//     if (
//       !author || typeof(author) !== "object" ||
//       Array.isArray(author) || !isObjectWithValues(author)
//     ) { return }
//
//     // Addresses
//     if (
//       "addresses" in author && author.addresses &&
//       isArrayWithValues(author.addresses)
//     ) {
//       author.addresses.forEach(address => {
//         if (
//           !address || typeof(address) !== "object" ||
//           Array.isArray(address) || !isObjectWithValues(address)
//         ) { return }
//
//         if (!('value' in address) || !address.value ||
//           (
//             typeof(address.value) !== "string" &&
//             typeof(address.value) !== "number"
//           )
//         ) { return }
//
//         if (!('format' in address) || !address.format) { return }
//
//         const { format } = address
//
//         if (
//           format && typeof(format) === "object" &&
//           !Array.isArray(format) &&
//           isObjectWithValues(format)
//         ) {
//           // Match format name
//           if (
//             format.name && typeof(format.name) === "string" &&
//             addressFormatName &&
//             format.name === addressFormatName
//           ) {
//             // No version was specified, so returning address
//             // which only matched the specified format name.
//             if (!addressFormatVersion) {
//               if (onlyVerifiedFlag && address.verified) {
//                 addressesValue.push(address.value)
//               } else if (!onlyVerifiedFlag) {
//                 addressesValue.push(address.value)
//               }
//             }
//
//             // Match format version (if specified)
//             if (
//               format.version &&
//               typeof(format.version) === "string" &&
//               addressFormatVersion &&
//               format.version === addressFormatVersion
//             ) {
//               if (onlyVerifiedFlag && address.verified) {
//                 addressesValue.push(address.value)
//               } else if (!onlyVerifiedFlag) {
//                 addressesValue.push(address.value)
//               }
//             }
//           }
//         }
//       })
//     }
//
//     return
//   })
//
//   if (addressesValue && isArrayWithValues(addressesValue)) {
//     return addressesValue
//   } else { return null }
// }
//
// export const getSignersByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractAuthorsAddressesByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractSignersByFormat =
//   getAuthorsAddressesByFormat
//
// export const extractEthereumSigners = (
//   unknownEvent: UnknownEventV2,
//   onlyVerifiedFlag: boolean = false
// ): (string | number)[] | null => {
//   return getAuthorsAddressesByFormat(
//     unknownEvent, { name: "ethereum-pubkey" }, "authors",
//     onlyVerifiedFlag
//   )
// }
//
// export const extractVerifiedEthereumSigners = (
//   unknownEvent: UnknownEventV2
// ): (string | number)[] | null => {
//   return extractEthereumSigners(unknownEvent, true)
// }
//
// export const extractNostrSigners = (
//   unknownEvent: UnknownEventV2,
//   onlyVerifiedFlag: boolean = false
// ): (string | number)[] | null => {
//   const authorsAddressesHex = getAuthorsAddressesByFormat(
//     unknownEvent, { name: "nostr-hex" }, "authors",
//     onlyVerifiedFlag
//   )
//   if (authorsAddressesHex) { return authorsAddressesHex }
//
//   const authorsAddressesNpub = getAuthorsAddressesByFormat(
//     unknownEvent, { name: "nostr-npub" }, "authors",
//     onlyVerifiedFlag
//   )
//   if (authorsAddressesNpub) { return authorsAddressesNpub }
//
//   return null
// }
//
// export const extractVerifiedNostrSigners = (
//   unknownEvent: UnknownEventV2
// ): (string | number)[] | null => {
//   return extractNostrSigners(unknownEvent, true)
// }

export const getIdByFormat = (
  unknownEvent: UnknownEventV2,
  customIdFormat?: SpasmEventIdFormatV2,
  from: "event" | "parent" | "root" = "event"
): string | number | null => {
  const defaultIdFormat = {
    name: "spasmid",
    version: "01"
  }
  const idFormat = customIdFormat || defaultIdFormat

  const idFormatName = idFormat?.name
    ? idFormat?.name : "spasmid"
  const idFormatVersion = idFormat?.version
    ? idFormat?.version : ""

  const spasmEvent = toBeSpasmEventV2(unknownEvent)

  if (
    !spasmEvent ||
    !isObjectWithValues(spasmEvent) ||
    !hasValue(spasmEvent)
  ) return null
  
  if (
    !('ids' in spasmEvent) ||
    !spasmEvent.ids ||
    !Array.isArray(spasmEvent.ids)
  ) { return null }

  let ids: SpasmEventIdV2[] | null = null

  if (!from || from === "event") {
    if (
      "ids" in spasmEvent && spasmEvent.ids &&
      isArrayWithValues(spasmEvent.ids)
    ) { ids = spasmEvent.ids }
  } else if (from === "parent") {
    if (
      "parent" in spasmEvent && spasmEvent.parent &&
      "ids" in spasmEvent.parent && spasmEvent.parent.ids &&
      isArrayWithValues(spasmEvent.parent.ids)
    ) { ids = spasmEvent.parent.ids }
  } else if (from === "root") {
    if (
      "root" in spasmEvent && spasmEvent.root &&
      "ids" in spasmEvent.root && spasmEvent.root.ids &&
      isArrayWithValues(spasmEvent.root.ids)
    ) { ids = spasmEvent.root.ids }
  }

  if (!ids || !isArrayWithValues(ids)) { return null }

  let idValues: (string | number)[] = []

  ids.forEach(id => {
    if (
      !id || typeof(id) !== "object" || Array.isArray(id) ||
      !isObjectWithValues(id)
    ) { return }

    if (!('value' in id) || !id.value ||
      (
        typeof(id.value) !== "string" &&
        typeof(id.value) !== "number"
      )
    ) { return }

    if (!('format' in id) || !id.format) { return }

    const { format } = id

    if (
      format && typeof(format) === "object" &&
      !Array.isArray(format) &&
      isObjectWithValues(format)
    ) {
      // Match format name
      if (
        format.name && typeof(format.name) === "string" &&
        idFormatName && format.name === idFormatName
      ) {
        // No version was specified, so returning an ID value
        // which only matched the specified ID format name.
        if (!idFormatVersion) {
          // idValues = id.value
          idValues.push(id.value)
        }

        // Match format version (if specified)
        if (
          format.version &&
          typeof(format.version) === "string" &&
          idFormatVersion && format.version === idFormatVersion
        ) {
          // idValues = id.value
          idValues.push(id.value)
        }
      }
    }
    return
  })

  if (idValues.length > 1 && idFormatName === "url") {
    return findMostLikelyUrl(idValues)
  }

  if (idValues[0]) {
    return idValues[0]
  } else {
    return null
  }
}

export const findMostLikelyUrl = (
  arr: (string | number)[]
): string | null => {
  if (!arr) { return null }
  if (!Array.isArray(arr)) { return null }
  const arrayOfStrings: string[] = []
  arr.forEach(val => {
    if (val && String(val)) { arrayOfStrings.push(String(val)) }
  })
  const allValidUrls = arrayOfStrings.filter(isValidUrl)
  const validUrls =
    removeDuplicatesFromArrayOfStrings(allValidUrls)
  if (validUrls.length > 1) {
    // assume the longest URL is more likely to be a URL
    return validUrls.reduce((a, b) => a.length > b.length ? a : b)
  } else if (validUrls.length === 1) {
    return validUrls[0];
  } else {
    return null
  }
}

export const findMostLikelyGuid = (
  arr: string[]
): string | null => {
  if (!arr) { return null }
  if (!Array.isArray(arr)) { return null }
  const arrayOfStrings: string[] = []
  arr.forEach(val => {
    if (val && String(val)) { arrayOfStrings.push(String(val)) }
  })
  const allValidUrls = arrayOfStrings.filter(isValidUrl)
  const validUrls =
    removeDuplicatesFromArrayOfStrings(allValidUrls)
  if (validUrls.length > 1) {
    // assume the shortest URL is more likely to be a GUID
    return validUrls.reduce((a, b) => a.length < b.length ? a : b)
  } else if (validUrls.length === 1) {
    return validUrls[0];
  } else {
    return null
  }
}

export const extractIdByFormat = getIdByFormat

export const extractSpasmId01 = (
  unknownEvent: UnknownEventV2,
) => {
  return extractIdByFormat(
    unknownEvent, { name: "spasmid", version: "01" }
  )
}

export const getParentIdByFormat = (
  unknownEvent: UnknownEventV2,
  customIdFormat?: SpasmEventIdFormatV2,
): string | number | null => {
  return getIdByFormat(
    unknownEvent, customIdFormat, "parent"
  )
}

export const extractParentIdByFormat = getParentIdByFormat

export const extractParentSpasmId01 = (
  unknownEvent: UnknownEventV2,
) => {
  return extractParentIdByFormat(
    unknownEvent, { name: "spasmid", version: "01" }
  )
}

export const getRootIdByFormat = (
  unknownEvent: UnknownEventV2,
  customIdFormat?: SpasmEventIdFormatV2,
): string | number | null => {
  return getIdByFormat(
    unknownEvent, customIdFormat, "root"
  )
}

export const extractRootIdByFormat = getRootIdByFormat

export const extractRootSpasmId01 = (
  unknownEvent: UnknownEventV2,
) => {
  return extractRootIdByFormat(
    unknownEvent, { name: "spasmid", version: "01" }
  )
}

// The Set data structure only stores unique values.
// When the array is converted into a Set, any duplicate values
// are automatically removed. Then, the spread operator (...)
// is used to convert the Set back into an array 1.
export const removeDuplicatesFromArray = (
  array: (string | number)[]
): (string | number)[] => {
  if (!Array.isArray(array)) {
    return []
  }
  return [...new Set(array)];
}

export const removeDuplicatesFromArrayOfStrings = (
  array: string[]
): string[] => {
  if (!Array.isArray(array)) {
    return []
  }
  return [...new Set(array)];
}

/**
 * Removes duplicate tag arrays from a Nostr tags array
 * Each Nostr tag is an array of strings
 */
export const removeDuplicateTags = (
  tags: string[][]
): string[][] => {
    // Convert each tag array to a string for comparison
    const uniqueTags = new Map<string, string[]>()
    for (const tag of tags) {
        const tagKey = JSON.stringify(tag)
        if (!uniqueTags.has(tagKey)) {
            uniqueTags.set(tagKey, tag)
        }
    }
    return Array.from(uniqueTags.values())
}

export const removeDuplicateNostrTags = removeDuplicateTags
export const deduplicateTags = removeDuplicateTags
export const deduplicateNostrTags = removeDuplicateTags
export const uniqueTagsOnly = removeDuplicateTags
export const uniqueNostrTagsOnly = removeDuplicateTags
export const removeDuplicateArraysFromArrayOrArraysOfStrings =
  removeDuplicateTags
export const keepUniqueArraysInArrayOrArraysOfStrings =
  removeDuplicateTags

export const checkIfEventHasThisId = (
  unknownEvent: UnknownEventV2,
  id: (string | number),
  shortIdLength?: number
): Boolean => {
  if (!id || !isStringOrNumber(id)) { return false }

  const spasmEvent = toBeSpasmEventV2(unknownEvent)
  if (!spasmEvent || !isObjectWithValues(spasmEvent)) {
    return false
  }
  
  const eventIds: (string | number )[] | null =
    getAllEventIds(spasmEvent)

  if (!eventIds || !isArrayWithValues(eventIds)) { return false }

  // Short ID (not URL)
  if (
    shortIdLength && typeof(shortIdLength) === "number" &&
    shortIdLength > 15 && String(id) &&
    String(id).length === shortIdLength &&
    !isValidUrl(id)
  ) {
    let ifMatch: boolean = false
    eventIds.forEach(eventId => {
      if (
        String(eventId) && String(id) &&
        String(eventId).startsWith(String(id))
      ) { ifMatch = true }
    })
    return ifMatch
  // Full ID
  } else {
    if (eventIds.includes(id)) {
      return true
    } else {
      return false
    }
  }
}

export const getEventById = (
  unknownEvents: UnknownEventV2[],
  id: (string | number),
  shortIdLength?: number
): SpasmEventV2 | null => {
  if (!id || !isStringOrNumber(id)) { return null }

  const spasmEvents: SpasmEventV2[] | null =
    toBeSpasmEventsV2(unknownEvents)
  if (
    !spasmEvents || !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null

  const foundEvents: SpasmEventV2[] = []

  spasmEvents.forEach(event => {
    if (checkIfEventHasThisId(event, id, shortIdLength)) {
      foundEvents.push(event)
    }
  })
  
  if (
    foundEvents && Array.isArray(foundEvents) &&
    foundEvents.length === 1 &&
    isObjectWithValues(foundEvents[0])
  ) {
    return foundEvents[0]
  } else if (
    foundEvents && Array.isArray(foundEvents) &&
    foundEvents.length > 1 &&
    isArrayWithValues(foundEvents)
  ) {
    const mergedEvent = mergeSpasmEventsV2(foundEvents)
    if (mergedEvent) {
      return mergedEvent
    }
  }

  return null
}

export const getEventsByIds = (
  unknownEvents: UnknownEventV2[],
  ids: (string | number)[],
  shortIdLength?: number
): SpasmEventV2[] | null => {
  if (!ids || !isArrayWithValues(ids)) { return null }

  const spasmEvents: SpasmEventV2[] | null =
    toBeSpasmEventsV2(unknownEvents)
  if (
    !spasmEvents || !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null

  const foundEvents: SpasmEventV2[] = []

  ids.forEach(id => {
    spasmEvents.forEach(event => {
      if (checkIfEventHasThisId(event, id, shortIdLength)) {
        foundEvents.push(event)
      }
    })
  })

  const mergedEvents: SpasmEventV2[] | null =
    mergeDifferentSpasmEventsV2(foundEvents)

  if (mergedEvents && isArrayWithValues(mergedEvents)) {
    return mergedEvents
  } else {
    return null
  }
}

export const toBeSpasmEventV2 = (
  unknownEvent: UnknownEventV2,
): SpasmEventV2 | null => {
  if (!isObjectWithValues(unknownEvent)) return null

  let spasmEvent: SpasmEventV2 | null = null

  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventV2"
  ) {
    spasmEvent = unknownEvent
  } else {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: "2.0.0" } }
    }
    spasmEvent = convertToSpasm(unknownEvent, customConfig)
  }

  if (
    spasmEvent &&
    isObjectWithValues(spasmEvent) &&
    hasValue(spasmEvent) &&
    'type' in spasmEvent &&
    spasmEvent.type === "SpasmEventV2"
  ) {
    return spasmEvent
  }

  return null
}

export const toBeSpasmEventsV2 = (
  unknownEvents: any[],
  keepOnlyUnique: boolean = false
): SpasmEventV2[] | null => {
  if (
    !unknownEvents || !Array.isArray(unknownEvents)
  ) return null

  let spasmEvents: SpasmEventV2[] = []
  
  unknownEvents.forEach(event => {
    const spasmEvent = toBeSpasmEventV2(event)
    if (spasmEvent && isObjectWithValues(spasmEvent)) {
      if (keepOnlyUnique) {
        pushToArrayIfEventIsUnique(spasmEvents, spasmEvent)
      } else {
        spasmEvents.push(spasmEvent)
      }
    }
  })

  if (
    !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null
  
  return spasmEvents
}

export const toBeUniqueSpasmEventsV2 = (
  unknownEvents: any[]
): SpasmEventV2[] | null => {
  return toBeSpasmEventsV2(unknownEvents, true)
}

export const extractSignerFromEthereumSignature = (
  signedString: string, signature: string
): string | null => {
  try {
    if (signature && typeof (signature) === 'string') {
      const recoveredAddress = ethers.verifyMessage(
        signedString, signature
      )

      if (
        recoveredAddress && typeof(recoveredAddress) === "string"
      ) {
        return recoveredAddress.toLowerCase()
      } else {
        return null
      }
    }
  } catch (error) {
    return null
  }
  return null
}

// function deepMerge(original: any, newObject: any): any {
//   const result: any = {};
//
//   // Copy all existing keys from original
//   Object.keys(original).forEach(key => {
//     result[key] = original[key];
//   });
//
//   // Iterate through newObject keys
//   Object.keys(newObject).forEach(key => {
//     if (typeof newObject[key] === 'object' && newObject[key] !== null) {
//       // If it's an array, merge its contents
//       if (Array.isArray(newObject[key])) {
//         result[key] = deepMergeArray(result[key], newObject[key]);
//       }
//       // If it's an object, merge its properties
//       else {
//         result[key] = deepMerge(result[key], newObject[key]);
//       }
//     }
//     // For other types, simply overwrite the value
//     else {
//       result[key] = newObject[key];
//     }
//   });
//
//   return result;
// }

function mergeArrays(
  original: any[],
  newArray: any[]
): any[] {
  const result: any[] = [];
  const seen: Set<any> = new Set();

  // Function to safely add elements to avoid duplicates
  function safeAdd(element: any) {
    if (!seen.has(element)) {
      seen.add(element);
      result.push(element);
    }
  }

  // Add all unique elements from both arrays
  original.forEach(safeAdd);
  newArray.forEach(safeAdd);

  return result;
}

export const mergeSpasmEventsV2 = (
  spasmEvents: any[],
  depth: number = 0
): SpasmEventV2 | null => {
  const maxRecursionDepth = 50
  if (depth > maxRecursionDepth) {
    throw new Error("Maximum recursion depth exceeded")
  }

  if (!spasmEvents || !Array.isArray(spasmEvents)) return null
  if (
    !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null

  const mainSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(spasmEvents[0])

  if (!mainSpasmEvent) return null

  const mainSpasmEventIds =
    getAllEventIds(mainSpasmEvent)

  const mainSpasmEventSignatures =
    getAllSignatures(mainSpasmEvent)

  const mainSpasmEventSiblingTypes: Set<string> = new Set();

  mainSpasmEvent.siblings?.forEach(mainSibling => {
    if ('type' in mainSibling && mainSibling.type) {
      mainSpasmEventSiblingTypes.add(mainSibling.type)
    }
  })

  const mainSpasmEventSharedByIds: Set<string | number> =
    new Set();

  mainSpasmEvent.sharedBy?.ids?.forEach(id => {
    if ('value' in id && id.value) {
      mainSpasmEventSharedByIds.add(id.value)
    }
  })

  spasmEvents.forEach((spasmEventAny, index) => {
    const spasmEvent: SpasmEventV2 | null =
      toBeSpasmEventV2(spasmEventAny)
    // spasm event with index 0 is used for main spasm event
    if (
      index > 0 &&
      spasmEvent &&
      ifEventsHaveSameSpasmId01(mainSpasmEvent, spasmEvent)
    ) {
      // Siblings
      if (
        "siblings" in spasmEvent &&
        spasmEvent.siblings &&
        Array.isArray(spasmEvent.siblings)
      ) {
        spasmEvent.siblings.forEach(sibling => {
          // If the main event doesn't have this sibling, add it
          if (
            !mainSpasmEventSiblingTypes.has(sibling.type)
          ) {
            mainSpasmEvent.siblings?.push(sibling)
            mainSpasmEventSiblingTypes.add(sibling.type)
            // Add an ID to main event
            if (
              'ids' in sibling && sibling.ids &&
              Array.isArray(sibling.ids)
            ) {
              sibling.ids.forEach(id => {
                if (!mainSpasmEventIds.includes(id.value)) {
                  // Create IDs key if it doesn't exist
                  mainSpasmEvent.ids ??= [];
                  mainSpasmEvent.ids.push(id)
                }
              })
            }

            // Add a signature to main event
            if (
              'signatures' in sibling && sibling.signatures &&
              Array.isArray(sibling.signatures)
            ) {
              sibling.signatures.forEach(signature => {
                if (
                  !mainSpasmEventSignatures.includes(
                    signature.value
                  )
                ) {
                  // Create signatures key if it doesn't exist
                  mainSpasmEvent.signatures ??= [];
                  mainSpasmEvent.signatures.push(signature)
                  if (signature.pubkey) {
                    markSpasmEventAddressAsVerified(
                      mainSpasmEvent, signature.pubkey
                    )
                  }
                  // TODO mark address as verified (done)
                  // - What if multiple authors?
                }
              })
            }

          // If the main event already has a sibling with the
          // same type, then add missing signatures which exist
          // on a new sibling, but don't on the main sibling.
          } else {
            // Find sibling with the same type in main event.
            mainSpasmEvent.siblings?.forEach(mainSibling => {
              if (mainSibling.type === sibling.type) {
                // Iterate through all signatures in sibling and
                // add missing signatures to the main sibling.
                if (
                  'signatures' in sibling &&
                  sibling.signatures &&
                  Array.isArray(sibling.signatures)
                ) {
                  sibling.signatures.forEach(signature => {
                    if (
                      !mainSpasmEventSignatures.includes(
                        signature.value
                      ) &&
                      "signatures" in mainSpasmEvent &&
                      mainSpasmEvent.signatures &&
                      Array.isArray(mainSpasmEvent.signatures)
                    ) {
                      mainSpasmEvent.signatures.push(signature)
                      if (signature.pubkey) {
                        markSpasmEventAddressAsVerified(
                          mainSpasmEvent, signature.pubkey
                        )
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }

      // Add source only if source doesn't exist
      if (
        "source" in spasmEvent &&
        spasmEvent.source &&
        hasValue(spasmEvent.source)
      ) {
        if (
          !("source" in mainSpasmEvent) ||
          !mainSpasmEvent.source ||
          !hasValue(mainSpasmEvent)
        ) {
          mainSpasmEvent.source = spasmEvent.source
        }
      }

      // Add sharedBy
      if (
        "sharedBy" in spasmEvent &&
        spasmEvent.sharedBy &&
        hasValue(spasmEvent.sharedBy)
      ) {
        spasmEvent?.sharedBy?.ids?.forEach(id => {
          if (
            "value" in id && id.value &&
            !mainSpasmEventSharedByIds.has(id.value)
          ) {
            // Create sharedBy key if it doesn't exist
            mainSpasmEvent.sharedBy ??= {};
            mainSpasmEvent.sharedBy.ids ??= [];
            mainSpasmEvent.sharedBy.ids?.push(id)
            mainSpasmEventSharedByIds.add(id.value)
          }
        })
      }

      // Parent event
      if (
        "parent" in spasmEvent && spasmEvent.parent &&
        "event" in spasmEvent.parent &&
        spasmEvent.parent?.event &&
        typeof(spasmEvent.parent?.event) === "object" &&
        hasValue(spasmEvent.parent?.event) &&
        mainSpasmEvent.parent &&
        typeof(mainSpasmEvent.parent) === "object"
      ) {
        if (
          !("event" in mainSpasmEvent.parent) ||
          !mainSpasmEvent.parent.event
        ) {
          mainSpasmEvent.parent.event = spasmEvent.parent.event
        } else if (
          mainSpasmEvent.parent.event &&
          typeof(mainSpasmEvent.parent.event) === "object"
        ) {
          const mergedEvent = mergeSpasmEventsV2([
            mainSpasmEvent.parent.event,
            spasmEvent.parent.event,
            depth + 1
          ])
          if (mergedEvent) {
            mainSpasmEvent.parent.event = mergedEvent
          }
        }
      }

      // Root event
      if (
        "root" in spasmEvent && spasmEvent.root &&
        "event" in spasmEvent.root &&
        spasmEvent.root?.event &&
        typeof(spasmEvent.root?.event) === "object" &&
        hasValue(spasmEvent.root?.event) &&
        mainSpasmEvent.root &&
        typeof(mainSpasmEvent.root) === "object"
      ) {
        if (
          !("event" in mainSpasmEvent.root) ||
          !mainSpasmEvent.root.event
        ) {
          mainSpasmEvent.root.event = spasmEvent.root.event
        } else if (
          mainSpasmEvent.root.event &&
          typeof(mainSpasmEvent.root.event) === "object"
        ) {
          const mergedEvent = mergeSpasmEventsV2([
            mainSpasmEvent.root.event,
            spasmEvent.root.event,
            depth + 1
          ])
          if (mergedEvent) {
            mainSpasmEvent.root.event = mergedEvent
          }
        }
      }

      // Stats
      if (
        "stats" in spasmEvent &&
        spasmEvent.stats &&
        Array.isArray(spasmEvent.stats) &&
        hasValue(spasmEvent.stats)
      ) {
        if (
          !("stats" in mainSpasmEvent) ||
          !mainSpasmEvent.stats ||
          !Array.isArray(mainSpasmEvent.stats) ||
          !hasValue(mainSpasmEvent.stats)
        ) {
          mainSpasmEvent.stats = spasmEvent.stats
        } else if (
          "stats" in mainSpasmEvent &&
          mainSpasmEvent.stats &&
          Array.isArray(mainSpasmEvent.stats) &&
          hasValue(mainSpasmEvent.stats)
        ) {
          mergeStatsV2([mainSpasmEvent.stats, spasmEvent.stats])
        }
      }

      // Db
      if (
        "db" in spasmEvent &&
        spasmEvent.db &&
        hasValue(spasmEvent.db)
      ) {
        if (
          !("db" in mainSpasmEvent) ||
          !mainSpasmEvent.db ||
          !hasValue(mainSpasmEvent.db)
        ) {
          mainSpasmEvent.db = spasmEvent.db
        } else if (
          "db" in mainSpasmEvent &&
          mainSpasmEvent.db &&
          hasValue(mainSpasmEvent.db)
        ) {
          // key
          if (
            (
              !("key" in mainSpasmEvent.db) ||
              !mainSpasmEvent.db.key ||
              !hasValue(mainSpasmEvent.db.key)
            ) && (
              ("key" in spasmEvent.db) &&
              spasmEvent.db.key &&
              hasValue(spasmEvent.db.key)
            )
          ) {
            mainSpasmEvent.db.key = spasmEvent.db.key
          }
          // table
          if (
            (
              !("table" in mainSpasmEvent.db) ||
              !mainSpasmEvent.db.table ||
              !hasValue(mainSpasmEvent.db.table)
            ) && (
              ("table" in spasmEvent.db) &&
              spasmEvent.db.table &&
              hasValue(spasmEvent.db.table)
            )
          ) {
            mainSpasmEvent.db.table = spasmEvent.db.table
          }
          // addedTimestamp
          if (
            (
              !("addedTimestamp" in mainSpasmEvent.db) ||
              !mainSpasmEvent.db.addedTimestamp ||
              !hasValue(mainSpasmEvent.db.addedTimestamp)
            ) && (
              "addedTimestamp" in spasmEvent.db &&
              spasmEvent.db.addedTimestamp &&
              hasValue(spasmEvent.db.addedTimestamp) &&
              typeof(spasmEvent.db.addedTimestamp) === "number"
            )
          ) {
            mainSpasmEvent.db.addedTimestamp =
              spasmEvent.db.addedTimestamp
          } else if (
            "addedTimestamp" in mainSpasmEvent.db &&
            mainSpasmEvent.db.addedTimestamp &&
            hasValue(mainSpasmEvent.db.addedTimestamp) &&
            typeof(mainSpasmEvent.db.addedTimestamp) === "number" &&
            "addedTimestamp" in spasmEvent.db &&
            spasmEvent.db.addedTimestamp &&
            hasValue(spasmEvent.db.addedTimestamp) &&
            typeof(spasmEvent.db.addedTimestamp) === "number" &&
            mainSpasmEvent.db.addedTimestamp < spasmEvent.db.addedTimestamp
          ) {
            mainSpasmEvent.db.addedTimestamp =
              spasmEvent.db.addedTimestamp
          }
          // updatedTimestamp
          if (
            (
              !("updatedTimestamp" in mainSpasmEvent.db) ||
              !mainSpasmEvent.db.updatedTimestamp ||
              !hasValue(mainSpasmEvent.db.updatedTimestamp)
            ) && (
              "updatedTimestamp" in spasmEvent.db &&
              spasmEvent.db.updatedTimestamp &&
              hasValue(spasmEvent.db.updatedTimestamp) &&
              typeof(spasmEvent.db.updatedTimestamp) === "number"
            )
          ) {
            mainSpasmEvent.db.updatedTimestamp =
              spasmEvent.db.updatedTimestamp
          } else if (
            "updatedTimestamp" in mainSpasmEvent.db &&
            mainSpasmEvent.db.updatedTimestamp &&
            hasValue(mainSpasmEvent.db.updatedTimestamp) &&
            typeof(mainSpasmEvent.db.updatedTimestamp) === "number" &&
            "updatedTimestamp" in spasmEvent.db &&
            spasmEvent.db.updatedTimestamp &&
            hasValue(spasmEvent.db.updatedTimestamp) &&
            typeof(spasmEvent.db.updatedTimestamp) === "number" &&
            mainSpasmEvent.db.updatedTimestamp < spasmEvent.db.updatedTimestamp
          ) {
            mainSpasmEvent.db.updatedTimestamp =
              spasmEvent.db.updatedTimestamp
          }
        }
      }

      // Children
      if (
        "children" in spasmEvent &&
        spasmEvent.children &&
        Array.isArray(spasmEvent.children) &&
        hasValue(spasmEvent.children)
      ) {
        if (
          !("children" in mainSpasmEvent) ||
          !mainSpasmEvent.children ||
          !Array.isArray(mainSpasmEvent.children) ||
          !hasValue(mainSpasmEvent.children)
        ) {
          mainSpasmEvent.children = spasmEvent.children
        } else if (
          "children" in mainSpasmEvent &&
          mainSpasmEvent.children &&
          Array.isArray(mainSpasmEvent.children) &&
          hasValue(mainSpasmEvent.children)
        ) {
          mergeChildrenV2([
            mainSpasmEvent.children, spasmEvent.children,
          ], depth)
        }
      }
    }
  })

  cleanSpasmEventV2(mainSpasmEvent)

  return mainSpasmEvent
}

export const mergeDifferentSpasmEventsV2 = (
  unknownEvents: any[],
  depth: number = 0
): SpasmEventV2[] | null => {
  const maxRecursionDepth = 50
  if (depth > maxRecursionDepth) {
    throw new Error("Maximum recursion depth exceeded")
  }

  const spasmEvents: SpasmEventV2[] | null =
    toBeSpasmEventsV2(unknownEvents)
  if (
    !spasmEvents || !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null
  
  const uniqueIds: Set<string | number> = new Set()
  const uniqueEvents: SpasmEventV2[] = []

  const checkIfEventIsAlreadyInUnique = (
    event: SpasmEventV2
  ): Boolean => {
    const allEventIds = getAllEventIds(event)
    let isAlreadyAdded = false
    if (allEventIds && Array.isArray(allEventIds)) {
      allEventIds.forEach(id => {
        if (uniqueIds.has(id)) {
          isAlreadyAdded = true
        }
      })
    }
    return isAlreadyAdded
  }

  spasmEvents?.forEach(event => {
    // Spasm events might have multiple IDs so we need to use
    // flags below to avoid redoing the same actions.
    let isEventAddedToUnique = false
    const isEventAlreadyInUnique =
      checkIfEventIsAlreadyInUnique(event)
    let isEventMerged = false
    // TODO check if other IDs of an event
    // are not in uniqueIds
    if (
      'ids' in event && event.ids &&
      Array.isArray(event.ids)
    ) {
      event.ids.forEach(id => {
        if (
          "value" in id && id.value &&
          (
            typeof(id.value) === "string" ||
            typeof(id.value) === "number"
          )
        ) {
          if (
            !uniqueIds.has(id.value) &&
            !isEventAlreadyInUnique
          ) {
            uniqueIds.add(id.value)
            if (!isEventAddedToUnique) {
              uniqueEvents.push(event)
              isEventAddedToUnique = true
            }
          } else if (uniqueIds.has(id.value)){
            if (
              !isEventAddedToUnique && !isEventMerged
            ) {
              // find unique event with same ID and merge
              uniqueEvents.forEach((
                uniqueEvent, uniqueEventIndex
              ) => {
                if (
                  'ids' in uniqueEvent && uniqueEvent.ids &&
                  Array.isArray(uniqueEvent.ids)
                ) {
                  uniqueEvent.ids.forEach(uniqueEventId => {
                    if (
                      "value" in uniqueEventId &&
                      uniqueEventId.value &&
                      (
                        typeof(uniqueEventId.value) === "string" ||
                        typeof(uniqueEventId.value) === "number"
                      )
                    ) {
                      if (uniqueEventId.value === id.value) {
                        const mergedEvent = mergeSpasmEventsV2([
                          uniqueEvent, event, depth
                        ])
                        if (mergedEvent) {
                          uniqueEvents[uniqueEventIndex] =
                            mergedEvent
                          isEventMerged = true
                        }
                      }
                    }
                  })
                }
              })
            }
          }
        }
      })
    }
  })

  if (
    uniqueEvents && Array.isArray(uniqueEvents) &&
    uniqueEvents[0] &&
    isObjectWithValues(uniqueEvents[0])
  ) {
    return uniqueEvents
  } else {
    return null
  }
}

export const checkIfArrayHasThisSpasmEventV2 = (
  array: UnknownEventV2[],
  event: UnknownEventV2
): boolean => {
  if (!event) return false
  if (!array) return false
  if (!Array.isArray(array)) return false
  const allEventIds = getAllEventIds(event)
  if (!isArrayWithValues(allEventIds)) return false
  
  const found: boolean = array.some((item) => {
    const itemIds = getAllEventIds(item)
    if (isArrayWithValues(itemIds)) {
      return allEventIds.some(id => itemIds.includes(id))
    }
    return false
  })

  return found
}

export const checkIfArrayHasThisEvent =
  checkIfArrayHasThisSpasmEventV2

export const mergeEventIntoArray = (
  array: UnknownEventV2[],
  event: UnknownEventV2,
): void => {
  if (!event || !array) return
  if (!Array.isArray(array)) return
  const allEventIds = getAllEventIds(event)
  if (!isArrayWithValues(allEventIds)) return

  array.forEach((item, index) => {
    const itemIds = getAllEventIds(item)
    if (isArrayWithValues(itemIds)) {
      const ifMatch = allEventIds.some(id => itemIds.includes(id))
      if (ifMatch) {
        const mergedEvent = mergeSpasmEventsV2([item, event])
        if (mergedEvent) { array[index] = mergedEvent }
      }
    }
  })
}

export const insertIntoArrayIfEventIsUnique = (
  array: UnknownEventV2[],
  originalEvent: UnknownEventV2,
  method: "unshift" | "push" = "push",
  ifMergeWhenAvailable: boolean = true,
  ifConvertToSpasm: boolean = true,
  convertToSpasmVersion: "2.0.0" = "2.0.0"
): void => {
  let event: UnknownEventV2 | null = null

  if (ifConvertToSpasm) {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: convertToSpasmVersion } }
    }
    event = convertToSpasm(originalEvent, customConfig)
  } else {
    event = originalEvent
  }
  if (!event || !array) return
  if (!Array.isArray(array)) return

  // Event is already in the array
  if (checkIfArrayHasThisEvent(array, event)) {
    // Don't use mergeDifferentSpasmEventsV2, it's too costly
    if (ifMergeWhenAvailable) {mergeEventIntoArray(array, event)}
    return

  // Event is not in the array
  } else {
    if (method === "unshift") { array.unshift(event) }
    else if (method === "push") { array.push(event) }
  }
}

export const pushToArrayIfEventIsUnique = (
  array: SpasmEventV2[],
  event: SpasmEventV2,
  ifMergeWhenAvailable: boolean = true,
  ifConvertToSpasm: boolean = true,
  convertToSpasmVersion: "2.0.0" = "2.0.0"
) => {
  return insertIntoArrayIfEventIsUnique(
    array, event, "push", ifMergeWhenAvailable,
    ifConvertToSpasm, convertToSpasmVersion
  )
}

export const appendToArrayIfEventIsUnique =
  pushToArrayIfEventIsUnique

export const unshiftToArrayIfEventIsUnique = (
  array: SpasmEventV2[],
  event: SpasmEventV2,
  ifMergeWhenAvailable: boolean = true,
  ifConvertToSpasm: boolean = true,
  convertToSpasmVersion: "2.0.0" = "2.0.0"
) => {
  return insertIntoArrayIfEventIsUnique(
    array, event, "unshift", ifMergeWhenAvailable,
    ifConvertToSpasm, convertToSpasmVersion
  )
}

export const prependToArrayIfEventIsUnique =
  unshiftToArrayIfEventIsUnique

export const sortSpasmEventsV2ByDbAddedTimestamp = (
  unknownEvents: any[],
  order: "asc" | "desc" = "desc"
): SpasmEventV2[] | null => {
  const spasmEvents: SpasmEventV2[] | null =
    toBeSpasmEventsV2(unknownEvents)
  if (
    !spasmEvents || !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return null

  try {
    const spasmEventsWithDbTimestamp: SpasmEventV2[] = []
    const spasmEventsWithoutDbTimestamp: SpasmEventV2[] = []

    // Events without db.addedTimestamp are moved into a separate
    // array which is joined with the sorted array at the end.
    spasmEvents.forEach(event => {
      if (
        'db' in event && event.db &&
        'addedTimestamp' in event.db &&
        event.db.addedTimestamp &&
        typeof(event.db.addedTimestamp) === "number"
      ) {
        spasmEventsWithDbTimestamp.push(event)
      } else {
        spasmEventsWithoutDbTimestamp.push(event)
      }
    })

    spasmEventsWithDbTimestamp.sort((a, b): number => {
      if (a.db?.addedTimestamp && b.db?.addedTimestamp) {
        if (order === "desc") {
          const result = String(b.db.addedTimestamp)
            .localeCompare(String(a.db.addedTimestamp))
          return result
        } else if (order === "asc") {
          const result = String(a.db.addedTimestamp)
            .localeCompare(String(b.db.addedTimestamp))
          return result
        }
      }
      // Ideally, return 1 should never happen because we've
      // filtered out events without db.addedTimestamp above.
      // In case if we missed some scenarios,
      // then 'return 1' should push an element without
      // db.addedTimestamp to the end of the array,
      // but it can still mess up the sorting.
      return 1
    })

    const sortedSpasmEvents = [
      ...spasmEventsWithDbTimestamp,
      ...spasmEventsWithoutDbTimestamp
    ]

    if (isArrayWithValues(sortedSpasmEvents)) {
      return sortedSpasmEvents
    } else {
      return null
    }
  } catch (err) {
    console.error(err);
    return null
  }
}

export const sortSpasmEventsV2 = sortSpasmEventsV2ByDbAddedTimestamp

export const ifEventsHaveSameSpasmId01 = (
  event1: UnknownEventV2, event2: UnknownEventV2
): Boolean => {
  if (!event1 || !event2) return false
  if (!isObjectWithValues(event1)) return false
  if (!isObjectWithValues(event2)) return false

  const spasmEvent1 = toBeSpasmEventV2(event1)
  const spasmEvent2 = toBeSpasmEventV2(event2)
  if (!spasmEvent1 || !spasmEvent2) return false

  const id1 = extractSpasmId01(spasmEvent1)
  const id2 = extractSpasmId01(spasmEvent2)

  return id1 === id2
}

// Using JSON.stringify method doesn't copy functions
// export const deepCopyOfObject = (obj: any) => {
//   if (!obj || typeof(obj) !== "object") return {}
//   return JSON.parse(JSON.stringify(obj))
// }

export const deepCopyOfObject = (
  obj: any, seen = new WeakMap()
): any => {
  // Handle primitives and functions
  if (obj === null || typeof obj !== "object") {
    return obj
  }
  
  // Check for circular references
  if (seen.has(obj)) {
    return seen.get(obj)
  }
  
  // Handle Date objects
  if (obj instanceof Date) {
    const copy = new Date(obj)
    seen.set(obj, copy)
    return copy
  }
  
  // Handle RegExp objects
  if (obj instanceof RegExp) {
    const copy = new RegExp(obj.source, obj.flags)
    seen.set(obj, copy)
    return copy
  }
  
  // Handle Map objects
  if (obj instanceof Map) {
    const copy = new Map()
    seen.set(obj, copy)
    obj.forEach((value, key) => {
      copy.set(
        deepCopyOfObject(key, seen),
        deepCopyOfObject(value, seen)
      )
    })
    return copy
  }
  
  // Handle Set objects
  if (obj instanceof Set) {
    const copy = new Set()
    seen.set(obj, copy)
    obj.forEach(value => {
      copy.add(deepCopyOfObject(value, seen))
    })
    return copy
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    const copy: any[] = []
    seen.set(obj, copy)
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopyOfObject(obj[i], seen)
    }
    return copy
  }
  
  // Handle regular objects
  const copy: any = {}
  seen.set(obj, copy)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyOfObject(obj[key], seen)
    }
  }
  
  return copy
}

export const copyOf = deepCopyOfObject

// Used for tests to bypass TypeScript string type checks
export const fakeAsString = (val: any): string => val as string

// Used for tests to bypass TypeScript number type checks
export const fakeAsNumber = (val: any): number => val as number

// Used for tests to bypass TypeScript arrray type checks
export const fakeAsArray = (val: any): any[] => val as any[]

// Used for tests to bypass TypeScript null type checks
export const fakeAsNull = (val: any): null => val as null

// Used for tests to bypass TypeScript any type checks
export const fakeAsAny = (val: any): any => val as any

// Used for tests to bypass TypeScript any type checks
export const fakeAsObject = (val: any): Record<any, any> => { 
  return val as Record<any, any>
}

// Used for tests to bypass TypeScript string type checks
export const fakeAsFunction = (val: any): CustomFunctionType => {
  return val as CustomFunctionType
}

export const cleanSpasmEventV2 = (
  spasmEvent: SpasmEventV2
): void => {
  if (!spasmEvent) return
  if (!isObjectWithValues(spasmEvent)) return

  // Remove siblings without signatures if signed siblings
  // of the same protocol and protocol version are attached.
  const allSiblingTypes: Set<string> = new Set();

  spasmEvent.siblings?.forEach(sibling => {
    if ('type' in sibling && sibling.type) {
      allSiblingTypes.add(sibling.type)
    }
  })

  if (
    'siblings' in spasmEvent &&
    spasmEvent.siblings &&
    Array.isArray(spasmEvent.siblings)
  ) {
    const cleanSiblings = spasmEvent.siblings?.filter(sibling => {
      if (
        (
          sibling.type === "SiblingSpasmV2" &&
          allSiblingTypes.has("SiblingSpasmSignedV2")
        ) ||
        (
          sibling.type === "SiblingDmpV2" &&
          allSiblingTypes.has("SiblingDmpSignedV2")
        ) ||
        (
          sibling.type === "SiblingNostrV2" &&
          allSiblingTypes.has("SiblingNostrSignedV2")
        ) ||
        (
          sibling.type === "SiblingNostrSpasmV2" &&
          allSiblingTypes.has("SiblingNostrSpasmSignedV2")
        )
      ) {
        return false
      }
      return true
    })
    spasmEvent.siblings = cleanSiblings
  }
}

export const mergeStatsV2 = (
  allStats: SpasmEventStatV2[][]
): SpasmEventStatV2[] | null => {
  if (!allStats) return null
  if (!Array.isArray(allStats)) return null
  if (!allStats[0]) return null
  if (!allStats[0][0]) return null

  const mainStats: SpasmEventStatV2[] = allStats[0]
  const mainStatsActions: Set<string | number> = new Set();

  mainStats?.forEach(mainStat => {
    if (
      'action' in mainStat && mainStat.action &&
      (
        typeof(mainStat.action) === "string" ||
        typeof(mainStat.action) === "number"
      )
    ) {
      mainStatsActions.add(mainStat.action)
    }
  })

  allStats.forEach((stats, indexOfStats) => {
    // stats with index 0 is used for main stats
    if (
      indexOfStats > 0 &&
      stats &&
      Array.isArray(stats)
    ) {
      stats.forEach(stat => {
        if (
          'action' in stat && stat.action &&
          (
            typeof(stat.action) === "string" ||
            typeof(stat.action) === "number"
          )
        ) {
          // push stat for actions that don't exist on main stats
          if (!mainStatsActions.has(stat.action)) {
            mainStats.push(stat)
            mainStatsActions.add(stat.action)
          // if action stat exists on main, set it to the newest
          } else if (mainStatsActions.has(stat.action)) {
            mainStats.forEach((mainStat, indexOfMainStat) => {
              if (
                mainStat.action &&
                stat.action === mainStat.action
              ) {
                if (
                  'latestTimestamp' in mainStat &&
                  mainStat.latestTimestamp &&
                  typeof(mainStat.latestTimestamp) === "number" &&
                  'latestTimestamp' in stat &&
                  stat.latestTimestamp &&
                  typeof(stat.latestTimestamp) === "number"
                ) {
                  if (
                    stat.latestTimestamp > mainStat.latestTimestamp
                  ) {
                    mainStats[indexOfMainStat] = stat
                  }
                } else if (
                  'latestDbTimestamp' in mainStat &&
                  mainStat.latestDbTimestamp &&
                  typeof(mainStat.latestDbTimestamp) === "number" &&
                  'latestDbTimestamp' in stat &&
                  stat.latestDbTimestamp &&
                  typeof(stat.latestDbTimestamp) === "number"
                ) {
                  if (
                    stat.latestDbTimestamp > mainStat.latestDbTimestamp
                  ) {
                    mainStats[indexOfMainStat] = stat
                  }
                }
              }
            })
          }
        }
      })
    }
  })
  return mainStats
}

export const mergeChildrenV2 = (
  allChildren: SpasmEventChildV2[][],
  depth: number = 0
): SpasmEventChildV2[] | null => {
  const maxRecursionDepth = 50
  if (depth > maxRecursionDepth) {
    throw new Error("Maximum recursion depth exceeded")
  }

  if (!allChildren) return null
  if (!Array.isArray(allChildren)) return null
  if (!allChildren[0]) return null
  // The first array might be empty
  // if (!allChildren[0][0]) return null

  const mainChildren: SpasmEventChildV2[] = allChildren[0]
  const mainChildrenIds: Set<string | number> = new Set()

  mainChildren?.forEach(mainChild => {
    if (
      'ids' in mainChild && mainChild.ids &&
      Array.isArray(mainChild.ids)
    ) {
      mainChild.ids.forEach(id => {
        if (
          "value" in id && id.value &&
          (
            typeof(id.value) === "string" ||
            typeof(id.value) === "number"
          )
        ) {
          mainChildrenIds.add(id.value)
        }
      })
    }
  })

  allChildren.forEach((children, indexOfChildren) => {
    // children with index 0 is used for main children
    if (
      indexOfChildren > 0 &&
      children &&
      Array.isArray(children)
    ) {
      children.forEach(child => {
        let isChildMerged = false
        if (
          'ids' in child && child.ids &&
          Array.isArray(child.ids)
        ) {
          child.ids.forEach(id => {
            if (
              'value' in id && id.value &&
              (
                typeof(id.value) === "string" ||
                typeof(id.value) === "number"
              )
            ) {
              // isChildMerged flag is used because events can
              // have many IDs and we don't want to redo merging
              // for each ID if a child has already been merged.
              if (
                !mainChildrenIds.has(id.value) &&
                !isChildMerged
              ) {
                mainChildren.push(child)
                mainChildrenIds.add(id.value)
                isChildMerged = true
              } else if (
                mainChildrenIds.has(id.value) &&
                !isChildMerged
              ) {
                mainChildren.forEach((mainChild, mainChildIndex) => {
                  if (
                    'ids' in mainChild && mainChild.ids &&
                    Array.isArray(mainChild.ids)
                  ) {
                    mainChild.ids.forEach(mainChildId => {
                      if (
                        'value' in id && mainChildId.value &&
                        (
                          typeof(mainChildId.value) === "string" ||
                          typeof(mainChildId.value) === "number"
                        )
                      ) {
                        if (mainChildId.value === id.value) {
                          if (
                            'event' in child && child.event &&
                            typeof(child.event) === "object" &&
                            hasValue(child.event)
                          ) {
                            // Add child.event to main if event
                            // doesn't exist in main child.
                            if (
                              !('event' in mainChild) ||
                              !mainChild.event ||
                              typeof(mainChild.event) !== "object" ||
                              !hasValue(mainChild.event)
                            ) {
                              mainChildren[mainChildIndex].event =
                                child.event
                            // If event already exists in main,
                            // then merge two events.
                            } else if (
                              'event' in mainChild &&
                              mainChild.event &&
                              typeof(mainChild.event) === "object" &&
                              hasValue(mainChild.event)
                            ) {
                              const mergedChildEvent =
                                mergeSpasmEventsV2([
                                  mainChild.event,
                                  child.event,
                                  depth + 1
                              ])
                              const finalChild = {
                                ...mainChild
                              }
                              if (mergedChildEvent) {
                                finalChild.event =
                                  mergedChildEvent
                              }
                                mainChildren[mainChildIndex] =
                                  finalChild
                            }
                          }
                          isChildMerged = true
                        }
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    }
  })

  return mainChildren
}

export const addEventsToTree = (
  unknownEvent: UnknownEventV2,
  unknownEvents: UnknownEventV2[],
  maxDepth: number = 10,
  ifRecursively: boolean = true,
  depth: number = 0,
  destination: "any" | "up" | "down" = "any",
  ifMerge: boolean = true
): SpasmEventV2 | null => {
  if (!unknownEvent) return null
  let treeEventV2: SpasmEventV2 | null  =
    toBeSpasmEventV2(unknownEvent)
  if (
    !treeEventV2 || !isObjectWithValues(treeEventV2)
  ) return null

  const maxRecursionDepth = maxDepth ?? 10
  if (depth >= maxRecursionDepth) { return treeEventV2 }

  if (!unknownEvents) return treeEventV2
  const spasmEvents: SpasmEventV2[] | null =
    toBeSpasmEventsV2(unknownEvents)
  if (
    !spasmEvents || !spasmEvents[0] ||
    !isObjectWithValues(spasmEvents[0])
  ) return treeEventV2

  const treeRootIds = getAllRootIds(treeEventV2)
  const treeParentIds = getAllParentIds(treeEventV2)
  const treeIds = getAllEventIds(treeEventV2)

  spasmEvents.forEach(event => {
    if (!treeEventV2) return // break from forEach iteration
    if (event && isObjectWithValues(event)) {
      // const eventRootIds = getAllRootIds(event)
      const eventParentIds = getAllParentIds(event)
      const eventIds = getAllEventIds(event)
      // Merge if events have the same ID
      if (ifArraysHaveCommonId(treeIds, eventIds)) {
        if (ifMerge) {
          treeEventV2 = mergeSpasmEventsV2([treeEventV2, event])
        }
      // Attach to tree as a root event
      } else if (ifArraysHaveCommonId(treeRootIds, eventIds)) {
        if (destination === "any" || destination === "up") {
          treeEventV2 = attachEventAsRoot(treeEventV2, event)
        }
      // Attach to tree as a parent event
      } else if (ifArraysHaveCommonId(treeParentIds, eventIds)) {
        if (destination === "any" || destination === "up") {
          treeEventV2 = attachEventAsParent(treeEventV2, event)
        }
      // Attach to tree as a child event
      } else if (ifArraysHaveCommonId(treeIds, eventParentIds)) {
        if (destination === "any" || destination === "down") {
          treeEventV2 = attachEventAsChild(treeEventV2, event)
        }
      // Check if event should be attached to depth + 1
      } else if (ifRecursively) {
        // Root
        if (treeEventV2?.root?.event) {
          if (destination === "any" || destination === "up") {
            const eventWithAddedRelative =
              addEventsToTree(
                treeEventV2?.root?.event, [event],
                maxDepth, ifRecursively, depth + 1, "up"
            )
            if (eventWithAddedRelative) {
              treeEventV2.root.event = eventWithAddedRelative
            }
          }
        }
        // Parent
        if (treeEventV2?.parent?.event) {
          if (destination === "any" || destination === "up") {
            const eventWithAddedRelative =
              addEventsToTree(
                treeEventV2?.parent?.event, [event],
                maxDepth, ifRecursively, depth + 1, "up"
            )
            if (eventWithAddedRelative) {
              treeEventV2.parent.event = eventWithAddedRelative
            }
          }
        }
        // Children
        if (
          treeEventV2?.children &&
          isArrayWithValues(treeEventV2.children)
        ) {
          if (destination === "any" || destination === "down") {
            treeEventV2.children.forEach(child => {
              // Child
              if (child?.event) {
                const eventWithAddedRelative =
                  addEventsToTree(
                    child?.event, [event],
                    maxDepth, ifRecursively, depth + 1, "down"
                )
                if (eventWithAddedRelative) {
                  child.event = eventWithAddedRelative
                }
              }
            })
          }
        }
      }
    }
  })

  if (
    treeEventV2 && isObjectWithValues(treeEventV2)
  ) {
    return treeEventV2
  } else {
    return null
  }
}

// TODO set directions and maxDepth
export const addParentToTree = addEventsToTree
export const addParentToEvent = addEventsToTree

export const addRootToTree = addEventsToTree
export const addRootToEvent = addEventsToTree

export const addChildrenToTree = addEventsToTree
export const addCommentsToEvent = addEventsToTree
export const addRepliesToEvent = addEventsToTree

export const ifArraysHaveCommonId = (
  array1: (string | number)[],
  array2: (string | number)[]
): boolean => {
  if (!array1 || !isArrayOfStringsOrNumbers(array1)) return false
  if (!array2 || !isArrayOfStringsOrNumbers(array2)) return false
   
  let ifCommonValue: boolean = false
  array1.forEach(value => {
    if (array2.includes(value)) {
      ifCommonValue = true
    }
  })
  return ifCommonValue
}

export const attachEventAsChild = (
  unknownMainEvent: UnknownEventV2,
  unknownChildEvent: UnknownEventV2
): SpasmEventV2 | null => {
  if (!unknownMainEvent) return null
  const mainSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownMainEvent)
  if (
    !mainSpasmEvent || !isObjectWithValues(mainSpasmEvent)
  ) return null

  if (!unknownChildEvent) return mainSpasmEvent
  const childSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownChildEvent)
  if (
    !childSpasmEvent || !isObjectWithValues(childSpasmEvent)
  ) return mainSpasmEvent

  const child: SpasmEventChildV2 = { event: childSpasmEvent }

  if (
    childSpasmEvent.ids &&
    isArrayWithValues(childSpasmEvent.ids)
  ) { child.ids = childSpasmEvent.ids }
  
  // Create children key if it doesn't exist
  mainSpasmEvent.children ??= [];

  const mergedChildren = mergeChildrenV2([
    mainSpasmEvent.children, [child]
  ])
  if (mergedChildren) {
    mainSpasmEvent.children = mergedChildren
  }

  if (
    mainSpasmEvent && isObjectWithValues(mainSpasmEvent)
  ) { return mainSpasmEvent } else { return null }
}

export const attachEventAsRoot = (
  unknownMainEvent: UnknownEventV2,
  unknownRootEvent: UnknownEventV2
): SpasmEventV2 | null => {
  if (!unknownMainEvent) return null
  const mainSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownMainEvent)
  if (
    !mainSpasmEvent || !isObjectWithValues(mainSpasmEvent)
  ) return null

  if (!unknownRootEvent) return mainSpasmEvent
  const rootSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownRootEvent)
  if (
    !rootSpasmEvent || !isObjectWithValues(rootSpasmEvent)
  ) return mainSpasmEvent

  if (mainSpasmEvent.root) {
    if (!mainSpasmEvent.root.event) {
      mainSpasmEvent.root.event = rootSpasmEvent
    } else if (
      mainSpasmEvent.root.event &&
      isObjectWithValues(mainSpasmEvent.root.event)
    ) {
      const mergedRootEvent = mergeSpasmEventsV2([
        mainSpasmEvent.root.event, rootSpasmEvent
      ])
      if (mergedRootEvent) {
        mainSpasmEvent.root.event = mergedRootEvent
      }
    }
  }

  if (
    mainSpasmEvent && isObjectWithValues(mainSpasmEvent)
  ) { return mainSpasmEvent } else { return null }
}

export const attachEventAsParent = (
  unknownMainEvent: UnknownEventV2,
  unknownParentEvent: UnknownEventV2
): SpasmEventV2 | null => {
  if (!unknownMainEvent) return null
  const mainSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownMainEvent)
  if (
    !mainSpasmEvent || !isObjectWithValues(mainSpasmEvent)
  ) return null

  if (!unknownParentEvent) return mainSpasmEvent
  const parentSpasmEvent: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownParentEvent)
  if (
    !parentSpasmEvent || !isObjectWithValues(parentSpasmEvent)
  ) return mainSpasmEvent

  if (mainSpasmEvent.parent) {
    if (!mainSpasmEvent.parent.event) {
      mainSpasmEvent.parent.event = parentSpasmEvent
    } else if (
      mainSpasmEvent.parent.event &&
      isObjectWithValues(mainSpasmEvent.parent.event)
    ) {
      const mergedParentEvent = mergeSpasmEventsV2([
        mainSpasmEvent.parent.event, parentSpasmEvent
      ])
      if (mergedParentEvent) {
        mainSpasmEvent.parent.event = mergedParentEvent
      }
    }
  }

  if (
    mainSpasmEvent && isObjectWithValues(mainSpasmEvent)
  ) { return mainSpasmEvent } else { return null }
}

// Assign formats for IDs, signatures, addresses if don't exist
export const assignFormats = (
  event: SpasmEventV2
): void => {
  if (
    !isObjectWithValues(event) ||
    !("type" in event) || !event.type ||
    event.type !== "SpasmEventV2"
  ) { return }

  // Assign id format if doesn't exist
  if (
    "ids" in event && event.ids &&
    isArrayWithValues(event.ids)
  ) {
    event.ids.forEach(id => {
      if (
        id.value && (
          !("format" in id) || !id.format ||
          !isObjectWithValues(id.format)
        )
      ) {
        if (getFormatFromId(id.value)) {
          id.format = getFormatFromId(id.value)!
        }
      }
    })
  }

  // Assign author address format if doesn't exist
  if (
    "authors" in event && event.authors &&
    isArrayWithValues(event.authors)
  ) {
    event.authors.forEach(author => {
      if (
        "addresses" in author && author.addresses &&
        isArrayWithValues(author.addresses)
      ) {
        author.addresses.forEach(address => {
          if (
            !("format" in address) || !address.format ||
            isObjectWithValues(address.format)
          ) {
            if (getFormatFromAddress(address.value)) {
              address.format = getFormatFromAddress(address.value)!
            }
          }
        })
      }
    })
  }

  // Assign signature format if doesn't exist
  if (
    "signatures" in event && event.signatures &&
    isArrayWithValues(event.signatures)
  ) {
    event.signatures.forEach(signature => {
      if (
        signature.value && (
          !("format" in signature) || !signature.format ||
          !isObjectWithValues(signature.format)
        )
      ) {
        if (getFormatFromSignature(signature.value)) {
          signature.format =
            getFormatFromSignature(signature.value)!
        }
      }
    })
  }

  // Assign ID and signature formats for siblings
  if (
    "siblings" in event && event.siblings &&
    isArrayWithValues(event.siblings)
  ) {
    event.siblings.forEach(sibling => {
      // Assign id format if doesn't exist
      if (
        "ids" in sibling && sibling.ids &&
        isArrayWithValues(sibling.ids)
      ) {
        sibling.ids.forEach(id => {
          if (
            id.value && (
              !("format" in id) || !id.format ||
              !isObjectWithValues(id.format)
            )
          ) {
            if (getFormatFromId(id.value)) {
              id.format = getFormatFromId(id.value)!
            }
          }
        })
      }

      // Assign signature format if doesn't exist
      if (
        "signatures" in sibling && sibling.signatures &&
        isArrayWithValues(sibling.signatures)
      ) {
        sibling.signatures.forEach(signature => {
          if (
            signature.value && (
              !("format" in signature) || !signature.format ||
              !isObjectWithValues(signature.format)
            )
          ) {
            if (getFormatFromSignature(signature.value)) {
              signature.format =
                getFormatFromSignature(signature.value)!
            }
          }
        })
      }
    })
  }

  // Assign parent ID format if doesn't exist
  if (
    "parent" in event && event.parent &&
    isObjectWithValues(event.parent)
  ) {
    if (
      "ids" in event.parent && event.parent.ids &&
      isArrayWithValues(event.parent.ids)
    ) {
      event.parent.ids.forEach(id => {
        if (
          id.value && (
            !("format" in id) || !id.format ||
            !isObjectWithValues(id.format)
          )
        ) {
          if (getFormatFromId(id.value)) {
            id.format = getFormatFromId(id.value)!
          }
        }
      })
    }
  }

  // Assign root ID format if doesn't exist
  if (
    "root" in event && event.root &&
    isObjectWithValues(event.root)
  ) {
    if (
      "ids" in event.root && event.root.ids &&
      isArrayWithValues(event.root.ids)
    ) {
      event.root.ids.forEach(id => {
        if (
          id.value && (
            !("format" in id) || !id.format ||
            !isObjectWithValues(id.format)
          )
        ) {
          if (getFormatFromId(id.value)) {
            id.format = getFormatFromId(id.value)!
          }
        }
      })
    }
  }

  // Assign ID format for each reference if doesn't exist
  if (
    "references" in event && event.references &&
    isArrayWithValues(event.references)
  ) {
    event.references.forEach(reference => {
      if (
        "ids" in reference && reference.ids &&
        isArrayWithValues(reference.ids)
      ) {
        reference.ids.forEach(id => {
          if (
            id.value && (
              !("format" in id) || !id.format ||
              !isObjectWithValues(id.format)
            )
          ) {
            if (getFormatFromId(id.value)) {
              id.format = getFormatFromId(id.value)!
            }
          }
        })
      }
    })
  }

  // Assign address format for each mentionedAuthor if doesn't exist
  if (
    "mentions" in event && event.mentions &&
    isArrayWithValues(event.mentions)
  ) {
    event.mentions.forEach(mention => {
      if (
        "addresses" in mention && mention.addresses &&
        isArrayWithValues(mention.addresses)
      ) {
        mention.addresses.forEach(address => {
          if (
            !("format" in address) || !address.format ||
            isObjectWithValues(address.format)
          ) {
            if (getFormatFromAddress(address.value)) {
              address.format =
                getFormatFromAddress(address.value)!
            }
          }
        })
      }
    })
  }
}

export const isHex = (
  value: any
): boolean => {
  if (!value) return false
  if (typeof(value) !== "string") return false
  const hexChars = [
    "0","1","2","3","4","5","6","7","8","9",
    "a","b","c","d","e","f"
  ]
  const valueArray = value.toLowerCase().split("")
  return valueArray.every(char => hexChars.includes(char))
}

export const isNostrHex = (
  value: any
): boolean => {
  if (!value) return false
  if (!isHex(value)) return false
  if (typeof(value) !== "string") return false
  if (value.length !== 64) return false
  return true
}

export const normalizeText = (val: string): string => {
  try {
    if (!val) return ''
    if (!String(val)) return ''
    let str = String(val)

    // str = removeNbsp(str)
    // if (!str) return ''

    str = str.normalize('NFC');
    if (!str) return ''

    return str
  } catch (err) {
    // console.error(err);
    return ''
  }
}

export const removeNbsp = (val: string): string => {
  try {
    if (!val) return ''
    if (typeof(val) !== "string") return ''
    // ` ` - NBSP \u00A0 U+00A0 &nbsp; &#160; (non-breaking space)
    // ` ` - SSP  \u0020 U+0020 (standard space)
    const nbsp = '\u00A0'
    let result = '';
    for (let i = 0; i < val.length; i++) {
      const char = val[i]
      // result += char === nbsp ? ' ' : char
      result += char === nbsp ? ' ' : char
    }
    return result
  } catch (err) {
    // console.error(err);
    return ''
  }
}

export const toBeString = (input: any): string => {
  switch (typeof input) {
    case 'number':
      return input.toString();
    case 'boolean':
      // Converts boolean to 'true' or 'false'
      return input.toString();
    case 'object':
      // Arrays are technically also objects in JS
      if (
        input && input !== null &&
        typeof(input) === 'object'
      ) {
        try {
          return JSON.stringify(input);
        } catch (e) {
          // Return empty string if JSON.stringify fails
          return '';
        }
      }
      break;
    case 'string':
      return input;
    default:
      return '';
  }
  return ''; // Fallback for cases not covered by the switch
}

// Using a Map for O(1) lookups of official MIME types
export const MIME_TYPE_MAP = new Map<string, string>([
  // Video
  ['mp4', 'video/mp4'],
  ['mov', 'video/quicktime'],
  ['avi', 'video/x-msvideo'],
  ['mkv', 'video/x-matroska'],
  ['webm', 'video/webm'],
  ['m4v', 'video/mp4'],
  ['wmv', 'video/x-ms-wmv'],
  ['flv', 'video/x-flv'],
  
  // Audio
  ['mp3', 'audio/mpeg'],
  ['wav', 'audio/wav'],
  ['flac', 'audio/flac'],
  ['ogg', 'audio/ogg'],
  // m4a is usually AAC in mp4 container
  ['m4a', 'audio/mp4'],
  ['aac', 'audio/aac'],
  ['opus', 'audio/opus'],
  ['wma', 'audio/x-ms-wma'],
  
  // Image
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
  ['gif', 'image/gif'],
  ['bmp', 'image/bmp'],
  ['webp', 'image/webp'],
  ['ico', 'image/vnd.microsoft.icon'],
  ['svg', 'image/svg+xml'],
  ['tiff', 'image/tiff'],
  
  // Other
  ['pdf', 'application/pdf'],
  ['zip', 'application/zip'],
  ['json', 'application/json'],
  // 'application/git' is not standard IANA, but used by GitHub
  ['git', 'application/git'],
])

export const DEFAULT_MIME_TYPE = 'application/octet-stream'

// Supports:
// https://degenrocket.space/video.mp4?extra=info
// podcast-name-episode1.mp3
// prefix0123456.jpeg
export const getMimeType = (str: string): string => {
  if (!str || typeof(str) !== "string") return DEFAULT_MIME_TYPE
  const lastDotIndex = str.lastIndexOf('.')
  const queryIndex = str.lastIndexOf('?')

  if (lastDotIndex < 0) {
    const finalExt =
      MIME_TYPE_MAP.get(str.toLowerCase()) || DEFAULT_MIME_TYPE
    return finalExt
  }
  
  // Determine end of extension part (ignore query params)
  const strEndIndex = queryIndex > -1 ? queryIndex : str.length

  // Ensure we have a dot and it's somewhere in the path
  // (not just a dot file at start or weird query)
  if (lastDotIndex > -1 && lastDotIndex < strEndIndex - 1) {
    const ext = str.substring(lastDotIndex + 1, strEndIndex)
    const finalExt: string =
      MIME_TYPE_MAP.get(ext.toLowerCase())
      || DEFAULT_MIME_TYPE
    return finalExt
  }
  return DEFAULT_MIME_TYPE
}

export const getAllUrlsFromString = (
  description: string
): string[] => {
  if (!description) return []
  if (typeof(description) !== "string") return []

  const urls: string[] = []

  const length = description.length;
  let i = 0;

  // Chars that typically mark the END of a URL in text
  // We will strip these from the end if found.
  const TRAILING_PUNCTUATION = new Set([
    '.', ',', '!', '?', ';', ':', '"',
    '\'', ')', ']', '}', '>', '`', "'"
  ]);

  // Chars that are NOT allowed in a URL (act as delimiters)
  // Includes whitespace, control chars,
  // and common invisible chars
  const INVALID_CHARS = new Set([
    ' ', '\t', '\n', '\r', '<', '|', '\\',
    '\u00A0', '\u200B', '\u200C', '\u200D',
    ' ' // nbsp
  ]);

  // Allowed characters in a URI (RFC 3986)
  // Unreserved: A-Z a-z 0-9 - . _ ~
  // Reserved: : / ? # [ ] @ ! $ & ' ( ) * + , ; =
  // We will check if char is alphanumeric
  // or one of these symbols
  const URI_SYMBOLS = new Set([
    ':', '/', '?', '#', '[', ']', '@', '!', '$', '&', '(',
    ')', '*', '+', ',', ';', '=', '-', '.', '_', '~', '%'
  ]);

  while (i < length) {
    const char = description[i];

    // 1. Detect "http://" or "https://"
    if (char === 'h') {
      if (
        description.slice(i, i+7) === 'http://' ||
        description.slice(i, i+8) === 'https://'
      ) {
        let urlEnd = i;

        // 2. Consume valid URL characters
        while (urlEnd < length) {
          const c = description[urlEnd];
          
          // Stop if we hit an invalid delimiter
          // (whitespace, brackets, etc)
          if (INVALID_CHARS.has(c)) {
            break;
          }

          // Stop if it's not alphanumeric and not a valid URI symbol
          const isAlphaNum = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
          if (!isAlphaNum && !URI_SYMBOLS.has(c)) {
            break;
          }

          urlEnd++;
        }

        // Extract raw URL (might have trailing punctuation like . or ,)
        let rawUrl = description.substring(i, urlEnd);

        // 3. Strip trailing punctuation (e.g. "video.mp4!" -> "video.mp4")
        while (rawUrl.length > 0) {
          const lastChar = rawUrl[rawUrl.length - 1];
          if (TRAILING_PUNCTUATION.has(lastChar)) {
            rawUrl = rawUrl.slice(0, -1);
          } else {
            break;
          }
        }

        urls.push(rawUrl)

        // Continue searching after this invalid URL
        i = urlEnd;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return removeDuplicatesFromArrayOfStrings(urls)
}

export const extractAllUrlsFromString = getAllUrlsFromString
export const parseStringForUrls = getAllUrlsFromString

// Accepts file names and full URLs
export const ifFileNameOfMimeType = (
  value: string,
  mimeTypes: string | string[]
): boolean => {
  if (!value || typeof(value) !== "string") return false
  if (!mimeTypes) return false

  let arrayOfMimeTypes: string[] = []
  // Concat converts string or number into array
  arrayOfMimeTypes = arrayOfMimeTypes.concat(mimeTypes)

  if (
    !arrayOfMimeTypes || !isArrayWithValues(arrayOfMimeTypes)
  ) return false

  const fileMimeType = getMimeType(value)

  let ifMatch: boolean = false
  arrayOfMimeTypes.forEach(mimeType => {
    if (
      mimeType && typeof(mimeType) === "string" &&
      fileMimeType && typeof(fileMimeType) === "string" &&
      mimeType.toLowerCase() && fileMimeType.toLowerCase()
    ) {
      if (
        fileMimeType.toLowerCase()
          .startsWith(mimeType.toLowerCase())
      ) { ifMatch = true }
    }
  })
  return ifMatch
}

export const isFileNameOfMimeType = ifFileNameOfMimeType

export const getAllMediaUrlsFromArrayOfUrls = (
  array: string[],
  mediaTypes: string | string[] = ["video", "audio", "image"]
): string[] => {
  if (!array) return []
  return array.filter(val => {
    return ifFileNameOfMimeType(val, mediaTypes)
  })
}

export const filterAllMediaUrlsFromArrayOfUrls =
  getAllMediaUrlsFromArrayOfUrls

export const getAllMediaUrlsOfMimeTypeFromArrayOfUrls =
  getAllMediaUrlsFromArrayOfUrls

export const getAllUrlsOfMediaTypeFromArrayOfUrls =
  getAllMediaUrlsFromArrayOfUrls

export const getAllMediaUrlsFromString = (
  str: string,
  mediaTypes: string | string[] = ["video", "audio", "image"]
): string[] => {
  if (!str || typeof(str) !== "string") return []
  const arrayOfUrls = getAllUrlsFromString(str)
  if (!arrayOfUrls) return []
  const arrayOfMediaUrls = getAllMediaUrlsFromArrayOfUrls(
    arrayOfUrls, mediaTypes
  )
  return arrayOfMediaUrls
}

export const extractAllMediaUrlsFromString =
  getAllMediaUrlsFromString
export const parseStringForMediaUrls =
  getAllMediaUrlsFromString

export const getFirstMediaUrlFromString = (
  str: string,
  mediaTypes: string | string[] = ["video", "audio", "image"]
): string => {
  if (!str || typeof(str) !== "string") return ""
  const videoOrAudioUrls = 
    getAllMediaUrlsFromString(str, mediaTypes)
  if (
    videoOrAudioUrls && Array.isArray(videoOrAudioUrls) &&
    videoOrAudioUrls[0] &&
    typeof(videoOrAudioUrls[0]) == "string"
  ) { return videoOrAudioUrls[0] }
  return ""
}

export const extractFirstMediaUrlFromString =
  getFirstMediaUrlFromString
export const parseFirstMediaUrlFromString =
  getFirstMediaUrlFromString

export const getFirstAudioOrVideoUrlFromString = (
  str: string
): string => {
  return getFirstMediaUrlFromString(str, ["video", "audio"])
}

export const extractFirstAudioOrVideoUrlFromString = 
  getFirstAudioOrVideoUrlFromString
export const parseFirstAudioOrVideoUrlFromString = 
  getFirstAudioOrVideoUrlFromString

// Escape XML entities to prevent the RSS feed
// from breaking if a text contains <, >, &, ', "
export const escapeXml = (unsafe: string): string => {
  let safe = ''
  
  for (const char of unsafe) {
    switch (char) {
      case '<':
        safe += '&lt;'
        break
      case '>':
        safe += '&gt;'
        break
      case '&':
        safe += '&amp;'
        break
      case '\'':
        safe += '&apos;'
        break
      case '"':
        safe += '&quot;'
        break
      default:
        safe += char
        break
    }
  }
  
  return safe
}

// In XML, CDATA sections are terminated by the sequence "]]>"
// If this sequence appears in user input, it would prematurely
// end the CDATA section. This would break the XML structure
// and potentially allow injection of malicious XML.
// Replacing "]]>" with "]]]]><![CDATA[>" preserves the original
// content while ensuring the XML remains well-formed and secure
export const escapeXmlCdata = (input: string): string => {
  return input.replace(']]>', ']]]]><![CDATA[>');
}

export const escapeRssCdata = escapeXmlCdata
export const escapeCdata = escapeXmlCdata
export const prepareForXmlCdata = escapeXmlCdata
export const prepareForRssCdata = escapeXmlCdata
export const prepareForCdata = escapeXmlCdata

// Reverse the transformation done by escapeXmlCdata
export const restoreFromXmlCdata = (input: string): string => {
  return input.replace(']]]]><![CDATA[>', ']]>');
}

export const restoreFromRssCdata = restoreFromXmlCdata
export const restoreFromCdata = restoreFromXmlCdata
export const unescapeXmlCdata = restoreFromXmlCdata
export const unescapeRssCdata = restoreFromXmlCdata
export const unescapeCdata = restoreFromXmlCdata

export const autoGeneratedName = (value: string | number): string => {
  if (!value) return ""
  if (
    typeof(value) !== "string" &&
    typeof(value) !== "number"
  ) { return "" }

  const firstTech = [
    "bankless",
    "black",
    "blue",
    "dark",
    "decoded",
    "encoded",
    "fluffy",
    "free",
    "golden",
    "gray",
    "green",
    "hidden",
    "indie",
    "new",
    "neon",
    "orange",
    "purple",
    "red",
    "private",
    "pirate",
    "quantum",
    "scaling",
    "secure",
    "shadow",
    "silver",
    "stable",
    "swapping",
    "unbanked",
    "unstable",
    "white",
    "zero",
  ]

  const secondTech = [
    "airdrop",
    "alpha",
    "arbitrage",
    "block",
    "darknet",
    "defi",
    "degen",
    "chain",
    "code",
    "crypto",
    "cypher",
    "cult",
    "foss",
    "freedom",
    "hash",
    "jupiter",
    "key",
    "layer",
    "ledger",
    "linux",
    "lunar",
    "market",
    "mars",
    "meme",
    "mesh",
    "moon",
    "network",
    "night",
    "onion",
    "rollup",
    "script",
    "silkroad",
    "snapshot",
    "solar",
    "source",
    "space",
    "spasm",
    "tech",
    "token",
    "wallet",
    "zk",
  ]

  const thirdTech = [
    "auditor",
    "bot",
    "broker",
    "builder",
    "burner",
    "cyborg",
    "dev",
    "doxxer",
    "exchanger",
    "explorer",
    "farmer",
    "fighter",
    "flipper",
    "forker",
    "geek",
    "hacker",
    "hamster",
    "hodler",
    "hunter",
    // "innovator",
    "keeper",
    "kitty",
    // "liberator",
    // "maker",
    "master",
    "maxi",
    "miner",
    "minter",
    "mixer",
    "naut",
    "node",
    "noncer",
    "phantom",
    "punk",
    "rebel",
    "robot",
    "rocket",
    "router",
    "samourai",
    "scanner",
    "sharder",
    "signer",
    "sniffer",
    "stalker",
    "swapper",
    "tester",
    "trader",
    "wizard",
  ]

  const getNumberHashFromValue = (value: any): number => {
    let seed = ""
    if (typeof(value) === "number") {
      seed = value.toString()
    } else if (typeof(value) === "string") {
      seed = value
    }

    seed = seed.toLowerCase()

    // Map each character to its numerical value,
    // ignoring non-alphanumeric characters
    const charMap = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let sum = 0
    const maxLength = 64 // Maximum number of chars to process

    for (
      let i = 0; i < Math.min(seed.length, maxLength); i++
    ) {
        const charCode = seed[i];
        const index = charMap.indexOf(charCode);
        if (index !== -1) { // Character found in map
          // Multiply by 2 to reduce collisions
          sum = Math.floor(sum * 2) + index
        }
    }
    // Ensure the result fits within 32 bits
    return sum % (2 ** 32)
  }

  let sum = getNumberHashFromValue(value)

  const getUsernameFromNumber = (
    value: number,
    enableAutoGeneratedNamesDictionaryTech: boolean = true
  ) => {
    // Use the sum to determine the index
    // for selecting a word from each array
    const index1 =
      Math.abs((value * 11) % firstTech.length);
    const index2 =
      Math.abs((value * 13 * 17) % secondTech.length);
    const index3 =
      Math.abs((value * 19 * 23 * 29) % thirdTech.length);

    let word1 = ""
    let word2 = ""
    let word3 = ""

    // Select a word from each array
    // using the calculated indices
    if (enableAutoGeneratedNamesDictionaryTech) {
      word1 = firstTech[index1];
      word2 = secondTech[index2];
      word3 = thirdTech[index3];
    } else {
      // Use default dictionary
      // (currently equal to tech dictionary)
      word1 = firstTech[index1];
      word2 = secondTech[index2];
      word3 = thirdTech[index3];
    }

    // Combine the selected words to form the unique name
    const titleCaseWord = (word: string) => {
      if (!word) return word
      return word[0].toUpperCase() + word.slice(1)
    }

    return titleCaseWord(word1) +
           titleCaseWord(word2) +
           titleCaseWord(word3)
  }

  let username = getUsernameFromNumber(sum)
  
  while (username.length > 16) {
    sum += 31
    username = getUsernameFromNumber(sum)
  }

  return username
}

export const toBeShortAddress = (
  longAddress: string | number,
  ifPrefixWithAutoGeneratedName: boolean = true
): string => {
  try {
    const string = String(longAddress)
    if (!string) return ""
    const shortAddress = sliceAddress(string, 6)
    let final = ""
    if (ifPrefixWithAutoGeneratedName) {
      final = autoGeneratedName(string) + " "
    }
    final = final + "(" + shortAddress + ")"
    return final
  } catch (err) {
    console.error(err);
    return ""
  }
}

export const sliceAddress = (
  address?: string | PostSignature,
  start: number = 6,
    end: number = 4
) => {
  return address
    ? `${address.slice(0, start)}...${address.slice(-end)}`
    : ''
}

export const sliceId = (
  id: string | number,
  start: number = 6,
    end: number = 4,
    max?: number // used for URL length
): string => {
  if (!id) { return '' }
  const str: string = String(id) ? String(id) : ''
  if (!str) return ''

  let maxChar: number = Number(start) ? Number(start) : 6
  if (Number(end)) { maxChar += Number(end) }
  if (max && Number(max)) { maxChar = Number(max) }

  // ID is URL
  try {
    const url = new URL(str)
    if (url && typeof(url) === "object") {
      let slicedUrl = ''
      if (url.hostname && typeof(url.hostname) === "string") {
        slicedUrl += url.hostname
      }
      if (url.pathname && typeof(url.pathname) === "string") {
        slicedUrl += url.pathname
      }
      if (url.search && typeof(url.search) === "string") {
        slicedUrl += url.search
      }
      if (slicedUrl) {
        if (slicedUrl.length > maxChar + 3) {
          return `${slicedUrl.slice(0, maxChar)}...`
        } else {
          return slicedUrl
        }
      } else { '' }
    }
  } catch (err) {
    // Not a valid URL
    // console.error(err);
  }

  // else
  return str
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : ''
}

export const randomNumber = (min = 1, max = 1000000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

