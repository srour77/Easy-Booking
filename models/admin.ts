import { model as Company }  from './company'
import { Model } from 'sequelize'

export interface AdminAttr {
    AdminId: number,
    Name: string,
    Email: string,
    PhoneNumber: string,
    Password: string,
    CompanyId: number
}

export const model = function(sequelize, DataTypes) {
    const CompanyModel = Company(sequelize, DataTypes)
    class Admin extends Model<AdminAttr> {}
    Admin.init({
        AdminId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Name: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        PhoneNumber: { type: DataTypes.STRING },
        Password: { type: DataTypes.STRING, allowNull: false },
        CompanyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: CompanyModel, key: 'CompanyId' }}
        }, { sequelize, timestamps: false }
    )
    
    return Admin
}