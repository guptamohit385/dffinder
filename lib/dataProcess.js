let { useLast } = require("unhell");
let {find, save, update, removeById, removeByKey, create} = require("local-json-cache")
let {dataCompare, summarizer} = require("datacompare");
let { 
    trustedLinksList, 
    topicAttributeList, 
    registerTopicsList,
    listAttributesFile,
    listTopicsFile,
    trustedLinksFile,
    processedDataFile
} = require("../appStatic")

let startProcess = (params, handle)=>{
    let inputs = {
        list: params || registerTopicsList
    };
    inputs.listTabName = processedDataFile;
    useLast(params, tableCreate, topicsUpdate, handleRsp, handle);
}

let getData = (params, handle)=>{
    let inputs = {
        list: params || registerTopicsList
    };
    inputs.listTabName = processedDataFile;
    useLast(params, tableCreate, topicsUpdate, handleRsp, handle);
}

module.exports.startProcess = startProcess;
module.exports.getData = getData;