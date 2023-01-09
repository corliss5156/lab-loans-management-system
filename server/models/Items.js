

module.exports = (sequelize, DataTypes) =>{
    const Items= sequelize.define("Items", {
        
        name: {
            type: DataTypes.STRING, 
            primaryKey: true, 
            foreignKey: true
        }, 
        description: {
            type: DataTypes.STRING, 
        }, 
        remark: {
            type: DataTypes.STRING
        }, 
        imageid: {
            type: DataTypes.INTEGER(10), 
            foreignKey:true, 
            references: {
                model: "Images", 
                key: "id"
            }
        }
    })
    
    Items.associate= (models)=>{
Items.hasMany(models.Stocks, {
    onDelete: "cascade",
    onUpdate: "cascade", 
    foreignKey: "itemname"
}), 
Items.hasMany(models.LoanFormTemplates, {
    onDelete: "cascade", 
    onUpdate: "cascade", 
    foreignKey: "item",
    primaryKey: true
}), 
Items.hasMany(models.LoanItems, {
    onDelete: "cascade", 
    onUpdate: "cascade", 
    foreignKey: "item"
}), 

Items.hasMany(models.Reports, {
    onDelete: "cascade", 
    onUpdate: "cascade", 
    foreignKey: "item"
})
    }
    return Items
    
}

