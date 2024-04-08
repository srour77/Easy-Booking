import joi from "joi";
import { BusAtrr } from "../models/bus";

const createBusSchema = joi.object<Partial<BusAtrr>>({
    DisplayName: joi.string().required(),
    SerialNumber: joi.string().required(),
    PlateNumber: joi.string().required(),
    Size: joi.number().required(),
    CompanyId: joi.number().required()
})

const updateBusSchema = joi.object<Partial<BusAtrr>>({
    DisplayName: joi.string(),
    SerialNumber: joi.string(),
    PlateNumber: joi.string(),
    Size: joi.number(),
    CompanyId: joi.number()
})

export {
    createBusSchema,
    updateBusSchema
}