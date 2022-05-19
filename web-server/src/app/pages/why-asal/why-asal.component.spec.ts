import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAsalComponent } from './why-asal.component';

describe('WhyAsalComponent', () => {
  let component: WhyAsalComponent;
  let fixture: ComponentFixture<WhyAsalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyAsalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyAsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
