import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.scss'],
})
export class AddFuelComponent implements OnInit {
  

  secondTime:boolean = false;
  expedition:any;
  noInitial:number;
  noFinal:number;
  liters:number;
  noAdblue:number;
  litersSecondTime:number;

  constructor(public popoverController:PopoverController, public navParams: NavParams) {
    this.secondTime = navParams.get("secondTime");
    this.expedition = navParams.get("expedition");
    this.noInitial = navParams.get("noInitial");
    this.noFinal = navParams.get("noFinal");
    this.liters = navParams.get("liters");
    this.noAdblue = navParams.get("noAdblue");
    this.litersSecondTime = navParams.get("litersSecondTime");

    /** console.log("ADD FUEL POPOVER", this.expedition, this.secondTime); **/
  }

  //async DismissClick() {
  //  await this.popoverController.dismiss();
  //}

  async close() {
    let doc = this.expedition.outDocumentation;
    if(this.expedition.status >= 12)
    {
       doc = this.expedition.inDocumentation;
    }
    doc.combustible.noInitial = this.noInitial;
    doc.combustible.noFinal = this.noFinal;
    doc.combustible.liters = this.liters;
    doc.combustible.noAdblue = this.noAdblue;
    doc.combustible.litersSecondTime = this.litersSecondTime;
    //console.log("FUEL Assign: ", doc.combustible);

    if(doc.combustible.noInitial != null && doc.combustible.noFinal != null && doc.combustible.liters != null){
      //await this.popoverController.dismiss();
      await this.popoverController.dismiss(doc.combustible);
      //DismissClick();
    }
    this.popoverController.dismiss();

  }

  //dismiss(): void {
  //  this.popoverController.dismiss();
  //}

  async closeModal() {
    await this.popoverController.dismiss();
    //dismiss();
  }

  getLiters() {
    return this.liters = this.noFinal - this.noInitial;
  }

  get CurrentDoc() 
  {
    if(this.expedition.status.id > 3 && this.expedition.status.id < 9)
    {
      return this.expedition.inDocumentation;
    }
    else if(this.expedition.status.id >= 12)
    {
      return this.expedition.outDocumentation;
    }
  }

  ngOnInit(): void {
  }

}
