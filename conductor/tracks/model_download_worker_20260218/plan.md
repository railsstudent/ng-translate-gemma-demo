# Implementation Plan: Model Download Web Worker & Service Integration

## Phase 1: Web Worker Development

Implement the core download logic in the Web Worker.

- [ ] **Task 1: Scaffold Web Worker**
  - [ ] Create `src/app/on-device-models/workers/download-models.worker.ts`.
  - [ ] Implement basic `onmessage` listener.
  - [ ] Initialize an empty transformer_pipelines map `transformer_pipelines: { [key: string]: any }`
- [ ] **Task 2: Implement Hardware Acceleration Detection**
  - [ ] Add logic to detect WebGPU support.
  - [ ] Configure Transformers.js v3 to use WebGPU if available.
  - [ ] Implement `try-catch` for WebGPU failure with WASM fallback.
- [ ] **Task 3: Implement Model Download Logic**
  - [ ] Implement handler for `type: 'delete-all-models'` to delete all models from the Cache API (`transformers-cache`).
  - [ ] Map `translate-gemma` type to model ID `google/translategemma-4b-it` (task: `text-generation` or appropriate translation task).
  - [ ] Map `tts` type to model ID `onnx-community/Kokoro-82M-v1.0-ONNX` (task: `text-to-speech`).
  - [ ] Use `env.allowLocalModels = false` (or appropriate Transformers.js config).
  - [ ] Implement `progress_callback` to send `{ status: 'downloading', progress, modelId }` messages.
  - [ ] Instantiate the pipeline with the specific task type and assign to the `transformer_pipelines` map by the key.
- [ ] **Task 4: Implement Status Reporting**
  - [ ] Send `{ status: 'idle' }` on initialization.
  - [ ] Send `{ status: 'ready', modelId }` after a successful model download completion.
  - [ ] Send `{ status: 'error', msg }` on any caught exceptions.
  - [ ] Send `{ status: 'deleted', msg: 'All models deleted.' }` on models deleted successfully.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Web Worker Development' (Protocol in workflow.md)**

## Phase 2: Models Service Implementation

Integrate the worker into the Angular service and manage the download state.

- [ ] **Task 1: Scaffold LocalStorageService**
  - [ ] Create `src/app/on-device-models/services/local-storage.service.ts`.
  - [ ] Implement `getItem(key: string): string | null` and `setItem(key: string, value: string): void`.
- [ ] **Task 2: Declare status signal and computed signals in Service**
  - [ ] Create `src/app/on-device-models/types.ts` to declare:
    - [ ] `type StatusType = 'idle' | 'downloading' | 'ready' | 'success' | 'error' | 'unsupported' | 'deleted'`
    - [ ] `type ModelStatus = { status: StatusType; msg?: string; progress?: number; modelId?: string; };`
  - [ ] Create `src/app/on-device-models/constants.ts` to declare:
    - [ ] `const DOWNLOAD_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;`
    - [ ] `const ALL_MODELS = ['translate-gemma', 'tts']`.
  - [ ] Implement the private `#status` signal to `ModelStatus`.
  - [ ] Implement the `statusMessage` computed signal:
    - `error`, `success`, `unsupported`, `deleted` -> return `msg`.
    - `downloading` -> return `Downloading ${modelId}: ${progress}%`.
    - `ready` -> return `Model ${this.#status().modelId} is ready.`.
    - `idle` / default -> return `''`.
  - [ ] Expose a read-only `status` signal, `status = this.#status.asReadonly()`.
  - [ ] Expose a computed `statusType` signal that returns the `status().status`.
- [ ] **Task 3: Initialize Worker and Inject LocalStorageService in Service**
  - [ ] In `ModelsService` constructor, check for `typeof Worker !== 'undefined'`.
  - [ ] If unsupported, set #status signal to `{ status: 'unsupported' }`.
  - [ ] If supported, instantiate the worker and inject `LocalStorageService`.
- [ ] **Task 4: Implement Message Handling & Orchestration with Date Check**
  - [ ] Import `ALL_MODELS` from `src/app/on-device-models/constants.ts`.
    - [ ] `private readonly all_models = ALL_MODELS`
  - [ ] Implement logic to check `localStorageService.getItem('last_model_download_date')`.
  - [ ] If date exists AND `(Date.now() - Number(last_model_download_date) < DOWNLOAD_EXPIRATION_MS)`:
    - [ ] Skip download sequence and proceed directly to pipeline instantiation.
  - [ ] If date missing OR > DOWNLOAD_EXPIRATION_MS:
    - [ ] Trigger `postMessage({ type: 'delete-all-models' })` to delete all models from the cache keyed by the `transformers-cache`.
    - [ ] Trigger `postMessage({ type: ALL_MODELS[0] })` to start the sequential download.
  - [ ] Implement `worker.onmessage` to update the status signal and log the new state to the console.
  - [ ] When a model finishes successfully (status becomes `ready`), trigger `postMessage` for the next model in `ALL_MODELS` (e.g., 'tts').
  - [ ] When a model fails, set `{ status: 'error', msg: event.data.msg }` and no further action.
  - [ ] When all models in `ALL_MODELS` are successfully downloaded
    - [ ] If downloaded: Set `localStorageService.setItem('last_model_download_date', Date.now().toString())` and set `{ status: 'success', msg: 'All models are downloaded successfully.' }`.
  - [ ] If the download sequence was skipped:
    - [ ]  Set `{ status: 'success', msg: 'Models loaded from cache.' }`.
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
- [ ] **Task 2: End-to-End Manual Verification**
  - [ ] Open the browser console and verify the sequence of downloads.
  - [ ] Verify progress updates are logged.
  - [ ] Verify the final `success` state is reached.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Application Integration & Verification' (Protocol in workflow.md)**
