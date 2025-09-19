import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type SnackbarType='success'|'error';

export interface SnackbarState{
  message:string;
  type:SnackbarType;
  visible:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject=new Subject<SnackbarState>()
  public snackbarState$=this.snackbarSubject.asObservable()

  constructor() { }

  show(message:string,type:SnackbarType='success'){
    
    this.snackbarSubject.next({message,type,visible:true})
  }
}
