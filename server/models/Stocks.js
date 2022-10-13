
module.exports = (sequelize, DataTypes) =>{
    const Stocks = sequelize.define("Stocks", {
        lab: {
            type: DataTypes.STRING, 
            primaryKey: true
        }, 
        item: {
            type: DataTypes.STRING, 
            primaryKey: true, 
        }, 
        quantity: {
            type: DataTypes.INTEGER
        }, 
        status: {
            type: DataTypes.STRING, 
            validate: {
                isIn: [['On loan', 'Available', 'Lab use']]
            }, 
            primaryKey: true
        }
        
    })
    
    return Stocks
}


