const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const URL = require("../models/urls");

router.route("/")
    .post((req, res, next) => {
        if (req.body.url) {
            urlData = req.body.url;

        }
        console.log("url is " + urlData);
        URL.findOne({ url: urlData }, (err, doc) => {
            if (doc) {
                console.log("Entry found in database");
                res.statusCode = 200;
                res.setHeader("content-type", "application/json");
                res.json({ "shorten": process.env.URL + doc._id });
            } else {
                console.log("This is new Url");
                const uid = uniqid();
                const webaddres = new URL({
                    _id: uid,
                    url: urlData,
                });

                URL.create(webaddres)
                    .then((doc) => {
                        res.statusCode = 200,
                            res.setHeader("content-type", "application/json");
                        res.json({ "shorten": "localhost:5000/api/" + doc._id });
                    }, (err) => next(err))
                    .catch((err) => next(err));

            }
        })


    })


router.route("/:sturl")
    .get((req, res, next) => {
        var shortu = req.params.sturl;
        URL.findOne({ "_id": shortu })
            .then((doc) => {
                res.statusCode = 200;
                res.setHeader("content-type", "applicaion/json");
                var surl = doc.url;
                if (surl.includes("http")) {
                    res.redirect(surl);
                } else
                    res.redirect("https://" + surl);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router;