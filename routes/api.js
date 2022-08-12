const express = require("express");
const router = express.Router();
const base62 = require("../helper/base62")
const URL = require("../models/urls");
const validator = require("validator");
const url2 = require("url");

function getShortCode() {
    return base62.encode(`${Date.now()}`);
  }

async function updateClicks(shortID) {
    const respone = await URL.findOneAndUpdate(
        { shortID: shortID },
        { $inc: { click: 1 } }
    );
}
router.route("/api/new")
    .post(async(req, res, next) => {
        if (req.body.url) {
            urlData = req.body.url;

        }
        
        URL.findOne({ longURL: urlData }, (err, doc) => {
            if(err)
            {   res.statusCode = 400;
                res.json({error: err});
            }
            if (doc) {
               
                res.statusCode = 200;
                res.setHeader("content-type", "application/json");
                res.json({"shorten": process.env.URL +"/"+ doc.shortID});
            } else {
             
                const webaddres = new URL({
                    shortID: getShortCode(),
                    longURL: urlData,
                });

                URL.create(webaddres)
                    .then((doc) => {
                        res.statusCode = 200,
                            res.setHeader("content-type", "application/json");
                        res.json({ "shorten": process.env.URL +"/"+ doc.shortID});
                    }, )
                    .catch((err) => {res.statusCode = 400;
                      
                    res.json({error: err});});

            }
        })

    })

router.route("/api/new-custom")
.post(async(req, res, next) => {
    
    const {url, shortID} = req.body;

    // if document already exist

    const checkDoc = await URL.findOne({longURL:url, shortID:shortID});

    if(checkDoc)
    {
        res.status(200).json({"shorten":process.env.URL +"/"+ checkDoc.shortID})
    }

    const response = await URL.findOne({
        shortID: shortID,
      });
      if (response) {
        return res.status(400).json({
          error: "Short ID already exists!",
        });}
    
    // if url already exist 

    const checkLongURl = await URL.findOne({longURL:url});

    if(checkLongURl)
    {
        res.status(400).json({"error":"Can't change Short Id, Short Id already exists"})
    }


    const webaddres = new URL({
        shortID: shortID,
        longURL: url,
    });
   
    URL.create(webaddres)
        .then((doc) => {
            res.statusCode = 200,
                res.setHeader("content-type", "application/json");
            res.json({"shorten": process.env.URL +"/"+ doc.shortID });
        },)
        .catch((err) => {res.statusCode = 400;
        res.json({error: "Check URL or ShortID"});});
})

router.route("/:shortID")
    .get(async(req, res, next) => {
    
        const {shortID} = req.params;
        if(!shortID){
            return res.redirect(process.env.CLIENT_URL)
        }

        const response = await URL.findOne({shortID:shortID});

        if(!response){
            return res.redirect(process.env.CLIENT_URL)
        } 

        await updateClicks(shortID);

        if (response.longURL.includes("http")) {
            return res.redirect(response.longURL);
          } else {
            return res.redirect("https://" + response.longURL);
          }
    });


router.route("/api/click")
.post(async(req, res, next) => {
    const { url } = req.body;
    
    if(!url.includes("//localhost")){
    if (!validator.isURL(url)) {
        
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
}
    const myURL = new url2.URL(url);
    
    const response = await URL.findOne({
      shortID: myURL.pathname.slice(1),
    });
    if (!response) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    return res.status(200).json(response);
})
module.exports = router;