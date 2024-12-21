import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user!: User | null;
    private readonly apiUrl = 'http://localhost:3000/users';

    constructor(private httpClient: HttpClient) {}

    register(userDetails: User): Observable<User> {
        return this.httpClient.post<User>(this.apiUrl, userDetails);
    }

    authenticate(
        credentials: Pick<User, 'username' | 'password'>
    ): Observable<User[]> {
        const { username, password } = credentials;
        return this.httpClient.get<User[]>(
            `${this.apiUrl}?username=${username}&password=${password}`
        );
    }

    signOut(): void {
        this.user = null;
        localStorage.removeItem('user');
    }

    saveUser(): void {
        if (this.user?.id) {
            localStorage.setItem('user', String(this.user.id));
        }
    }

    retrievePersistedUser(): string | null {
        return localStorage.getItem('user');
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('user') !== null;
    }

    private fetchUserById(userId: string): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.apiUrl}?id=${userId}`);
    }
}
