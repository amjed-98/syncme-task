import { ImportStatusService } from "../services/import-status.service";
import { ErrorResponse, SuccessResponse } from "../utils";

export async function handler() {
  try {
    const item = await ImportStatusService.getLatestStatus();

    if (!item) throw new Error("No import process found");

    return new SuccessResponse(200, {
      import_status: item.Status,
      last_update: item.Timestamp,
    });
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) return new ErrorResponse(404, error.message);
    else return new ErrorResponse(500, JSON.stringify({ error }));
  }
}
