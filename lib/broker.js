let {
    useLast
} = require("unhell");
let {
    arrPop,
    arrFindAll,
    create,
    arrPush
} = require("../../filedb")
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

let dataUpdate = (params, next) => {
    arrPush(params.listTabName, params.list, "uniqueIDTrackingToken", (err) => {
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
    useLast(inputs, tableCreate, dataUpdate, handleRsp, handle);
}

let topicAttribute = (params, handle) => {
    let inputs = {
        list: params || topicAttributeList
    };
    inputs.listTabName = listAttributesFile;
    useLast(inputs, tableCreate, dataUpdate, handleRsp, handle);
}

let trustedLinks = (params, handle) => {
    let inputs = {
        list: params || trustedLinksList
    };
    inputs.listTabName = trustedLinksFile;
    useLast(inputs, tableCreate, dataUpdate, handleRsp, handle);
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

module.exports = {
    registerTopics,
    topicAttribute,
    trustedLinks,
    getAttributes,
    getTopics,
    getTrustedLinks,
    deleteAttributes,
    deleteTopics,
    deleteTrustedLinks,
    ...require("./dataProcess")
}