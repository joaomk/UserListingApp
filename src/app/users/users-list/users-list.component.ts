import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { Observable, catchError, of } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{
  users$: Observable<User[]>
  displayedColumns = ['name', 'email', 'actions']

  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    private router: Router
) {
    this.users$ = this.service.list().pipe(
      catchError(error => {
        this.onError('Error on loading users!')
        return of([])
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd() {
    console.log("A")
    this.router.navigate(['users/new'])
  }
}
