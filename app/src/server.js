import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import dbConfig from './config/database.config';
import mongoose from 'mongoose';


const app = express();
const port = 5000

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


