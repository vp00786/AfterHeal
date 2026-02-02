const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    severity: {
        type: String,
        enum: ['critical', 'non-critical'],
        required: true,
    },
}, {
    timestamps: true,
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
