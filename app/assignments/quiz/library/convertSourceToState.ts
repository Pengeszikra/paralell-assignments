import { IAnswer, IQuestion, IQuestionSource, IQuizState, TAnswerId } from "../state/quiz-declaration";
import { htmlDecode } from "./htmlDecode";
import { shuffle } from "./shuffle";

export type TConvertSourceToState = (source:IQuestionSource[], idList:string[]) => Partial<IQuizState>;
export type TMakeAnswer = (answerId:string, rawAnswer:string) => IAnswer;

export const answerListShuffle:(IQuestion) => IQuestion 
  = ({shuffledAnswerList, ...rest}) => ({shuffledAnswerList: shuffle(shuffledAnswerList), ...rest});

export const convertSourceToState:TConvertSourceToState = (source = [], idList) => {

  const makeAnswer:TMakeAnswer = (answerId, rawAnswer) => ({
    answerId,
    answer: htmlDecode(rawAnswer)
  });

  const questionList:IQuestion[] =
    source
      .map(({category, question, correct_answer, incorrect_answers}) => 
        ({
          questionId: idList.pop(),
          category: htmlDecode(category),
          question: htmlDecode(question),
          shuffledAnswerList: [
              makeAnswer(idList.pop(), correct_answer),
              ...incorrect_answers.map((answer:string) => makeAnswer(idList.pop(), answer))
            ]
        }))
    ;

    const correctAnswerList:TAnswerId[] = questionList
      .map(
        ({shuffledAnswerList}) => shuffledAnswerList?.[0]?.answerId
      )
    ;

  return ({
    sourceList: source,
    correctAnswerList,
    shuffledQuestionList: shuffle(questionList.map(answerListShuffle))
  });
}
;
