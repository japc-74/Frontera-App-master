import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { ApiService } from './services/api/api.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { FronteraService } from './services/frontera/frontera.service';
import { ExpeditionsService } from './services/expeditions/expeditions.service';
import { MovementsService } from './services/movements/movements.service';
//import { NotificationService } from './services/notification/notification.service';
import { HttpClientModule } from '@angular/common/http';
//import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  declarations: [AppComponent],
  entryComponents: [],
  providers: [
    ApiService,
    //NotificationService,
    AuthenticationService, 
    AuthGuardService,
    ExpeditionsService,
    MovementsService,
    FronteraService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}