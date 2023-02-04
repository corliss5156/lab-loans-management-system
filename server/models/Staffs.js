
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
            type: DataTypes.STRING, 
            
        }
    })
    Staffs.associate = (models) =>{
        Staffs.hasMany(models.Activities, {
            onDelete: "cascade", 
            onUpdate: "cascade",
            foreignKey: "staff"
        })
        Staffs.hasMany(models.Labs, {
            onDelete: "cascade", 
            onUpdate: "cascade",
            foreignKey: "staff"
        })
    }

    return Staffs
}

