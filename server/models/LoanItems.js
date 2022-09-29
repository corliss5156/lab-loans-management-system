const LoanRequests = require("./LoanRequests")


module.exports = (sequelize, DataTypes) =>{
    const LoanItems= sequelize.define("LoanItems", {
        formreference: {
            type: DataTypes.STRING, 
            primaryKey: true, 
        }, 
        item: {
            type: DataTypes.STRING, 
            primaryKey: true
        }, 
        qtyreceived: {
            type: DataTypes.INTEGER
        }, 
        qtytoreceive: {
            type: DataTypes.INTEGER
        }
        
    })

    return LoanItems
}

