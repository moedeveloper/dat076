import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {CalendarComponent} from '../calendar/calendar.component'
import {AdminComponent} from '../admin/admin.component';
import {AppComponent} from '../app.component';

const routes: Routes = [
	{path: 'calendar', component: CalendarComponent},
	{path: 'admin', component: AdminComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
