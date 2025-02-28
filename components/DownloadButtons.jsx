"use client";

export default function DownloadButtons({ onDownloadMp4, onDownloadWebM }) {
  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={onDownloadMp4}
        className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer"
      >
        Download MP4
      </button>
      <button
        onClick={onDownloadWebM}
        className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer"
      >
        Download WebM
      </button>
    </div>
  );
}
