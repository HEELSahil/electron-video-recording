"use client";
import { useState, useRef, useEffect } from "react";

export default function RecordPage() {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

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

    // Event listener to collect recorded data chunks
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    // Event listener that fires when recording stops
    recorder.onstop = () => {
      // Create a Blob from recorded chunks
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
    };

    recorder.start();
    setMediaRecorder(recorder); // Save the recorder instance in state for later control
    setRecordedChunks([]); // Clear any previous recorded chunks
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    // Stop the recording if the MediaRecorder instance exists
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
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
    </div>
  );
}
