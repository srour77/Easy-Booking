import { CompanyAttr, model as companyConstructor } from "../models/company";
import { sequelize } from '../models';
import { DataTypes } from 'sequelize';
const CompanyModel = companyConstructor(sequelize, DataTypes)

class CompanyManager {
    static async createCompany(companyToBeAdded: Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>): Promise<CompanyAttr> {
        const { Name, Email, PhoneNumber } = companyToBeAdded
        const company = await CompanyModel.create({ Name, Email, PhoneNumber })
        return company.dataValues
    }

    static async getCompany(companyId: number): Promise<CompanyAttr> {
        const company = await CompanyModel.findOne({ where: { CompanyId: companyId } })
        return company?.dataValues
    }

    static async updateCompany(companyId: number, companyToUpdate: Pick<CompanyAttr, 'Name' | 'Email' | 'PhoneNumber'>): Promise<void> {
        const { Name, Email, PhoneNumber } = companyToUpdate
        await CompanyModel.update({ Name, Email, PhoneNumber }, { where: { CompanyId: companyId } })
    }

    static async deleteCompany(companyId: number): Promise<void> {
        await CompanyModel.destroy({ where: { CompanyId: companyId } })
    }
}

export default CompanyManager