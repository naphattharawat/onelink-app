import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async saveShortUrl(type, details) {
    const url = `${this.apiUrl}`;
    return await this.http.post(url, { details, type }).toPromise();
  }
}
