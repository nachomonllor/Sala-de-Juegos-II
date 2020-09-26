//import { Juego } from '../../clases/juego';

import { PrimoService } from './primo.service';

export class JuegoPrimos  {
  listaPrimos = [];

  // _timer:any;

  listaAleatorios: Array<number>;
  // tslint:disable-next-line: member-ordering
  estadoBotones: string[][] = [
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
  ];
  posiciones: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  totalPrimos = 0;
  limite = 30;
  reloj = 25;
  nivel = 1;
  puntos = 0;
  maximo_puntaje = 0;
  //juego: Juego;
  // jugador:Jugador;


  //listaJuegos: Juego[] = [];

  constructor() {

    // clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    this.resetearColorBotones();
    this.initialize();

    /*
    this.listaJuegos = new Array<Juego>();
    // this.listaJuegos = JSON.parse(localStorage.getItem('lista'));

    let aux: Array<Juego> = JSON.parse(localStorage.getItem('lista'));
    if (aux != null) {
      for (let i = 0; i < aux.length; i++) {
        this.listaJuegos.push(aux[i]);
      }
    }*/

  }
  initialize() {
    //  clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    this.totalPrimos = 0;
    //this.limite = 20;
    this.reloj = 30;
    //this.puntos =0;
    this.listaPrimos = new Array<number>();
    this.cribaDeEratostenes(this.limite);
    this.listaAleatorios = new Array<number>();
    //this.estadoBotones = new Array<string>();


    for (let i = 0; i < 25; i++) {
      this.listaAleatorios.push(Math.floor(Math.random() * this.limite) + 1);
      // this.estadoBotones.push(this.listaAleatorios[i].toLocaleString());
      if (this.listaPrimos.indexOf(this.listaAleatorios[i]) >= 0) {
        this.totalPrimos++;
      }
    }
    this.resetearColorBotones();
    let indice = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        this.posiciones[i][j] = this.listaAleatorios[indice];
        indice++;
      }
    }
  }

  // para cargar a los numeros primos en una lista
  cribaDeEratostenes(n: number) {
    let primos = new Array<Boolean>();
    for (let i = 0; i < n; i++) {
      primos.push(true);
    }

    for (let p = 2; p * p <= n; p++) {
      if (primos[p] === true) {
        for (let i = p * p; i <= n; i += p) {
          primos[i] = false;
        }
      }
    }

    for (let i = 2; i <= n; i++) {
      if (primos[i] === true) {
        this.listaPrimos.push(i);
      }
    }
  }
  subirDeNivel() {
    this.limite += 50;
    this.nivel++;
    // clearInterval(this._timer);
    // this._timer = setInterval(() => this.contador(), 1000);
    this.resetearColorBotones();
    if (this.puntos > this.maximo_puntaje) {
      this.maximo_puntaje = this.puntos;
    }
  }

  resetearColorBotones() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        this.estadoBotones[i][j] = 'white';
      }
    }
  }
  contador() {
    //clearInterval(myVar);
    this.reloj--;
    if (this.reloj <= 0) {
      this.nivel = 1;
      this.limite = 20;
      if (this.puntos > this.maximo_puntaje) {
        this.maximo_puntaje = this.puntos;
      }
      this.puntos = 0;
      //  clearInterval(this._timer);
      this.resetearColorBotones();
      // alert('Se te acabo el tiempo');
      this.initialize();
    }
  }
  presion(fila: number, columna: number) {
    if (this.listaPrimos.indexOf(this.posiciones[fila][columna]) >= 0) {
      this.estadoBotones[fila][columna] = 'green';
      this.totalPrimos--;
      this.puntos += 10;
      if (this.totalPrimos === 0) {
        this.resetearColorBotones();
        this.subirDeNivel();
        this.initialize();
      }
    } else {
      this.estadoBotones[fila][columna] = 'red';
      this.reloj -= 3; // los errores cuestan tiempo
    }
  }

  /*

  finalizar() {
    this.juego = new JuegoPrimos();
    this.juego.nombre = 'Encontrar Primos';
    this.juego.cantidadPuntos = this.puntos;
    this.juego.hora = new Date();
    this.juego.jugador = this.nombre;
    this.listaJuegos.push(this.juego);
    localStorage.setItem('lista', JSON.stringify(this.listaJuegos));
    console.log(this.listaJuegos);
  }*/


}
