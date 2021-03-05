const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const authRouter = require('./routes/Admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['ahahajajjaayuewhej']
    })
);

app.use(authRouter);


app.listen(3000, () => {
    console.log('listening')
})