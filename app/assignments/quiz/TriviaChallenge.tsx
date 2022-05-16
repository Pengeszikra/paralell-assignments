import React, {useEffect, FC} from 'react';
import { QuizeCard } from './QuizeCard';
import './style/quiz.scss';
import {Navbar, Container} from 'react-bootstrap';
import { Intro } from './Intro';
import { Results } from './Results';
import { IQuizState, PROGRESS } from './state/quiz-declaration';
import { shuffle } from './library/shuffle';
import { htmlDecode } from './library/htmlDecode';
import { useQuizReducer } from './useQuizReducer';
import { Troll } from '../../utils/react-troll-declaration';
import { QuizCard } from './QuizCard';

export const TriviaChallenge:FC = () => {

  const [state, army]:Troll<IQuizState> = useQuizReducer();
  const {progress, shuffledQuestionList, answerIndex} = state;
  const {playAgain, beginQuiz, readSource, nextQuiz} = army;  

  useEffect(() => {
    if (progress !== PROGRESS.INTRO)
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    // fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
      .then(r => r.json())
      .then(p => {
        readSource(p?.results);
        beginQuiz();
        console.warn(p.results);
      })
  }, [progress]);
  
  return (
    <main>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Trivia Challenge</Navbar.Brand>
        </Container>
      </Navbar>
      <section className="quiz-body">        
        {progress === PROGRESS.INTRO && (
          <Intro beginQuiz={beginQuiz}></Intro>
        )}

        {progress === PROGRESS.QUIZ && shuffledQuestionList?.[answerIndex] && (
          <QuizCard army={army} randomQuestion={shuffledQuestionList?.[answerIndex]} />
        )}

        {/* {progress === PROGRESS.QUIZ && sourceList.filter((_,i) => i === answerIndex).map(({category, question, correct_answer, incorrect_answers = []}, key) => (
          <QuizeCard key={key} category={category} question={htmlDecode(question)} answers={shuffle([correct_answer, ...incorrect_answers]).map(htmlDecode)} choiceAnswer={(answerKey) => () => {
            nextQuiz();
          }}/>
        ))} */}
        
        {progress === PROGRESS.RESULTS && (
          <Results playAgain={playAgain} />
        )}
      </section>
    </main>
  );

}