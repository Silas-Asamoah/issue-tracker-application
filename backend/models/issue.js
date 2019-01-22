import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});


//Exporting default issue model

export default mongoose.model('Issue', Issue);