import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BotManagementComponent } from './bot-management/bot-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BotTemplatesComponent } from './bot-templates/bot-templates.component';

@NgModule({
  declarations: [
    BotManagementComponent,
    BotTemplatesComponent,
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class DashboardFeatureModule { }
