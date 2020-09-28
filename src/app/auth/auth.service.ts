import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FirebaseAuth } from 'angularfire2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router) {
  }
  loginEmailUser(email, password, remember: boolean = false) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerUser(user) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((userData: any) => {
          const userCollection = this.afs.collection('users');
          userCollection.doc(userData.user.uid).set({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          });
          resolve(user);
        }).catch(err => reject(err));
    });
  }
  logout() {
    debugger
    return this.afAuth.auth.signOut();
  }
  // isAuth() {
  //   return this.afAuth.authState
  //     .pipe(
  //       map(fbUser => fbUser != null)
  //     );
  // }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser) {
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        })
      );
  }

}
