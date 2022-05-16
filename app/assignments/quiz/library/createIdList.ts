import {IQuestionSource} from '../state/quiz-declaration';

export type TCreateIdList = (idCreator:()=>string) => (source:IQuestionSource[]) => string[];

export const createIdList: TCreateIdList
  = (idCreator:()=>string) => (source:IQuestionSource[]) => 
    Array(source.length)
      .fill('')
      .map(() => idCreator())
  ;