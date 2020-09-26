import { TatetiComponent } from './tateti/tateti.component';
import { PiedrapapeltijeraComponent } from './piedrapapeltijera/piedrapapeltijera.component';
import { PrimosComponent } from './primos/primos.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnagramaComponent } from './anagrama/anagrama.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { AgilidadAritmeticaComponent } from './agilidad-aritmetica/agilidad-aritmetica.component';
import { ListadoComponent } from './listado/listado.component';
import { MemotestComponent } from './memotest/memotest.component';


@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AnagramaComponent,
    AgilidadAritmeticaComponent,
    PrimosComponent,
    PiedrapapeltijeraComponent,
    TatetiComponent,
    ListadoComponent,
    MemotestComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class PagesModule { }
