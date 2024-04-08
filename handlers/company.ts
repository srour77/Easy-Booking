import { RequestHandler } from "express";
import CompanyManager from "../modelManager/company";
import { StatusCodes } from "http-status-codes";
import { CompanyAttr } from "../models/company";

class CompanyHandler {
    static createCompany: RequestHandler<any, {message: string}, Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>> = async(req, res, next) => {
        const {body} = req
        await CompanyManager.createCompany(body)
        res.status(StatusCodes.CREATED).json({ message: 'company created successfully' })
    }

    static getCompany: RequestHandler<{id: number}, Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber' | 'JoinDate'>> = async(req, res, next) => {
        const {params: {id}} = req
        const company = await CompanyManager.getCompany(id)
        res.status(StatusCodes.OK).json(company)
    }

    static updateCompany: RequestHandler<{id: number}, {message: string}, Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>> = async(req, res, next) => {
        const {body, params: {id}} = req
        await CompanyManager.updateCompany(id, body)
        res.status(StatusCodes.OK).json({ message: 'company updated successfully' })
    }
    
    static deleteCompany: RequestHandler<{id: number}, {message: string}> = async(req, res, next) => {
        const {params: {id}} = req
        await CompanyManager.deleteCompany(id)
        res.status(StatusCodes.OK).json({ message: 'company deleted successfully' })
    }
}

export default CompanyHandler