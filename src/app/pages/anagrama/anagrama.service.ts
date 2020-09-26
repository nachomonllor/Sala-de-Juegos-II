import { ClaveValor } from './clave-valor';

import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../../interfaces/game.interface';


@Injectable({
  providedIn: 'root'
})

/*
interface Diccio {
  pal: string;
  sig: string;
}*/

export class AnagramaService {
  /*
    palabras: string[] = { 'computadora',  
                       'microfono',  
                       'mesa', 'telefono', 'anagrama'};
    */

    /*
      palabras: {key: string, value: string}[] = [
                        {key: 'first', value: 'one'},
                        {key: 'second', value: 'two'}
                    ];*/
    
   //const myPair = new Pair<string, number>('test', 123);
   //console.log(myPair.getKey(), myPair.getValue());
   palabras = new Array< ClaveValor<string, string>>();
    

  palabraOrdenada: string;
  significadoPalDes:string;
  intentos = 0;
  cantidadPuntos = 0;
  resultado: string;
  palabraIngresada: string;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {

    this.palabras.push(new ClaveValor("computadora", "maquina que sirve para programar"));
    this.palabras.push(new ClaveValor("microfono", "cosa que interpreta la voz"));

    this.palabraOrdenada = this.seleccionarPalabra();

  }

  // Selecciona palabra aleatoriamente
  seleccionarPalabra() {
    let indSeleccionado = Math.floor(Math.random() * this.palabras.length);
    this.palabraOrdenada = this.palabras[indSeleccionado].getKey();
    this.significadoPalDes = this.palabras[indSeleccionado].getValue();

    console.log(this.palabraOrdenada + ' '  + this.significadoPalDes);
    return this.palabraOrdenada;
  }

  desordenarPalabra(): string {
    // algoritmo de Fisher Yates
    // this.palabraDesordenada = shuffle
    let ch = new Array();
    let n = this.palabraOrdenada.length;

    for (let i = 0; i < this.palabraOrdenada.length; i++) {
      ch.push(this.palabraOrdenada[i]);
    }

    for (let i = n - 1; i > 0; i--) {
      // var j = r.Next(0, i + 1);
      let j = Math.floor(Math.random() * (i + 1));
      let temp = ch[i];
      ch[i] = ch[j];
      ch[j] = temp;
    }
    let palabraDesordenada = '';
    for (let i = 0; i < ch.length; i++) {
      palabraDesordenada += ch[i];
    }
    return palabraDesordenada;
  }

  verifyResult(palabra: string) {
    if (this.intentos < 5) {
      this.intentos++;
      if (palabra === this.palabraOrdenada) {
        // this.resultado = 'ACERTASTE';
        this.cantidadPuntos += 10;
        this.seleccionarPalabra();
        this.desordenarPalabra();
        this.intentos = 0;
        this.palabraIngresada = '';
      } else {
        //  this.resultado = 'TE EQUIVOCASTE';
        this.cantidadPuntos -= 5;
        if (this.cantidadPuntos <= 0) {
          this.cantidadPuntos = 0;
        }
      }
      console.log(this.intentos);
    } else {
      // this.resultado = 'Pasaste los 5 intentos permitidos';
      this.seleccionarPalabra();
      this.desordenarPalabra();
      this.intentos = 0;
      this.palabraIngresada = '';
    }
  }
  saveGame() {
    const partida: Game = {
      nameGame: 'Anagrama',
      points: this.cantidadPuntos,
      date: new Date(),
      player: 'nmonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }
}
