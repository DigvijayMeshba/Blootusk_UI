
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
        GeneratedBy:string,
        merchantURL : string;
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
          longitude: string;
        }
        createdBy: number;
        createdDate:Date;
        modifyBy: number;
        modifyDate: Date;
   }


   export interface listMerchant{
    // merchantCode: string;
    // merchantPhoneNumber: string;
    // merchantName: string;
    // approvalStatus : string;  
    pageNumber : number;
    keyword:string;
   }

   
   export interface listTemplate{
    templateId: number,
    messageTypeId: number;
    merchantId: number;
    messageContent: string;
    recStatus: string;
    messageType:string;   
    pageNumber : number;
   }

   
export interface editMerchant
{
       merchantId: number;
       merchantCode: string;
       phoneNumber: string;
       email: string;
       password: string;
       GeneratedBy:string,
       organizationName: string;
       contactPersonName: string;
       deviceId: string;
       deviceOs: string;
       token: string;
       isPhoneNumberValidate: number;
       isEmailValidate: number;
       approvalStatus: string;
       recStatus: any;
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
       merchantURL : string;
  }

  export interface remarkHistory
  {
        remarkID: number;
        remark: string       
        merchantID: number,
        approvalStatus: string,
        remarkDate: Date
  }

  export enum Status {
    New,
    Rejected,
    Verified,
  }

  export interface addMessageTemplate 
  {
    templateId:number,
    merchantId : number,     
       messageContent : string,
       messageTypeId : number,
      recStatus:string,     
      messsageType :string,
      createdBy: number,
      createdDate:Date,
      modifyBy: number,
      modifyDate: Date,
  }

  export interface editMessageTemplate 
  {
    templateId:number,
    merchantId : number,     
       messageContent : string,
       messageTypeId : number,
      recStatus:string,     
     
      createdBy: number,
      createdDate:Date,
      modifyBy: number,
      modifyDate: Date,
  }



  export interface addReward 
  {     
      merchantId : number,    
      rewardPoint:number,
      rewardTypeId:number,
      rewardDate:string,
      RewardType:string,
      issuedBy:number,
      validity:number,
      recStatus:string,    
      createdBy: number,
      createdDate:Date,
      modifyBy: number,
      modifyDate: Date,
      IssuedByName :string,
  }

  export interface editReward
  {
      merchantId : number,    
      RewardPonitId :number,
      rewardPoint:number,
      rewardTypeID:number,
      RewardType:string,
      rewardDate:string,
      issuedBy:number,
      validity:number,
      recStatus:string,     
      IssuedByName :string,
      createdBy: number,
      createdDate:Date,
      modifyBy: number,
      modifyDate: Date,
  }