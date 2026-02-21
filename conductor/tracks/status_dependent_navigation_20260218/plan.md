# Implementation Plan: Status-Dependent Navigation & Component Gating

## Phase 1: Navigation Component Updates

Update the shared navigation components to react to the application status.

- [ ] **Task 1: Update HeaderComponent**
  - [ ] Add `status = input.required<StatusType>()` to the component.
  - [ ] Update the template for the "Translate" link:
    - Add `[class.disabled]="status() !== 'success'"`
    - Add `[style.pointer-events]="status() !== 'success' ? 'none' : 'auto'"`
- [ ] **Task 2: Update HomeComponent**
  - [ ] Add `status = inject(ROUTER_OUTLET_DATA) as Signal<ModelStatus>`;
  - [ ] Update the template for the "Start Translating" link:
    - Add `[class.disabled]="status().status !== 'success'"`
    - Add `[style.pointer-events]="status().status !== 'success' ? 'none' : 'auto'"`
- [ ] **Task 3: Write Unit Tests for Navigation Gating**
  - [ ] Verify `HeaderComponent` styles links correctly for all `StatusType` values.
  - [ ] Verify `HomeComponent` styles links correctly for all `StatusType` values.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Navigation Component Updates' (Protocol in workflow.md)**

## Phase 2: TranslationComponent Gating

Implement defensive programming in the `TranslationComponent` to handle premature navigation.

- [ ] **Task 1: Update TranslationComponent Template**
  - [ ] Add `status = inject(ROUTER_OUTLET_DATA) as Signal<ModelStatus>`;
  - [ ] Wrap the component template in an `@if (status().status === 'success')` block.
  - [ ] In the `@if` branch, add a stub: `<p>Translation UI (Content retrieval workflow implementation coming soon...)</p>`.
  - [ ] In the `@else` branch, add a simple message, `<div><p>Translation Service is unavailable.</p></div>`.
- [ ] **Task 2: Write Unit Tests for TranslationComponent Gating**
  - [ ] Verify the "coming soon" stub is shown only when status is `success`.
  - [ ] Verify `Translation Service is unavailable.` is shown when status is not `success`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: TranslationComponent Gating' (Protocol in workflow.md)**

## Phase 3: Application Shell Integration

Connect the components to the `ModelsService` in the `AppComponent`.

- [ ] **Task 1: Update AppComponent Template**
  - [ ] Pass `modelsService.statusType()` to the `app-header` component.
  - [ ] In the inline template of AppComponent, `<router-outlet [routerOutletData]="modelsService.status()" />`.
- [ ] **Task 2: End-to-End Manual Verification**
  - [ ] Verify links are disabled during download.
  - [ ] Verify `/translate` route shows status during download.
  - [ ] Verify everything activates once status is `success`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Application Shell Integration' (Protocol in workflow.md)**
