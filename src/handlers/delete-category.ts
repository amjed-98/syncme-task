import { DB_TABLES } from "../config";
import { DBService } from "../services/db.service";
import { ErrorResponse, SuccessResponse } from "../utils";

export async function handler(event: any) {
  try {
    const categoryID = event.pathParameters?.id;

    if (!categoryID) throw new Error("Category ID is required");

    const category = await DBService.getItem(DB_TABLES.categories, {
      CategoryID: categoryID,
    });

    if (!category) throw new Error("Category not found");

    await DBService.deleteItem(DB_TABLES.categories, categoryID);

    return new SuccessResponse(
      200,
      `Category ${categoryID} deleted successfully`,
    );
  } catch (error) {
    console.error("Error deleting category:", error);

    if (error instanceof Error) return new ErrorResponse(400, error.message);
    return new ErrorResponse(500, "Failed to delete category");
  }
}
