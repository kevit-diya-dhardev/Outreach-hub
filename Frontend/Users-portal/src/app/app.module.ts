import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { JwtService } from './jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './dashboard/user.interceptor';
import { ContactsModule } from './contacts/contacts.module';
import { PageNotFoundModule } from './pagenotfound/pagenotfound.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    AuthModule,
    ContactsModule,
    MessagesModule,
    PageNotFoundModule,
  ],
  providers: [
    JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
