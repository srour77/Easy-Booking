import CustomError from './customError'
import { StatusCodes } from 'http-status-codes'

class BadRequestError extends CustomError{
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST)
    }
}

export default BadRequestError