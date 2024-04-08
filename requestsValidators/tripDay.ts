import joi from 'joi'
import { TripDayAttr } from '../models/tripDay'

const createTripDaySchema = joi.object<TripDayAttr>({
    TripId: joi.number().required(),
    Day: joi.string().required().allow("sunday", "tuesday", "wednesday", "thursday", "friday", "saturday")
})

const deleteTripDaySchema = joi.object<TripDayAttr>({
    TripId: joi.number(),
    Day: joi.string().allow("sunday", "tuesday", "wednesday", "thursday", "friday", "saturday")
})

export {
    createTripDaySchema,
    deleteTripDaySchema
}