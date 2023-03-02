import { Controller, Get } from '@nestjs/common';
import { TaskWarriorService } from './task-warrior.service';

@Controller('tasks')
export class TaskWarriorController {
  constructor(private readonly tasksService: TaskWarriorService) {}

  @Get()
  async getTasks(): Promise<any> {
    return this.tasksService.getTasks();
  }
}
