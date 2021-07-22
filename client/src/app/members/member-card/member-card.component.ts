import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  expired: boolean;
  constructor(private memberService: MembersService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
  }
  verifiedDateIsExpired(){
    // console.log(new Date(this.member.verifiedDate ).getTime()  > Date.now() );
    this.expired = false;
    if( new Date(this.member.verifiedDate ).getTime()  > Date.now()  )  {
      this.expired = false;
      return this.expired 
    }
    else{
      this.expired = true;
      return this.expired
    }
  }
  addLike(member: Member) {
    
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    })
  }
  

}
