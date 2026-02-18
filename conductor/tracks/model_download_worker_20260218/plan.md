# Implementation Plan: Model Download Web Worker & Service Integration

## Phase 1: Web Worker Development

Implement the core download logic in the Web Worker.

- [ ] **Task 1: Scaffold Web Worker**
  - [ ] Create `src/app/on-device-models/workers/download-model.worker.ts`.
  - [ ] Implement basic `onmessage` listener.
- [ ] **Task 2: Implement Hardware Acceleration Detection**
  - [ ] Add logic to detect WebGPU support.
  - [ ] Configure Transformers.js v3 to use WebGPU if available.
  - [ ] Implement `try-catch` for WebGPU failure with WASM fallback.
- [ ] **Task 3: Implement Model Download Logic**
  - [ ] Map `translate-gemma` and `tts` types to their respective model IDs.
  - [ ] Use `env.allowLocalModels = false` (or appropriate Transformers.js config).
  - [ ] Implement `progress_callback` to send `{ status: 'downloading', progress }` messages.
- [ ] **Task 4: Implement Status Reporting**
  - [ ] Send `{ status: 'idle' }` on initialization and after successful downloads.
  - [ ] Send `{ status: 'error', msg }` on any caught exceptions.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Web Worker Development' (Protocol in workflow.md)**

## Phase 2: Models Service Implementation

Integrate the worker into the Angular service and manage the download state.

- [ ] **Task 1: Initialize Worker in Service**
  - [ ] In `ModelsService` constructor, check for `typeof Worker !== 'undefined'`.
  - [ ] If unsupported, set status signal to `{ status: 'unsupported' }`.
  - [ ] If supported, instantiate the worker.
- [ ] **Task 2: Implement State Management**
  - [ ] Create a writable signal for `status`.
  - [ ] Expose a read-only `status` signal.
- [ ] **Task 3: Implement Message Handling & Orchestration**
  - [ ] Implement `worker.onmessage` to update the status signal.
  - [ ] Trigger `postMessage({ type: 'translate-gemma' })` immediately on init.
  - [ ] When `translate-gemma` finishes (status returns to `idle`), trigger `postMessage({ type: 'tts' })`.
- [ ] **Task 4: Write Unit Tests for Service**
  - [ ] Mock the Web Worker to verify message passing.
  - [ ] Verify signal updates for different worker statuses.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Models Service Implementation' (Protocol in workflow.md)**

## Phase 3: Application Integration & Verification

Verify the system works end-to-end in the application shell.

- [ ] **Task 1: Integrate with AppComponent**
  - [ ] Inject `ModelsService` into `AppComponent`.
  - [ ] Use an `effect` or lifecycle hook to monitor the status signal.
  - [ ] Log status updates to the console: `console.log('Model Download Status:', status())`.
- [ ] **Task 2: End-to-End Manual Verification**
  - [ ] Open the browser console and verify the sequence of downloads.
  - [ ] Verify progress updates are logged.
  - [ ] Verify the final `idle` state is reached.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Application Integration & Verification' (Protocol in workflow.md)**
