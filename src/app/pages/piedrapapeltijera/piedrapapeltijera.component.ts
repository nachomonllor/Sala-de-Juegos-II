import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from './juego-piedra-papel-tijera';
import { PptService } from './ppt.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-piedrapapeltijera',
  templateUrl: './piedrapapeltijera.component.html',
  styleUrls: ['./piedrapapeltijera.component.css']
})
export class PiedrapapeltijeraComponent {
  ppt: JuegoPiedraPapelTijera;
  observador: Observable<any>;
  timer: any;
  subscription: Subscription;
  private user: Observable<firebase.User | null >;

  constructor(private router: Router, public _pptService: PptService) {
    this.ppt = new JuegoPiedraPapelTijera();
    this.setTimer();
  }
  setTimer() {
    this.ppt.gano = false;
    this.observador = new Observable(subscriber => {
      this.timer = setInterval(() => {
        if ( this.ppt.rondas === 3 ) {
          clearInterval(this.timer);
          subscriber.next(this.ppt.gano);
        }
      }, 300);
    });
    this.subscription = this.observador.subscribe(data => {
      this.endGame(data);
    });
  }
  endGame(data) {
    const result = data ? 'HUMANO'
                        : !data
                           ? 'COMPUTADOR'
                        : 'EMPATE';
    Swal.fire({
      title: `El ganador fue: ${result}`,
      text: '¿Quires seguir Jugando?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.ppt.initialize();
        this.setTimer();
      } else {
        this.subscription.unsubscribe();
        this._pptService.saveGame(this.ppt.cantidadPuntos);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
