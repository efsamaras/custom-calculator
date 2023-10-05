// Validation
export const validExpressionRegex = /^(\d(\.\d)?|[()+\-*\/]|sin\(|cos\(|tan\()+$/;
export const validOperators = ['+', '-', '*', '/'];
export const validStartOperators = ['+', '-'];

// Evaluation
export const validNumberRegex = /\d+(\.\d+)?/g;
export const validSignedNumberRegex = /-?\d+(\.\d+)?/g;
export const trigonometricOperationRegex = /sin\(-?\d+(\.\d+)?\)|cos\(-?\d+(\.\d+)?\)|tan\(-?\d+(\.\d+)?\)/g;
export const addSubtractOperationRegex = /-?\d+(\.\d+)?[+\-]-?\d+(\.\d+)?/g;
export const multiplyDivideOperationRegex = /-?\d+(\.\d+)?[*\/]-?\d+(\.\d+)?/g;
export const signedNumberWithParenthesesRegex = /\(-?\d+(\.\d+)?\)/g;
export const redundantParenthesesRegex = /(?<!sin|cos|tan)\(-?\d+(\.\d+)?\)/g;
