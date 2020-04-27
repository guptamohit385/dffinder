let { useLast } = require("unhell");
let {find, save, update, removeById, removeByKey, create, arrPush} = require("local-json-cache")
let {dataCompare, summarizer} = require("datacompare")

function tableCreate(params, next){
    create(params.listTabName, "", "uniqueIDTrackingToken", (err) => {
        params.successfullTopicCreated = true;
        return next(null, "success")
    });
}

function topicUpdate(params, next){
    arrPush(params.listTabName, params.topic, "uniqueIDTrackingToken", (err) => {
        if(err){
            params.topicUpdate = false;
            return next(err)
        }
        params.finalRes = "success";
        return next(null, params.finalRes)
    });
}

function handleRsp(params, next){
    delete params.listTabName;
    return next(null, params)
}

module.exports.registerTopic = (params, handle)=>{
    params.listTabName = "listData";
    useLast(params, tableCreate, topicUpdate, handleRsp, handle);
}