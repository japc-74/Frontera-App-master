import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RUTValidator } from '../helpers/rut-validator';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LoadingController } from '@ionic/angular';

export class AuthData {
  rut: string = '';
  password: string = '';
}

export class AuthViewOptions {
  passwordShow: boolean = false;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

  options: AuthViewOptions = new AuthViewOptions();
  errorMessage: string = null;
  loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private loadCtrl:LoadingController) {
    this.loginForm = formBuilder.group({
      rut: new FormControl("", Validators.compose([Validators.required, RUTValidator.validRUT])),
      password: new FormControl("", Validators.required),
    })
  }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      console.log("Intentando submitir un formulario de Login invalido");
      return;
    }
    this.errorMessage = null;

    this.loadCtrl.create({message:"Accediendo..."}).then(loadPopup => {
      //console.log("Login in", this.loginForm.value);
      loadPopup.present();
      this.authService.login(this.loginForm.value).subscribe(
        (success) => {
          console.log("LOGIN SUCCEDED", success);
          loadPopup.dismiss();
        },
        (error) => {
          //console.log("LOGIN FAILED", error);
          this.errorMessage = error.message;
          loadPopup.dismiss();
        }
      );
    });    
  }

}
