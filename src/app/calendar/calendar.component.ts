import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

import { EmployeeService } from '../utils/employee.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('content') private content;
  content2 = this.content;
  closeResult: string;
  startTime = {hour: 13, minute: 30};
  endTime = {hour: 13, minute: 30};
  eventDate;
  eventTitle: string;
  eventEmployee: User;
  eventTreatment: Treatment;
  calendar;


  constructor(private modalService: NgbModal, private employeeService : EmployeeService) {  }

  //dummy data until backend connection

  employees : any;
  treatments = [
    new Treatment(1, "Haircut", "--", ""),
    new Treatment(2, "Prep", "--", ""),
    new Treatment(3, "Wash", "--", ""),
    new Treatment(4, "Trim", "--", ""),
    new Treatment(5, "Extensions", "--", "")
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
    console.log(this.eventDate)
    console.log(this.employees[0].id)
    console.log(this.eventTreatment)
    console.log(this.startTime)
    console.log(this.endTime)
    if (String(this.eventDate.month).length == 1){
      this.eventDate.month = "0" + String(this.eventDate.month)
    }
    if (String(this.eventDate.day).length == 1){
      this.eventDate.day = "0" + String(this.eventDate.day)
    }
    if (String(this.startTime.hour).length == 1){
      this.startTime.hour = "0" + String(this.startTime.hour)
    }
    if (String(this.startTime.minute).length == 1){
      this.startTime.minute = "0" + String(this.startTime.minute)
    }
    if (String(this.endTime.hour).length == 1){
      this.endTime.hour = "0" + String(this.endTime.hour)
    }
    if (String(this.endTime.minute).length == 1){
      this.endTime.minute = "0" + String(this.endTime.minute)
    }
    var day = String(this.eventDate.year)+'-'+String(this.eventDate.month)+'-'+String(this.eventDate.day)+'T'
    $('#calendar').fullCalendar('renderEvent', {title: this.eventTitle, description: 'waddup',
      resourceId: this.employees[0].id, start: day+String(this.startTime.hour)+':'+String(this.startTime.minute+':00'),
      end: day+String(this.endTime.hour)+':'+String(this.endTime.minute+':00')});
  }

  getAvailableTimes(){
    var events = $('#calendar').fullCalendar('clientEvents')
    var d = new Date()
    console.log(events[0])
    d.setHours(d.getHours()+1)
    var amount = 5
    var availableTimes = []
    while (availableTimes.length < amount){
      var available: boolean = true
      for (var i in events){
        if (d.getHours() >= events[i].start.hour() && (d.getHours() < events[i].end.hour() || (d.getHours() == events[i].end.hour() && events[i].end.minute() != 0))){
          available = false
        }
      }
      if (available == true){
        var start = new Date(d.getTime())
        var end = new Date(d.getTime())
        start.setMinutes(0)
        end.setMinutes(0)
        start.setSeconds(0)
        end.setSeconds(0)
        end.setHours(end.getHours() + 1)
        availableTimes.push([start, end])
      }
      d.setHours(d.getHours()+1)
    }
    console.log(availableTimes)
    return availableTimes
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
