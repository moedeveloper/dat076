import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {CalendarComponent} from '../calendar/calendar.component';
import {AppComponent} from '../app.component';

const routes: Routes = [
	{path: 'calendar', component: CalendarComponent},
	{path: 'home', component: AppComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
