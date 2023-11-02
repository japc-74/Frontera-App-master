import { Component, OnInit } from '@angular/core';
import { RampsService } from '../services/ramps/ramps.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ramps-autocomplete',
  templateUrl: './ramps-autocomplete.page.html',
  styleUrls: ['./ramps-autocomplete.page.scss'],
})
export class RampsAutocompletePage implements OnInit {
  results:any[] = [];
  criteria:string = '';
  constructor(public modalCtrl:ModalController,  private rampsCtrl: RampsService) { }

  ngOnInit() {
    this.rampsCtrl.update().subscribe();
  }

  loadFilter() {

    if(this.criteria == '')
      this.results = [];

   this.results = this.rampsCtrl.ramps.filter(c => c.patente.toUpperCase().includes(this.criteria.toUpperCase()));
  }

  select(item)
  {
    this.modalCtrl.dismiss(item);
  }

}
