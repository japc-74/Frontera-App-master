import { Component, OnInit } from '@angular/core';
//import { NotificationService } from '../services/notification/notification.service';
//import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from "@capacitor/core";
import { Plugins } from "@capacitor/core";

const { Modals, Toast } = Plugins;
//const { PushNotifications, Modals, Toast } = Plugins;
//import { FCM } from "capacitor-fcm";
//const fcm = new FCM();

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})

export class NotificationsPage implements OnInit {

  //constructor(public notification: NotificationService) { }
  constructor() { }
  ngOnInit() {
    //console.log("NOTIFICATIONS VIEW", this.notification.notifications)
  }

}
