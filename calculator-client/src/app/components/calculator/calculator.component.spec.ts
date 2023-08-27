import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from 'src/app/services/calculator.service';
import { CombinationResponse } from 'src/app/models/combination-response.model';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<CalculatorService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CalculatorService', ['searchCombination', 'previousAmount', 'nextAmount']);

    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: CalculatorService, useValue: spy }]
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    calculatorServiceSpy = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update combination response and set amount value when equal value is present', () => {
    const combinationResponse: CombinationResponse = {
      equal: { value: 5, cards: [5] }
    };

    component.updateCombinationResponse(combinationResponse);
    expect(component.amount.value).toEqual(5);
    expect(component.amountNotAvailable).toEqual(false);
  });

  it('should update combination response when validate amount', () => {
    const combinationResponse: CombinationResponse = {
      equal: { value: 10, cards: [10] }
    };

    calculatorServiceSpy.searchCombination.and.returnValue(of(combinationResponse));

    component.amount.setValue(10);
    component.validateAmount();

    expect(calculatorServiceSpy.searchCombination).toHaveBeenCalledWith(10);
    expect(component.combinationResponse).toEqual(combinationResponse);
  });

it('should update combination response update amountNotAvailable when only floor value is present', () => {
  const combinationResponse: CombinationResponse = {
    floor: { value: 7, cards: [7] }
  };

  calculatorServiceSpy.searchCombination.and.returnValue(of(combinationResponse));

  component.updateCombinationResponse(combinationResponse);
  expect(component.amount.value).toEqual(7);
  expect(component.amountNotAvailable).toEqual(true);
});

it('should update combination response and update amountNotAvailable when only ceil value is present', () => {
  const combinationResponse: CombinationResponse = {
    ceil: { value: 12, cards: [12] }
  };

  calculatorServiceSpy.searchCombination.and.returnValue(of(combinationResponse));

  component.updateCombinationResponse(combinationResponse);
  expect(component.amount.value).toEqual(12);
  expect(component.amountNotAvailable).toEqual(true);
});

it('should update previous amount and update combination response', () => {
  const combinationResponse: CombinationResponse = {
    equal: { value: 9, cards: [9] }
  };

  calculatorServiceSpy.previousAmount.and.returnValue(of(combinationResponse));

  component.amount.setValue(10);
  component.previousAmount();

  expect(calculatorServiceSpy.previousAmount).toHaveBeenCalledWith(10);
  expect(component.combinationResponse).toEqual(combinationResponse);
});

it('should update next amount and update combination response', () => {
  const combinationResponse: CombinationResponse = {
    equal: { value: 11, cards: [11] }
  };

  calculatorServiceSpy.nextAmount.and.returnValue(of(combinationResponse));

  component.amount.setValue(10);
  component.nextAmount();

  expect(calculatorServiceSpy.nextAmount).toHaveBeenCalledWith(10);
  expect(component.combinationResponse).toEqual(combinationResponse);
});

it('should write value and validate amount', () => {
  const calculatorComponentValue = { value: 10, cards: [10] };

  spyOn(component, 'validateAmount');

  component.writeValue(calculatorComponentValue);

  expect(component.amount.value).toEqual(10);
  expect(component.validateAmount).toHaveBeenCalled();
});

  afterEach(() => {
    fixture.destroy();
  });
});
