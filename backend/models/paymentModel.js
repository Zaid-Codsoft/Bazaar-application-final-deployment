const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
