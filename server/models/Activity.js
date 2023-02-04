
module.exports = (sequelize, DataTypes) =>{
    const Activities = sequelize.define("Activities", {
        id:{
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(10)
        }, 
        staff:{
            type: DataTypes.STRING, 
            foreignKey: true, 
            references: {
                model: "Staffs", 
                key: "email"
            }
        }, 
        item:{
            type: DataTypes.STRING
        },
        oldAvailable: {
            type: DataTypes.INTEGER
        }, 
        oldOnLoan: {
            type: DataTypes.INTEGER
        }, 
        oldLabUse: {
            type: DataTypes.INTEGER
        }, 
        newAvailable: {
            type: DataTypes.INTEGER
        }, 
        newOnLoan: {
            type: DataTypes.INTEGER
        }, 
        newLabUse: {
            type: DataTypes.INTEGER
        }
    })
    
    return Activities
}


