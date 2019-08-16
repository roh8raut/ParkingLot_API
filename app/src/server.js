import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import mongoose from 'mongoose';

require('dotenv').config();
var cors = require('cors')

// const url =  'mongodb://localhost:27017/parkinglot';

const app = express();
// const port = process.env.PORT || 5000;
const port = 5000;
console.log("env>>", process.env.PORT);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parkinglot', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

 mongoose.Promise = global.Promise;

// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });


app.use('/', router);

app.listen(port, () => {
    console.log("server is running..,");
})
