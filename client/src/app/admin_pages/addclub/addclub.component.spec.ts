import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclubComponent } from './addclub.component';

describe('AddclubComponent', () => {
  let component: AddclubComponent;
  let fixture: ComponentFixture<AddclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddclubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
