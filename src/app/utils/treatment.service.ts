import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';
import { Treatment } from './treatment';

@Injectable()
export class TreatmentService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api';

  constructor(public http: Http) { }

  // Working request
  getTreatments(){
  	return new Promise<Treatment[]>(resolve => {
  		this.http.get(this.url + "/treatments")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.treatsApi);
  		});
	  });
  };


  // Working request
  getTreatment(id){

  	return new Promise<Treatment>(resolve => {
  		this.http.get(this.url + '/treatment/' + id)
  		.subscribe(data => {
			  resolve(data.json());
  		});
  	});
  };

  // Working request
  createTreatment(treatment){

  	let headers = new Headers();
	  headers.append('Content-Type', 'application/json');

	return new Promise<Treatment>(resolve => {
		this.http.post(this.url + '/treatment/', JSON.stringify(treatment), {headers: headers})
  		.subscribe(res => {
  			resolve(res.json());
  		});
	})
  };

  // Working request
  deleteTreatment(id){

  	this.http.delete(this.url + '/treatment/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  //TODO: not working correctly
  updateTreatment(treatment){

	return new Promise<Treatment>( resolve => {
		this.http.put(this.url + '/treatment', treatment)
		.subscribe(data => {
			resolve(data.json());
		});
	});
  };

}
