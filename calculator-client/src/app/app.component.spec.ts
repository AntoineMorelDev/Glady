import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class TranslateServiceStub {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        FormBuilder,
        { provide: TranslateService, useClass: TranslateServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore uknown elements as '<app-calculator>'
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the calculatorForm', () => {
    expect(component.calculatorForm).toBeTruthy();
  });

  it('should call setDefaultLang and use of TranslateService', () => {
    const translateService = fixture.debugElement.injector.get(TranslateService);
    spyOn(translateService, 'setDefaultLang');
    spyOn(translateService, 'use');

    component = new AppComponent(translateService, new FormBuilder());
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });
});
