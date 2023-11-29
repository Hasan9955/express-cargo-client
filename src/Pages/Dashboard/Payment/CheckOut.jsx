import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const CheckOut = ({ price, id, status }) => {

  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const totalPrice = price;
    axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => { 
        setClientSecret(res.data.clientSecret)

      })

  }, [axiosSecure, price])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setTransactionId('')


    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card == null) {
      return
    }


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log(error)
      setError(error.message)
    } else {
      console.log('payment method', paymentMethod)
      setError('')
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error: ', confirmError)
    }
    else {
      console.log('payment Intent ', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id)


        const payment = {
          transactionId: paymentIntent.id,
          paymentStatus: 'paid',

        }

        const putData = await axiosSecure.put(`/bookings/update/${id}`, payment)
        if (putData.data.modifiedCount) {
          navigate(`/dashboard/success/${id}`)
        }
      }
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl md:mx-auto mx-2 my-20 bg-orange-300 p-2 md:p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold">Payment Details</h2>
        <h2 className="text-xl font-semibold mb-6">Total Cost: ${price}</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card details
          </label>
          <CardElement
            className="p-3 border rounded-md w-full focus:outline-none focus:border-blue-500"
            options={{
              style: {
                base: {
                  fontSize: '18px',
                  backgroundColor: '#F7F9FC',
                  borderRadius: '8px',
                  padding: '32px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className="btn btn-primary mt-4 w-16 uppercase" type="submit" disabled={!stripe || !clientSecret || status === 'paid'}>
            Pay
          </button>
          {status === 'paid' && <p className="text-red-600 font-bold mt-4 uppercase">This product is already paid!!!</p>}
          {error && <p className="text-red-600 font-bold mt-4 uppercase">{error}</p>}
          {transactionId && <p className="text-green-600 font-bold  mt-4 uppercase">Payment Successful!!! <br /> you transaction Id: {transactionId}</p>}
        </div>
      </form>
    </div>
  );
};

export default CheckOut;