import express from "express"
const userRouter = express.Router()
import UserHandler from "../handlers/user"
import AuthenticationMiddleware from "../middlewares/authentication"
import validateSchema from "../middlewares/validations"
import { singupSchema, loginSchema, updateUserSchema, requestResetPasswordSchema, resetPasswordSchema, requestVerifyEmailSchema } from "../requestsValidators/user"


userRouter.route('/').get(AuthenticationMiddleware.authenticateAdmin, UserHandler.getAllUsers)

userRouter.route('/:id')
.get(UserHandler.getUser)
.put(validateSchema(updateUserSchema), UserHandler.updateUser)
.delete(UserHandler.deleteUser)

userRouter.route('/login').post(validateSchema(loginSchema), UserHandler.login)
userRouter.route('/signup').post(validateSchema(singupSchema), UserHandler.createUser)

userRouter.route('/requestVerifyEmail').post(validateSchema(requestVerifyEmailSchema), UserHandler.requestVerifyEmail)
userRouter.route('/verifyEmail').post(UserHandler.verifyEmail)

userRouter.route('/requestResetPassword').post(validateSchema(requestResetPasswordSchema), UserHandler.requestResetPassword)
userRouter.route('/resetPassword').post(validateSchema(resetPasswordSchema), UserHandler.resetPassword)

export default userRouter