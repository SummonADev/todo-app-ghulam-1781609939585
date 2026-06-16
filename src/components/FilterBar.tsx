import { Filter } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'flex-1 text-sm font-medium py-1.5 rounded-lg transition-all',
            filter === f.value
              ? 'bg-white text-indigo-600 shadow-sm font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
