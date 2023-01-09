const LoanRequests = require("./LoanRequests")


module.exports = (sequelize, DataTypes) =>{
    const LoanItems= sequelize.define("LoanItems", {
        formreference: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            references: {
                model: "LoanRequests", 
                key: "formreference"
            }
        }, 
       
        qtyreceived: {
            type: DataTypes.INTEGER
        }, 
        qtytoreceive: {
            type: DataTypes.INTEGER
        }, 
        lab: {
            type: DataTypes.STRING, 
            foreignKey: true, 
            references: {
                model: "Labs", 
                key: "lab"
            }
       }, 
       item: {
        type: DataTypes.STRING,
        foreignKey: true, 
        primaryKey: true,
        references: {
            model: "Items", 
            key: "name"
        }
    }
        
    })

    return LoanItems
}