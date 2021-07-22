import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  // tp enable city for a counties
  countryList: Array<any> = [
    { name: 'السعودية', cities: ['الدمام', 'الرياض', 'جدة', 'نجران'] },
    { name: 'أمريكا', cities: ['واشنطن', 'نيويورك', 'أخرى'] },
    { name: 'كندا', cities: ['تورونتو', 'أخرى'] },
    { name: 'أمريكا الجنوبية', cities: ['البرازيل', 'أخرى'] },
    { name: 'أوروبا', cities: ['السويد', 'ألمانيا', 'فرنسا', 'إسبانيا', 'أخرى'] },
    { name: 'استراليا', cities: ['سيدني', 'أخرى'] },
    { name: 'مصر', cities: ['القاهرة', 'أخرى'] },
    { name: 'الكويت', cities: ['الكويت', 'أخرى'] },
    { name: 'الإمارات', cities: ['الشارقة', 'دبي', 'أبو ظبي', 'أخرى'] },
    { name: 'البحرين', cities: ['المنامة', 'أخرى'] },
    { name: 'عمان', cities: ['مسقط', 'أخرى'] },
    { name: 'اليمن', cities: ['صنعاء', 'أخرى'] },
    { name: 'سوريا', cities: ['حلب', 'دمشق', 'حمص', 'حماة', 'دير الزور', 'أخرى'] },
    { name: 'لبنان', cities: ['طرابلس', 'بيروت', 'أخرى'] },
    { name: 'الأردن', cities: ['عمان', 'أخرى'] },
    { name: 'العراق', cities: ['بغداد', 'أخرى'] },
    { name: 'فلسطين', cities: ['القدس', 'أخرى'] },
    { name: 'الجزائر', cities: ['الجزائر', 'أخرى'] },
    { name: 'المغرب', cities: ['الدار البيضاء', 'أخرى'] },
    { name: 'السودان', cities: ['الخرطوم', 'أخرى'] },
    { name: 'ليبيا', cities: ['أخرى'] },
    { name: 'تونس', cities: ['أخرى', 'تونس'] }
  ];
  cities: Array<any>;

  majors: Array<string> = ['فيزياء', 'كيمياء', 'رياضيات', 'برمجة', 'قرآن', 'فرنسي', 'إنجليزي', 'مدرس جامعي', 'دكتور جامعي',
    'هندسة ', 'طب', 'تمريض', 'باحث', 'تجارة واقتصاد']

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({

      gender: [''],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      major: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value)
      .subscribe(response => {
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

}
