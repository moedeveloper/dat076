import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  closeResult: string;
  isLoginVisible = false;
  isLoggedIn = false;
  loginBtnText = "Log in";

  toggleLogin(content){
    if(this.isLoggedIn){
      this.logout();
    }else{
      this.open(content);
      this.isLoginVisible = true;
    }
  }
  closeLoginModal(login){
    document.getElementById("userinput").setAttribute("placeholder", "Username");
    document.getElementById("passinput").setAttribute("placeholder", "Password");

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

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result=="Login"){
        this.login();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
