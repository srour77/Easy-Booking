import express from "express"
const adminRouter = express.Router()
import AdminHandler from "../handlers/admin"
import validateSchema from "../middlewares/validations"
import { createAdminSchema, loginAdminSchema, updateAdminSchema, requestResetPasswordSchema, resetPasswordSchema } from "../requestsValidators/admin"

adminRouter.route('/').get(AdminHandler.getAllAdmins)

adminRouter.route('/:id')
.get(AdminHandler.getAdmin)
.put(validateSchema(updateAdminSchema), AdminHandler.updateAdmin)
.delete(AdminHandler.deleteAdmin)

adminRouter.route('/login').post(validateSchema(loginAdminSchema), AdminHandler.login)
adminRouter.route('/signup').post(validateSchema(createAdminSchema), AdminHandler.createAdmin)

adminRouter.route('/requestResetPassword').post(validateSchema(requestResetPasswordSchema), AdminHandler.requestResetPassword)
adminRouter.route('/resetPassword').post(validateSchema(resetPasswordSchema), AdminHandler.resetPassword)

export default adminRouter