import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TasksController } from './tasks/tasks.controller';

import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
