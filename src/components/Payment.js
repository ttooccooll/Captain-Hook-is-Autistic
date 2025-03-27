import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }

      const invoice = "lnbc1u1pn72e02sp5qpcyktjc4fqcc8k3dzwdm00dun5tj3vv52k2qsmt5dqvp6lm4k3qpp520dex8aje34ehtzj9fklv2ykdur0evtgfcsud7f684jzpumwtecshp5uwcvgs5clswpfxhm7nyfjmaeysn6us0yvjdexn9yjkv3k7zjhp2sxq9z0rgqcqpnrzjqwuyhm4rwjccnjvkpw5g3jtxhjdwmux6p0qvqk9upadaalt03qg4vrt7puqqjesqqyqqqqlgqqqqztqq2q9qxpqysgq4etupss8z7cg5y7mz2jx48dw2m2mlukrtern96z7cmlkfwkzym59g72dt5rtmhsvant9a6cg80q2eyqaa7s6ntyny3ptdakguljgjagqp287yk";
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