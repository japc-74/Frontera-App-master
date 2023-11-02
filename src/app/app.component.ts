import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
//import { NotificationService } from './services/notification/notification.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  menuItems: any = [
    {
      name: "Inicio",
      icon: "home",
      route: "/tabs/tab1"
    },
    {
      name: "Mis Expediciones",
      icon: "bus",
      route: "/tabs/tab2"
    },
    //{
    //  name: "Notificaciones",
    //  icon: "notifications",
    //  route: "/notifications"
    //},
    {
      name: "Mi Perfil",
      icon: "person",
      route: "/profile"
    }
    /*
{
      name:"Configuración",
      icon:"settings",
      route:"/settings"
    },

    {
      name: "Ayuda",
      icon: "help",
      route: "/tabs/tab3"
    }
*/
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private menu: MenuController,
    public authenticationService: AuthenticationService
   // public notifications: NotificationService
  ) {
    this.initializeApp();

  }

  get profileImageSrc() {
    return this.authenticationService.profileImg;
  }

  get appImageSrc() {
    return { "background-image": 'url(' + this.authenticationService.appImg + ')' };
  }

  close() {
    this.menu.close();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      if (this.platform.is("android")) {
        StatusBar.setBackgroundColor({ color: "#3880ff" });
      }
    }
    catch (err) {
      console.log("Normal in browser", err);
    }
    
    this.authenticationService.authState.subscribe(state => {
      if (state) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['auth']);
      }
    });
    //this.notifications.start().subscribe();
  }

}
