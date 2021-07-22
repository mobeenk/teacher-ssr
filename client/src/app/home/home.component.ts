import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  registerStudentMode = false;
  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  // studnet
  registerStudentToggle() {
    this.registerStudentMode = !this.registerStudentMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    this.registerStudentMode = event;
  }

}
