
export interface addMerchant
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
          stateId :number;         
          countryId: number;
          countryName:string;
          
          stateName: string;
          categoryName: string;
          latitude: string;
          longitude: string
        }
        createdBy: number;
        createdDate:Date;
        modifyBy: number;
        modifyDate: Date;
   }


   export interface listMerchant{
    merchantCode: string;
    merchantPhoneNumber: string;
    merchantName: string;
    approvalStatus : string;  
   }

   
export interface editMerchant
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
         countryName:string;
          stateName: string;
          categoryName: string;
         zip: string;
         stateId: number;
         countryId: number;
         latitude: string;
         longitude: string
       }      
       createdBy: number;
       createdDate:Date;
       modifyBy: number;
       modifyDate: Date;
  }

  export interface remarkHistory
  {
        remarkID: number;
        remark: string       
        merchantID: number,
        approvalStatus: string,
        remarkDate: Date
  }