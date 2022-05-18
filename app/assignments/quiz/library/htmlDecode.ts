import {decode} from 'html-entities';

export const htmlDecode = (input:string):string => decode(input);
