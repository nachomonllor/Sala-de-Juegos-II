import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from "./users.component";
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserListComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})

export class UsersModule { }
