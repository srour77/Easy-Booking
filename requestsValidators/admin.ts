import joi from 'joi'
import { AdminAttr } from '../models/admin'

const createAdminSchema = joi.object<AdminAttr>({
    Name: joi.string().required(),
    Email: joi.string().required(),
    PhoneNumber: joi.string().required(),
    Password: joi.string().required(),
    CompanyId: joi.number().required()
})

const loginAdminSchema = joi.object<Pick<AdminAttr, 'Email' | 'Password'>>({
    Email: joi.string().required(),
    Password: joi.string().required()
})

const updateAdminSchema = joi.object<Pick<AdminAttr, 'Name' | 'Email' | 'PhoneNumber'>>({
    Name: joi.string(),
    Email: joi.string(),
    PhoneNumber: joi.string()
})

const requestResetPasswordSchema = joi.object({
    email: joi.string().required()
})

const resetPasswordSchema = joi.object({
    password: joi.string().required()
})

export {
    createAdminSchema,
    loginAdminSchema,
    updateAdminSchema,
    requestResetPasswordSchema,
    resetPasswordSchema
}