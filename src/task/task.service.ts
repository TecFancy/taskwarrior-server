import { spawn } from 'child_process';
import { Injectable } from '@nestjs/common';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  /** 查询所有任务 */
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

  /** 根据一个 tag 查询某些任务 */
  async getTasksBySingleTag(tag: string): Promise<Task[]> {
    const taskArgs = [
      // rc.confirmation=no，rc.recurrence.confirmation=no 和 rc.dependency.confirmation=no 可以关闭 Task Warrior 的确认提示
      'rc.confirmation=no',
      'rc.recurrence.confirmation=no',
      'rc.dependency.confirmation=no',
      // rc.json.depends.array=yes 可以让 Task Warrior 在导出 JSON 数据时包含依赖任务信息
      'rc.json.depends.array=yes',
      // rc.bulk=0 可以禁用 Task Warrior 的批量操作
      'rc.buld=0',
      `tag:${tag}`,
      'export',
    ];
    const taskWarriorProcess = spawn('task', taskArgs);
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
