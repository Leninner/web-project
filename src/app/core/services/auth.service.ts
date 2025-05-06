import { inject, Injectable } from "@angular/core";
import {
  UserCredential,
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "@angular/fire/auth";

import { User } from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = inject(Auth);

  //iniciar sesion
  async login(email: string, password: string): Promise<UserCredential> {
    const UserCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.saveInLocalStorage(UserCredential.user);
    return UserCredential;
  }

  saveInLocalStorage(user: User) {
    const userData = {
      uid: user.uid,
      email: user.email,
    };
    localStorage.setItem("user", JSON.stringify(userData));
  }

  getDataUser(): any {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  isLogged(): boolean {
    return this.getDataUser() !== null;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    localStorage.removeItem("user");
  }
}
