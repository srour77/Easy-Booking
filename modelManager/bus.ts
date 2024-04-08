import { BusAtrr, model as busConstructor } from "../models/bus";
import { sequelize } from '../models';
import { DataTypes, Transaction } from 'sequelize';
const BusModel = busConstructor(sequelize, DataTypes)

class BusManager {
    static async createBus(busToBeAdded: Pick<BusAtrr, 'DisplayName' | 'PlateNumber' | 'SerialNumber' | 'CompanyId' | 'Size'>): Promise<BusAtrr> {
        const bus = await BusModel.create(busToBeAdded)
        return bus?.dataValues
    }

    static async getBus(busId: number): Promise<BusAtrr> {
        const bus = await BusModel.findOne({ where: { BusId: busId } })
        return bus?.dataValues
    }

    static async getAndLockBusById(busId: number, transaction: Transaction): Promise<BusAtrr> {
        const bus = (await BusModel.findOne({ where: { BusId: busId }, transaction } ))?.dataValues
        return bus
    }

    static async updateBus(busId: number, busToUpdate: Pick<BusAtrr, 'DisplayName' | 'CompanyId' | 'PlateNumber' | 'SerialNumber' | 'Size'>): Promise<void> {
        const { DisplayName, PlateNumber, SerialNumber, Size, CompanyId } = busToUpdate
        await BusModel.update({ DisplayName, PlateNumber, SerialNumber, Size, CompanyId }, { where: { BusId: busId } })
    }
    
    static async deleteBus(busId: number): Promise<void> {
        await BusModel.destroy({ where: { BusId: busId } })
    }
}

export default BusManager