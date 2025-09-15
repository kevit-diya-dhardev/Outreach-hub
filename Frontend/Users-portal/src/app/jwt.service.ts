import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decode<T = DecodedToken>(token: string): T {
    return jwtDecode<T>(token);
  }
}
