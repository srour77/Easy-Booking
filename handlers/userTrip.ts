import { RequestHandler } from "express"
import UserTripsManager from "../modelManager/userTrips"
import { UserTripsAttr } from "../models/userTrips"
import { StatusCodes } from "http-status-codes"
import BusManager from "../modelManager/bus"
import TripManager from "../modelManager/trip"
import { sequelize } from "../models"
import { Transaction } from "sequelize"
import BadRequestError from "../errors/badRequest"

class UserTripHandler {
    static getUserTrips: RequestHandler<{userId: number}, UserTripsAttr[]> = async(req, res, next) => {
        const {params: {userId}} = req
        const userTrips = await UserTripsManager.getUserTrips(userId)
        res.status(StatusCodes.OK).json(userTrips)
    }

    static createUserTrip: RequestHandler<any, {message: string}, Pick<UserTripsAttr, 'TripId' | 'Date' | 'SeatsNo'>> = async(req, res, next) => {
        const {body} = req
        const { locals: { user } } = res
        await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (transaction: Transaction): Promise<void> => {
            const trip = await TripManager.getAndLockTripById(body.TripId, transaction)
            const bus = await BusManager.getAndLockBusById(trip.BusId, transaction)
            if(!trip || !bus) throw new BadRequestError('no such bus or trip found')

            const currentBookings = await UserTripsManager.getBookingsByTripIdAndDate(body.TripId, body.Date, transaction)
            const bookedSeats = currentBookings.map(t => t.SeatsNo).reduce((prev, item) => { return prev + item }, 0)
            if(bus.Size < bookedSeats) throw new Error('no available seats')
            
            await UserTripsManager.createUserTrip({...body, UserId: user.UserId}, transaction)
        })

        res.status(StatusCodes.CREATED).json({message: 'booking created successfully'})
    }

    static updateUserTrip: RequestHandler<any, {message: string}, Pick<UserTripsAttr, 'UserId'| 'TripId'| 'Date' | 'SeatsNo'>> = async(req, res, next) => {
        const { body: {UserId, TripId, Date, SeatsNo} } = req
        try{ await UserTripsManager.updateUserTripSeatNo({UserId, TripId, Date}, SeatsNo) }
        catch(err: any) { res.status(StatusCodes.BAD_REQUEST).json({message: err.message}) }
        res.status(StatusCodes.OK).json({message: 'user trip updated successfully'})
    }

    static deleteUserTrip: RequestHandler<any, {message: string}, Pick<UserTripsAttr, 'UserId'| 'TripId'| 'Date'>> = async(req, res, next) => {
        const {body} = req
        await UserTripsManager.deleteUserTrip(body)
        res.status(StatusCodes.OK).json({message: 'user trip deleted successfully'})
    }
}

export default UserTripHandler