import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../shared/models/event.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
    events: Event[] = [];

    constructor(private eventService: EventService) {}

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        this.eventService.getEvents().subscribe((events) => {
            this.events = events;
        });
    }

    handleEventAdded(event: Event): void {
        this.events.push(event);
    }
}
