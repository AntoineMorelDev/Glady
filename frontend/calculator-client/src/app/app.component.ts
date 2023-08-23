import { Component } from '@angular/core';
import { CalculatorService } from './services/calculator.service';
import { CombinationResponse } from './models/combination-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  combinationResponse: CombinationResponse = {};

  constructor(private calculatorService: CalculatorService) {
  }

  checkout(amount: number): void {
    this.calculatorService.searchCombination(amount).subscribe(combinationResponse => {
      this.combinationResponse = combinationResponse;
    });
  }

  previousAmount(amount: number) : void {
    this.calculatorService.previousAmount(amount).subscribe(combinationResponse => {
      this.combinationResponse = combinationResponse;
    });
  }

  nextAmount(amount: number) : void {
    this.calculatorService.nextAmount(amount).subscribe(combinationResponse => {
      this.combinationResponse = combinationResponse;
    });
  }
}
