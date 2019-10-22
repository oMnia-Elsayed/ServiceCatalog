import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCityListComponent } from './country-city-list.component';

describe('CountryCityListComponent', () => {
  let component: CountryCityListComponent;
  let fixture: ComponentFixture<CountryCityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
