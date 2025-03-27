
import React from 'react';

const SignIn = ({ onSignIn }) => {
  const handleSignIn = async () => {
    try {
      const invoice = "lnbc100n1p3tlhj8pp5f2eww3..."; // Example invoice
      const response = await window.lightning.signMessage(invoice);
      onSignIn(response);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div>
      <h2>Sign In with WebLN</h2>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;