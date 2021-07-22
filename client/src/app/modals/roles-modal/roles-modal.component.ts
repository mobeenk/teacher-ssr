import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  // Because we need to emit to parent what roles we have to update from this modal
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[]; 

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles() {
    // emit those roles then hide modal
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
