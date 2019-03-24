
const express  = require('express');

const app = express()


app.get('/', (request,response) => response.send("Hello OD!!"));


const port = process.env.PORT || 1920;

app.listen(port, ()=> console.log(`Server running on port ${port}`));