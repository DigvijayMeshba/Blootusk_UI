import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent {
  public CompanyList: any = [];
  public NewCompanyList: any = [];
  public page: number = 1;
  public count = 10;
  public SearchKeyword: any;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.GetAllCompanyList();
    this.GetAllDirectorList();
    this.GetAllAuditorrList()
  }

  /**
   * Confirm sweet alert
   * @param confirm modal content
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes !'
    }).then(result => {
      if (result.value) {
        Swal.fire({title: 'Deleted!', text:'Your has been deleted.', confirmButtonColor: '#364574', icon: 'success',});
      }
    });
  }

  //List of All Company
  public GetAllCompanyList() {
    this.appService.GetAll("api/CompanyMaster/GetAllCompanyDetails").subscribe(data => {
      this.CompanyList = data;
      this.NewCompanyList = data;
    });
  }

  // Delete Company from List
  ///No worning or popup of confirmation
  // public deleterecord(content: any) {
  //   const index: number = this.CompanyList.indexOf(content);
  //   if (index !== -1) {
  //     this.CompanyList.splice(index, 1);
  //     this.appService.Delete(`api/CompanyMaster/DeleteCompanyDetails?companyId=${content.companyId}`, {}).subscribe(data => {
  //     });
  //   }
  // }

  deleterecord(content: any) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this company?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const index: number = this.CompanyList.indexOf(content);
        if (index !== -1) {
          this.CompanyList.splice(index, 1);
          this.appService.Delete(`api/CompanyMaster/DeleteCompanyDetails?companyId=${content.companyId}`, {}).subscribe(data => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The company has been deleted successfully.',
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
    return this.CompanyList.slice(startIndex, endIndex);
  }

  public getTotalPages(): number {
    return Math.ceil(this.CompanyList.length / this.count);
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
      this.GetAllCompanyList();
    }
    else {
      this.CompanyList = this.NewCompanyList.filter((res: { name: string; cin: string; companyType: string; emailId: string; phoneNumber: string }) => {
        return (
          res.name.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) ||
          res.cin.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) ||
          res.companyType.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) ||
          res.emailId.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase()) ||
          res.phoneNumber.includes(this.SearchKeyword)
        );
      });
    }
  }


//==============Director List=====================================================//

// Declaration write at top
public DirectorList: any = [];
public NewDirectorList: any = [];
public SearchKeywordDirector: any;
public pageDir: number = 1;
public countDir = 10;

  //List of All Director
  public GetAllDirectorList() {
    this.appService.GetAll("api/CompanyMaster/GetAllDirectorDetails").subscribe(data => {
      this.DirectorList = data;
      this.NewDirectorList = data;
    });
  }

   ///Code for Pagination
   public getPageData2(): any[] {
    const startIndex = (this.pageDir - 1) * this.countDir;
    const endIndex = startIndex + this.countDir;
    return this.DirectorList.slice(startIndex, endIndex);
  }

  public getTotalPages2(): number {
    return Math.ceil(this.DirectorList.length / this.countDir);
  }

  public getPageNumbers2(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  public onPageChanged2(pageDir: number) {
    this.pageDir = pageDir;
    window.scrollTo(0, 0);
  }

  ///Search Company in List
  SearchDirector() {
    if (this.SearchKeywordDirector === "") {
      this.GetAllDirectorList();
    }
    else {
      this.DirectorList = this.NewDirectorList.filter((res: { companyName: string; companyCIN: string; directorName: string; din: string; mobileNumber: string;emailIdDirector:string }) => {
        return (
          res.companyName.toLocaleLowerCase().includes(this.SearchKeywordDirector.toLocaleLowerCase()) ||
          res.companyCIN.toLocaleLowerCase().includes(this.SearchKeywordDirector.toLocaleLowerCase()) ||
          res.directorName.toLocaleLowerCase().includes(this.SearchKeywordDirector.toLocaleLowerCase()) ||
          res.din.toLocaleLowerCase().includes(this.SearchKeywordDirector.toLocaleLowerCase()) ||
          res.mobileNumber.includes(this.SearchKeywordDirector)||
          res.emailIdDirector.toLocaleLowerCase().includes(this.SearchKeywordDirector.toLocaleLowerCase()) 
        );
      });
    }
  }

  
//==============Auditor List=====================================================//

// Declaration write at top
public AuditorList: any = [];
public NewAuditorList: any = [];
public SearchKeywordAuditor: any;
public pageAud: number = 1;
public countAud = 10;

  //List of All Director
  public GetAllAuditorrList() {
    this.appService.GetAll("api/Auditor/GetAllAuditorDetails").subscribe(data => {
      this.AuditorList = data;
      this.NewAuditorList = data;
    });
  }

   ///Code for Pagination
   public getPageData3(): any[] {
    const startIndex = (this.pageAud - 1) * this.countAud;
    const endIndex = startIndex + this.countAud;
    return this.AuditorList.slice(startIndex, endIndex);
  }

  public getTotalPages3(): number {
    return Math.ceil(this.AuditorList.length / this.countAud);
  }

  public getPageNumbers3(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  public onPageChanged3(pageAud: number) {
    this.pageAud = pageAud;
    window.scrollTo(0, 0);
  }

  ///Search Company in List
  SearchAuditor() {
    if (this.SearchKeywordAuditor === "") {
      this.GetAllAuditorrList();
    }
    else {
      this.AuditorList = this.NewAuditorList.filter((res: { companyName: string; companyCIN: string; audtitorName: string; auditorMembershipNumber: string; firmRegistrationNumber: string ;phoneNumber:string;emailId:string}) => {
        return (
          res.companyName.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.companyCIN.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.audtitorName.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.auditorMembershipNumber.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.emailId.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.firmRegistrationNumber.toLocaleLowerCase().includes(this.SearchKeywordAuditor.toLocaleLowerCase()) ||
          res.phoneNumber.includes(this.SearchKeywordAuditor)
        );
      });
    }
  }

  ExportAuditorList()

  {

   // window.location.href='https://localhost:44360/api/Auditor/AuditorExcel';

    const newTab = window.open();

    if (newTab !== null) {

      newTab.location.href = 'http://csapi.meshbagroup.com/api/Auditor/AuditorExcel';

    } else {

      // Handle the case where the new tab could not be opened

      console.error('Failed to open new tab');

    }

  }

  ExportDirectorList()

  {

    //window.location.href='https://localhost:44360/api/Auditor/AuditorExcel';

    const newTab = window.open();

    if (newTab !== null) {

      newTab.location.href = 'http://csapi.meshbagroup.com/api/Auditor/DirectorExcel';

    } else {

      // Handle the case where the new tab could not be opened

      console.error('Failed to open new tab');

    }

  }

  ExportCompanyList()

  {

    // window.location.href='https://localhost:44360/api/Auditor/AuditorExcel';




    const newTab = window.open();

    if (newTab !== null) {

      newTab.location.href = 'http://csapi.meshbagroup.com/api/Auditor/CompanyExcel';

    } else {

      // Handle the case where the new tab could not be opened

      console.error('Failed to open new tab');

    }


  }

  }


