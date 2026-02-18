# Specification: Status Component and Service Integration

## Overview

This track involves creating a centralized `StatusComponent` to provide visual feedback on the state of the on-device AI model worker. It leverages the `status` signal in `ModelsService` (defined in the `model_download_worker` track) to display the current operational state to the user.

## User Persona

- As a user, I want to see the current state of the translation engine (loading, success, error, or unsupported) so that I know if the service is ready for use.

## Functional Requirements

1. **Status Consumption (ModelsService):**
    - Utilize the `status` signal in `ModelsService`.
    - Signal Type: `Signal<{ status: string, msg?: string, progress?: number }>`
    - Supported statuses: `idle`, `downloading`, `success`, `error`, `unsupported`.
    - Create a computed `statusMessage` signal in `ModelsService` with the following logic:
        - If `status` is `error`, `success`, or `unsupported`: return `msg`.
        - If `status` is `downloading`: return `Downloading: ${progress}%`.
        - Default: return an empty string.
2. **StatusComponent (Presentational):**
    - **Location:** `src/app/core/ui/status/status.component.ts`.
    - **Inputs:** `status` (signal) and `message` (signal).
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
        - **Behavior:** When the status is `idle`, the component must be entirely hidden.
3. **Application Integration (AppComponent):**
    - Import `StatusComponent` into `AppComponent`.
    - Place the component in the `AppComponent` template, positioned above the main content area (`router-outlet`).
    - Bind the component inputs to the `status` and `statusMessage` signals from `ModelsService`.

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
- Updating the status in `ModelsService` reflects immediately in the UI.

## Out of Scope

- Implementation of the `HomeComponent`, `HeaderComponent`, or `TranslateComponent`.
- Implementing conditional logic inside those components (e.g., hiding/showing links).
