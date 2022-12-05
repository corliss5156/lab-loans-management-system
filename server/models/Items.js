

module.exports = (sequelize, DataTypes) =>{
    const Items= sequelize.define("Items", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING, 
        }, 
        description: {
            type: DataTypes.STRING, 
        }, 
        subitems: {
            type: DataTypes.STRING
        }, 
        remark: {
            type: DataTypes.STRING
        }
    })
    
    return Items
    
}

