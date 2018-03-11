import { UserService } from '../utils/user.service';
import { TreatmentService } from '../utils/treatment.service';
import { EventService } from '../utils/event.service';
import { User } from '../entities/user';
import { EventEntities } from '../entities/event';
import { Injectable } from '@angular/core';
import { UET } from '../entities/userEventTreatment';

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

        getAvailableTimes(employeeId: string, eventsAll: any[]) {
            const events = [];
            const amount = 5;
            const date = new Date();

            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < eventsAll.length; i++) {
              if (eventsAll[i].resourceId === employeeId) {
                events.push(eventsAll[i]);
              }
            }
            date.setHours(date.getHours() + 1 );
            const availableTimes = [];
            while (availableTimes.length < amount) {
              let available = true;

              if (date.getHours() > 19 || date.getHours() < 8) { // If salon is closed
                available = false;
              } else {
                // If part of the next hour is occupied by another event
                for (let i = 0; i < events.length; i++) {
                  if (date.getHours() >= events[i].start.hour() &&
                  (date.getHours() < events[i].end.hour() || (date.getHours() === events[i].end.hour() &&
                  events[i].end.minute() !== 0))) {
                    available = false;
                  }
                }
              }
              if (available === true) {
                const start = new Date(date.getTime());
                const end = new Date(date.getTime());
                start.setMinutes(0);
                end.setMinutes(0);
                start.setSeconds(0);
                end.setSeconds(0);
                end.setHours(end.getHours() + 1);
                availableTimes.push([start, end]);
              }
              date.setHours(date.getHours() + 1);
            }
            return availableTimes;
        }
}
