import { UserService } from '../utils/user.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService } from '../utils/event.service';
import { User } from '../entities/user';
import { EventEntities } from '../entities/event';
import { Injectable } from '@angular/core';

@Injectable()
export class Extensions {
    private events = [];
    constructor(private userService: UserService,
        private treatmentService: TreatmentService, private eventService: EventService) {}

        async service_getRoles() {
            return await this.userService.getRoles();
        }

        async getUsers(id: string) {
            return await this.userService.getUsersByRole(id);
        }

        initEmployees(users: User[]) {
            const calendarResources = [];
            users.forEach((u) => {
                calendarResources.push({id: u.id, title: u.firstname});
            });
            return calendarResources;
        }

        initEvents(evts: EventEntities[]) {
            const events = [];
            evts.forEach((e) => {
                this.events.push({title: 'From DB', description: e.treatment.name,
                resourceId: e.employee.id, start: e.event.starttime, end: e.event.endtime});
            });
            return this.events;
        }

        async getUets() {
            return await this.eventService.getUETs();
        }

        async getuetEvents() {
            return await this.eventService.getUetEvents();
        }
        async getTreatments() {
            return await this.treatmentService.getTreatments();
        }

        async getUserById(id: string) {
            return await this.userService.getUser(id);
        }

        getAvailableTimes(employeeID: string) {
            const events = [];

            const eventsAll = $('#calendar').fullCalendar('clientEvents', function(evt){
              return evt;
            });

            
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
}
