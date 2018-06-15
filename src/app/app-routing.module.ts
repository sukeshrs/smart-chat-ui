import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotManagementComponent } from './dashboard-feature/bot-management/bot-management.component';

const routes: Routes = [
  { path: 'bot-management', component: BotManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
