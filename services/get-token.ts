import { dynamoDb } from './dynamodb';
import { today } from './today';
import { ITokenDb, IUpdateParams } from './interfaces';


export async function getToken(token: string): Promise<ITokenDb> {
    const params = {
        TableName: 'justify-tokens',
        Key: { token: token },
    };
    const tokenObj = await dynamoDb('get', params);
    if (Object.keys(tokenObj).length === 0) throw 'Invalid token';

    //Reset token to 0 wordsCount
    if (tokenObj.Item.lastUse !== today()) {
        let params: IUpdateParams = {
            TableName: 'justify-tokens',
            Key: { token: token },
            UpdateExpression: 'SET wordsCount = :wordsCount, lastUse = :lastUse',
            ExpressionAttributeValues: {':wordsCount' : 0, ':lastUse' : today()}
        };
        await dynamoDb('update', params);
        tokenObj.Item.wordsCount = 0;
    }

    return tokenObj;
}
