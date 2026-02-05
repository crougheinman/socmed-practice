import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFacade, DashboardFacadeModel } from './dashboard.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardFacade],
})
export class Dashboard implements OnInit {
  vm$: Observable<DashboardFacadeModel>;

  constructor(private facade: DashboardFacade) {
    this.vm$ = this.facade.vm$;
  }

  ngOnInit(): void {
    this.facade.loadDashboardData();
  }

  onRefresh(): void {
    this.facade.refreshData();
  }
}
