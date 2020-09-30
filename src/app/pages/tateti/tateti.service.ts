

import { Injectable, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class TatetiService {

  constructor(private firestore: AngularFirestore,     
    private authService: AuthService  ) {

  }
  
  saveGame(puntos:number) {
    const partida: Game = {
      nameGame: 'Tateti',
      points: puntos,
      date: new Date(),
     // player: 'nmonllor',
     player: firebase.auth().currentUser.email

    };
    return this.firestore.collection('lista').add({...partida});
  }


}