import { useTroll } from 'react-troll';
import { quizActionsSet, quizInitialState, quizReducer } from './quiz-control';
import { IQuizState } from './quiz-declaration';
import { TrollFactory } from '../../../utils/react-troll-declaration';

export const useQuizReducer:TrollFactory<IQuizState> = () => useTroll(quizReducer, quizInitialState, quizActionsSet);