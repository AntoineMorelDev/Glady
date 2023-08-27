import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalculatorComponentValue } from 'src/app/models/calculator-component-value.model';
import { CombinationResponse } from 'src/app/models/combination-response.model';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalculatorComponent),
    multi: true
  }]
})
export class CalculatorComponent implements ControlValueAccessor {

  amount: FormControl<number> = new FormControl<number>(0) as FormControl<number>;
  amountNotAvailable: boolean = false;
  combinationResponse: CombinationResponse = {};
  onChange = (value: CalculatorComponentValue) => {};
  onTouched = () => {};

  constructor(private calculatorService: CalculatorService) {
  }

  updateCombinationResponse(newCombinationResponse: CombinationResponse) {
    this.combinationResponse = newCombinationResponse;

    if (newCombinationResponse?.equal?.value) {
      // Amount exist on the store : update the amount
      this.amount.setValue(newCombinationResponse.equal.value);
    } else if (newCombinationResponse?.floor?.value && !this.combinationResponse?.ceil?.value) {
      // Max reached : lower the amount and validate
      this.amount.setValue(newCombinationResponse.floor.value);
      this.validateAmount();
    } else if (newCombinationResponse?.ceil?.value && !this.combinationResponse?.floor?.value) {
      // Min reached : upgrade the amount and validate
      this.amount.setValue(newCombinationResponse.ceil.value);
      this.validateAmount();
    }

    this.amountNotAvailable = !newCombinationResponse.equal && (!!newCombinationResponse.floor || !!newCombinationResponse.ceil);

      // Emit new CalculatorComponentValue
      this.onChange({
        value: this.amount.value,
        cards: newCombinationResponse?.equal?.cards || []
      });
  }


  validateAmount(): void {
    // Clean old response
    this.combinationResponse = {};

    this.calculatorService.searchCombination(this.amount.value).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }

  previousAmount(): void {
    // Clean old response
    this.combinationResponse = {};

    this.calculatorService.previousAmount(this.amount.value).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }
  
  nextAmount(): void {
    // Clean old response
    this.combinationResponse = {};
    
    this.calculatorService.nextAmount(this.amount.value).subscribe(combinationResponse => {
      this.updateCombinationResponse(combinationResponse);
    });
  }

  // Below methods for reactives forms
  writeValue(calculatorComponentValue: CalculatorComponentValue): void {
    if (calculatorComponentValue) {
      this.amount.setValue(calculatorComponentValue.value);
      this.validateAmount();
    }
  }

  registerOnChange(fn: (calculatorComponentValue: CalculatorComponentValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabling if required
  }
}
