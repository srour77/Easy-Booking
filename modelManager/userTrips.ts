import { sequelize } from '../models';
import { DataTypes, Transaction } from 'sequelize';
import { UserTripsAttr, model as userTripConstructor } from '../models/userTrips';
const UserTripModel = userTripConstructor(sequelize, DataTypes)

class UserTripsManager {
    static async getUserTrips(userId: number): Promise<UserTripsAttr[]> {
        const userTrips = (await UserTripModel.findAll({ where: { UserId: userId } })).map(trip => trip.dataValues)
        return userTrips
    }

    static async getBookingsByTripIdAndDate(tripId: number, date: Date, transaction: Transaction): Promise<UserTripsAttr[]> {
        const bookings = (await UserTripModel.findAll({where: {TripId: tripId, Date: date}, transaction})).map(trip => trip.dataValues)
        return bookings
    }

    static async createUserTrip(userTripToBeAdded: Pick<UserTripsAttr, 'UserId' | 'TripId' | 'Date' | 'SeatsNo'>, transaction: Transaction): Promise<UserTripsAttr> {
        const { UserId, TripId, Date, SeatsNo } = userTripToBeAdded
        const userTrip = await UserTripModel.create({ UserId, TripId, Date, SeatsNo }, { transaction })
        return userTrip.dataValues
    }

    static async updateUserTripSeatNo(userTripToUpdate: Pick<UserTripsAttr, 'UserId' | 'TripId' | 'Date'>, SeatNo: number): Promise<void> {
        const { UserId, TripId, Date } = userTripToUpdate
        await UserTripModel.update({ SeatsNo: SeatNo }, { where: { UserId, TripId, Date } })
    }

    static async deleteUserTrip(userTrip: Pick<UserTripsAttr, 'UserId' | 'TripId' | 'Date'>): Promise<void> {
        const { UserId, TripId, Date } = userTrip
        await UserTripModel.destroy({ where: { UserId, TripId, Date } })
    }
}

export default UserTripsManager