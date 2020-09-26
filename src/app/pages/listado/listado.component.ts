import { Component, OnInit, ViewChild } from '@angular/core';
import { ListadoService } from './listado.service';
import { Game } from '../../interfaces/game.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  games: Game[] = [];
  dataSource: MatTableDataSource<Game>;
  displayedColumns: string[] = ['jugador', 'juego', 'puntos', 'fecha'];
  constructor(private listadoService: ListadoService) { }

  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.listadoService.getListado().subscribe((data: Game[]) => {
      this.games = data;
      this.dataSource = new MatTableDataSource<Game>(data);
    });
  }

}
