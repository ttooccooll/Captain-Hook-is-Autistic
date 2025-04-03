import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Result from '../components/Result';
import SignIn from '../components/SignIn';
import Payment from '../components/Payment';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const initialQuestions = [
  { text: "Captain Hook is autistic and the last samurai takes him on a road trip to Vegas?", answer: "Rainman" },
  { text: "Miss Piggy trains someone to kill Mufasa?", answer: "The Empire Strikes Back" },
  { text: "Moses dresses down the Terminator?", answer: "True Lies" },
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
  { text: "Maverick and Hercule Poirot conspire against the Nazis?", answer: "Valkyrie" },
  { text: "Darth Vader encourages Robin Hood's haunted construction project?", answer: "Field of Dreams" },
  { text: "Good Will Hunting hires Batman to race at Le Mans?", answer: "Ford v Ferrari" },
  { text: "Cameron Poe steels a baby?", answer: "Raising Arizona" },
  { text: "Sally has an epic blind date with Otto?", answer: "Sleepless in Seattle" },
  { text: "Romeo Montague takes many epic naps with Edward Snowden?", answer: "Inception" },
  { text: "Jay Gatsby and Abraham Lincoln lead opposing sides in a violent gang war?", answer: "Gangs of New York" },
  { text: "Miranda Priestly falls in love with Dirty Harry?", answer: "Bridges of Madison County" },
  { text: "Ripley dates Steve Zissou?", answer: "Ghostbusters" },
  { text: "Miracle Max meets, befriends and falls in love with Goose’s wife?", answer: "When Harry Met Sally" },
  { text: "the Fresh Prince, the Fly, Data, and Lone Starr defend Earth against an alien invasion?", answer: "Independence Day" },
  { text: "Agent K hunts down Han Solo?", answer: "The Fugitive" },
  { text: "Billie Jean King and Ken dance their way through LA?", answer: "La La Land" },
  { text: "Mary Poppins evades the Nazis with Dr. Parnassus?", answer: "The Sound of Music" },
  { text: "Catwoman stomped on Captain Kirk's foot in front of Mary Poppins and Gimli?", answer: "The Princess Diaries" },
  { text: "Emperor Shaddam IV throws his head at Tonto?", answer: "Sleepy Hollow" },
  { text: "The Hulk shepherds Paul Atreides into the Greenwich Village folk scene?", answer: "A Complete Unknown" },
  { text: "Pete Seeger becomes a domestic terrorist with Mr Smith?", answer: "Fight Club" },
  { text: "Denise Huxtable and Bowser both perform for Richard Nixon?", answer: "High Fidelity" },
  { text: "Othello mentors Ted Logan, preparing him for a confrontation with Elron?", answer: "The Matrix" },
  { text: "Hans Gruber is a suicidal sidekick of Bilbo Baggins?", answer: "The Hitchhiker's Guide to the Galaxy" },
  { text: "Count Dracula loses his title to Magneto?", answer: "The Two Towers" },
  { text: "Boss Baby accepts the defection of Henry Jones?", answer: "The Hunt for Red October" },
  { text: "Mulder exposes Buddy the Elf’s nefarious plot to brainwash Walter Mitty, turning him into an assassin?", answer: "Zoolander" },
  { text: "Beatrice narrates Mugatu’s life to his great confusion and frustration?", answer: "Stranger than Fiction" },
  { text: "Neo and his goons trick Macbeth and the dead poet to publicly jilt Selene at the altar even though Miss Pettigrew swears her cousin is innocent of the accusation? Good thing Batman is there to save the day.", answer: "Much Ado About Nothing" },
  { text: "Eliza Doolittle comes back from Paris all grown up and falls in love with Richard Blaine?", answer: "The Two Towers" },
  { text: "Mrs. Potts is totally unfazed by Smaug’s evil plan?", answer: "The Grinch" },
  { text: "Tyler Durden, Michael Scott, and Ken take a page out of Dick Chaney's book and make millions?", answer: "The Big Short" },
  { text: "Hermoine’s sister marries Bob Dylan?", answer: "Little Women" },
  { text: "Elliot Ness has a forbidden romance with the Fairy Godmother?", answer: "The Bodyguard" },
  { text: "Harry Potter’s music career is launched by Dwight Groot?", answer: "Weird" },
  { text: "Willy Wonka and Mrs. White break up over an office affair?", answer: "Young Frankenstein" },
  { text: "Teen Wolf helps Professor Plum evade Libyan terrorists?", answer: "Back to the Future" },
  { text: "Magnum PI, Sam, and Mahoney come together to care for an abandoned baby girl?", answer: "Three Men and a Baby" },
  { text: "Princess Poppy thwarts a con artist who is also guilty of killing two people?", answer: "A Simple Favor" },
  { text: "The Karate Kid is exonerated by Mr. Muenster after a stunning defense by a Wet Bandit?", answer: "My Cousin Vinny" },
  { text: "Alfie and Mary fall in love while, on the other side of the world, Barry and Rose also hit it off?", answer: "The Holiday" },
  { text: "President Bartlett is sent to assassinate The Godfather?", answer: "Apocalypse Now" },
  { text: "Maui and Mary Poppins explore the Amazon?", answer: "Jungle Cruise" },
  { text: "Michael Scott and the forty year old virgin have to thwart Eric Cartman before he destroys Hollywood?", answer: "Despicable Me 3" },
  { text: "Danny Tanner berates Ahchoo for not being adequately addicted?", answer: "Half Baked" },
  { text: "Qui-Gon Jinn will find you and kill you?", answer: "Taken" },
  { text: "Timon and the Genie have to put on a show for Lex Luthor and his wife?", answer: "The Birdcage" },
  { text: "Jules and Keyser Söze have a nice long chat?", answer: "The Negotiator" },
  { text: "Gertrude is Han Solo's Vice President?", answer: "Air Force One" },
  { text: "Dolores Claiborne captures Buddy the Elf’s dad?", answer: "Misery" },
  { text: "Mark Zuckerburg, Larry Flint, Mary Jane, and Cole Aaronson are The Four Horsemen?", answer: "Now You See Me" },
  { text: "Rapunzel has terminal cancer?", answer: "A Walk to Remember" },
  { text: "Kamala Harris and Richie Tenenbaum are cryogenically frozen?", answer: "Idiocracy" },
  { text: "Sarah Marshall, King George III, LeFou, and The Wicked Witch of the West play charades for family game night?", answer: "Frozen 2" },
  { text: "The King of Siam won’t let Ben Hur leave Egypt?", answer: "The Ten Commandements" },
  { text: "George Bailey executes a filibuster?", answer: "Mr. Smith Goes to Washington" },
  { text: "Benjamin Button and Ethan Hunt Visit the Desperado in the catacombs under Paris?", answer: "Interview with the Vampire" },
];

const Game = ({ onGameComplete, hasSignedIn, hasPaid, gameCount }) => {
    const [questions, setQuestions] = useState(shuffleArray([...initialQuestions]).slice(0, 10));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // Track if the answer was correct
    const [showFeedback, setShowFeedback] = useState(false); // Track if feedback should be shown
  
    useEffect(() => {
      console.log("Game component mounted");
      if (gameCount === 2 && !hasSignedIn) {
        setShowSignIn(true);
        console.log("Show SignIn");
      } else if (gameCount >= 3 && !hasPaid) {
        setShowPayment(true);
        console.log("Show Payment");
      } else {
        setShowSignIn(false);
        setShowPayment(false);
        resetGame();
      }
    }, [gameCount, hasSignedIn, hasPaid]);

    const resetGame = () => {
      // Reset game state
      setQuestions(shuffleArray([...initialQuestions]).slice(0, 10));
      setCurrentQuestion(0);
      setUserAnswers([]);
      setScore(0);
      setIsCorrect(null);
      setShowFeedback(false);
    };
  
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
      resetGame(); // Reset game state after sign-in
    };
    
    const handlePaymentSuccess = () => {
      setShowPayment(false);
      resetGame(); // Reset game state after payment
    };

    const playSound = () => {
      const audio = new Audio("/sounds/coinreturn.mp3");
      audio.play();
    };

    const navigate = useNavigate();

    const handleStatsClick = () => {
      playSound();
      navigate('/stats');
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
                  <div className="grading" style={{ marginTop: '2rem', color: isCorrect ? 'white' : 'red' }}>
                    {isCorrect ? 'Correct!' : `Wrong! The correct answer is ${questions[currentQuestion].answer}.`}
                  </div>
                )}
              </div>
            ) : (
              <Result score={score} totalQuestions={questions.length} />
            )}
          </>
        )}
        <div className="coinreturn" >
          <div className="slotf"></div>
          <button className="login" onClick={() => { setShowPayment(true); playSound(); }} >------<br />PAY<br />------</button>
          <div className="slot"></div>
          <button className="logout" onClick={handleStatsClick} >-------------<br />STATS<br />-------------</button>
        </div>
      </div>
    );
  };
  
  export default Game;