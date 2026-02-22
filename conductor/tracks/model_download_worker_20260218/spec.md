# Specification: Model Download Web Worker & Service Integration

## Overview

This track focuses on implementing a robust model download system using a dedicated Web Worker and the `ModelsService`. The system will sequentially download the TranslateGemma and TTS models, leveraging WebGPU for performance where available, with a graceful fallback to WebAssembly (WASM). The `ModelsService` will manage the worker lifecycle and expose the download status via a reactive signal.

## Functional Requirements

### 1. Web Worker (`src/app/on-device-models/workers/download-models.worker.ts`)

- **Message Protocol (Input):**
  - Accepts messages with the structure `{ type: string }`.
  - `type: 'translate-gemma'` -> Downloads `google/translategemma-4b-it`.
  - `type: 'tts'` -> Downloads `onnx-community/Kokoro-82M-v1.0-ONNX`.
  - `type: 'delete-all-models'` -> Deletes all models from the cache.
- **Hardware Acceleration:**
  - Detects WebGPU support.
  - Uses WebGPU configuration for Transformers.js if available.
  - Implements a `try-catch` block to fallback to WASM configuration if WebGPU initialization fails.
- **Download Logic:**
  - Uses Transformers.js v3 to initiate model downloads.
  - Utilizes `progress_callback` to track download percentage.
  - Instantiate a pipeline and set it to the `transformer_pipelines` by key.
- **Delete All Models Logic:**
  - Delete all the models from the cache keyed by the `transformers-cache`.
- **Message Protocol (Output):**
  - Emits status updates:
    - `{ status: 'idle' }`: Initial state.
    - `{ status: 'ready', modelId: string }`: Emitted upon successful completion of a specific model's download.
    - `{ status: 'downloading', progress: number, modelId: string }`: During download (0-100%).
    - `{ status: 'error', msg: string }`: On failure.

### 2. Models Service (`src/app/on-device-models/services/models.service.ts`)

- **Initialization:**
  - Instantiates the Web Worker in the constructor.
  - Checks for Web Worker support:
    - If supported: Proceeds with worker initialization.
    - If unsupported: Sets the status signal to `{ status: 'unsupported' }`.
- **Logging:** Logs status updates to the console whenever the internal state changes (e.g., in the `onmessage` handler).
- **LocalStorage Service (`src/app/on-device-models/services/local-storage.service.ts`):**
  - Provides a wrapper for `localStorage` with `getItem(key: string): string | null` and `setItem(key: string, value: string): void`.
- **State Management:**
  - Maintains a private writable `#status` for worker status.
  - Exposes a public read-only `status`, computed `statusType` and computed `statusMessage` for consumers (e.g., `AppComponent`).
- **Workflow Orchestration:**
  - **Step 0:** Checks `localStorage` via `LocalStorageService` for `last_model_download_date`.
    - If `last_model_download_date` does not exist OR `(current date - last_model_download_date) > DOWNLOAD_EXPIRATION_MS` (30 days):
      - Delete all models from the transformer cache.
      - Proceed to **Step 1** (Force download).
    - Else:
      - Skip to **Step 4** (Load pipelines from cache).
  - **Step 1:** Automatically triggers the download for 'translate-gemma' upon worker initialization.
  - **Step 2:** Listens for the `ready` status after the 'translate-gemma' download completes.
  - **Step 3:** Automatically triggers the download for subsequent models.
  - **Step 4:** Upon successful completion of downloads:
    - Sets the status signal to `{ status: 'success', msg: 'All models are downloaded successfully.' }` (if downloaded).
    - Stores the current timestamp to `last_model_download_date` in `localStorage` via `LocalStorageService` (if downloaded).
  - **Step 5:** If download is skipped:
    - Sets the status signal to `{ status: 'success', msg: 'Models loaded from cache.' }` (if downloaded).
- **Message Handling:**
  - Updates the status signal based on messages received from the worker (`onmessage`).
  - If a download failure message is received, sets the status signal to `{ status: 'error', msg: event.data.msg }`.

### 3. App Component (`src/app/app.component.ts`)

- **Integration:** Injects `ModelsService`.

## Acceptance Criteria

- [ ] `ModelsService` correctly detects Web Worker support and sets status to 'unsupported' if unavailable.
- [ ] Web Worker successfully initializes and detects WebGPU availability.
- [ ] Web Worker falls back to WASM if WebGPU is unavailable or fails.
- [ ] 'translate-gemma' model download starts automatically.
- [ ] 'tts' model download starts automatically after 'translate-gemma' completes.
- [ ] Status signal correctly reflects 'downloading' state with progress updates.
- [ ] Status signal correctly reflects 'ready' state after each download completes.
- [ ] Status signal correctly reflects 'error' state if a download fails.
- [ ] `ModelsService` logs the status signal updates to the console.

## Out of Scope

- Implementation of the actual translation or TTS inference logic (inference will be handled in separate tracks).
- Creation of a UI component to display the status (this will be handled in a separate track).
