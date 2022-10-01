import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { LoginComponent } from './pages/login/login.component';
import { EmpresaListaComponent } from './pages/empresa/lista/empresa-lista.component';
import { EmpresaDetalheComponent } from './pages/empresa/detalhe/empresa-detalhe.component';
import { EmpresaAtualizarComponent } from './pages/empresa/atualizar/empresa-atualizar.component';
import { EmpresaAdicionarComponent } from './pages/empresa/adicionar/empresa-adicionar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: '', component: PrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [
      { path: '', component: HomeComponent },
    
      { path: 'vaga', component: HomeComponent }
    ],
  },
  { path: 'empresa-lista', component: EmpresaListaComponent, canActivate: [UsuarioAutenticadoGuard],
  children: [
   
  ]
  },
  { path: 'empresa-adicionar', component: EmpresaAdicionarComponent, canActivate: [UsuarioAutenticadoGuard]},
    { path: 'empresa-atualizar/:id', component: EmpresaAtualizarComponent, canActivate: [UsuarioAutenticadoGuard]},
    { path: 'empresa-detalhe/:id', component: EmpresaDetalheComponent, canActivate: [UsuarioAutenticadoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
