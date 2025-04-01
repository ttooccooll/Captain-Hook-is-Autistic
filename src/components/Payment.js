import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }

      const invoice = "";
      console.log("Requesting payment...");
      const response = await window.webln.sendPayment(invoice);
      console.log("Payment response:", response);

      if (response.preimage) {
        console.log("Payment successful.");
        onPaymentSuccess();
      } else {
        console.log("Payment failed: No preimage received.");
        throw new Error("Payment failed: No preimage received.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Pay 100 sats to play again</h1>
      <button onClick={handlePayment}></button>
    </div>
  );
};

export default Payment;