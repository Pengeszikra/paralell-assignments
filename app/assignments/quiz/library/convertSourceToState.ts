import { IQuestionSource, IQuizState } from "../state/quiz-declaration";

export type IConvertSourceToState = (source:IQuestionSource[]) => Partial<IQuizState>;

export const convertSourceToState:IConvertSourceToState
  = (source:IQuestionSource[]) => ({
      sourceList: source,
    })
  ;
