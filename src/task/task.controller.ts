import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }
}
