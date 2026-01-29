# YouTube Playlist Music Downloader

A Node.js application that automatically downloads music from a YouTube playlist and converts the videos to MP3 format, saving them to iCloud Drive.

## Features

- **Web Scraping**: Uses Puppeteer to scrape YouTube playlist information
- **Automatic Download**: Downloads videos from YouTube using `youtubedr`
- **Format Conversion**: Converts MP4 videos to MP3 using FFmpeg
- **Duplicate Prevention**: Skips downloading files that already exist
- **Title Normalization**: Converts titles to URL-friendly slugs and handles Vietnamese characters
- **iCloud Integration**: Automatically saves downloaded music to your iCloud Drive

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **youtubedr** - Download videos from YouTube
  ```bash
  npm install -g youtubedr
  ```
- **FFmpeg** - Convert video to audio
  ```bash
  # macOS with Homebrew
  brew install ffmpeg
  ```

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:nhcuongng/youtubedr-to-icloud.git
   cd music
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Before running the script, update the configuration in `utils.js`:

```javascript
const TARGET_FOLDER = "/path/to/your/icloud/music/folder";
```

Currently, the script is set to download from a specific YouTube playlist. To use a different playlist, update the URL in `youtube-my-mix.js`:

```javascript
await page.goto("https://youtube.com/playlist?list=YOUR_PLAYLIST_ID");
```

## Usage

Run the downloader:

```bash
npm start
```

The script will:
1. Open the YouTube playlist in a headless browser
2. Extract all video links and titles
3. Download each video as MP4
4. Convert MP4 to MP3 using FFmpeg
5. Save the MP3 files to your iCloud Drive
6. Skip files that already exist to avoid re-downloading

## Project Structure

- **index.js** - Main entry point
- **youtube-my-mix.js** - Puppeteer script to scrape YouTube playlist
- **downloader.js** - Downloads videos and converts to MP3
- **utils.js** - Utility functions and configuration constants
- **youtube/** - Temporary storage for downloaded MP4 files

## How It Works

1. **Scraping**: Puppeteer launches a headless browser and navigates to the YouTube playlist
2. **Title Processing**: Video titles are converted to slugs (removes accents, special characters, converts to lowercase)
3. **Downloading**: Uses `youtubedr` CLI to download videos at quality level 18
4. **Converting**: FFmpeg converts MP4 to MP3 with best quality audio
5. **Organizing**: Files are moved from temporary folder to iCloud Drive and temporary files are cleaned up

## Dependencies

- **puppeteer** (^23.8.0) - Headless browser automation for web scraping

## Notes

- Downloaded videos are temporarily stored in the `./youtube` folder before conversion
- MP3 files are saved directly to your iCloud Drive for easy syncing
- The script includes error handling and success logging for debugging
- Vietnamese character support in song titles is maintained through slug conversion

## License

ISC
