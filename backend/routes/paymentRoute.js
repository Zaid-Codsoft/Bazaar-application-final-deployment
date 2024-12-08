const express = require('express');
const { processPayment, easypaisaCallback, getPaymentStatus } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

// Route to process payment
router.route('/payment/process').post(processPayment);

// Easypaisa callback simulation
router.route('/callback').post(easypaisaCallback);

// Route to get payment status
router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;
