import { SuperAdminAttr, model as superAdminConstructor } from "../models/superAdmin"
import { sequelize } from '../models';
import { DataTypes } from 'sequelize';
const SuperAdminModel = superAdminConstructor(sequelize, DataTypes)

class SuperAdminManager {
    static async createSuperAdmin(superAdminToBeAdded: Pick<SuperAdminAttr, 'Name' | 'Email' | 'Password' | 'CompanyId'>): Promise<SuperAdminAttr> {
        const superAdmin = await SuperAdminModel.create(superAdminToBeAdded)
        return superAdmin?.dataValues
    }

    static async getSuperAdminById(superAdminId: number): Promise<SuperAdminAttr> {
        const superAdmin = await SuperAdminModel.findOne({ where: { SuperAdminId: superAdminId } })
        return superAdmin?.dataValues
    }

    static async getSuperAdminByEmail(email: string): Promise<SuperAdminAttr> {
        const superAdmin = await SuperAdminModel.findOne({ where: { Email: email } })
        return superAdmin?.dataValues
    }

    static async updateSuperAdmin(superAdminId: number, superAdminToUpdate: Pick<SuperAdminAttr, 'Name' | 'Email' | 'CompanyId'>): Promise<void> {
        const { Name, Email, CompanyId } = superAdminToUpdate
        await SuperAdminModel.update({ Name, Email, CompanyId }, { where: { SuperAdminId: superAdminId } })
    }

    static async deleteSuperAdmin(superAdminId: number): Promise<void> {
        await SuperAdminModel.destroy({ where: { SuperAdminId: superAdminId } })
    }
}

export default SuperAdminManager