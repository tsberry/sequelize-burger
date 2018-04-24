var orm = require("../config/orm.js");

// Create a burger with three methods
var burger = {
    // Selects burgers from the burgers table
    selectAll: function(callback) {
        orm.selectAll("burgers", function(data) {
            callback(data);
        })
    },
    // Inserts a new burger into the burger table
    insertOne: function(name, callback) {
        orm.insertOne("burgers", {burger_name: name, devoured: false}, function(data) {
            callback(data);
        })
    },
    // Devours the burger with the given name
    updateOne: function(id, callback) {
        orm.updateOne("burgers", {devoured: true}, {id: id}, function(data) {
            callback(data);
        })
    },
    delete: function(id, callback) {
        orm.delete("burgers", {id: id}, function(data) {
            callback(data);
        })
    }
};

// Exports the burger for use with the router
module.exports = burger;