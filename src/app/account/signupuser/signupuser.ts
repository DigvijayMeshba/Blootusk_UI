export interface SignupuserComponent
{
    email: string;
    phoneNumber:string;
    emailOTP :string;
    phoneNumberOTP: string;
    userId: number;
    userCode:string,
    posid: number;
    merchantCode:string,
    name:string;
    isPhoneNumberValidate: number;
    isEmailValidate: number;
    stopMessage: number;
    referCode:string,
    referBy:string,
    rewardPoint: number;
    approvalStatus:string,
    recStatus:string,
    createdBy: number;
    createdDate:Date,
    modifyBy: number;
    modifyDate:Date;
}