import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpedicionMasterPage } from './expedicion-master.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedicionMasterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpedicionMasterPage]
})
export class ExpedicionMasterPageModule {}
