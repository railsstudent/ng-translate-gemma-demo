# Product Guidelines

## User Interface & Experience

- **Tone:** The application should maintain a **Simple & Friendly** tone. While the underlying technology is complex, the user interface should remain approachable and hide unnecessary technical details.
- **Clarity:** Prioritize clarity in all interactions. The user should always understand the current state of the application, especially during long-running tasks like model downloading or translation.
- **Feedback:** Provide consistent and informative feedback for all operations.
  - **Progress Tracking:** Use discrete progress bars with percentage completion for model loading and inference.
  - **Status Messages:** Accompany visual indicators with descriptive, human-readable status messages (e.g., "Warming up the Gemma engine...", "Cleaning the blog post content...").

## Visual Identity

- **Aesthetic:** Clean, modern, and focused. Use a card-based layout to organize content logically.
- **Typography:** Use clear, legible fonts with appropriate weights and sizes for readability, especially for translated technical content.
- **Color Palette:** Employ a professional and calming color palette that enhances focus and reduces visual noise.

## Error Handling

- **Instructive Errors:** When an error occurs (e.g., unsupported WebGPU, network failure), provide gentle and instructive messages. Suggest potential solutions or explain any automatic fallbacks being performed.
- **User-Centric:** Avoid technical jargon or stack traces in the primary UI. Keep error communication focused on the user's workflow.

## Responsiveness & Accessibility

- **Adaptive Design:** The application MUST be fully responsive, providing a comfortable reading and translation experience across various devices and screen sizes.
- **ARIA Standards:** Use appropriate ARIA labels for all dynamic content updates, especially for progress bars and status messages, to ensure compatibility with screen readers.
- **Interactive Elements:** Ensure all buttons, dropdowns, and input fields have clear focus states and meet accessibility standards for contrast and size.

## Content Presentation

- **Focused Output:** Once translation is complete, present the translated content in a clear, focused view. Avoid cluttering the interface with side-by-side comparisons unless specifically requested.
- **Clean Extraction:** When retrieving content from a URL, ensure the "cleaned" version is presented logically, maintaining the structure and readability of the original technical blog post.
