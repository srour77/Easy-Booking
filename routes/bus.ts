import BusHandler from "../handlers/bus";
import { Router } from "express";
const busRouter = Router()
import validateSchema from "../middlewares/validations";
import { createBusSchema, updateBusSchema } from "../requestsValidators/bus";

busRouter.route('/').post(validateSchema(createBusSchema), BusHandler.createBus)

busRouter.route('/:id')
.get(BusHandler.getBus)
.put(validateSchema(updateBusSchema), BusHandler.updateBus)
.delete(BusHandler.deleteBus)

export default busRouter