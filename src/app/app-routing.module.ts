import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'pages1', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
     //relativeLinkResolution: 'legacy',
    // initialNavigation: 'enabled',  // for one load page, without reload
   //change for #
     useHash: true,
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
