# Implementation Plan: Status-Dependent Navigation & Component Gating

## Phase 1: Navigation Component Updates

Update the shared navigation components to react to the application status.

- [ ] **Task 1: Update HeaderComponent**
  - [ ] Add `status = input.required<StatusType>()` to the component.
  - [ ] Update the template for the "Translate" link:
    - Add `[class.disabled]="status() !== 'success'"`
    - Add `[style.pointer-events]="status() !== 'success' ? 'none' : 'auto'"`
- [ ] **Task 2: Update HomeComponent**
  - [ ] Add `status = input.required<StatusType>()` to the component.
  - [ ] Update the template for the "Start Translating" link:
    - Add `[class.disabled]="status() !== 'success'"`
    - Add `[style.pointer-events]="status() !== 'success' ? 'none' : 'auto'"`
- [ ] **Task 3: Write Unit Tests for Navigation Gating**
  - [ ] Verify `HeaderComponent` styles links correctly for all `StatusType` values.
  - [ ] Verify `HomeComponent` styles links correctly for all `StatusType` values.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Navigation Component Updates' (Protocol in workflow.md)**

## Phase 2: TranslateComponent Gating

Implement defensive programming in the `TranslateComponent` to handle premature navigation.

- [ ] **Task 1: Update TranslateComponent Template**
  - [ ] Add `modelStatus = input.required<ModelStatus>()` to the component.
  - [ ] Wrap the component template in an `@if (modelStatus().status === 'success')` block.
  - [ ] In the `@if` branch, add a stub: `<p>Translation UI (Content retrieval workflow implementation coming soon...)</p>`.
  - [ ] In the `@else` branch, add the `<app-status [status]="modelStatus().status" [message]="modelStatus().msg || ''" />`.
- [ ] **Task 2: Write Unit Tests for TranslateComponent Gating**
  - [ ] Verify the "coming soon" stub is shown only when status is `success`.
  - [ ] Verify `StatusComponent` is shown with correct inputs when status is not `success`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: TranslateComponent Gating' (Protocol in workflow.md)**

## Phase 3: Application Shell Integration

Connect the components to the `ModelsService` in the `AppComponent`.

- [ ] **Task 1: Update AppComponent Template**
  - [ ] Pass `modelsService.statusType()` to the `app-header` component.
  - [ ] Pass `modelsService.statusType()` to the `app-home` component.
  - [ ] Enable `bindToComponentInputs: true` in `app.config.ts` (if not already enabled) to allow passing signals via router outlet.
  - [ ] Update `app.routes.ts` or `app.component.html` to ensure `modelStatus` is passed to the `TranslateComponent`.
- [ ] **Task 2: End-to-End Manual Verification**
  - [ ] Verify links are disabled during download.
  - [ ] Verify `/translate` route shows status during download.
  - [ ] Verify everything activates once status is `success`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Application Shell Integration' (Protocol in workflow.md)**
