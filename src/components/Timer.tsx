import { TimerMode } from '../types'

interface Props {
  mode: TimerMode
  formattedTime: string
  isRunning: boolean
  onSwitchMode: (m: TimerMode) => void
  onStart: () => void
  onPause: () => void
  onOpenSettings: () => void
}

export default function Timer({ mode, formattedTime, isRunning, onSwitchMode, onStart, onPause, onOpenSettings }: Props) {
  return (
    <>
      <button className="btn btn-settings bg-glass" onClick={onOpenSettings}>
        <i className="fa-solid fa-gear"></i> Settings
      </button>

      <section className="showcase bg-glass">
        <div className="pomodoro-type-btn-container f-around">
          <button
            className={`pomo btn-type${mode === 'pomo' ? ' btn-type-active' : ''}`}
            onClick={() => onSwitchMode('pomo')}
          >Pomodoro</button>
          <button
            className={`short btn-type${mode === 'short' ? ' btn-type-active' : ''}`}
            onClick={() => onSwitchMode('short')}
          >Short Break</button>
          <button
            className={`long btn-type${mode === 'long' ? ' btn-type-active' : ''}`}
            onClick={() => onSwitchMode('long')}
          >Long Break</button>
        </div>

        <div className="timer f-center">
          <span className="time">{formattedTime}</span>
        </div>

        {isRunning
          ? <button className="btn-start-stop btn-stop" onClick={onPause}>Pause</button>
          : <button className="btn-start-stop btn-start" onClick={onStart}>Start</button>
        }
      </section>
    </>
  )
}
