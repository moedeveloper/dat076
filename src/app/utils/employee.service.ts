import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';
import { User } from './user';

@Injectable()
export class EmployeeService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api';

  constructor(public http: Http) { 
  }

  // Working request
  getEmployees(){
  	return new Promise<User[]>(resolve => {
  		this.http.get(this.url + "/users")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.usersApi);
  		});
	  });
  };
  

  // Working request
  getEmployee(id){

  	return new Promise<User>(resolve => {
  		this.http.get(this.url + '/user/' + id)
  		.subscribe(data => {
			  resolve(data.json());
  		});
  	});
  };

  // Working request
  createEmployee(employee){

  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');

	return new Promise<User>( resolve => {
		this.http.post(this.url + '/user', JSON.stringify(employee), {headers: headers})
		.subscribe(res => {
			resolve(res.json());
		});
	});
  };

  // Working request
  deleteEmployee(id){

  	this.http.delete(this.url + '/user/' + id).subscribe(res => {
  		console.log(res);
  	});
  };

  //TODO: not working correctly
  updateEmployee(employee){

	console.log('Update  Emp-->')
	console.log(employee);
	
	return new Promise<User>( resolve => {
		this.http.put(this.url + '/user/', JSON.stringify(employee))
		.subscribe(data => {
			resolve(data.json());
		});
	});
  };

  //TODO: not working correctly
  searchEmployee(query){
	  return new Promise<User>( resolve => {
		  this.http.get(this.url + '/user/' + query)
		  .subscribe(data => {
			  resolve(data.json());
		  });
	  });
  };

}
