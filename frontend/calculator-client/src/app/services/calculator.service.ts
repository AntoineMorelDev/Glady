import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CombinationResponse } from '../models/combination-response.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private apiService: ApiService) { }

  searchCombination(amount: number): Observable<CombinationResponse> {
      return this.apiService.searchCombination(amount);
  }
}
