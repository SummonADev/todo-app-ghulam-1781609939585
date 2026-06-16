import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-500 text-white rounded-xl p-2.5 shadow-lg">
            <CheckSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">My Todos</h1>
            <p className="text-sm text-gray-500">Stay organised, stay productive</p>
          </div>
        </div>

        {/* Add todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Stats */}
        <StatsBar activeCount={activeCount} completedCount={completedCount} />

        {/* Filter */}
        <FilterBar filter={filter} setFilter={setFilter} />

        {/* List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Clear completed */}
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="mt-4 w-full text-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-lg py-2 font-medium"
          >
            Clear {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
          </button>
        )}
      </div>
    </div>
  );
}
