import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public historyList: { expression: string; result: string }[] = [];

    public onCalculation(calculation: { expression: string; result: string }) {
        this.historyList.push(calculation);
        if (this.historyList.length > 5) {
            this.historyList.shift();
        }
    }
}
