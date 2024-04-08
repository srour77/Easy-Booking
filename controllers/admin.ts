import jwt from "jsonwebtoken"
import { AdminAttr } from "../models/admin"

class AdminController {
    static signAdminToken(admin: Pick<AdminAttr, 'AdminId' | 'Name' | 'Email' | 'PhoneNumber'>): string {
        const { AdminId, Name, Email, PhoneNumber } = admin
        const token = jwt.sign({ AdminId, Name, Email, PhoneNumber, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_PERIOD })
        return token
    }

    static signVerifyEmailToken(admin: Pick<AdminAttr, 'Email'>): string {
        const token = jwt.sign({ ...admin, verifyEmail: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EMAIL_PERIOD })
        return token
    }

    static signResetPasswordToken(admin: Pick<AdminAttr, 'Email'>): string {
        const token = jwt.sign({ ...admin, resetPassword: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_PASSWORD_PERIOD })
        return token
    }
}

export default AdminController