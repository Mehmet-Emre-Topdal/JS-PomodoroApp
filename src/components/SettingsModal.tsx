import { useState, useEffect, KeyboardEvent } from 'react'
import { TimerSettings } from '../types'
import { validateTimerValue } from '../utils/validation'

interface Props {
  settings: TimerSettings
  onClose: () => void
  onSave: (s: TimerSettings) => void
}

interface SettingsErrors {
  pomo?: string
  short?: string
  long?: string
}

export default function SettingsModal({ settings, onClose, onSave }: Props) {
  const [pomo, setPomo] = useState(String(settings.pomo))
  const [short, setShort] = useState(String(settings.short))
  const [long, setLong] = useState(String(settings.long))
  const [errors, setErrors] = useState<SettingsErrors>({})

  useEffect(() => {
    setPomo(String(settings.pomo))
    setShort(String(settings.short))
    setLong(String(settings.long))
    setErrors({})
  }, [settings])

  const handleOk = () => {
    const errs: SettingsErrors = {
      pomo: validateTimerValue(pomo, 'Pomodoro'),
      short: validateTimerValue(short, 'Short Break'),
      long: validateTimerValue(long, 'Long Break'),
    }
    if (Object.values(errs).some(Boolean)) { setErrors(errs); return }
    onSave({ pomo: Number(pomo), short: Number(short), long: Number(long) })
  }

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleOk()
  }

  return (
    <>
      <div className="settings-modal" onKeyDown={handleKey}>
        <div className="settings-header f-between">
          <p>TIMER SETTINGS</p>
          <button className="close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="settings-content">
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="pomodoro-time">Pomodoro</label>
            <input
              type="number" id="pomodoro-time" name="pomodoro-time" min="1" max="60"
              value={pomo}
              className={errors.pomo ? 'input-error' : ''}
              onChange={e => { setPomo(e.target.value); setErrors((prev: SettingsErrors) => ({ ...prev, pomo: undefined })) }}
            />
            {errors.pomo && <p className="field-error">{errors.pomo}</p>}

            <label htmlFor="short-time">Short Break</label>
            <input
              type="number" id="short-time" name="short-time" min="1" max="60"
              value={short}
              className={errors.short ? 'input-error' : ''}
              onChange={e => { setShort(e.target.value); setErrors((prev: SettingsErrors) => ({ ...prev, short: undefined })) }}
            />
            {errors.short && <p className="field-error">{errors.short}</p>}

            <label htmlFor="long-time">Long Break</label>
            <input
              type="number" id="long-time" name="long-time" min="1" max="60"
              value={long}
              className={errors.long ? 'input-error' : ''}
              onChange={e => { setLong(e.target.value); setErrors((prev: SettingsErrors) => ({ ...prev, long: undefined })) }}
            />
            {errors.long && <p className="field-error">{errors.long}</p>}
          </form>
        </div>

        <div className="settings-footer f-center">
          <button className="btn-settings-ok" onClick={handleOk}>OK</button>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  )
}
