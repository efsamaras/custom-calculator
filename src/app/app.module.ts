import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [CalculatorComponent, HomeComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [HomeComponent],
})
export class AppModule {}
