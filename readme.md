# Pomodoro App

A productivity app combining a Pomodoro timer with an integrated task manager. Built with React + TypeScript.

**Live demo:** https://pomodoromet.netlify.app/

---

## Features

### Timer
- Three modes: **Pomodoro** (25 min), **Short Break** (5 min), **Long Break** (15 min)
- Start / Pause controls
- Bell notification on completion
- Background color changes per mode
- Confirmation dialog when switching modes mid-session
- Customizable durations via Settings (1–60 min)

### Task Manager
- Add tasks with a name and estimated pomodoro count
- Activate a task by clicking it — the tomato icon marks the active task
- Completed pomodoros are automatically counted against the active task
- Task auto-completes when completed count reaches the estimate
- Edit or delete tasks at any time
- Clear finished tasks or all tasks at once
- Tasks persist across sessions via `localStorage`

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
npm run build   # production build
npm run preview # preview production build
```

---

## How It Works

1. Add a task and set how many pomodoros you expect it to take
2. Click the task to activate it (tomato icon appears)
3. Start the Pomodoro timer and focus
4. When the timer ends, the active task's completed count increments automatically
5. The task finishes when completed = estimated — it becomes faded and inactive
6. Take a short or long break, then repeat

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.6 |
| Build tool | Vite 6 |
| Styling | Plain CSS (no framework) |
| State | React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) |
| Persistence | `localStorage` |

---

## Project Structure

```
src/
├── assets/            bell_sound.wav, tomato.png
├── components/
│   ├── Timer.tsx          Mode buttons, countdown display, start/pause
│   ├── SettingsModal.tsx  Timer duration settings
│   ├── ConfirmModal.tsx   Mode-switch confirmation dialog
│   ├── TaskList.tsx       Task list container
│   ├── TaskItem.tsx       Single task row
│   ├── AddTaskForm.tsx    New task form
│   └── EditTaskForm.tsx   Edit task form
├── constants/
│   └── index.ts           BG colors, default timer settings
├── hooks/
│   ├── useTimer.ts        Timer state, countdown logic, mode switching
│   └── useTasks.ts        Task CRUD, localStorage persistence
├── types/
│   └── index.ts           Shared TypeScript interfaces
├── utils/
│   └── validation.ts      Form validation functions
├── App.tsx
└── main.tsx
```

---

## License

Free to use. No copyright. — *Mehmet Emre Topdal*
