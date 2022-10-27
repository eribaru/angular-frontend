import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import {TipoPerfilEnum, TipoPerfilMapping} from "../../interfaces/TipoPerfil.enum";
import Validation from "../../utils/Validation";
import { UsuarioService } from '../../services/usuario.service';
import {FormControl} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  tipoControl = new FormControl<TipoPerfilEnum | null>(null, Validators.required);

  cadastroForm: FormGroup = new FormGroup({});
  public TipoPerfilMapping = TipoPerfilMapping;

  public tipos = Object.values(TipoPerfilEnum);

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  get f() {
    return this.cadastroForm.controls;
  }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      date_of_birth: [null, Validators.required],
      password: ['', [ Validators.required,  Validators.minLength(6), Validators.maxLength(40) ] ],
      confirmPassword: ['', Validators.required],
    },{
      validators: [Validation.match('password', 'confirmPassword'),Validation.cpf('cpf')]
    });
  }
  voltar() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['']);
  }


  cadastrar() {
    if (this.cadastroForm.invalid && this.tipoControl.invalid) {
      if(this.cadastroForm.invalid){
        Object.keys(this.cadastroForm.controls).forEach(field => { // {1}
          const control = this.cadastroForm.get(field);            // {2}
          if(control!=null)
            control.markAsTouched({ onlySelf: true });       // {3}
        });
      }
      if(this.tipoControl.invalid) {
        this.tipoControl.markAsTouched({ onlySelf: true });
      }
      this.snackBar.open('Erro no prenchimento', 'Prrencha todos os campos.', {
        duration: 3000,
      });
      return;
    }




    const usuario = this.cadastroForm.getRawValue() as IUsuario;
    usuario.email = usuario.username;
    const tipoSelecionado = this.tipoControl.value as TipoPerfilEnum;
    console.log(tipoSelecionado);
    usuario.tipo  = TipoPerfilMapping[tipoSelecionado];
    try {
      this.usuarioService.cadastrar(usuario).subscribe((response) => {

        if ((response  as   IUsuario).id ) {

          this.snackBar.open(
            'Sucesso',
            'Usuário cadastrado com sucesso.',
            {
              duration: 3000,
            }
          );
          this.voltar();
        }else{
          this.snackBar.open(
            'Falha no cadastro',
            'Verifique os campos e tente novamente.',
            {
              duration: 3000,
            }
          );
        }
      });
    } catch (error) {
      console.log('Erro no cadastroForm.component', error);
    }
  }
}

