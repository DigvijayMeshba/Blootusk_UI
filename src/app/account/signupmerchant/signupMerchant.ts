
export interface signupMerchant
 {
        merchantId: number;
        merchantCode: string;
        phoneNumber: string;
        email: string;
        password: string;
        organizationName: string;
        contactPersonName: string;
        deviceId: string;
        deviceOs: string;
        token: string;
        isPhoneNumberValidate: number;
        isEmailValidate: number;
        approvalStatus: string;
        recStatus: string;
        remark: string;
        posInfo: {
          posid: number;
          merchantId: number;
          categoryId: number;
          poscode: string;
          posname: string;
          posaddress: string;
          zip: string;
          stateId: number;
          countryId: number;
          latitude: string;
          longitude: string
        },
        remarkList: [
          {
            remarkID: number;
            remark: string
          } ]
        
   }
// export interface signupMerchant 
// {
// merchantId:number;
// merchantName: string;
// phoneNumber: number;
// contactPersonName: string;
// email:string;
// password:string;
// posName: string;   
// posAddress: string;
// zip: number;
// state:  number;
// country:  number;
// createBy: number;
// createDate:Date;
// modifyBy: number;
// modifyDate: Date;
// }

// export class SIgnupPOSdetail
// {
// posName: string;   
// posAddress: string;
// zip: number;
// state:  number;
// country:  number;
// createBy: number;
// createDate:Date;
// modifyBy: number;
// modifyDate: Date;

// }


export interface UserForOtp
{
  phoneNumber: string;
  emailOTP: string;
  email:string;
  phoneNumberOTP: string
 // isOTPSent: true;
}