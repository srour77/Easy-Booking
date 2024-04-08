import joi from 'joi'
import { CompanyAttr } from '../models/company'

const createCompanySchema = joi.object<Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>>({
    Name: joi.string().required(),
    Email: joi.string().required(),
    PhoneNumber: joi.string().required()
})

const updateCompanySchema = joi.object<Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>>({
    Name: joi.string(),
    Email: joi.string(),
    PhoneNumber: joi.string()
})

export {
    createCompanySchema,
    updateCompanySchema
}