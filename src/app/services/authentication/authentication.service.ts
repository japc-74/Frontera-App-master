import { Injectable, NgZone } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../../environments/environment';


// token fcm
import { 
  Plugins
  //PushNotificationToken, PushNotification, PushNotificationActionPerformed 
} from "@capacitor/core";
//const { PushNotifications } = Plugins;
// token fcm end

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userInfo:any;
  tokenFcm:any;
  authState = new BehaviorSubject(false);
  constructor(private api:ApiService,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private zone:NgZone 
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

 ngOnInit(){
 }


  updateProfile(val)
  {
    return new Observable<any>((observer) => {
      this.api.post("auth/updateProfile", val, {"Api-Token":this.apiToken}).subscribe((response:any) => {      
          this.userInfo.user = response.data;
          this.save();
          observer.next(response.message);     
      }, (responseError:any) => {
          observer.error(responseError.error);
      });
    });
  }



  get profileImg() 
  {
    return this.userInfo.user.profileImg ? SERVER_URL + "/image_uploads/" + this.userInfo.user.profileImg : '/assets/brand/avatar-1577909_960_720.png';
  }

  get appImg() 
  {
    return this.userInfo.user.appImg ? SERVER_URL + "/image_uploads/" + this.userInfo.user.appImg : '/assets/brand/2864.png';
  }

  recoverPassword(body) 
  {
    return new Observable<any>((observer) => {
      this.api.post("auth/forgotPassword", body).subscribe((response:any) => {      
          observer.next(response.message);     
      }, (responseError:any) => {
          observer.error(responseError.error);
      });
    });
  }

  public get apiToken() 
  {
    return this.userInfo.credentials.token;
  }

 
  ifLoggedIn() {
    /*
    this.storage.get('tokenFcm').then((val) => {
      console.log('Token FCM read ifLoggedIn(): ', val);
      this.tokenFcm = val;
      console.log('Token FCM read ifLoggedIn() THIS : ', this.tokenFcm);
      this.saveToken();
      console.log('Token this.saveToken() : ', this.tokenFcm);
    })
    */
    this.storage.get('USER_INFO').then((response) => {
      console.log('USER_INFO', response);
      if (response) {
        this.userInfo = response;
        this.authState.next(true);        
      }
    });
  }

  /*
  getLocalToken(){
    this.storage.get('tokenFcm').then((val) => {
      console.log('Token FCM getLocalToken(): ', val);
      this.tokenFcm = val;
      return val;
    })

  }
  */

  login(credentials:{email:string, password:string}):Observable<any>
  {
    let body = credentials;
    body = Object.assign(body, {platform:"core"});
    //let body2 = Object.assign(body, {token:this.getLocalToken()});
    return new Observable<any>((observer) => {
      this.api.post("auth/login", body).subscribe((response:any) => {
        this.storage.set('USER_INFO', response.data).then(() => {
          //console.log('Login() El token FCM es: ' + this.tokenFcm);
          // fcm token
          //this.updateToken(this.tokenFcm);

          this.userInfo = response.data;
          this.router.navigate(['']);
          this.authState.next(true);

          observer.next(this.userInfo);
        })      
      }, (responseError:any) => {
          observer.error(responseError.error);
      });
    });
  }

  save() 
  {
    this.storage.set('USER_INFO', this.userInfo).then(() => {
      
    })    
  }

  logout() {
    console.log("LOGIN OUT");
    this.storage.clear().then(() => {
      this.router.navigate(['auth']);
      window.location.reload();
      this.authState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authState.value;
  }
}
