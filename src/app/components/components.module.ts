import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StatusItemComponent } from './blocks/status-item/status-item.component';

@NgModule({
  exports:[StatusItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [StatusItemComponent]
})
export class ComponentsModule {}
