import joi from 'joi'
import { SuperAdminAttr } from '../models/superAdmin'

const createSuperAdminSchema = joi.object<Pick<SuperAdminAttr, 'Name' | 'Email' | 'Password' | 'CompanyId'>>({
    Name: joi.string().required(),
    Email: joi.string().required(),
    Password: joi.string().required(),
    CompanyId: joi.number().required()
})

const updateSuperAdminSchema = joi.object<Pick<SuperAdminAttr, 'Name' | 'Email' | 'CompanyId'>>({
    Name: joi.string(),
    Email: joi.string(),
    CompanyId: joi.number()
})

export { 
    createSuperAdminSchema,
    updateSuperAdminSchema
}