import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { listCatagory } from '../bisnesscatagory';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-businesscategorylist',
  templateUrl: './businesscategorylist.component.html',
  styleUrls: ['./businesscategorylist.component.scss']
})
export class BusinesscategorylistComponent {
  
    public BusinesscategoryList: any = [];
    public page: number = 1;
    public count = 8;
    public SearchKeyword: any;
    uploadForm!:FormGroup;
    submitted = false;
    get f() { return this.uploadForm.controls; }
  
  
    constructor(public appService: AppService) { }
  
    ngOnInit(): void {
     // this.GetAllUserList();
      this.uploadForm = new FormGroup({
        categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        rewardPoint: new FormControl('', []),    
      });
    
    }
  
    //List of All Company
    public GetAllUserList() {
      this.appService.GetAll("api/User/GetAllUser").subscribe(data => {
       
        
      }
      );
    }
 

 public Searchdata(formData: any) {
      debugger;
      let ListCategoryModel: listCatagory = {
      "categoryName": formData.categoryName == ''? "":formData.categoryName,
      "rewardPoint": formData.rewardPoint==''? 0:formData.rewardPoint


        

          
    }
  
      this.appService.GetAllList('api/CategoryMaster/GetAllCategory', ListCategoryModel)
      .pipe(
        catchError((error) => {          
          return throwError(error); 
        })).subscribe((data: any) => {      
          this.BusinesscategoryList = data.responseData;
      console.log(data);
      },);  

    
  }
  
    deleterecord(object: any) {
      debugger;
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#364574',
        cancelButtonColor: 'rgb(243, 78, 78)',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          const index: number = this.BusinesscategoryList.indexOf(object);
          if (index !== -1) {
            this.BusinesscategoryList.splice(index, 1);
            this.appService.Delete(`api/CategoryMaster/DeleteCategory?categoryId=${object.categoryId}`, {}).subscribe(data => {
             
                Swal.fire({
                  title: 'Deleted!',
                  text: 'The Category has been deleted successfully.',
                  icon: 'success',
                  confirmButtonColor: '#364574'
                });
             
            });
          }
        }
      });
    }
  
  
    ///Code for Pagination
    public getPageData(): any[] {
      const startIndex = (this.page - 1) * this.count;
      const endIndex = startIndex + this.count;
      return this.BusinesscategoryList.slice(startIndex, endIndex);
    }
  
    public getTotalPages(): number {
      return Math.ceil(this.BusinesscategoryList.length / this.count);
    }
  
    public getPageNumbers(): number[] {
      return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
    }
  
    public onPageChanged(page: number) {
      this.page = page;
      window.scrollTo(0, 0);
    }
  
    ///Search Company in List
    Search() {
      if (this.SearchKeyword === "") {
        this.GetAllUserList();
      }
      else {
        this.BusinesscategoryList = this.BusinesscategoryList.filter((res: { catagoryName: string; rewardPoint: number; recStatus: string; }) => {
          return (
            res.catagoryName.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) ||
            res.recStatus.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) 
          );
        });
      }
    }
  }