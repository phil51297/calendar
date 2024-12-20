import { Component, Input } from '@angular/core';
import { Event } from '../../shared/models/event.model';

@Component({
    selector: 'app-event-item',
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent {
    @Input() event!: Event;
}
