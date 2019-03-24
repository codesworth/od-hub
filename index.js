
const express  = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express()

//DB CONFIG
const db = require('./config/keys').mongoURI;


//Connect to MongoDB

mongoose.
    connect(db)
    .then(x => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

    


app.get('/', (request,response) => response.send("Hello OD!!"));


//USE Routes

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 1920;

app.listen(port, ()=> console.log(`Server running on port ${port}`));