
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
    
    return Labs
}


