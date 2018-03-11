import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';
import { UET } from '../entities/userEventTreatment';
import { EventCalendar } from './event';
import { EventEntities } from '../entities/event';

@Injectable()
export class EventService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api';

  constructor(public http: Http) { }

  getUetEvents() {
    return new Promise<EventEntities[]>((resolv) => {
      this.http.get(this.url + '/uetevents').map(result => result.json()).subscribe((data) => {
        resolv(data.evtsApi);
      });
    });
  }

  getEvents() {
    return new Promise<EventCalendar[]>(resolve => {
  		this.http.get(this.url + "/eventcalendars")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.evtsApi);
  		});
	  });
  }

  getEvent(id){
    return new Promise<EventCalendar>(resolve => {
  		this.http.get(this.url + '/eventcalendar/' + id)
      .map(res => res.json())
  		.subscribe(data => {
			  resolve(data.evtApi);
  		});
  	});
  }

  createEvent(event){

    let headers = new Headers();
  	headers.append('Content-Type', 'application/json');

    return new Promise<EventCalendar>( resolve => {
    	this.http.post(this.url + '/eventcalendar/', JSON.stringify(event), {headers: headers})
      .map(res => res.json())
    	.subscribe(data => {
    		resolve(data.evtApi);
    	});
    });
  }

  deleteEvent(id){

    this.http.delete(this.url + '/eventcalendar/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  updateEvent(event){
    return new Promise<EventCalendar>( resolve => {
      this.http.put(this.url + '/eventcalendar/', event)
      .map(res => res.json())
  		.subscribe(data => {
			  resolve(data.evtApi);
      });
    });
  };

  getUETs(){
    return new Promise<UET[]>(resolve => {
  		this.http.get(this.url + "/uets")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.uetsApi);
  		});
	  });
  }

  getUET(id){

    return new Promise<UET>(resolve => {
  		this.http.get(this.url + '/uet/' + id)
      .map(res => res.json())
  		.subscribe(data => {
			  resolve(data.uetApi);
  		});
  	});
  }

  createUET(uet) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise<UET>( resolv => {
      this.http.post(this.url + '/uet/', JSON.stringify(uet), {headers: headers})
      .map(res => res.json()).subscribe(data => {
        resolv(data.uetApi);
      });
    });
  }

  deleteUET(id){

    this.http.delete(this.url + '/uet/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  updateUET(uet){
    return new Promise<UET>( resolve => {
      this.http.put(this.url + '/uet/', uet)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data.uetApi);
      });
    });
  };

}
