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
export class MovementsService extends AuthApiService {
  movements:any;
  //constructor(public api:ApiService, private storage:Storage, public auth:AuthenticationService, public notification: NotificationService )
  constructor(public api:ApiService, private storage:Storage, public auth:AuthenticationService )
  {
    //super(api, auth, notification);
    super(api, auth);
  }

  getById(id)
  {
    return this.allMovements.find(e => e.id == id);
  }

  get allStatus() 
  {
    return this.movements.estados;
  }

  get allMovements() 
  {
    return this.movements.movimientos.todas;
  }

  update() 
  {
    if(this.movements == null)
    {
      return new Observable<any>((observer) => {
        this.storage.get("MOVEMENTS").then(saved => {
          //console.log("SAVED MOVEMENTS", saved);
          if(saved)
          {
            this.movements = saved;
          }
          else
          {
            this.movements  = {
              "estados":[],
              "movimientos":{
                "cuenta":0,
                "todas": [],
              },
              "tipoMovimientos":[]
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

  save() 
  {
    let now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    //console.log("SAVING EXPEDITIONS", now);
    for(let mov of this.movements.movimientos.todas)
    {      
      mov.updated = now;
    }
    return this.storage.set("MOVEMENTS", this.movements);
  }

  private updateOnServer() 
  {
    return new Observable<any>((observer) => {
      this.get("views/movements", null).subscribe((response: any) => {
        this.movements.movimientos.cuenta = response.movimientos.cuenta;
        this.movements.tipoMovientos = response.tipoMovientos;
        this.movements.estados = response.estados;
        for(let mov of response.movimientos.todas)
        {
          let savedExp = this.getById(mov.id);

          if(savedExp == null) {
            this.movements.movimientos.todas.push(mov);
          }
          else 
          {
            if(moment(savedExp.updated).isBefore(mov.updated, 'second'))
            {
              //console.log("UPDATING EXPEDITION " + savedExp.id, savedExp, mov)
              this.updateById(mov.id, mov);
            }
          }         
        }
        this.save().then(() => observer.next(response));
      }, error => observer.error(error));
    });    
  }

  public updateById(id, mov)
  {
    let array = this.allMovements;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        this.movements.movimientos.todas[index] = Object.assign(element, mov);
        return;
      }
    }
  }

  public saveMovement(movement):Observable<any> 
  {
    //console.log("SENDING MOVEMENT", movement);
    return new Observable<any>((observer) => {
      this.post("automovements/save" , {data:movement}).subscribe((success:any) => {
        if(success.changed)
        {
          this.updateById(movement.id, success.changed);
          this.save().then(() => {
            observer.next(movement)
          });
        }
        else {
          observer.next(movement);
        }
        
      }, error => observer.error(error));
    });
  }


  public saveEstado(movement, estado):Observable<any>
  {
    console.log("SAVING saveEstado: ");
    movement.status.id = estado;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("automovements/saveStatus?estado=1" , {data:movement}).subscribe((success:any) => {
        if(success.changed)
        {
          movement.status.id = estado;
          this.updateById(movement.id, success.changed);
          this.updateStatusId(movement.id, success.changed, estado);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(movement);
        }
      }, error => observer.error(error));
    });
  }

  public saveImage(movement, image):Observable<any>
  {
    console.log("SAVING saveImage: ");
    movement.documentation.image = image;
    //console.log("SAVING STATUS 2: ", estad);
    return new Observable<any>((observer) => {
      this.post("automovements/saveImage?image=1" , {data:movement,dataI:image}).subscribe((success:any) => {
        if(success.changed)
        {
          movement.documentation.image = image;
          this.updateById(movement.id, success.changed);
          this.updateImageId(movement.id, success.changed, image);
          //this.save().then(() => observer.next(expedition));
        }
        else {
          observer.next(movement);
        }
      }, error => observer.error(error));
    });
  }

  public updateImageId(id, mov, image)
  {
    let array = this.allMovements;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.image == image)
        {
            this.movements.movimientos.todas[index] = Object.assign(element, mov);
            return;
        }

      }
    }
  }

  public updateStatusId(id, mov, estado)
  {
    let array = this.allMovements;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.id == id)
      {
        if(element.status.id == estado)
        {
            this.movements.movimientos.todas[index] = Object.assign(element, mov);
            return;
        }

      }
    }
  }

}
