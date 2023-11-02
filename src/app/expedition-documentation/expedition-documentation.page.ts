import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpeditionsService } from '../services/expeditions/expeditions.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, LoadingController, ModalController } from '@ionic/angular';
import { AddFuelComponent } from '../popovers/add-fuel/add-fuel.component';
import { ChecklistStateComponent } from '../popovers/checklist-state/checklist-state.component';
import { ImagesExpComponent } from '../popovers/images-exp/images-exp.component';
import { SERVER_URL } from '../../environments/environment';
import { RampsAutocompletePage } from '../ramps-autocomplete/ramps-autocomplete.page';
import { Plugins, CameraResultType, CameraSource, FileReadResult } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';


const { Filesystem } = Plugins;

@Component({
  selector: 'app-expedition-documentation',
  templateUrl: './expedition-documentation.page.html',
  styleUrls: ['./expedition-documentation.page.scss'],
})
export class ExpeditionDocumentationPage implements OnInit {

  @ViewChild("fileInput") fileInput;

  private counter = 0;
  public error: string;
  private loading: any;
  private photos:any = [];
  private _md5: Md5;

  expedition: any;
  tab: string = "out";
  photo: SafeResourceUrl;
  image: SafeResourceUrl;
  cam: string = "out";

  constructor(
    private expeditionCtrl: ExpeditionsService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private popoverController2: PopoverController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private readonly http: HttpClient,
    private readonly toastCtrl: ToastController,
    public alertController: AlertController
  )
  {
    this.expedition = this.expeditionCtrl.getById(this.route.snapshot.paramMap.get('id'));
    /** console.log("EXPEDITION DOC OF:", this.expedition); **/
    this.tab = this.returning ? "in" : "out";
  }

  ngOnInit() {
    this.expedition = this.expeditionCtrl.getById(this.route.snapshot.paramMap.get('id'));
    //console.log("EXPEDITION TAB:", this.tab);
  }

  get tabDoc() 
  {
    return this.tab == "in" ? this.expedition.inDocumentation : this.expedition.outDocumentation;
    //console.log("EXPEDITION TAB:", this.tab);
  }
  
  segmentButtonClicked(ev: any) {
    this.cam = ev;
    //console.log('TAB CLICKED', this.cam);
  }

  get returning() {
    //console.log('Chequear: ', this.expedition.outDocumentation.status.id);
    return this.expedition.outDocumentation.status.id >= 12;
  }

  searchPatente(doc) {
    this.modalCtrl.create({
      component: RampsAutocompletePage,
    }).then(modal => {
      modal.onDidDismiss().then((data: any) => {
        let picked = data.data;
        doc.ramp_id = picked.id;
        doc.ramp = picked.patente;
        //console.log(picked, doc);
      });
      modal.present();
    });
  }

  isvalidDoc(doc) {
    return (doc.ramp != null && doc.orderNo != null && doc.initialKm != null)
      && (doc.ramp != '' && doc.orderNo != '' && doc.initialKm != '');
  }

  getPicture(type) {
    this.fileInput.nativeElement.click();
  }

  save(toast) {
    const { Toast } = Plugins;
    this.expeditionCtrl.save().then(() => {
      if (toast) {
        Toast.show({
          text: "Documentación guardada correctamente",
        }).then();
      }
    });
  }

  save2(toast) {
    const { Toast } = Plugins;
    this.expeditionCtrl.save2().then(() => {
      if (toast) {
        Toast.show({
          text: "Documentación guardada correctamente",
          }).then();
      }
    });
  }

  async openPopOver(secondTime = false)
  {
    const popover = await this.popoverController.create({
      component: AddFuelComponent,
      componentProps: {
        secondTime: secondTime, expedition: this.expedition.outDocumentation.combustible
      },
      cssClass: "bigger-popover"
    });

    popover.onDidDismiss()
      .then((result) => {
      //console.log(result['data']);
      this.saveCombustible(this.expedition.outDocumentation.combustible);
      this.save(false);
      //this.viewType = result['data'];
    });
    return await popover.present();
    //popover.present();
  }

  addFuel(secondTime = false) {
    console.log("FUEL Add: ", this.expedition.outDocumentation.combustible);
    this.popoverController.create({
      component: AddFuelComponent,
      event: null,
      componentProps: { secondTime: secondTime, expedition: this.expedition },
      cssClass: "bigger-popover"
    }).then(pop => {
      pop.onDidDismiss().then(() => {
        //console.log("FUEL Add: ", this.expedition.outDocumentation.combustible);
        //pop.dismiss();
        if(this.validar(this.expedition.outDocumentation.combustible) != false){
          alert('Yes');
          this.saveCombustible(this.expedition.outDocumentation.combustible);
          this.save(false);
        }else{
          alert('No');
        }
        pop.dismiss();
      });
      pop.present().then(() => {
        //this.save(false);
        //alert(this.expedition.outDocumentation.combustible);
        //this.saveCombustible(this.expedition.outDocumentation.combustible);
      });
    });
  }

  validar(doc){
    //alert(doc.noInitial);
    if(doc.noInitial != null && doc.noFinal != null && doc.liters != null){
      //await this.popoverController.dismiss();
      //this.popoverController.dismiss(doc.combustible);
      //DismissClick();
      return true;
    }else{
      return false;
    }
  }

  saveCombustible(combusti){
    this.loadingCtrl.create({message:"Guardando combustible..."}).then(load => {
      load.present();
      /** console.log("FUEL ID:", combustible); **/
      this.expeditionCtrl.saveCombustible(this.expedition, combusti).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
      this.save(false);
    })
  }

  select(item){
    this.modalCtrl.dismiss(item);
  }

  send(){
    this.loadingCtrl.create({ message: "Enviando..." }).then(load => {
      load.present();
      this.expeditionCtrl.saveExpedition(this.expedition).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
    })
  }

  updateDocs(){
    this.loadingCtrl.create({ message: "Enviando..." }).then(load => {
      load.present();
      this.expeditionCtrl.updateExpedition(this.expedition).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
    })
  }

  updateDocs2(){
    this.loadingCtrl.create({ message: "Enviando..." }).then(load => {
      load.present();
      this.expeditionCtrl.updateExpedition2(this.expedition).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
    })
  }

  validate($event, field) {
    //console.log("VALIDATING", field);
    field.good = "0";
    field.id = this.route.snapshot.paramMap.get('id');
    field.sentido = this.cam;
    field.chk_id = this.expedition["checlistId"];
    console.log('field.id ' + field.id);
    if (!field.validate) return;

    this.popoverController.create({
      component: ChecklistStateComponent,
      event: null,
      componentProps: { field: field },
      cssClass: "bigger-popover"
    }).then(pop => {
      pop.onDidDismiss().then(() => {
        this.save(false);
      });
      pop.present().then();
    });
  }

  addImage(field) {
    this.popoverController2.create({
      component: ImagesExpComponent,
      event: null,
      componentProps: { field: field },
      cssClass: "bigger-popover"
    }).then(pop => {
      pop.onDidDismiss().then(() => {
      this.save(false);
    });
      pop.present().then();
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
      const doc = type == "in" ? "inDocumentation" : "outDocumentation";
      if (!this.expedition[doc].hasOwnProperty("images")) {
        this.expedition[doc].images = [];
      }
      this.expedition[doc].images.push(file["localURL"]);
      //console.log(this.expedition[doc].images);  
      if(this.cam == 'out'){
        this.expeditionCtrl.saveImage(this.expedition, imagen).subscribe(
          success => load.dismiss(),
          error => load.dismiss()
        );
      }
      if(this.cam == 'in'){
        this.expeditionCtrl.saveImage2(this.expedition, imagen).subscribe(
          success => load.dismiss(),
          error => load.dismiss()
        );
      }
    }); 
  }

  private readFile(webPath: string): Promise<FileReadResult> {
    try {
      return Plugins.Filesystem.readFile({
        path: webPath
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async showToast(ok: boolean) {
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }

  public processWebImage(event, type) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      const doc = type == "in" ? "inDocumentation" : "outDocumentation";
      if (!this.expedition[doc].hasOwnProperty("images")) {
        this.expedition[doc].images = [];
      }
      this.expedition[doc].images.push(imageData);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getSrc(str: string) {
    //console.log('getSrc: ' + SERVER_URL.slice(0,-3) + "/storage/" + str);
    return SERVER_URL.slice(0,-3) + "/storage/thumb_" + str;
  }

}
