export enum PROGRESS {
  INTRO,
  QUIZ,
  RESULTS,
}

export interface IQuestionSource {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string; 
  incorrect_answers: Array<string>;
}

export type TAnswerId = string;

export interface IAnswer {
  answerId: TAnswerId;
  answer: string;
}

export interface IQuestion {
  questionId: string;
  shuffledAnswerList: Array<IAnswer>;
}

export interface IApplicationState {
  sourceList: Array<IQuestionSource>;
  correctAnswerList: Array<TAnswerId>;
  solutionList: Array<TAnswerId>;
  shuffledQuestionList: Array<IQuestion>;
  answerIndex: number;
  progress: PROGRESS;
}