import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
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
  //   id: 8,
  //   label: 'ewr',
  //   icon: 'ri-apps-2-line',
  //   subItems: [
  //     {
  //       id: 9,
  //       label: 'MENUITEMS.APPS.LIST.CALENDAR',
  //       link: '/calendar',
  //       parentId: 8
  //     },
  //     {
  //       id: 10,
  //       label: 'MENUITEMS.APPS.LIST.CHAT',
  //       link: '/chat',
  //       parentId: 8
  //     },
      
   
  //   ]
  // },
  
 
  
 

];
