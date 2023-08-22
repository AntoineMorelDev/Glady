import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CombinationResponse } from 'src/app/models/combination-response.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() combinationResponse: CombinationResponse = {};
  @Output() checkout: EventEmitter<number> = new EventEmitter<number>();

  amount: number = 0;

  validateAmount(): void {
    this.checkout.next(this.amount);
  }
}
