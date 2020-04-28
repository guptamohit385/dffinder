let {
    useLast
} = require("unhell");
let {
    arrPop,
    arrFindAll,
    create,
    arrMultiPush
} = require("local-json-cache")
let {
    trustedLinksList,
    topicAttributeList,
    registerTopicsList,
    listAttributesFile,
    listTopicsFile,
    trustedLinksFile
} = require("../appStatic")

let tableCreate = (params, next) => {
    create(params.listTabName, "", "uniqueIDTrackingToken", (err) => {
        params.successfullCreated = true;
        return next(null, "success")
    });
}

let topicsUpdate = (params, next) => {
    arrMultiPush(params.listTabName, params.list, "uniqueIDTrackingToken", (err) => {
        if (err) {
            params.listUpdate = false;
            return next(err)
        }

        params.finalRes = "success";
        return next(null, params.finalRes)
    });
}

let handleRsp = (params, next) => {
    delete params.listTabName;
    return next(null, params)
}

let registerTopics = (params, handle) => {
    let inputs = {
        list: params || registerTopicsList
    };
    inputs.listTabName = listTopicsFile;
    useLast(inputs, tableCreate, topicsUpdate, handleRsp, handle);
}

let topicAttribute = (params, handle) => {
    let inputs = {
        list: params || topicAttributeList
    };
    inputs.listTabName = listAttributesFile;
    useLast(inputs, tableCreate, topicsUpdate, handleRsp, handle);
}

let trustedLinks = (params, handle) => {
    let inputs = {
        list: params || trustedLinksList
    };
    inputs.listTabName = trustedLinksFile;
    useLast(inputs, tableCreate, topicsUpdate, handleRsp, handle);
}

let getAttributes = (callback) => {
    arrFindAll(listAttributesFile, "", callback)
}

let getTopics = (callback) => {
    arrFindAll(listTopicsFile, "", callback)
}

let getTrustedLinks = (callback) => {
    arrFindAll(trustedLinksFile, "", callback)
}

let deleteAttributes = (deleteMe, callback) => {
    arrPop(listAttributesFile, deleteMe, "", callback)
}

let deleteTopics = (deleteMe, callback) => {
    arrPop(listTopicsFile, deleteMe, "", callback)
}

let deleteTrustedLinks = (deleteMe, callback) => {
    arrPop(trustedLinksFile, deleteMe, "", callback)
}

module.exports.registerTopics = registerTopics;
module.exports.topicAttribute = topicAttribute;
module.exports.trustedLinks = trustedLinks;

module.exports.getAttributes = getAttributes;
module.exports.getTopics = getTopics;
module.exports.getTrustedLinks = getTrustedLinks;

module.exports.deleteAttributes = deleteAttributes;
module.exports.deleteTopics = deleteTopics;
module.exports.deleteTrustedLinks = deleteTrustedLinks;