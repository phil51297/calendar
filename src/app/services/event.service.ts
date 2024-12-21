import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../shared/models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
    private apiUrl = 'http://localhost:3000/events';

    constructor(private http: HttpClient) {}

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl);
    }

    addEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(this.apiUrl, event);
    }

    deleteEvent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event);
    }

    getEventById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${id}`);
    }
}
