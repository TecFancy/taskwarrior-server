import { spawn } from 'child_process';
import { Injectable } from '@nestjs/common';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  async getAllTasks(): Promise<Task[]> {
    const taskWarriorProcess = spawn('task', ['export']); // 通过 "task export" 命令获取所有任务

    return new Promise((resolve, reject) => {
      let result = '';
      let error = '';

      taskWarriorProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      taskWarriorProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      taskWarriorProcess.on('close', (code) => {
        if (code === 0) {
          resolve(JSON.parse(result));
        } else reject(error);
      });
    });
  }
}
