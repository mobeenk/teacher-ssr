
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuestParams } from '../../_models/guestParams';
import { SharedService } from 'src/app/_services/shared.service';
import { SO } from 'src/app/_models/staticObjects';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {
 @Output() footer = new EventEmitter();

  members: Member[];
  pagination: Pagination;
  guestParams: GuestParams;
  user: User;
  
  genderList = SO.genderList;
  pageSizeList = SO.pageSizeList;
  countryList: Array<any> = SO.countryList;
  cities: Array<any>;
  majors: Array<string> = SO.majors;



    
  constructor(private memberService: MembersService, private sharedService: SharedService, private titleService: Title) {
    // this.userParams = this.memberService.getUserParams();
    this.guestParams = new GuestParams();
    // this.sharedService.footerVal = "some val";
    
  }

  ngOnInit(): void {
    this.loadMembers();
    this.setTitle("البحث عن مدرسين في أنحاء العالم");
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadMembers() {
    this.memberService.setUserParams(this.guestParams);
    this.memberService.getGuests(this.guestParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
    // this calls on the shared service to send filter data from main page to footer and title
    this.addValue();
   
  }

  resetFilters() {
    this.guestParams = this.memberService.resetGuestParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.guestParams.pageNumber = event.page;
    this.memberService.setUserParams(this.guestParams);
    this.loadMembers();
  }
  changeCountry(country) {
    // 
    this.cities = this.countryList.find(con => con.name == country).cities;
    this.guestParams.city = this.cities[0];
  }


  addValue() {
   const searchString = 'مدرس خصوصي في /'+this.guestParams.country+
    '/'+this.guestParams.city+'/'+this.guestParams.gender+'/'+this.guestParams.major;
    this.sharedService.updateFooterVal(searchString);
    this.setTitle(searchString);
  }

}
