let {
    registerTopics,
    topicAttribute,
    trustedLinks,
    getAttributes,
    getTopics,
    getTrustedLinks,
    deleteAttributes,
    deleteTopics,
    deleteTrustedLinks,
    startProcess
} = require("../lib");

registerTopics(["corona", "lockdown", "ppht", "tstTopic"], (err, success) => {
   console.log(err,  success)
})

topicAttribute(["features"], (err, success) => {
   console.log(err,  success)
})

trustedLinks("https://www.google.com/search?", (err, success) => {
   console.log(err,  success)
})

getAttributes((err, success) => {
   console.log(err,  success)
})

let x = {
    trustedLinks: ['https://www.medicinenet.com/diabetes_insipidus/article.htm']
}
startProcess(x, (err, succ)=>{
    console.log(err, succ)
    getData({}, (err, succ)=>{
        console.log(err, succ.length)
    })
})