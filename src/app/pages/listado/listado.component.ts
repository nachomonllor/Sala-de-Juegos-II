import { Component, OnInit } from '@angular/core';
import { ListadoService } from './listado.service';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  games: Game[] = [];
  constructor(private listadoService: ListadoService) { }

  ngOnInit(): void {
    this.listadoService.getListado().subscribe((data: Game[]) => {
      this.games = data;
    });
  }

}
