import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { HistoryComponent } from '../history/history.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CalculatorComponent, HistoryComponent, HomeComponent],
            imports: [HttpClientModule],
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
