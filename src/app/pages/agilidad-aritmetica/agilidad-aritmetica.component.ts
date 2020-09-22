import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgilidadAritmeticaService } from './agilidad-aritmetica.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styles: [
  ]
})
export class AgilidadAritmeticaComponent implements OnInit {
  form: FormGroup;
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  ocultarVerificar: boolean;
  isValid: number = -1;
  maxTime = 10;
  reloj: number = this.maxTime;
  private subscription: Subscription;
  _timer: any;
  constructor(
    private router: Router,
    public agilidadAritmeticaService: AgilidadAritmeticaService) {
    this.createForm();
    this.newGame(1, 10);
  }
  ngOnInit() {}
  createForm() {
    this.form = new FormGroup({
      calculo: new FormControl(null, Validators.required),
      resultado: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.isValid = this.agilidadAritmeticaService.verifyResult(this.form.get('resultado').value);
    if (this.isValid) {
      this.subirDeNivel();
      this.agilidadAritmeticaService.cantidadPuntos += 20;
      this.agilidadAritmeticaService.cantidadPuntos = this.agilidadAritmeticaService.cantidadPuntos <= 0
        ? 0 : this.agilidadAritmeticaService.cantidadPuntos;
    }
  }
  newGame(nivel, limite) {
    this.reloj = this.maxTime;
    this.agilidadAritmeticaService.nivel = nivel;
    this.agilidadAritmeticaService.limite = limite; // limite de los numeros aleatorios
    const calculo = this.agilidadAritmeticaService.getCalulo();
    this.form.get('calculo').setValue(calculo);
    this.form.get('resultado').setValue(null);
    this.agilidadAritmeticaService.nivel = 1;
    if (!this._timer) {
      this._timer = setInterval(() => this.checkTimeOver(), 1000);
    }
  }

  private stopTimer() {
    clearInterval(this._timer);
  }

  checkTimeOver() {
    //clearInterval(myVar);
    // clearInterval(this._timer);
    this.reloj--;
    if (this.reloj <= 0) {
      this.stopTimer();
      Swal.fire({
        title: 'Game Over',
        text: '¿Quires seguir Jugando?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.newGame(1, 10);
        } else {
          this.agilidadAritmeticaService.gameOver();
          this.router.navigate(['/Principal']);
        }
      });
    }
  }

  subirDeNivel() {
    this.newGame(
      this.agilidadAritmeticaService.nivel++,
      this.agilidadAritmeticaService.limite += 20
    );
    //  this.clearTimer();
    //this.resetearColorBotones();
    if (this.agilidadAritmeticaService.cantidadPuntos > this.agilidadAritmeticaService.maximo_puntaje) {
      this.agilidadAritmeticaService.maximo_puntaje = this.agilidadAritmeticaService.cantidadPuntos;
    }
  }

  endGame() {
    Swal.fire({
      title: 'Atención',
      text: '¿Quires seguir Jugando?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.ngOnInit();
      } else {
        this.agilidadAritmeticaService.saveGame().then(() => {
          Swal.fire({
            title: 'Atención',
            text: 'La partida ha sido guardada',
            icon: 'success'
          }
          )
          this.router.navigate(['/']);
        });
      }
    });
  }
}
