
module.exports = (sequelize, DataTypes) =>{
    const Staffs = sequelize.define("Staffs", {
        email:{
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true, 
            validate: {
                isEmail: true
            }
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNULL: false
        }, 
        labs: {
            type: DataTypes.STRING
        }
    })

    return Staffs
}

