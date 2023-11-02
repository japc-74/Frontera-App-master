import { Injectable, EventEmitter } from '@angular/core';
//import {
//  Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed
//} from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: any[] = [];

  token: string = null;

  //notificationReceived: EventEmitter<any> = new EventEmitter<any>();

  constructor(private storage: Storage) {

  }


  delete(notification) {
   const index = this.notifications.indexOf(notification);
   if (index !== -1) {
     this.notifications.splice(index, 1);
   }
  }

  add(notification) {
   notification.wasReceivedAt = moment().format("DD/MM/YYYY hh:mm");
   this.notifications.unshift(notification);
   console.log("ADDING NOTIFICATION", notification, this.notifications)
   this.save();
  }

  save() {
   this.storage.set("ALL_NOTIFICATIONS", this.notifications).then();
  }

}

