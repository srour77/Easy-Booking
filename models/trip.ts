import {model as Bus} from './bus'
import { Model } from 'sequelize'

export interface TripAttr {
    TripId: number,
    DepartureStation: string,
    ArrivalStation: string,
    StartTime: Date,
    EndTime: Date,
    Cost: number,
    BusId: number
}

export const model = function(sequelize, DataTypes) {
    const BusModel = Bus(sequelize, DataTypes)
    class Trip extends Model<TripAttr>{}
    Trip.init({
        TripId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        DepartureStation: { type: DataTypes.STRING, allowNull: false },
        ArrivalStation: { type: DataTypes.STRING, allowNull: false },
        StartTime: { type: DataTypes.TIME, allowNull: false },
        EndTime: { type: DataTypes.TIME, allowNull: false },
        Cost: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
        BusId: { type: DataTypes.INTEGER, allowNull: false, references: { model: BusModel, key: 'BusId' }}
    }, { sequelize, timestamps: false })

    return Trip
}