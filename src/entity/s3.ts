import { S3 } from "aws-sdk"
import { AWS_REGION } from "../config/serverConfig";
import { AWS_BUCKET_NAME } from "../config/serverConfig";
import { URL_EXPIRATION } from "../utils/constants";
let client: AWS.S3;
client = new S3({
  region: AWS_REGION,})

export const generateUploadPresignedUrl = async (objectKey: string) => {
    const params ={
        Bucket: AWS_BUCKET_NAME,
        Key: objectKey,
        Expires: URL_EXPIRATION, // 60 minutes
    }
    try {
        const url = await client.getSignedUrlPromise("putObject", params);
        return url;
    } catch (error) {
        console.error("Error generating presigned URL", error);
        throw error;
    }
}

export const generateDownloadPresignedUrl = async (objectKey: string) => {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: objectKey,
        Expires: URL_EXPIRATION, // 60 minutes
    };
    try {
        const url = await client.getSignedUrlPromise("getObject", params);
        return url;
    } catch (error) {
        console.error("Error generating presigned URL", error);
        throw error;
    }
}