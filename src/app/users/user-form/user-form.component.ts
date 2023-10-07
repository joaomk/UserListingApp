import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('')
  });


  constructor(
    private formBuilder: FormBuilder
  ){  }

}
