import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../utils/user';
import {Role} from '../utils/role';
import {EventCalendar} from '../utils/event';
import {Treatment} from '../utils/treatment';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/locale/sv.js';
import 'fullcalendar-scheduler';

import { UserService } from '../utils/user.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService } from '../utils/event.service';
import {Roles} from '../entities/roles';
import { EventEntities } from '../entities/event';
import { Extensions } from './calendar.extensions';
import { EventDate, Moment, TimeSlot } from './timeSlot';
import { UET } from '../entities/userEventTreatment';
import { element } from 'protractor';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('content') private content;
  content2 = this.content;
  closeResult: string;

  startTime = {hour: 13, minute: 0o00};
  endTime = {hour: 14, minute: 0o00};
  eventDate = {year: 2018, month: 3, day: 4};

  eventTitle: string;
  eventEmployee: User;
  eventCustomer: User;
  eventTreatment: Treatment;
  eventCalendar: EventCalendar;
  uet: UET;
  calendar;
  cadmRoleId: string;
  custRoleId: string;
  empRoleId: string;
  employees: User[];
  customers: User[];
  treatments: Treatment[];
  UETs: UET[];
  calendarResources = [];
  availablEmployee: User;
  pickedTime;
  availableTimes;

  constructor(private modalService: NgbModal, private userService: UserService,
     private treatmentService: TreatmentService, private eventService: EventService, private extenstion: Extensions) {}
  async ngOnInit() {

    const roles = await this.extenstion.service_getRoles();
    // 1. Resolve entities
    const customer = roles.find( x => x.role === Roles.customer.toString());
    const employee = roles.find( x => x.role === Roles.employee.toString());
    const admin = roles.find( x => x.role === Roles.admin.toString());
    this.custRoleId = customer.id;
    this.cadmRoleId = admin.id;
    this.empRoleId = employee.id;

    this.treatments = await this.treatmentService.getTreatments();
    this.employees = await this.extenstion.getUsers(employee.id);
    this.customers = await this.extenstion.getUsers(customer.id);
    const uetEvents = await this.extenstion.getuetEvents();
  // let events = [
  //   {
  //     id: '195471ca-2c96-42e7-84b3-2265db3a17e2',
  //     title: 'Sara',
  //     description: 'description',
  //     resourceId: 'd4a2f9e0-46f7-4317-93ef-2e848106ae6b',
  //     start: '2018-03-11T11:00:00Z',
  //     end: '2018-03-11T14:00:00Z',
  //     allDay: false
  //   }
  // ];

    // 2. init calendar
    this.calendarResources = this.extenstion.initEmployees(this.employees);
    const arrayOfEvents = this.extenstion.initEvents(uetEvents);

    const self = this;
    $(async function() {
      const containerEl: JQuery = $('#calendar');
      self.setCalender(containerEl);
      containerEl.fullCalendar({
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        locale: 'sv',
        eventLimit: false,
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
        defaultView: 'agendaDay',
        resourceLabelText: 'Employees',
        resources: self.calendarResources,
        allDayDefault: false,
        allDaySlot: true,
        events: arrayOfEvents,
        selectable: true,
        selectHelper: true,
        select: async (start, end, jsEvent, view, resource) => {
          self.eventDate.year = start.year();
          self.eventDate.month = start.month() + 1;
          self.eventDate.day = start.date();
          self.startTime.hour = start.hour();
          self.startTime.minute = start.minute();
          self.endTime.hour = end.hour();
          self.endTime.minute = end.minute();
          self.eventEmployee = await self.extenstion.getUserById(resource.id);
          self.open(self.content);
        },
        eventRender: function(event, element, view) {
          element.find('.fc-title').append('<br/>' + event.description);
          element.find('.fc-bg').css('pointer-events', 'none');
          element.append('<div style=\'position:absolute;bottom:0px;right:0px\' >' +
          '<button type=\'button\' id=\'btnDeleteEvent\' ' +
          'class=\'btn btn-block btn-primary btn-flat\'>X</button></div>' );
          element.find('#btnDeleteEvent').click(function() {
            $('#calendar').fullCalendar('removeEvents', event._id);
            self.deleteEvent(event.id);
          });
        },
      });
    });
  }

  async deleteEvent(id) {
    await this.eventService.deleteUET(id);
  }
  async createEvent() {
    const _eventDate = new EventDate(this.eventDate.year, this.eventDate.month, this.eventDate.day);
    const _startMoment = new Moment(this.startTime.hour, this.startTime.minute);
    const _endMoment = new Moment(this.endTime.hour, this.endTime.minute);

    const timeSlot = new TimeSlot(_startMoment, _endMoment, _eventDate);
    const startTimeISO8601 = timeSlot.getStartTimeISO8601();
    const endTimeISO8601 = timeSlot.getEndTimeISO8601();
    this.uet = new UET(this.eventEmployee.id, this.eventTreatment.id, this.eventCustomer.id, startTimeISO8601, endTimeISO8601);
    // add new uet event to db
    const newUet = await this.eventService.createUET(this.uet);
    $('#calendar').fullCalendar('renderEvent', {
      id: newUet.id,
      title: this.eventCustomer.firstname + ' ' + this.eventCustomer.lastname,
      description: this.eventTreatment.name,
      resourceId: this.eventEmployee.id,
      start: startTimeISO8601,
      end: endTimeISO8601
    }, true);
  }

  setCalender(calendar) {
    this.calendar = calendar;
  }
  formatTime(d) {
    const temp = new Date(d);
    return temp;
  }

  updateAvailableList() {
    const eventsAll = $('#calendar').fullCalendar('clientEvents', function(evt) {
      return evt;
    });
    this.availableTimes = this.extenstion.getAvailableTimes(this.availablEmployee.id, eventsAll);
  }
  setPickedTime(time) {
    this.pickedTime = time;
  }

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
