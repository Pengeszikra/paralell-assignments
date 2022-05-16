import { FC } from "react";
import { Card, Button } from "react-bootstrap";

export interface IIntro {
  beginQuiz: () => any;
}

export const Intro:FC<IIntro> = ({beginQuiz}) => (
  <Card style = {{width: '30rem'}}>
  <Card.Body>
    <Card.Title>Welcome to the Trivia Challenge</Card.Title>
    
    <Card.Text>You will be presented with 10 True or False questions</Card.Text>
    <Card.Text>Can you score 100%?</Card.Text>
    
    <Button onClick={beginQuiz}>Begin</Button>
  </Card.Body>
</Card>

);