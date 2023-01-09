
module.exports = (sequelize, DataTypes) =>{
    const Students = sequelize.define("Students", {
        email:{
            type: DataTypes.STRING, 
            primarykey: true, 
            foreignKey: true, 
            validate: {
                isEmail: true
            }
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNULL: false
        }
    })
    return Students
}