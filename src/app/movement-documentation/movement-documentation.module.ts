import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovementDocumentationPage } from './movement-documentation.page';
import { PopoversModule } from '../popovers/popover.module';
import { RampsAutocompletePageModule } from '../ramps-autocomplete/ramps-autocomplete.module';

const routes: Routes = [
  {
    path: '',
    component: MovementDocumentationPage
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
  declarations: [MovementDocumentationPage]
})
export class MovementDocumentationPageModule {}
