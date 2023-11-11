export interface todoDTO {
  id: string;
  task: string;
  completed: boolean;
  parentsIds: string[];
  dependentTodoList: todoDTO[];
}
