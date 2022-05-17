import { FC } from "react";
import {Stack, Card, Button} from 'react-bootstrap';
import { ActionArmy } from "../../utils/react-troll-declaration";
import { IQuestion } from "./state/quiz-declaration";

export interface IQuizCardProps {
  randomQuestion: IQuestion;
  army: ActionArmy;
  answerIndex: number;
}

export const QuizCard:FC<IQuizCardProps> = ({randomQuestion, answerIndex, army}:IQuizCardProps) => {

  const {shuffledAnswerList, question, category} = randomQuestion;
  const {markAnswer, nextQuiz} = army;

  const handleMarkAnswer = (answerId:string) => () => {
    markAnswer(answerId);
    nextQuiz();
  }

  return (
    <Card style = {{width: '30rem'}}>
      <Card.Body>
        <Card.Subtitle className="text-muted">{category}</Card.Subtitle>
        <Card.Text>{question}</Card.Text>
        <Stack gap={1}>
          {(shuffledAnswerList ?? []).map(({answer, answerId}) => 
            <Button key={answerId} onClick={handleMarkAnswer(answerId)}>{answer}</Button>
          )}
        </Stack>
        <p className="grid-center">{answerIndex + 1} of {shuffledAnswerList.length + 1}</p>
      </Card.Body>
    </Card>
  )
}