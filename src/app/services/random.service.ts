import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RandomService {
    private endpoint = 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';
    constructor(private http: HttpClient) {}

    public generateRandomNumber(): Promise<string> {
        const source$ = this.http.get(this.endpoint).pipe(
            map((response) => {
                return String(response).trim();
            }),
            catchError((error) => {
                console.error('Error fetching random number', error);
                return of('');
            })
        );

        return firstValueFrom(source$);
    }
}
