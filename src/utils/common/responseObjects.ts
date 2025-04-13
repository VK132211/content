export const internalErrorResponse = (error: any) => {
  return {
    jsonapi: { version: "1.0" },
    success: false,
    err: error,
    data: {},
    message: "Internal server error",
  };
};

export const customErrorResponse = (error: any) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    jsonapi: { version: "1.0" },
    success: false,
    err: error.explanation,
    data: {},
    message: error.message,
  };
};

export const successResponse = (data: any, message: any) => {
  return {
    jsonapi: { version: "1.0" },
    success: true,
    message,
    data,
    err: {},
  };
};
