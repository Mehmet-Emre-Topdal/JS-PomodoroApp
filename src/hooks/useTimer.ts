import { useState, useEffect, useRef } from 'react'
import { TimerMode, TimerSettings } from '../types'
import { BG_COLORS, DEFAULT_TIMER_SETTINGS } from '../constants'
import bellSound from '../assets/bell_sound.wav'

interface UseTimer {
  mode: TimerMode
  bgColor: string
  formattedTime: string
  isRunning: boolean
  showConfirm: boolean
  settings: TimerSettings
  start: () => void
  pause: () => void
  switchMode: (mode: TimerMode) => void
  confirmReset: () => void
  confirmContinue: () => void
  applySettings: (s: TimerSettings) => void
}

export function useTimer(onPomoComplete: () => void): UseTimer {
  const [mode, setMode] = useState<TimerMode>('pomo')
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_TIMER_SETTINGS)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_SETTINGS.pomo * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const pendingMode = useRef<TimerMode | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          new Audio(bellSound).play()
          if (mode === 'pomo') onPomoComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, mode, onPomoComplete])

  const minutes = String(Math.trunc(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')
  const formattedTime = `${minutes}:${seconds}`

  const applyMode = (newMode: TimerMode) => {
    setMode(newMode)
    setTimeLeft(settings[newMode] * 60)
    setIsRunning(false)
  }

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)

  const switchMode = (newMode: TimerMode) => {
    if (isRunning) {
      setIsRunning(false)
      pendingMode.current = newMode
      setShowConfirm(true)
    } else {
      applyMode(newMode)
    }
  }

  const confirmReset = () => {
    setShowConfirm(false)
    if (pendingMode.current) {
      applyMode(pendingMode.current)
      pendingMode.current = null
    }
  }

  const confirmContinue = () => {
    setShowConfirm(false)
    pendingMode.current = null
    setIsRunning(true)
  }

  const applySettings = (newSettings: TimerSettings) => {
    setSettings(newSettings)
    setTimeLeft(newSettings[mode] * 60)
    setIsRunning(false)
  }

  return {
    mode,
    bgColor: BG_COLORS[mode],
    formattedTime,
    isRunning,
    showConfirm,
    settings,
    start,
    pause,
    switchMode,
    confirmReset,
    confirmContinue,
    applySettings,
  }
}
