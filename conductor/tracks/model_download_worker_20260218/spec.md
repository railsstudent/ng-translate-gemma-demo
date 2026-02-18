# Specification: Model Download Web Worker & Service Integration

## Overview

This track focuses on implementing a robust model download system using a dedicated Web Worker and the `ModelsService`. The system will sequentially download the TranslateGemma and TTS models, leveraging WebGPU for performance where available, with a graceful fallback to WebAssembly (WASM). The `ModelsService` will manage the worker lifecycle and expose the download status via a reactive signal.

## Functional Requirements

### 1. Web Worker (`src/app/on-device-models/workers/download-model.worker.ts`)

- **Message Protocol (Input):**
  - Accepts messages with the structure `{ type: string }`.
  - `type: 'translate-gemma'` -> Downloads `google/translategemma-4b-it`.
  - `type: 'tts'` -> Downloads `onnx-community/Kokoro-82M-v1.0-ONNX`.
- **Hardware Acceleration:**
  - Detects WebGPU support.
  - Uses WebGPU configuration for Transformers.js if available.
  - Implements a `try-catch` block to fallback to WASM configuration if WebGPU initialization fails.
- **Download Logic:**
  - Uses Transformers.js v3 to initiate model downloads.
  - Utilizes `progress_callback` to track download percentage.
- **Message Protocol (Output):**
  - Emits status updates:
    - `{ status: 'idle' }`: Initial state and upon successful completion of a download.
    - `{ status: 'downloading', progress: number }`: During download (0-100%).
    - `{ status: 'error', msg: string }`: On failure.

### 2. Models Service (`src/app/on-device-models/services/models.service.ts`)

- **Initialization:**
  - Instantiates the Web Worker in the constructor.
  - Checks for Web Worker support:
    - If supported: Proceeds with worker initialization.
    - If unsupported: Sets the status signal to `{ status: 'unsupported' }`.
- **LocalStorage Service (`src/app/on-device-models/services/local-storage.service.ts`):**
  - **New:** Provides a wrapper for `localStorage` with `getItem(key: string): string | null` and `setItem(key: string, value: string): void`.
- **State Management:**
  - Maintains a private writable signal for worker status.
  - Exposes a public read-only signal for consumers (e.g., `AppComponent`).
  - Maintains `translation_pipeline` and `tts_pipeline` signals (typed as `any` or specific Pipeline types) to store the initialized pipelines.
- **Workflow Orchestration:**
  - **Step 0:** Checks `localStorage` via `LocalStorageService` for `last_model_download_date`.
    - If `last_model_download_date` does not exist OR `(current date - last_model_download_date) > DOWNLOAD_EXPIRATION_MS` (30 days):
      - Proceed to **Step 1** (Force download).
    - Else:
      - Skip to **Step 4** (Load pipelines from cache).
  - **Step 1:** Automatically triggers the download for 'translate-gemma' upon worker initialization.
  - **Step 2:** Listens for the `idle` status after the 'translate-gemma' download completes.
  - **Step 3:** Automatically triggers the download for 'tts'.
  - **Step 4:** Upon successful completion of downloads (or if skipped):
    - Stores the current timestamp to `last_model_download_date` in `localStorage` via `LocalStorageService` (if downloaded).
    - Instantiates/Loads the `translation_pipeline` and `tts_pipeline`
- **Message Handling:**
  - Updates the status signal based on messages received from the worker (`onmessage`).

### 3. App Component (`src/app/app.component.ts`)

- **Integration:** Injects `ModelsService`.
- **Verification:** Accesses the public status signal and logs its value to the console for debugging and verification.

## Acceptance Criteria

- [ ] `ModelsService` correctly detects Web Worker support and sets status to 'unsupported' if unavailable.
- [ ] Web Worker successfully initializes and detects WebGPU availability.
- [ ] Web Worker falls back to WASM if WebGPU is unavailable or fails.
- [ ] 'translate-gemma' model download starts automatically.
- [ ] 'tts' model download starts automatically after 'translate-gemma' completes.
- [ ] Status signal correctly reflects 'downloading' state with progress updates.
- [ ] Status signal correctly reflects 'idle' state after each download completes.
- [ ] Status signal correctly reflects 'error' state if a download fails.
- [ ] `AppComponent` logs the status signal updates to the console.

## Out of Scope

- Implementation of the actual translation or TTS inference logic (inference will be handled in separate tracks).
- Creation of a UI component to display the status (this will be handled in a separate track).
