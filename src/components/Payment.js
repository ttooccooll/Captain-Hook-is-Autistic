import React from 'react';
import { LightningAddress } from "@getalby/lightning-tools";

const ln = new LightningAddress("jasonbohio@getalby.com");

const playMP3 = () => {
  const audio = new Audio("/sounds/kingm.mp3");
  audio.play();
};

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    playMP3();
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet. (https://getalby.com/ or https://lightningjoule.com/ or https://github.com/fiatjaf/kwh/ for example)");
      }
      await window.webln.enable();
      await ln.fetch();
      const invoice = await ln.requestInvoice({ satoshi: 100, description: "Movie Trivia Game Fee"  });
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