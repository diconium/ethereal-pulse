# HOW TO

## Test Integration

#### Steps

1. Execute script `install`: `npm install`
2. Execute script `build`: `npm run build`
3. Execute script `start`: `npm run start`
4. call API endpoint using some rest tool or curl, for example:
<br>

`curl -X POST http://localhost:3000/send \
     -H "Content-Type: application/json" \
     -d '{ "recipients": [ "daniel.fernandes@diconium.com" ],"subject": "test node integration","message": "<h1>TESTE</h1>"}'`

## For Development

#### Steps

1. Execute script `install`: `npm install`
2. Execute script `build`: `npm run build`
3. Execute script `dev`: `npm run dev`
4. call API endpoint using some rest tool or curl, for example:
<br>

`curl -X POST http://localhost:3000/send \
     -H "Content-Type: application/json" \
     -d '{ "recipients": [ "daniel.fernandes@diconium.com" ],"subject": "test node integration","message": "<h1>TESTE</h1>"}'`
