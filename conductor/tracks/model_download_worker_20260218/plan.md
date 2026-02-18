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
  - [ ] Send `{ status: 'success', msg }` after all models are downloaded successful.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Web Worker Development' (Protocol in workflow.md)**

## Phase 2: Models Service Implementation

Integrate the worker into the Angular service and manage the download state.

- [ ] **Task 1: Scaffold LocalStorageService**
  - [ ] Create `src/app/on-device-models/services/local-storage.service.ts`.
  - [ ] Implement `getItem(key: string): string | null` and `setItem(key: string, value: string): void`.
- [ ] **Task 2: Declare status signal, pipeline signals and computed signals in Service**
  - [ ] Create `src/app/on-device-models/types.ts` to declare:
    - `StatusType = 'idle' | 'downloading' | 'success' | 'error' | 'unsupported'`
    - `type ModelStatus = { status: StatusType; msg?: string; progress?: number; };`
    - `DOWNLOAD_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000`
  - [ ] Implement the private `#status` signal to `ModelStatus`.
  - [ ] Implement the `statusMessage` computed signal:
    - `error`, `success`, `unsupported` -> return `msg`.
    - `downloading` -> return `Downloading a model: ${progress}%`.
    - `idle` / default -> return `''`.
  - [ ] Expose a read-only `status` signal, `status = this.#status.asReadonly()`.
  - [ ] Expose a computed `statusType` signal that returns the `status().status`.
  - [ ] Declare `translation_pipeline = signal<any>(null);`.
  - [ ] Declare `tts_pipeline = signal<any>(null);`.
- [ ] **Task 3: Initialize Worker and Inject LocalStorageService in Service**
  - [ ] In `ModelsService` constructor, check for `typeof Worker !== 'undefined'`.
  - [ ] If unsupported, set #status signal to `{ status: 'unsupported' }`.
  - [ ] If supported, instantiate the worker and inject `LocalStorageService`.
- [ ] **Task 4: Implement Message Handling & Orchestration with Date Check**
  - [ ] Implement logic to check `localStorageService.getItem('last_model_download_date')`.
  - [ ] If date exists AND `(Date.now() - Number(last_model_download_date) < DOWNLOAD_EXPIRATION_MS)`, skip download sequence (or handle "load from cache").
  - [ ] If date missing OR > DOWNLOAD_EXPIRATION_MS:
    - [ ] Trigger `postMessage({ type: 'translate-gemma' })` immediately on init.
  - [ ] Implement `worker.onmessage` to update the status signal.
  - [ ] When `translate-gemma` finishes successfully (status returns to `idle`), trigger `postMessage({ type: 'tts' })`.
  - [ ] When `translate-gemma` fails, set `{ status: 'error', msg: 'translate-gemma download failed.'}` and no further action.
  - [ ] When `tts` finishes successfully:
    - [ ] Set `{ status: 'success', msg: 'All models are downloaded successfully' }`.
    - [ ] Set `localStorageService.setItem('last_model_download_date', Date.now().toString())`.
    - [ ] Instantiate/Load the pipelines (if not already done by worker) and update `translation_pipeline` / `tts_pipeline` signals.
  - [ ] When `tts` fails, set `{ status: 'error', msg: 'tts download failed.' }`.
- [ ] **Task 5: Write Unit Tests for Service**
  - [ ] Mock the Web Worker to verify message passing.
  - [ ] Verify `#status` updates for different worker statuses.
  - [ ] Verify `statusMessage` correctly derives values for all supported states.
  - [ ] Verify `status` correctly shows the readonly-value of `#status`.
  - [ ] Verify `last_model_download_date` logic (mock LocalStorageService).
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Models Service Implementation' (Protocol in workflow.md)**

## Phase 3: Application Integration & Verification

Verify the system works end-to-end in the application shell.

- [ ] **Task 1: Integrate with AppComponent**
  - [ ] Inject `ModelsService` into `AppComponent`.
  - [ ] Log status updates to the console in `ModelsService`'s constructor: `console.log('Model Download Status:', status())`.
- [ ] **Task 2: End-to-End Manual Verification**
  - [ ] Open the browser console and verify the sequence of downloads.
  - [ ] Verify progress updates are logged.
  - [ ] Verify the final `success` state is reached.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Application Integration & Verification' (Protocol in workflow.md)**
