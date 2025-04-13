import { v4 as uuidv4 } from "uuid";
import { generateDownloadPresignedUrl, generateUploadPresignedUrl } from "../entity/s3";
import { saveDocumentData } from "../entity/db";
import { URL_EXPIRATION } from "../utils/constants";
import { buildDocumentResponse } from "../utils/buildDocumentResponse";
import ValidationError from "../utils/errors/ValidationError";
export const handleDocument = async (request: any) => {
  const { action, bucket } = request.data.attributes;
  const objectKey = request.data.attributes["object-key"];
  const documentId = uuidv4();

  try {
    if (action === "Upload") {
      const presignedUrl = await generateUploadPresignedUrl(objectKey);
      await saveDocumentData(documentId, objectKey, bucket, "PRESIGNED_URL");
      const response = buildDocumentResponse(
        documentId,
        "documents",
        presignedUrl,
        "PRESIGNED_URL",
        objectKey,
        action,
        bucket,
        URL_EXPIRATION * 60
      );
      return response;
    } else if (action === "Download") {
      const presignedUrl = await generateDownloadPresignedUrl(objectKey);
      const response = buildDocumentResponse(
        documentId,
        "documents",
        presignedUrl,
        "PRESIGNED_URL",
        objectKey,
        action,
        bucket,
        URL_EXPIRATION * 60
      );
      return response;
    } else {
      throw new ValidationError(
        {
          error: { details: 'Invalid action type. Only "Upload" and "Download" are allowed.' },
        },
        "Invalid action type. Only 'Upload' and 'Download' are allowed."
      );
    }
  } catch (error) {
    throw error;
  }
};
