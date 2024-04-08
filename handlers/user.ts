import { UserAttr } from './../models/user';
import { RequestHandler } from 'express';
import UserManager from "../modelManager/user";
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/badRequest';
import bcrypt from 'bcrypt'
import UnAthorizedError from '../errors/unAuthorized';
import jwt from 'jsonwebtoken'
import UserController from '../controllers/user';
import EmailHelper from '../helpers/sendEmailWithToken';
import NotFoundError from '../errors/notFound';

class UserHandler {
    static getAllUsers: RequestHandler<any, Partial<UserAttr>[]> = async (req, res, next) => {
        const users = await UserManager.getAllUsers()
        users.forEach(user => delete user.Password)
        res.status(StatusCodes.OK).json(users)
    }

    static getUser: RequestHandler<{id: number}, Partial<UserAttr>> = async (req, res, next) => {
        const { params: { id } } = req
        const user = await UserManager.getUserById(id)
        if(!user) throw new NotFoundError('no such user with this id')
        delete user.Password
        res.status(StatusCodes.OK).json(user)
    }

    static createUser: RequestHandler<any, {message: string}, Pick<UserAttr, 'Name' | 'Email' | 'PhoneNumber' | 'Password'>> = async (req, res, next) => {
        const { body } = req
        if(await UserManager.getUserByEmail(body.Email)) throw new BadRequestError('this email already exists')
        await UserManager.createUser(body)
        res.status(StatusCodes.OK).json({ message: 'user created successfully' })
    }

    static updateUser: RequestHandler<{id: number}, {message: string}, Pick<UserAttr, 'Name' | 'Email' | 'PhoneNumber'>> = async (req, res, next) => {
        const { params: { id }, body } = req
        if(!await UserManager.getUserById(id)) throw new BadRequestError('no such user with this id')
        await UserManager.updateUser(id, body)
        res.status(StatusCodes.OK).json({ message: 'user updated successfully' })
    }

    static deleteUser: RequestHandler<{id: number}, {message: string}> = async (req, res, next) => {
        const { params: { id } } = req
        if(!await UserManager.getUserById(id)) throw new BadRequestError('no such user with this id')
        await UserManager.deleteUser(id)
        res.status(StatusCodes.OK).json({ message: 'user deleted successfully' })
    }

    static login: RequestHandler<any, { token?: string, message?: string }, { Email: string, Password: string }> = async (req, res, next) => {
        const { body: { Email, Password } } = req
        const user = await UserManager.getUserByEmail(Email)

        if(!user) throw new BadRequestError('no such user with this email')
        const isValidPassword = await bcrypt.compare(Password, user.Password)
        if(!isValidPassword) return res.status(StatusCodes.OK).json({ message: 'inccorect email or password' })
        if(!user.EmailVerified) return res.status(StatusCodes.OK).json({ message: 'verify your email before logging in' })

        const token = UserController.signUserToken({ Name: user.Name, UserId: user.UserId, Email: user.Email, PhoneNumber: user.PhoneNumber })
        res.status(StatusCodes.OK).json({ token })
    }

    static requestResetPassword: RequestHandler<any, { message: string }, { Email: string }> = async (req, res, next) => {
        const { body: { Email } } = req
        const user = await UserManager.getUserByEmail(Email)
        if(!user) throw new BadRequestError('no such user with this email')
        if(!user.EmailVerified) throw new BadRequestError('verify your email first')

        const token = UserController.signResetPasswordToken({Email: user.Email})
        await EmailHelper.sendUserResetPassword(Email, token)
        res.status(StatusCodes.OK).json({ message: 'a verification email has been sent to you' })
    }

    static resetPassword: RequestHandler<any, { message: string }, { Password: string }, { token: string }> = async (req, res, next) => {
        const { query: { token }, body: { Password } } = req
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { Email: string, resetPassword: boolean }
        if(!decoded.Email || !decoded.resetPassword) throw new UnAthorizedError('invalid token')

        await UserManager.updatePassword(decoded.Email, Password)
        res.status(StatusCodes.OK).json({message: 'password has been reset successfully'})
    }

    static requestVerifyEmail: RequestHandler<any, { message: string }, { Email: string }> = async (req, res, next) => {
        const { body: { Email } } = req
        const user = await UserManager.getUserByEmail(Email)
        if(!user) throw new BadRequestError('no such email with this email')
        if(user.EmailVerified) throw new BadRequestError('your email is already verified')

        const token = UserController.signVerifyEmailToken({ Email: user.Email })
        await EmailHelper.sendVerificationEmail(Email, token)
        res.status(StatusCodes.OK).json({ message: 'a verification email has been sent to you' })
    }

    static verifyEmail: RequestHandler<any, { message: string }, any, { token: string }> = async (req, res, next) => {
        const { query: { token } } = req
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { Email: string, verifyEmail: boolean }
        if(!decoded.Email || !decoded.verifyEmail) throw new UnAthorizedError('invalid token')

        await UserManager.verifyUserEmail(decoded.Email)
        res.status(StatusCodes.OK).json({ message: 'email verified successfully' })
    }
}

export default UserHandler