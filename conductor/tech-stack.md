# Technology Stack

## Core Framework

- **Angular (v21+):** Using standalone components and modern APIs for building the web application.

## Programming Language

- **TypeScript:** Providing static typing and enhanced developer experience.

## AI & Machine Learning

- **Hugging Face Transformers.js:** Powering the on-device model loading, caching, and inference.
- **TranslateGemma Models:** Utilizing pre-trained Gemma models for translation tasks.
- **WebGPU / WebAssembly:** Leveraging hardware acceleration (WebGPU) with CPU fallback (WASM) for efficient in-browser inference.

## State Management & Reactivity

- **Angular Signals:** Managing application state, including model loading progress and translation status, with high granularity.

## User Interface & Styling

- **Tailwind CSS:** A utility-first CSS framework for rapid and consistent UI development.
- **PostCSS / Autoprefixer:** Handling CSS transformations and cross-browser compatibility.

## Build & Development Tools

- **Angular CLI:** Orchestrating the development, building, and deployment workflows.
- **Web Workers:** Utilizing background threads for heavy computational tasks (model operations).

## Testing

- **Vitest:** A blazing fast unit test framework powered by Vite, used for project-wide testing.
