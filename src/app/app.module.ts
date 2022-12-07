import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {PrincipalComponent} from './pages/compartilhado/principal/principal.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {TokenInterceptor} from './services/interceptors/token.interceptor';
import {GlobalErrorHandler} from './services/handlers/global.handler';
import {LoginComponent} from './pages/login/login.component';
import {CadastroComponent} from './pages/cadastro/cadastro.component';
import {HomeComponent} from './pages/home/home.component';
import {EmpresaListaComponent} from './pages/empresa/lista/empresa-lista.component';
import {EmpresaDetalheComponent} from './pages/empresa/detalhe/empresa-detalhe.component';
import {EmpresaAtualizarComponent} from './pages/empresa/atualizar/empresa-atualizar.component';
import {EmpresaAdicionarComponent} from './pages/empresa/adicionar/empresa-adicionar.component';
import {VagaListaComponent} from './pages/vaga/lista/vaga-lista.component';
import {VagaDetalheComponent} from './pages/vaga/detalhe/vaga-detalhe.component';
import {VagaAtualizarComponent} from './pages/vaga/atualizar/vaga-atualizar.component';
import {VagaAdicionarComponent} from './pages/vaga/adicionar/vaga-adicionar.component';
import {CurriculoListaComponent} from './pages/curriculo/lista/curriculo-lista.component';
import {CurriculoDetalheComponent} from './pages/curriculo/detalhe/curriculo-detalhe.component';
import {CurriculoAtualizarComponent} from './pages/curriculo/atualizar/curriculo-atualizar.component';
import {CurriculoAdicionarComponent} from './pages/curriculo/adicionar/curriculo-adicionar.component';
import {EnderecoListaComponent} from './pages/endereco/lista/endereco-lista.component';
import {EnderecoDetalheComponent} from './pages/endereco/detalhe/endereco-detalhe.component';
import {EnderecoAtualizarComponent} from './pages/endereco/atualizar/endereco-atualizar.component';
import {EnderecoAdicionarComponent} from './pages/endereco/adicionar/endereco-adicionar.component';
import {InscricaoDetalheComponent} from './pages/inscricao/detalhe/inscricao-detalhe.component';
import {InscricaoListaComponent} from './pages/inscricao/lista/inscricao-lista.component';
import {InscricaoAtualizarComponent} from './pages/inscricao/atualizar/inscricao-atualizar.component';

import {NgxMaskModule} from 'ngx-mask';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    EmpresaDetalheComponent,
    EmpresaListaComponent,
    EmpresaAdicionarComponent,
    EmpresaAtualizarComponent,
    VagaDetalheComponent,
    VagaListaComponent,
    VagaAdicionarComponent,
    VagaAtualizarComponent,
    CurriculoDetalheComponent,
    CurriculoListaComponent,
    CurriculoAdicionarComponent,
    CurriculoAtualizarComponent,
    EnderecoDetalheComponent,
    EnderecoListaComponent,
    EnderecoAdicionarComponent,
    EnderecoAtualizarComponent,
    InscricaoDetalheComponent,
    InscricaoListaComponent,
    InscricaoAtualizarComponent,
    PrincipalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
