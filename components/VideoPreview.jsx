"use client";
// Display the live webcam stream
export default function VideoPreview({ videoRef, resolution }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{
        width: `${resolution.width}px`,
        height: `${resolution.height}px`,
        objectFit: "cover",
        backgroundColor: "#000",
      }}
      className="rounded-lg border border-gray-700"
    ></video>
  );
}
