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

  // {
  //   id: 102,
  //   label: 'Merchant Statement',
  //   icon: 'ri-honour-line',
  //   link: 'reports/merchantstatement',
  // },  

  // {
  //   id: 103,
  //   label: 'Customer Statement',
  //   icon: 'ri-honour-line',
  //   link: 'reports/customerstatement',
  // }, 


  {
    id: 102,
    label: 'Reports',
    icon: 'ri-book-3-fill',
    parentId: 8,
    subItems: [
      {
        id: 24,
        label: 'Merchant Statement',
        icon: 'ri-file-user-fill',
        link: 'reports/merchantstatement',
        parentId: 102
      },
      {
        id: 25,
        label: 'Customer Statement',
        icon: 'ri-shopping-bag-2-line',
        link: 'reports/customerstatement',
        parentId: 102
      }
    ]
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