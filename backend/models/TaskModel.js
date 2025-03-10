const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    deadline: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'Done'],
        default: 'To-Do',
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', TaskSchema);