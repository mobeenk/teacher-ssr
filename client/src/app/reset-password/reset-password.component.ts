
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  // @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  tokenUrl: string;
  emailUrl: string;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
      
    this.activatedRoute.queryParams.subscribe(params => {
      this.tokenUrl = params['token'];
      this.emailUrl = params['email'];

    });
  }

  ngOnInit(): void {
    this.intitializeForm();

  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      Token: [this.tokenUrl, [Validators.required]],
      Email: [this.emailUrl, [Validators.required]],
      newPassword: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('newPassword')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  resetPassword() {
    this.accountService.resetPasswordService(this.registerForm.value)
      .subscribe(response => {
        this.toastr.show('تم تعيين كلمة مرور جديدة بنجاح')
        this.router.navigateByUrl('/');
      }, error => {
        this.toastr.show('خطأ الرجاء التأكد')
      })
  }

  cancel() {
    this.router.navigateByUrl('/');
    // this.cancelRegister.emit(false);
  }

}
