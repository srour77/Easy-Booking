import { StatusCodes } from 'http-status-codes'
import CustomError from './customError'

class UnAthorizedError extends CustomError {
    constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}

export default UnAthorizedError