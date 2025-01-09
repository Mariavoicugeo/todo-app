import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, CheckCircle2 } from 'lucide-react';
import { Todo } from '../types';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, toggleTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-lg transition-all
      ${todo.completed 
        ? 'bg-green-50 dark:bg-green-900/20' 
        : 'bg-white dark:bg-gray-800'} 
      hover:shadow-md dark:hover:shadow-gray-900/30`}>
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${todo.completed 
            ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400' 
            : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400'}`}
      >
        {todo.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
      </button>

      <div className="flex-grow min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow px-2 py-1 border rounded dark:border-gray-600
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleEdit}
              className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
              }}
              className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-1 overflow-hidden">
            <p className={`text-gray-800 dark:text-gray-200 break-words
              ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
              {todo.text}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {todo.completed ? (
                <span>Completed {formatDate(todo.completedAt!)}</span>
              ) : (
                <span>Created {formatDate(todo.createdAt)}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}