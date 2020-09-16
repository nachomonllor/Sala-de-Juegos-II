import { environment } from '../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { User } from '../users.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {
  @Output() userEdited = new EventEmitter();

  users: User[];

  url = `${environment.apiUrl}/api/user`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.initialize();
  }
  initialize(): void {
    this.httpService.get(this.url)
    .subscribe((users: any) => {
      this.users = users;
    });
  }
  onEdit(id): void {
    this.userEdited.emit(id);
  }
  onDelete(id): void {
    const url = `${this.url}/${id}`;
    this.httpService.delete(url).subscribe(resp => {
      Swal.fire('Atención', 'El usuario ha sido eliminado', 'success');
    });
  }
}
