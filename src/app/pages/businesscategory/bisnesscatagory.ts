
export class addCatagory 
{
    "catgoryId":number;
"categoryName": string;
"rewardPoint": number;
"recStatus": string;
// "createBy": number;
// "createDate":Date;
// "modifyBy": number;
// "modifyDate": Date;
}
 
export interface listCatagory 
{
  categoryName: string;
  rewardPoint :number;
}
export interface editCatagory
{
categoryId : number;
categoryName: string;
rewardPoint: number;
recStatus: string;
// "createBy": number;
// "createDate":Date;
// "modifyBy": number;
// "modifyDate": Date;
}