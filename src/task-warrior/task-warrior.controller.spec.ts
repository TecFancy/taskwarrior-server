import { Test, TestingModule } from '@nestjs/testing';
import { TaskWarriorController } from './task-warrior.controller';

describe('TasksController', () => {
  let controller: TaskWarriorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskWarriorController],
    }).compile();

    controller = module.get<TaskWarriorController>(TaskWarriorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
