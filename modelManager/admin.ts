import bcrypt from 'bcrypt'
import { sequelize } from '../models';
import { DataTypes } from 'sequelize';
import { AdminAttr, model as adminConstructor } from './../models/admin';
const AdminModel = adminConstructor(sequelize, DataTypes)

class AdminManager {
    static async getAllAdmins(): Promise<AdminAttr[]> {
        const admins = (await AdminModel.findAll()).map(admin => admin.dataValues)
        return admins
    }

    static async getAdminById(adminId: number): Promise<Partial<AdminAttr>> {
        const admin = (await AdminModel.findByPk(adminId)).dataValues
        return admin
    }

    static async createAdmin(adminToBeAdded: Pick<AdminAttr, 'Name' | 'Email' | 'PhoneNumber' | 'Password' | 'CompanyId'>): Promise<AdminAttr> {
        adminToBeAdded.Password = await bcrypt.hash(adminToBeAdded.Password, 10)
        const admin = await AdminModel.create(adminToBeAdded)
        return admin.dataValues
    }

    static async updateAdmin(adminId: number, adminToBeUpdated: Pick<AdminAttr, 'Name' | 'Email' | 'PhoneNumber'>): Promise<void> {
        const { Name, Email, PhoneNumber } = adminToBeUpdated
        await AdminModel.update({ Name, Email, PhoneNumber }, { where: { AdminId: adminId } })
    }

    static async deleteAdmin(adminId: number): Promise<boolean> {
        await AdminModel.destroy({ where: { AdminId: adminId } })
        return true
    }

    static async getAdminByEmail(email: string): Promise<AdminAttr> {
        const admin = await AdminModel.findOne({ where: { Email: email } })
        return admin?.dataValues
    }

    static async updatePassword(email: string, password: string): Promise<void> {
        await AdminModel.update({ Password: await bcrypt.hash(password, Number(process.env.SALT_SIZE)) }, { where: { Email: email } })
    }
}

export default AdminManager