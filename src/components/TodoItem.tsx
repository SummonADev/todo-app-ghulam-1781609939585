import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

const PRIORITY_BORDER: Record<string, string> = {
  low: 'border-l-emerald-400',
  medium: 'border-l-amber-400',
  high: 'border-l-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl border border-gray-100 border-l-4 shadow-sm px-4 py-3 flex items-center gap-3 group transition-all',
        PRIORITY_BORDER[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={11} strokeWidth={3} className="text-white" />}
      </button>

      {/* Text or edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-gray-800 border-b border-indigo-400 focus:outline-none bg-transparent pb-0.5"
          />
        ) : (
          <span
            className={clsx(
              'text-sm truncate block',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span
          className={clsx(
            'text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 capitalize',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="text-indigo-500 hover:text-indigo-700 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
              aria-label="Save edit"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Cancel edit"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="text-gray-300 hover:text-indigo-500 p-1 rounded-lg hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Edit todo"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-300 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete todo"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
