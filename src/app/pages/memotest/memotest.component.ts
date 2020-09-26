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
