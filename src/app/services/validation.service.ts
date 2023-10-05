import { Injectable } from '@angular/core';
import { validExpressionRegex, validStartOperators } from '../helpers/regex.helper';
import { isLetter, isNumber, isOperator } from '../helpers/character-type.helper';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    public isValid(expression: string) {
        if (!validExpressionRegex.test(expression)) {
            return false;
        }

        let parentheses = 0;
        for (let i = 0; i < expression.length; i++) {
            const currentCharacter = expression[i];
            const previousCharacter = expression[i - 1];
            const nextCharacter = expression[i + 1];

            if (currentCharacter === '(') {
                parentheses++;
                if (nextCharacter === ')') {
                    return false; // Parentheses without content
                }
            } else if (currentCharacter === ')') {
                parentheses--;
                if (parentheses < 0) {
                    return false; // Unmatched closing parenthesis
                }
            } else if (isOperator(currentCharacter)) {
                if (
                    (!previousCharacter || previousCharacter === '(') &&
                    !validStartOperators.includes(currentCharacter)
                ) {
                    return false; // Operator not allowed at the beginning
                }

                if (isOperator(previousCharacter) || isOperator(nextCharacter)) {
                    return false; // Operator before of after another operator
                }

                if (!nextCharacter || nextCharacter === ')') {
                    return false; // Operator at the end
                }
            } else if (isNumber(currentCharacter)) {
                if (previousCharacter === ')') {
                    return false; // Number after closing parenthesis
                }
                if (isLetter(nextCharacter)) {
                    return false; // Number before trigonometric method
                }
            }
        }

        return parentheses === 0; // Return true if there are no unmatched opening parenthesis
    }
}
