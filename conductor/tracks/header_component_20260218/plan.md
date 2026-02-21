# Implementation Plan: Header Component

## Phase 1: Header Component Foundation [checkpoint: ab82706]

- [x] Task: Scaffold Header Component
  - [x] Create `src/app/layout/header/header.component.ts` (standalone, OnPush).
  - [x] Import `RouterLink` from `@angular/router`
  - [x] Import `NgIcon` and `provideIcons` from `@ng-icons/core`.
  - [x] Import `NgOptimizedImage` from `@angular/common`.
  - [x] Import `bootstrapTranslate` from `@ng-icons/bootstrap-icons`.
  - [x] Add `NgIcon`, `NgOptimizedImage`, and `RouterLink` to the `imports` array.
  - [x] Add `viewProviders: [provideIcons({ bootstrapTranslate })]` to the `@Component` decorator.
  - [x] Write failing test to verify component creation in `header.component.spec.ts`.
  - [x] Implement component to pass the test.
- [x] Task: Basic Layout & Positioning 8021507
  - [x] Write failing tests for fixed positioning and basic container structure.
  - [x] Implement fixed top layout using Tailwind CSS (`fixed top-0 w-full z-50`).
  - [x] Add background and border styling.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Header Component Foundation' (Protocol in workflow.md) ab82706

## Phase 2: Navigation & Identity Implementation [checkpoint: 06cb63f]

- [x] Task: Brand Identity (Logo & Title) 12f3c8a
  - [x] Write failing tests to verify the presence of the logo (NgOptimizedImage) and title.
  - [x] Implement Logo and "TranslateGemma" title in a group.
  - [x] Wrap brand group in a `routerLink` to root `/`.
- [x] Task: Navigation Links 463595a
  - [x] Write failing test for the "Translate" navigation link presence and route.
  - [x] Implement "Translate" link with `routerLink="/translate-blog"` and include `<ng-icon name="bootstrapTranslate" />`.
  - [x] Style links for hover/active states.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Navigation & Identity Implementation' (Protocol in workflow.md) 06cb63f

## Phase 3: Responsive Behavior & Mobile Menu [checkpoint: 4904d82]

- [x] Task: Mobile Menu State (Signals) f6aef1c
  - [x] Write failing test for toggling mobile menu state.
  - [x] Implement a Signal `isMenuOpen = signal(false)` and a `toggleMenu()` method.
- [x] Task: Responsive UI & Hamburger Toggle da1c55f
  - [x] Write failing tests for hamburger button visibility on mobile and navigation link visibility logic.
  - [x] Implement hamburger button with Tailwind responsive classes (`md:hidden`).
  - [x] Use `@if (isMenuOpen())` or CSS transitions for the mobile menu overlay.
  - [x] Ensure navigation link is hidden in standard flow on mobile and shown on desktop.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Responsive Behavior & Mobile Menu' (Protocol in workflow.md) 4904d82

## Phase 4: Application Integration [checkpoint: df90c67]

- [x] Task: Integrate Header into AppComponent 39d331f
  - [x] Write failing test in `app.component.spec.ts` to verify `<app-header>` presence.
  - [x] Add `HeaderComponent` to `AppComponent` imports and inline template.
  - [x] Adjust `AppComponent` main content layout to account for fixed header height (e.g., `pt-16`).
- [x] Task: Conductor - User Manual Verification 'Phase 4: Application Integration' (Protocol in workflow.md) df90c67
