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
  amountNotAvailable: boolean = false;

  ngOnChanges() {
    if (this.combinationResponse?.equal?.value) {
      // Amount exist on the store : update the amount
      this.amount = this.combinationResponse.equal.value;
    } else if (this.combinationResponse?.floor?.value && !this.combinationResponse?.ceil?.value) {
      // Max reached : lower the amount and validate
      this.amount = this.combinationResponse.floor.value;
      this.validateAmount();
    } else if (this.combinationResponse?.ceil?.value && !this.combinationResponse?.floor?.value) {
      // Min reached : upgrade the amount and validate
      this.amount = this.combinationResponse.ceil.value;
      this.validateAmount();
    }

    this.amountNotAvailable = !this.combinationResponse.equal && (!!this.combinationResponse.floor || !!this.combinationResponse.ceil);
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
}
