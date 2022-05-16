import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import { IApplicationState } from "./state/quiz-declaration";

export interface IResult extends IApplicationState {
  playAgain: () => any;
}

export const Results:FC<IResult> = ({playAgain}) => (
  <Card style = {{width: '30rem'}}>
  <Card.Body>
    <Card.Title>You scored</Card.Title>
    <Card.Title>3 / 10</Card.Title>
    
    
    <Button onClick={playAgain}>Play again?</Button>
  </Card.Body>
</Card>

);