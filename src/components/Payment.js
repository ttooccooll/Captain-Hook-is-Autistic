
import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      const invoice = "lnbc100n1p3tlhj8pp5f2eww3..."; // Example invoice
      const response = await window.lightning.requestPayment(invoice);
      if (response.preimage) {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <h2>Pay 100 sats to play again</h2>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;