import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> | null = null;

  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.users$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar usuários!');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.dialog.open(UserFormComponent, {
      maxWidth: '60vw',
    });
  }

  onRemove(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.remove(user).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Usuário removido com sucesso.', '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

  // onEdit(user: User) {
  //   this.dialog.open(UserFormComponent,  {
  //     maxWidth: '60vw',
  //   });
  // }
}
