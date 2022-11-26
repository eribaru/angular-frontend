import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpresaListaComponent } from './pages/empresa/lista/empresa-lista.component';
import { EmpresaDetalheComponent } from './pages/empresa/detalhe/empresa-detalhe.component';
import { EmpresaAtualizarComponent } from './pages/empresa/atualizar/empresa-atualizar.component';
import { EmpresaAdicionarComponent } from './pages/empresa/adicionar/empresa-adicionar.component';
import { VagaListaComponent } from './pages/vaga/lista/vaga-lista.component';
import { VagaDetalheComponent } from './pages/vaga/detalhe/vaga-detalhe.component';
import { VagaAtualizarComponent } from './pages/vaga/atualizar/vaga-atualizar.component';
import { VagaAdicionarComponent } from './pages/vaga/adicionar/vaga-adicionar.component';
import { CurriculoListaComponent } from './pages/curriculo/lista/curriculo-lista.component';
import { CurriculoDetalheComponent } from './pages/curriculo/detalhe/curriculo-detalhe.component';
import { CurriculoAtualizarComponent } from './pages/curriculo/atualizar/curriculo-atualizar.component';
import { CurriculoAdicionarComponent } from './pages/curriculo/adicionar/curriculo-adicionar.component';
import { EnderecoListaComponent } from './pages/endereco/lista/endereco-lista.component';
import { EnderecoDetalheComponent } from './pages/endereco/detalhe/endereco-detalhe.component';
import { EnderecoAtualizarComponent } from './pages/endereco/atualizar/endereco-atualizar.component';
import { EnderecoAdicionarComponent } from './pages/endereco/adicionar/endereco-adicionar.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: '', component: PrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'vaga', component: HomeComponent }
    ],
  },
  { path: 'empresa-lista', component: EmpresaListaComponent, canActivate: [UsuarioAutenticadoGuard],
  children: [  ]  },
  { path: 'empresa-adicionar', component: EmpresaAdicionarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'empresa-atualizar/:id', component: EmpresaAtualizarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'empresa-detalhe/:id', component: EmpresaDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'vaga-lista', component: VagaListaComponent, canActivate: [UsuarioAutenticadoGuard],
  children: [  ]  },
  { path: 'vaga-adicionar', component: VagaAdicionarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'vaga-atualizar/:id', component: VagaAtualizarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'vaga-detalhe/:id', component: VagaDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'curriculo-lista', component: CurriculoListaComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [  ]  },
  { path: 'curriculo-adicionar', component: CurriculoAdicionarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'curriculo-atualizar/:id', component: CurriculoAtualizarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'curriculo-detalhe/:id', component: CurriculoDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'endereco-lista', component: EnderecoListaComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [  ]  },
  { path: 'endereco-adicionar', component: EnderecoAdicionarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'endereco-atualizar/:id', component: EnderecoAtualizarComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'endereco-detalhe/:id', component: EnderecoDetalheComponent, canActivate: [UsuarioAutenticadoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
