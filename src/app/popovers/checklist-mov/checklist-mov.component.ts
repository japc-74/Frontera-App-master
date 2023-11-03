/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, NavParams, LoadingController } from '@ionic/angular';
import { SERVER_URL } from '../../../environments/environment';
//import { ExpeditionsService } from '../../services/expeditions/expeditions.service';
import { MovementsService } from '../../services/movements/movements.service';
import { Plugins, CameraResultType, CameraSource, FileReadResult } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checklist-mov',
  templateUrl: './checklist-mov.component.html',
  styleUrls: ['./checklist-mov.component.scss'],
})
export class ChecklistMovComponent implements OnInit {

  @ViewChild("fileInput") fileInput;

  field:any
  
  private counter = 0;
  public error: string;
  private loading: any;
  private photos:any = [];
  private _md5: Md5;

  movement: any;
  tab: string = "out";
  photo: SafeResourceUrl;
  image: SafeResourceUrl;
  cam: string;

  constructor(
    public popoverCtrl: PopoverController, 
    public navParams: NavParams,
    private route: ActivatedRoute,
    private movementsCtrl: MovementsService,

    private popoverController: PopoverController,
    private popoverController2: PopoverController,
    private loadingCtrl: LoadingController,

    private sanitizer: DomSanitizer

    ) {
    this.field = navParams.get("field");
    this.movement = this.movementsCtrl.getById(this.field.id);
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  close() 
  {
    this.popoverCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.movement = this.movementsCtrl.getById(this.field.id);
    //console.log('ionViewDidLoad BadStatePopoverPage');
  }

  submit()
  {
    console.log('comments: ');
    console.log(this.field.comments);
    this.popoverCtrl.dismiss(this.field);
  }

  removeImage(i)
  {
    this.field.images.splice(i, 1);
  }

  getPicture() 
  {
    this.fileInput.nativeElement.click();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      
      let imageData = (readerEvent.target as any).result;
      this.field.images.push(imageData);      
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  
  ngOnInit() {}

  async takePhoto(type) {

    const ab = await this.getPhoto(CameraSource.Prompt);
    await this.saveImageAPI(ab, type);
    await this.DismissClick();
    
  }
  
  async selectPhoto(type) {
    
    const ab = await this.getPhoto(CameraSource.Photos);
    await this.saveImageAPI(ab, type);
    
  }
  
  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source
    });
  
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      
    return this.photo;
  }
    
  private async saveImageAPI(imagen, type) {
    this.movement = this.movementsCtrl.getById(this.field.id);
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
      var imageUrl = imagen.webPath;
      this.photos.push(file["localURL"]);
          
      console.log('this.movement.images ' + this.movement);
      this.movementsCtrl.saveImage(this.movement, imagen).subscribe(
        success => load.dismiss(),
        error => load.dismiss()
      );
        
    });
       
  }

  getSrc(str: string) {
    console.log('getSrc: ' + SERVER_URL.slice(0,-3) + "/storage/" + str);
    return SERVER_URL.slice(0,-3) + "/storage/thumb_" + str;
  }

}

*/