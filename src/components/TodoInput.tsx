import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

export function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg 
          hover:bg-blue-600 dark:hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2 
          transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="sm:inline">Add Task</span>
      </button>
    </form>
  );
}