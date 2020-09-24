import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { AuthModule } from './auth/auth.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

// Módulos de AngularFire
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './shared/material.module';


//import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
  

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
   // CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
