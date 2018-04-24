var express = require("express");

// Intializes router
var router = express.Router();
var burger = require("../models").burger;
var customer = require("../models").customer;

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

router.get("/api/customers", function (req, res) {
    customer.findAll().then(function (data) {
        res.json(data);
    })
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
router.put("/api/burgers/:id/:customer", function (req, res) {
    burger.update({devoured: true, eaten_by: req.params.customer}, {where: {id: req.params.id}})
    .then(function (data) {
        customer.upsert({customer_name: req.params.customer, burgers_eaten: req.params.id})
        .then(function (data) {
            res.end();
        })
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    burger.destroy({where: {id: req.params.id}}).then(function (data) {
        res.end();
    });
});

// Export the router for use with the server
module.exports = router;