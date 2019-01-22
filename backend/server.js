import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();
const router = express.Router();

app.unsubscribe(cors());
app.use(bodyParser.json());

mongoose.connect('');

const connect = mongoose.connection;

//Database Event Listener
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


//Attaching a middleware which is the default router
//Configure the router with end poiunts to be exposed to the API

app.use('/', router);

app.listen(4200, () => console.log("Express server running on port 4000"));
