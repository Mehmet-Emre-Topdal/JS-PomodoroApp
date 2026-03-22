import { useCallback, useEffect, useState } from 'react'
import { useTimer } from './hooks/useTimer'
import { useTasks } from './hooks/useTasks'
import Timer from './components/Timer'
import TaskList from './components/TaskList'
import SettingsModal from './components/SettingsModal'
import ConfirmModal from './components/ConfirmModal'

export default function App() {
  const { taskList, addTask, deleteTask, editTask, toggleActive, incrementActiveTask, clearAll, clearFinished } = useTasks()
  const [showSettings, setShowSettings] = useState(false)

  const handlePomoComplete = useCallback(() => {
    incrementActiveTask()
  }, [incrementActiveTask])

  const {
    mode, bgColor, formattedTime, isRunning, showConfirm, settings,
    start, pause, switchMode, confirmReset, confirmContinue, applySettings,
  } = useTimer(handlePomoComplete)

  useEffect(() => {
    document.body.style.backgroundColor = bgColor
  }, [bgColor])

  return (
    <div className="container-content">
      <div id="app">
        <Timer
          mode={mode}
          formattedTime={formattedTime}
          isRunning={isRunning}
          onSwitchMode={switchMode}
          onStart={start}
          onPause={pause}
          onOpenSettings={() => setShowSettings(true)}
        />

        <TaskList
          taskList={taskList}
          onAdd={addTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleActive={toggleActive}
          onClearAll={clearAll}
          onClearFinished={clearFinished}
        />
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={(s) => { applySettings(s); setShowSettings(false) }}
        />
      )}

      {showConfirm && (
        <ConfirmModal onReset={confirmReset} onContinue={confirmContinue} />
      )}
    </div>
  )
}
