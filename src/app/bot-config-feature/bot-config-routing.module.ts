import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTopicRequestComponent } from './add-topic-request/add-topic-request.component';

const routes: Routes = [
  { path: 'add-topic', component: AddTopicRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BotConfigRoutingModule { }
