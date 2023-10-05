import { validOperators } from './regex.helper';

export const isNumber = (character: string) => !isNaN(Number(character));
export const isOperator = (character: string) => validOperators.includes(character);
export const isLetter = (character: string) => /^[a-z]$/.test(character);
