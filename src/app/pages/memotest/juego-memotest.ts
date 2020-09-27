import { MemotestService } from './memotest.service';

export class JuegoMemotest  {
 // listaPrimos = [];

  // _timer:any;
/*
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

  totalPrimos = 0;
  limite = 30;
  reloj = 25;
  nivel = 1;
  puntos = 0;
  maximo_puntaje = 0;

  numeroElegido: number=-1;
  listaElegidos = new Array<number>();
 

  constructor (private _memoService: MemotestService ) {

    // clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    //this.resetearColorBotones();
    this.initialize();
    this.ponerEnNegro();
  }
  initialize() {
    //  clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    
    for(let i =0; i<4; i++) {
      for(let j =0; j<4; j++) {
        this.posiciones[i][j] = -1;
      }
    }

    this.totalPrimos = 0;
    this.limite = 30;
    this.reloj = 25;
    this.nivel = 1;
    this.puntos = 0;
    this.maximo_puntaje = 0;

    this.numeroElegido =-1;
    this.listaElegidos = new Array<number>();

   // this.reloj = 30;

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

  //pongo en negro el tablero entero
 ponerEnNegro(){

   
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
         if(this.listaElegidos.indexOf(this.posiciones[i][j]) < 0 ) {
            this.estadoBotones[i][j] = 'black';
         }

      }
    }
 }

 reiniciar(){

   
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        
          this.estadoBotones[i][j] = 'black';
          this.posiciones[i][j] = 0;

    }
  }
}

    contadorMostrados = 2;
 
    time: number = 0;
    interval;
    play = false;
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

      if(this.posiciones[fila][columna] == this.numeroElegido) {
        //this.estadoBotones[fila][columna] = "white";
        this.listaElegidos.push(this.posiciones[fila][columna] ) ;
        this.numeroElegido = -1;
        this.puntos+=10;
      }
      else{
        if(this.puntos > 0) {
            this.puntos--;
        }
      }
      
      if(this.contadorMostrados > 0) {
        this.estadoBotones[fila][columna] = "white";
        this.numeroElegido = this.posiciones[fila][columna];
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

        this._memoService.endGame(this.puntos);
      }

      this.startTimer();
 

    }

    chequaerSiEstaCompleto() {

       return this.listaElegidos.length == 2;
    }

    */

}
