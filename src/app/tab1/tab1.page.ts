import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { FronteraService } from '../services/frontera/frontera.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ExpeditionsService } from '../services/expeditions/expeditions.service';
import * as moment from "moment";
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import {
Plugins,
PushNotification,
PushNotificationToken,
PushNotificationActionPerformed 
} from '@capacitor/core';

const { 
  PushNotifications, 
  Modals, Toast 
} = Plugins;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  blocks:any[] = [
    {
      name:"Expediciones",
      icon:"bus",
      link:"/tabs/tab2",
      amount: () => {
        try {
          return this.expeditions.cuenta;
        } catch (error) {
          return 0;
        }        
      }
    },

    {
      name:"Pendientes",
      icon:"alert",
      link:"/tabs/tab2",
      amount: () => {
        try {
          return this.expeditions.pendientes.cuenta;
        } catch (error) {
          return 0;
        }        
      }
    }
  ];

  expAndMov: any[] = [];
  mensajes: any[] = [];

  constructor(private expeditionCtrl: ExpeditionsService,
  private menu:MenuController, private frontera:FronteraService,
  private loadingCtrl:LoadingController, private authService: AuthenticationService,
  private storage: Storage, public toastController: ToastController) {}

  get movements() {
    return this.frontera.movementsCtrl.movements.movimientos;
  }

  get expeditions(){
    return this.frontera.expeditionCtrl.expeditions.expediciones;
  }

  get messages(){
    return this.frontera.expeditionCtrl.mensajes;
  }

  momentDate(date)
  {
    return moment(date).format("DD/MM/YYYY HH:mm A");
  }

  openMenu()
  {
    this.menu.open("first")
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    this.update().then(() => event.target.complete()).catch(() => event.target.complete());
  }

  ionViewDidEnter() {
    //console.log(this.expeditions);
    //console.log(this.expeditions.todas);
    this.update();
  }

  updateView() 
  {
    this.expAndMov = [];
    this.mensajes = [];
    console.log(this.expeditions.todas);
    for(const exp of this.expeditions.todas)
    {
      this.expAndMov.push(Object.assign({}, exp));
    }

    for(const mov of this.movements.todas)
    {
      this.expAndMov.push(Object.assign({}, mov));      
    }

    for(const mes of this.messages)
    {
      this.mensajes.push(Object.assign({}, mes));
    }
    console.log("UPDATING EXP AND MOV", this.expAndMov);
  }

async presentToast() {
    const toast = await this.toastController.create({
      message: 'Han habido cambios en sus expediciones.',
      duration: 3000
    });
    toast.present();
  }

async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      header: 'Transportes Frontera',
      message: msg,
      position: 'middle',
      buttons: [
        //{
        //  side: 'start',
        //  icon: 'star',
        //  text: 'Favorito',
        //  handler: () => {
        //    console.log('Click en favorito');
        //  }
        // },
        {
          text: 'Ok',
          // role: 'cancel',
          handler: () => {
            console.log('Ok click');
            this.update();
          }
        }
      ]
    });


    //toast.onDidDismiss(() => {
    //  console.log('Dismissed toast');
    //  this.update();
    //});

    toast.present();
    //this.update();
    //toast.dismiss();
  }


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
        console.log('Push registration success, token (A): ' + token.value)
        this.storage.set('tokenFcm', token.value)
        this.saveToken(token.value)
      }
    );

    PushNotifications.addListener('registrationError', 
      (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error))
        console.log('Error on registration (A): ' + + JSON.stringify(error))
      }
    );

    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        //alert(notification.title);
        //this.show('Notificación Frontera: ' + notification.body);
        this.presentToastWithOptions(notification.body);
        console.log('Push received (A): ' + JSON.stringify(notification));
        this.update();
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification))
        console.log('Push action performed (A): ' + JSON.stringify(notification))
        this.update();
      }
    );
      
    this.update();
  }


   // gotoExpedition() {
   //   this.router.navigate(['/expedition-master/id']);
   // }

    saveToken(token)
    {
      this.expeditionCtrl.saveToken(token).subscribe(data => {
        console.log('Saving token FCM on TAB (B) ' + data);
       }, error => {
        console.log(error);
      });
    }

  update() 
  {
    return new Promise<any>((resolve, reject) => {
      this.loadingCtrl.create({message:"Actualizando..."}).then(loadPopup => {      
        loadPopup.present();
        this.frontera.update().subscribe(
          success => {
            //console.log("SUCCESS DURING FRONTERA UPDATE", this.frontera.expeditionCtrl.expeditions, this.frontera.movementsCtrl.movements);
  
            this.updateView();
  
            loadPopup.dismiss();
            resolve();
          },
          error => {
            //console.log("ERROR DURING FRONTERA UPDATE");
            loadPopup.dismiss();
            resolve();
          }
        );
      });  
    });
  }

}
