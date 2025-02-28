"use client";
import { useState, useRef, useEffect } from "react";
import ResolutionSelector from "@/components/ResolutionSelector";
import VideoPreview from "@/components/VideoPreview";
import PlaybackVideo from "@/components/PlaybackVideo";
import RecordControls from "@/components/RecordControls";
import DownloadButtons from "@/components/DownloadButtons";
import { convertWebMToMp4 } from "@/utils/convertToMp4";

// Helper function to trigger download in browser or via Electron API
async function downloadBlob(blob, filename) {
  // Save the video file using the Electron API exposed in preload.js
  if (window.electronAPI && window.electronAPI.saveVideo) {
    // Convert the Blob to an ArrayBuffer and then to a Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await window.electronAPI.saveVideo({ buffer, filename });
    if (result.success) {
      alert(`Video saved to: ${result.path}`);
    } else {
      alert(`Error saving video: ${result.error}`);
    }
  } else {
    // In the browser, trigger a download via an anchor element
    const url = URL.createObjectURL(blob); // Create a temporary URL for the blob data
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export default function RecordPage() {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [previewResolution, setPreviewResolution] = useState({
    width: 640,
    height: 480,
  });
  const [playbackResolution, setPlaybackResolution] = useState({
    width: 640,
    height: 480,
  });

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

  // Download WebM as recorded
  const handleDownloadWebM = async () => {
    if (recordedChunksRef.current.length === 0) return;
    const webmBlob = new Blob(recordedChunksRef.current, {
      type: "video/webm",
    });
    // Generate a unique filename using the current timestamp
    const filename = `recording-${Date.now()}.webm`;
    await downloadBlob(webmBlob, filename);
  };

  // Convert WebM to MP4 then download
  const handleDownloadMp4 = async () => {
    if (recordedChunksRef.current.length === 0) return;
    alert("Converting from WebM to MP4. This may take a few seconds...");
    const webmBlob = new Blob(recordedChunksRef.current, {
      type: "video/webm",
    });
    const mp4Blob = await convertWebMToMp4(webmBlob);
    const filename = `recording-${Date.now()}.mp4`;
    await downloadBlob(mp4Blob, filename);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div
        className="bg-black rounded-3xl shadow-lg p-6"
        style={{ width: `${previewResolution.width + 50}px` }}
      >
        <h1 className="text-3xl font-bold text-center text-indigo-300 mb-6">
          Video Recorder
        </h1>

        {/* Preview Resolution Selector */}
        <ResolutionSelector
          id="previewResolution"
          label="Preview Resolution:"
          currentValue={previewResolution}
          onChange={setPreviewResolution}
        />

        {/* Webcam Preview */}
        <div className="flex justify-center my-6">
          <VideoPreview videoRef={videoRef} resolution={previewResolution} />
        </div>

        {/* Record/Stop Controls */}
        <RecordControls
          isRecording={isRecording}
          onStart={handleStartRecording}
          onStop={handleStopRecording}
        />

        {/* Playback Section: only displayed after recording stops */}
        {!isRecording && videoURL && (
          <div className="mt-8 border-t border-gray-700 pt-6">
            <ResolutionSelector
              id="playbackResolution"
              label="Playback Resolution:"
              currentValue={playbackResolution}
              onChange={setPlaybackResolution}
            />
            <PlaybackVideo
              videoURL={videoURL}
              resolution={playbackResolution}
            />
            {/* Download Buttons component */}
            <DownloadButtons
              onDownloadMp4={handleDownloadMp4}
              onDownloadWebM={handleDownloadWebM}
            />
          </div>
        )}
      </div>
    </div>
  );
}
