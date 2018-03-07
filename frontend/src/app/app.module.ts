import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin/admin.component';

// added by mo3
// used to connect to api
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AdminComponent
  ],
  imports: [
    HttpClient, // added by mo3 to connect to api
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
