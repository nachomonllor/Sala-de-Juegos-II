import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrimoService {
/*
  constructor(public _userService: UserService) {
  }*/

  constructor(private firestore: AngularFirestore) {}
 

 saveGame(puntos: number) {
  const partida = {
    nombre: 'Numeros primos',
    cantidadPuntos: puntos,
    hora: new Date(),
    jugador: 'nomonllor',
  };
  return this.firestore.collection('lista').add({...partida});
}


}
