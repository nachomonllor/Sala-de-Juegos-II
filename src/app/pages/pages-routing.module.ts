import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnagramaComponent } from './anagrama/anagrama.component';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: DashboardComponent
  },
  {
    path: 'anagrama',
    component: AnagramaComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
  // { path: 'users' component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
