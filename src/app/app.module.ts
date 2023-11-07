import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { QuadrasComponent } from './pages/quadras/quadras.component';
import { ConsultarInventarioComponent } from './modais/consultar-inventario/consultar-inventario.component';
import { ReservarQuadraComponent } from './pages/reservar-quadra/reservar-quadra.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroQuadrasComponent } from './modais/cadastro-quadras/cadastro-quadras.component';
import { EditarQuadrasComponent } from './modais/editar-quadras/editar-quadras.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { CadastroCentroEsporivoComponent } from './modais/cadastro-centro-esporivo/cadastro-centro-esporivo.component';
import { EditarCentroEsportivoComponent } from './modais/editar-centro-esportivo/editar-centro-esportivo.component';
import { CadastroItemComponent } from './modais/cadastro-item/cadastro-item.component';
import { EditarItemComponent } from './modais/editar-item/editar-item.component';
import { AgendarHorarioComponent } from './modais/agendar-horario/agendar-horario.component';
import { AceitarAgendamentosComponent } from './modais/aceitar-agendamentos/aceitar-agendamentos.component';
import { RelatoriosComponent } from './modais/relatorios/relatorios.component';
import { GastosComponent } from './modais/relatorios/gastos/gastos.component';
import { ReservarComponent } from './modais/relatorios/reservar/reservar.component';
import { RecebidoComponent } from './modais/relatorios/recebido/recebido.component';
import { AgendamentosComponent } from './modais/relatorios/agendamentos/agendamentos.component';
import { UsuarioMaisRentavelComponent } from './modais/relatorios/usuario-mais-rentavel/usuario-mais-rentavel.component';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
    MatButtonModule,
    CdkAccordionModule,
    MatSlideToggleModule
  ],
  imports: [BrowserAnimationsModule, HttpClientModule],
})
export class Material {}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    PaginaInicialComponent,
    QuadrasComponent,
    ConsultarInventarioComponent,
    ReservarQuadraComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    CadastroQuadrasComponent,
    EditarQuadrasComponent,
    InventarioComponent,
    CadastroCentroEsporivoComponent,
    EditarCentroEsportivoComponent,
    CadastroItemComponent,
    EditarItemComponent,
    AgendarHorarioComponent,
    AceitarAgendamentosComponent,
    RelatoriosComponent,
    GastosComponent,
    ReservarComponent,
    RecebidoComponent,
    AgendamentosComponent,
    UsuarioMaisRentavelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    Material,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
