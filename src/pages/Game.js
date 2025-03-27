import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Result from '../components/Result';
import SignIn from '../components/SignIn';
import Payment from '../components/Payment';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const initialQuestions = [
  { text: "Captain Hook is autistic and the last samurai takes him to Las Vegas?", answer: "Rainman" },
  { text: "Miss Piggy’s trains someone to kill Mufasa?", answer: "The Empire Strikes Back" },
  { text: "Spartacus berates the Terminator?", answer: "True Lies" },
  { text: "Mauricio Gucci kills Indiana Jones?", answer: "The Last Jedi" },
  { text: "Forest Gump is lost in space with Harry Truman?", answer: "Apollo 13" },
  { text: "Samantha snubs Snake Plisskin?", answer: "Big Trouble in Little China" },
  { text: "Morgan Earp competes with the Dread Pirate Roberts to chase storms?", answer: "Twister" },
  { text: "Iceman goes sledding with the Leprechaun?", answer: "Willow" },
  { text: "the Joker sees dead people?", answer: "The Shining" },
  { text: "Batman haunts Kevin’s mom?", answer: "Beetlejuice" },
  { text: "Winifred Sanderson, Judy Benjamin, and Annie Hall seek retribution against their exes?", answer: "The First Wives Club" },
  { text: "Danny Zuko learns about burgers from Mace Windu?", answer: "Pulp Fiction" },
  { text: "Jackson Pollock orchestrates the Mask’s life for the entertainment of all?", answer: "The Truman Show" },
  { text: "the Godfather tempts Neo to join his law firm in NYC?", answer: "The Devil's Advocate" },
  { text: "Dr. Dolittle and Dr. Evil save a princess?", answer: "Shrek" },
  { text: "the six-fingered man has an eleven-notched nob?", answer: "This is Spinal Tap" },
];

const Game = ({ onGameComplete, hasSignedIn, hasPaid, gameCount }) => {
    const [questions] = useState(shuffleArray([...initialQuestions]).slice(0, 10));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // Track if the answer was correct
    const [showFeedback, setShowFeedback] = useState(false); // Track if feedback should be shown
  
    useEffect(() => {
      if (gameCount === 2 && !hasSignedIn) {
        setShowSignIn(true);
      } else if (gameCount === 3 && !hasPaid) {
        setShowPayment(true);
      }
    }, [gameCount, hasSignedIn, hasPaid]);
  
    const handleAnswer = (answer) => {
        setUserAnswers([...userAnswers, answer]);
        const isCorrectAnswer = answer.toLowerCase().trim() === questions[currentQuestion].answer.toLowerCase().trim();
        setIsCorrect(isCorrectAnswer);
        setShowFeedback(true);
  
      if (isCorrectAnswer) {
        setScore(prevScore => prevScore + 1);
      }
  
      // Move to the next question after a short delay
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
            setScore(prevScore => {
                console.log("Final Score:", prevScore);
                onGameComplete(prevScore);
                return prevScore;
            });
        }
      }, 1500);
    };
  
    const handleSignInSuccess = () => {
      setShowSignIn(false);
    };
  
    const handlePaymentSuccess = () => {
      setShowPayment(false);
    };
  
    return (
      <div>
        {showSignIn && <SignIn onSignIn={handleSignInSuccess} />}
        {showPayment && <Payment onPaymentSuccess={handlePaymentSuccess} />}
        {!showSignIn && !showPayment && (
          <>
            {currentQuestion < questions.length ? (
              <div>
                <Question question={questions[currentQuestion].text} onAnswer={handleAnswer} />
                {showFeedback && (
                  <div style={{ margin: '10px', color: isCorrect ? 'green' : 'red' }}>
                    {isCorrect ? 'Correct!' : `Wrong! The correct answer is ${questions[currentQuestion].answer}.`}
                  </div>
                )}
              </div>
            ) : (
              <Result score={score} totalQuestions={questions.length} />
            )}
          </>
        )}
      </div>
    );
  };
  
  export default Game;