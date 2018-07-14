import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotManagementComponent } from './dashboard-feature/bot-management/bot-management.component';
import { BotConfigComponent } from './bot-config-feature/bot-config/bot-config.component';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'bot-management', component: BotManagementComponent },
  { path: 'bot-config/:botId', component: BotConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
