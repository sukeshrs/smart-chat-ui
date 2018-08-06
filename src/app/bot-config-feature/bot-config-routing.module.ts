import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { TopicNameComponent } from './topic-name/topic-name.component';
import { TopicQuestionsComponent } from './topic-questions/topic-questions.component';
import { TopicAnswersComponent } from './topic-answers/topic-answers.component';
import { NewTopicComponent } from './new-topic/new-topic.component';

const botConfigRoutes: Routes = [
  { path: 'bot-config/:botName',
    component: BotConfigComponent,
    children: [
      {
        path: '', component: NewTopicComponent,
        data: {breadcrumbs:['Create Topic']} },
      {
        path: 'topic-name', component: TopicNameComponent,
        data: {breadcrumbs:['Create Topic', 'Topic Name']} },
      {
        path: 'topic-questions', component: TopicQuestionsComponent,
        data: {breadcrumbs:['Create Topic', 'Topic Name', 'Edit Questions']} },
      {
        path: 'topic-answers', component: TopicAnswersComponent,
        data: {breadcrumbs:['Create Topic', 'Topic Name', 'Edit Questions', 'Edit Answer']} },
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(botConfigRoutes)],
  exports: [RouterModule]
})
export class BotConfigRoutingModule { }
