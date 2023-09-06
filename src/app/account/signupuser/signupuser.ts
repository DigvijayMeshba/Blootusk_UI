export interface Signupuser
{
    email: string;
    phoneNumber:string;
    emailOTP :string;
    phoneNumberOTP: string;
    customerID: number;
    customerCode:string,
    posid: number;
    merchantCode:string,
    name:string;
    isPhoneNumberValidate: number;
    merchantID:number;
    stopMessage: number;
    referCode:string,
    referBy:number,
    rewardPoint: number;
    approvalStatus:string,
    recStatus:string,
    createdBy: number;
    createdDate:Date,
    modifyBy: number;
    modifyDate:Date;

    
}


export interface AddCustomer{
    customerID: number;
    customerCode: string;
    merchantID: number;
    merchantCode: string;
    name: string;
    phoneNumber: string;
    isPhoneNumberValidate: number;
    stopMessage: number;
    referCode: string;
    referBy: number;
    rewardPoint: number;
    approvalStatus: string;
    recStatus: string;
    createdBy: number;
    createdDate: Date;
    modifyBy: number;
    modifyDate: Date
  }


export interface UserForOtp
{
  phoneNumber: string;
  emailOTP: string;
  email:string;
  phoneNumberOTP: string
 // isOTPSent: true;
}
