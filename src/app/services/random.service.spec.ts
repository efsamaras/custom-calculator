import { TestBed } from '@angular/core/testing';

import { RandomService } from './random.service';
import { HttpClientModule } from '@angular/common/http';

describe('RandomService', () => {
    let service: RandomService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(RandomService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
