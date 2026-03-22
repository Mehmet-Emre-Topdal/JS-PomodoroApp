import { TimerMode, TimerSettings } from '../types'

export const TIMER_MIN = 1
export const TIMER_MAX = 60

export const BG_COLORS: Record<TimerMode, string> = {
  pomo: '#D95550',
  short: '#4C910E',
  long: '#457CA3',
}

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  pomo: 25,
  short: 5,
  long: 15,
}
