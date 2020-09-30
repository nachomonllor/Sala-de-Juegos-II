import { Injectable } from '@angular/core';
 
import { Game } from 'src/app/interfaces/game.interface';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrimoService {
/*
  constructor(public _userService: UserService) {
  }*/

  constructor(private firestore: AngularFirestore,    
    private authService: AuthService  ) {}
 

 
  

saveGame(puntos: number) {
  const partida: Game = {
    nameGame: 'Numeros Primos',
    points: puntos, // this.cantidadPuntos,
    date: new Date(),
    //player: 'nmonllor',
    player: firebase.auth().currentUser.email

  };
  return this.firestore.collection('lista').add({...partida});
}

}
