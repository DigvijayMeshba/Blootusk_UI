import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
// import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { addCatagory, editCatagory } from '../bisnesscatagory';

@Component({
  selector: 'app-businesscategoryadd',
  templateUrl: './businesscategoryadd.component.html',
  styleUrls: ['./businesscategoryadd.component.scss']
})
export class BusinesscategoryaddComponent {

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
      catagoryId: new FormControl('', []),
      catagoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rewardPoint: new FormControl('', [Validators.required, Validators.minLength(3)]),
      recStatus: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      createdBy: new FormControl('', []),
      createdDate: new FormControl('', []),
      modifyBy: new FormControl('', []),
      modifyDate: new FormControl('', []),
     
    });
  
  
    constructor(public formBuilder: FormBuilder, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private location: Location,
  
      private _authService: AuthenticationService,
      private _router: Router,) { }
  
    ngOnInit(): void {
      debugger
      this.userId = this.route.snapshot.params['id'];      
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
      let AdduserModel: addCatagory = {
      "catgoryId":formData.catagoryId,
      "catagoryName": formData.catagoryName,
      "rewardPoint": formData.rewardPoint,
      "recStatus": formData.recStatus,
      "createBy": formData.createBy,
      "createDate": formData.createDate,
      "modifyBy": formData.modifyBy,
      "modifyDate": formData.modifyDate }
  
      this.appService.Add('api/User/AddUser', AdduserModel).subscribe((data: any) => {
        debugger
        console.log("dataaaaaaaaaaaaaa", data)
  
        if (data.message == "User Added Successfully.") {
          this.successmsg()
          this.router.navigate(['../userlist'], { relativeTo: this.route });
        }         
  
        else {
          alert("Something Went wrong")
        }
  
      },);
  
    }  

  }
