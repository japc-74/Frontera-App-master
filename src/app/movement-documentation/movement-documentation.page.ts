/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovementsService } from '../services/movements/movements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, PopoverController, ModalController } from '@ionic/angular';
import { ChecklistMovComponent } from '../popovers/checklist-mov/checklist-mov.component';
import { RampsAutocompletePage } from '../ramps-autocomplete/ramps-autocomplete.page';
import { SERVER_URL } from '../../environments/environment';
import { Plugins, CameraResultType, CameraSource, FileReadResult } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-movement-documentation',
  templateUrl: './movement-documentation.page.html',
  styleUrls: ['./movement-documentation.page.scss'],
})
export class MovementDocumentationPage implements OnInit {
  @ViewChild("fileInput") fileInput;
  movement:any;
  public error: string;
  private loading: any;
  private photos:any = [];
  photo: SafeResourceUrl;
  image: SafeResourceUrl;
  cam: string = "out";
  doc: any;

  disableDestination:boolean = false;
  constructor(private movementsCtrl: MovementsService,
     private route: ActivatedRoute, private router:Router,
      private loadingCtrl:LoadingController,
       private popoverController:PopoverController,
       private sanitizer: DomSanitizer,
       private readonly http: HttpClient,
       private readonly toastCtrl: ToastController,
       public alertController: AlertController,
       private modalCtrl: ModalController) { 
    // disabling feature // this.movement = this.movementsCtrl.getById(this.route.snapshot.paramMap.get('id'));
    //console.log("MOVEMENt FILE OF:", this.movement);
    // disabling feature // this.disableDestination = !(this.movement.particularDestinationName == null || this.movement.particularDestinationName == "");
    // disabling feature // this.doc = this.movement;
  }

  get tabDoc() 
  {
    // disabling feature // return this.movement.documentation;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //this.movement = this.movementsCtrl.getById(this.route.snapshot.paramMap.get('id'));
    //const doc = this.movement.documentation['images'];

    //console.log('doc:: '+this.doc['images'].length);
  }

  gotoExpedition() {
    // disabling feature // this.router.navigate(['/expedicion-master/id']);
  }

  gotoMovement() {
    // disabling feature // this.router.navigate(['/movement-file/'+this.route.snapshot.paramMap.get('id')]);
  }

  gotoMovementDoc() {
    // disabling feature // this.router.navigate(['/movement-documentation/'+this.route.snapshot.paramMap.get('id')]);
  }

  searchPatente()  
  {
    const doc = this.movement.documentation;
    this.modalCtrl.create({
      component:RampsAutocompletePage,
    }).then(modal => {
      modal.onDidDismiss().then((data:any) => {
        let picked = data.data;
        doc.ramp_id = picked.id;
        doc.ramp = picked.patente;
        console.log(picked, doc);
        this.notifyUser('Ha seleccionado la patente: ', this.movement.documentation.ramp);
      });
      modal.present();
    });
  }

  async takePhoto(type){
    const ab = await this.getPhoto(CameraSource.Prompt);
    await this.saveImageAPI(ab, type);
  }

  async selectPhoto(type) {
    const ab = await this.getPhoto(CameraSource.Photos);
    await this.saveImageAPI(ab, type);
  }

  private async saveImageAPI(imagen, type) {
    this.loading = await this.loadingCtrl.create({ message: "Subiendo fotos..." }).then(load => {
      load.present();
      const options = {
        method: 'POST',
        body: JSON.stringify(imagen),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
      }

      let name = Md5.hashStr(imagen);
      const file = new File([imagen], name + "_image.jpg");
      //console.log('image.localURL: ' + file["localURL"]);
      var imageUrl = imagen.webPath;
      this.photos.push(file["localURL"]);
      if (!this.movement.documentation.hasOwnProperty("images")) {
        this.movement.documentation.images = [];
      }
      this.movement.documentation.images.push(file["localURL"]);
      //console.log(this.expedition[doc].images);  
        this.movementsCtrl.saveImage(this.movement, imagen).subscribe(
          success => load.dismiss(),
          error => load.dismiss()
        );
      this.notifyUser('Se ha guardado la imágen', '');
      this.gotoMovementDoc();
    }); 
  }

  notifyUser(message, data)
  {
    const { Toast } = Plugins;
    Toast.show({
      text: message + ' ' + data,
    }).then();
  }

  private async getPhoto(source: CameraSource){
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    });
    //console.log('Image: ' + image);
    //console.log('Image.path: ' + image.path);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    //console.log('this.photo: ' + this.photo);
    return this.photo;
  }

  getSrc(str: string) {
    //console.log('getSrc: ' + SERVER_URL.slice(0,-3) + "/storage/" + str);
    return SERVER_URL.slice(0,-3) + "/storage/thumb_" + str;
  }

  send() 
  {
    this.loadingCtrl.create({message:"Enviando..."}).then(load => {
      load.present();
      this.movementsCtrl.saveMovement(this.movement).subscribe(
        success => 
        {
          load.dismiss();
          this.notifyUser('Se ha completado la operación','');
          this.gotoMovement();
        },
        error => 
        {
          load.dismiss();
          this.notifyUser('Se ha generado un error en la operación','');
        }
      );
    })
  }

  public processWebImage(event, type) {
    console.log("processWeImage function");
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      const doc = "documentation" ;
      if (!this.movement[doc].hasOwnProperty("images")) {
        this.movement[doc].images = [];
      }
      this.movement[doc].images.push(imageData);
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  validate($event, field)
  {
    //console.log("VALIDATING", field);
    field.good = "0";
    field.id = this.route.snapshot.paramMap.get('id');
    field.chk_id = this.movement["checlistId"];
    if(!field.validate) return;

    this.popoverController.create({
      component: ChecklistMovComponent,
      event: null,     
      componentProps:{field:field},
      cssClass:"bigger-popover"
    }).then(pop => {
      pop.onDidDismiss().then(() => {
        this.save(false);
        this.gotoMovement();
      });
      pop.present().then();
    });
  }

  save(toast) {
    const { Toast } = Plugins;
    this.movementsCtrl.save().then(() => {
      if (toast) {
        Toast.show({
          text: "Documentación guardada correctamente",
        }).then();
      }
    });
  }

}
*/