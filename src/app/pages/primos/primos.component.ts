import { Component, OnInit } from '@angular/core';
import { JuegoPrimos } from './juego-primos';
import Swal from 'sweetalert2';
import { PrimoService } from './primo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primos',
  templateUrl: './primos.component.html',
  styleUrls: ['./primos.component.css']
})
export class PrimosComponent implements OnInit {
  primos = new JuegoPrimos();
  _timer: any;
  private maxTime = 30;
  constructor(
    private router: Router,
    public _primoService: PrimoService) {
  }
  ngOnInit() {
    this.primos.reloj = this.maxTime;
    this.primos.maximo_puntaje = this.primos.puntos;
    this.primos.puntos = 0;
    this.primos.resetearColorBotones();
    this.primos.nivel = 1;
    this._timer = setInterval(() => this.contador(), 1000);
  }

  contador() {
    this.primos.reloj--;
    if (this.primos.reloj <= 0) {
      clearInterval(this._timer);
      this.endGame();
    }
    // this.pasarSiguiente();
  }
  endGame() {
    Swal.fire({
      title: 'Game Over',
      text: '¿Quires seguir Jugando?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.ngOnInit();
        this.primos.initialize();
      } else {
        this._primoService.saveGame(this.primos.puntos);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
