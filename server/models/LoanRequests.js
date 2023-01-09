const Labs = require('./Labs')
module.exports = (sequelize, DataTypes) =>{
    const LoanRequests = sequelize.define("LoanRequests", {
        formreference: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true
        }, 
        borrowername:{
            type: DataTypes.STRING, 
            allowNull:false, 
        }, 
        borroweremail: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                isEmail: true
            }
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
                isIn: [['To Be Approved', 'On Loan', 'Partial', 'Complete']]
            }
        }, 
        lab: {
            type: DataTypes.STRING
       },
        groupmembers: {
            type: DataTypes.STRING
        }, 
        remark: {
            type: DataTypes.STRING
        }
    })
    
    return LoanRequests
}

