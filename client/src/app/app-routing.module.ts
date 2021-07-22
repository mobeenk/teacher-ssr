import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetEmailformComponent } from './reset-emailform/reset-emailform.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GuestsComponent } from './guests-components/guests/guests.component';
import { GuestCardComponent } from './guests-components/guest-card/guest-card.component';
import { GuestDetailComponent } from './guests-components/guest-detail/guest-detail.component';
import { GuestDetailedResolver } from './_resolvers/guest-detailed.resolver';

import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'change-password', component: ChangePasswordComponent},
    ]
  },

  {path: 'guests', component: GuestsComponent},
  {path: 'guests/:username', component: GuestDetailComponent , resolve: {member: GuestDetailedResolver} }, //
  {path: 'errors', component: TestErrorsComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'reset-emailpassword', component: ResetEmailformComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'ResetPassword', component: ResetPasswordComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
