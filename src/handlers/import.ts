import AWS from "aws-sdk";
import { ImportStatusService } from "../services/import-status.service";
import { ErrorResponse, sleep, SuccessResponse } from "../utils";

const sqs = new AWS.SQS();

export async function handler() {
  try {
    await ImportStatusService.update("pending");

    const sqsParams = {
      MessageBody: JSON.stringify({ action: "import_categories" }),
      QueueUrl: process.env.SQS_QUEUE_URL!,
    };

    await sleep(2000);
    await sqs.sendMessage(sqsParams).promise();

    return new SuccessResponse(202, { message: "Import request received" });
  } catch (error) {
    console.log({ error });
    return new ErrorResponse(500, "Internal Server Error");
  }
}

// https://sqs.us-east-1.amazonaws.com/248189928110/syncme-task-ImportQueue-wU1CQKDz3gWq
