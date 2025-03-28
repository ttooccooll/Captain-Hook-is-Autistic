import React, { useEffect } from 'react';

const SignIn = ({ onSignIn }) => {
  useEffect(() => {
    // Check if WebLN is available
    if (!window.webln) {
      alert("WebLN provider not found. Please install a WebLN-compatible wallet.");
    }
  }, []);

  const handleSignIn = async () => {
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet.");
      }

      console.log("Requesting WebLN enable...");
      await window.webln.enable();
      console.log("WebLN enabled successfully.");

      console.log("Requesting WebLN getInfo...");
      const info = await window.webln.getInfo();
      console.log("WebLN Node Info:", info);

      onSignIn(info.node);
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Sign In with WebLN. You are not being charged yet.</h1>
      <button onClick={handleSignIn}></button>
    </div>
  );
};

export default SignIn;