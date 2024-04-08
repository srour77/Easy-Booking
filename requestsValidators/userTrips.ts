import joi from 'joi'
import { UserTripsAttr } from '../models/userTrips'

const createUserTripSchema = joi.object<UserTripsAttr>({
    UserId: joi.number().required(),
    TripId: joi.number().required(),
    Date: joi.string().regex(/^\d{4}\/\d{2}\/\d{2}$/).required(),
    SeatsNo: joi.number().required()
})

const deleteUserTripSchema = joi.object<Pick<UserTripsAttr, 'UserId' | 'TripId' | 'Date'>>({
    UserId: joi.number().required(),
    TripId: joi.number().required(),
    Date: joi.string().regex(/^\d{4}\/\d{2}\/\d{2}$/).required(),
})

export {
    createUserTripSchema,
    deleteUserTripSchema
}