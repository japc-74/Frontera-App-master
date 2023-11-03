/*
import { Component } from '@angular/core';
//import { MovementsService } from '../services/movements/movements.service';
import { MenuController, PopoverController } from '@ionic/angular';
//import { MovementPopoverComponent } from '../popovers/movement-popover/movement-popover.component';
import * as moment from "moment";
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  statusFilter: string[] = [];
  filteredMovements: any[] = [];
  fromDate;
  toDate;
  constructor(
    public movementsCtrl: MovementsService,
    private menu: MenuController,
    private popoverCtrl: PopoverController) { }

  openMenu() {
    this.menu.open("first")
  }

  doRefresh(event) {
    //console.log('Begin async operation');

    this.movementsCtrl.update().subscribe(() => event.target.complete(), () => event.target.complete());
  }

  updateMovements()
  {
    //console.log("UPDATING FILTER", this.statusFilter)
    this.filteredMovements =  this.movementsCtrl.allMovements.filter(e => {
      
      if(this.statusFilter.length == 0)
      {
        return this.checkDate(e);
      }
      else
      {
        return this.statusFilter.indexOf(e.status.id.toString()) !== -1 && this.checkDate(e);
      }
    })
  }

  checkDate(e) 
  {
     const from = this.fromDate == null ? null : moment(this.fromDate).format("YYYY-MM-DD") + " 00:00:00";
     const to = this.toDate == null ? null : moment(this.toDate).format("YYYY-MM-DD") + " 00:00:00";

     if(from != null && moment(e.updated).isBefore(from, "seconds"))
     {
        return false;
     }
     
     if(to != null && moment(e.updated).isAfter(to, "seconds"))
     {
        return false;
     }

     return true;
  }

  from(e)
  {
    //console.log("FROM", this.fromDate);
    this.updateMovements();
  }

  to(e)
  {
    //console.log("TO", this.toDate);
    this.updateMovements();
  }

  ionViewDidEnter() {
    //console.log("EXPEDITIONS VIEW ENTER")
    this.updateMovements();
  }

  popMovement($event: Event, movement) {
    $event.stopPropagation();
    this.popoverCtrl.create({
      component: MovementPopoverComponent,
      componentProps: { movement: movement },
      event: $event
    }).then(popover => {
      popover.present();
    })
  }

  momentDate(date) 
  {
    return moment(date).format("DD/MM/YYYY HH:mm A");
  }



}
*/