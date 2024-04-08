import jwt from 'jsonwebtoken'
import { RequestHandler } from "express"
import UnAthorizedError from "../errors/unAuthorized"
import { AdminToken, SuperAdminToken, UserToken } from '../globals/types'
import { Roles } from '../globals/enums'
import BadRequestError from '../errors/badRequest'
import UserManager from '../modelManager/user'
import AdminManager from '../modelManager/admin'
import SuperAdminManager from '../modelManager/superAdmin'

class AuthenticationMiddleware {
    static authenticateUser:RequestHandler<any, {message: string}> =  async(req, res, next) => {
        const { headers: { authorization } } = req
        const decoded = this.getTokenPayload(authorization) as UserToken
        if(!decoded) throw new BadRequestError('invalid token')
        if(decoded.role != Roles.user || !await UserManager.getUserById(decoded.UserId)) throw new UnAthorizedError('not authorized user')
        Object.defineProperty(res.locals, Roles.user, { value: decoded, enumerable: true })
        next()
    }

    static authenticateAdmin:RequestHandler<any, {message: string}> =  async(req, res, next) => {
        const { headers: { authorization } } = req
        const decoded = this.getTokenPayload(authorization) as AdminToken
        if(!decoded) throw new BadRequestError('invalid token')
        if(decoded.role != Roles.admin || !await AdminManager.getAdminById(decoded.AdminId)) throw new UnAthorizedError('not authorized admin')
        Object.defineProperty(res.locals, Roles.admin, { value: decoded, enumerable: true })
        next()
    }

    static authenticateSuperAdmin:RequestHandler<any, {message: string}> =  async(req, res, next) => {
        const { headers: { authorization } } = req
        const decoded = this.getTokenPayload(authorization) as SuperAdminToken
        if(!decoded) throw new BadRequestError('invalid token')
        if(decoded.role != Roles.superAdmin || !await SuperAdminManager.getSuperAdminById(decoded.SuperAdminId)) throw new UnAthorizedError('not authorized super admin')
        Object.defineProperty(res.locals, Roles.superAdmin, { value: decoded, enumerable: true })
        next()
    }

    static authenticateAdminOrSuperAdmin: RequestHandler<any, {message: string}> = async(req, res, next) => {
        const { headers: { authorization } } = req
        const decoded = this.getTokenPayload(authorization) as AdminToken | SuperAdminToken
        if(!decoded) throw new BadRequestError('invalid token')
        if(decoded.role != Roles.superAdmin && decoded.role != Roles.admin) throw new UnAthorizedError('not authorized admin / super admin')
        Object.defineProperty(res.locals, decoded.role, { value: decoded, enumerable: true })
        next()
    }

    private static getTokenPayload(authorizationHeader: string): UserToken | AdminToken | SuperAdminToken | null {
        const token = authorizationHeader.split(' ')[1]
    
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch(err) {
            decoded = null
        }

        return decoded
    }
}

export default AuthenticationMiddleware