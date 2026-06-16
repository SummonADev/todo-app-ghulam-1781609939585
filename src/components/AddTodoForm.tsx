import { useState } from 'react';
import { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITY_OPTIONS: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { label: 'Med', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { label: 'High', value: 'high', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-semibold transition-colors shadow"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Priority:</span>
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'text-xs font-semibold px-3 py-1 rounded-full border transition-all',
              opt.color,
              priority === opt.value
                ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105'
                : 'opacity-60 hover:opacity-90'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
