import React, { useState, useEffect } from 'react';
import NumberCard from './components/NumberCard';

// Массив чисел и их переводы на исландский
const numbers = [
  { number: 1, icelandic: "einn" },
  { number: 2, icelandic: "tvö" },
  { number: 3, icelandic: "þrír" },
  { number: 4, icelandic: "fjögur" },
  { number: 5, icelandic: "fimm" },
  { number: 6, icelandic: "sex" },
  { number: 7, icelandic: "sjö" },
  { number: 8, icelandic: "átta" },
  { number: 9, icelandic: "níu" },
  { number: 10, icelandic: "tíu" },
  // Добавьте больше чисел, если нужно
];

const App = () => {
  const [remainingNumbers, setRemainingNumbers] = useState(numbers); // Массив оставшихся чисел
  const [currentNumber, setCurrentNumber] = useState(null); // Текущее число
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [learnedNumbers, setLearnedNumbers] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // Статус правильности ответа

  // Массив специальных символов
  const specialLetters = ['ð', 'þ', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'æ', 'ö'];

  // Функция для перемешивания массива
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Меняем местами элементы
    }
    return shuffled;
  };

  // Функция для выбора случайного числа
  const getRandomNumber = () => {
    return remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
  };

  // Функция для обработки правильного ответа
  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    // Проверяем, правильный ли ответ
    if (userAnswer.toLowerCase() === currentNumber.icelandic) {
      setIsAnswerCorrect(true); // Ответ правильный
      const newCorrectAnswers = { ...correctAnswers };

      // Увеличиваем счетчик правильных ответов для этого числа
      newCorrectAnswers[currentNumber.number] = (newCorrectAnswers[currentNumber.number] || 0) + 1;
      setCorrectAnswers(newCorrectAnswers);

      // Если число было правильно ответлено 5 раз, считаем его выученным
      if (newCorrectAnswers[currentNumber.number] === 5) {
        setLearnedNumbers((prev) => [...prev, currentNumber.number]);
        alert(`Вы выучили число: ${currentNumber.number}`);

        // Убираем это число из оставшихся
        setRemainingNumbers((prev) => prev.filter((num) => num.number !== currentNumber.number));
      }

      // Обновляем состояние для нового числа
      setUserAnswer('');
      setIsAnswerCorrect(false);
      setCurrentNumber(getRandomNumber()); // Получаем новое случайное число
    } else {
      setIsAnswerCorrect(false); // Ответ неправильный
      setUserAnswer(''); // Очищаем поле ввода
    }
  };

  // Когда компонент загружается, выбираем случайное число для начала
  useEffect(() => {
    if (remainingNumbers.length > 0) {
      setCurrentNumber(getRandomNumber()); // Выбираем случайное число
    }
  }, [remainingNumbers]);

  // Функция для добавления буквы в ответ
  const handleLetterClick = (letter) => {
    setUserAnswer((prevAnswer) => prevAnswer + letter);
  };

  // Отображаем прогресс (точки) для каждого числа
  const renderProgress = (number) => {
    const correctCount = correctAnswers[number] || 0;
    const dots = Array.from({ length: correctCount }, (_, index) => (
      <span key={index} style={{ fontSize: '20px', marginRight: '5px' }}>•</span>
    ));
    return dots;
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Left column for number card */}
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h1>Учим исландские числа</h1>
        <h2>Выученные числа: {learnedNumbers.length} / {numbers.length}</h2>

        {/* Отображаем текущее число */}
        {currentNumber && (
          <NumberCard
            number={currentNumber.number}
            onAnswerSubmit={handleAnswerSubmit}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />
        )}

        {/* Добавляем кнопки для специальных букв */}
        <div style={{ marginTop: '20px' }}>
          {specialLetters.map((letter) => (
            <button
              key={letter}
              style={{
                padding: '10px',
                margin: '5px',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Отображаем сообщение "Правильно!" под кнопкой, если ответ правильный */}
        {isAnswerCorrect && <p>Правильно!</p>}
      </div>

      {/* Right column for progress */}
      <div style={{ flex: 1 }}>
        <h3>Прогресс:</h3>
        <div>
          {numbers.map((num) => (
            <div key={num.number} style={{ marginBottom: '10px' }}>
              <span>{num.number}</span>
              <div>{renderProgress(num.number)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
