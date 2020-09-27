import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MemotestService} from './memotest.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  
  constructor (private router: Router, private _memoService: MemotestService ) 
  {

    // clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    //this.resetearColorBotones();
    this.initialize();
    this.ponerEnNegro();
  }
 
  
  ngOnInit() {

  }

  listaAleatorios: Array<number>;
  // tslint:disable-next-line: member-ordering
  estadoBotones: string[][] = [
    ['white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white'],
   
  ];
  posiciones: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    
  ];

  //totalPrimos = 0;
  limite = 30;
  reloj = 25;
  nivel = 1;
  puntos = 0;
  maximo_puntaje = 0;
  numeroElegido: number = -1;
  listaElegidos = new Array<number>();
  contadorMostrados = 2;
  time: number = 0;
  interval;
  play = false;

  filaAnterior = -1;//para evitar que se tome como pareja cuando se cliquea la misma casilla 2 veces
  colAnterior = -1;//para evitar que se tome como pareja cuando se cliquea la misma casilla 2 veces

  
  initialize() { //cargo el array de posiciones e inicializo todas las variables
 
    this.limite = 30;
    this.reloj = 25;
    this.nivel = 1;
    this.puntos = 0;
    this.maximo_puntaje = 0;
    this.numeroElegido = -1;
    this.listaElegidos = new Array<number>();
    

    //le digo que el indice sea el numero, y el elemento en el indice es la cantidad
    //de veces que tiene que estar el numero
    let numerosDisponibles = new Array<number>();
    for(let i =0; i<8; i++) {
      numerosDisponibles.push(2);
    }

    for(let i =0; i<4; i++) {
      for(let j =0; j<4; j++) {
         let numeroAleatorio = Math.floor(Math.random() * 8) ; 
          console.log(numeroAleatorio);
          while( numerosDisponibles[ numeroAleatorio] <= 0 ) {
            numeroAleatorio = Math.floor(Math.random() * 8) ; 
          }
          this.posiciones[i][j] = numeroAleatorio + 1;
          numerosDisponibles[numeroAleatorio]--;
      }
    }
  }

  //pongo en negro el tablero entero MENOS los que estan descubiertos
 ponerEnNegro(){
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
         if(this.listaElegidos.indexOf(this.posiciones[i][j]) < 0 ) {//si no forma parte de la lista de parejas descubiertas
            this.estadoBotones[i][j] = 'black';//entonces pongo al casillero en negro 
         }
      }
    }
 }

 reiniciar(){
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.estadoBotones[i][j] = 'black';
      }
    }
  }

  
    startTimer() {
      this.pauseTimer();
      //this.time = 4;
      this.play = true;
      this.interval = setInterval(() => {
        this.time++;
        //console.log(this.time);

        if(this.time >= 4 || this.play == false ) {
          
          this.pauseTimer();
          this.ponerEnNegro();
          this.numeroElegido = -1;
          this.filaAnterior = -1;
          this.colAnterior -1;

          this.time =0 ;
          this.play = false;
          this.contadorMostrados = 2;
      }
      },200)
    }
    
    pauseTimer() {
      this.play = false;
      clearInterval(this.interval);
    }

    
    presion(fila: number, columna: number) {
      this.time =0;

      if(this.posiciones[fila][columna] == this.numeroElegido ) {
        //this.estadoBotones[fila][columna] = "white";
        this.listaElegidos.push(this.posiciones[fila][columna] ) ;
        this.numeroElegido = -1;
        // this.filaAnterior = -1;
        // this.colAnterior = -1;
        this.puntos+=10;
      }
      else{
        if(this.puntos > 0) {
            this.puntos--;
        }
      }

      // this.filaAnterior = fila;
      // this.colAnterior = columna;
      
      
      if(this.contadorMostrados > 0) {
        this.estadoBotones[fila][columna] = "white";
        this.numeroElegido = this.posiciones[fila][columna];
       // this.filaAnterior = fila;
       // this.colAnterior = columna;

        console.log("Numero Elegido: " + this.numeroElegido);
      }
      else{
        this.time = 4;
        this.ponerEnNegro();
      }

      this.contadorMostrados--;


      if(this.chequaerSiEstaCompleto() ) {

        if(this.puntos > this.maximo_puntaje) {
          this.maximo_puntaje = this.puntos;
        }

        this.endGame(this.puntos);
      }

      this.startTimer();
 

    }


    /*
    presion(fila: number, columna: number) {
      this.time =0;

      if(this.posiciones[fila][columna] == this.numeroElegido  ) {
        //this.estadoBotones[fila][columna] = "white";
        this.listaElegidos.push(this.posiciones[fila][columna] ) ;
        //this.numeroElegido = -1;
       // this.filaAnterior = -1;
        //this.colAnterior = -1;
        this.puntos+=10;
      }
      else{
        if(this.puntos > 0) {
            this.puntos--;
        }
      }

      // this.filaAnterior = fila;
      // this.colAnterior = columna;
      
      
      if(this.contadorMostrados > 0 && this.filaAnterior != fila && this.colAnterior != columna ) {
        this.estadoBotones[fila][columna] = "white";
      

        console.log("Numero Elegido: " + this.numeroElegido);
      }
      else{
        this.time = 4;
        this.ponerEnNegro();
      }

      this.numeroElegido = this.posiciones[fila][columna];
      this.filaAnterior = fila;
      this.colAnterior = columna;
      this.contadorMostrados--;


      if(this.chequaerSiEstaCompleto() ) {

        if(this.puntos > this.maximo_puntaje) {
          this.maximo_puntaje = this.puntos;
        }

        this.endGame(this.puntos);
      }

      this.startTimer();
 

    }*/

    chequaerSiEstaCompleto() {

       return this.listaElegidos.length == 8;
    }

  
    endGame(puntos: number) {
      Swal.fire({
        title: 'Excelente!!, hiciste ' + puntos + 'puntos',
        text: 'Querés seguir Jugando?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
  
      }).then((result) => {
  
        if (result.value) {
          this._memoService.saveGame(puntos);
           this.initialize();
           this.reiniciar();
           
        } else {
          this._memoService.saveGame(puntos);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  
 
  


}
