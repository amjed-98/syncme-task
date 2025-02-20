import { DB_TABLES } from "../config";
import { DBService } from "../services/db.service";
import { Category } from "../types";
import { SuccessResponse, ErrorResponse } from "../utils";

export async function handler() {
  try {
    const categories = await DBService.getAllItems<Category>(
      DB_TABLES.categories,
    );
    return new SuccessResponse(200, categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new ErrorResponse(500, "Failed to retrieve categories");
  }
}
