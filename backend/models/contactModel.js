const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        user_id: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
