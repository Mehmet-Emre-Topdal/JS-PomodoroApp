import { TIMER_MIN, TIMER_MAX } from '../constants'

export function validateTaskName(name: string): string | undefined {
  if (!name.trim()) return 'Task name is required.'
  return undefined
}

export function validateEstimated(value: string, completed = 0): string | undefined {
  const num = Number(value)
  if (!value.trim()) return 'Estimated pomodoros is required.'
  if (!Number.isInteger(num) || num < 1) return 'Must be a positive whole number.'
  if (num <= completed) return `Must be greater than completed pomodoros (${completed}).`
  return undefined
}

export function validateTimerValue(value: string, label: string): string | undefined {
  const num = Number(value)
  if (!value.trim()) return `${label} is required.`
  if (!Number.isInteger(num) || num < TIMER_MIN || num > TIMER_MAX)
    return `${label} must be between ${TIMER_MIN} and ${TIMER_MAX}.`
  return undefined
}
