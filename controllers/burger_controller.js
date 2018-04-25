var express = require("express");

// Intializes router
var router = express.Router();
var Burger = require("../models").Burger;
var Customer = require("../models").Customer;

function prune(data) {
    var pruned = [];
    for (var i = 0; i < data.length; i++) {
        pruned.push(data[i].dataValues);
    }
    return pruned;
}

router.get("/", function (req, res) {
    Burger.findAll({ include: [{ model: Customer }] })
        .then(function (bdata) {
            var burgers = prune(bdata);
            var hbsObject = {
                burgers: burgers,
            };
            res.render("index", hbsObject);
        });
});

// The get route selects the burgers
router.get("/api/burgers", function (req, res) {
    Burger.findAll({ include: [{ model: Customer }] }).then(function (data) {
        res.json(data);
    });
});

router.get("/api/customers", function (req, res) {
    Customer.findAll().then(function (data) {
        res.json(data);
    })
});

router.get("/api/customers/:id", function (req, res) {
    Customer.findOne({ where: { id: req.params.id } })
        .then(function (cdata) {
            // console.log(cdata);
            var cust = cdata.dataValues;
            Burger.findAll({ where: { id: cust.burgers_eaten } })
                .then(function (bdata) {
                    res.json(bdata);
                });
        });
});

// The post route inserts a burger
router.post("/api/burgers", function (req, res) {
    Burger.create({ burger_name: req.body.name }).then(function (data) {
        res.json({
            "message": "Burger added",
            "data": data
        })
    });
});

// The put route devours a burger
router.put("/api/burgers/:id/:customer", function (req, res) {
    Customer.findOrCreate({ where: { customer_name: req.params.customer } })
        .then(function (customerdata) {
            Burger.update({ devoured: true, customer_name: customerdata[0].dataValues.customer_name, customerId: customerdata[0].dataValues.id }, {
                where: { id: req.params.id },
            })
                .then(function (burgerdata) {
                    res.end();
                })
        });
});

router.delete("/api/burgers/:id", function (req, res) {
    Burger.destroy({ where: { id: req.params.id } }).then(function (data) {
        res.end();
    });
});

// Export the router for use with the server
module.exports = router;