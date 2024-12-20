import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../../../app.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    register(): void {
        if (this.registerForm.invalid) {
            alert('Please fill in all fields correctly.');
            return;
        }

        this.authService.register(this.registerForm.value).subscribe({
            next: () => {
                alert('Registration successful! Redirecting to login...');
                this.router.navigate(['/login']);
            },
            error: () => {
                alert('Error during registration.');
            },
        });
    }
}
