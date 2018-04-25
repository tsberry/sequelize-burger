module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {timestamps: false});

    // Customer.associate = function(models) {
    //     models.Customer.hasMany(models.Burger);
    //   };

    return Customer;
};