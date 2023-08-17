export interface UserForAuthenticationDto {
      password: string;
      username:string;
      deviceID: string,
      deviceOS: string,

  }

  export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    userId:number;
}