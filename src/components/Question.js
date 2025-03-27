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
      <h2>{`What's that movie where ${question}`}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Question;