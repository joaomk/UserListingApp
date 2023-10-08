import { User } from './../../model/user';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isCPF, isPhone } from 'brazilian-values';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{

  form = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.pattern(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) (?:9 )?\d{4}-\d{4}$/)]],
    phoneType: ['', [Validators.required]]
  });


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsersService,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private user: User
  ){

   }

  ngOnInit(){

    if (this.user && this.user.id) {
      this.form.setValue({
      id: this.user.id,
      cpf: this.user.cpf,
      email: this.user.email,
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
      phoneType: this.user.phoneType
      })
    }
  }

  onCancel(){
    //this.location.back()
    this.dialog.closeAll()
  }

  onSubmit(){
    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe(data => this.onSuccess(), error => this.onError())
    } else {
      alert('form invalido')
    }
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o usuário.", "", {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  private onSuccess() {
    this.snackBar.open("Usuário salvo com sucesso.", "", {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
    //this.location.back()
    this.dialog.closeAll()
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName)
    console.log(fieldName, field)
    if(field?.hasError('required')) {
      return 'Campo obrigatório!'
    }

    if(fieldName == 'email' && field?.hasError('email')) {
      return 'E-mail invalido!'
    }

    if (fieldName == 'cpf' && field?.hasError('pattern')) {
       return 'CPF inválido! Formato: 123.456.789-12';
    }

    if (fieldName == 'phoneNumber' && field?.hasError('pattern')) {
      return 'Formato inválido! Formato: (99) 9 9999-9999';
   }

    // if (fieldName === 'phoneNumber' && field?.hasError('phoneNumberInvalido')) {
    //   return 'Número de telefone inválido!';
    // }

    if(field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return `Tamanho mínimo precisa ser de ${requiredLength}`
    }

    if(field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200
      return `Tamanho máximo excedido de ${requiredLength}`
    }

    return 'Campo invalido!'
  }

  // validateCpf(control: FormControl) {
  //   const cpf = control.value;
  //   if (!cpf) {
  //     return null;
  //   }

  //   if(isCPF(cpf)) {
  //     return null
  //   } else {
  //     return { cpfInvalido: true }
  //   }
  // }

  // validatePhoneNumber(control: FormControl){
  //   const phoneNumber = control.value
  //   if (!phoneNumber) {
  //     return null
  //   }
  //   if(isPhone(phoneNumber)){
  //     return null
  //   }
  //   return { phoneNumberInvalido: true }
  // }

}
