import { useState, KeyboardEvent } from 'react'
import { TaskFormErrors } from '../types'
import { validateTaskName, validateEstimated } from '../utils/validation'

interface Props {
  onAdd: (name: string, estimated: number) => void
  onClose: () => void
}

export default function AddTaskForm({ onAdd, onClose }: Props) {
  const [name, setName] = useState('')
  const [estimated, setEstimated] = useState('')
  const [errors, setErrors] = useState<TaskFormErrors>({})

  const handleAdd = () => {
    const errs: TaskFormErrors = {
      name: validateTaskName(name),
      estimated: validateEstimated(estimated),
    }
    if (errs.name || errs.estimated) { setErrors(errs); return }
    onAdd(name.trim(), Number(estimated))
    setName('')
    setEstimated('')
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setName('')
    setEstimated('')
    setErrors({})
    onClose()
  }

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="add-form w-100" onKeyDown={handleKey}>
      <div className="add-header f-between">
        <h4>Add Task</h4>
        <i id="closeAddForm" className="fa-solid fa-xmark" onClick={handleClose}></i>
      </div>
      <div className="add-body">
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="name-add">Task Name</label>
          <input
            type="text"
            id="name-add"
            value={name}
            className={errors.name ? 'input-error' : ''}
            onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })) }}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label htmlFor="pomo-num-add">Estimated Pomodoros</label>
          <input
            type="text"
            id="pomo-num-add"
            value={estimated}
            className={errors.estimated ? 'input-error' : ''}
            onChange={e => { setEstimated(e.target.value); setErrors(prev => ({ ...prev, estimated: undefined })) }}
          />
          {errors.estimated && <p className="field-error">{errors.estimated}</p>}
        </form>
      </div>
      <div className="add-footer f-end">
        <button className="cancel-add btn-transparent" onClick={handleClose}>Cancel</button>
        <button className="btn-add" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}
