import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { data } from 'jquery';
import { catchError, throwError } from 'rxjs';
import { addCatagory } from '../bisnesscatagory';


@Component({
  selector: 'app-businesscategoryadd',
  templateUrl: './businesscategoryadd.component.html',
  styleUrls: ['./businesscategoryadd.component.scss']
})
export class BusinesscategoryaddComponent {

    public RoleList: any = [];
    selectedRole: any;
    userId: string | any;
    uploadForm!:FormGroup;  
    fieldTextType1!: boolean;
    submitted = false;
  
    emailExistsError: string | null = null;
  
    toggleFieldTextType1() {
      this.fieldTextType1 = !this.fieldTextType1;
    }
  
    
    constructor(public formBuilder: FormBuilder,public appService: AppService,
      private route: ActivatedRoute, private _authService: AuthenticationService,private tokenStorage: TokenStorageService,
      private router: Router,)
     {
     
     
    }
  
      ngOnInit(): void {

      debugger
      this.uploadForm = new FormGroup({
        catagoryId: new FormControl('', []),
        categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        rewardPoint: new FormControl('', []),
        recStatus: new FormControl('', []),
        // createdBy: new FormControl('', []),
        // createdDate: new FormControl('', []),
        // modifyBy: new FormControl('', []),
        // modifyDate: new FormControl('', []),

      });
    
    }
    get f() { return this.uploadForm.controls; }
  

    public validateControl = (controlName: string) => {
      return this.uploadForm.controls[controlName].invalid && this.uploadForm.controls[controlName].touched
    }
  
    public hasError = (controlName: string, errorName: string) => {
      return this.uploadForm.controls[controlName].hasError(errorName)
    }
    public getRoleMaster() {
      this.appService.GetAll("api/DropdownHelper/GetAllRoles").subscribe(data => {
        this.RoleList = data;
      });
    }
  
    public submit() {
   
      this.submitted = true;
      
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
    public createCatagory(formData: any) {
      debugger;
      let AdduserModel: addCatagory = {
      "catgoryId":formData.catagoryId,
      "categoryName": formData.categoryName,
      "rewardPoint": formData.rewardPoint,
      "recStatus": formData.recStatus,
      // "createBy": formData.createBy,
      // "createDate": formData.createDate,
      // "modifyBy": formData.modifyBy,
      // "modifyDate": formData.modifyDate 
    
    }
  if(this.uploadForm.valid)
  {  
      this.appService.Add('api/CategoryMaster/AddEditCategory', AdduserModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })
      ) 
      .subscribe((data: any) => {
        debugger
        console.log("dataaaaaaaaaaaaaa", data)
  
        if (data.message == "Catagory Added Successfully.") {
          this.successmsg()
          this.router.navigate(['../userlist'], { relativeTo: this.route });
        }         
  
        else {
          alert("Something Went wrong")
        }
  
      },);
  
    }  
  }
  }
