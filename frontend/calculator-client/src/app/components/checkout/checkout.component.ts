import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CombinationResponse } from 'src/app/models/combination-response.model';
import { Combination } from 'src/app/models/combination.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnChanges {
  @Input() combinationResponse: CombinationResponse = {};
  @Output() checkout: EventEmitter<number> = new EventEmitter<number>();
  @Output() previousAmountCheckout: EventEmitter<number> = new EventEmitter<number>();
  @Output() nextAmountCheckout: EventEmitter<number> = new EventEmitter<number>();

  amount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (this.combinationResponse?.equal?.value) {
      this.amount = this.combinationResponse.equal.value;
    }
  }


  validateAmount(): void {
    this.checkout.next(this.amount);
  }

  previousAmount(): void {
    this.previousAmountCheckout.next(this.amount);
  }
  
  nextAmount(): void {
    this.nextAmountCheckout.next(this.amount);
  }

  updateAmountAndValidate(newAmount?: Combination): void {
    if (newAmount?.value) {
      this.amount = newAmount.value;
      this.validateAmount();
    } else {
      console.error('Trying to update amount with null');
    }
  }
}
