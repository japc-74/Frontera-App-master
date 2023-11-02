import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RUTValidator } from '../helpers/rut-validator';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup;
  errorMessage = null;
  constructor(formBuilder: FormBuilder, private auth:AuthenticationService, private router:Router) {
    this.forgotPasswordForm = formBuilder.group({
      rut: new FormControl("", Validators.compose([Validators.required, RUTValidator.validRUT])),
    })
  }

  recoverPassword() 
  {
    this.errorMessage = null;
    if(this.forgotPasswordForm.valid)
    {
      this.auth.recoverPassword(this.forgotPasswordForm.value).subscribe(
        success => {
          this.forgotPasswordForm.patchValue({rut:""});
          this.router.navigateByUrl("/auth");
          const { Toast } = Plugins;
          Toast.show({
            text:success.message,           
          });
        },
        error => {
          this.errorMessage = error.message;
        }
      )
    }
  }  

  ngOnInit() {
  }

}
