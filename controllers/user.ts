import jwt from "jsonwebtoken"
import { UserAttr } from "../models/user"

class UserController {
    static signUserToken(user: Pick<UserAttr, 'UserId' | 'Name' | 'Email' | 'PhoneNumber'>): string {
        const { UserId, Name, Email, PhoneNumber } = user
        const token = jwt.sign({ UserId, Name, Email, PhoneNumber, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_PERIOD })
        return token
    }

    static signVerifyEmailToken(user: Pick<UserAttr, 'Email'>): string {
        const token = jwt.sign({ ...user, verifyEmail: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EMAIL_PERIOD })
        return token
    }

    static signResetPasswordToken(user: Pick<UserAttr, 'Email'>): string {
        const token = jwt.sign({ ...user, resetPassword: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_PASSWORD_PERIOD })
        return token
    }
}

export default UserController