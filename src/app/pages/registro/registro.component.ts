import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.models';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: false;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    else {
      this.setUsuario();
      Swal.fire({
        icon: 'success',
        text: 'Registro guardado con éxito'
      });
    }

  }

  setUsuario() {
    const datos = {
      email: this.usuario.email,
      password: this.usuario.password,
      nombre: this.usuario.nombre
    };
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.authService.nuevoUsuario(datos).subscribe(data => {
      if (data) {
        console.log(data);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigate(['/login']);
      }
    }, e => {
      console.log(e.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: e.error.message
      });
    });

  }


}
