import { AWS_REGION } from "../config/serverConfig";
import { AWS_DYNAMO_DB_TABLE } from "../config/serverConfig";
import { DynamoDB } from "aws-sdk";
import { URL_EXPIRATION } from "../utils/constants";
let docClient: DynamoDB.DocumentClient;
docClient = new DynamoDB.DocumentClient({
  region: AWS_REGION,
});

export const saveDocumentData = async (documentId: string, objectKey: string, bucket: string, status: string) => {
  const ttl = Math.floor(Date.now() / 1000) + URL_EXPIRATION; // Set TTL to current time + expiration time
  const params: any = {
    TableName: AWS_DYNAMO_DB_TABLE,
    Item: {
      documentId: documentId,
      objectKey: objectKey,
      bucket: bucket,
      status: status,
      createdAt: new Date().toISOString(),
      timeToLive: ttl,
    },
  };
  try {
    await docClient.put(params).promise();
  } catch (error) {
    console.error("Error saving document data", error);
    throw error;
  }
};
