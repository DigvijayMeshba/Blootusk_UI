import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { AppService } from 'src/app/app.service';

//Logout
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { Router } from '@angular/router';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';

import { CartModel } from './topbar.model';
import { cartData } from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AddCustomer, Signupuser, addUserDeatil } from 'src/app/account/signupuser/signupuser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;

  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  addRoleDeatil:any;
  sessionuserrole: any;
  sessionuserfullName: any;
    CustId !: number;
  CustName !: string;
  submitted = false;
  UserName !:string;

  constructor(private modalService: NgbModal, @Inject(DOCUMENT) private document: any, private eventService: EventService, public languageService: LanguageService,
    public _cookiesService: CookieService, public translate: TranslateService, private authService: AuthenticationService, private authFackservice: AuthfakeauthenticationService,
    private router: Router,  public appService: AppService,private TokenStorageService: TokenStorageService,) { }

    uploadForm!:FormGroup;  
  ngOnInit(): void {

    this.UserName  = this.TokenStorageService.getUser();
    // this.userData = this.TokenStorageService.getUser();
    
    this.addRoleDeatil = this.TokenStorageService.GetRole();  
    this.uploadForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      // createdDate: new FormControl('', []),
      // customerID: new FormControl('', []),
      // ApprovalStatus: new FormControl('', []),
      // CustomerCode: new FormControl('', []),
      // MerchantCode: new FormControl('', []),
      // MerchantName: new FormControl('', []),
      // PhoneNumber: new FormControl('', []),
      // RecStatus: new FormControl('', []),
      // ReferCode: new FormControl('', []),
    })


    console.log('UserName',this.UserName)
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    //  Fetch Data
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price
      this.total += item_price
    });

    //this.sessionuserfullName = this.TokenStorageService.getUser().fullName;
    //this.sessionuserrole = this.TokenStorageService.getUser().roleName;

  }
  get f() { return this.uploadForm.controls; }
  openModalUD(udcontent: any) {  
    this.modalService.open(udcontent, { size: 'sm' }); 
    }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open')
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  ngAfterViewInit() {
  }

  /**
  * Topbar Light-Dark Mode Change
  */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

  allowOnlySpaces(event:any) {
    if (event.key !== ' ' && !/^[a-zA-Z]*$/.test(event.key)) {
      event.preventDefault();
    }
  }
  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
    { text: 'Arabic', flag: 'assets/images/flags/ae.svg', lang: 'ar' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  oncheckboxchange(evnt: any) {
  }

  /**
   * Logout the user
   */
  logout() {
    debugger;
    this.authService.logout();
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
   // this.router.navigate(['/auth/login']);
   // this.router.navigate(['https://blootusk.com']);
   window.location.href = 'https://blootusk.com';
  }

  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
      document.getElementById('page-topbar')?.classList.add('topbar-shadow')
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
    }
  }

  // Delete Item
  deleteItem(event: any, id: any) {
    var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
    var Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;
    this.total > 1 ? (document.getElementById("empty-cart") as HTMLElement).style.display = "none" : (document.getElementById("empty-cart") as HTMLElement).style.display = "block";
    document.getElementById('item_' + id)?.remove();
  }

  // Search Topbar
  Search() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = ''
        if (element.querySelector("h6")) {
          var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
          var name = element.querySelector("h6").innerText.toLowerCase()
          if (name.includes(inputVal)) {
            notifiTxt = name
          } else {
            notifiTxt = spantext
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown.classList.remove("show");
    searchOptions.classList.add("d-none");
    searchInputReponsive.value = "";
  }


  SubmitForm(formData: addUserDeatil)
  {
    this.CustId =  this.TokenStorageService.getcustcode();
    let refer;
    debugger;
    if(this.uploadForm.valid)
    { 
    const  AddUserDeatil: addUserDeatil  =  {    
      
      Name :this.CustName,
      customerID:this.CustId,
      ApprovalStatus:"",
      CustomerCode:'',
      MerchantCode:'',
      MerchantName:'',
      PhoneNumber:'',
      RecStatus:'',
      ReferCode:''
    }  
      this.appService.Add('api/User/UpdateCustomer', AddUserDeatil).subscribe((data: any) => {
        let statuscode : number = data.responseStatusCode;
     
        switch(statuscode)
        {
            case 200:          
            Swal.fire({
              title:'Success',
              text: 'User Updated Successfully.',
              icon: 'success',
              confirmButtonColor: '#364574',
              allowOutsideClick: false,
              allowEscapeKey: false             
            }).then(function() {
            location.reload();
          });
            break;
              case 212 :
              Swal.fire({
                title:'Warning',
                text: 'Something Went wrong.',
                icon: 'warning',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
                break;
              case  500 : 

              Swal.fire({
                title:'Error',
                text: 'Error Status',
                icon: 'error',
                confirmButtonColor: '#364574',
                allowOutsideClick: false,
                allowEscapeKey: false
              });    
                break;
              case 601 :
                Swal.fire({
                  title:'Duplication',
                  text: 'Mobile Number is Duplicate',
                  icon: 'warning',
                  confirmButtonColor: '#364574',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });
                break;
              case 602:
                Swal.fire({
                  title:'Duplication',
                  text: 'Duplicate Email',
                  icon: 'warning',
                  confirmButtonColor: '#364574',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });                 
                break;
              case 603:
                Swal.fire({
                  title:'Duplication',
                  text: 'Merchant Not Save RewardPoint or Message Template ',
                  icon: 'warning',
                  confirmButtonColor: '#364574',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });                     
                         
                break;
              case 400:              
                  Swal.fire({
                    title:'Error',
                    text: 'Bad Request Status',
                    icon: 'error',
                    confirmButtonColor: '#364574',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  }); 
        }   
      },);
     }
    }

     keyPressOnlyChar(event: any) {
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z]/.test(inp) || /[' ']/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }

     onChangeShareCapitalType(event: any) {

      if (event.target.value) {
        this.CustName = event.target.value;     
      } else {    
  
      }
  
    }

    public submit() {
   
      this.submitted = true;   
      
    }

}
