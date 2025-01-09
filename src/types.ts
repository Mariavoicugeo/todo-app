export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}