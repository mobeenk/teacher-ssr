import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' //to use *appHasRole
})


// This directive is also used in Admin-Panel Tabs
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContainerRef: ViewContainerRef, 
              private templateRef: TemplateRef<any>, 
              private accountService: AccountService)
     {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
     }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }
// this is used in nav.ts as in bottom
    if (this.user?.roles.some(r  => this.appHasRole.includes(r))) {
      // if he has the propper role he can access the feature with the directive
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
/*
<li *appHasRole="['Admin', 'Moderator']" class="nav-item">
<a class="nav-link" routerLink="/admin" routerLinkActive="active"
  >لوحة المدير</a
>
</li>
*/