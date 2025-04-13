import { StatusCodes } from "http-status-codes";
import { handleDocument } from "../services/documentService";
import { customErrorResponse, internalErrorResponse } from "../utils/common/responseObjects";

export const createDocumentController = async (req: any, res: any) => {
  try {
    const response = await handleDocument(req.body);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error: any) {
    console.error("Error in createDocumentController:", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
  }
};
