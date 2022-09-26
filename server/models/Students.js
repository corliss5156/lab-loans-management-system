
module.exports = (sequelize, DataTypes) =>{
    const Students = sequelize.define("Students", {
        email:{
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNULL: false
        }
    })
    return Students
}