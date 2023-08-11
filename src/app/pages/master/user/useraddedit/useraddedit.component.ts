import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
// import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { adduser, edituser } from './useraddedit.Model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useraddedit',
  templateUrl: './useraddedit.component.html',
  styleUrls: ['./useraddedit.component.scss']
})
export class UseraddeditComponent {
  public RoleList: any = [];
  selectedRole: any;
  userId: string | any;

  fieldTextType1!: boolean;
  submitted = false;

  emailExistsError: string | null = null;

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  uploadForm = new FormGroup({
    userId: new FormControl('', []),

    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    roleId: new FormControl('', [Validators.required]),
  });

  constructor(public formBuilder: FormBuilder, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private location: Location,

    private _authService: AuthenticationService,
    private _router: Router,) { }

  ngOnInit(): void {
    debugger
    this.userId = this.route.snapshot.params['id'];
    this.getuserbyId(this.userId);
    this.getRoleMaster();
  }
  get f() { return this.uploadForm.controls; }

  public getRoleMaster() {
    this.appService.GetAll("api/DropdownHelper/GetAllRoles").subscribe(data => {
      this.RoleList = data;
    });
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  keyPressOnlyChar(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ///Validation for only enter number
  keyPressOnlynum(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public Submit(userObject: any) {
    debugger
    this.submitted = true;
    // if (this.uploadForm.valid) {

    if (userObject.userId == "") {
      this.createUser(userObject);
    }
    else {
      this.updateUser(userObject);
    }
    // }
  }
  
  successmsg() {
    Swal.fire({
      title: 'User Added Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  Updatemsg() {
    Swal.fire({
      title: 'User Updated Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
  //create new user
  public createUser(formData: any) {
    let AdduserModel: adduser = {
      "firstName": formData.firstName,
      "lastName": formData.lastName,
      "mobileNumber": formData.mobileNumber,
      "email": formData.email,
      "roleId": formData.roleId,
      "password": formData.password
    }

    this.appService.Add('api/User/AddUser', AdduserModel).subscribe((data: any) => {
      debugger
      console.log("dataaaaaaaaaaaaaa", data)

      if (data.message == "User Added Successfully.") {
        this.successmsg()
        this.router.navigate(['../userlist'], { relativeTo: this.route });
      }

      else if (data.message == "Email already exists.") {
        this.emailExistsError = data.message;
        this.uploadForm.controls['email'].setErrors({ 'exists': true });
      }

      else {
        alert("Something Went wrong")
      }

    },);

  }

  public updateUser(formData: any) {
    debugger
    let edituserModel: edituser = {
      "userId": formData.userId,
      "firstName": formData.firstName,
      "lastName": formData.lastName,
      "mobileNumber": formData.mobileNumber,
      "email": formData.email,
      "roleId": formData.roleId,
      "password": formData.password
    }

    this.appService.edit('api/User/EditUser', edituserModel).subscribe((data: any)  => {
      debugger
      if (data.message == "User Updated Successfully.") {
        this.Updatemsg()

        this.router.navigate(['/pages/master/user/userlist'], { relativeTo: this.route });
      }

      // else if (data.message == "Email already exists.") {
      //   this.emailExistsError = "This Email Id user already exist.";
      //   this.uploadForm.controls['email'].setErrors({ 'exists': true });
      // }

      else {
        alert("Something Went wrong")
      }
    },);
  }

  ///GetUserById
  public getuserbyId(userId: any) {
    if (userId > 0) {
      this.appService.getById("api/User/GetUserByUserId/", userId).subscribe(data => {
        this.uploadForm.controls['firstName'].setValue(data.firstName);
        this.uploadForm.controls['lastName'].setValue(data.lastName);
        this.uploadForm.controls['email'].setValue(data.email);
        this.uploadForm.controls['mobileNumber'].setValue(data.mobileNumber);
        this.uploadForm.controls['password'].setValue(data.password);
        this.uploadForm.controls['roleId'].setValue(data.roleId);
        this.uploadForm.controls['userId'].setValue(data.userId);
      });
    }
  }
}
