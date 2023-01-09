
module.exports = (sequelize, DataTypes) =>{
    const Images = sequelize.define("Images", {
        id:{
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(10)
        }, 
        image:{
            type: DataTypes.TEXT
        }
    })
    Images.associate = (models)=>{
        Images.hasOne(models.Reports, {
            onDelete: "cascade", 
            onUpdate: "cascade", 
            foreignKey: "imageid"
        })
    }
    return Images
}

