export interface listReward
{
    CustomerId:number;
    MerchantId:number;
}

export interface listReffreal
{
    CustomerId:number;
    pageNumber:number;
    Keyword:string;
    MerchantID : number;
    phoneNumber:string;

}

export interface listCustCoupon
{
    phoneNumber:string;
    customerId : number; 
    pageNumber:number;
    couponFilter:number;
}


