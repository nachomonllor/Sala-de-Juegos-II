import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import {JuegoMemotest} from './juego-memotest';
import {MemotestService} from './memotest.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  memo = new JuegoMemotest();
  //_timer: any;
  private maxTime = 30;
  constructor(
    private router: Router,
    public _memotestService: MemotestService) {
  }
  ngOnInit() {
    this.memo.reloj = this.maxTime;
    this.memo.maximo_puntaje = this.memo.puntos;
    this.memo.puntos = 0;
   // this.primos.resetearColorBotones();
    this.memo.nivel = 1;
    //this._timer = setInterval(() => this.contador(), 1000);
  }

  contador() {
    this.memo.reloj--;
    if (this.memo.reloj <= 0) {
     // clearInterval(this._timer);
      this.endGame();
    }
    // this.pasarSiguiente();
  }
  endGame() {
    Swal.fire({
      title: 'Game Over',
      text: 'Â¿Quires seguir Jugando?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SÃ­',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.ngOnInit();
      } else {
        //this._primoService.saveGame(this.primos.puntos);
        //this.router.navigate(['/dashboard']);
      }
    });
  }


}
