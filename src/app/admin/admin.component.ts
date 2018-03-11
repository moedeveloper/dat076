import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../utils/user';
import {Role} from '../utils/role';
import {Treatment} from '../utils/treatment';

import { UserService } from '../utils/user.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService} from '../utils/event.service';

import { timeout } from 'q';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedEmployee : User;
  selectedCustomer : User;
  selectedTreatment : Treatment;
  selectedEvent : Event;

  admRoleId: string;
  custRoleId: string;
  empRoleId: string;
  employees : User[];
  customers : User[];
  treatments : Treatment[];
  events : Event[];

  closeResult: string;

  newUser = new User(null, "", "", "", "");
  newTreatment = new Treatment(null, "", "", 0);

  testUser = {
    firstname: "Krille",
    lastname: "Åberg",
    telefon: "37373738282"
  }
  testTreatment = {
    name: "Long Hair",
    duration: "1h",
    price: 200,
    id: "8c990364-ed4e-45bc-b3b4-1cd9d3b8a5aa"
  }

  constructor(private modalService: NgbModal, private userService: UserService, private treatmentService: TreatmentService,
    private eventService: EventService) {}

  ngOnInit() {

      this.userService.getRoles().then(data => {
        console.log('getRoles:')
        console.log(data);
        for (var i = 0; i < data.length; i++){
          if (data[i].role == 'admin'){
            this.admRoleId = data[i].id
          } else if (data[i].role == 'customer'){
            this.custRoleId = data[i].id
          } else if (data[i].role == 'employee'){
            this.empRoleId = data[i].id
          }
        }
        this.userService.getUsersByRole(this.empRoleId).then(data => {
          console.log('emp')
          console.log(data)
          this.employees = data.filter(d => d);
          console.log(this.employees);
          this.selectedEmployee = this.employees[0];
        });

        this.userService.getUsersByRole(this.custRoleId).then(data => {
          console.log(data)
          this.customers = data.filter(d => d);
          this.selectedCustomer = this.customers[0];
        });
      });


      this.treatmentService.getTreatments().then(data => {
        this.treatments = data;
        this.selectedTreatment = this.treatments[1];
      });

  }

  // ---- User Methods ----

  createEmployee(){
    this.newUser = new User(null, this.newUser.firstname, this.newUser.lastname, this.newUser.telefon, this.empRoleId);
    //add this newUser to db
    this.userService.createUser(this.newUser).then(a => {
      this.userService.getUsersByRole(this.empRoleId).then(data => {
        this.employees = data
        this.selectedEmployee = this.employees[0];
      });
    });
  };

  createCustomer(){
    this.newUser = new User(null, this.newUser.firstname, this.newUser.lastname, this.newUser.telefon, this.custRoleId);
    //add this newUser to db
    this.userService.createUser(this.newUser).then(a => {
      this.userService.getUsersByRole(this.custRoleId).then(data => {
        this.customers = data
        this.selectedCustomer = this.customers[0];
      });
    });
  };

  updateUser(list, user, type){
    console.log(user);

    if(type === 'emp'){
      user.firstname = (<HTMLInputElement>document.getElementById('employeeFirstName')).value;
      user.lastname = (<HTMLInputElement>document.getElementById('employeeLastName')).value;
      user.telefon = (<HTMLInputElement>document.getElementById('employeeTelefon')).value;
    }else if(type === 'cust'){
      user.firstname = (<HTMLInputElement>document.getElementById('customerFirstName')).value;
      user.lastname = (<HTMLInputElement>document.getElementById('customerLastName')).value;
      user.telefon = (<HTMLInputElement>document.getElementById('customerTelefon')).value;
    }

    console.log('emp --->')
    console.log(user);

    this.userService.updateUser(user).then(a => {
      let index = list.indexOf(user);
      list[index] = user;
      console.log(a);
    });
  };

  deleteUser(list, user){

    this.userService.deleteUser(user.id);

    let index = list.indexOf(user);
    if (index > -1){
      list.splice(index, 1);
    }
    user = list[index+1];
  };

  // ---- Treatment Methods ----
  createTreatment(){
    this.newTreatment = new Treatment(null, this.newTreatment.name, this.newTreatment.duration, this.newTreatment.price);

    this.treatmentService.createTreatment(this.newTreatment).then(a => {
      console.log(a);
      this.treatmentService.getTreatments().then(data => {
        console.log('-----> data')
        console.log(data);
        this.treatments = data;
        console.log(this.treatments);
      });
    });
  };



  updateTreatment(list, treatment){
    treatment.name = (<HTMLInputElement>document.getElementById('treatmentName')).value;
    treatment.price = (<HTMLInputElement>document.getElementById('treatmentPrice')).value;
    treatment.duration = (<HTMLInputElement>document.getElementById('treatmentDuration')).value;

    console.log('treat -->')
    console.log(treatment);

    this.treatmentService.updateTreatment(treatment).then(a => {
      let index = list.indexOf(treatment);
      list[index] = treatment;
      console.log(a);
    });
  }

  deleteTreatment(list, item){
    this.treatmentService.deleteTreatment(item.id);

    let index = list.indexOf(item);
    if (index > -1){
      list.splice(index, 1);
    }
    item = list[index+1];
    // TODO: AJAX call
  };

  // ---------------------------

  onSelect(clickedItem, type) {
    switch(type) {
       case "employee": {
        this.selectedEmployee = clickedItem;
         break;
       }
       case "customer": {
         this.selectedCustomer = clickedItem;
       }
       case "treatment": {
        this.selectedTreatment = clickedItem;
         break;
       }
       case "event": {
        this.selectedEvent = clickedItem;
        break;
       }
       default:
         break;
   }
 }

   //modal open
   open(content) {
   console.log(content);
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
