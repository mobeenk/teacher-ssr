import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  footerVal: string;
  _comp1ValueBS = new BehaviorSubject<string>('');
  
  constructor() {
    this.footerVal;
    this._comp1ValueBS.next(this.footerVal);
   }
   updateFooterVal(val) {
    this.footerVal = val;
    this._comp1ValueBS.next(this.footerVal);
  }
}
