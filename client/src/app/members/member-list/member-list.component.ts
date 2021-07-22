import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { SharedService } from 'src/app/_services/shared.service';
import { SO } from 'src/app/_models/staticObjects';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;

  genderList = SO.genderList;
  pageSizeList = SO.pageSizeList;
  countryList: Array<any> = SO.countryList;
  cities: Array<any>;
  majors: Array<string> = SO.majors;

    
  constructor(private memberService: MembersService, private sharedService: SharedService, private titleService: Title) {
    this.userParams = this.memberService.getUserParams();
    // this.userParams = new UserParams();

  }

  ngOnInit(): void {
    this.resetFilters();
    this.loadMembers();
    this.setTitle("البحث عن مدرسين في أنحاء العالم");
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
    this.addValue();
   
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }




  changeCountry(country) {
    // 
    this.cities = this.countryList.find(con => con.name == country).cities;
    this.userParams.city = this.cities[0];
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  addValue() {
    const searchString = 'مدرس خصوصي في /'+this.userParams.country+
    '/'+this.userParams.city+'/'+this.userParams.gender+'/'+this.userParams.major;
    this.sharedService.updateFooterVal(searchString);
    this.setTitle(searchString);
  }
}
