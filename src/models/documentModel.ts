import logger from "../utils/logger";
import { AxiosResponse } from "axios";

export class Document {
  id: string;
  "object-key": string;
  action: "Upload" | "Downlaod";
  bucket: string;
  "presigned-url": string;
  expiry: number;
  status: string;
  constructor(response: AxiosResponse) {
    const data = response.data;
    const attributes = data?.attributes;
    logger.debug("Response attributes from the document", attributes);
    this.id = data?.id;
    this["object-key"] = attributes?.["object-key"];
    this.action = attributes?.action;
    this.bucket = attributes?.bucket;
    this["presigned-url"] = attributes?.["presigned-url"];
    this.expiry = attributes?.expiry;
    this.status = attributes?.status;
  }
}
