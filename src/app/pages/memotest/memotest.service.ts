import { Injectable } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MemotestService  {
 // router: any;
 
 private user: Observable<firebase.User | null >;
  constructor(private router: Router, private firestore: AngularFirestore,    
    private authService: AuthService  ) {

  }
   
  //memo = new JuegoMemotest(this);

  saveGame(puntos: number) {
    const partida: Game = {
      nameGame: 'Memotest',
      points: puntos,
      date: new Date(),
     // player: 'nmonllor',
     player: firebase.auth().currentUser.email
    };
    return this.firestore.collection('lista').add({...partida});
  }
   
     
  
  }

