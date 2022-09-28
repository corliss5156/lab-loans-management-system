
module.exports = (sequelize, DataTypes) =>{
    const LoanRequests = sequelize.define("LoanRequests", {
        formreference: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true
        }, 
        borrowername:{
            type: DataTypes.STRING, 
            allowNull:false
        }, 
        borroweremail: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        borrowdate: {
            type: DataTypes.DATEONLY
        }, 
        returndate: {
            type: DataTypes.DATEONLY
        }, 
        requestreason: {
            type: DataTypes.STRING
        }, 
        supervisoremail: {
            type: DataTypes.STRING, 
            validate: {
                isEmail: true
            }
        }, 
        phonenumber: {
            type: DataTypes.INTEGER
        }, 
        status: {
            type: DataTypes.STRING, 
            validate: {
                isIn: [['On loan', 'Partial', 'Complete']]
            }
        }, 
        location: {
            type: DataTypes.STRING
        }
    })
    
    return LoanRequests
}

