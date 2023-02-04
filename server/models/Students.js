
module.exports = (sequelize, DataTypes) =>{
    const Students = sequelize.define("Students", {
        email:{
            type: DataTypes.STRING, 
            allowNull: false,
            primarykey: true, 
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