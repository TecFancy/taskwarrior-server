export class Task {
  uuid: string;
  description: string;
  entry: string;
  status: string;
  due?: string;
  project?: string;
  priority?: string;
  tags?: string[];
}
