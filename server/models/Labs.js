
module.exports = (sequelize, DataTypes) =>{
    const Labs = sequelize.define("Labs", {
        lab: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            foreignKey: true, 
            
        }, 
        staff: {
            type: DataTypes.STRING
        }
    })
    Labs.associate = (models) =>{
         Labs.hasMany(models.Stocks, {
        onDelete: "cascade", 
        hooks: true 
     }), 
     Labs.hasMany(models.LoanItems, {
        onDelete: "cascade", 
        hooks: true
     })
    }
    
    return Labs
}


