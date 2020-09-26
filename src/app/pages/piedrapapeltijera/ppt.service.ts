//import { Game } from '../../models/game.model';
import { Injectable } from '@angular/core';
//import { UserService } from '../../servicios/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/app/interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class PptService {
  constructor(private firestore: AngularFirestore) {}

  /*
  saveGame(puntos: number) {
    const game: Game = {
      nombre: 'Piedra Papel Tijera',
      cantidadPuntos: puntos,
      hora: new Date(),
      jugador: this._userService.user.username,
      gano: true
    };
    const lista = JSON.parse(localStorage.getItem('lista')) || [];
    lista.push(game);
    localStorage.setItem('lista', JSON.stringify(lista));
  }*/

  
  
  saveGame(puntos: number) {
    const partida: Game = {
      nameGame: 'Piedra Papel Tijera',
      points: puntos, // this.cantidadPuntos,
      date: new Date(),
      player: 'nmonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }



}
