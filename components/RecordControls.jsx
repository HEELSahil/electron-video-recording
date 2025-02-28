"use client";

// RecordControls Component: Provides buttons to start and stop recording.
export default function RecordControls({ isRecording, onStart, onStop }) {
  return (
    <div className="my-4 flex gap-4">
      {!isRecording ? (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer"
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
    </div>
  );
}
