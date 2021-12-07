import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    else {
      this.setAuth();
    }
  }

  setAuth() {
    const login = {
      email: this.usuario.email,
      password: this.usuario.password,
    };
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.login(login).subscribe(data => {
      if (data) {
        console.log(data);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigate(['/home']);
      }
    }, e => {
      console.log(e.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: e.error.message
      });
    });
  }
}
