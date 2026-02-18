# Implementation Plan: Status Component and Service Integration

## Phase 1: Service Enhancements

Refine the `ModelsService` to support the new status messaging logic.

- [ ] **Task: Update ModelsService Signal and Computed Logic**
  - [ ] Update the `status` signal type to `{ status: string, msg?: string, progress?: number }`.
  - [ ] Implement the `statusMessage` computed signal:
    - `error`, `success`, `unsupported` -> return `msg`.
    - `downloading` -> return `Downloading: ${progress}%`.
    - `idle` / default -> return `''`.
- [ ] **Task: Write Unit Tests for ModelsService**
  - [ ] Verify `statusMessage` correctly derives values for all supported states.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Service Enhancements' (Protocol in workflow.md)**

## Phase 2: StatusComponent Development

Create the presentational component for displaying status alerts.

- [ ] **Task: Generate StatusComponent**
  - [ ] Create `src/app/core/ui/status/status.component.ts`.
  - [ ] Implement the template with color-coded alert boxes (using Bootstrap-like classes or custom CSS).
  - [ ] Configure `@ng-icons/bootstrap-icons` (`bootstrapCloudDownload`, `bootstrapCheckCircle`, `bootstrapExclamationCircle`).
  - [ ] Use `status` and `message` input signals.
  - [ ] Implement logic to hide the component entirely when `status` is `idle`.
  - [ ] Set `ChangeDetectionStrategy.OnPush`.
- [ ] **Task: Write Unit Tests for StatusComponent**
  - [ ] Verify the component is hidden when `status` is `idle`.
  - [ ] Verify correct icon and color are applied for each state.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: StatusComponent Development' (Protocol in workflow.md)**

## Phase 3: Application Integration

Integrate the status display into the main application shell.

- [ ] **Task: Integrate StatusComponent into AppComponent**
  - [ ] Import `StatusComponent` into `AppComponent`.
  - [ ] Update `AppComponent` template to include `<app-status>` above the `<router-outlet>`.
  - [ ] Bind the `status` and `message` inputs to the `ModelsService` signals.
- [ ] **Task: End-to-End Manual Verification**
  - [ ] Verify the status bar appears and updates correctly during the model download sequence.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md)**
