import AWS from "aws-sdk";
import { DB_TABLES } from "../config";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

type TableName = (typeof DB_TABLES)[keyof typeof DB_TABLES];

export class DBService {
  static async putItem(tableName: TableName, item: Record<string, string>) {
    const params = {
      TableName: tableName,
      Item: item,
    };
    await dynamoDB.put(params).promise();
  }

  static async batchWrite(
    tableName: TableName,
    items: Record<string, string>[],
  ) {
    const params = {
      RequestItems: {
        [tableName]: items.map((item) => ({ PutRequest: { Item: item } })),
      },
    };
    await dynamoDB.batchWrite(params).promise();
  }

  static async getItem<T>(tableName: TableName, key: Record<string, string>) {
    const params = {
      TableName: tableName,
      Key: key,
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item as T | undefined;
  }

  static async getAllItems<T>(tableName: TableName) {
    const params = { TableName: tableName };

    const { Items = [] } = await dynamoDB.scan(params).promise();
    return Items as T[];
  }

  static async deleteItem(tableName: TableName, categoryID: string) {
    const params = {
      TableName: tableName,
      Key: { CategoryID: categoryID },
    };

    await dynamoDB.delete(params).promise();
  }
}
