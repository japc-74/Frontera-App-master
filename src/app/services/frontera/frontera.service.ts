import { Injectable } from '@angular/core';
import { ExpeditionsService } from '../expeditions/expeditions.service';
//import { MovementsService } from '../movements/movements.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FronteraService {

  constructor(public expeditionCtrl: ExpeditionsService) { }

  update(): Observable<any>
  {
    return new Observable<any>((observer:any) => {
      this.expeditionCtrl.update().subscribe(
        (expeditionResponse) => {
          observer.next();

        },
        (expeditionResponseError) => {
          observer.error("Error al obtener las expediciones");
        });
    });
  }

  
}
