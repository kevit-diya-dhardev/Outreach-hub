import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { SnackbarService, SnackbarType } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  animations: [
    trigger('state', [
      state('visible', style({ transform: 'translateY(0)', opacity: 1 })),
      state('hidden', style({ transform: 'translateY(100%)', opacity: 0 })),
      transition('visible => hidden', animate('300ms ease-in')),
      transition('hidden => visible', animate('300ms ease-out'))
    ])
  ]
})
export class SnackbarComponent {
  isVisible: boolean=false;
  message!:string;
  type:SnackbarType='success'

  constructor(private snackbarService:SnackbarService){}

  ngOnInit(){
   
    this.snackbarService.snackbarState$.subscribe((state)=>{ 
        console.log(state)
      if(state.visible){
        this.message=state.message
        this.type=state.type
        this.isVisible=state.visible

        setTimeout(()=>{
          this.isVisible=false;
        },3000)
      }
    })
  }

}
