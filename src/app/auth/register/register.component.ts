import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { _ParseAST } from '@angular/compiler';
import Swal from 'sweetalert2';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.createFormGroup();
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    init_plugins();
  }
  onSubmit() {
    this.authService.registerUser(this.form.value).then(data => {
      debugger
      Swal.fire({
        title: 'Atención',
        text: 'El usuario ha sido guardado',
        icon: 'success',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
    });
  }

}
