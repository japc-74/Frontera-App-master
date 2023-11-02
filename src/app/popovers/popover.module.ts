import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { FormsModule } from '@angular/forms';
import { ChecklistStateComponent } from './checklist-state/checklist-state.component';
import { ChecklistMovComponent } from './checklist-mov/checklist-mov.component';
import { ImagesExpComponent } from './images-exp/images-exp.component';
import { ExpeditionPopoverComponent } from './expedition-popover/expedition-popover.component';
import { RouterModule } from '@angular/router';
import { MovementPopoverComponent } from './movement-popover/movement-popover.component';

@NgModule({
  entryComponents:[AddFuelComponent, ChecklistStateComponent, ChecklistMovComponent, ExpeditionPopoverComponent, MovementPopoverComponent, ImagesExpComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,    
  ],
  declarations: [AddFuelComponent, ChecklistStateComponent, ChecklistMovComponent, ExpeditionPopoverComponent, MovementPopoverComponent, ImagesExpComponent]
})
export class PopoversModule {}
