import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotManagementComponent } from './dashboard-feature/bot-management/bot-management.component';
import { BotConfigComponent } from './bot-config-feature/bot-config/bot-config.component';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'bot-management', component: BotManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
