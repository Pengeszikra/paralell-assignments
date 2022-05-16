import {useEffect, useState, FC} from 'react';
import { QuizeCard } from './QuizeCard';
import './style/quiz.scss';
import {Navbar, Container} from 'react-bootstrap';
import { Intro } from './Intro';
import { Results } from './Results';
import { PROGRESS } from './state/quiz-state';

const htmlDecode = (input:string):string => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export const increase:(n:number) => number = (n:number) => n + 1;

export const shuffle = (list = []) => [...list].sort(() => Math.random() - 0.5);

export const TriviaChallenge:FC = () => {

  const [content, loadContent] = useState([]);
  const [quizIndex, setQuizIndex] = useState<number>(0)
  const [progress, setProgress] = useState(PROGRESS.INTRO)

  useEffect(() => {
    if (progress !== PROGRESS.INTRO)
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    // fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
      .then(r => r.json())
      .then(p => {
        loadContent(p?.results);
        setQuizIndex(0);
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
          <Intro beginQuiz={() => setProgress(PROGRESS.QUIZ)}></Intro>
        )}

        {progress === PROGRESS.QUIZ && content.filter((_,i) => i === quizIndex).map(({category, question, correct_answer, incorrect_answers = []}, key) => (
          <QuizeCard key={key} category={category} question={htmlDecode(question)} answers={shuffle([correct_answer, ...incorrect_answers]).map(htmlDecode)} choiceAnswer={(answerKey) => () => {
            console.warn(answerKey);
            setQuizIndex(increase);
            if (quizIndex === 10 - 1) {
              setProgress(PROGRESS.RESULTS)
            }
          }}/>
        ))}
        
        {progress === PROGRESS.RESULTS && (
          <Results playAgain={() => setProgress(PROGRESS.INTRO)} />
        )}
        
        {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      </section>
    </main>
  );

}