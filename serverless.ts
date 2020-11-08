import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: 'tictactrip-justify-api',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: [
        'serverless-webpack',
        'serverless-offline',
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs10.x',
        stage: 'dev',
        region: 'eu-west-2',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            TOKEN_SECRET: '${file(./env.json):TOKEN_SECRET}',
        },
        iamRoleStatements:
        [
            {
              "Effect": "Allow",
              "Action": [
                "dynamodb:*"
              ],
              "Resource": "*arn:aws:dynamodb:eu-west-2:*:*"
            }
        ]
    },
    functions: {
        ApiHandler: {
            handler: 'handler.ApiHandler',
            events: [
                {
                    http: {
                        method: 'post',
                        path: 'api/token',
                    }
                },
                {
                    http: {
                        method: 'post',
                        path: 'api/justify',
                    }
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration;
