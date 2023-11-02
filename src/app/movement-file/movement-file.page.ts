import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../services/movements/movements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SERVER_URL } from '../../environments/environment';
import { Plugins } from '@capacitor/core';
import * as moment from "moment";

@Component({
  selector: 'app-movement-file',
  templateUrl: './movement-file.page.html',
  styleUrls: ['./movement-file.page.scss'],
})
export class MovementFilePage implements OnInit {
  movement:any;
  constructor(private movementsCtrl: MovementsService, private route: ActivatedRoute, private router:Router, private loadingCtrl:LoadingController) { 
    this.movement = this.movementsCtrl.getById(this.route.snapshot.paramMap.get('id'));
    //console.log("MOVEMENt FILE OF:", this.movement);
    //this.isCharged = this.expedition.status.id > 3;
    //this.isDelivered = this.expedition.status.id > 7;     
  }

  get StartDate() {
    if(this.movement.start == null) return null;
        return moment(this.movement.start).format("DD/MM/YYYY HH:mm A");
  }

  ngOnInit() {
  }


  gotoExpedition() {
    this.router.navigate(['/expedicion-master/id']);
  }

  gotoMovement() {
    this.router.navigate(['/movement-file/'+this.route.snapshot.paramMap.get('id')]);
  }

  gotoMovementDoc() {
    this.router.navigate(['/movement-documentation/'+this.route.snapshot.paramMap.get('id')]);
  }

  async showConfirm(estado) {
    this.saveStatus(estado);
  }

  notifyUser(message, data)
  {
    const { Toast } = Plugins;
    Toast.show({
      text: message + ' ' + data,
    }).then();
  }

  /*
  saveStatus(estado)
  {
    this.movementsCtrl.saveEstado(this.movement, estado).subscribe(data => {
      //console.log(data);
      this.send();
      this.gotoMovement();
      this.notifyUser('Se ha completado la operación','');
     }, error => {
      console.log(error);
    });
  }
  */

  
  async saveStatus(estado) 
  {
    this.loadingCtrl.create({
      message:"Cambiando el estado...",
      duration: 2000
    }).then(load => {
      load.present();
      this.movementsCtrl.saveEstado(this.movement, estado).subscribe(
        success => 
        {
          this.notifyUser('Se ha completado la operación','');
          this.gotoMovement();
          load.dismiss();
        },
        error => 
        {
          load.dismiss();
          this.notifyUser('Se ha generado un error en la operación','');
        }
      );
      load.onDidDismiss().then((dis) => {
        console.log('Dissmissed afer 2000');
      });
    })
  }

  public processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      if (!this.movement.hasOwnProperty("images")) {
        this.movement.images = [];
      }
      this.movement.images.push(imageData);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getSrc(str: string) {
    //console.log('getSrc: ' + SERVER_URL.slice(0,-3) + "/storage/" + str);
    return SERVER_URL.slice(0,-3) + "/storage/thumb_" + str;
  }

  send() 
  {
    this.loadingCtrl.create({message:"Guardando cambios..."}).then(load => {
      load.present();
      this.movementsCtrl.saveMovement(this.movement).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
    })
  }
}
