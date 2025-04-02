import React from 'react';
import { LightningAddress } from "@getalby/lightning-tools";

const ln = new LightningAddress("jasonbohio@getalby.com");

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }
      await window.webln.enable();
      await ln.fetch();
      const invoice = await ln.requestInvoice({ satoshi: 100 });
      console.log("Requesting payment...");

      await window.webln.enable();
      const response = await window.webln.sendPayment(invoice.paymentRequest);
      console.log("Payment response:", response);

      const paid = invoice.validatePreimage(response.preimage);

      if (paid) {
        console.log(invoice.preimage);
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