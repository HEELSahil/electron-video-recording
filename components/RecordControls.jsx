"use client";

// Provide Start/Stop recording and Save buttons
export default function RecordControls({
  isRecording,
  onStart,
  onStop,
  onSave,
  showSaveButton,
}) {
  return (
    <div className="my-4">
      {!isRecording ? (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 cursor-pointer"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={onStop}
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Stop Recording
        </button>
      )}
      {showSaveButton && (
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer ml-2"
        >
          Save to Disk
        </button>
      )}
    </div>
  );
}
