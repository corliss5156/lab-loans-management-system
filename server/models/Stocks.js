
module.exports = (sequelize, DataTypes) =>{
    const Stocks = sequelize.define("Stocks", {
        lab: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            references: {
                model: "Labs", 
                key: "lab"
            }
        }, 
        
        itemname: {
            type: DataTypes.STRING, 
            primaryKey: true
            
        },
        Available: {
            type: DataTypes.INTEGER
        },
        OnLoan: {
            type: DataTypes.INTEGER
        },
        LabUse: {
            type:DataTypes.INTEGER
        }
        
    })
    
    return Stocks
}


