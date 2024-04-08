import { Router } from "express";
import TripDayHandler from "../handlers/tripDay";
const tripDayRouter = Router()
import validateSchema from "../middlewares/validations";
import { createTripDaySchema } from "../requestsValidators/tripDay";

tripDayRouter.route('/').post(validateSchema(createTripDaySchema), TripDayHandler.createTripDay)

tripDayRouter.route('/:tripId')
.get(TripDayHandler.getTripDays)
.delete(TripDayHandler.deleteTripDay)

export default tripDayRouter