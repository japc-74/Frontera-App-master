import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, PopoverController } from '@ionic/angular';

import { ExpeditionDocumentationPage } from './expedition-documentation.page';
import { PopoversModule } from '../popovers/popover.module';
import { RampsAutocompletePage } from '../ramps-autocomplete/ramps-autocomplete.page';
import { RampsAutocompletePageModule } from '../ramps-autocomplete/ramps-autocomplete.module';

const routes: Routes = [
  {
    path: '',
    component: ExpeditionDocumentationPage
  }
];

@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoversModule,
    RampsAutocompletePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpeditionDocumentationPage]
})
export class ExpeditionDocumentationPageModule {}
