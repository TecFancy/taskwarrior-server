import { Controller, Get, Param, Query } from '@nestjs/common';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskFiltersDto } from './task.filters.dto';

@Controller('/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasksByFilters(@Query() filterDto: TaskFiltersDto): Promise<Task[]> {
    const params = [];
    for (const key in filterDto) {
      let value = '';
      if (filterDto?.[key]?.length) {
        value = filterDto?.[key];
        params.push(`${key}:${value}`);
      }
    }
    return await this.taskService.getTasks(params);
  }

  @Get('all')
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  @Get('/tag/:tag')
  async getTasksByTagFilter(@Param('tag') tag: string): Promise<Task[]> {
    return await this.taskService.getTasks([`tag:${tag}`]);
  }

  @Get('/project/:project')
  async getTasksByProjectFilter(
    @Param('project') project: string,
  ): Promise<Task[]> {
    return await this.taskService.getTasks([`project:${project}`]);
  }

  @Get('/due/:due')
  async getTasksByDueFilter(@Param('due') due: string): Promise<Task[]> {
    return await this.taskService.getTasks([`due:${due}`]);
  }
}
