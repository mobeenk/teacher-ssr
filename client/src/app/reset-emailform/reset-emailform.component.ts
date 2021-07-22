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
  selector: 'app-reset-emailform',
  templateUrl: './reset-emailform.component.html',
  styleUrls: ['./reset-emailform.component.css']
})
export class ResetEmailformComponent implements OnInit {
  emailReset: FormGroup;
  validationErrors: string[] = [];
  member: Member;
  user: User;
  submitted: boolean;
  // @ViewChild('changePasswordForm') changePasswordForm: NgForm;


  constructor(private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService, private fb: FormBuilder
    , private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.submitted = false;
  }

  intitializeForm() {
    this.emailReset = this.fb.group({
      email: ['',
        [Validators.required, Validators.email

        ]
      ]

    })
  }

  ngOnInit(): void {
    this.intitializeForm();
    // this.loadMember();
  }


  // loadMember() {
  //   this.memberService.getMember(this.user.username).subscribe(member => {
  //     this.member = member;
  //   })
  // }
  forgotPasswordMailreset() {
    this.memberService.forgotPasswordMail(this.emailReset.value).subscribe(() => {
      // this.memberService.changeUserPassword(this.member).subscribe(() => {

      this.toastr.success('تم إرسال البريد الالكتروني لإعادة الضبط ');
      // this.changePasswordForm.reset(this.member);
      this.submitted = true;

      // this.router.navigateByUrl('/');
    })
  }

  cancel() {
    this.router.navigateByUrl('/');
    console.log('ehd')
  }
  flag() {
    this.submitted = true;
  }
}
