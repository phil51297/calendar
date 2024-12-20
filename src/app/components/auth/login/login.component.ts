import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../../app.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(): void {
        if (this.loginForm.invalid) {
            alert('Please fill in all fields.');
            return;
        }

        this.authService.authenticate(this.loginForm.value).subscribe({
            next: (users: User[]) => {
                if (users.length === 0) {
                    alert('Invalid username or password.');
                    return;
                }
                this.authService.user = users[0];
                this.authService.saveUser();
                this.router.navigate(['/calendar']);
            },
            error: () => {
                alert('Error during the request.');
            },
        });
    }
}
