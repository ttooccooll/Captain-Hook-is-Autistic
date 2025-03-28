import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }

      const invoice = "lnbc1u1pn7tv7csp5tuq3f2kusf67yku3g59mjge0h3wv37w4jg8ujs93r3y3jq07aw0spp5sjgu0nl9enylkl4e46vflh8zj5s5322uk04ya0e3guxnp3qfp34shp5uwcvgs5clswpfxhm7nyfjmaeysn6us0yvjdexn9yjkv3k7zjhp2sxq9z0rgqcqpnrzjqvjt5gujufdl7a4t6zcl0e948d0c92jnlhwrgxds2xmvsqwmnc3ywrf67vqqnvsqqqqqqqqqqqqqqzsq2q9qxpqysgq9lswwzkrm2kfph4ulvu3tht46ydrdvaajk2uht8al0xyegx35gj5ux2427ekvjjtyct0zpd344e0th8vzqyw3pacc0fnzxz9edhac2cqprxfhu";
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