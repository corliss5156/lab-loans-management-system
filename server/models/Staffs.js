
module.exports = (sequelize, DataTypes) =>{
    const Staffs = sequelize.define("Staffs", {
        email:{
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                isEmail: true
            }
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNULL: false
        }
    })

    return Staffs
}

