import AWS from 'aws-sdk';

export function dynamoDb(action: string, params: object): Promise<any>{
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
}
