import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-expedition-popover',
  templateUrl: './expedition-popover.component.html',
  styleUrls: ['./expedition-popover.component.scss'],
})
export class ExpeditionPopoverComponent implements OnInit {

  expedition:any;
  constructor(
    private popoverCtrl:PopoverController,
    private navParams:NavParams)
  {
    this.expedition = navParams.get("expedition");
  }

  close() 
  {
    this.popoverCtrl.dismiss();
  }

  ngOnInit() {}

}
