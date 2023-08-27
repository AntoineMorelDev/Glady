import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CombinationResponse } from '../models/combination-response.model';
import { Observable, switchMap, of, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private apiService: ApiService) { }

  searchCombination(amount: number): Observable<CombinationResponse> {
    return this.apiService.searchCombination(amount)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return of({});
        })
      );
  }

  previousAmount(amount: number): Observable<CombinationResponse> {
    return this.apiService.searchCombination(amount - 1).pipe(
      switchMap(combinationResponse => {
        if (combinationResponse.equal?.value) {
          return of(combinationResponse);
        } else if (combinationResponse.floor?.value) {
          return this.apiService.searchCombination(combinationResponse.floor.value);
        } else {
          // Min reached
          return of(combinationResponse);
        }
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of({});
      })
    );
  }

  nextAmount(amount: number): Observable<CombinationResponse> {
    return this.apiService.searchCombination(amount + 1).pipe(
      switchMap(combinationResponse => {
        if (combinationResponse.equal?.value) {
          return of(combinationResponse);
        } else if (combinationResponse.ceil?.value) {
          return this.apiService.searchCombination(combinationResponse.ceil.value);
        } else {
          // Max reached
          return of(combinationResponse);
        }
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of({});
      })
    );
  }
  
}
