import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate:[AuthGuardService] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule', canActivate:[AuthGuardService] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate:[AuthGuardService] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate:[AuthGuardService] },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule', canActivate:[AuthGuardService] },
  { path: 'expedition-file/:id', loadChildren: './expedition-file/expedition-file.module#ExpeditionFilePageModule' },
  { path: 'expedition-documentation/:id', loadChildren: './expedition-documentation/expedition-documentation.module#ExpeditionDocumentationPageModule', canActivate:[AuthGuardService] },
  { path: 'movement-documentation/:id', loadChildren: './movement-documentation/movement-documentation.module#MovementDocumentationPageModule', canActivate:[AuthGuardService] },
  { path: 'movement-file/:id', loadChildren: './movement-file/movement-file.module#MovementFilePageModule', canActivate:[AuthGuardService] },
  { path: 'viaje-ida/:id', loadChildren: './viaje-ida/viaje-ida.module#ViajeIdaPageModule' },
  { path: 'viaje-ret/:id', loadChildren: './viaje-ret/viaje-ret.module#ViajeRetPageModule' },
  { path: 'expedicion-master/:id', loadChildren: './expedicion-master/expedicion-master.module#ExpedicionMasterPageModule' },
  { path: 'images', loadChildren: './popovers/images/images.module#ImagesPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
