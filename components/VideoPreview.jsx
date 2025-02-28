"use client";

// Display the live webcam stream
export default function VideoPreview({ videoRef, resolution }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      style={{
        width: resolution.width,
        height: resolution.height,
        objectFit: "contain",
      }}
      className="bg-black"
    ></video>
  );
}
