import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { ApiService } from './api.service';
import { of, throwError } from 'rxjs';
import { CombinationResponse } from '../models/combination-response.model';

class ApiServiceStub {
  searchCombination(amount: number) {
    return of(<CombinationResponse>{});
  }
}

describe('CalculatorService', () => {
  let service: CalculatorService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: ApiService, useClass: ApiServiceStub }
      ]
    });

    service = TestBed.inject(CalculatorService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchCombination', () => {
    it('should call apiService.searchCombination', () => {
      spyOn(apiService, 'searchCombination').and.callThrough();
      service.searchCombination(10).subscribe();
      expect(apiService.searchCombination).toHaveBeenCalledWith(10);
    });
  });

  describe('previousAmount', () => {
    it('should call apiService.searchCombination with amount - 1', () => {
      spyOn(apiService, 'searchCombination').and.callThrough();
      service.previousAmount(10).subscribe();
      expect(apiService.searchCombination).toHaveBeenCalledWith(9);
    });

    it('should handle error', () => {
      spyOn(apiService, 'searchCombination').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      service.previousAmount(10).subscribe();
      expect(console.error).toHaveBeenCalledWith('Error occurred:', 'error');
    });
  });

  describe('nextAmount', () => {
    it('should call apiService.searchCombination with amount + 1', () => {
      spyOn(apiService, 'searchCombination').and.callThrough();
      service.nextAmount(10).subscribe();
      expect(apiService.searchCombination).toHaveBeenCalledWith(11);
    });

    it('should handle error', () => {
      spyOn(apiService, 'searchCombination').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      service.nextAmount(10).subscribe();
      expect(console.error).toHaveBeenCalledWith('Error occurred:', 'error');
    });
  });

});
