import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private accessToken: string;
    http = inject(HttpClient);
    private _profileURL = 'http://localhost:3000/users/profile';
    private _editURL = 'http://localhost:3000/users/edit-user';

    constructor() {
        this.accessToken = localStorage.getItem('accessToken') || "";
    }

    getProfile(): Observable<any> {
        if(!this.accessToken) throw new Error('User Not Authenticated');

        return this.http.get<any>(this._profileURL, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        })
    }

    deleteAccount(): Observable<any> {
        localStorage.clear();
        window.location.reload();
        return this.http.delete<any>(this._profileURL, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        })
    }

    editAccount(user: FormData): Observable<any> {
        window.location.reload();
        return this.http.patch<any>(this._editURL, user, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        });
    }

}
