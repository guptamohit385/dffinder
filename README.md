# Data Fact Finder (dffinder) Details (Powered by kvertex.com)

Data scrapping from web using NLP and Machine Learning.

## step 1) Register Topic (Important)

```
let { registerTopics } = require("diffinder");

let topicsList = ["corona", "lockdown"]

registerTopics(topicsList, (err, success) => {
   console.log(err,  success)
})

```

## step 2) Register Topic's Attributes (Optional)

```
let { topicAttribute } = require("diffinder");

let topicAttributeList = ["features"]

topicAttribute(topicAttributeList, (err, success) => {
   console.log(err,  success)
})

```

## step 3) Register Trusted Links For Topics (Important)

```
let { trustedLinks } = require("diffinder");

let trustedLinksList = ["https://www.google.com/search?"]

trustedLinks(trustedLinksList, (err, success) => {
   console.log(err,  success)
})

```

## step 4) Start Process (Important)

```
let { startProcess } = require("diffinder");

 let params = {
    trustedLinks: ["https://www.google.com/search?"],
    listAttr: ["defination", "types", "features", "symptoms"], // optional
    listTopic: ["diabetes insipidus"]
 }

 startProcess(params, (err, succ)=>{
     console.log(err, succ)
 })

```

## step 5) Get Processed Data (Important)

```
let { getData } = require("diffinder");

let findAll = {};

getData(findAll, (err, succ)=>{
    console.log(err, succ.length)
})

let findDataByKey = { key: 'diabetes_insipidus_symptoms'};

getData({ topic: 'diabetes insipidus'}, (err, succ)=>{
    console.log(err, succ.length)
})

## output

/*
 *      [{ 
 *         topic: 'diabetes insipidus',
 *         attribute: 'symptoms',
 *         key: 'diabetes_insipidus_symptoms',
 *         accurate: 0.5776267051696777,
 *         type: 'diabetes insipidus symptoms',
 *         data:
 *         ' or help the health care provider determine if diabetes insipidus is the possible  *            cause of the patient\'s symptoms.',
 *         objID: 1588179831923 
 *      }]
 */

```

## Fetch Registered Topic, Attributes, Trusted Links

```
let { getTopics, getAttributes,  getTrustedLinks } = require("diffinder");

getTopics((err, success) => {
   console.log(err,  success)
})

getAttributes((err, success) => {
   console.log(err,  success)
})

getTrustedLinks((err, success) => {
   console.log(err,  success)
})

```

## Delete Registered Topic, Attributes, Trusted Links

```
let { deleteTopics, deleteAttributes,  deleteTrustedLinks } = require("diffinder");

deleteTopics((err, success) => {
   console.log(err,  success)
})

deleteAttributes((err, success) => {
   console.log(err,  success)
})

deleteTrustedLinks((err, success) => {
   console.log(err,  success)
})

```