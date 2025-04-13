import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
  explanation: string[];
  statusCode: number;

  constructor(errorDetails: { error: Record<string, string> }, message: string) {
    super(message);
    this.name = "ValidationError";
    const explanation: string[] = [];
    Object.keys(errorDetails.error).forEach((key) => {
      explanation.push(errorDetails.error[key]);
    });
    this.explanation = explanation;
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
