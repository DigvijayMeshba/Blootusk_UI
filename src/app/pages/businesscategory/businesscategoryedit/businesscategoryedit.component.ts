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
import { editCatagory } from '../bisnesscatagory';

@Component({
  selector: 'app-businesscategoryedit',
  templateUrl: './businesscategoryedit.component.html',
  styleUrls: ['./businesscategoryedit.component.scss']
})
export class BusinesscategoryeditComponent {

 public RoleList: any = [];
  selectedRole: any;
  catagoryId: string | any;
  uploadForm!:FormGroup;    
  fieldTextType1!: boolean;
  submitted = false;

  emailExistsError: string | null = null;

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

 
  constructor(public formBuilder: FormBuilder, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private location: Location,

    private _authService: AuthenticationService,
    private _router: Router,) { }

  ngOnInit(): void {
    debugger
    this.catagoryId = this.route.snapshot.params['id'];

    this.uploadForm = new FormGroup({
      catagoryId: new FormControl('', []),
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rewardPoint: new FormControl('', [Validators.required, Validators.minLength(3)]),
      recStatus: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      createdBy: new FormControl('', []),
      createdDate: new FormControl('', []),
      modifyBy: new FormControl('', []),
      modifyDate: new FormControl('', []),
     
    });
  
    this.getcatagorybyId(this.catagoryId);
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
        
  }
  
  successmsg() {
    Swal.fire({
      title: 'Catagory Updated Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
 

  public updateCatagory(formData: any) {
    debugger
    let edituserModel: editCatagory = {
      "categoryName": formData.categoryName,
      "rewardPoint": formData.rewardPoint,
      "recStatus": formData.recStatus,
      // "createBy": formData.createBy,
      // "createDate": formData.createDate,
      // "modifyBy": formData.modifyBy,
      // "modifyDate": formData.modifyDate
    }

    this.appService.edit('api/User/EditUser', edituserModel).subscribe((data: any)  => {
      debugger
      if (data.message == "User Updated Successfully.") {
        this.successmsg()

        this.router.navigate(['/pages/master/user/userlist'], { relativeTo: this.route });
      }      

      else {
        alert("Something Went wrong")
      }
    },);
  }

  ///GetUserById
  public getcatagorybyId(catagoryId: any) {
    if (catagoryId > 0) {
      this.appService.getById("api/User/GetCatagoryUserId/", catagoryId).subscribe(data => {
        this.uploadForm.controls['categoryName'].setValue(data.categoryName);
        this.uploadForm.controls['rewardPoint'].setValue(data.rewardPoint);
        this.uploadForm.controls['recStatus'].setValue(data.recStatus);
        this.uploadForm.controls['createdBy'].setValue(data.createBy);
        this.uploadForm.controls['createdDate'].setValue(data.createDate);
        this.uploadForm.controls['modifyBy'].setValue(data.modifyBy);
        this.uploadForm.controls['modifyDate'].setValue(data.modifyDate);
      });
    }
  }
}
