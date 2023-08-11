export interface UserForAuthenticationDto {
      password: string;
      emailId:string;
  }

  export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    userId:number;
}