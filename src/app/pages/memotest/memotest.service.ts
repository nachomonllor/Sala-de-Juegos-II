import { Injectable } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MemotestService  {
 // router: any;
 

  constructor(private router: Router, private firestore: AngularFirestore) {

  }
   
  //memo = new JuegoMemotest(this);

  saveGame(puntos: number) {
    const partida: Game = {
      nameGame: 'Memotest',
      points: puntos,
      date: new Date(),
      player: 'nmonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }
   
     
  
  }

