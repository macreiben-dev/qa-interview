import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message?: string;
  errors?: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<RegisterResponse | null> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, payload).pipe(
      // BUG F3: HTTP errors (e.g. 400 Bad Request) are caught here and swallowed.
      // The component receives `null` and shows no error messages to the user,
      // even though the API returned a helpful `errors` array in the response body.
      catchError(() => of(null))
    );
  }
}
