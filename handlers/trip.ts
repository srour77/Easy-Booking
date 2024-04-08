import { RequestHandler } from "express"
import TripManager from "../modelManager/trip"
import { StatusCodes } from "http-status-codes"
import { TripAttr } from "../models/trip"
import { Roles } from "../globals/enums"
import { AdminToken, SuperAdminToken } from "../globals/types"
import BusManager from "../modelManager/bus"
import UnAthorizedError from "../errors/unAuthorized"

class TripHandler {
    static createTrip: RequestHandler<any, TripAttr, Pick<TripAttr, 'DepartureStation'| 'ArrivalStation'| 'StartTime'| 'EndTime'| 'BusId'| 'Cost'>> = async(req, res, next) => {
        const { body } = req
        const trip = await TripManager.createTrip(body)
        res.status(StatusCodes.OK).json(trip)
    }

    static getTrip: RequestHandler<{tripId: number}, TripAttr> = async(req, res, next) => {
        const { params: {tripId} } = req
        const trip = await TripManager.getTrip(tripId)
        res.status(StatusCodes.OK).json(trip)
    }

    static updateTrip: RequestHandler<{tripId: number}, {message: string}, Pick<TripAttr, 'DepartureStation'| 'ArrivalStation'| 'StartTime'| 'EndTime'| 'BusId'| 'Cost'>> = async(req, res, next) => {
        const { params: {tripId}, body } = req
        await TripManager.updateTrip(tripId, body)
        res.status(StatusCodes.OK).json({message: 'trip updated successfully'})
    }

    static deleteTrip: RequestHandler<{tripId: number}, {message: string}> = async(req, res, next) => {
        const { params: {tripId} } = req
        await TripManager.deleteTrip(tripId)
        res.status(StatusCodes.OK).json({message: 'trip deleted successfully'})
    }
}

export default TripHandler