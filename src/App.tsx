import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { ThemeToggle } from './components/ThemeToggle';
import { useTodo } from './context/TodoContext';
import { CheckCircle } from 'lucide-react';

function TodoList() {
  const { todos } = useTodo();
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          Pending Tasks ({pendingTodos.length})
        </h2>
        {pendingTodos.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No pending tasks. Add one above!
          </p>
        )}
        {pendingTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>

      {completedTodos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
            Completed ({completedTodos.length})
          </h2>
          {completedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 
          dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors">
          <ThemeToggle />
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl 
              shadow-xl dark:shadow-gray-900/30 p-4 sm:p-6 space-y-6 sm:space-y-8">
              <header className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Task Manager
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay organized and productive
                </p>
              </header>

              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;