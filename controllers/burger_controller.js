var express = require("express");
var burger = require("../models/burger.js");

// Intializes router
var router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// The get route selects the burgers
router.get("/api/burgers", function (req, res) {
    burger.selectAll(function (data) {
        res.json(data);
    });
});

// The post route inserts a burger
router.post("/api/burgers", function (req, res) {
    burger.insertOne(req.body.name, function (data) {
        res.json({
            "message": "Burger added",
            "data": data
        })
    });
});

// The put route devours a burger
router.put("/api/burgers/:id", function (req, res) {
    burger.updateOne(req.params.id, function (data) {
        if(data.affectedRows === 0) return res.status(500).end();
        res.end();
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    burger.delete(req.params.id, function (data) {
        if(data.affectedRows === 0) return res.status(500).end();
        res.end();
    });
});

// Export the router for use with the server
module.exports = router;