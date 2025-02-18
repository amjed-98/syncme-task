export class SuccessResponse<T> {
  body: string;

  constructor(
    public statusCode = 200,
    data: T,
  ) {
    this.body = JSON.stringify({ message: "success", data });
  }
}

export class ErrorResponse {
  body: string;

  constructor(
    public statusCode: number = 500,
    message: string,
  ) {
    const error = ErrorStatusToTextMap[statusCode] || "Internal Server Error";

    this.body = JSON.stringify({ error, message });
  }
}

const ErrorStatusToTextMap: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};
