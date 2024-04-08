import { RequestHandler } from "express"
import TripDayManager from "../modelManager/tripDay"
import { TripDayAttr } from "../models/tripDay"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/badRequest"

class TripDayHandler {
    static getTripDays: RequestHandler<{tripId: number}, TripDayAttr[]> = async(req, res, next) => {
        const {params: {tripId}} = req
        const tripDays = await TripDayManager.getTripDays(tripId)
        res.status(StatusCodes.OK).json(tripDays)
    }

    static createTripDay: RequestHandler<any, {message: string}, TripDayAttr> = async(req, res, next) => {
        const {body} = req
        await TripDayManager.createTripDay(body)
        res.status(StatusCodes.OK).json({message: 'trip day created successfully'})
    }

    static deleteTripDay: RequestHandler<any, {message: string}, TripDayAttr> = async(req, res, next) => {
        const {body} = req
        if(! await TripDayManager.getTripDay(body)) throw new BadRequestError('no such trip day exists')
        await TripDayManager.deleteTripDay(body)
        res.status(StatusCodes.OK).json({message: 'trip day deleted successfully'})
    }
}

export default TripDayHandler