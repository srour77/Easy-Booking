import jwt from 'jsonwebtoken';
import { AdminAttr } from './../models/admin';
import { RequestHandler } from "express"
import AdminManager from "../modelManager/admin"
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/badRequest';
import bcrypt from 'bcrypt'
import AdminController from '../controllers/admin';
import EmailHelper from '../helpers/sendEmailWithToken';

class AdminHandler {
    static getAllAdmins: RequestHandler<any, Partial<AdminAttr>[]> = async (req, res, next) => {
        const admins = (await AdminManager.getAllAdmins())
        admins.forEach(admin => delete admin.Password)
        res.status(StatusCodes.OK).json(admins)
    }

    static getAdmin: RequestHandler<{id: number}, Partial<AdminAttr>> = async (req, res, next) => {
        const { params: { id } } = req
        const admin = await AdminManager.getAdminById(id)
        delete admin.Password
        res.status(StatusCodes.OK).json(admin)
    }

    static createAdmin: RequestHandler<any, {message: string}, Pick<AdminAttr, 'Name' | 'Email' | 'PhoneNumber' | 'Password' | 'CompanyId'>> = async (req, res, next) => {
        const { body } = req
        if(await AdminManager.getAdminByEmail(body.Email)) throw new BadRequestError('this email already taken, type another one')
        const admin = await AdminManager.createAdmin(body)
        res.status(StatusCodes.CREATED).json({ message: 'admin created successfully' })
    }

    static updateAdmin: RequestHandler<{ id: number }, { message: string }, Pick<AdminAttr, 'Name' | 'Email' | 'PhoneNumber'>> = async (req, res, next) => {
        const { params: { id }, body } = req
        await AdminManager.updateAdmin(id, body)
        res.status(StatusCodes.CREATED).json({ message: 'admin updated successfully' })
    }

    static deleteAdmin: RequestHandler<{ id: number }, {message: string}> = async (req, res, next) => {
        const { params: { id } } = req
        await AdminManager.deleteAdmin(id)
        res.status(StatusCodes.OK).json({ message:'admin deleted successfully' })
    }

    static login: RequestHandler<any, { token?: string, message?: string }, { Email: string, Password: string }> = async (req, res, next) => {
        const { body: { Email, Password } } = req
        const admin = await AdminManager.getAdminByEmail(Email)

        if(!admin) throw new BadRequestError('no such admin with this email')
        const isValidPassword = await bcrypt.compare(Password, admin.Password)
        if(!isValidPassword) return res.status(StatusCodes.OK).json({ message: 'inccorect email or password' })

        const token = AdminController.signAdminToken({ Name: admin.Name, AdminId: admin.AdminId, Email: admin.Email, PhoneNumber: admin.PhoneNumber })
        res.status(StatusCodes.OK).json({ token })
    }

    static requestResetPassword: RequestHandler<any, { message: string }, { Email: string }> = async (req, res, next) => {
        const { body: { Email } } = req
        const admin = await AdminManager.getAdminByEmail(Email)
        if(!admin) throw new BadRequestError('no such user with this email')

        const token = AdminController.signResetPasswordToken({Email: admin.Email})
        await EmailHelper.sendAdminResetPassword(Email, token)
        res.status(StatusCodes.OK).json({ message: 'a verification email has been sent to you' })
    }

    static resetPassword: RequestHandler<any, { message: string }, { Password: string }, { token: string }> = async (req, res, next) => {
        const { query: { token }, body: { Password } } = req
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { Email: string, resetPassword: boolean }
        await AdminManager.updatePassword(decoded.Email, Password)
        res.status(StatusCodes.OK).json({ message: 'password has been reset successfully' })
    }
}

export default AdminHandler