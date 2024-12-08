import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';

const Payment = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [payDisable, setPayDisable] = useState(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // Make POST request to the backend to process the payment and store it in the database
            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);

            // Check if payment was successfully processed and saved
            if (data.success) {
                enqueueSnackbar('Payment processed successfully!', { variant: 'success' });

                // You can handle further logic here, like redirecting to a success page or displaying a success message
            } else {
                enqueueSnackbar('Payment processing failed!', { variant: 'error' });
            }

        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error.message || 'Payment processing failed.', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: 'error' });
        }
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Bazaar: Secure Payment | Dummy Payment" />

            <main className="w-full mt-20">
                {/* Payment row */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    {/* Cart column */}
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue="dummy"
                                            name="payment-radio-button"
                                        >
                                            <FormControlLabel
                                                value="dummy"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="easypaisaa.png" alt="Easypaisa" />
                                                        <span>easypaisa Payment</span>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <input 
                                        type="submit" 
                                        value={`Pay PKR ${totalPrice.toLocaleString()}`} 
                                        disabled={payDisable ? true : false} 
                                        className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} 
                                    />
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
