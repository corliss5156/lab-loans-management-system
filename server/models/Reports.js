
module.exports = (sequelize, DataTypes) =>{
    const Reports = sequelize.define("Reports", {
        formreference: {
            type: DataTypes.STRING
        }, 
        status: {
            type: DataTypes.STRING, 
            validate: {
                isIn: [['Submitted', 'Approved', 'Rejected', 'Complete']]
            }
        }, 
        item: {
            type: DataTypes.STRING
        }, 
        qty: {
            type: DataTypes.INTEGER
        }, 
        borrowername: {
            type: DataTypes.STRING
        }, 
        borroweremail: {
            type: DataTypes.STRING
        }, 
        lab: {
            type: DataTypes.STRING
        }

    })
    
    return Reports
}


