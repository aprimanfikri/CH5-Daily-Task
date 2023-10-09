class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
