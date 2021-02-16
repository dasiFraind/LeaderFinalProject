const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const router = require('./routes/api');
const cors = require('cors');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//פרמטרים של הגדרות להתחברות לבסיס נתונים
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

//אני רוצה להתחבר לבסיס נתונים
mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db!!!")
    })
    .catch((err) => {
        console.log(`error connected: ${err}`);
    })

//בשביל להשתמש ב-bodeyParser
//ממיר את הבקשות ל-json
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.listen(3001, () => console.log("listening in port 3001!!!"));

