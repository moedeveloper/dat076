import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

import { EmployeeService } from '../utils/employee.service'

@Component({
  selector: 'app-caledar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('content') private content;
  content2 = this.content;
  closeResult: string;
  day: string = '2018-03-02T';
  startTime = {hour: 13, minute: 30};
  endTime = {hour: 13, minute: 30};
  eventTitle: string;
  eventEmployee: User;
  eventTreatment: Treatment;
  calendar;

  constructor(private modalService: NgbModal, private employeeService : EmployeeService) {  }

  //dummy data until backend connection

  employees : any;
  treatments = [
    new Treatment(1, "Haircut", "--"),
    new Treatment(2, "Prep", "--"),
    new Treatment(3, "Wash", "--"),
    new Treatment(4, "Trim", "--"),
    new Treatment(5, "Extensions", "--")
  ];



  ngOnInit() {

    this.employeeService.getEmployees().then(data => {
      console.log(data);
      this.employees = data;

      var self = this;
    	$(function() {
      let containerEl: JQuery = $('#calendar');
      self.setCalender(containerEl);
      	//console.log(containerEl);

      containerEl.fullCalendar({
      	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      	 // options here
        locale: 'sv',
      	timezone: 'local',
        firstDay: 1,
  	    editable: true, // enable draggable events
  	    aspectRatio: 1.8,
        minTime: '08:00',
        maxTime: '20:00',
  	    header: {
  	      left: 'today prev,next',
  	      center: 'title',
  	      right: 'agendaDay,agendaWeek,month,listWeek'
  	    },
        allDaySlot: false,
  	    defaultView: 'agendaDay',
  	    resourceLabelText: 'Employees',
  	    resources: [
  	        { id: self.employees[0].id, title: self.employees[0].firstname },
  	        { id: self.employees[1].id, title: self.employees[1].firstname },
  	        { id: self.employees[2].id, title: self.employees[2].firstname }
  	    ],
        selectable: true,
        selectHelper: true,
        select: function(start, end, jsEvent, view, resource) {
          //this opens in the wrong scope and the modal is not shown correctly
          //self.open(self.content);
          var title = prompt('Event Title:');

          //TODO: ajax call to store event in DB

          containerEl.fullCalendar('renderEvent', {title: "title", description: 'NEW FRESH TREATMENTS', resourceId: resource.id, start: start, end: end});
          containerEl.fullCalendar('unselect');
        },
        eventRender: function(event, element) {
          element.find('.fc-title').append("<br/>" + event.description);
          element.find(".fc-bg").css("pointer-events","none");
          element.append("<div style='position:absolute;bottom:0px;right:0px' ><button type='button' id='btnDeleteEvent' class='btn btn-block btn-primary btn-flat'>X</button></div>" );
          element.find("#btnDeleteEvent").click(function(){

            //TODO: ajax call to remove event in DB

            $('#calendar').fullCalendar('removeEvents',event._id);
          });
        }
      });
    });
  })
  }

  createEvent(){
    console.log(this.eventTitle)
    console.log(this.employees[0].id)
    console.log(this.eventTreatment)
    console.log(this.startTime)
    console.log(this.endTime)
    $('#calendar').fullCalendar('renderEvent', {title: this.eventTitle, description: 'waddup',
      resourceId: this.employees[0].id, start: this.day+String(this.startTime.hour)+':'+String(this.startTime.minute+':00'),
      end: this.day+String(this.endTime.hour)+':'+String(this.endTime.minute+':00')});
  }

  setCalender(calendar){
    this.calendar = calendar;
  }

  //modal open
  open(content) {
  console.log(content)
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
