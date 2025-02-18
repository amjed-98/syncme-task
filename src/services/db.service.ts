import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export class DBService {
  static async putItem(tableName: string, item: any) {
    const params = {
      TableName: tableName,
      Item: item,
    };
    await dynamoDB.put(params).promise();
  }

  static async batchWrite(tableName: string, items: any[]) {
    const params = {
      RequestItems: {
        [tableName]: items.map((item) => ({ PutRequest: { Item: item } })),
      },
    };
    await dynamoDB.batchWrite(params).promise();
  }

  static async getItem<T>(tableName: string, key: any) {
    const params = {
      TableName: tableName,
      Key: key,
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item as T | undefined;
  }

  static async scanTable(tableName: string) {
    const params = { TableName: tableName };

    const { Items = [] } = await dynamoDB.scan(params).promise();
    return Items;
  }
}
