import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  cadastrar(){
    return this._router.navigate(['cadastro',{}]);
  }

  logar() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Erro no prenchimento', 'Prrencha todos os campos.', {
        duration: 3000,
      });
      return;
    }

    const usuario = this.loginForm.getRawValue() as IUsuario;
    try {
      this.usuarioService.logar(usuario).subscribe((response) => {
        if (!response.token) {
          this.snackBar.open(
            'Falha na autenticação',
            'Usuário ou senha incorretos.',
            {
              duration: 3000,
            }
          );
        }
      });
    } catch (error) {
      console.log('Erro no login.component', error);
    }
  }
}
