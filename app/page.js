"use client";
import { useRef, useEffect } from "react";

export default function RecordPage() {
  const videoRef = useRef(null);

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
    </div>
  );
}
