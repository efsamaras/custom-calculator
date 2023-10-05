import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
    @Input() historyList: { expression: string; result: string }[] = [];
}
