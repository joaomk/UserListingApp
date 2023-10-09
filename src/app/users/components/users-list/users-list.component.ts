import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
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
  ){}

  @Input() users: User[] = []
  @Output() remove = new EventEmitter(false)

  onEdit(user: User){
    this.dialog.open(UserFormComponent, {
      minWidth: '70vw',
      data: user
    });
  }
  onDelete(user: User){
    this.remove.emit(user)
  }
}
