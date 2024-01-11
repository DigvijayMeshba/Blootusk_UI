import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const ROLE_KEY = 'role-key'
const USER_KEY = 'currentUser';
const MERCHANT_KEY = 'Merchant';
const OTP_KEY = 'MerchantSignupPhoneNoOTP';
const OTPEMAIL_KEY = 'MerchantSignupEmailOTP';
const USEROTP_KEY = 'userphoneNumberOTP';
const MerchantUrl_KEY = 'merchantUrl';
const Custcode_KEY = 'custcode';
const Phoneno_KEY = 'PhoneNumber';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }


  public saveurl(merhantCode : string): void
  {
    window.sessionStorage.removeItem(MerchantUrl_KEY);
    window.sessionStorage.setItem(MerchantUrl_KEY, merhantCode );
  }


  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token );
  }

  public SaveRole(Role:string): void{
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY,Role);
  }

  public GetRole(): any |null
  {
    return sessionStorage.getItem('role-key');
  }

  public Merchantdata(merchant:any): void {
    window.localStorage.removeItem(MERCHANT_KEY);

    window.localStorage.setItem(MERCHANT_KEY,   JSON.stringify(merchant));
  }

  public custcode(custcode:any): void {
    debugger;
    window.localStorage.removeItem(Custcode_KEY);
    window.localStorage.setItem(Custcode_KEY, JSON.stringify(custcode));
  }

  public getcustcode(): any {
    const custcode = window.localStorage.getItem(Custcode_KEY);
    if (custcode) {
      return JSON.parse(custcode);
    }
    return {};
  }
  public getMerchant(): any {
    const merchant = window.localStorage.getItem(MERCHANT_KEY);
    if (merchant) {
      return JSON.parse(merchant);
    }
    return {};
  }

  public SavePhoneOtp(phoneNootp:any): void {
    debugger;
    window.localStorage.removeItem(OTP_KEY);
    window.localStorage.setItem(OTP_KEY, JSON.stringify(phoneNootp));
  }

  public SavePhoneNOOtp(PhoneNo:any)
  {
    window.localStorage.removeItem(Phoneno_KEY);
    window.localStorage.setItem(Phoneno_KEY, JSON.stringify(PhoneNo));
  }

  

  public GetPhoneNO(): any {
    const phoneNo =  window.localStorage.getItem(Phoneno_KEY);
    if (phoneNo) {
      return JSON.parse(phoneNo);
    }
    return {};
  }


  public SaveUSerPhoneOtp(UserOtp:any): void {
    window.localStorage.removeItem(USEROTP_KEY);
    window.localStorage.setItem(USEROTP_KEY, JSON.stringify(UserOtp));
  }

  public getPhoneNOOtp(): any {
    const phoneNootp = window.localStorage.getItem(OTP_KEY);
    if (phoneNootp) {
      return JSON.parse(phoneNootp);
    }
    return {};
  }


  public getUserPhoneNoOtp(): any {
    const userphoneNootp = window.localStorage.getItem(USEROTP_KEY);
    if (userphoneNootp) {
      return JSON.parse(userphoneNootp);
    }
    return {};
  }

  public SaveEmailOtp(emailotp:any): void {
    window.localStorage.removeItem(OTPEMAIL_KEY);

    window.localStorage.setItem(OTPEMAIL_KEY, JSON.stringify(emailotp));
  }

  public getEmailOtp(): any {
    const emailotp = window.localStorage.getItem(OTPEMAIL_KEY);
    if (emailotp) {
      return JSON.parse(emailotp);
    }
    return {};
  }


  public GetUrl(): string | null
  {
    return sessionStorage.getItem('merchantUrl');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
 
}
