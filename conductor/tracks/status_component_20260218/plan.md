# Implementation Plan: Status Component and Service Integration

## Phase 1: StatusComponent Development

Create the presentational component for displaying status alerts.

- [ ] **Task: Generate StatusComponent**
  - [ ] Create `src/app/core/ui/status/status.component.ts`.
  - [ ] Implement the template with color-coded alert boxes (using Bootstrap-like classes or custom CSS).
  - [ ] Configure `@ng-icons/bootstrap-icons` (`bootstrapCloudDownload`, `bootstrapCheckCircle`, `bootstrapExclamationCircle`, `bootstrapXCircle`).
  - [ ] Import `StatusType` and `ModelStatus` from the `app/on-device-models/types.ts`.
  - [ ] Import `input` from `@angular/core`
  - [ ] Use `statusType` and `statusMessage` input signals.
  - [ ] Implement logic to hide the component entirely when `statusType` is `idle`.
  - [ ] Set `ChangeDetectionStrategy.OnPush`.
  - [ ] `bootstrapXCircle` only appears when `statusType` is `success`.
  - [ ] When `bootstrapXCircle` is clicked, the alert box is closed.
- [ ] **Task: Write Unit Tests for StatusComponent**
  - [ ] Verify the component is hidden when `status` is `idle`.
  - [ ] Verify correct icon and color are applied for each state.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: StatusComponent Development' (Protocol in workflow.md)**

## Phase 2: Application Integration

Integrate the status display into the main application shell.

- [ ] **Task: Integrate StatusComponent into AppComponent**
  - [ ] Import `ModelStatus` from `app/on-device-models/types.ts`.
  - [ ] Import `StatusComponent` into `AppComponent`.
  - [ ] Update `AppComponent` template to include `<app-status>` above the `<router-outlet>`.
  - [ ] Bind the `statusType` and `statusMessage` inputs to the `ModelsService`'s `statusType` and `statusMessage` computed signals.
- [ ] **Task: End-to-End Manual Verification**
  - [ ] Verify the status bar appears and updates correctly during the model download sequence.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md)**
