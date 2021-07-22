import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  comp1Val: string;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }
  
  ngAfterContentChecked() {
    this.comp1Val = this.sharedService.footerVal;
  }
}
