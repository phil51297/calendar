import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../shared/models/event.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
    @Output() eventAdded = new EventEmitter<Event>();
    @Output() eventUpdated = new EventEmitter<Event>();
    @Input() isEditMode = false;
    form: FormGroup;
    eventId: string | null = null;
    categories: Category[] = [];

    constructor(
        private eventService: EventService,
        private categoryService: CategoryService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
        this.form = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            date: new FormControl('', [this.futureDateValidator]),
            categoryId: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.eventId = params.get('id');
            if (this.eventId && this.eventId !== '0') {
                this.isEditMode = true;
                this.loadEvent(this.eventId);
            }
        });

        this.loadCategories();
    }

    loadEvent(id: string): void {
        this.eventService.getEventById(id).subscribe((event) => {
            this.form.patchValue(event);
        });
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    futureDateValidator(control: AbstractControl) {
        return new Date(control.value) > new Date()
            ? null
            : { invalidDate: true };
    }

    submit(): void {
        if (this.form.invalid) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const event: Event = {
            title: this.form.value.title,
            description: this.form.value.description,
            date: this.form.value.date,
            categoryId: this.form.value.categoryId,
        };

        if (this.isEditMode) {
            this.updateEvent(event);
        } else {
            this.addEvent(event);
        }
    }

    addEvent(event: Event): void {
        this.eventService.addEvent(event).subscribe({
            next: (newEvent: Event) => {
                this.eventAdded.emit(newEvent);
                this.form.reset();
            },
            error: (error) => {
                console.error('Error adding event:', error);
            },
        });
    }

    updateEvent(event: Event): void {
        this.eventService.updateEvent(event).subscribe({
            next: (updatedEvent: Event) => {
                this.eventUpdated.emit(updatedEvent);
                this.form.reset();
            },
            error: (error) => {
                console.error('Error updating event:', error);
            },
        });
    }
}
