const Items = require("./Items")


module.exports = (sequelize, DataTypes) =>{
    const LoanFormTemplates= sequelize.define("LoanFormTemplates", {
        loanreason: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            
        }, 
        qtytoreceive: {
            type: DataTypes.INTEGER
        }, 
        
        mainitem: {
            type: DataTypes.STRING
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
    
    return LoanFormTemplates
}

