
module.exports = (sequelize, DataTypes) =>{
    const Labs = sequelize.define("Labs", {
        lab: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            foreignKey: true, 
            
        }, 
        staff: {
            type: DataTypes.STRING, 
            foreignKey: true, 
            references: {
                model: "Staffs", 
                key: "email"
            }
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
     }),
     Labs.hasMany(models.LoanRequests, {
        onDelete: "cascade", 
        foreignKey: "lab"
     })
    }
    
    return Labs
}


