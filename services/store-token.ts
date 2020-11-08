import { dynamoDb } from './dynamodb';
import { today } from './today';
import { ITokenDb, IUpdateParams } from './interfaces';


export function storeToken(token: string, email: string, wordsCount: number): Promise<ITokenDb> {
    let params: IUpdateParams = {
        TableName: 'justify-tokens',
        Key: { token: token }
    };

    // First storage
    if (email) {
        params.ConditionExpression = 'attribute_not_exists(email)';
        params.UpdateExpression = 'SET email = :email, wordsCount = :wordsCount, lastUse = :lastUse';
        params.ExpressionAttributeValues = {':email' : email, ':wordsCount' : wordsCount, ':lastUse' : today()};
    }
    // Further storages with wordsCount updated
    else {
        params.UpdateExpression = 'SET wordsCount = :wordsCount';
        params.ExpressionAttributeValues = {':wordsCount' : wordsCount};
    }

    return dynamoDb('update', params);
}
