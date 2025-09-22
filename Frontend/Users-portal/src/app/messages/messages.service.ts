import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/messages';

  getAllMessages(id: string, page?: number) {
    return this.http.get(`${this.url}/allMessages/${id}?page=${page}`);
  }
  getMyMessages(id: string, page: number) {
    return this.http.get(`${this.url}/myMessages/${id}?page=${page}`);
  }
  deleteMessage(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  editMessage(id: string, message: any) {
    return this.http.patch(`${this.url}/${id}`, message);
  }
  createMessge(message: any) {
    return this.http.post(`${this.url}`, message);
  }
}
