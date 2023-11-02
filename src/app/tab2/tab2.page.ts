import { Component } from '@angular/core';
import { ExpeditionsService } from '../services/expeditions/expeditions.service';
import { MenuController, PopoverController } from '@ionic/angular';
import { ExpeditionPopoverComponent } from '../popovers/expedition-popover/expedition-popover.component';
import * as moment from "moment";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  statusFilter: string[] = [];
  filteredExpeditions:any[] = [];
  fromDate = null;
  toDate = null;
  constructor(
    public expeditionCtrl: ExpeditionsService,
     private menu:MenuController, 
     private popoverCtrl:PopoverController) {}





  openMenu() 
  {
    this.menu.open("first")
  }

  moment(date) 
  {
    return moment(date);
  }

  doRefresh(event) {
    //console.log('Begin async operation');

    this.expeditionCtrl.update().subscribe(() => event.target.complete(), () => event.target.complete());
  }

  updateExpeditions() 
  {
    //console.log("UPDATING FILTER", this.statusFilter)
    this.filteredExpeditions =  this.expeditionCtrl.allExpeditions.filter(e => {
      
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

  ionViewDidEnter() {
    //console.log("EXPEDITIONS VIEW ENTER")
    this.updateExpeditions();
  }

  from(e)
  {
    //console.log("FROM", this.fromDate);
    this.updateExpeditions();
  }

  to(e)
  {
    //console.log("TO", this.toDate);
    this.updateExpeditions();
  }

  momentDate(date) 
  {
    return moment(date).format("DD/MM/YYYY HH:mm A");
  }

  popExpedition($event:Event, expedition)
  {
    $event.stopPropagation();
    this.popoverCtrl.create({
      component:ExpeditionPopoverComponent,
      componentProps: {expedition:expedition},
      event:$event
    }).then(popover => {
      popover.present();
    })
  }
}
