import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = 

       

[
  {
    id: 100,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-fill',
    link: 'dashboards/admindashboard',
  },
  
  {
    id: 101,
    label: 'Merchant',
    icon: 'ri-user-fill',
    link: 'merchant/merchantlist',
  },

  {
    id: 101,
    label: 'Business Category',
    icon: 'ri-honour-line',
    link: 'businesscategory/businesscategorylist',
  },  
 

];

export const MENUCustomerItems: MenuItem[] =[

  {
    id: 100,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-fill',
    link: 'dashboards/customerdashboard',
  },
  {
    id: 101,
    label: 'Discount Coupon',
    icon: 'ri-honour-line',
    link: 'customer/discountcouponlist',
  },

  {
    id: 102,
    label: 'Reward Point',
    icon: 'ri-dashboard-2-fill',
    link: 'customer/rewardpointlist',
  },

 

]