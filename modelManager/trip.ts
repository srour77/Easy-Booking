import { TripAttr, model as tripConstructor } from "../models/trip"
import { sequelize } from '../models';
import { DataTypes, Transaction } from 'sequelize';
const TripModel = tripConstructor(sequelize, DataTypes)

class TripManager {
    static async getAllTripByCompanyId(busId: number): Promise<TripAttr[]> {
        const trips = (await TripModel.findAll({ where: { BusId: busId } })).map(trip =>  trip.dataValues)
        return trips
    }

    static async getTrip(tripId: number): Promise<TripAttr> {
        const trip = await TripModel.findOne({ where: { TripId: tripId } })
        return trip?.dataValues
    }

    static async getAndLockTripById(tripId: number, transaction: Transaction): Promise<TripAttr> {
        const trip = (await TripModel.findOne({where: {TripId: tripId}, transaction}))?.dataValues
        return trip
    }

    static async createTrip(tripToBeAdded: Pick<TripAttr, 'DepartureStation' | 'ArrivalStation' | 'StartTime' | 'EndTime' | 'Cost' | 'BusId'>): Promise<TripAttr> {
        const trip = await TripModel.create(tripToBeAdded)
        return trip.dataValues
    }

    static async updateTrip(tripId: number, tripToUpdate: Pick<TripAttr, 'DepartureStation' | 'ArrivalStation' | 'StartTime' | 'EndTime' | 'Cost' | 'BusId'>): Promise<void> {
        const { DepartureStation, ArrivalStation, StartTime, EndTime, Cost, BusId } = tripToUpdate
        await TripModel.update({ DepartureStation, ArrivalStation, StartTime, EndTime, Cost, BusId }, { where: { TripId: tripId } })
    }

    static async deleteTrip(tripId: number): Promise<void> {
        await TripModel.destroy({ where: { TripId: tripId } })
    }
}

export default TripManager