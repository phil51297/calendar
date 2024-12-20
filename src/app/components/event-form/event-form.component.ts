import { Component, Output, EventEmitter } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../shared/models/event.model';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
    @Output() eventAdded = new EventEmitter<Event>(); // EventEmitter to notify parent

    form = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        date: new FormControl('', [this.futureDateValidator]),
    });

    constructor(private eventService: EventService) {}

    futureDateValidator(control: AbstractControl) {
        return new Date(control.value) > new Date()
            ? null
            : { invalidDate: true };
    }

    submit() {
        if (this.form.invalid) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const event: Event = {
            title: this.form.value.title as string,
            description: this.form.value.description as string,
            date: this.form.value.date as string,
        };

        this.eventService.addEvent(event).subscribe({
            next: (newEvent: any) => {
                this.eventAdded.emit(newEvent);
                this.form.reset();
            },
            error: (error) => {
                alert('Error creating event');
            },
        });
    }
}
