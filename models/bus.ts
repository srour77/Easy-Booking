// import { DataTypes } from 'sequelize'
import {model as Company} from './company'
import { Model } from 'sequelize'

export interface BusAtrr {
    BusId: number,
    Size: number,
    DisplayName: string,
    SerialNumber: string,
    PlateNumber: string,
    CompanyId: number
}

export const model = function(sequelize, DataTypes) {
    const CompanyModel = Company(sequelize, DataTypes)
    class Bus extends Model<BusAtrr> {}
    Bus.init({
        BusId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Size: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
        DisplayName: { type: DataTypes.STRING, allowNull: false },
        SerialNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
        PlateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
        CompanyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: CompanyModel, key: 'CompanyId' } }
    }, { sequelize, timestamps: false })

    return Bus
}