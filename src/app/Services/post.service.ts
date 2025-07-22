import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  private http = inject(HttpClient);

  getPosts(page: number, limit: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API_URL}?_page=${page}&_limit=${limit}`
    );
  }
}
