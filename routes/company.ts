import { Router } from "express";
import CompanyHandler from "../handlers/company";
const companyRouter = Router()
import validateSchema from "../middlewares/validations";
import { createCompanySchema, updateCompanySchema } from "../requestsValidators/company";

companyRouter.route('/').post(validateSchema(createCompanySchema), CompanyHandler.createCompany)

companyRouter.route('/:id')
.get(CompanyHandler.getCompany)
.put(validateSchema(updateCompanySchema), CompanyHandler.updateCompany)
.delete(CompanyHandler.deleteCompany)

export default companyRouter