import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { UserAuthService } from '../servicios/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  
  formulario!: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  firebaseErrors: any = {
    'auth/user-not-found': 'El correo ingresado no se encuentra registrado',
    'auth/wrong-password': 'Contraseña incorrecta', 'auth/invalid-credential': 'Usuario y/o contraseña erroneos'
  };

  
  constructor(private userAuth:UserAuthService ,private fb: FormBuilder, private ruteador: Router, private spinner: NgxSpinnerService) {
    this.formulario = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  setearCampos(email: string, password: string) {
    this.formulario.controls['email'].setValue(email);
    this.formulario.controls['password'].setValue(password);
  }

  onSubmit(f:any) {
    console.info(f);
    this.loguear(f.email, f.password);
    }


    loguear(usuario: string, password: string) {
      this.spinner.show();
      this.userAuth.ingresar(usuario, password)
        .then((userCredential) => {
          this.ruteador.navigate(['home']);
          this.Toast.fire({
            icon: 'success',
            //title: snapshot.data()!['nombre'] + ' ' + snapshot.data()!['apellido'] + ' logueado correctamente'
            title: 'Logueado correctamente'
          })
          this.spinner.hide();
        })
        .catch(error => {
          console.info(error);
          this.Toast.fire({
            icon: 'error',
            title: this.firebaseErrors[error.code] || error.code
          })
          this.spinner.hide();
        });
  
    }


}
