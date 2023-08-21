import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { BusinesscategorylistComponent } from './businesscategorylist/businesscategorylist.component';
import { BusinesscategoryaddComponent } from './businesscategoryadd/businesscategoryadd.component';
import { BusinesscategoryeditComponent } from './businesscategoryedit/businesscategoryedit.component';



@NgModule({
  declarations: [
    BusinesscategorylistComponent,
    BusinesscategoryaddComponent,
    BusinesscategoryeditComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [RouterModule]
})
export class BusinesscategoryModule { }
