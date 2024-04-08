import joi from "joi";
import { UserAttr } from "../models/user";

const loginSchema = joi.object<Partial<UserAttr>>({
    Email: joi.string().required(),
    Password: joi.string().required()
})

const singupSchema = joi.object<Partial<UserAttr>>({
    Name: joi.string().required(),
    Email: joi.string().email().required(),
    Password: joi.string().required(),
    PhoneNumber: joi.string().required()
})

const updateUserSchema = joi.object<Pick<UserAttr, 'Name' | 'Email' | 'PhoneNumber'>>({
    Name: joi.string(),
    Email: joi.string(),
    PhoneNumber: joi.string()
})

const requestResetPasswordSchema = joi.object({
    Email: joi.string().required()
})

const resetPasswordSchema = joi.object({
    Password: joi.string().required()
})

const requestVerifyEmailSchema = joi.object({
    Email: joi.string().required()
})

export {
    loginSchema,
    singupSchema,
    updateUserSchema,
    requestResetPasswordSchema,
    requestVerifyEmailSchema,
    resetPasswordSchema
}