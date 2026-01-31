import { isObjectWithValues, } from "./../utils/utils.js";
export const sortEventForSpasmid = (eventForSpasmid, idVersion = "01") => {
    if (!isObjectWithValues(eventForSpasmid))
        return null;
    const sortedEvent = {};
    if (idVersion === "01") {
        // console.log("idVersion:", idVersion)
    }
    return sortedEvent;
};
//# sourceMappingURL=sortEventForSpasmid.js.map