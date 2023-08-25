import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calculatorForm: FormGroup;

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.calculatorForm = this.fb.group({
      calculatorControl: [null]
    });  
  }
}
