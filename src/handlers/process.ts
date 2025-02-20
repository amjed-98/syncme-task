import { DB_TABLES } from "../config";
import { DBService } from "../services/db.service";
import { ImportStatusService } from "../services/import-status.service";
import { WooCommerceService } from "../services/woo-commerce.service";
import { ErrorResponse, sleep, SuccessResponse } from "../utils";

export async function handler() {
  try {
    await ImportStatusService.update("in-progress");

    const categories = await WooCommerceService.fetchCategories();

    await sleep(2000);

    await DBService.batchWrite(
      DB_TABLES.categories,
      categories.map((category) => ({
        CategoryID: category.id.toString(),
        Name: category.name,
        Description: category.description ?? "",
        ParentID: category.parent.toString(),
        Display: category.display ?? "",
      })),
    );

    await ImportStatusService.update("completed");

    return new SuccessResponse(200, "Categories imported successfully");
  } catch (error) {
    console.error(error);

    await ImportStatusService.update("failed");

    return new ErrorResponse(500, "Error fetching WooCommerce categories");
  }
}
