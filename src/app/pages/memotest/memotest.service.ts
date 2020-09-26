import { Injectable } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { JuegoMemotest } from './juego-memotest';

@Injectable({
  providedIn: 'root'
})

export class MemotestService  {
  router: any;
 

  constructor(private firestore: AngularFirestore) {

  }
   
  memo = new JuegoMemotest(this);

  saveGame(puntos: number) {
    const partida: Game = {
      nameGame: 'Memotest',
      points: puntos,
      date: new Date(),
      player: 'nmonllor',
    };
    return this.firestore.collection('lista').add({...partida});
  }
  endGame(puntos: number) {
    Swal.fire({
      title: 'Game Over',
      text: 'Querés seguir Jugando?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
         this.memo.ponerEnNegro();
         this.memo.initialize();
      } else {
        this.saveGame(puntos);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  
     
  
  }

