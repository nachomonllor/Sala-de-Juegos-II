 import { FirebaseAuth } from 'angularfire2';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Game } from '../../interfaces/game.interface';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AgilidadAritmeticaService {
  numero1: number;
  numero2: number;
  indiceOperador: number;
  limite: number = 10;
  operadorSeleccionado: string;
  result: number;
  cantidadPuntos: number;
  maximo_puntaje: number = 0;
  nivel: number;
  intentos = 0;
  
   // firebase:any;

  private user: Observable<firebase.User | null >;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
    
  ) {
    this.cantidadPuntos = 0;
    this.intentos = 0;
    this.user = this.afAuth.authState;

  }

  getCalulo() {
    this.numero1 = Math.floor(Math.random() * this.limite);
    this.numero2 = Math.floor(Math.random() * this.limite);
    this.indiceOperador = Math.floor(Math.random() * 3);
    if (this.indiceOperador == 0) {
      this.result = this.numero1 + this.numero2;
      this.operadorSeleccionado = '+';
    } else if (this.indiceOperador == 1) {
      this.result = this.numero1 - this.numero2;
      this.operadorSeleccionado = '-';
    } else if (this.indiceOperador == 2) {
      this.result = this.numero1 * this.numero2;
      this.operadorSeleccionado = 'x';
    }
    return `${this.numero1} ${this.operadorSeleccionado} ${this.numero2}`;
  }
  verifyResult(result) {
    if (result == this.result) {
      return 1;
    } else {
      this.intentos++;
      return 0;
    }
  }

  

  subirDeNivel() {
    this.limite += 20;
    this.nivel++;
    // this.resetearColorBotones();
    if (this.cantidadPuntos > this.maximo_puntaje) {
      this.maximo_puntaje = this.cantidadPuntos;
    }
  }
 
  
  saveGame() {

   // var authData = this.firebase.auth().currentUser();
    const partida: Game = {
      nameGame: 'Agilidad Aritmetica',
      points: this.cantidadPuntos,
      date: new Date(),
      //player: firebase.auth().currentUser.email.toString() 
      //player : this.fireAuth.currentUser.email
     // player: authData,
     //player : this.firestore.collection('users').doc('id').toString()
      //player: 'tito',
      player: firebase.auth().currentUser.email


    };

    return this.firestore.collection('lista').add({...partida});
  }


}
