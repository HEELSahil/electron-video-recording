# ⚛️ Video Recorder

## Features

- Record video using your webcam with start/stop controls  
- Choose custom resolutions for both video preview (camera capture) and playback using dropdowns
- Preview your recording and view the actual captured resolution
- Download the recorded video in two formats:
  - **WebM:** The native format from MediaRecorder.
  - 🔥 **MP4:** Converted from WebM using ffmpeg.wasm (includes audio transcoding with AAC).
- Runs as a desktop app using Electron and can also be run in a browser for development.


## Getting Started

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/HEELSahil/video-recording-app.git
   cd video-recording-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Electron (if needed):**

   Ensure the `main` field in your `package.json` is set to your Electron entry point (e.g., `"main": "main.js"`).


### Running the App

#### Development Mode (Browser & Electron)

1. **Start Next.js Dev Server:**

   ```bash
   npm run dev
   ```

2. **Start Electron:**

   In another terminal window, run:

   ```bash
   npm run electron
   ```

The Electron window will load your Next.js app. You can also open the browser at [http://localhost:3000](http://localhost:3000) for testing.


## Usage

1. **Select Preview Resolution:**  
   Use the dropdown to choose the desired resolution for the video capture.

2. **Record a Video:**  
   Click **Start Recording** to begin capturing video from your webcam. Click **Stop Recording** to finish recording.

3. **Preview Your Video:**  
   Once recording stops, the playback section will appear. You can adjust the playback resolution if needed.

4. **Download Options:**  
   Use the download buttons to download your recording:
   - **Download MP4:** Converts the WebM recording to MP4 (this may take a few seconds).
   - **Download WebM:** Downloads the native WebM recording directly.

## Code Structure

- **app/page.js:**  
  Main React component managing the recording, preview, resolution settings, and downloads.

- **components/ResolutionSelector.js:**  
  A controlled component for selecting a resolution.

- **components/VideoPreview.js:**  
  Displays the live webcam stream with proper styling.

- **components/PlaybackVideo.js:**  
  Renders the recorded video for playback.

- **components/RecordControls.js:**  
  Provides start/stop recording controls.

- **components/DownloadButtons.js:**  
  Download buttons into a dedicated component.

- **utils/convertToMp4.js:**  
  Contains the logic to convert a WebM blob to MP4 using ffmpeg.wasm.

- **main.js:**  
  Electron main process file that creates the application window and handles IPC (e.g., saving files via Electron API).
