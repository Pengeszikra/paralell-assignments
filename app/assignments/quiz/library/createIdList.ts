import {IQuestionSource} from '../state/quiz-declaration';

export type TCreateIdList = (idCreator:()=>string) => (source:IQuestionSource[]) => string[];

export const createIdList: TCreateIdList = idCreator => source => 
  Array(source.length * 5)
    .fill('')
    .map(() => idCreator())
;