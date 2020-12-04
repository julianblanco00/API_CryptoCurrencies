## Run API

#### Requirements:
##### - Install mongodb and run it
####
##### Then run:
####
```bash
npm i && npm run dev
```

##### SignUp endpoint: `POST /auth/signup`, data: 
``` js
{
    username: 'JohnDoe', 
    password: 'password', 
    name: 'John',  
    lastname: 'Doe', 
    favCurrency: 'usd'
}
```

##### Login endpoint: `POST /auth/login`, data: 
``` js 
{
    username: 'JohnDoe',
    password: 'password'
}
```
##### Header: `x-access-token: + token` (the token is given on signup and login)
##### Add cryptocurrencies endpoint: `POST /crypto/add`, header and data: 
```js
{
    cryptoId: 'bitcoin'
}
```

##### Get all cryptocurrencies: `GET /crypto/get-all` with token header.
##### Get my cryptocurrencies: `GET /crypto/get/my-cryptos` with token. You can send parameters: `?top=10&order=asc`. order can be `asc or desc`, y top shows a `limit of 25` currencies.
