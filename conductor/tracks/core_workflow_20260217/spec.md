# Track Specification: Core Translation Workflow

## Overview
This track implements the foundational features of the application: downloading and running the TranslateGemma model in a web worker, managing state with Angular Signals, retrieving and cleaning content from a user-provided URL, and displaying the translation results in a responsive UI.

## Features
-   **Web Worker Implementation:**
    -   Create a dedicated web worker to handle Hugging Face Transformers.js operations.
    -   Implement message passing for model loading status (progress percentage, status text) and translation results.
    -   Handle WebGPU detection and fallback to CPU/WASM if unavailable.
-   **Service & State Management:**
    -   Develop a `TranslationService` using Angular Signals.
    -   Expose signals for: `isModelLoading`, `modelLoadingProgress`, `statusMessage`, `isTranslating`, `translationResult`, and `error`.
-   **Content Retrieval:**
    -   Implement a utility or service method to fetch HTML content from a given URL.
    -   Sanitize and extract the main article text from the fetched HTML to prepare it for translation.
-   **User Interface:**
    -   **Model Status:** Display a progress bar and status message during model initialization.
    -   **Input Area:** Text input for the blog post URL and a dropdown for target language selection.
    -   **Action:** "Translate" button to trigger the fetch-and-translate process.
    -   **Result Area:** A card-based view to display the translated text.

## Technical Details
-   **Model:** `TranslateGemma` (4b variant if WebGPU is supported, smaller variant otherwise).
-   **Library:** `@huggingface/transformers`.
-   **Styling:** Tailwind CSS for all components.
-   **Error Handling:** Graceful handling of network errors (fetch) and model inference errors.

## Acceptance Criteria
-   [ ] Application detects WebGPU support on startup.
-   [ ] Model downloads and initializes in a web worker without freezing the UI.
-   [ ] Progress bar accurately reflects the download status.
-   [ ] User can enter a valid URL and select a language.
-   [ ] Application fetches content from the URL, cleans it, and translates it.
-   [ ] Translated text is displayed in the UI.
-   [ ] Errors are displayed with user-friendly messages.
