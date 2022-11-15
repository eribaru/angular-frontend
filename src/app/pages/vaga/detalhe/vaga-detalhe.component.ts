import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IVaga} from "../../../interfaces/IVaga";
import {IEmpresa} from "../../../interfaces/IEmpresa";

@Component({
  selector: 'app-vaga-detalhe',
  templateUrl: './vaga-detalhe.component.html',
  styleUrls: ['./vaga-detalhe.component.css']
})
export class VagaDetalheComponent implements OnInit {
  isEditable = false;
  public vaga!: IVaga;
  vagaForm: FormGroup = new FormGroup({});
  empresasControl = new FormControl<string | IEmpresa>('');

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private location: Location,
              private apiService: ApiService,
              private snackBar: MatSnackBar) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null) {
      const state = navigation.extras.state as { example: IVaga };
      if (state != null && state.example != null) {
        this.vaga = state.example;
      }
    }}



  ngOnInit(): void {
    this.vagaForm = this.formBuilder.group({
      //cargo: [null],
      area: [ null],
      resposabilidades: [null],
      requisitos: [null],
      pcsc: [null],
      remoto: [null],
      local: [null],
      tipo_contrato: [null],
      contratacao: [null],
      carga_horaria: [null],
      data_cadastro: [null],
      data_fechamento: [null],
    });

      if(this.vaga!=null ){
        this.vagaForm.controls["area"].disable();
        this.vagaForm.controls["area"].setValue(this.vaga.area);
        this.vagaForm.controls["resposabilidades"].disable();
        this.vagaForm.controls["resposabilidades"].setValue(this.vaga.resposabilidades);
        this.vagaForm.controls["requisitos"].disable();
        this.vagaForm.controls["requisitos"].setValue(this.vaga.requisitos);
        this.vagaForm.controls["pcsc"].disable();
        this.vagaForm.controls["pcsc"].setValue(this.vaga.pcsc);
        this.vagaForm.controls["remoto"].disable();
        this.vagaForm.controls["remoto"].setValue(this.vaga.remoto);
        this.vagaForm.controls["local"].disable();
        this.vagaForm.controls["local"].setValue(this.vaga.local);
        this.vagaForm.controls["carga_horaria"].disable();
        this.vagaForm.controls["carga_horaria"].setValue(this.vaga.carga_horaria);
        this.vagaForm.controls["contratacao"].disable();
        this.vagaForm.controls["contratacao"].setValue(this.vaga.contratacao);
        this.vagaForm.controls["tipo_contrato"].disable();
        this.vagaForm.controls["tipo_contrato"].setValue(this.vaga.tipo_contrato);
        this.vagaForm.controls["data_cadastro"].disable();
        this.vagaForm.controls["data_cadastro"].setValue(this.vaga.data_cadastro);
        this.vagaForm.controls["data_fechamento"].disable();
        this.vagaForm.controls["data_fechamento"].setValue(this.vaga.data_fechamento);

    }

  }

  getTitulo():string {
    if(this.vaga && this.vaga.cargo) {
      return  this.vaga.cargo;
    }else{
      return "";
    }
  }


  voltar(): void {
    this.location.back();
  }

  public redirectToUpdate = () => {
    //dataSource.
    return this.router.navigate(['vaga-atualizar/' + this.vaga.id],{ state: { example: this.vaga} } );
  };

  public excluir = () => {
    this.apiService.delete('vagas/' + this.vaga.id).subscribe((data) => {
      this.snackBar.open('Sucesso', 'Item foi apagado', {
        duration: 3000,
      });
      this.reloadComponent();
    });
  };


  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['vaga-lista']).then();
  }
}
