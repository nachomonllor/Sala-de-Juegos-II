import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../../interfaces/game.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  constructor(
    private db: AngularFirestore
  ) {
  }
  getListado(): Observable<Game[]> {
    return this.db.collection('lista')
    .snapshotChanges()
    .pipe(
      map(snaps => {
        //debugger
        return snaps.map(snap => {
          return  {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as {}
          } as Game;
        });
      })
    );

  }

}
