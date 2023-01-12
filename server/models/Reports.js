
module.exports = (sequelize, DataTypes) =>{
    const Reports = sequelize.define("Reports", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        formreference: {
            type: DataTypes.STRING, 
            references: {
                model: "LoanRequests", 
                key: "formreference"
            }
        }, 
        status: {
            type: DataTypes.STRING, 
            validate: {
                isIn: [['Submitted', 'Approved', 'Rejected', 'Processed']]
            }
        }, 
        
        qty: {
            type: DataTypes.INTEGER
        }, 
        borrowername: {
            type: DataTypes.STRING
        }, 
        borroweremail: {
            type: DataTypes.STRING, 
        }, 
        reason: {
            type: DataTypes.STRING
        },
        lab: {
            type: DataTypes.STRING, 
        },
        item: {
            type: DataTypes.STRING,
            foreignKey: true, 
            references: {
                model: "Items", 
                key: "name"
            }
        }, 
        remark: {
            type: DataTypes.STRING
        }, 
        imageid: {
            type: DataTypes.INTEGER(10), 
            foreignKey:true, 
            references: {
                model: "Images", 
                key: "id"
            }
        }
    })
    return Reports
}


