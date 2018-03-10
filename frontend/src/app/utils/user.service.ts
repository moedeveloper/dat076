import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolve } from 'q';
import { User } from './user';
import { Role } from './role';

@Injectable()
export class UserService {

  url = 'http://nat-mo3-demo.hard.ware.fi:3000/api';

  constructor(public http: Http) {
  }

  // Working request
  getRoles(){
  	return new Promise<Role[]>(resolve => {
  		this.http.get(this.url + "/roles")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.rolesApi);
  		});
	  });
  };

  // Working request
  getUsersByRole(roleId){
  	return new Promise<User[]>(resolve => {
  		this.http.get(this.url + "/usersrole/" + roleId)
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.rolesApi);
  		});
	  });
  };


  // Working request
  getUsers(){
  	return new Promise<User[]>(resolve => {
  		this.http.get(this.url + "/users")
  		.map(res => res.json())
  		.subscribe(data => {
  			resolve(data.usersApi);
  		});
	  });
  };


  // Working request
  getUser(id){
  	return new Promise<User>(resolve => {
  		this.http.get(this.url + '/user/' + id)
      .map(res => res.json())
  		.subscribe(data => {
			  resolve(data.userApi);
  		});
  	});
  };

  // Working request
  createUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

  	return new Promise<User>( resolve => {
  		this.http.post(this.url + '/user', JSON.stringify(user), {headers: headers})
      .map(res => res.json())
  		.subscribe(data => {
  			resolve(data.userApi);
  		});
  	});
  };

  // Working request
  deleteUser(id){
  	this.http.delete(this.url + '/user/' + id).subscribe(res => {
  	});
  };

  //TODO: not working correctly
  updateUser(user){
  	return new Promise<User>( resolve => {
  		this.http.put(this.url + '/user/', user)
  		.subscribe(data => {
  			resolve(data.json());
  		});
  	});
  };

  //TODO: not working correctly
  searchUser(query){
	  return new Promise<User>( resolve => {
		  this.http.get(this.url + '/user/' + query)
		  .subscribe(data => {
			  resolve(data.json());
		  });
	  });
  };
}
