import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import {TipoPerfilEnum, TipoPerfilMapping} from "../../interfaces/TipoPerfil.enum";
import { UsuarioService } from '../../services/usuario.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  tipoControl = new FormControl<TipoPerfilEnum | null>(null, Validators.required);
  confirmeSenhaControl = new FormControl<String | null>(null, Validators.required);
  cadastroForm: FormGroup = new FormGroup({});
  public TipoPerfilMapping = TipoPerfilMapping;

  public tipos = Object.values(TipoPerfilEnum);

  constructor(
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
      password: [null, Validators.required],
      cpf: [null, Validators.required],
      date_of_birth: [null, Validators.required],
    });
  }

  get senhasNaoConferem() {
    return (
      true
      //this.cadastroForm.controls['passowrd'].value !=      this.confirmeSenhaControl.value
    );
  }

  cadastrar() {
    if (this.cadastroForm.invalid) {
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
        if (!response.token) {
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

