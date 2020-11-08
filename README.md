# tictactrip-justify-api

## Presentation

REST API to justify text.  
Accesible after authentication with unique token.  
Rate limited to 80 000 words by day for each token.  


## Stack

Express + Typescript  
AWS Lambda, API Gateway  


## Endpoints

### Domain : https://kp6loroqa2.execute-api.eu-west-2.amazonaws.com/dev/

* POST api/token  
Content-Type: application/json  
Body Parameters : email = `<email>`  
  
* POST api/justify  
Content-Type: text/plain  
Header Parameters : Authorization = token `<token>`   
Body : `<email>`  
