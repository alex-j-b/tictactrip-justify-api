# tictactrip-justify-api

## Presentation

REST API to justify text.  
Accesible after authentication with unique token.  
Rate limited to 80 000 words by day for each token.  


## Stack

Express + Typescript  
AWS Lambda, API Gateway  


## Endpoints

* POST https://kp6loroqa2.execute-api.eu-west-2.amazonaws.com/dev/api/token  
Body Parameters : email  
  
* POST https://kp6loroqa2.execute-api.eu-west-2.amazonaws.com/dev/api/justify  
Header Parameters : Authorization: token <token>  
Body Parameters : text
