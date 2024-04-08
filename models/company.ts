import { Model } from 'sequelize'

export interface CompanyAttr {
    CompanyId: number,
    Name: string,
    Email: string,
    PhoneNumber: string,
    JoinDate: Date
}

export const model = function(sequelize, DataTypes) {
    class Company extends Model<CompanyAttr>{}
    Company.init({
        CompanyId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Name: { type: DataTypes.STRING, unique: true, allowNull: false },
        Email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
        PhoneNumber: { type: DataTypes.STRING },
        JoinDate: { type: DataTypes.DATEONLY, defaultValue: new Date() }
    }, { sequelize, timestamps: false })

    return Company
}