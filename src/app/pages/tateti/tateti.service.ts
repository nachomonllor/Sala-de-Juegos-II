//import { Game } from '../../models/game.model';

//import { UserService } from '../../servicios/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
@Injectable({
  providedIn: 'root'
})

export class TatetiService {

  constructor(private firestore: AngularFirestore) {

  }
  
  saveGame(puntos:number) {
    const partida: Game = {
      nameGame: 'Tateti',
      points: puntos,
      date: new Date(),
      player: 'nmonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }


}