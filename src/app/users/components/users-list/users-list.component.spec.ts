import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { MatDialog } from '@angular/material/dialog';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    // Criar um objeto spyOn para MatDialog
    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [
        // Fornecer o objeto spyOn no lugar do MatDialog real
        { provide: MatDialog, useValue: mockDialog },
      ],
    });

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente UsersListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o diálogo de edição ao chamar onEdit', () => {
    const user = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    component.onEdit(user);
    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: user,
    });
  });

  it('deve emitir o evento "remove" ao chamar onDelete', () => {
    const user = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    spyOn(component.remove, 'emit');
    component.onDelete(user);
    expect(component.remove.emit).toHaveBeenCalledWith(user);
  });
});
