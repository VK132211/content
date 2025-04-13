export interface DocumentResponse {
  jsonapi: {
    version: string;
  };
  data: {
    id: string;
    type: string;
    attributes: {
      "object-key": string;
      action: "Upload" | "Download";
      bucket: string;
      "presigned-url": string;
      expiry: number;
      status: string;
    };
  };
}

export function buildDocumentResponse(
  id: string,
  type: string = "documents",
  presignedUrl: string,
  status: string,
  objectKey: string = "",
  action: "Upload" | "Download",
  bucket: string = "",
  expiry: number = 3600
): DocumentResponse {
  return {
    jsonapi: { version: "1.0" },
    data: {
      id,
      type,
      attributes: {
        "object-key": objectKey,
        action,
        bucket,
        "presigned-url": presignedUrl,
        expiry,
        status,
      },
    },
  };
}
