import { Component } from '@angular/core';
import { CombinationResponse } from 'src/app/models/combination-response.model';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  amount: number = 0;
  amountNotAvailable: boolean = false;
  combinationResponse: CombinationResponse = {};

  constructor(private calculatorService: CalculatorService) {
  }

  updateCombinationResponse(newCombinationResponse: CombinationResponse) {
    this.combinationResponse = newCombinationResponse;

    if (newCombinationResponse?.equal?.value) {
      // Amount exist on the store : update the amount
      this.amount = newCombinationResponse.equal.value;
    } else if (newCombinationResponse?.floor?.value && !this.combinationResponse?.ceil?.value) {
      // Max reached : lower the amount and validate
      this.amount = newCombinationResponse.floor.value;
      this.validateAmount();
    } else if (newCombinationResponse?.ceil?.value && !this.combinationResponse?.floor?.value) {
      // Min reached : upgrade the amount and validate
      this.amount = newCombinationResponse.ceil.value;
      this.validateAmount();
    }

    this.amountNotAvailable = !newCombinationResponse.equal && (!!newCombinationResponse.floor || !!newCombinationResponse.ceil);
  }


  validateAmount(): void {
    this.calculatorService.searchCombination(this.amount).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }

  previousAmount(): void {
    this.calculatorService.previousAmount(this.amount).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }
  
  nextAmount(): void {
    this.calculatorService.nextAmount(this.amount).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }
}
