import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaListaComponent } from './empresa-lista.component';

describe('EmpresaListaComponent', () => {
  let component: EmpresaListaComponent;
  let fixture: ComponentFixture<EmpresaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
