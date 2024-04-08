import joi from 'joi'
import { TripAttr } from '../models/trip'

const createTripSchema = joi.object<TripAttr>({
    DepartureStation: joi.string().required(),
    ArrivalStation: joi.string().required(),
    StartTime: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
    EndTime: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
    BusId: joi.number().required(),
    Cost: joi.number().required(),
})

const updateTripSchema = joi.object<TripAttr>({
    DepartureStation: joi.string(),
    ArrivalStation: joi.string(),
    StartTime: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
    EndTime: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
    BusId: joi.number(),
    Cost: joi.number(),
})

export {
    createTripSchema,
    updateTripSchema,
}