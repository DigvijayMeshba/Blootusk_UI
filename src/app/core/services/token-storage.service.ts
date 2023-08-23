import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const MERCHANT_KEY = 'Merchant';
const OTP_KEY = 'phoneNumberOTP';
const OTPEMAIL_KEY = 'phoneNumberOTP';
const USEROTP_KEY = 'userphoneNumberOTP';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token );
  }

  public Merchantdata(merchant:any): void {
    window.localStorage.removeItem(MERCHANT_KEY);

    window.localStorage.setItem(MERCHANT_KEY,   JSON.stringify(merchant));
  }

  public getMerchant(): any {
    const merchant = window.localStorage.getItem(MERCHANT_KEY);
    if (merchant) {
      return JSON.parse(merchant);
    }
    return {};
  }

  public SavePhoneOtp(phoneNootp:any): void {
    window.localStorage.removeItem(OTP_KEY);

    window.localStorage.setItem(OTP_KEY, JSON.stringify(phoneNootp));
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

    window.localStorage.setItem(OTP_KEY, JSON.stringify(emailotp));
  }

  public getEmailOtp(): any {
    const emailotp = window.localStorage.getItem(OTPEMAIL_KEY);
    if (emailotp) {
      return JSON.parse(emailotp);
    }
    return {};
  }


  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
 
}
