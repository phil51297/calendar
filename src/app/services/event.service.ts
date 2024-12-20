import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../shared/models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
    event: Event | undefined;
    private apiUrl = 'http://localhost:3000/events';

    constructor(private http: HttpClient) {}

    getEvents() {
        return this.http.get<Event[]>(this.apiUrl);
    }

    addEvent(event: Event) {
        return this.http.post(this.apiUrl, event);
    }
}
