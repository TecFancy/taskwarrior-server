import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Get('/tag/:tag')
  async getTasksBySingleTag(@Param('tag') tag: string): Promise<Task[]> {
    return await this.taskService.getTasksBySingleTag(tag);
  }

  @Get('/project/:project')
  async getTasksBySingleProject(
    @Param('project') project: string,
  ): Promise<Task[]> {
    return await this.taskService.getTasksBySingleProject(project);
  }
}
