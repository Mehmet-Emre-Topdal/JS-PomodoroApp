import { useState } from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'
import AddTaskForm from './AddTaskForm'

interface Props {
  taskList: Task[]
  onAdd: (name: string, estimated: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, name: string, estimated: number) => void
  onToggleActive: (id: number) => void
  onClearAll: () => void
  onClearFinished: () => void
}

export default function TaskList({ taskList, onAdd, onDelete, onEdit, onToggleActive, onClearAll, onClearFinished }: Props) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="todo">
      <div className="todo-container">

        <div className="todo-header f-between">
          <p>Task List</p>
          <div>
            <button id="clr-finished" className="btn-todo-settings" onClick={onClearFinished}>Clear Finished</button>
            <button id="clr-all" className="btn-todo-settings" onClick={onClearAll}>Clear All</button>
          </div>
        </div>

        <div className="tasks f-between-column">
          <div className="tasks-container w-100 f-between-column">
            {taskList.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleActive={onToggleActive}
              />
            ))}
          </div>

          <div className="add-task-container w-100">
            {!showForm && (
              <div className="add-task f-center" onClick={() => setShowForm(true)}>
                <i className="fa-solid fa-circle-plus"></i>
                <span id="add-task">Add New Task</span>
              </div>
            )}
          </div>

          {showForm && (
            <AddTaskForm onAdd={onAdd} onClose={() => setShowForm(false)} />
          )}
        </div>

      </div>
    </section>
  )
}
