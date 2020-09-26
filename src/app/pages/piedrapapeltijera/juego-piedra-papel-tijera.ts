//import { Juego } from '../../clases/juego';
//import { JuegoStorage } from '../../clases/juegoStorage';
//import { JuegoAdivina } from '../../clases/juego-adivina';

export class JuegoPiedraPapelTijera  {
  indiceElementoSeleccionado: number;
  // podria ser un array de urls con imagnes de piedra, papel y tijera
  arrayElementos = new Array<string>('piedra', 'papel', 'tijera');
  elementoSeleccionado: string;
  palabraIngresada: string;
  puntajeCompu: number = 0;
  cantidadPuntos:number = 0;
  rondas: number = 0;
  resultadoParcial: string = '';
  resultadoFinal: string = '';
  mostrarSeleccionado: string = '';
  //listaJuegos: Array<Juego>;
  //juego: Juego;

  gano : boolean;

  public verificar(): boolean {
    throw new Error('Method not implemented.');
  }

  constructor(
    
  ) {
    
    this.initialize();
   

  }
 
  

  initialize() {
    this.cantidadPuntos = 0;
    this.puntajeCompu = 0;
   
    this.resultadoFinal = '';
    this.rondas = 0;
  }
  seleccionarElemento() {
    this.indiceElementoSeleccionado = Math.floor(Math.random() * 3);
    this.elementoSeleccionado = this.arrayElementos[this.indiceElementoSeleccionado];
  }
  comparar() {
    if (this.elementoSeleccionado === 'piedra') {
      if (this.palabraIngresada === 'piedra') {
        this.resultadoParcial = 'EMPATE';
      } else if (this.palabraIngresada === 'papel') {
        this.resultadoParcial = 'GANO EL USUARIO';
        this.cantidadPuntos += 10;
      } else {
        this.resultadoParcial = 'GANA LA COMPU';
        this.puntajeCompu += 10;
      }
    } else if (this.elementoSeleccionado === 'papel') {
      if (this.palabraIngresada === 'piedra') {
        this.resultadoParcial = 'GANA LA COMPU';
        this.puntajeCompu += 10;
      } else if (this.palabraIngresada === 'papel') {
        this.resultadoParcial = 'EMPATE';
      } else {
        this.resultadoParcial = 'GANA EL USUARIO';
        this.cantidadPuntos += 10;
      }
    } else if (this.elementoSeleccionado === 'tijera') {
      if (this.palabraIngresada === 'piedra') {
        this.resultadoParcial = 'GANA EL USUARIO';
        this.cantidadPuntos += 10;
      } else if (this.palabraIngresada === 'papel') {
        this.resultadoParcial = 'GANA LA COMPU';
        this.puntajeCompu += 10;
      } else {
        this.resultadoParcial = 'EMPATE';
      }
    }
    this.rondas++;
    if (this.rondas % 3 === 0) {
      if (this.puntajeCompu > this.cantidadPuntos) {
        this.resultadoFinal = 'RESULTADO FINAL: GANO LA COMPU';
        //this.gano = false;
      } else if (this.puntajeCompu < this.cantidadPuntos) {
        this.resultadoFinal = 'RESULTADO FINAL: GANASTE';
       // this.gano = true;
      } else {
        this.resultadoFinal = 'RESULTADO FINAL: EMPATE';
       // this.gano = null;
      }
      // this.finalizar();
      // this.initialize();
    }
  }
  clickPapel() {
    this.palabraIngresada = 'papel';
    this.seleccionarElemento();
    this.comparar();
    // this.elementoSeleccionado ='';
    this.mostrarSeleccionado = '';

    this.mostrarSeleccionado = this.elementoSeleccionado;
    this.elementoSeleccionado = '';
    // Primer asignarpuntaje a la compu y al usuario
    // contador de cantidad rondas
    // puntaje para la compu y el humano.
  }
  clickPiedra() {
    this.palabraIngresada = 'piedra';
    this.seleccionarElemento();
    this.comparar();
    this.mostrarSeleccionado = '';
    this.mostrarSeleccionado = this.elementoSeleccionado;
    this.elementoSeleccionado = '';
  }
  clickTijera() {
    this.palabraIngresada = 'tijera';
    this.seleccionarElemento();
    this.comparar();
    this.mostrarSeleccionado = '';
    this.mostrarSeleccionado = this.elementoSeleccionado;
    this.elementoSeleccionado = '';
  }
  
  
}
