import { Component } from '@angular/core';
import { JwtService } from '../jwt.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user: any;
  workspaces_id!: string[];
  workspaces!: string[];
  isOpen: boolean = false;
  selectedOne!: any;
  constructor(
    private jwtService: JwtService,
    private dashboardService: DashboardService
  ) {}
  ngOnInit() {
    const token: string = localStorage.getItem('token')!;
    const decoded = this.jwtService.decode(token);
    console.log(decoded.userId);
    this.dashboardService.getUser(decoded.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        localStorage.setItem('role', response.role);
        this.workspaces_id = response.workspace_id;
        localStorage.setItem('workspace_id', this.workspaces_id[0]);
        console.log(response);
      },
      error: (error) => {
        console.log('error respone: ', error);
      },
    });
  }

  selectWorkspace(id: string) {
    this.selectedOne = id;
  }
}
