import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin/admin.component';

import { UserService } from './utils/user.service';
import { TreatmentService } from './utils/treatment.service';
import { EventService } from './utils/event.service';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { Extensions } from './calendar/calendar.extensions';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService, TreatmentService, EventService, Extensions ],
  bootstrap: [AppComponent]
})
export class AppModule { }
