import { Component, OnInit } from '@angular/core';
import { AnagramaService } from './anagrama.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styles: [
  ]
})
export class AnagramaComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    public anagramaService: AnagramaService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    const palabraDesordenada = this.anagramaService.desordenarPalabra();

    this.form = new FormGroup({
      palabraOrdenada: new FormControl(null, Validators.required),
      palabraDesordenada: new FormControl(palabraDesordenada, Validators.required),
    });
  }
  onSubmit() {
    this.anagramaService.verifyResult(this.form.get('palabraOrdenada').value);
    this.ngOnInit();
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
      debugger
      if (result.value) {
        this.ngOnInit();
      } else {
        this.anagramaService.saveGame().then(() => {
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
