import { Component, OnInit } from '@angular/core';
import { ExpeditionsService } from '../services/expeditions/expeditions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import * as moment from "moment";
import { ActionSheetOptionStyle } from '@capacitor/core';

const { Modals } = Plugins;

@Component({
  selector: 'app-expedicion-master',
  templateUrl: './expedicion-master.page.html',
  styleUrls: ['./expedicion-master.page.scss'],
})
export class ExpedicionMasterPage implements OnInit {

  expedition:any;
  isCharged:boolean = true;
  inDestiny:boolean;
  isDelivered:boolean = true;

  tab: string = "out";
  ret: boolean = false;

  constructor(private expeditionCtrl: ExpeditionsService, private route: ActivatedRoute, private router:Router, private loadingCtrl:LoadingController) {
    this.expedition = this.expeditionCtrl.getById(this.route.snapshot.paramMap.get('id'));
    /** console.log("EXPEDITION FILE OF:", this.expedition); **/
    this.tab = this.returning ? "in" : "out";
    //this.tab = this.returning ? 1 : 0; //ojo aqui

    //this.tabDoc = this.returning ? "in" : "out";
    this.tab = this.ret ? "in" : "out";
    this.isCharged = this.tabDoc.status.id > 2;
    this.isDelivered = this.tabDoc.status.id > 9;
  }

  ngOnInit() {}

  get tabDoc()
  {
   // console.log('VER TabDoc(): ', this.tab == "in" ? this.expedition.inDocumentation : this.expedition.outDocumentation);
    return this.tab == "in" ? this.expedition.inDocumentation : this.expedition.outDocumentation;
  }

  get ChargeDate()
  {
      if(this.tabDoc.chargeDate == null) return null;
      return moment(this.tabDoc.chargeDate).format("DD/MM/YYYY HH:mm A");
  }

  get FinalDate()
  {
      if(this.tabDoc.finalDate == null) return null;
      return moment(this.tabDoc.finalDate).format("DD/MM/YYYY HH:mm A");
  }

  charged()
  {
    if(this.tabDoc.status.id > 2 && this.tabDoc.status.id <= 9 || this.tabDoc.status.id > 12 && this.tabDoc.status.id <= 19) return;
    /** console.log("CHARGED ID:", this.tabDoc.status.id); **/
    this.isCharged = true;
    this.save();
  }

  delivered()
  {
    if(this.tabDoc.status.id == 9) return;
    this.isDelivered = true;
    this.save();
  }

  get returning()
  {
    //return this.expedition.outDocumentation.status.id >= 12;
    if(this.tabDoc.status.id == 9 || this.tabDoc.status.id >= 12)
    return this.expedition.ret == true;
  }

  validSave()
  {
    return this.isvalidDoc(this.tabDoc);
  }


  isvalidDoc(doc)
  {
    return (doc.ramp != null && doc.orderNo != null && doc.initialKm != null)
      && (doc.ramp != '' && doc.orderNo != '' && doc.initialKm != '');
  }

  save()
  {
      this.expeditionCtrl.saveExpedition(this.expedition).subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }

    /*
    saveStatus(estado)
    {
      this.expeditionCtrl.saveEstado(this.expedition, estado).subscribe(data => {
        //console.log(data);
        this.tabDoc;
       }, error => {
        console.log(error);
      });
    }
    */

  notifyUser(message, data)
   {
     const { Toast } = Plugins;
     Toast.show({
       text: message + ' ' + data,
     }).then();
   }

  gotoExpedition() {
    this.router.navigate(['/expedicion-master/'+this.route.snapshot.paramMap.get('id')]);
  }

  async saveStatus(estado) 
   {
     this.loadingCtrl.create({
       message:"Cambiando el estado...",
       duration: 2000
     }).then(load => {
       load.present();
       this.expeditionCtrl.saveEstado(this.expedition, estado).subscribe(
         success => 
         {
           this.notifyUser('Se ha completado la operación','');
           this.gotoExpedition();
           load.dismiss();
         },
         error => 
         {
           load.dismiss();
           this.notifyUser('Se ha generado un error en la operación','');
         }
       );
       load.onDidDismiss().then((dis) => {
         console.log('Dissmissed afer 2000');
       });
     })
   }

   async saveStatus2(estado) 
   {
     this.loadingCtrl.create({
       message:"Cambiando el estado...",
       duration: 2000
     }).then(load => {
       load.present();
       this.expeditionCtrl.saveEstado2(this.expedition, estado).subscribe(
         success => 
         {
           this.notifyUser('Se ha completado la operación','');
           this.gotoExpedition();
           load.dismiss();
         },
         error => 
         {
           load.dismiss();
           this.notifyUser('Se ha generado un error en la operación','');
         }
       );
       load.onDidDismiss().then((dis) => {
         console.log('Dissmissed afer 2000');
       });
     })
   }
  
   /*
    saveStatus2(estado)
    {
      this.expeditionCtrl.saveEstado2(this.expedition, estado).subscribe(data => {
        //console.log(data);
        this.tabDoc;
       }, error => {
        console.log(error);
      });
    }
    */


  doRefresh(event) {
    /** console.log('Begin async operation ESTADO'); **/
    this.tabDoc.then(() => event.target.complete()).catch(() => event.target.complete());
  }

  ionViewDidEnter() {
    this.tabDoc;
  }

  async showConfirm(estado) {
    this.saveStatus(estado);
  }

  async showConfirm2(estado) {
    this.saveStatus2(estado);
  }

  async showAlert() {
    let alertRet = await Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    });
  }


/*
  save()
  {
    this.loadingCtrl.create({message:"Salvando..."}).then(load => {
      load.present();
      this.expeditionCtrl.saveExpedition(this.expedition).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
    })
  }
*/
/*
    saveStatus(estado)
    {
      this.loadingCtrl.create({message:"Guardando estado..."}).then(load => {
        load.present();
        // console.log("ESTADO ID:", estado);
        this.expeditionCtrl.saveEstado(this.expedition, estado).subscribe(
          success => load.dismiss(),
          error => load.dismiss()
        );
        this.save();
        this.tabDoc;
      })
    }
*/

  /*
  async showConfirm(estado) {
    let confirmRet = await Modals.confirm({
      title: 'Confirmar cambio de estado',
      message: '¿Esta seguro de informar cambio de estado?'
    });
    if(confirmRet){
      this.saveStatus(estado);
    }
    // console.log('Confirma cambio estado', confirmRet);
  }
*/

}

