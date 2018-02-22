import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoginVisible = false;
  isLoggedIn = false;
  loginBtnText = "Log in";

  toggleLogin(event){
    if(this.isLoggedIn){
      this.logout();
    }else{
      this.isLoginVisible = true;
    }
  }
  closeLoginModal(login){
    if(login){
      this.login();
    }
    this.isLoginVisible = false;
  }
  login(){
    this.isLoggedIn = true;
    this.loginBtnText = "Log out";
  }
  logout(){
    this.isLoggedIn = false;
    this.loginBtnText = "Log in";
  }

}
