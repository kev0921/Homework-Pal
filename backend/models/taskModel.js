const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        description: {
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
