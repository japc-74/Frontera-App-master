import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-images-exp',
  templateUrl: './images-exp.component.html',
  styleUrls: ['./images-exp.component.scss'],
})
export class ImagesExpComponent implements OnInit {

  @ViewChild("fileInput") fileInput;
  field:any
  constructor(public popoverCtrl: PopoverController, public navParams: NavParams) {

    this.field = navParams.get("field");
    if(!this.field) this.field= {}

  }

  close()
  {
    this.popoverCtrl.dismiss();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BadStatePopoverPage');
  }

  submit()
  {
    //console.log('comments: ');
    console.log(this.field.comments);
    this.popoverCtrl.dismiss(this.field);
  }

  removeImage(i)
  {
    this.field.images.splice(i, 1);
  }

  getPicture2()
  {
    this.fileInput.nativeElement.click();
  }

  getSrc(str:string)
  {
    if(str.startsWith('data'))
    {
      return str;
    }
    else
    {
      return SERVER_URL + "/image_uploads/" + str;
    }
  }

  processWebImage2(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.field.images.push(imageData);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  ngOnInit() {}

}
