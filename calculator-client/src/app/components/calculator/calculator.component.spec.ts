import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from 'src/app/services/calculator.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

class CalculatorServiceStub {
  searchCombination(amount: number) {
    return of({});
  }

  previousAmount(amount: number) {
    return of({});
  }

  nextAmount(amount: number) {
    return of({});
  }
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorService: CalculatorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: CalculatorServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    calculatorService = TestBed.inject(CalculatorService);
    fixture.detectChanges();
  });

  it('should create the calculator', () => {
    expect(component).toBeTruthy();
  });

  it('should update the combination response', () => {
    const combinationResponse = { equal: { value: 100, cards: [100] } };
    component.updateCombinationResponse(combinationResponse);
    expect(component.amount).toEqual(100);
  });

  it('should validate the amount', () => {
    spyOn(calculatorService, 'searchCombination').and.returnValue(of({ equal: { value: 100, cards: [100] } }));
    component.amount = 100;
    component.validateAmount();
    expect(calculatorService.searchCombination).toHaveBeenCalledWith(100);
  });

  it('should get the previous amount', () => {
    spyOn(calculatorService, 'previousAmount').and.returnValue(of({ equal: { value: 90, cards: [90] } }));
    component.amount = 100;
    component.previousAmount();
    expect(calculatorService.previousAmount).toHaveBeenCalledWith(100);
  });

  it('should get the next amount', () => {
    spyOn(calculatorService, 'nextAmount').and.returnValue(of({ equal: { value: 110, cards: [110] } }));
    component.amount = 100;
    component.nextAmount();
    expect(calculatorService.nextAmount).toHaveBeenCalledWith(100);
  });

  it('should write the value', () => {
    spyOn(component, 'validateAmount');
    const calculatorComponentValue = { value: 100, cards: [100] };
    component.writeValue(calculatorComponentValue);
    expect(component.amount).toEqual(100);
    expect(component.validateAmount).toHaveBeenCalled();
  });

  it('should register onChange function', () => {
    const fn = (value: any) => {};
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });
});
