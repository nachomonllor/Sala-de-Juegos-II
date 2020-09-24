//import { Game } from '../../models/game.model';

//import { UserService } from '../../servicios/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class TatetiService {

  constructor(private firestore: AngularFirestore) {

  }


  saveGame(puntos: number) {
    const partida = {
      nombre: 'Anagrama',
      cantidadPuntos: puntos,
      hora: new Date(),
      jugador: 'nomonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }


}