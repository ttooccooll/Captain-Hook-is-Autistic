import React, { useEffect } from 'react';

const playMP3 = () => {
  const audio = new Audio("/sounds/kingm.mp3");
  audio.volume = 0.25;
  audio.play();
};

const SignIn = ({ onSignIn, score, totalQuestions  }) => {
  useEffect(() => {
    // Check if WebLN is available
    if (!window.webln) {
      alert("WebLN provider not found. Please install a WebLN-compatible wallet. (https://getalby.com/ or https://lightningjoule.com/ or https://github.com/fiatjaf/kwh/ for example)");
    }
  }, []);

  const handleSignIn = async () => {
    playMP3();
    try {
      if (!window.webln) {
        throw new Error("WebLN provider not found. Please install a WebLN-compatible wallet. (https://getalby.com/ or https://lightningjoule.com/ or https://github.com/fiatjaf/kwh/ for example)");
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
      <h1>To continue, please sign in with your favorite bitcoin browser wallet. You are not being charged yet.</h1>
      <button onClick={handleSignIn}></button>
    </div>
  );
};

export default SignIn;