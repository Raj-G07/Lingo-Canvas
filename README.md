# Lingo Canvas

Lingo Canvas uses Lingo.dev as a structured localization layer for the deterministic parts of the application.

While the canvas content is regenerated via AI per locale, the App Shell (toolbars, menus, buttons, modals, error states) must remain:

- Predictable
- Performant
- Cacheable
- Fallback-safe
- Structured

Lingo.dev provides:

- Structured translation keys
- CLI-based dictionary management
- Controlled fallback behavior (English default)
- Runtime SDK integration
- Clear separation from AI-generated content

This ensures the application maintains professional localization standards while experimenting with generative UI.


## Overview

Lingo Canvas is an intelligent research and ideation tool that combines the infinite canvas of **tldraw** with the generative power of **Thesys C1**. It allows users to:

1.  **Iterate in Any Language** - Seamlessly switch between English, German, Arabic, and Urdu.
2.  **AI-Generated Cards** - Create dynamic components (charts, images, tables) on-the-fly.
3.  **Context-Aware Collaboration** - New cards understand the existing content of your canvas.
4.  **Hybrid Architecture** - Combines static Lingo.dev translations for the App Shell with dynamic AI regeneration for canvas content.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Canvas Engine**: tldraw
-   **GenUI SDK**: `@thesysai/genui-sdk`
-   **AI Integration**: Thesys C1 API
-   **Localization**: Lingo.dev 
-   **Styling**: Tailwind CSS 4
-   **State Management**: React Context for Locale & UI state

## Localization Workflow

This project implements a sophisticated **Multilingual Generative UI** workflow:

### App Shell Translation
Static UI elements like toolbars, buttons, and menus are translated using [Lingo.dev](https://lingo.dev/).
-   **CLI Workflow**: Keys are managed in `locales/*.json`.
-   **Dictionaries**: Support for English (en), German (de), Arabic (ar), and Urdu (ur).

### Dynamic Content Regeneration
Unlike traditional apps that translate static text, **Lingo Canvas** leverages AI for content:
-   When the language changes, an event is dispatched to the GenUI components.
-   The Thesys C1 engine **regenerates** the card content in the target language.
-   This ensures that images, charts, and descriptions are culturally and linguistically contextual, not just literally translated.

*Note: This project deliberately avoids RTL (Right-to-Left) layout logic to focus on core generative capabilities.*

## Getting Started

### Prerequisites

-   Node.js (v20+)
-   NPM or PNPM
-   Thesys API Key
-   Lingo.dev API Key (for localization)
-   Search Provider Key (Exa or Google Gemini)

### Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Raj-G07/Lingo-Canvas.git
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    THESYS_API_KEY=your_thesys_api_key
    LINGODOTDEV_API_KEY=your_lingo_dev_api_key
    EXA_API_KEY=your_exa_api_key  # Optional: For research tools
    # OR
    GOOGLE_GEMINI_API_KEY=your_gemini_api_key
    ```
    
### Screenshots

<img width="1318" height="635" alt="Screenshot 2026-02-23 133917" src="https://github.com/user-attachments/assets/eaede7c6-59f5-4dcf-84ab-ca6fec9f1632" />

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

## Key Features & Shortcuts

-   **`Cmd/Ctrl + K`**: Open the prompt input to generate new cards.
-   **Infinite Workspace**: Drag, resize, and organize cards freely on the tldraw canvas.
-   **Real-time Streaming**: Watch AI-generated components render as they are created.
-   **Locale Switcher**: Change the entire app's language instantly via the toolbar.

## Customization

System behavior is defined in `src/app/api/ask/systemPrompt.ts`. You can modify this to change how the AI structure its responses, such as encouraging more visual components or specific data formatting styles.
