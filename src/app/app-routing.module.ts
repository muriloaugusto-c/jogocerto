import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { QuadrasComponent } from './pages/quadras/quadras.component';
import { ReservarQuadraComponent } from './pages/reservar-quadra/reservar-quadra.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: PaginaInicialComponent, title: 'Centros esportivos' },
    { path: 'quadras/:id', component: QuadrasComponent, title: 'Quadras' },
    { path: 'reservarQuadra/:id', component: ReservarQuadraComponent, title: 'Reservar quadra' },
    { path: 'inventario/:id', component: InventarioComponent, title: 'Inventario do centro esportivo'}
  ] },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'cadastro', component: CadastroUsuarioComponent, title: 'Cadastro' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
