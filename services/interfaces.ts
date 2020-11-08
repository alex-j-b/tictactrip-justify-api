export interface ITokenDb {
    Item: {
        email: string;
        wordsCount: number;
        token: string;
    }
}

export interface IUpdateParams {
    TableName: string;
    Key: {
        token: string;
    }
    ConditionExpression?: string;
    UpdateExpression?: string;
    ExpressionAttributeValues?: object;
}
