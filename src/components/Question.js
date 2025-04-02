import React, { useState } from 'react';

const Question = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
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
          placeholder="Type your answer here and hit the button when you think you have it."
        />
        <button style={{ marginTop: '2rem' }} type="submit"></button>
      </form>
    </div>
  );
};

export default Question;