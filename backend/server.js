import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue'



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
//Configure the router with end points to be exposed to the API

//1st EndPoint for getting to the database
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues)
    });

});

//2nd Endpoint to retrive an issue and read by id
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) =>{
        if (err)
            console.log(err);
        else
            res.json(issue)
    });
});


//3rd Endpoint adding new issues to the database
router.route('/issues/add').post((req, res) =>{
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create a new record')
        });
})

//4th EndPoint updating existing issues
router.route('issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


//5th endpoint by deleting issues per id
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    })
})

app.use('/', router);

app.listen(4200, () => console.log("Express server running on port 4000"));
