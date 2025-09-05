import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginModule } from './auth/login/login.module';
import { RouterModule, RouterOutlet } from '@angular/router';

import { PageNotFoundModule } from './pagenotfound/pagenotfound.module';
import { AdminComponent } from './admin/admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptor } from './admin/admin-interceptor';
import { WorkspacesComponent } from './workspaces/my workspace/workspaces.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RouterOutlet,
    RouterModule,
    PageNotFoundModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
