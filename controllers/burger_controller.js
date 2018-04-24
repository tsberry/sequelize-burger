var express = require("express");
var burger = require("../models/burger.js");

// Intializes router
var router = express.Router();
var burger = require("../models").burger;

router.get("/", function (req, res) {
    burger.findAll().then(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

// The get route selects the burgers
router.get("/api/burgers", function (req, res) {
    burger.findAll().then(function (data) {
        res.json(data);
    });
});

// The post route inserts a burger
router.post("/api/burgers", function (req, res) {
    burger.create({burger_name: req.body.name}).then(function (data) {
        res.json({
            "message": "Burger added",
            "data": data
        })
    });
});

// The put route devours a burger
router.put("/api/burgers/:id", function (req, res) {
    burger.update({devoured: true}, {where: {id: req.params.id}}).then(function (data) {
        res.end();
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    burger.destroy({where: {id: req.params.id}}).then(function (data) {
        res.end();
    });
});

// Export the router for use with the server
module.exports = router;