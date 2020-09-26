import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/app/interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class PrimoService {
/*
  constructor(public _userService: UserService) {
  }*/

  constructor(private firestore: AngularFirestore) {}
 

 
  

saveGame(puntos: number) {
  const partida: Game = {
    nameGame: 'Numeros Primos',
    points: puntos, // this.cantidadPuntos,
    date: new Date(),
    player: 'nmonllor',
  };
  return this.firestore.collection('lista').add({...partida});
}

}
