import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

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
  
    constructor(public appService: AppService) { }
  
    ngOnInit(): void {
      this.GetAllUserList();
    }
  
    //List of All Company
    public GetAllUserList() {
      this.appService.GetAll("api/User/GetAllUser").subscribe(data => {
        this.BusinesscategoryList = data;
      }
      );
    }
  
    deleterecord(object: any) {
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
            this.appService.Delete(`api/User/DeleteUser?userId=${object.userId}`, {}).subscribe(data => {
              Swal.fire({
                title: 'Deleted!',
                text: 'The user has been deleted successfully.',
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