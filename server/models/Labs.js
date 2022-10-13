
module.exports = (sequelize, DataTypes) =>{
    const Labs = sequelize.define("Labs", {
        lab: {
            type: DataTypes.STRING, 
            primaryKey: true
        }, 
        staff: {
            type: DataTypes.STRING, 
            primaryKey: true, 
        }
    })
    
    return Labs
}


