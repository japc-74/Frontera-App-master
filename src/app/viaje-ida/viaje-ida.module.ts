import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViajeIdaPage } from './viaje-ida.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeIdaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViajeIdaPage]
})
export class ViajeIdaPageModule {}
