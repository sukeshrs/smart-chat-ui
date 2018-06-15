import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotManagementComponent } from './bot-management/bot-management.component';
import { BotTemplatesComponent } from './bot-templates/bot-templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const dashboardRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: BotTemplatesComponent, outlet: 'templates'},
      { path: '', component: BotManagementComponent, outlet: 'chatbots'}
    ]
  },
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: BotTemplatesComponent, outlet: 'templates'},
      { path: '', component: BotManagementComponent, outlet: 'chatbots'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
