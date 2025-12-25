class ApiError extends Error {
  constructor(statusCode, error, message, stack) {
    super(message);

    this.statusCode = statusCode;
    this.error = error ||" unExpected Error";
    this.message = message || "unexpect  Message";

    // Capture stack trace if not provided
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };