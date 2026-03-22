import { useState, useEffect, useRef, useCallback } from 'react'
import { Task } from '../types'

interface UseTasks {
  taskList: Task[]
  addTask: (name: string, estimated: number) => void
  deleteTask: (id: number) => void
  editTask: (id: number, name: string, estimated: number) => void
  toggleActive: (id: number) => void
  incrementActiveTask: () => void
  clearAll: () => void
  clearFinished: () => void
}

function loadFromStorage(): Task[] {
  const raw = localStorage.getItem('taskList')
  if (!raw) return []
  return JSON.parse(raw) as Task[]
}

export function useTasks(): UseTasks {
  const nextIdRef = useRef(0)

  const [taskList, setTaskList] = useState<Task[]>(() => {
    const list = loadFromStorage()
    if (list.length > 0) nextIdRef.current = list[list.length - 1].id + 1
    return list
  })

  useEffect(() => {
    const save = () => localStorage.setItem('taskList', JSON.stringify(taskList))
    window.addEventListener('unload', save)
    return () => window.removeEventListener('unload', save)
  }, [taskList])

  const addTask = useCallback((name: string, estimated: number) => {
    const newTask: Task = {
      id: nextIdRef.current++,
      name,
      estimated,
      completed: 0,
      isActive: false,
      isFinished: false,
    }
    setTaskList(prev => [...prev, newTask])
  }, [])

  const deleteTask = useCallback((id: number) => {
    setTaskList(prev => prev.filter(t => t.id !== id))
  }, [])

  const editTask = useCallback((id: number, name: string, estimated: number) => {
    setTaskList(prev =>
      prev.map(t => (t.id === id ? { ...t, name, estimated } : t))
    )
  }, [])

  const toggleActive = useCallback((id: number) => {
    setTaskList(prev =>
      prev.map(t => {
        if (t.id === id) return { ...t, isActive: !t.isActive }
        return { ...t, isActive: false }
      })
    )
  }, [])

  const incrementActiveTask = useCallback(() => {
    setTaskList(prev =>
      prev.map(t => {
        if (!t.isActive) return t
        const newCompleted = t.completed + 1
        if (newCompleted >= t.estimated) {
          return { ...t, completed: newCompleted, isActive: false, isFinished: true }
        }
        return { ...t, completed: newCompleted }
      })
    )
  }, [])

  const clearAll = useCallback(() => setTaskList([]), [])

  const clearFinished = useCallback(() => setTaskList(prev => prev.filter(t => !t.isFinished)), [])

  return { taskList, addTask, deleteTask, editTask, toggleActive, incrementActiveTask, clearAll, clearFinished }
}
