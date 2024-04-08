import { model as companyConstructor }  from './company'

import { Model } from 'sequelize'
export interface SuperAdminAttr {
    SuperAdminId: number,
    Name: string,
    Email: string,
    Password: string,
    CompanyId: number
}

export const model = function(sequelize, DataTypes) {
    const CompanyModel = companyConstructor(sequelize, DataTypes)
    class SuperAdmin extends Model<SuperAdminAttr> {}
    SuperAdmin.init({
        SuperAdminId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Name: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        Password: { type: DataTypes.STRING, allowNull: false },
        CompanyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: CompanyModel, key: 'CompanyId' }}
        }, { sequelize, timestamps: false }
    )
    
    return SuperAdmin
}