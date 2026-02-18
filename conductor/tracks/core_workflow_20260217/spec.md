# Track Specification: Core Translation Workflow

## Overview
This track implements the primary user-facing translation workflow: retrieving and cleaning content from a user-provided URL, performing translation using the pre-loaded models, and displaying the results in a responsive UI.

## Features
-   **Content Retrieval:**
    -   Implement a utility or service method to fetch HTML content from a given URL.
    -   Sanitize and extract the main article text from the fetched HTML to prepare it for translation.
-   **User Interface:**
    -   **Model Status:** Display a progress bar and status message during model initialization (consuming signals from `ModelsService`).
    -   **Input Area:** Text input for the blog post URL and a dropdown for target language selection.
    -   **Action:** "Translate" button to trigger the fetch-and-translate process.
    -   **Result Area:** A card-based view to display the translated text.

## Technical Details
-   **Model:** Uses `TranslateGemma` and TTS models managed by the `ModelsService`.
-   **Styling:** Tailwind CSS for all components.
-   **Error Handling:** Graceful handling of network errors (fetch) and model inference errors.

## Acceptance Criteria
-   [ ] User can enter a valid URL and select a language.
-   [ ] Application fetches content from the URL and cleans it.
-   [ ] Application triggers translation and displays progress.
-   [ ] Translated text is displayed in the UI.
-   [ ] Errors are displayed with user-friendly messages.
