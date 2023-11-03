import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSearchbar } from '@ionic/angular';
import { FronteraService } from '../services/frontera/frontera.service';
import * as moment from "moment";
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild("search") search:IonSearchbar;
  filter = "";
  expAndMov: any[] = [];
  results: any[] = [];
  
  constructor(private navCtrl:NavController, private frontera:FronteraService) 
  {
    
    this.expAndMov = [];
    for(const exp of this.expeditions.todas)
    {
      this.expAndMov.push(exp);
    }
/*
    for(const mov of this.movements.todas)
    {
      this.expAndMov.push(mov);
    }
    */
  }
/*
  get movements() {
    return this.frontera.movementsCtrl.movements.movimientos;
  }
  */

  get expeditions() {
    return this.frontera.expeditionCtrl.expeditions.expediciones;
  }  

  ngOnInit() {
    this.search.setFocus().then();
  }

  close() 
  {
    this.navCtrl.pop();

  }

  momentDate(date) 
  {
    return moment(date).format("DD/MM/YYYY hh:mm");
  }

  loadFilter() 
  {
    if(this.filter == '') this.results = []; 

    let allFilters = this.filter.split(" ");
    this.results = this.expAndMov.filter(c => {
      for(let f of allFilters)
      {
        if(f == '') continue;

        if(c.type != null)
        {
          if(
            c.clientName.toLowerCase().includes(f.toLowerCase())
            || c.particularDestinationName.toLowerCase().includes(f.toLowerCase())
            || c.status.name.toLowerCase().includes(f.toLowerCase())
            || c.chargePlaceName.toLowerCase().includes(f.toLowerCase())
            
            ) return true;
        }
        else 
        {
          if(c.clientName.toLowerCase().includes(f.toLowerCase())
            || c.particularDestinyName.toLowerCase().includes(f.toLowerCase())
            || c.status.name.toLowerCase().includes(f.toLowerCase())
            || c.chargePlaceName.toLowerCase().includes(f.toLowerCase()))
            return true;
        }
      }

      return false;
      
    });
  }

}
