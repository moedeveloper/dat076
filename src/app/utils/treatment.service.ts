import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';

@Injectable()
export class TreatmentService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api'; 

  constructor(public http: Http) { }

  // Working request
  getTreatments(){
  	return new Promise(resolve => {
  		this.http.get(this.url + "/treatements")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data);
  		});
	  });
  };


  // Working request
  getTreatment(id){

  	return new Promise(resolve => {
  		this.http.get(this.url + '/treatement/' + id)
  		.subscribe(data => {
			  resolve(data.json());
  		});
  	});
  };

  // Working request
  createTreatment(treatment){

  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');

  	this.http.post(this.url + '/treatement', JSON.stringify(treatment), {headers: headers})
  	.subscribe(res => {
  		console.log(res.json());
  	});
  };

  // Working request
  deleteTreatment(id){

  	this.http.delete(this.url + '/treatement/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  //TODO: not working correctly
  updateTreatment(employee){
	
	return new Promise( resolve => {
		this.http.put(this.url + '/treatement', JSON.stringify(employee))
		.subscribe(data => {
			resolve(data.json());
		});
	});
  };

}
