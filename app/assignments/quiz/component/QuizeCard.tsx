import { FC } from "react";
import {Stack, Card, Button} from 'react-bootstrap';

export const QuizeCard:FC = ({category, question, answers = [], choiceAnswer}) => {
  return (
    <Card style = {{width: '30rem'}}>
      <Card.Body>
        <Card.Subtitle className="text-muted">{category}</Card.Subtitle>
        <Card.Text>{question}</Card.Text>
        <Stack gap={1}>
          {answers.map((answer, key) => 
            <Button className="btn btn-primary" key={key} onClick={choiceAnswer(key)}>{answer}</Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}