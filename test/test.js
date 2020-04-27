let topReg = require("../lib");

topReg.registerTopic({topic: "corona lockdown"}, function(err, success){
   if(err)
      console.log("err--->", err);
   
   else
      console.log("sucess--->", success);
})