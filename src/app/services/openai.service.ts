import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/images/generations';
  private apiKey = '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';

  constructor(private http: HttpClient) { }

  generarImagen(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    return this.http.post<any>(
      this.apiUrl, 
      {
        "model": "dall-e-3",
        "prompt": "perro comiendo una pizza",
        "n": 1,
        "size": "1024x1024"
      }, 
      { headers });
  }
}
