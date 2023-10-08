import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../containers/user-form/user-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  readonly displayedColumns = ['name', 'email', 'actions']

  constructor(
    public dialog: MatDialog,
  ){

  }

  @Input() users: User[] = []
  @Output() remove = new EventEmitter(false)

  // onAdd() {
  //   this.dialog.open(UserFormComponent, {
  //     maxWidth: '60vw',
  //   });
  // }

  onEdit(user: User){
    this.dialog.open(UserFormComponent, {
      maxWidth: '60vw',
      data: user
    });
  }
  onDelete(user: User){
    this.remove.emit(user)
  }
}
