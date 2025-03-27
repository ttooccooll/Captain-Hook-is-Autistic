import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }

      const invoice = "lnbc1u1pn72l40sp5zc0z0gtm0zk34kea6sh6x5vm7r5727xwrzctcjdkwwwax4zshhmspp5q9nl680e48q3f2zksf807h5f0zdtfzyzwdwfes9x983sutwwyh3shp5uwcvgs5clswpfxhm7nyfjmaeysn6us0yvjdexn9yjkv3k7zjhp2sxq9z0rgqcqpnrzjqwsl8t7kgmthhkh4ghxw4ureh2mq2l4w2trrrxmrkkqr6zvf66nj7rv03cqqpfcqqqqqqqqqqqqqqqqqjq9qxpqysgqyp9f3unwmp5ftpedx2pmw2klmqa55kf4gm9ukjnqy2wqp0a55dxyn8j7830k76kr4gwe4pcun5lz7g3rzsshvv79h06jwjncqdvxsrcqc5jz57";
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
      <h2>Pay 100 sats to play again</h2>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;