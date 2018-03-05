import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';

@Injectable()
export class EventService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api'; 

  constructor(public http: Http) { }

  getEvents(){

    return new Promise(resolve => {
  		this.http.get(this.url + "/uets")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data);
  		});
	  });
  }

  getEvent(id){

    return new Promise(resolve => {
  		this.http.get(this.url + '/uet/' + id)
  		.subscribe(data => {
			  resolve(data.json());
  		});
  	});
  }

  createEvent(event){

    let headers = new Headers();
  	headers.append('Content-Type', 'application/json');

  	this.http.post(this.url + '/uet/', JSON.stringify(event), {headers: headers})
  	.subscribe(res => {
  		console.log(res.json());
  	});
  }

  deleteEvent(id){

    this.http.delete(this.url + '/uet/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  updateEvent(event){
    return new Promise( resolve => {
      this.http.put(this.url + '/uet', event)
      .subscribe(data => {
        resolve(data.json());
      });
    });
  };

}
