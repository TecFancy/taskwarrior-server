import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TasksController } from './tasks/tasks.controller';

import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
