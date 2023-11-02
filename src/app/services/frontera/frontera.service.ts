import { Injectable } from '@angular/core';
import { ExpeditionsService } from '../expeditions/expeditions.service';
import { MovementsService } from '../movements/movements.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FronteraService {

  constructor(public expeditionCtrl: ExpeditionsService, public movementsCtrl: MovementsService) { }

  update(): Observable<any>
  {
    return new Observable<any>((observer:any) => {
      this.expeditionCtrl.update().subscribe(
        (expeditionResponse) => {
          this.movementsCtrl.update().subscribe(
            (movementsResponse) => {              
              observer.next();
            }, (movementsResponseError) => {
              observer.error("Error al obtener los movimientos");
            });
        }, (expeditionResponseError) => {
          observer.error("Error al obtener las expediciones");
        });
    });
  }

  
}
