"use client";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// Define the FFmpeg configuration with the necessary options
const ffmpegConfig = {
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.12.4/dist/ffmpeg-core.js",
};

export async function convertWebMToMp4(webmBlob) {
  // Create a new FFmpeg instance with the configuration
  const ffmpeg = new FFmpeg();

  // Load the FFmpeg core
  if (!ffmpeg.loaded) {
    await ffmpeg.load(ffmpegConfig);
  }

  // Convert the blob to a file-like object
  const inputFile = await fetchFile(webmBlob);

  // Write the file to the FFmpeg virtual file system
  await ffmpeg.writeFile("input.webm", inputFile);

  // Run the FFmpeg command to convert WebM to MP4
  await ffmpeg.exec([
    "-i",
    "input.webm",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "output.mp4",
  ]);

  // Read the result file from the virtual file system
  const data = await ffmpeg.readFile("output.mp4");

  // Create and return an MP4 blob
  return new Blob([data.buffer], { type: "video/mp4" });
}
