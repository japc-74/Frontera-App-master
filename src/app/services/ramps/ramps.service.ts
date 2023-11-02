import { Injectable } from '@angular/core';
import { AuthApiService } from '../auth-api-service/auth-api-service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApiService } from '../api/api.service';
//import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RampsService extends AuthApiService {
  ramps: any;

  //constructor(public api:ApiService, public auth:AuthenticationService, private storage:Storage, public notification:NotificationService)
  constructor(public api:ApiService, public auth:AuthenticationService, private storage:Storage)
  {
    //super(api, auth, notification);
    super(api, auth);
  }


  update() : Observable<any>
  {
    return new Observable<any>((observer) => {
      this.get("views/ramps", null).subscribe((response: any) => {
        this.ramps = response;
        observer.next(response);
      }, error => observer.error(error));
    });  
  }
}
