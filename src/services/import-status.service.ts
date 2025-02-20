import { DB_TABLES } from "../config";
import { DBService } from "./db.service";

export class ImportStatusService {
  static async getLatestStatus() {
    const result = await DBService.getItem<ImportStatusItem>(
      DB_TABLES.importStatus,
      { ImportID: "latest" },
    );

    if (!result) return undefined;

    return result;
  }

  static async update(status: Status): Promise<void> {
    await DBService.putItem(DB_TABLES.importStatus, {
      ImportID: "latest",
      Status: status,
      Timestamp: new Date().toISOString(),
    });
  }
}

type Status = "pending" | "in-progress" | "completed" | "failed";

type ImportStatusItem = {
  ImportID: string;
  Status: Status;
  Timestamp: string;
};
