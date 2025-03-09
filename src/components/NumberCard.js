import React from 'react';

const NumberCard = ({ number, onAnswerSubmit, userAnswer, setUserAnswer }) => {
  return (
    <div className="number-card">
      <h2>What is the Icelandic translation of this number?</h2>
      <p>{number}</p> {/* Display the number */}

      <form onSubmit={onAnswerSubmit}>
        <input 
          type="text" 
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)} 
          placeholder="Type the Icelandic translation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NumberCard;
