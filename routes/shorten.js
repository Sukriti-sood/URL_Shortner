const express=require("express");
const bodyParser=require("body-parser");
const router=express.Router();
const uniqid=require("uniqid");
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const URL=require("../models/urls");
var urlData;


router.route("/")
.get((req,res,next)=>{
    res.json({"msg":"API working"});
})
.post((req,res,next)=>{
    console.log(req.body);
    if(req.body.url){
        urlData=req.body.url;
     
    }
    console.log("url is "+urlData);
    URL.findOne({url:urlData},(err,doc)=>{
        if(doc){
            console.log("Entry found in database");
            res.statusCode=200;
            res.setHeader("content-type","application/json");
            res.json({"shorten":"localhost:5000/api/"+doc._id});
        }
        else
        {
            console.log("This is new Url");
            const uid=uniqid();
            const webaddres=new URL({
                _id:uid,
                url:urlData,
            });

            URL.create(webaddres)
            .then((doc)=>{
                res.statusCode=200,
                res.setHeader("content-type","application/json");
                res.json({"shorten":"localhost:5000/api/"+doc._id});
            },(err)=>next(err))
            .catch((err)=>next(err));
      
        }
    })

    
})

module.exports=router;