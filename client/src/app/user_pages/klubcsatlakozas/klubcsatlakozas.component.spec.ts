import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlubcsatlakozasComponent } from './klubcsatlakozas.component';

describe('KlubcsatlakozasComponent', () => {
  let component: KlubcsatlakozasComponent;
  let fixture: ComponentFixture<KlubcsatlakozasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlubcsatlakozasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlubcsatlakozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
