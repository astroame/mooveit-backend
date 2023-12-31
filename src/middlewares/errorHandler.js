import ErrorResponse from "../utils/errorResponse.js"

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Validator error
  if (error.name === "ValidatorError") {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  })
}

export default errorHandler
