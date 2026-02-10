# QuillMonkey Chrome Extension

AI-powered browser assistant for editing web pages.

## How do I download it?

On the [GitHub repo](https://github.com/SeanHollen/quildmonkey-extension), click the green **Code** button, then **Download ZIP**. Unzip it.

## Manual Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select this folder
5. The extension icon should appear in your toolbar

## Usage

- Click the extension icon or press `Cmd+Shift+Y` (Mac) / `Ctrl+Shift+Y` (Windows) to open the side panel
- Chat with the AI to analyze, modify, or automate actions on web pages
- The AI can create and manage userscripts that run automatically on matching sites

## AI Tools

The AI assistant has access to these tools:

| Tool                | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| **analyzePage**     | Run JavaScript on the page to query DOM, extract data, or inspect elements        |
| **fetchPage**       | Analyze full page content (markdown, HTML, or CSS) to answer questions            |
| **writeNew**        | Create a new userscript that executes immediately and auto-runs on matching pages |
| **update**          | Modify an existing script's code, name, scope, or enabled status                  |
| **append**          | Add code to the end of an existing script without re-running previous code        |
| **listScripts**     | List saved scripts with optional filtering by name, host, or status               |
| **grabScreenshot**  | Capture a screenshot of the current tab (requires approval)                       |

## Requirements

- Chrome version 135 or later
- API key for Anthropic or OpenAI (configure in extension settings)
