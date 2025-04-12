import { StatusCodes } from "http-status-codes";

export const validate = (schema: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "fail",
        message: error.details[0].message,
        data: null,
      });
    }
  };
};
