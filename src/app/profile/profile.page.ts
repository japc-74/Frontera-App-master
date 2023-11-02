import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { FronteraService } from '../services/frontera/frontera.service';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild("fileInput") fileInput;
  user: any;  
  profileForm: FormGroup;
  passwordForm: FormGroup;
  changePassword: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private frontera: FronteraService,
    private menu: MenuController,
    private fromBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.reset();
  }

  reset() 
  {
    this.user = this.auth.userInfo.user;
    
    this.profileForm = this.fromBuilder.group({
      name: new FormControl(this.user.name, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      bio: new FormControl(this.user.bio, Validators.required)
    });

    this.passwordForm = this.fromBuilder.group({
      oldPassword: new FormControl(""),
      password: new FormControl(""),
      passwordConfirm: new FormControl("")
    });

    this.newAppImg = null;
    this.newImg = null;
  }

  get movementCount() 
  {
    try {
      return this.frontera.movementsCtrl.movements.movimientos.cuenta;
    } catch (error) {
      return 0;
    }
  }

  get expeditionCount() 
  {
    try {
      return this.frontera.expeditionCtrl.expeditions.expediciones.cuenta;
    } catch (error) {
      return 0;
    }
    
  }

  newImg = null;
  newAppImg = null;
  changing = "app";
  
  changeImage($event:Event, type)
  {
    $event.stopPropagation();
    this.changing = type;
    this.fileInput.nativeElement.click();
  }

  get profileImageSrc() 
  {    

    let url = '';
    if(this.newImg) 
    {
      url = this.newImg;
      return 'url(' + url + ')';
    }
    else {
      url = this.auth.profileImg;
      return 'url(' + url + ')';
    }
    
  }

  get appImageSrc() 
  {
    let url = "";
    if(this.newAppImg) 
    {
      url = this.newAppImg;
      return 'url(' + url + ')';
    }
    else {
      url = this.auth.appImg;
      return 'url(' + url + ')';
    }

  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      if(this.changing == "profile")
      {
        this.newImg = imageData;
      }
      else if(this.changing == "app")
      {
        this.newAppImg = imageData;
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  openMenu() {
    this.menu.open("first")
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

  send() 
  {
    let val = this.profileForm.value;

    if(this.newAppImg)
    {
      val.appImg = this.newAppImg;
    }

    if(this.newImg)
    {
      val.profileImg = this.newImg;
    }

    if(this.changePassword)
    {
      Object.assign(val, this.passwordForm.value);
    }

    this.auth.updateProfile(val).subscribe(() => this.reset());
  }

}
