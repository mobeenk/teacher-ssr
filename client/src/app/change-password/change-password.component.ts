import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  validationErrors: string[] = [];
  member: Member;
  user: User;
  @ViewChild('changePasswordForm') changePasswordForm: NgForm;


  constructor(private accountService: AccountService,
     private memberService: MembersService, 
    private toastr: ToastrService,private fb: FormBuilder
    , private router: Router )
     { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  intitializeForm() {
    this.changePassForm = this.fb.group({
      passwordo: ['',
       [Validators.required, 
        Validators.minLength(4),
         Validators.maxLength(8)
        ] 
       ],
      passwordn: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(8)]],

    })
  }

  ngOnInit(): void {
    this.intitializeForm();
    this.loadMember();
  }

  
  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
  changeMemberPassword() {
    this.memberService.changeUserPassword(this.changePassForm.value).subscribe(() => {
    // this.memberService.changeUserPassword(this.member).subscribe(() => {
      this.toastr.success('تم تغيير كلمة المرور بنجاح');
      // this.changePasswordForm.reset(this.member);
      this.router.navigateByUrl('/members');
    })
  }
  cancel(){
    this.router.navigateByUrl('/members');
  }

}
