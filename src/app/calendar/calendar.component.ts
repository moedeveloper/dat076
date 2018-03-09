import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Role} from '../utils/role';
import {EventCalendar} from '../utils/event';
import {UET} from '../utils/userEventTreatment';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

import { UserService } from '../utils/user.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService } from '../utils/event.service';

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
  eventDate = {year: 2018, month: 3, day: 4}
  eventTitle: string;
  eventEmployee: User;
  eventCustomer: User;
  eventTreatment: Treatment;
  eventCalendar: EventCalendar;
  uet : UET;
  calendar;


  constructor(private modalService: NgbModal, private userService : UserService, private treatmentService : TreatmentService, private eventService : EventService) {  }

  //dummy data until backend connection
  admRoleId: string;
  custRoleId: string;
  empRoleId: string;
  employees : User[];
  customers : User[];
  treatments : Treatment[];
  events = [];
  UETs : UET[];
  calendarResources = [];



  ngOnInit() {

    this.userService.getRoles().then(data => {
      for (var i = 0; i < data.length; i++){
        if (data[i].role == 'admin'){
          this.admRoleId = data[i].id
        } else if (data[i].role == 'customer'){
          this.custRoleId = data[i].id
        } else if (data[i].role == 'employee'){
          this.empRoleId = data[i].id
        }
      }
      this.userService.getUsersByRole(this.empRoleId).then(data =>{
        this.employees = data
        for(var i = 0; i < this.employees.length; i++){
          this.calendarResources.push({id: this.employees[i].id, title: this.employees[i].firstname}) //tuples used by fullcalender to display the employee columns 
        }
      })
      this.userService.getUsersByRole(this.custRoleId).then(data =>{
        this.customers = data
      })
      this.eventService.getUETs().then(data => {
        this.UETs = data
        console.log(this.UETs) //TODO: these are empty except the ID.. same with calendarEvents
        for (var i = 0; i < this.UETs.length; i++){
          this.eventService.getEvent(this.UETs[i].eventId).then(data => {
            var startTime = data.starttime
            var endTime = data.endtime
            this.treatmentService.getTreatment(this.UETs[i].treatementId).then(data => {
              var treatmentName = data.name
              this.events.push({title: 'From DB', description: treatmentName, resourceId: this.UETs[i].userId, start: startTime, end: endTime})
            })
          })
        }
      })

      this.treatmentService.getTreatments().then(resData => {
        this.treatments = resData;

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
          editable: false, // enable draggable events
          aspectRatio: 1.8,
          minTime: '08:00',
          maxTime: '20:00',
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'agendaDay,agendaWeek,month'
          },
          allDaySlot: false,
          defaultView: 'agendaDay',
          resourceLabelText: 'Employees',
          resources: self.calendarResources,
          events: self.events,
          selectable: true,
          selectHelper: true,
          select: function(start, end, jsEvent, view, resource) {
            self.eventDate.year = start.year()
            self.eventDate.month = start.month()+1
            self.eventDate.day = start.date()
            self.startTime.hour = start.hour()
            self.startTime.minute = start.minute()
            self.endTime.hour = end.hour()
            self.endTime.minute = end.minute()
            self.userService.getUser(resource.id).then(data => {
              //self.eventEmployee = self.employees[0];
              self.eventEmployee = data
              //console.log(self.eventEmployee)   //this is maximum retardedness... it doesnt work when taking data from database, even though the ID is the same as if you use self.employees[0]
              //console.log(self.employees[0])
              self.open(self.content);
            })
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
  })
  }

  createEvent(){
    var year: string = String(this.eventDate.year)
    var month: string = String(this.eventDate.month)
    var day: string = String(this.eventDate.day)
    var startHour: string = String(this.startTime.hour)
    var startMinute: string = String(this.startTime.minute)
    var endHour: string = String(this.endTime.hour)
    var endMinute: string = String(this.endTime.minute)
    if (month.length == 1){
      month = "0" + month
    }
    if (day.length == 1){
      day = "0" + day
    }
    if (startHour.length == 1){
      startHour = "0" + startHour
    }
    if (startMinute.length == 1){
      startMinute = "0" + startMinute
    }
    if (endHour.length == 1){
      endHour = "0" + endHour
    }
    if (endMinute.length == 1){
      endMinute = "0" + endMinute
    }
    var date = year+'-'+month+'-'+day+'T'
    var startTimeISO8601 = date+startHour+':'+startMinute+':00'
    var endTimeISO8601 = date+endHour+':'+endMinute+':00'
    $('#calendar').fullCalendar('renderEvent', {title: this.eventTitle, description: this.eventTreatment.name,
      resourceId: this.eventEmployee.id, start: startTimeISO8601,
      end: endTimeISO8601});

      //adds event to DB
      this.eventCalendar = new EventCalendar(null, startTimeISO8601, endTimeISO8601)
      console.log(this.eventCalendar)
      this.eventService.createEvent(this.eventCalendar).then(data => { //TODO: this fails.. the parameters are not registered correctly. same with calendarEvents
        var evtId = data.id
        this.uet = new UET(null, this.eventEmployee.id, evtId, this.eventTreatment.id, this.eventCustomer.id)
        this.eventService.createUET(this.uet)
      })
  }

  getAvailableTimes(){
    var eventsAll = $('#calendar').fullCalendar('clientEvents', function(evt){
      return evt;
    });
    var empId = this.employees[0].id // To David: when implementing the gui of this later on, pass empId as a method parameter
    var events = []
    for (var i = 0; i < eventsAll.length; i++){
      if (eventsAll[i].resourceId == empId){
        events.push(eventsAll[i])
      }
    }
    var d = new Date()
    d.setHours(d.getHours()+1)
    var amount = 5
    var availableTimes = []
    while (availableTimes.length < amount){
      var available: boolean = true
      if (d.getHours() > 19 || d.getHours() < 8){ // If salon is closed
        available = false
      } else {
        for (var i = 0; i < events.length; i++){ // If part of the next hour is occupied by another event
          if (d.getHours() >= events[i].start.hour() && (d.getHours() < events[i].end.hour() || (d.getHours() == events[i].end.hour() && events[i].end.minute() != 0))){
            available = false
          }
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
