import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, User, Clock, MoreVertical, CheckCircle2, Circle, Trash2 } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'inprogress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
}

const initialTasks: Task[] = [
  { id: 1, title: 'Design System', description: 'Create component library', status: 'done', priority: 'high', assignee: 'Alex', dueDate: '2024-01-15' },
  { id: 2, title: 'API Integration', description: 'Connect frontend to backend', status: 'inprogress', priority: 'high', assignee: 'Sam', dueDate: '2024-01-20' },
  { id: 3, title: 'User Auth', description: 'Implement JWT authentication', status: 'todo', priority: 'medium', assignee: 'Alex', dueDate: '2024-01-25' },
  { id: 4, title: 'Dashboard UI', description: 'Build analytics dashboard', status: 'inprogress', priority: 'medium', assignee: 'Jordan', dueDate: '2024-01-22' },
  { id: 5, title: 'Testing', description: 'Write unit tests', status: 'todo', priority: 'low', assignee: 'Sam', dueDate: '2024-01-30' },
]

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-100' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-blue-50' },
  { id: 'done', title: 'Done', color: 'bg-green-50' },
]

const priorityColors = {
  low: 'bg-slate-200 text-slate-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return
    const task: Task = {
      id: Date.now(),
      title: newTask,
      description: 'New task description',
      status: 'todo',
      priority: 'medium',
      assignee: 'Me',
      dueDate: new Date().toISOString().split('T')[0],
    }
    setTasks([...tasks, task])
    setNewTask('')
  }

  const moveTask = (taskId: number, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">TaskFlow</h1>
              <p className="text-xs text-slate-500">Team Collaboration</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['Alex', 'Sam', 'Jordan'].map((name, i) => (
                <div key={name} className={`w-8 h-8 rounded-full bg-gradient-to-br from-violet-${400 + i * 100} to-purple-${500 + i * 100} border-2 border-white flex items-center justify-center text-xs text-white font-medium`}>
                  {name[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Add Task */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col.id} className={`${col.color} rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-700">{col.title}</h2>
                <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-600">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              <div className="space-y-3">
                {tasks.filter(t => t.status === col.id).map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-slate-800">{task.title}</h3>
                      <button onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{task.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {task.assignee}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3">
                      {col.id !== 'todo' && (
                        <button
                          onClick={() => moveTask(task.id, col.id === 'done' ? 'inprogress' : 'todo')}
                          className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          ← Move
                        </button>
                      )}
                      {col.id !== 'done' && (
                        <button
                          onClick={() => moveTask(task.id, col.id === 'todo' ? 'inprogress' : 'done')}
                          className="text-xs px-2 py-1 rounded bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors"
                        >
                          Move →
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
