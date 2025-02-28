"use client";

// Render the recorded video for playback
export default function PlaybackVideo({ videoURL, resolution }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Playback</h2>
      <video
        src={videoURL}
        controls
        style={{
          width: resolution.width,
          height: resolution.height,
          objectFit: "contain",
        }}
        className="bg-black"
      ></video>
    </div>
  );
}
