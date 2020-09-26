import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {JuegoTateti} from './juego-tateti';
import {TatetiService} from './tateti.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit, OnDestroy {
  tateti: JuegoTateti;
  observador: Observable<any>;
  timer: any;
  subscription: Subscription;
  constructor(private router: Router, public _tatetiService: TatetiService) {
    this.tateti = new JuegoTateti();
    this.setTimer();
  }
  ngOnDestroy() {
    // desubscribo las suscripciones para no tenerlas escuchando y que no se vuelvan a subscribir 
    // repetidamente sino se puede caer en un memory leak si no la desubscribo
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setTimer() {
    //this.tateti.gano = false;
    this.observador = new Observable(subscriber => {
      this.timer = setInterval(() => {
        if ( this.tateti.gano ) {
          clearInterval(this.timer);
          subscriber.next(this.tateti.ficha);
        }
      }, 300);
    });
    this.subscription = this.observador.subscribe(data => {
      this.endGame(data);
    });
  }

  ngOnInit(): void {
  }

  endGame(data) {
    Swal.fire({
      title: `La ficha ${data} ha ganado`,
      text: '¿Quires seguir Jugando?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.tateti = new JuegoTateti();
        this.tateti.initialize();
        this.setTimer();
      } else {
        this.subscription.unsubscribe();
        this._tatetiService.saveGame(this.tateti.puntos);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}