import { Component, OnInit } from '@angular/core';
import { ExpeditionsService } from '../services/expeditions/expeditions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
//import { Plugins } from '@capacitor/core';

import {
Plugins,
PushNotification,
PushNotificationToken,
PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications, Modals, Toast } = Plugins;


import * as moment from "moment";
import {
  ActionSheetOptionStyle
} from '@capacitor/core';


@Component({
  selector: 'app-expedition-file',
  templateUrl: './expedition-file.page.html',
  styleUrls: ['./expedition-file.page.scss'],
})
export class ExpeditionFilePage implements OnInit {

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
    //this.tabDoc = this.returning ? "in" : "out";
    this.tab = this.ret ? "in" : "out";
    this.isCharged = this.tabDoc.status.id > 3;
    this.isDelivered = this.tabDoc.status.id > 7;
  }
ngOnInit() {}
/*
async show(msg) {
  await Toast.show({
    text: msg
  });
}

  ngOnInit() {

    //this.frontera.expeditionCtrl.update();
    PushNotifications.register();

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        //alert('Push registration success, token: ' + token.value);
         console.log('Push registration success, token: ' + token.value)
        //this.storage.set('tokenFcm', token.value)
        //this.saveToken(token.value)
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error))
        console.log('Error on registration: ' + + JSON.stringify(error))
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Notificación Frontera')
        this.show('Notificación Frontera: ' + notification.body)
        console.log('Push received: ' + JSON.stringify(notification))
        this.gotoHome();
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification))
        console.log('Push action performed: ' + JSON.stringify(notification))
      }
    );

    //this.gotoHome();
  }
*/
  gotoHome() {
    this.router.navigate(['/tab1']);
  }


  async showActions() {
    let promptRet = await Modals.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload'
        },
        {
          title: 'Share'
        },
        {
          title: 'Remove',
          style: ActionSheetOptionStyle.Destructive
        }
      ]
    })
    //console.log('You selected', promptRet);
  }

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

  async showConfirm(estado) {
    this.saveStatus(estado);
  }


  async showAlert() {
    let alertRet = await Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    });
  }


  get tabDoc() 
  {
   // console.log('VER TabDoc(): ', this.tab == "in" ? this.expedition.inDocumentation : this.expedition.outDocumentation);
    return this.tab == "in" ? this.expedition.inDocumentation : this.expedition.outDocumentation;
  }

  get ChargeDate() 
  {
    
      //if(this.expedition.chargeDate == null) return null;
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
    if(this.tabDoc.status.id > 3 && this.tabDoc.status.id < 9 || this.tabDoc.status.id > 13 && this.tabDoc.status.id < 19) return;
    /** console.log("CHARGED ID:", this.tabDoc.status.id); **/
    this.isCharged = true;
    this.save();
  }

  delivered()
  {
    if(this.tabDoc.status.id != 6) return;
    this.isDelivered = true;
    this.save();
  }

  get returning() 
  {
    //return this.expedition.outDocumentation.status.id >= 12;
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

  save()
  {
      this.expeditionCtrl.saveExpedition(this.expedition).subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }

    saveStatus(estado)
    {

      this.expeditionCtrl.saveEstado(this.expedition, estado).subscribe(data => {
        console.log(data);
        //this.save();
        const isLoggedIn = true;
        const routeRedirect = document.querySelector('#tutorialRedirect');

        routeRedirect.setAttribute('to', isLoggedIn ? undefined : '/tab1');

        this.tabDoc;
       }, error => {
        console.log(error);
      });

    }


  doRefresh(event) {
    /** console.log('Begin async operation ESTADO'); **/

    this.tabDoc.then(() => event.target.complete()).catch(() => event.target.complete());
  }

  ionViewDidEnter() {
    this.tabDoc;
  }



}
