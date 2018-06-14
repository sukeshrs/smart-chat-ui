import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BotManagementComponent } from './bot-management/bot-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BotTemplatesComponent } from './bot-templates/bot-templates.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [
    BotManagementComponent,
    BotTemplatesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    DashboardService
  ],
  bootstrap: []
})
export class DashboardFeatureModule { }
