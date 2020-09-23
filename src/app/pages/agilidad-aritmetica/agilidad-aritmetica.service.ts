import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../../interfaces/game.interface';
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

  constructor(
    private firestore: AngularFirestore
  ) {
    this.cantidadPuntos = 0;
    this.intentos = 0;
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

  gameOver() {
    const game: Game = {
      nameGame: 'Agilidad Aritmetica',
      points: this.cantidadPuntos,
      date: new Date(),
      namePlayer: 'nmonllor'
    };
    this.cantidadPuntos = 0;
    return this.firestore.collection('lista').add({...game});
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
    const game: Game = {
      nameGame: 'Agilidad Aritmetica',
      points: this.cantidadPuntos,
      date: new Date(),
      namePlayer: 'nmonllor'
      // jugador: this._userService.user.username
    };
    return this.firestore.collection('agilidad-aritmetica').add({ ...game });
  }
}
