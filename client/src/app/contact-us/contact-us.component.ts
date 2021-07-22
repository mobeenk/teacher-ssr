import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  QA: Array<any> = [
    {   question:'هل يتقاضى الموقع عمولة من المدرس؟' ,
        answer:'نعم'},
    {   question:'ماهي نسبة العمولة للموقع؟' ,
        answer:'5% من إجمالي دخل المدرس عبر الموقع بصيغة مباشرة أو غير مباشرة'},
    {   question:'هل يتقاضى الموقع عمولة من الطالب؟' ,
        answer:'بشكل طوعي'},
    {   question:'ماهي النسبة الخاصة بعمولة الطالب؟' ,
        answer:'يؤمن الموقع خدمة للطالب ومساهمة الطلب في تبرع للموقع يسهم في الحفاظ على هذه المنصة الخدمية ولايوجد هنالك نسبة محددة.'},
    {   question:'أنا مدرس وأريد سداد مبلغ العمولة ماهي الطريقة؟' 
      ,  answer:'بالإمكان السداد بشكل رئيسي عبر حساب PayPal الخاص بالموقع أو في حال التعذر بالإمكان التواصل على وسائل التواصل المتاحة أدناه.'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
