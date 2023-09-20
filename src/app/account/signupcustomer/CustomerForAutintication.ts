export interface CustomerForAutintication {
  phoneNumber: string;  

}

export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
  userId:number;
}

export interface CustomerForOtp {
  phoneNumber: string;
  emailOTP: string;
  email:string;
  phoneNumberOTP: string


}