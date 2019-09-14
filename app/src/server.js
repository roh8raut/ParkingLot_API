import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import mongoose from 'mongoose';

require('dotenv').config();
var cors = require('cors')

const url =  'mongodb://localhost:27017/PLD';
// const url = 'mongodb://parkinglot:rohit6@ds129394.mlab.com:29394/heroku_frwqjj8g';

const app = express();
const port = process.env.PORT || 5000;
// const port = 5000;
console.log("env>>", process.env.PORT, port);
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://rohit:raut@parkinglotdb-shard-00-00-8apmh.mongodb.net:27017,parkinglotdb-shard-00-01-8apmh.mongodb.net:27017,parkinglotdb-shard-00-02-8apmh.mongodb.net:27017/test?ssl=true&replicaSet=parkinglotDB-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true,  useFindAndModify: false })
mongoose.connect(process.env.MONGODB_URI || url,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// var connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {

//     connection.db.collection("parkinglotdata", function(err, collection){
//         collection.find({}).toArray(function(err, data){
//             console.log(data); // it will print your collection data
//         })
//     });
// });

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
});
