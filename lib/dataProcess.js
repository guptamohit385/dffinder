let { useLast } = require("unhell");
let request = require("request")
let htmlToText = require("html-to-text");
let {find, save, create, arrFindAll} = require("../../filedb")
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

let createArrDataForNlp = (topic, attr) => {
    let flist = [];
    let flistWT = {};
    topic.forEach(t => {
        attr.forEach(a => {
            flist.push(t + " " + a)
            let key = (t + " " + a).replace(/ /g, "_");
            flistWT[key] = {topic: t, attribute: a, key: key}
        })
    });
    return { flist, flistWT }
}

let findMeaning = (params, next) => {
    let { flist, flistWT } = createArrDataForNlp(params.listTopic, params.listAttr)
    dataCompare(flist, params.dataFor.split("\n"), 0.50, "", (err, succ)=> {
        let dataF = [];
        if(succ && succ.length){
            succ.forEach(a=> {
                if(a.length > 0){
                    dataF.push(a[0])
                }
            })
        }
        let dataObjList = [];
        dataF.forEach((finalItm) => {
            let k = flistWT[finalItm[2].replace(/ /g, "_")];
            dataObjList.push({
                ...k,
                accurate : finalItm[1],
                type : finalItm[2],
                data : finalItm[3]
            });
        })
        params.processedData = dataObjList;
        next();
    })
}

let getHtml = (params, next) => {
    request.get(params.trustedLinks[0], function(error, response, body){
        if(error){
            next(error, null)
        }
        params.dataFor = htmlToText.fromString(body, {wordwrap: 500});
        findMeaning(params, next)
    })
}

let tableCreate = (params, next) => {
    create(params.listTabName, "", "uniqueIDTrackingToken", (err) => {
        params.successfullCreated = true;
        return next(null, "success")
    });
}

let handleRsp = (params, next) => {
    delete params.listTabName;
    delete params.dataFor;
    return next(null, params)
}

let dataUpdate = (params, next) => {
    save(params.listTabName, params.processedData, "uniqueIDTrackingToken", (err) => {
        if (err) {
            params.dataUpdate = false;
            return next(err)
        }
        params.finalRes = "success";
        return next(null, params.finalRes)
    });
}

let getAttributes = (params, next) => {
    if(params.listAttr && params.listAttr.length){
        next()
    }else{
        arrFindAll(listAttributesFile, "", (err, succ)=>{
            params.listAttr = succ || topicAttributeList
            next()
        })
    }
}

let getTopics = (params, next) => {
    if(params.listTopic && params.listTopic.length){
        next()
    }else{
        arrFindAll(listTopicsFile, "", (err, succ)=>{
            params.listTopic = succ || registerTopicsList
            next()
        })
    }
}

let getTrustedLinks = (params, next) => {
    if(params.trustedLinks && params.trustedLinks.length){
        next()
    }else{
        arrFindAll(trustedLinksFile, "", (err, succ)=>{
            params.trustedLinks = succ || trustedLinksList
            next()
        })
    }
}

let startProcess = (params, handle)=>{
    let inputs = {
        listTopic: params.listTopic || undefined,
        listAttr: params.listAttr || undefined,
        trustedLinks: params.trustedLinks || undefined
    };
    inputs.listTabName = processedDataFile;
    useLast(inputs, getAttributes, getTopics, getTrustedLinks, getHtml, tableCreate, dataUpdate, handleRsp, handle);
}

let getData = (params, callback)=>{
    find(processedDataFile, params, "uniqueIDTrackingToken", function(err, succ){
        return callback(err, succ);
    });
}

module.exports.startProcess = startProcess;
//module.exports.updateProcess = updateProcess;
module.exports.getData = getData;


let x = {
    trustedLinks: ['https://www.medicinenet.com/diabetes_insipidus/article.htm']
}
startProcess(x, (err, succ)=>{
    console.log(err, succ)
})

// getData({ key: 'diabetes_insipidus_symptoms'}, (err, succ)=>{
//     console.log(err, succ.length)
// })

// getData({}, (err, succ)=>{
//     console.log(err, succ.length)
// })
