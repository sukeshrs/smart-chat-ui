import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotManagementComponent } from './dashboard-feature/bot-management/bot-management.component';
import { BotConfigComponent } from './bot-config-feature/bot-config/bot-config.component';

const routes: Routes = [
  { path: '', component: BotManagementComponent },
  { path: 'bot-management', component: BotManagementComponent },
  { path: 'bot-config/:botId', component: BotConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
