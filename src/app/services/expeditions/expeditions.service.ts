import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import * as moment from "moment";
import { AuthApiService } from '../auth-api-service/auth-api-service';
//import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService extends AuthApiService {
  expeditions:any = [];
  mensajes:any = [];
  tokenFcm:any;
  //constructor(public api:ApiService,  private storage:Storage, public auth:AuthenticationService, public notification: NotificationService)
  constructor(public api:ApiService,  private storage:Storage, public auth:AuthenticationService)
  {
    //super(api, auth, notification);
    super(api, auth);
  }

  getById(id)
  {
    return this.allExpeditions.find(e => e.id == id);
  }

  get allStatus() 
  {
    return this.expeditions.estados;
  }

  get allMessages() 
  {
    return this.expeditions.mensajes;
  }

  get allExpeditions():any[]
  {
    return this.expeditions.expediciones.todas;
  }

  getTokenFCM(){
    this.storage.get('tokenFcm').then((val) => {
      console.log('getTokenFCM: ', val);
      return val;
    });
  }

  update() 
  {
    if(this.expeditions == null)
    {
      return new Observable<any>((observer) => {
        this.storage.get("EXPEDITIONS").then(saved => {
          //console.log("SAVED EXPEDITIONS", saved);
          if(saved)
          {
            this.expeditions = saved;
            this.mensajes = saved;
          }
          else
          {
            this.expeditions  = {
              "estados":[],
              "mensajes":[],
              "expediciones":{
                "cuenta":0,
                "todas": [],
              },
              "pendientes":{
                "cuenta":0,
                "todas": [],
              }
            };
            this.mensajes = {
              "estados":[],
            };
          }
        })

        this.updateOnServer().subscribe(
          success => observer.next(success),
          error => observer.error(error)
        )
       
      }); 
    }
    else 
    {
      return this.updateOnServer();
    }
  }


public saveToken(token):Observable<any>
  {
    //console.log("public saveToken(token) ", token);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveToken" , {data:token}).subscribe((success:any) => {
        if(success.changed)
        {
            //console.log('SaveToken(token) on Service: ' + token);
        }
        else {
          //observer.next(expedition);
          observer.next();
        }
      }, error => observer.error(error));
    });
  }

  save() 
  {
    let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    //console.log("SAVING EXPEDITIONS", now);
    for(let exp of this.expeditions.expediciones.todas)
    {      
      exp.updated = now;
    }
    return this.storage.set("EXPEDITIONS", this.expeditions);
  }

  save2()
  {
    let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    //console.log("SAVING EXPEDITIONS", now);
    for(let exp of this.expeditions.expediciones.todas)
    {
      exp.updated = now;
    }
    return this.storage.set("EXPEDITIONS", this.expeditions);
  }


  private updateOnServer() 
  {
    return new Observable<any>((observer) => {
      this.get("views/expeditions", null).subscribe((response: any) => {
        this.mensajes = response.mensajes;
        this.expeditions.todas = [];
        this.expeditions.expediciones = response.expediciones;
        this.expeditions.expediciones.cuenta = response.expediciones.cuenta;
        this.expeditions.pendientes = response.pendientes;
        this.expeditions.estados = response.estados;
        for(let exp of response.expediciones.todas)
        {
          let savedExp = this.getById(exp.id);

          if(savedExp == null) {
            this.expeditions.expediciones.todas.push(exp);
          }
          else 
          {
            this.updateById(exp.id, exp);

            /*
            this.updateStatusId(exp.id, exp, exp.status.id);
            */

            /* FOR OFFLINE
            if(moment(savedExp.updated).isBefore(exp.updated, 'second'))
            {
              //console.log("UPDATING EXPEDITION " + savedExp.id, savedExp, exp)
              this.updateById(exp.id, exp);
              
            }*/
          }
        }
        this.save().then(() => observer.next(response));
      }, error => observer.error(error));
    });    
  }

  public updateById(id, exp)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
        return;
      }
    }
  }

  public updateById2(id, exp)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
        return;
      }
    }
  }

  public updateStatusId(id, exp, stat)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.status == stat)
        {
            this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
            return;
        }

      }
    }
  }

  public updateStatusId2(id, exp, stat)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.status == stat)
        {
            this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
            return;
        }

      }
    }
  }

  public updateImageId(id, exp, image)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.image == image)
        {
            this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
            return;
        }

      }
    }
  }

  public updateFuelId(id, exp, fuel)
  {
    let array = this.allExpeditions;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.combustible == fuel)
        {
            this.expeditions.expediciones.todas[index] = Object.assign(element, exp);
            return;
        }

      }
    }
  }

  public updateExpedition(expedition):Observable<any> 
  {
    console.log("Update Sending Expedition ", expedition);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save?update=1" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          this.updateById(expedition.id, success.changed);
          this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public updateExpedition2(expedition):Observable<any>
  {
    console.log("Update Sending Expedition ", expedition);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save?update=2" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          this.updateById2(expedition.id, success.changed);
          this.save2().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveExpedition(expedition):Observable<any> 
  {
    //console.log("SENDING EXPEDITION", expedition);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          this.updateById(expedition.id, success.changed);
          this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveEstado(expedition, estad):Observable<any>
  {
    expedition.status = estad;
    //console.log("SAVING STATUS 1: ", expedition);
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save?estado=1" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.status = estad;
          this.updateById(expedition.id, success.changed);
          this.updateStatusId(expedition.id, success.changed, estad);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveEstado2(expedition, estad):Observable<any>
  {
    expedition.status = estad;
    //console.log("SAVING STATUS 1: ", expedition);
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save?estado=2" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.status = estad;
          this.updateById2(expedition.id, success.changed);
          this.updateStatusId2(expedition.id, success.changed, estad);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveCombustible(expedition, combustible):Observable<any>
  {
    expedition.combustible = combustible;
    //console.log("SAVING COMBUSTIBLE 1: ", combustible);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/save?combustible=1" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.combustible = combustible;
          this.updateById(expedition.id, success.changed);
          this.updateFuelId(expedition.id, success.changed, combustible);
          this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage(expedition, image):Observable<any>
  {
    console.log("SAVING saveImage: ");
    expedition.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveImage?image=1" , {data:expedition,dataI:image}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.image = image;
          this.updateById(expedition.id, success.changed);
          this.updateImageId(expedition.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage2(expedition, image):Observable<any>
  {
    console.log("SAVING saveImage2: ");
    expedition.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveImage?image=2" , {data:expedition,dataI:image}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.image = image;
          this.updateById(expedition.id, success.changed);
          this.updateImageId(expedition.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage3(expedition, image):Observable<any>
  {
    console.log("SAVING saveImage3 : " + image);
    expedition.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveImage?image=3" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.image = image;
          this.updateById(expedition.id, success.changed);
          this.updateImageId(expedition.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage4(expedition, image):Observable<any>
  {
    console.log("SAVING saveImage4 : " + image);
    expedition.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveImage?image=4" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.image = image;
          this.updateById(expedition.id, success.changed);
          this.updateImageId(expedition.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage5(expedition, image):Observable<any>
  {
    console.log("SAVING saveImage5 : " + image);
    expedition.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("autoexpeditions/saveImage?image=1" , {data:expedition}).subscribe((success:any) => {
        if(success.changed)
        {
          expedition.image = image;
          this.updateById(expedition.id, success.changed);
          this.updateImageId(expedition.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(expedition);
        }
      }, error => observer.error(error));
    });
  }

}
