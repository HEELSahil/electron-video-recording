"use client";
import { useState, useRef, useEffect } from "react";

export default function RecordPage() {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    // Request access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        alert(
          "Unable to access webcam. Please grant permissions or check your device."
        );
      });
  }, []);

  const handleStartRecording = () => {
    // Check if the video element and its stream are available
    if (!videoRef.current || !videoRef.current.srcObject) return;
    const stream = videoRef.current.srcObject;
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9", // or "video/webm; codecs=vp8"
    });

    recordedChunksRef.current = [];

    // Event listener to collect recorded data chunks
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    // Event listener that fires when recording stops
    recorder.onstop = () => {
      // Create a Blob from recorded chunks
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };

    recorder.start();
    setMediaRecorder(recorder); // Save the recorder instance in state for later control
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    // Stop the recording if the MediaRecorder instance exists
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // After mediaRecorder.onstop or in a "Save" button handler
  const handleSaveToDisk = async () => {
    if (recordedChunksRef.current.length === 0) return;
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    // Convert the Blob to an ArrayBuffer and then to a Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique filename using the current timestamp
    const filename = `recording-${Date.now()}.webm`;

    // Save the video file using the Electron API exposed in preload.js
    if (window.electronAPI && window.electronAPI.saveVideo) {
      const result = await window.electronAPI.saveVideo({ buffer, filename });
      if (result.success) {
        alert(`Video saved to: ${result.path}`);
      } else {
        alert(`Error saving video: ${result.error}`);
      }
    } else {
      alert("Save to disk is only available in the Electron environment.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Video Recorder</h1>

      {/* Webcam Preview */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full max-w-md bg-black"
      ></video>

      {/* Record/Stop Buttons */}
      <div className="my-4">
        {!isRecording && (
          <button
            onClick={handleStartRecording}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 cursor-pointer"
          >
            Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={handleStopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Stop Recording
          </button>
        )}
      </div>

      {/* Playback */}
      {videoURL && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Playback</h2>
          <video
            src={videoURL}
            controls
            className="w-full max-w-md bg-black"
          ></video>
        </div>
      )}

      <button
        onClick={handleSaveToDisk}
        className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
      >
        Save to Disk
      </button>
    </div>
  );
}
