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
}
