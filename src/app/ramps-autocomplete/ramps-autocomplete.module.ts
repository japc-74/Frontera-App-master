import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RampsAutocompletePage } from './ramps-autocomplete.page';


@NgModule({
  exports:[RampsAutocompletePage],
  entryComponents:[RampsAutocompletePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [RampsAutocompletePage] 
})
export class RampsAutocompletePageModule {}
