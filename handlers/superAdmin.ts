import { RequestHandler } from "express";
import { SuperAdminAttr } from "../models/superAdmin";
import SuperAdminManager from "../modelManager/superAdmin";
import { StatusCodes } from "http-status-codes";
import SuperAdminController from "../controllers/superAdmin";
import BadRequestError from "../errors/badRequest";

class SuperAdminHandler {
    static getSuperAdmin:RequestHandler<{ id: number }, Partial<SuperAdminAttr>> = async (req, res, next) => {
        const { params: { id } } = req
        const superAdmin = await SuperAdminManager.getSuperAdminById(id)
        res.status(StatusCodes.OK).json(superAdmin)
    }

    static updateSuperAdmin:RequestHandler<{ id: number }, {message: string}, Pick<SuperAdminAttr, 'Name' | 'Email' | 'CompanyId'>> = async (req, res, next) => {
        const { params: { id } } = req
        await SuperAdminManager.updateSuperAdmin(id, req.body)
        res.status(StatusCodes.OK).json({ message: 'super admin updated successfully' })
    }

    static deleteSuperAdmin:RequestHandler<{ id: number }, { messge: string }> = async (req, res, next) => {
        const { params: { id } } = req
        await SuperAdminManager.deleteSuperAdmin(id)
        res.status(StatusCodes.OK).json({messge: 'super admin deleted successfully'})
    }

    static createSuperAdmin:RequestHandler<any, { token: string }, Pick<SuperAdminAttr, 'Name' | 'Email' | 'CompanyId' | 'Password'>> = async (req, res, next) => {
        if(await SuperAdminManager.getSuperAdminByEmail(req.body.Email)) throw new BadRequestError('this email already exists, type another one')
        const superAdmin = await SuperAdminManager.createSuperAdmin(req.body)
        const token = SuperAdminController.signSuperAdminToken({ Name: superAdmin.Name, Email: superAdmin.Email, CompanyId: superAdmin.CompanyId })
        res.status(StatusCodes.CREATED).json({ token })
    }
}

export default SuperAdminHandler