import { Component, EventEmitter, Output } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { EvaluationService } from '../../services/evaluation.service';
import { validSignedNumberRegex } from '../../helpers/regex.helper';
import { RandomService } from '../../services/random.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
    @Output() expressionCalculated = new EventEmitter<{ expression: string; result: string }>();

    public expression: string = '';
    public errorMessage: string = '';
    public result: string = '';
    public buttons = [
        'sin',
        'cos',
        'tan',
        '/',
        '7',
        '8',
        '9',
        '*',
        '4',
        '5',
        '6',
        '-',
        '1',
        '2',
        '3',
        '+',
        'RAND',
        '0',
        '.',
        'C',
    ];

    constructor(
        private evaluationService: EvaluationService,
        private validationService: ValidationService,
        private randomService: RandomService
    ) {}

    onInputChanged(event: Event) {
        this.expression = (event.target as HTMLInputElement).value.replace(/\s/g, '');
        this.calculate();
    }

    onButtonClicked(button: string) {
        switch (button) {
            case 'C':
                this.expression = '';
                break;
            case 'RAND':
                this.randomService.generateRandomNumber().then((randomNumber) => {
                    this.updateInputElement(randomNumber);
                    this.calculate();
                });
                break;
            case 'sin':
            case 'cos':
            case 'tan':
                this.insertTrigonometricFunction(button);
                break;
            default:
                this.updateInputElement(button);
        }
        if (button !== 'RAND') {
            this.calculate();
        }
    }

    private calculate() {
        this.errorMessage = '';
        this.result = '';
        if (this.expression === '') {
            return;
        }

        if (this.validationService.isValid(this.expression)) {
            try {
                const result = this.evaluationService.evaluate(this.expression);
                this.result = `Result: ${result}`;
                this.expressionCalculated.emit({ expression: this.expression, result });
            } catch (err) {
                this.errorMessage = err as string;
            }
        } else {
            this.errorMessage = 'Error: Invalid expression';
        }
    }

    private updateInputElement(value: string) {
        this.expression += value;
    }

    private insertTrigonometricFunction(functionName: string) {
        const inputNumbers = this.expression.match(validSignedNumberRegex) || [];
        if (inputNumbers?.length > 0) {
            const lastNumber = inputNumbers[inputNumbers.length - 1];
            if (this.expression.endsWith(lastNumber)) {
                this.expression =
                    this.expression.slice(0, this.expression.length - lastNumber.length) +
                    functionName +
                    '(' +
                    lastNumber +
                    ')';
            }
        }
    }
}
