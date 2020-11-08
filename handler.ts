import { APIGatewayProxyHandler } from 'aws-lambda';
import serverless from 'serverless-http';
import express, { Express, Request, Response } from 'express';

import { generateAccessToken, authenticateToken } from './middlewares/auth';
import { justify } from './services/justify';
import { storeToken } from './services/store-token';
import { getToken } from './services/get-token';


const app: Express = express();
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post('/api/token', express.json(), async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const token = generateAccessToken(email);

    try {
        await storeToken(token, email, 0);
    } catch (e) {
        return res.json({
            token: token,
            error: e.message === 'The conditional request failed' ?
            'Token already exists for this user' :
            e.message
        });
    }

    return res.json({ token: token });
});

app.post('/api/justify', authenticateToken, async (req: Request, res: Response) => {
    // Get token row in DynamoDB
    const authHeader: string = req.headers['authorization'];
    const token: string = authHeader && authHeader.split(' ')[1];
    try {
        var tokenObj = await getToken(token);
    } catch (e) {
        return res.json({ error: e.message || e });
    }

    // Check if wordsCount < 80 000
    const text: string = req.body;
    const wordsCount: number = text.split(/[\s]+/).length;
    const total: number = tokenObj.Item.wordsCount + wordsCount;
    if (total >= 80000) return res.sendStatus(402);

    // Update wordsCount
    try {
        await storeToken(token, null, total);
    } catch (e) {
        res.json({ error: e.message });
    }

    // Return text justified
    const justified: string = justify(req.body, 80);
    return res.json({ text: justified });
});

export const ApiHandler: APIGatewayProxyHandler = serverless(app);
