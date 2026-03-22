import { useState, KeyboardEvent } from 'react'
import { Task, TaskFormErrors } from '../types'
import { validateTaskName, validateEstimated } from '../utils/validation'

interface Props {
  task: Task
  onSave: (name: string, estimated: number) => void
  onClose: () => void
}

export default function EditTaskForm({ task, onSave, onClose }: Props) {
  const [name, setName] = useState(task.name)
  const [estimated, setEstimated] = useState(String(task.estimated))
  const [errors, setErrors] = useState<TaskFormErrors>({})

  const handleSave = () => {
    const errs: TaskFormErrors = {
      name: validateTaskName(name),
      estimated: validateEstimated(estimated, task.completed),
    }
    if (errs.name || errs.estimated) { setErrors(errs); return }
    onSave(name.trim(), Number(estimated))
  }

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div className="edit-form w-100" onKeyDown={handleKey}>
      <div className="edit-header f-between">
        <h4>Edit Task</h4>
        <i onClick={onClose} id="closeEditForm" className="fa-solid fa-xmark ptr"></i>
      </div>
      <div className="edit-body">
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="name-edit">Task Name</label>
          <input
            type="text"
            id="name-edit"
            value={name}
            className={errors.name ? 'input-error' : ''}
            onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })) }}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label htmlFor="pomo-num-edit">Estimated Pomodoros</label>
          <input
            type="text"
            id="pomo-num-edit"
            value={estimated}
            className={errors.estimated ? 'input-error' : ''}
            onChange={e => { setEstimated(e.target.value); setErrors(prev => ({ ...prev, estimated: undefined })) }}
          />
          {errors.estimated && <p className="field-error">{errors.estimated}</p>}
        </form>
      </div>
      <div className="edit-footer f-end">
        <button onClick={onClose} className="cancel-edit btn-transparent">Cancel</button>
        <button onClick={handleSave} className="btn-edit">Save</button>
      </div>
    </div>
  )
}
