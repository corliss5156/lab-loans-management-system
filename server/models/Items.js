

module.exports = (sequelize, DataTypes) =>{
    const Items= sequelize.define("Items", {
        name: {
            type: DataTypes.STRING, 
            primaryKey: true
        }, 
        description: {
            type: DataTypes.STRING, 
        }, 
        subitems: {
            type: DataTypes.STRING
        }
    })
    return Items
}


