import { TripDayAttr, model as tripDayConstructor } from '../models/tripDay';
import { sequelize } from '../models';
import { DataTypes } from 'sequelize';
const TripDayModel = tripDayConstructor(sequelize, DataTypes)

class TripDayManager {
    static async createTripDay(tripDayToBeAdded: TripDayAttr): Promise<TripDayAttr> {
        const tripDay = await TripDayModel.create(tripDayToBeAdded)
        return tripDay.dataValues
    }

    static async getTripDays(tripId: number): Promise<TripDayAttr[]> {
        const tripDays = (await TripDayModel.findAll({ where: { TripId: tripId } })).map(trip => trip.dataValues)
        return tripDays
    }

    static async getTripDay(tripDay: TripDayAttr): Promise<TripDayAttr> {
        const { TripId, Day } = tripDay
        const trip = await TripDayModel.findOne({where: {TripId, Day}})
        return trip?.dataValues
    }

    static async deleteTripDay(tripDay: TripDayAttr): Promise<void> {
        const { TripId, Day } = tripDay
        await TripDayModel.destroy({ where: { TripId, Day } })
    }
}

export default TripDayManager