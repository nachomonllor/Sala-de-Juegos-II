import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import {JuegoMemotest} from './juego-memotest';
import {MemotestService} from './memotest.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  memo = new JuegoMemotest(this._memotestService);
  //_timer: any;
  private maxTime = 30;
  constructor(
    private router: Router,
    public _memotestService: MemotestService) {
  }

  ngOnInit() {

  }

  
  
 
  


}
