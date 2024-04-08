import { StatusCodes } from 'http-status-codes'
import CustomError from './customError'

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NO_CONTENT)
  }
}

export default NotFoundError