import { StatusCodes } from "http-status-codes";
import { BusAtrr } from "../models/bus";
import BusManager from "../modelManager/bus";
import { RequestHandler } from "express";
import BadRequestError from "../errors/badRequest";
import UnAthorizedError from "../errors/unAuthorized";

class BusHandler {
    static createBus: RequestHandler<any, { message: string }, Pick<BusAtrr, 'DisplayName' | 'SerialNumber' | 'PlateNumber' | 'Size' | 'CompanyId'>> = async (req, res, next) => {
        const { body } = req
        await BusManager.createBus(body)
        res.status(StatusCodes.CREATED).json({ message: 'bus created successfully' })
    }

    static getBus: RequestHandler<{id: number}, Pick<BusAtrr, 'DisplayName' | 'SerialNumber' | 'PlateNumber' | 'Size' | 'CompanyId'>> = async (req, res, next) => {
        const { params: { id } } = req
        const bus = await BusManager.getBus(id)
        if(!bus) throw new BadRequestError('no such bus with this id')
        res.status(StatusCodes.OK).json(bus)
    }

    static updateBus: RequestHandler<{id: number}, { message: string }, Pick<BusAtrr, 'DisplayName' | 'SerialNumber' | 'PlateNumber' | 'Size' | 'CompanyId'>> = async (req, res, next) => {
        const { params: { id }, body } = req
        await BusManager.updateBus(id, body)
        res.status(StatusCodes.OK).json({ message: 'bus updated successfully' })
    }

    static deleteBus: RequestHandler<{id: number}, { message: string }> = async (req, res, next) => {
        const { params: {id} } = req
        await BusManager.deleteBus(id)
        res.status(StatusCodes.OK).json({ message: 'bus deleted successfully' })
    }
}

export default BusHandler