export type TimerMode = 'pomo' | 'short' | 'long'

export interface Task {
  id: number
  name: string
  estimated: number
  completed: number
  isActive: boolean
  isFinished: boolean
}

export interface TimerSettings {
  pomo: number
  short: number
  long: number
}

export interface TaskFormErrors {
  name?: string
  estimated?: string
}
