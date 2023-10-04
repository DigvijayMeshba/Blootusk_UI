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
  RecStatus!:boolean;

  emailExistsError: string | null = null;

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

 
  constructor(public formBuilder: FormBuilder, public appService: AppService, 
    public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private location: Location,

    private _authService: AuthenticationService,
    private _router: Router,) { }

  ngOnInit(): void {
    this.showMessage();
    this.catagoryId = this.route.snapshot.params['id'];
    this.getcatagorybyId(this.catagoryId);
    this.uploadForm = new FormGroup({
      categoryId: new FormControl('', []),
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rewardPoint: new FormControl('', [Validators.required, Validators.minLength(3)]),
      recStatus: new FormControl('', []),
      mobileNumber: new FormControl('', []),
      createdBy: new FormControl('', []),
      createdDate: new FormControl('', []),
      modifyBy: new FormControl('', []),
      modifyDate: new FormControl('', []),
     
    });  
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

  public submit() {
   
    this.submitted = true;
    
  }
  
  public validateControl = (controlName: string) => {
    return this.uploadForm.controls[controlName].invalid && this.uploadForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.uploadForm.controls[controlName].hasError(errorName)
  }

 

  public updateCatagory(formData: any) {
    debugger

    if(formData.recStatus == true)
    {
      formData.recStatus = "A";

    }
    else{
      formData.recStatus = "I";
    }

    let edituserModel: editCatagory = {
      "categoryId":this.catagoryId,
      "categoryName": formData.categoryName,
      "rewardPoint": formData.rewardPoint,
      "recStatus": formData.recStatus,
    }

    if(this.uploadForm.valid)
    {
    
    this.appService.Add('api/CategoryMaster/AddEditCategory', edituserModel).subscribe((data: any)  => {
      debugger
      if (data.responseStatusCode == 200) {
        Swal.fire({
          title:'Success',
          text: 'Category Updated Successfully.',
          icon: 'success',
          confirmButtonColor: '#364574',
          allowOutsideClick: false,
          allowEscapeKey: false
        }); 
        
        this.router.navigate(['/businesscategory/businesscategorylist'], { relativeTo: this.route });
      }  
      else {
        
        Swal.fire({
          title: 'Something Went wrong',
          icon: 'warning',         
          confirmButtonColor: '#364574',
          cancelButtonColor: 'rgb(243, 78, 78)',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
   
        });
      }
    },);
  }
  }


  CancelForm()
  {
    this.router.navigate(['/businesscategory/businesscategorylist'], { relativeTo: this.route });
    
  }
  ///GetUserById
  public getcatagorybyId(catagoryId: any) {
    debugger
    if (catagoryId > 0) {
      this.appService.getById("api/CategoryMaster/GetCategoryById/", catagoryId).subscribe(data => {
       
        console.log( 'categorydata',data.responseData)
        this.uploadForm.controls['categoryId'].setValue(data.responseData.catagoryId);
        this.uploadForm.controls['categoryName'].setValue(data.responseData.categoryName);
        this.uploadForm.controls['rewardPoint'].setValue(data.responseData.rewardPoint);
        this.uploadForm.controls['recStatus'].setValue(data.responseData.recStatus == "A"? true : false);
       
        this.uploadForm.controls['createdBy'].setValue(data.responseData.createBy);
        this.uploadForm.controls['createdDate'].setValue(data.responseData.createDate);
        this.uploadForm.controls['modifyBy'].setValue(data.responseData.modifyBy);
        this.uploadForm.controls['modifyDate'].setValue(data.responseData.modifyDate);
      });
    }
  }


  alertMessage!:string;
  alertClass!:string;


// add for a alert message
  showMessage() {
    // Logic to determine message and CSS class
    const message = 'Data saved successfully!';
    const alertClass = 'alert-success';

    // Set the message and CSS class
    this.alertMessage = message;
    this.alertClass = alertClass;
  }
}
