import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 'Erro de exemplo' },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente ErrorDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título "Error!" no diálogo', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Error!');
  });

  it('deve exibir o conteúdo de erro passado como entrada', () => {
    fixture.detectChanges();
    const contentElement = fixture.nativeElement.querySelector('div[mat-dialog-content]');
    expect(contentElement.textContent).toContain('Erro de exemplo');
  });

  it('deve ter um botão "Close"', () => {
    fixture.detectChanges();
    const closeButtonElement = fixture.nativeElement.querySelector('button[mat-dialog-close]');
    expect(closeButtonElement.textContent).toContain('Close');
  });
});
