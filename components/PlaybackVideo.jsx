"use client";
// Display the recorded video for playback
export default function PlaybackVideo({ videoURL, resolution }) {
  return (
    <div className="my-4 flex justify-center">
      <video
        src={videoURL}
        controls
        style={{
          width: `${resolution.width}px`,
          height: `${resolution.height}px`,
          objectFit: "contain",
          backgroundColor: "#000",
        }}
        className="rounded-lg border border-gray-700"
      ></video>
    </div>
  );
}
