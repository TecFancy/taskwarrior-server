import { Controller, Get } from '@nestjs/common';
import { spawn } from 'child_process';

@Controller('tasks')
export class TasksController {
  @Get()
  async getTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      const task = spawn('task', ['export']);

      let result = '';
      let error = '';

      task.stdout.on('data', (data) => {
        result += data.toString();
      });

      task.stderr.on('data', (data) => {
        error += data.toString();
      });

      task.on('close', (code) => {
        if (code !== 0) {
          reject(error);
        }
        const tasks = JSON.parse(result);
        resolve(tasks);
      });
    });
  }
}
