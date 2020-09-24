//import { Juego } from '../../clases/juego';
import { Observable } from 'rxjs';

export class JuegoTateti  {
  observervador: Observable<any>;
  jugador = 'O';
  puntos = 0;
  listaPrimos = [];
  posiciones;
  ficha: string;
  gano : boolean ;
  constructor() {
    this.initialize();
  }
  initialize() {
    this.posiciones = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];
  }

  presion(fila: number, columna: number) {
    if (this.posiciones[fila][columna] === '-') {
      this.posiciones[fila][columna] = this.jugador;
      this.checkWinner('X');
      this.checkWinner('O');
      this.cambiarJugador();
    }
  }

  cambiarJugador() {
    if (this.jugador === 'O') {
      this.jugador = 'X';
    } else {
      this.jugador = 'O';
    }
  }

  checkWinner(ficha: string) {
    if (this.posiciones[0][0] === ficha
      && this.posiciones[0][1] === ficha
      && this.posiciones[0][2] === ficha
    ) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[1][0] === ficha
      && this.posiciones[1][1] === ficha && this.posiciones[1][2] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[2][0] === ficha && this.posiciones[2][1] === ficha && this.posiciones[2][2] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[0][0] === ficha && this.posiciones[1][0] === ficha && this.posiciones[2][0] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[0][1] === ficha && this.posiciones[1][1] === ficha && this.posiciones[2][1] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[0][2] === ficha && this.posiciones[1][2] === ficha && this.posiciones[2][2] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[0][0] === ficha && this.posiciones[1][1] === ficha && this.posiciones[2][2] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
    if (this.posiciones[0][2] === ficha && this.posiciones[1][1] === ficha && this.posiciones[2][0] === ficha) {
      this.puntos++;
      this.ficha = ficha;
      this.gano = true;
    }
  }
}