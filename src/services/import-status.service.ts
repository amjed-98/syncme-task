import { DBService } from "./db.service";

export class ImportStatusService {
  static readonly #STATUS_TABLE = "Import_Status";

  static async getLatestStatus() {
    const result = await DBService.getItem<ImportStatusItem>(
      this.#STATUS_TABLE,
      { ImportID: "latest" },
    );

    if (!result) return undefined;

    return result;
  }

  static async update(status: Status): Promise<void> {
    await DBService.putItem(this.#STATUS_TABLE, {
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
