import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
    events: Event[] = [];
    categories: Category[] = [];

    constructor(
        private eventService: EventService,
        private categoryService: CategoryService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        } else {
            this.loadCategories();
        }
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
            this.loadEvents();
        });
    }

    loadEvents(): void {
        this.eventService.getEvents().subscribe((events) => {
            this.events = events.map((event) => ({
                ...event,
                categoryName: this.getCategoryName(event.categoryId),
            }));
        });
    }

    getCategoryName(categoryId: string | undefined): string {
        const category = this.categories.find((cat) => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    }

    deleteEvent(id: string | undefined, event: MouseEvent): void {
        event.stopPropagation(); // Prevent triggering the editEvent method
        if (!id) {
            console.error('Event ID is undefined');
            return;
        }
        this.eventService.deleteEvent(id).subscribe({
            next: () => {
                this.events = this.events.filter((event) => event.id !== id);
            },
            error: (error) => {
                console.error('Error deleting event:', error);
            },
        });
    }

    editEvent(event: Event): void {
        this.router.navigate(['/add-event', event.id]);
    }
}
