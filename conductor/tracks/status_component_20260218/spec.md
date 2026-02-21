# Specification: Status Component and Service Integration

## Overview

This track involves creating a centralized `StatusComponent` to provide visual feedback on the state of the on-device AI model worker. It leverages the `status` signal in `ModelsService` (defined in the `model_download_worker` track) to display the current operational state to the user.

## User Persona

- As a user, I want to see the current state of the translation engine (loading, success, error, or unsupported) so that I know if the service is ready for use.

## Functional Requirements

1. **StatusComponent (Presentational):**
    - **Location:** `src/app/core/ui/status/status.component.ts`.
    - **Inputs:** `statusType` (signal) and `statusMessage` (signal).
    - **Visual Representation:**
        - **Color-coded Alerts:**
            - `downloading`: Blue
            - `success`: Green
            - `error`: Red
            - `unsupported`: Yellow
        - **Icons (`@ng-icons/bootstrap-icons`):**
            - `downloading`: `bootstrapCloudDownload`
            - `success`: `bootstrapCheckCircle`
            - `error` / `unsupported`: `bootstrapExclamationCircle`
            - `close` /  `bootstrapXCircle` and only appear when `statusType` is `success`.
        - **Behavior:** When the statusType is `idle`, the component must be entirely hidden.
        - **Behavior:** When `bootstrapXCircle` is clicked, the component must be entirely hidden.
2. **Application Integration (AppComponent):**
    - Import `StatusComponent` into `AppComponent`.
    - Place the component in the `AppComponent` template, positioned above the main content area (`router-outlet`).
    - Bind the component inputs to the `statusType` and `statusMessage` signals from `ModelsService`.

## Technical Implementation Details

- **Imports:**
  - `NgIcon` from `@ng-icons/core`
  - `provideIcons` from `@ng-icons/core`
  - `bootstrapExclamationCircle`, `bootstrapCheckCircle`, `bootstrapCloudDownload` from `@ng-icons/bootstrap-icons`
- **Component Decorator:**
  - `imports: [NgIcon]`
  - `viewProviders: [provideIcons({ bootstrapExclamationCircle, bootstrapCheckCircle, bootstrapCloudDownload })]`
- **Change Detection:** `ChangeDetectionStrategy.OnPush`

## Acceptance Criteria

- The `StatusComponent` is hidden when the state is `idle`.
- The `StatusComponent` correctly displays the color, icon, and message corresponding to the active state (`downloading`, `success`, `error`, `unsupported`).
- The `statusMessage` correctly formats the download progress.
- Updating the `statusType` in `ModelsService` reflects immediately in the UI.

## Out of Scope

- Implementation of the `HomeComponent`, `HeaderComponent`, or `TranslationComponent`.
- Implementing conditional logic inside those components (e.g., hiding/showing links).
