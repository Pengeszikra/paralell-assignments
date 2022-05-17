import { actionFactory, kebabToCamelCase } from "react-troll";
import { Action } from "../../../utils/react-troll-declaration";
import { convertSourceToState } from "../library/convertSourceToState";
import { IQuizState, PROGRESS } from "./quiz-declaration";

export const [quizActionsSet, action] = actionFactory(kebabToCamelCase);

export const
  SET_PROGRESS = action('set-progress'),
  READ_SOURCE = action('read-source'),
  PREPARE_QUIZ = action('prepare-quiz'),
  BEGIN_QUIZ = action('begin-quiz'),
  NEXT_QUIZ = action('next-quiz'),
  MARK_ANSWER = action('mark-answer'),
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

export type TQuziReducer = (state:IQuizState, action:Action ) => IQuizState;

export const quizReducer:TQuziReducer = (state:IQuizState, {type, payload}:Action) => {
  switch (type) {
    case SET_PROGRESS: return {...state, progress:payload};
    case READ_SOURCE: return {...state, sourceList:payload};
    case PREPARE_QUIZ: {
      if (!Array.isArray(payload)) return state;
      const idList:string[] = payload;
      return {...state, ...convertSourceToState(state.sourceList, idList)};
    }
    case BEGIN_QUIZ: return {...state, answerIndex: 0, progress:PROGRESS.QUIZ};
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
    case MARK_ANSWER: return {...state, solutionList: [...state.solutionList, payload]};
    case PLAY_AGAIN: return quizInitialState;
    default: return state;
  }
}