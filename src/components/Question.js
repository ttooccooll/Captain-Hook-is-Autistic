import React, { useState } from 'react';

const Question = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const playMP3 = () => {
    const audio = new Audio("/sounds/kingm.mp3");
    audio.play();
  };

  const handleSubmit = (e) => {
    playMP3();
    e.preventDefault();
    onAnswer(answer);
    setAnswer(''); // Clear the input after submission
  };

  return (
    <div>
      <h1 className='questions' >{`What's that movie where ${question}`}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="type here and hit button..."
        />
        <button style={{ marginTop: '2rem' }} type="submit"></button>
      </form>
    </div>
  );
};

export default Question;