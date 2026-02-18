# Specification: Status-Dependent Navigation & Component Gating

## Overview
This track implements UI logic to gate access to the translation feature based on the model download status. It ensures that navigation links are visually and functionally disabled until the models are ready, and provides a defensive fallback in the `TranslateComponent`.

## User Persona
- As a user, I want to see when the translation service is available and be prevented from accessing it before the required models are ready.

## Functional Requirements

### 1. HeaderComponent & HomeComponent Updates
-   **Input:** Accept a required input signal `status` of type `StatusType`.
-   **Navigation Link Logic:**
    -   **Visual Gating:** Bind `[class.disabled]` to `status() !== 'success'`.
    -   **Functional Gating:** Use `[style.pointer-events]="status() !== 'success' ? 'none' : 'auto'"` to disable interactions when not ready.
    -   *Note: This ensures the link remains visible but becomes unclickable and visually muted.*

### 2. TranslationComponent (Defensive Programming)
-   **Input:** Accept a required input signal `modelStatus` of type `ModelStatus` (the full status object from `ModelsService`).
-   **Template Logic:**
    -   **@if (modelStatus().status === 'success'):**
        -   Display a stub/placeholder: "Translation UI (Content retrieval workflow implementation coming soon...)".
    -   **@else:**
        -   Render the `<app-status [status]="modelStatus().status" [message]="modelStatus().msg || ''" />`.
    -   *Note: This acts as a secondary guard for users who might navigate directly to the URL.*

### 3. AppComponent Integration
-   **Template:**
    -   Pass `modelsService.statusType()` to the `HeaderComponent` input.
    -   Pass `modelsService.statusType()` to the `HomeComponent` input.
    -   Pass the full `modelsService.status()` object to the `TranslationComponent` (via router outlet input binding).

## Technical Implementation Details
-   **Data Types:** Uses `type ModelStatus = { status: StatusType; progress?: number; msg?: string; }`.
-   **Control Flow:** Use Angular's `@if` / `@else` syntax for conditional rendering.
-   **Styling:** Use `[style.pointer-events]` for inline interactivity control.
-   **Change Detection:** `ChangeDetectionStrategy.OnPush`.

## Acceptance Criteria
-   Navigation links in Header and Home are visually disabled and unclickable when status is not `success`.
-   `TranslationComponent` correctly falls back to displaying the `StatusComponent` if models are not ready.
-   `TranslationComponent` shows the "coming soon" stub only when the status is `success`.

## Out of Scope
-   The actual implementation of the translation workflow (handled in the `core_workflow` track).
-   Type definitions and service signal implementation (handled in the `model_download_worker` track).
