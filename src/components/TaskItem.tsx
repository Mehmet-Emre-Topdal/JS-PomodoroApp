import { useState } from 'react'
import { Task } from '../types'
import tomatoImg from '../assets/tomato.png'
import EditTaskForm from './EditTaskForm'

interface Props {
  task: Task
  onDelete: (id: number) => void
  onEdit: (id: number, name: string, estimated: number) => void
  onToggleActive: (id: number) => void
}

export default function TaskItem({ task, onDelete, onEdit, onToggleActive }: Props) {
  const [editing, setEditing] = useState(false)

  return (
    <>
      <div
        className={`task f-between w-100 ${task.isFinished ? 'completed-task' : 'div-enable-placeholder'}`}
        data-id={task.id}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('.task-right')) return
          onToggleActive(task.id)
        }}
      >
        <div className="task-left f-center">
          {task.isActive && <img src={tomatoImg} alt="active" />}
          <span className="taskname">{task.name}</span>
          <div className="task-progress">
            <span className="completed"> {task.completed} </span> / <span className="estimated"> {task.estimated} </span>
          </div>
        </div>

        <div className="task-right f-center">
          <i
            id="delete"
            className="fa-solid fa-trash-can"
            onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
          ></i>
          <i
            id="edit"
            className="fa-solid fa-pen"
            onClick={(e) => { e.stopPropagation(); setEditing(true) }}
          ></i>
        </div>
      </div>

      {editing && (
        <EditTaskForm
          task={task}
          onSave={(name, estimated) => { onEdit(task.id, name, estimated); setEditing(false) }}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  )
}
