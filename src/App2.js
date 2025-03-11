import React, { useState, useEffect, useRef } from 'react';
import './App.css';  // Importing the stylesheet

const numbers = [
  { "number": 1, "icelandic": "einn" },
  { "number": 2, "icelandic": "tveir" },
  { "number": 3, "icelandic": "þrír" },
  { "number": 4, "icelandic": "fjögur" },
  { "number": 5, "icelandic": "fimm" },
  { "number": 6, "icelandic": "sex" },
  { "number": 7, "icelandic": "sjö" },
  { "number": 8, "icelandic": "átta" },
  { "number": 9, "icelandic": "níu" },
  { "number": 10, "icelandic": "tíu" },
  { "number": 11, "icelandic": "ellefu" },
  { "number": 12, "icelandic": "tólf" },
  { "number": 13, "icelandic": "þrettán" },
  { "number": 14, "icelandic": "fjórtán" },
  { "number": 15, "icelandic": "fimmtán" },
  { "number": 16, "icelandic": "sextán" },
  { "number": 17, "icelandic": "sautján" },
  { "number": 18, "icelandic": "átján" },
  { "number": 19, "icelandic": "nítján" },
  { "number": 20, "icelandic": "tuttugu" },
  { "number": 30, "icelandic": "þrjátíu" },
  { "number": 40, "icelandic": "fjörutíu" },
  { "number": 50, "icelandic": "fimmtíu" },
  { "number": 60, "icelandic": "sextíu" },
  { "number": 70, "icelandic": "sjötíu" },
  { "number": 80, "icelandic": "áttatíu" },
  { "number": 90, "icelandic": "níutíu" },
  { "number": 100, "icelandic": "hundrað" },
  { "number": 1000, "icelandic": "þúsund" },
  { "number": 1000000, "icelandic": "milljón" }
]


const icelandicCharacters = ["ð", "þ", "á", "í", "é", "ó", "ú", "ý", "æ", "ö"];


const App = () => {
  const inputRef = useRef(null); 
  const loadState = () => {
    const savedCorrectAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || {};
    const savedLearnedNumbers = JSON.parse(localStorage.getItem('learnedNumbers')) || [];
    const savedRemainingNumbers = JSON.parse(localStorage.getItem('remainingNumbers')) || numbers;

    return {
      correctAnswers: savedCorrectAnswers,
      learnedNumbers: savedLearnedNumbers,
      remainingNumbers: savedRemainingNumbers,
    };
  }

  const [remainingNumbers, setRemainingNumbers] = useState(loadState().remainingNumbers);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(loadState().correctAnswers);
  const [learnedNumbers, setLearnedNumbers] = useState(loadState().learnedNumbers);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
    useEffect(() => {
      // Save state to localStorage whenever relevant state changes
      const getRandomNumber2 = () => {
        return remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];}
     if (remainingNumbers.length > 0) 
        setCurrentNumber(getRandomNumber2);
      localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
      localStorage.setItem('learnedNumbers', JSON.stringify(learnedNumbers));
      localStorage.setItem('remainingNumbers', JSON.stringify(remainingNumbers));
    }, [correctAnswers, learnedNumbers, remainingNumbers]);
     // First number to show



  const resetProgress = () => {
    setCorrectAnswers({});
    setLearnedNumbers([]);
    setRemainingNumbers(numbers);
    localStorage.removeItem('correctAnswers');
    localStorage.removeItem('learnedNumbers');
    localStorage.removeItem('remainingNumbers');
  };

  const getRandomNumber = () => {
    return remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.toLowerCase() === currentNumber.icelandic) {
      setIsAnswerCorrect(true);
      const newCorrectAnswers = { ...correctAnswers };
      newCorrectAnswers[currentNumber.number] = (newCorrectAnswers[currentNumber.number] || 0) + 1;
      setCorrectAnswers(newCorrectAnswers);
  
      if (newCorrectAnswers[currentNumber.number] === 5) {
        setLearnedNumbers((prev) => [...prev, currentNumber.number]);
        alert(`You have learned number: ${currentNumber.number}`);
        setRemainingNumbers(remainingNumbers.filter((num) => num.number !== currentNumber.number));
      }
  
      setUserAnswer('');
      setIsAnswerCorrect(true);
      const nextNumber = getRandomNumber(); 
      setCurrentNumber(nextNumber);
      setErrorMessage('');
    } else {
      setIsAnswerCorrect(false);
      setUserAnswer('');
      const nextNumber = getRandomNumber();
     setCurrentNumber(nextNumber);
      setErrorMessage(`Incorrect! Correct answer is "${currentNumber.icelandic}"`);
    }
  };

  const speakIcelandicNumber = (text) => {
    const audio = new Audio(process.env.PUBLIC_URL + `/mp3/${text}.mp3`);
audio.play();
  };

  const handleCharacterButtonClick   = (char, e) => {
    e.preventDefault(); 
    setUserAnswer(userAnswer + char);
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <div className="number-card">
        <h2>Learn Icelandic Numbers</h2>
        <h3>Learned Numbers: {learnedNumbers.length} / {numbers.length}</h3>

        {currentNumber && (
          <>
          {isAnswerCorrect && <p className="correct-message">Correct!</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
       
          <h4 className="number-container">
            {isAnswerCorrect || errorMessage ? (
          <text className="next-number-text">Next number is: </text>
        ) : null}
              {currentNumber.number}
              <button 
                onClick={() => speakIcelandicNumber(currentNumber.number)} 
                className="audio-button"
              >
                Play Audio
              </button>
              </h4>
             
            <form onSubmit={handleAnswerSubmit}>
            <div className="input-button-wrapper">
              <input
                type="text"
                ref={inputRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the Icelandic number"
              />
              <button type="submit">Submit</button>
              </div>
            </form>

            {/* Icelandic Character Buttons */}
            <div className="icelandic-characters">
  {icelandicCharacters.map((char, index) => (
    <button
      key={index}
      onClick={(e) => handleCharacterButtonClick(char, e)}
      className="icelandic-btn"
    >
      {char}
    </button>
  ))}
</div>
          </>
        )}
      </div>

      
      <div className="progress-container">
  

  <h3>Progress:</h3>
  <div className="progress-column">
    {numbers.map((num) => (
      <div key={num.number} className="progress-item">
        <span>{num.number}</span>
        <div className="dots">
          {Array.from({ length: correctAnswers[num.number] || 0 }, (_, idx) => (
            <span key={idx}>•</span>
          ))}
        </div>
        {correctAnswers[num.number] >= 5 && (
          <input
            type="checkbox"
            checked={learnedNumbers.includes(num.number)}
            readOnly
            className="learned-checkbox"
          />
        )}
      </div>
    ))}
  </div>
  <div className="reset-button-container">
  <button onClick={resetProgress}>Reset Progress</button>
  </div>
</div>

    </div>
  );
};

export default App;