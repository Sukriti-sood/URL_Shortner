const express=require("express");
const bodyParser=require("body-parser");
const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const URL=require("../models/urls");

router.route("/:sturl")
.get((req,res,next)=>{
    var shortu=req.params.sturl;
    URL.findOne({"_id":shortu})
    .then((doc)=>{
        res.statusCode=200;
        res.setHeader("content-type","applicaion/json");
        var surl=doc.url;
        if(surl.includes("http"))
        {
            res.redirect(surl);
        }
        else
        res.redirect("https://"+doc.url);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=router;