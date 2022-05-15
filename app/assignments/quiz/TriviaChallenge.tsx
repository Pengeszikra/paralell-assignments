import {useEffect, useState, FC} from 'react';
import { QuizeCard } from './QuizeCard';

const htmlDecode = (input:string):string => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

const shuffle = (list = []) => [...list].sort(() => Math.random() - 0.5);

export const TriviaChallenge:FC = () => {

  const [content, loadContent] = useState([]);
  const [quizIndex, setQuizIndex] = useState<number>(0)
  const [quizProcess, mutateQuiz] = useState<Array>([])

  useEffect(() => {
    //fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
      .then(r => r.json())
      .then(p => {
        loadContent(p?.results);
        setQuizIndex(0);
      })
  }, []);
  
  return (
    <pre style={{textAlign:'center'}}>
      <h1>Trivia Challenge</h1>
      {content.filter((_,i) => i === quizIndex).map(({category, question, correct_answer, incorrect_answers = []}, key) => (
        <QuizeCard key={key} category={category} question={htmlDecode(question)} answers={shuffle([correct_answer, ...incorrect_answers])}/>
      ))}
      {/* {JSON.stringify(content, null, 2)} */}
    </pre>
  );

}
