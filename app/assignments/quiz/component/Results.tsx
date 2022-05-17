import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import { ActionArmy } from "../../../utils/react-troll-declaration";
import { IQuizState } from "../state/quiz-declaration";

export interface IResult {
  state: IQuizState,
  army: ActionArmy,
}

enum RESULT {
  SUCCESS = "btn btn-success btn-sm",
  FAIL = "btn btn-danger btn-sm"
}

export const Results:FC<IResult> = ({state, army}) => {
  const {shuffledQuestionList, correctAnswerList, solutionList} = state;
  const {playAgain} = army;

  const fineSolution:number = solutionList.reduce((correct, answerId) => correctAnswerList.includes(answerId) ? correct + 1 : correct, 0);

  const resultList = ({question, questionId, shuffledAnswerList}) => {
    const {answer, answerId} = shuffledAnswerList.find(({answerId}) => solutionList.includes(answerId));
    return ({ question, questionId, answer, isFine: correctAnswerList.includes(answerId) ? RESULT.SUCCESS : RESULT.FAIL});
  }

  return (
    <Card style = {{width: '30rem'}}>
      <Card.Body>
        <Card.Title className="grid-center">You scored : {fineSolution} / 10</Card.Title>
        {shuffledQuestionList
          .map(resultList)
          .map(({question, questionId, answer, isFine}) => (
            <p key={questionId}><Button className={isFine}>{answer}</Button> : {question}</p>
          ))}
        <section className="grid-center">
          <Button onClick={playAgain}>Play again?</Button>
        </section>
      </Card.Body>
    </Card>
  
  );
}