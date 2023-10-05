import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [CalculatorComponent, HomeComponent, HistoryComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [],
    bootstrap: [HomeComponent],
})
export class AppModule {}
