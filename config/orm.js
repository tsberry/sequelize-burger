var connection = require("./connection.js");

// Create ORM with three methods
var orm = {
    // Select all from the given table
    selectAll: function(table, callback) {
        connection.query("SELECT * FROM ??", [table], function(error, results, fields) {
            if(error) throw error;
            callback(results);
        });
    },
    // Insert a new item into the given table
    insertOne: function(table, properties, callback) {
        connection.query("INSERT INTO ?? SET ?", [table, properties], function(error, results, fields) {
            if(error) throw error;
            callback(results);
        });
    },
    // Updates the given properties at the items satisfying the locator in the given table
    updateOne: function(table, properties, locator, callback) {
        connection.query("UPDATE ?? SET ? WHERE ?", [table, properties, locator], function(error, results, fields) {
            if(error) throw error;
            callback(results);
        })
    },
    delete: function(table, locator, callback) {
        connection.query("DELETE FROM ?? WHERE ?", [table, locator], function(error, results, fields) {
            if(error) throw error;
            callback(results);
        });
    }
};

// Export the ORM for use with the burger
module.exports = orm;