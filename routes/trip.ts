import { Router } from "express";
import TripHandler from "../handlers/trip";
const tripRouter = Router()
import validateSchema from "../middlewares/validations";
import { createTripSchema, updateTripSchema } from "../requestsValidators/trip";

tripRouter.route('/').post(validateSchema(createTripSchema), TripHandler.createTrip)

tripRouter.route('/:id')
.get(TripHandler.getTrip)
.put(validateSchema(updateTripSchema), TripHandler.updateTrip)
.delete(TripHandler.deleteTrip)

export default tripRouter