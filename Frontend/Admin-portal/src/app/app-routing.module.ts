import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
