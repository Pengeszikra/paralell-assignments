import { actionFactory, kebabToCamelCase, useTroll } from "react-troll";
import { IAction, IQuizState, PROGRESS } from "./quiz-declaration";

export const [quizActionsSet, action] = actionFactory(kebabToCamelCase);

export const
  SET_PROGRESS = action('set-progress'),
  READ_SOURCE = action('read-source'),
  BEGIN_QUIZ = action('begin-quiz'),
  NEXT_QUIZ = action('next-quiz'),
  SELECT_ANSWER = action('select-answer'),
  PLAY_AGAIN = action('play-again')
;

export const quizInitialState:IQuizState = {
  sourceList: [],
  correctAnswerList: [],
  solutionList: [],
  shuffledQuestionList: [],
  answerIndex: 0,
  progress: PROGRESS.INTRO,
}

export type TQuziReducer = (state:IQuizState, action:IAction) => IQuizState;

export const quizReducer:TQuziReducer = (state:IQuizState, {type, payload}:IAction) => {
  switch (type) {
    case SET_PROGRESS: return {...state, progress:payload};
    case READ_SOURCE: return {...state, sourceList:payload};
    case BEGIN_QUIZ: return {...state, answerIndex: 0};
    case NEXT_QUIZ: {
      const answerIndex = state.answerIndex + 1;
      return {
        ...state, 
        answerIndex, 
        progress: answerIndex < state.sourceList.length  
          ? state.progress 
          : PROGRESS.RESULTS
      };
    }
    case SELECT_ANSWER: return {...state, _:payload};
    case PLAY_AGAIN: return {...state, _:payload};
    default: return state;
  }
}