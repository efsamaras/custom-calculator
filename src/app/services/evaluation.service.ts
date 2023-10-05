import { Injectable } from '@angular/core';
import { isNumber } from '../helpers/character-type.helper';
import {
    addSubtractOperationRegex,
    multiplyDivideOperationRegex,
    redundantParenthesesRegex,
    signedNumberWithParenthesesRegex,
    trigonometricOperationRegex,
    validNumberRegex,
    validSignedNumberRegex,
} from '../helpers/regex.helper';

@Injectable({
    providedIn: 'root',
})
export class EvaluationService {
    public evaluate(expression: string): string {
        let parsedExpression = this.evaluateTrigonometricOperations(expression);
        parsedExpression = this.evaluateMathematicalOperations(parsedExpression, true); // Evaluate * and /
        parsedExpression = this.evaluateMathematicalOperations(parsedExpression, false); // Evaluate + and -
        parsedExpression = this.removeRedundantParentheses(parsedExpression);

        if (!isNumber(parsedExpression)) {
            if (parsedExpression === expression) {
                throw new Error('Cannot evaluate expression');
            }
            return this.evaluate(parsedExpression);
        }

        return parsedExpression;
    }

    public evaluateTrigonometricOperations(expression: string): string {
        const trigonometricExpressions = expression.match(trigonometricOperationRegex) || [];
        if (trigonometricExpressions?.length > 0) {
            const result = this.evaluateTrigonometricFunction(trigonometricExpressions[0] as string);
            expression = expression.replace(trigonometricExpressions[0] as string, String(result));
            return this.evaluateTrigonometricOperations(expression);
        }
        return expression;
    }

    public evaluateTrigonometricFunction(expression: string) {
        const methodName = expression.replace(signedNumberWithParenthesesRegex, '');
        const argument = parseFloat(expression.match(validSignedNumberRegex)?.[0] as string);
        if (isNaN(argument)) {
            throw new Error('Invalid argument in trigonometric function');
        }
        switch (methodName) {
            case 'sin':
                return Math.sin(argument);
            case 'cos':
                return Math.cos(argument);
            case 'tan':
                return Math.tan(argument);
            default:
                throw new Error('Invalid trigonometric function');
        }
    }

    public evaluateMathematicalOperations(expression: string, prioritizedOperators: boolean): string {
        const regex = prioritizedOperators ? multiplyDivideOperationRegex : addSubtractOperationRegex;
        const operations = expression.match(regex) || [];
        if (operations?.length > 0) {
            const result = this.evaluateOperation(operations[0] as string);
            expression = expression.replace(operations[0] as string, String(result));
            return this.evaluateMathematicalOperations(expression, prioritizedOperators);
        }
        return expression;
    }

    public evaluateOperation(expression: string) {
        let operator = expression.replace(validNumberRegex, '');
        if (operator.length > 1) {
            // If there are signed numbers
            operator = operator.replace(/-/g, '');
            if (operator.length === 0) {
                operator = '-';
            }
        }
        const numbers = expression.match(validSignedNumberRegex)?.map((number) => parseFloat(number)) || [];
        if (numbers[1] < 0 && operator === '-') {
            // Capture the case of subtraction when the second number is positive (e.g. -1-1)
            if (numbers[0] + operator + numbers[1] !== expression) {
                numbers[1] *= -1;
            }
        }
        switch (operator) {
            case '+':
                return numbers[0] + numbers[1];
            case '-':
                return numbers[0] - numbers[1];
            case '*':
                return numbers[0] * numbers[1];
            case '/':
                if (numbers[1] === 0) {
                    throw new Error('Division by zero');
                }
                return numbers[0] / numbers[1];
            default:
                throw new Error('Invalid operator');
        }
    }

    public removeRedundantParentheses(expression: string): string {
        const numbersWithParentheses = expression.match(redundantParenthesesRegex) || [];
        if (numbersWithParentheses?.length > 0) {
            const result = this.trimParentheses(numbersWithParentheses[0] as string);
            expression = expression.replace(numbersWithParentheses[0] as string, result);
            return this.removeRedundantParentheses(expression);
        }
        return expression;
    }

    public trimParentheses(expression: string) {
        return expression.substring(1, expression.length - 1);
    }
}
