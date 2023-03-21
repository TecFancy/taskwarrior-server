import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskFiltersDto } from './task.filters.dto';

import type { IncomingMessage, ServerResponse } from 'http';

@Controller('/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

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

  // TODO 事件流控制器示例
  // curl -H "Accept: text/event-stream" -N http://localhost:53599/api/v1/task/events
  @Get('/events')
  async getEvents(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ready to go~\n\n`);

    // 每 5 秒向客户端推送一个消息
    setInterval(() => {
      res.write(`data: ${new Date().toISOString()}\n`);
    }, 1000);

    // 当客户端断开连接时，停止向客户端推送消息
    req.on('close', () => {
      console.log('Connection closed');
      res.end();
    });
  }

  // curl -X POST -H "Content-Type: application/json" http://localhost:53599/api/v1/task/add -d '{"description": "Read a new book 8.", "due": "2022-12-21T18:15:00"}'
  @Post('add')
  async addTask(@Body() params: { [key: string]: any }[]): Promise<any> {
    return await this.taskService.addTask(params);
  }

  // curl -X DELETE -H "Content-Type: application/json" http://localhost:53599/api/v1/task -d '{"id": "this is id of a task"}'
  @Delete()
  async delTask(@Body() params: { id: string }): Promise<any> {
    console.log('params', params);
    return await this.taskService.delTask(params?.id);
  }
}
