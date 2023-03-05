import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { Injectable } from '@nestjs/common';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  /** 递归创建用户目录 */
  private createDataDirRecursive(
    dirPath = path.join(__dirname, '../../.taskdata/testuser'),
  ) {
    try {
      // 如果文件夹已经存在，则不需要创建
      if (fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} already exists.`);
        return;
      }

      // 创建文件夹
      this.createDataDirRecursive(path.dirname(dirPath));
      fs.mkdirSync(dirPath);

      console.log(`Directory ${dirPath} created successfully.`);
    } catch (error) {
      console.error(
        `Error occurred while creating directory ${dirPath}. Error: ${error.message}`,
      );
    }
  }

  async getTasks(params?: string[]): Promise<Task[]> {
    // TODO 创建用户数据文件夹
    this.createDataDirRecursive();

    const taskArgs = [
      // rc.confirmation=no，rc.recurrence.confirmation=no 和 rc.dependency.confirmation=no 可以关闭 Task Warrior 的确认提示
      'rc.confirmation=no',
      'rc.recurrence.confirmation=no',
      'rc.dependency.confirmation=no',
      // rc.json.depends.array=yes 可以让 Task Warrior 在导出 JSON 数据时包含依赖任务信息
      'rc.json.depends.array=yes',
      // rc.bulk=0 可以禁用 Task Warrior 的批量操作
      'rc.buld=0',
    ].concat(params?.length ? params.concat('export') : ['export']);

    const taskWarriorProcess = spawn('task', taskArgs, {
      shell: true,
      env: {
        ...process.env,
        TASKRC: path.join(__dirname, '../../.taskdata/testuser/.taskrc'), // TODO 根据用户不同选择不同的配置文件
        TASKDATA: path.join(__dirname, '../../.taskdata/testuser/.data'), // TODO 根据用户不同选择不同的数据存放位置
      },
    });

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
