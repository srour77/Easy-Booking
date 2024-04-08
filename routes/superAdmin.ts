import { Router } from "express";
import SuperAdminHandler from "../handlers/superAdmin";
const superAdminRouter = Router()
import validateSchema from "../middlewares/validations";
import { createSuperAdminSchema, updateSuperAdminSchema } from "../requestsValidators/superAdmin";

superAdminRouter.route('/').post(validateSchema(createSuperAdminSchema), SuperAdminHandler.createSuperAdmin)

superAdminRouter.route('/:id')
.get(SuperAdminHandler.getSuperAdmin)
.put(validateSchema(updateSuperAdminSchema), SuperAdminHandler.updateSuperAdmin)
.delete(SuperAdminHandler.deleteSuperAdmin)

export default superAdminRouter