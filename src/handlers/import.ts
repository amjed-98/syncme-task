import AWS from "aws-sdk";
import dotenv from "dotenv";
import { ImportStatusService } from "../services/import-status.service";
import { ErrorResponse, SuccessResponse } from "../utils";

dotenv.config();

const sqs = new AWS.SQS();

export async function handler() {
  try {
    await ImportStatusService.update("pending");

    const sqsParams = {
      MessageBody: JSON.stringify({ action: "import_categories" }),
      QueueUrl: process.env.SQS_QUEUE_URL!,
    };

    await sqs.sendMessage(sqsParams).promise();

    return new SuccessResponse(202, { message: "Import request received" });
  } catch (error) {
    console.log({ error });
    return new ErrorResponse(500, "Internal Server Error");
  }
}
