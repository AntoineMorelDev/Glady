import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calculatorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.calculatorForm = this.fb.group({
      calculatorControl: [null]
    });  
  }
}
