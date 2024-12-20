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
        localStorage.removeItem('currentUserId');
    }

    saveUser(): void {
        if (this.user?.id) {
            localStorage.setItem('currentUserId', String(this.user.id));
        }
    }

    retrievePersistedUser(): string | null {
        return localStorage.getItem('currentUserId');
    }

    isLoggedIn(): boolean {
        if (this.user) {
            this.saveUser();
            return true;
        }

        const savedUserId = this.retrievePersistedUser();
        if (savedUserId) {
            this.fetchUserById(savedUserId).subscribe((users: User[]) => {
                this.user = users[0] || null;
            });
            return true;
        }

        return false;
    }

    private fetchUserById(userId: string): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.apiUrl}?id=${userId}`);
    }
}
