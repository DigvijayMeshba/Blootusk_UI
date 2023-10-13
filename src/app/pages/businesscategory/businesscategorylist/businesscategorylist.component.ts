import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { listCatagory } from '../bisnesscatagory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-businesscategorylist',
  templateUrl: './businesscategorylist.component.html',
  styleUrls: ['./businesscategorylist.component.scss']
})
export class BusinesscategorylistComponent {
  
    public BusinesscategoryList: any = [];
    public page: number = 1;
    public count = 10;
    public SearchKeyword: any;
    uploadForm!:FormGroup;
    submitted = false;
    get f() { return this.uploadForm.controls; }
  
  
    constructor(public appService: AppService,private route: ActivatedRoute,private router: Router) { }
  
    ngOnInit(): void {
     // this.GetAllUserList();
      this.uploadForm = new FormGroup({
        categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        rewardPoint: new FormControl('', []),    
      });

      this.Searchdata(this.uploadForm);
    
    }
  
    public onPageChanged3(page: number) {
      this.page = page;
      window.scrollTo(0, 0);
    }
  
    public getPageNumbers3(): number[] {
      return Array.from({ length: this.getTotalPages3() }, (_, i) => i + 1);
    }
    
  public getTotalPages3(): number {
    return Math.ceil(this.BusinesscategoryList.length / this.count);
  }
 
    public ClearSearchdata()
    {
      let ListCategoryModel: listCatagory = {
        "categoryName": '',
        "rewardPoint": 1
      }
      this.router.navigate(['/businesscategory/businesscategorylist'], { relativeTo: this.route });
     
    }
    
    public Searchdata(formData: any) {
      debugger;
      let ListCategoryModel: listCatagory = {
      "categoryName": formData.categoryName == ''? "":formData.categoryName,
      "rewardPoint": formData.rewardPoint==''? 0:formData.rewardPoint      
    }
  
  // if(ListCategoryModel.categoryName !=''|| ListCategoryModel.rewardPoint != 0)
  // {
    this.appService.GetAllList('api/CategoryMaster/GetAllCategory', ListCategoryModel)
    .pipe(
      catchError((error) => {          
        return throwError(error); 
      })).subscribe((data: any) => {      
        this.BusinesscategoryList = data.responseData;

    if(data.responseData.length == 0)
    {
      Swal.fire({
        title:'Data not found',
        icon: 'info',
        confirmButtonColor: '#364574',
        allowOutsideClick: false,
        allowEscapeKey: false
 
      });
    }

    },);  

  // }
  // else
  //   {
    
  //   Swal.fire({
  //     title:'Warning',
  //     text: 'Please fill Category Name or Reward Point',
  //     icon: 'warning',
  //     confirmButtonColor: '#364574'
  //   });    
  // }
     
    
  }
  
    deleterecord(object: any) {
      debugger;
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to Delete this Business Category?',
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
                  title: 'Delete',
                  text: 'Business Category has been Delete Successfully.',
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