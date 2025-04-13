import { customErrorResponse } from "../common/responseObjects";
import { StatusCodes } from "http-status-codes";
const Joi = require("joi");

export const validate = (schema: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      let explanation: string[] = [];
      let errorMessage = "";

      if (error.details && Array.isArray(error.details)) {
        error.details.forEach((detail: any) => {
          explanation.push(`${detail.path.join(".")} ${detail.message}`);
          errorMessage += ` : ${detail.path.join(".")} ${detail.message}`;
        });
      }

      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: `Validation error${errorMessage}`,
          explanation,
        })
      );
    }
  };
};
