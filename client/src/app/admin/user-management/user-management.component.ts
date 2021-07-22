import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Toast, ToastrService } from 'ngx-toastr';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  memberCache = new Map();
  pageSizeList = [{ value: 6, display: '6' }
  , { value: 10, display: '10' },
    {value: 18, display: '18'},
    {value: 24, display: '24'}   ];

    genderList = [{ value: "معلم", display: 'معلم' }
    , { value: "معلمة", display: 'معلمة' },
      {value: "طالب", display: 'طالب'},
      {value: "الكل", display: 'الكل'},
      {value: "طالبة", display: 'طالبة'}   ];

  searchUser: string;
  constructor(private adminService: AdminService, private modalService: BsModalService ,private toastr: ToastrService)
   { }

  ngOnInit(): void {
    this.getUsersWithRoles(this.searchUser);
  }
  setSearch(){
    this.getUsersWithRoles(this.searchUser);
  }

  // getUsersWithRoles() {
  //   this.adminService.getUsersWithRoles().subscribe(users => {
  //     this.users = users;
  //     // this.pagination = users.pagination;
  //   })
  // }
  pageNumber = 1;
  pageSize = 10;
  gender : string;
  getUsersWithRoles(searchUser?: string, gender?: string) {
    this.adminService.getUsersWithRoles(this.pageNumber,this.pageSize,searchUser, this.gender)
    .subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }
  getUser(searchUser: string) {
    this.adminService.getUsersWithRoles(this.pageNumber,this.pageSize,searchUser)
    .subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getUsersWithRoles();
  }
   banUser(username :string){
    this.adminService.banUser(username).subscribe( 
      (data) => {
          this.toastr.success('تم حظر المستخدم')
        }
      ,
      // server error returned
      (error) => {
        if(username != 'admin')
          this.toastr.error('محظور مسبقاًُ');
        console.log(error);
      }
    )
    
  }
  unBanUser(username :string){
    this.adminService.unBanUser(username).subscribe( 
      (data) => {
          this.toastr.success('تم إلفاء الحظر ')
        }
    )
  }
  verifyUser(username: string){
    this.adminService.verifyUser(username).subscribe(
        (data)=>{
          this.toastr.success('done')
        }
    );
  }
  openRolesModal(user: User) {
    // this is the Modal Configuration
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    // modal reference from Dependecay Injection we added the Modal Class
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    // here we pass content to @Input in the modal property which is updateSelectedRoles
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter( el => el.checked === true)
          .map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }
// this method to check if user has any roles then check
  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }


}
