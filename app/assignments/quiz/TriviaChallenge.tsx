import React, {useEffect, FC} from 'react';
import './style/quiz.scss';
import {Navbar, Container} from 'react-bootstrap';
import { Intro } from './component/Intro';
import { Results } from './component/Results';
import { QuizCard } from './component/QuizCard';
import { IQuizState, PROGRESS } from './state/quiz-declaration';
import { useQuizReducer } from './state/useQuizReducer';
import { Troll } from '../../utils/react-troll-declaration';
import { createIdList } from './library/createIdList';
import { uuid } from './library/uuid';

export const TriviaChallenge:FC = () => {

  const [state, army]:Troll<IQuizState> = useQuizReducer();
  const {progress, shuffledQuestionList, answerIndex} = state;
  const {playAgain, beginQuiz, readSource, prepareQuiz} = army;

  useEffect(() => {
    if (progress !== PROGRESS.INTRO) return null;
    const uuidFactory = createIdList(uuid);
    // fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`)
    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
      .then(r => r.json())
      .then(p => {
        const {results} = p
        readSource(results);
        prepareQuiz(uuidFactory(results));
      })
  }, [progress]);

  // useEffect(()=>console.log(state),[state]);
  
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
          <QuizCard army={army} answerIndex={answerIndex} randomQuestion={shuffledQuestionList?.[answerIndex]} />
        )}

        {progress === PROGRESS.RESULTS && (
          <Results state={state} army={army} />
        )}
      </section>
    </main>
  );

}