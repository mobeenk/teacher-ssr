import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { SharedModule } from "./_modules/shared.module";
import { TestErrorsComponent } from "./errors/test-errors/test-errors.component";
import { ErrorInterceptor } from "./_interceptors/error.interceptor";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { ServerErrorComponent } from "./errors/server-error/server-error.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from "./_interceptors/loading.interceptor";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { TextInputComponent } from "./_forms/text-input/text-input.component";
import { DateInputComponent } from "./_forms/date-input/date-input.component";
import { MemberMessagesComponent } from "./members/member-messages/member-messages.component";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { HasRoleDirective } from "./_directives/has-role.directive";
import { UserManagementComponent } from "./admin/user-management/user-management.component";
import { PhotoManagementComponent } from "./admin/photo-management/photo-management.component";
import { RolesModalComponent } from "./modals/roles-modal/roles-modal.component";
import { ConfirmDialogComponent } from "./modals/confirm-dialog/confirm-dialog.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { FooterComponent } from "./footer/footer.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetEmailformComponent } from "./reset-emailform/reset-emailform.component";
import { GuestsComponent } from "./guests-components/guests/guests.component";
import { GuestCardComponent } from "./guests-components/guest-card/guest-card.component";
import { GuestDetailComponent } from "./guests-components/guest-detail/guest-detail.component";
import { ShortenPipe } from "./_pipes/shorten.pipe";
import { RegisterStudentComponent } from "./register-student/register-student.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    ChangePasswordComponent,
    ContactUsComponent,
    FooterComponent,
    ResetPasswordComponent,
    ResetEmailformComponent,
    GuestsComponent,
    GuestCardComponent,
    GuestDetailComponent,
    ShortenPipe,
    RegisterStudentComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserModule.withServerTransition({
      appId: "client", // withServerTransition is available only in Angular 4
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
