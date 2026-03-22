interface Props {
  onReset: () => void
  onContinue: () => void
}

export default function ConfirmModal({ onReset, onContinue }: Props) {
  return (
    <>
      <div className="modal">
        <p>If you switch to another mode or start over in the same mode, the counter will be reset. Are you sure you want to start over?</p>
        <button className="btn-modal reset" onClick={onReset}>Yes, reset timer</button>
        <button className="btn-modal continue" onClick={onContinue}>No, continue</button>
      </div>
      <div className="overlay"></div>
    </>
  )
}
