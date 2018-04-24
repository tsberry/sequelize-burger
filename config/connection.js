var mysql = require("mysql");
var connection;
// Initialize connection
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        user: "root",
        password: "password",
        database: "burger_db"
    });
}


// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for use with ORM
module.exports = connection;