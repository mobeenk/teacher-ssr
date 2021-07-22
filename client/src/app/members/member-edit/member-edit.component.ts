import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;


  countryList: Array<any> = [
    { name: 'الكل', cities: [  'الكل'] },
    { name: 'السعودية', cities: ['الدمام', 'الرياض', 'جدة','نجران'] },
    { name: 'أمريكا', cities: ['واشنطن', 'نيويورك','أخرى'] },
    { name: 'كندا', cities: [ 'تورونتو','أخرى'] },
    { name: 'أمريكا الجنوبية', cities:['البرازيل','أخرى'] },
    { name: 'أوروبا', cities: ['السويد','ألمانيا', 'فرنسا', 'إسبانيا','أخرى'] },
    { name: 'استراليا', cities: ['سيدني','أخرى'] },
    { name: 'مصر', cities: ['القاهرة','أخرى'] },
    { name: 'الكويت', cities: ['الكويت','أخرى'] },
    { name: 'الإمارات', cities: ['الشارقة', 'دبي', 'أبو ظبي','أخرى'] },
    { name: 'البحرين', cities: [ 'المنامة', 'أخرى'] },
    { name: 'عمان', cities: [ 'مسقط', 'أخرى'] },
    { name: 'اليمن', cities: [ 'صنعاء', 'أخرى'] },
    { name: 'سوريا', cities: [ 'حلب', 'دمشق' ,'حمص', 'حماة' ,'دير الزور', 'أخرى'] },
    { name: 'لبنان', cities: ['طرابلس', 'بيروت','أخرى'] },
    { name: 'الأردن', cities: [ 'عمان', 'أخرى'] },
    { name: 'العراق', cities: [ 'بغداد', 'أخرى'] },
    { name: 'فلسطين', cities: [ 'القدس', 'أخرى'] },
    { name: 'الجزائر', cities: [ 'الجزائر', 'أخرى'] },
    { name: 'المغرب', cities: [ 'الدار البيضاء', 'أخرى'] },
    { name: 'السودان', cities: [ 'الخرطوم', 'أخرى'] },
    { name: 'ليبيا', cities: [  'أخرى'] },
    { name: 'تونس', cities: [  'أخرى' , 'تونس'] }
  ];
  cities: Array<string>;
  majors: Array<string> = ['فيزياء', 'كيمياء', 'رياضيات', 'برمجة', 'قرآن', 'فرنسي', 'إنجليزي', 'مدرس جامعي', 'دكتور جامعي',
  'هندسة ', 'طب', 'تمريض', 'باحث', 'تجارة واقتصاد','الكل']
  suspendOptions: Array<any> = [ {key:true,value:"فعال"}, {key:false,value:"معلق"}  ] 
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, 
    private toastr: ToastrService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    })
  }

  changeCountry(country) {
    this.cities = this.countryList.find(con => con.name == country).cities;
    // to set city NgModel to first element in city array
    this.member.city = this.cities[0];
  }

}
