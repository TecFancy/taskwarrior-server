import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TaskWarriorController } from './task-warrior/task-warrior.controller';

import { AppService } from './app.service';
import { TaskWarriorService } from './task-warrior/task-warrior.service';

@Module({
  imports: [],
  controllers: [AppController, TaskWarriorController],
  providers: [AppService, TaskWarriorService],
})
export class AppModule {}
