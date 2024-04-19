import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private auth: Auth) { }



  ingresar(correo: string, password: string) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }
}
