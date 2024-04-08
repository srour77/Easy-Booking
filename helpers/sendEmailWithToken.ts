import nodemailer from 'nodemailer'
import emailConfig from '../config/email'

class EmailHelper {
    static async sendVerificationEmail(email: string, token: string): Promise<void> {
        const url = process.env.BASE_URL + `/users/verifyEmail` + `?token=${token}`
        await this.sendEmailWithUrl(email, url)
    }
    
    static async sendUserResetPassword(email: string, token: string): Promise<void> {
        const url = process.env.BASE_URL + `/users/resetPassword` + `?token=${token}`
        await this.sendEmailWithUrl(email, url)
    }

    static async sendAdminResetPassword(email: string, token: string): Promise<void> {
        const url = process.env.BASE_URL + `/admins/resetPassword` + `?token=${token}`
        await this.sendEmailWithUrl(email, url)
    }
    
    private static async sendEmailWithUrl(email: string, url: string): Promise<void> {
        const transporter = nodemailer.createTransport(emailConfig)
        await transporter.sendMail({ from: process.env.EMAIL_SENDER, to: email, text: url })
    }
}


export default EmailHelper