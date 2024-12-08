const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');

// Easypaisa Payment Processing
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    const { amount, email, phoneNo } = req.body;

    if (!amount || !email || !phoneNo) {
        return next(new ErrorHandler("Please provide all required fields: amount, email, phoneNo", 400));
    }

    const transactionId = `EASY-${uuidv4()}`;
    const orderId = `ORDER-${uuidv4()}`;

    // Simulate storing the payment record in the database
    const paymentData = {
        transactionId,
        orderId,
        amount,
        email,
        phoneNo,
        status: "Pending",
    };

    try {
        await Payment.create(paymentData); // Save payment info in the database
    } catch (error) {
        return next(new ErrorHandler("Failed to create payment record", 500));
    }

    // Send dummy response
    res.status(200).json({
        success: true,
        message: "Payment processed successfully ",
        transactionId,
        orderId,
    });
});

// Easypaisa Callback Simulation
exports.easypaisaCallback = asyncErrorHandler(async (req, res, next) => {
    const { orderId, transactionId } = req.body;

    if (!orderId || !transactionId) {
        return next(new ErrorHandler("Invalid callback data", 400));
    }

    // Update payment status in the database
    try {
        const payment = await Payment.findOne({ orderId });

        if (!payment) {
            return next(new ErrorHandler("Payment not found", 404));
        }

        payment.status = "Success"; // Mark payment as successful
        await payment.save();

        res.status(200).json({
            success: true,
            message: "Payment callback handled successfully",
            payment,
        });
    } catch (error) {
        return next(new ErrorHandler("Failed to handle payment callback", 500));
    }
});

// Get Payment Status
exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    const payment = await Payment.findOne({ orderId: id });

    if (!payment) {
        return next(new ErrorHandler("Payment Details Not Found", 404));
    }

    res.status(200).json({
        success: true,
        payment,
    });
});
