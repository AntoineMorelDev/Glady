import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CombinationResponse } from '../models/combination-response.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static readonly DEFAULT_SHOP_ID: number = 5;

  constructor(private http: HttpClient) { }

  searchCombination(amount: number, shopId: number = ApiService.DEFAULT_SHOP_ID): Observable<CombinationResponse> {
    const httpOptions = {
      params: new HttpParams().set('amount', amount?.toString() || '')
    };

    return this.http.get<CombinationResponse>(environment.baseUrl + '/shop/' + shopId + '/search-combination', httpOptions)
      .pipe(
        delay(1000), // Simulate response time
        catchError(error => {
            console.error('Error occurred:', error);
            return of({});
        })
    );
  }
}
