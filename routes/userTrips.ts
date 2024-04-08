import { Router } from "express";
import UserTripHandler from "../handlers/userTrip";
const userTripsRouter = Router()
import validateSchema from "../middlewares/validations";
import { createUserTripSchema, deleteUserTripSchema } from "../requestsValidators/userTrips";
import AuthenticationMiddleware from "../middlewares/authentication";


userTripsRouter.route('/').post(validateSchema(createUserTripSchema), AuthenticationMiddleware.authenticateUser, UserTripHandler.createUserTrip)

userTripsRouter.route('/:userId').get(UserTripHandler.getUserTrips)

userTripsRouter.route('/update').put(validateSchema(createUserTripSchema), UserTripHandler.updateUserTrip)

userTripsRouter.route('/delete').delete(validateSchema(deleteUserTripSchema), UserTripHandler.deleteUserTrip)

export default userTripsRouter